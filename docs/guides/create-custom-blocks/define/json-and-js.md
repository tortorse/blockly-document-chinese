# JSON 和 JavaScript

Blockly 定义块有两种方式：

- 使用 JSON 对象（键值对）
- 使用 JavaScript 函数（调用 Blockly API）

通常更推荐 JSON：可读写性更好，也更有利于本地化。  
但 JSON 不能直接定义变形器、校验器这类高级能力，这些通常需要用 JavaScript 编写，并通过[扩展](/guides/create-custom-blocks/extensions)接入。

::: tip 术语说明
这里说的“JSON 对象”本质上是普通 JavaScript 对象。之所以这样称呼，是因为其值需要可序列化为 JSON，并且 Blockly API 也沿用了这个叫法。
:::

## 使用 JSON 或 JavaScript

下面这个块：

![`string_length` 块示意图](../text-length.png)

可以用 JSON 或 JavaScript 定义。

### JSON

```javascript
Blockly.common.defineBlocksWithJsonArray([{
  "type": "string_length",
  "message0": 'length of %1',
  "args0": [
    {
      "type": "input_value",
      "name": "VALUE",
      "check": "String"
    }
  ],
  "output": "Number",
  "colour": 160,
  "tooltip": "Returns number of letters in the provided text.",
  "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
}]);
```

`defineBlocksWithJsonArray` 会把每个 JSON 对象转换为带 `init` 的[块定义对象](/guides/create-custom-blocks/define-blocks)，并存入 `Blockly.Blocks`。

### JavaScript

```javascript
Blockly.Blocks['string_length'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck('String')
        .appendField('length of');
    this.setOutput(true, 'Number');
    this.setColour(160);
    this.setTooltip('Returns number of letters in the provided text.');
    this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
  }
};
```

由于[块定义对象](/guides/create-custom-blocks/define-blocks)会被混入到块实例中，这里的 `this` 指向正在创建的真实块对象。

无论哪种写法，最终都会把块定义对象以块类型名（如 `string_length`）作为键存到 `Blockly.Blocks`。这个定义对象至少包含一个 `init` 方法，用来定义块形状。

## 混合使用 JSON 和 JavaScript

JSON 更适合定义块外观，但对需要函数实现的能力（如校验器、变形器）支持有限。实践上建议：能用 JSON 的部分尽量用 JSON，剩余逻辑再用 JavaScript 补充。

下面示例定义了 `init`，在其中用 `jsonInit` 载入 JSON 结构，再用 JavaScript 增加动态提示：

```javascript
// 用 JSON 定义块结构。
var mathChangeJson = {
  "message0": "change %1 by %2",
  "args0": [
    {"type": "field_variable", "name": "VAR", "variable": "item", "variableTypes": [""]},
    {"type": "input_value", "name": "DELTA", "check": "Number"}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230
};

Blockly.Blocks['math_change'] = {
  init: function() {
    // 用 jsonInit 加载 JSON 块结构。
    this.jsonInit(mathChangeJson);

    // 用 JavaScript 定义动态提示。
    // 将 this 暂存到变量，供下方闭包使用。
    var thisBlock = this;
    this.setTooltip(function() {
      return 'Add a number to variable "%1".'.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  }
};
```

## 块定义 API

本节汇总定义自定义块时常用的对象和函数。

### `Blockly.Blocks`

[`Blockly.Blocks`](/reference/js/blockly.blocks_variable) 是保存块定义对象的容器：

- 键：块类型名
- 值：块定义对象

用 JavaScript 定义块时，通常直接写入 `Blockly.Blocks`：

```javascript
Blockly.Blocks['my_block'] = {
  init: function() {/* ... */},
  onchange: function() {/* ... */},
  // ...
}
```

常见误用是把 `Blockly.Blocks` 当“块实例仓库”来操作：

```javascript
// 会报错："Blockly.Blocks.my_block.setColour is not a function".
Blockly.Blocks['my_block'].setColour(150);
```

原因是 `Blockly.Blocks` 存的是“定义对象”，不是“块实例”。

### `defineBlocksWithJsonArray`

[`defineBlocksWithJsonArray`](https://developers.google.com/blockly/reference/js/blockly.common_namespace.defineblockswithjsonarray_1_function) 接收 JSON 数组，创建对应块定义，并加入 `Blockly.Blocks`。

```javascript
Blockly.common.defineBlocksWithJsonArray([
  {
    type: 'my_block1',
    // ...
  },
  {
    type: 'my_block3',
    // ...
  },
  {
    type: 'my_block2',
    // ...
  },
]);
```

### `createBlockDefinitionsFromJsonArray` 与 `defineBlocks`

[`createBlockDefinitionsFromJsonArray`](https://developers.google.com/blockly/reference/js/blockly.common_namespace.createblockdefinitionsfromjsonarray_1_function) 会返回“块类型名 -> 块定义对象”的映射，通常再配合 `defineBlocks` 注册到 `Blockly.Blocks`。

```javascript
const myBlockDefinitions = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    type: 'my_block1',
    // ...
  },
  {
    type: 'my_block3',
    // ...
  },
  {
    type: 'my_block2',
    // ...
  },
]);
Blockly.common.defineBlocks(myBlockDefinitions);
```

### `Block.jsonInit`

[`jsonInit`](https://developers.google.com/blockly/reference/js/blockly.block_class.jsoninit_1_method) 接收 JSON 对象，并调用对应 `Block` 方法。  
例如 `colour: 150` 等价于调用 `this.setColour(150)`。常见用法是在 `init` 中载入 JSON 结构：

```javascript
var myJson = {
  // ...
};

Blockly.Blocks['my_block'] = {
  init: function() {
    this.jsonInit(myJson);
    // 其余初始化逻辑。
  }
};
```
