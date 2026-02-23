# 构建块总览

Blockly 内置了大量预定义块，从数学函数到循环结构都有。但大多数应用都需要为自己的业务领域定义并实现自定义块。  
例如，绘图应用可能需要“画线”和“画圆”块，机器人应用可能需要“移动机械臂”和“控制夹爪”块。

要定义并使用一种新的块类型，你需要三个部分：

- **块定义**：定义该块类型的外观与部分行为。
- **块代码生成器**：为该块类型生成目标代码字符串。
- **工具箱引用**：在工具箱中引用该块类型，用户才能把它拖入工作区。

## 块定义

**块定义**用于定义一个块的文本、字段、连接和颜色，也可以定义块级行为（例如块专属事件处理）。

例如，下图这个块：

![`string_length` 块示意图](./text-length.png)

可以用 JSON 或 JavaScript 定义。

### JSON

```javascript
Blockly.common.defineBlocksWithJsonArray([{
  "type": "string_length",
  "message0": "length of %1",
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

更多信息见[什么是块定义](/guides/create-custom-blocks/define-blocks)。

## 块代码生成器

要把块转换为代码，你需要为每种目标语言分别实现一个生成器函数。  
例如下面这个函数生成 JavaScript 代码：

```javascript
javascriptGenerator.forBlock['string_length'] = function(block, generator) {
  var argument0 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || '\'\'';
  return [argument0 + '.length', Order.MEMBER];
};
```

生成器函数会接收当前块和语言生成器；它会为输入连接上的子块（如示例中的 `VALUE`）以及字段生成代码，再拼接成更大的表达式。  
注意：即使目标语言不是 JavaScript，生成器函数本身也始终使用 JavaScript 编写。

更多信息见[块代码生成器](/guides/create-custom-blocks/generating-code)。

## 工具箱引用

定义好块类型后，你需要在工具箱里通过 `type` 引用它，用户才能使用它。

### JSON

```javascript
var toolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Text",
      "contents": [
        {
          "kind": "block",
          "type": "string_length"
        }
      ]
    }
  ]
};
```

### XML

```xml
<xml id="toolbox" style="display: none">
  <category name="Text">
    <block type="string_length"></block>
  </category>
</xml>
```

更多信息见[定义弹出工具箱](/guides/configure/toolboxes/flyout)和[定义分类工具箱](/guides/configure/toolboxes/category)。

