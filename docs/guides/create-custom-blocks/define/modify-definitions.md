# 修改块定义

常见需求是：在已有块上调整连接检查，或把字段改成值输入。  
一般来说，不能在原地直接修改已有块定义。

## 如何修改已有定义

如果你需要调整一个已有块类型，建议按下面流程做：

1. 复制现有块定义，以及对应的块代码生成器。
2. 在副本上修改，并使用新的块类型名。
3. 把新定义注册到 `Blockly.Blocks`。

## 为什么不能直接修改已有定义

### 直接修改定义

直接改已有定义常见有两种做法：猴子补丁和 Fork。两者都不推荐：

- 容易破坏依赖这段代码的现有逻辑。
- 很难持续合并官方更新和缺陷修复。

可先阅读[使用 Blockly API](/guides/programming/using_blockly_apis)和[Fork Blockly](/guides/programming/forking_blockly)。

### 不能对子类化定义

块定义不是类，而是混入对象。  
例如颜色不是定义对象上的可覆盖属性，而是在 `init` 中通过 `setColour` 写到块实例上。  
这意味着要改这一步，通常只能替换整个 `init`。

### 覆盖定义中的函数

技术上可以覆盖已有定义里的函数：

```javascript
Blockly.Blocks['existing_block'].init = function() {/* 新函数 */};
```

但这通常会带来问题：

- 本质上仍是复制并改写整段函数，不比复制整份定义简单。
- 对 JSON 定义的块不适用，这类块的 `init` 往往在运行时生成。
- 需要用 JavaScript 路径改写，可能带来本地化问题，可参考[翻译与本地化](/guides/configure/translations)。

### 覆盖 `init` 的执行结果

也可以先调用原 `init`，再覆盖结果：

```javascript
const originalInit = Blockly.Blocks['logic_null'].init;
Blockly.Blocks['logic_null'].init = function() {
  originalInit.call(this);
  this.setColour(300);
};
```

这种方式看似改动小，风险依然存在：

- 放宽[连接检查](/guides/create-custom-blocks/type-checks)或放松字段校验，可能破坏代码生成器和事件处理的假设。
- 把字段改成值输入，通常会影响代码生成器、字段校验器和事件处理。
- 对本地化块更难处理，因为不同语言下输入与字段顺序可能不同。

### 覆盖 JSON 定义中的键值

只有在以下前提同时满足时，才可能覆盖部分 JSON 值：

- JSON 对象本身可被外部访问。
- 定义显式编写了 `init`。
- `init` 内部调用了 `jsonInit`。

示例：

```javascript
const blockJson = {
  // 共享属性
};

Blockly.Blocks['my_block'] = {
  init: function() {
    this.jsonInit(blockJson);
  },
};

// 第三方代码
blockJson.colour = 100;
```

但如果块是通过 `defineBlocksWithJsonArray` 或 `createBlockDefinitionsFromJsonArray` 注册，JSON 会在外部代码介入前就被处理，无法这样改写。  
另外，定义对象只有 `init`，并不存在把 `init` 反向还原成 JSON 的通用 API。

## 面向复用来设计块

设计自定义块时，优先考虑复用，通常比后期改已有定义更可靠。

### 复用 JSON

把公共部分抽成父 JSON，再在多个块中复用：

```javascript
const parentJson = {
  // 公共属性
};

Blockly.Blocks['child_block_1'] = {
  init: function() {
    this.jsonInit({...parentJson, colour: 100});
  },
};

Blockly.Blocks['child_block_2'] = {
  init: function() {
    this.jsonInit({...parentJson, colour: 200});
  },
};
```

### 复用函数

把事件处理、校验、提示等逻辑抽为函数，在多个块定义间共享。  
块定义函数如何工作，可参考[什么是块定义](/guides/create-custom-blocks/define-blocks)。

### 使用下拉字段

如果一组块只在运算符或模式上不同，可合并成一个块，用下拉字段表达差异。  
代码生成器会稍复杂，但通常比维护多份近似块更省成本。

### 使用变形器

如果同一编程结构有多种形态，可用变形器让一个块承载多种变体。  
可先参考[扩展和混入](/guides/create-custom-blocks/extensions)。
