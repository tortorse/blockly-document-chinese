# 什么是块定义

**块定义**是一个用于定义自定义块的对象。它会定义块的外观和交互，包括文本、字段、连接、颜色等，也可以定义块级行为，例如块级事件处理。

例如下面这个块：

![`string_length` 块示意图](./text-length.png)

可以使用 JSON 或 JavaScript 定义。

## JSON

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

`defineBlocksWithJsonArray` 会从 JSON 对象创建块定义。

## JavaScript

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

使用 JavaScript 时，你是直接创建块定义对象。

## 块定义如何工作

块定义本质上是一个 mixin，里面包含一组函数属性。实例化新块时，这些属性会被复制到新建的块对象上，Blockly 通过调用这些函数来执行自定义行为。

由于这些定义函数会混入块对象本身：

- 在定义函数里，`this` 指向块对象。
- 你可以通过它访问 [`Block`](/reference/js/blockly.block_class) 或 [`BlockSvg`](/reference/js/blockly.blocksvg_class) 的公开方法和属性。

Blockly 预留了少量可用于自定义块的函数。其中最常用的是 `init`，用于初始化块并定义块的外观与基本行为。  
完整列表可查看 [`Block`](/reference/js/blockly.block_class) 与 [`BlockSvg`](/reference/js/blockly.blocksvg_class) 的函数属性。这些属性构成了块定义可实现的接口，且全部是可选的。

块定义也可以包含自定义函数，但 Blockly 不会直接调用它们。这些函数通常被其他生命周期函数调用。  
例如，块级事件处理器 `Block.onchange` 可以把不同事件分发给不同自定义函数处理。

## 如何创建块定义

常见做法有三种：

- 使用 [Blockly 开发者工具](/guides/create-custom-blocks/blockly-developer-tools) 快速定义块外观，再把生成的 JSON 或 JavaScript 拷贝进项目并补充自定义逻辑。
- 找一个相似块，复制其定义后按需修改。当前可先参考[本页示例](/guides/create-custom-blocks/define-blocks)。
- 手写块定义。当前可先参考[JSON 和 JavaScript](/guides/create-custom-blocks/define/json-and-js)。
