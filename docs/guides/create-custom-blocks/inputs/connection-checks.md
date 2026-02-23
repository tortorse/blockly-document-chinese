# 连接检查

连接检查用于限制哪些连接（也就是哪些块）可以互相连接。

连接检查非常适合表达“类型”约束。  
例如下面三个块代表的返回类型不同，本不应该互相连接：

![不合理的块连接示意](/static/blockly/images/type-bad.png)

使用连接检查后，可以阻止这类连接，给用户即时反馈，并避免很多基础错误。

## 如何工作

每个连接都可以关联一个“连接检查”，其值是“可为空的字符串数组”。

两个连接可连接，需同时满足：

1. 连接类型兼容（例如输出连接到值输入）。
2. 两者连接检查中至少有一个相同字符串。

例如下面两组检查可连接，因为都包含 `'apple'`：

```javascript
['apple', 'ball', 'cat']
['apple', 'bear', 'caterpillar']
```

而下面两组不可连接，因为没有交集：

```javascript
['apple', 'ball', 'cat']
['ape', 'bear', 'caterpillar']
```

还有一个特殊情况：如果任意一方为 `null`，则两者也可连接。  
这可以表达“可连接任意类型”：

```javascript
null
['ape', 'bear', 'caterpillar']
```

::: warning 重要
连接检查里的字符串本身没有内置语义。  
例如写 `'Number'` 并不代表它一定是数字，只是用于匹配同名字符串。
:::

::: warning 重要
块类型字符串（例如 `'math_number'`）与连接检查字符串是两套独立体系。  
把块类型写进连接检查，不会让该类型的块自动可连接。
:::

## 示例

更多使用方式可参考[连接检查实践手册](/guides/create-custom-blocks/inputs/connection-check-playbook)。

## 设置检查

默认所有连接的连接检查都是 `null`，即“可连接任意内容”。  
你需要手动为连接设置检查值。

设置方式取决于你使用的是 JSON 块定义还是 JavaScript 块定义。

### JSON

对顶层连接，直接在连接属性上设置检查。  
值可以是 `null`、字符串（单项检查）或字符串数组。

```javascript
{
  'type': 'custom_value_block',
  'output': 'a connection check entry',
},
{
  'type': 'custom_statement_block',
  'nextStatement': null, // null 检查
  'previousStatement': ['four', 'connection', 'check', 'entries']
}
```

对输入连接，在输入定义的 `check` 属性中设置。  
如果没有 `check` 属性，则视为 `null`。  
值可为字符串或字符串数组。

```javascript
{
  'type': 'custom_block',
  'message0': '%1 %2',
  'args0': [
    {
      'type': 'input_value',
      'check': 'a connection check entry' // 接受 custom_value_block
    },
    {
      'type': 'input_statement',
      'check': ['two', 'entries'] // 接受 custom_statement_block
    }
  ]
}
```

### JavaScript

对顶层连接，可把检查值直接传给定义连接的方法。  
不传值时默认为 `null`。  
值可为字符串（单项检查）或字符串数组。

```javascript
Blockly.Blocks['custom_value_block'] = {
  init: function() {
    this.setOutput(true, 'a connection check entry');
  }
};

Blockly.Blocks['custom_statement_block'] = {
  init: function() {
    this.setNextStatement(true); // null 检查
    this.setPreviousStatement(true, ['four', 'connection', 'check', 'entries']);
  }
};
```

对输入连接，先创建输入，再调用 `setCheck`。  
如果不调用 `setCheck`，则视为 `null`。  
值可为字符串或字符串数组。

```javascript
Blockly.Blocks['custom_block'] = {
  init: function() {
    this.appendValueInput('NAME')
        .setCheck('a connection check entry'); // 接受 custom_value_block
    this.appendStatementInput('NAME')
        .setCheck(['two', 'entries']); // 接受 custom_statement_block
  }
};
```

### 内置检查字符串

内置块常用的连接检查值有：`'Array'`、`'Boolean'`、`'Colour'`、`'Number'`、`'String'`。  
如果你希望自定义块与内置块互通，可以使用这些值建立兼容。

## 局限性

这个系统已足够覆盖很多场景，但仍有一些局限。

### 限制更大上下文

连接检查默认只看“当前要连接的这两个连接”，不看更大上下文。  
例如它无法直接表达“`break` 块只能在循环块内部”。

可通过事件系统监听块移动事件，再主动检查并断开非法位置：

```javascript
Blockly.Blocks['custom_block'] = {
  init: function() { },

  onchange: function(e) {
    if (this.workspace.isDragging()) return;
    if (e.type !== Blockly.Events.BlockMove) return;
    if (!this.getSurroundLoop()) this.outputConnection.disconnect();
  },

  loopTypes: new Set(), // 合法的块类型（不是连接检查字符串）。

  getSurroundLoop: function() {
    let block = this.getSurroundParent();
    while (block) {
      if (this.loopTypes.has(block.type)) return block;
      block = block.getSurroundParent();
    }
    return null;
  },
};
```

### 泛型类型

这个系统本身也不直接支持“泛型”。  
例如很难直接做一个“输入什么类型就输出什么类型”的恒等块。

可以部分通过事件系统在块移动时动态改写输出连接检查来实现：

```javascript
Blockly.Blocks['custom_block'] = {
  init: function() { },

  onchange: function(e) {
    if (e.type !== Blockly.Events.BlockMove) return;
    this.setOutput(
        true, this.getInputTargetBlock()?.outputConnection.getCheck());
  }
};
```

但如果连接上的块本身也是泛型块，这种方法依然不能完全正确处理。

## 连接检查器

如果默认连接检查系统不满足需求，你可以创建[自定义连接检查器](/guides/create-custom-blocks/inputs/connection_checker)，改写连接检查的比较方式。

例如你想支持更复杂的类型系统，或处理上述局限性，就可以走自定义连接检查器方案。
