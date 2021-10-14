# 添加自定义块

虽然 Blockly 定义了许多标准块，但大多数应用程序总需要定义和实现一些领域相关块。

块由三个部分组成：

- 块定义对象：定义块的外观和行为，包括文本，颜色，字段和连接。
- 工具箱引用：工具箱 XML 中对块类型的引用，因此用户可以将其添加到工作区。
- 生成器函数：生成此块的代码字符串。它是用 JavaScript 编写的，即使目标语言不是 JavaScript。

## 块定义

用于 Web 的 Blockly 通过脚本文件加载。在 `blocks/` 目录中包含几个标准块的示例。假设您的块不适合现有类别，请创建一个新的 JavaScript 文件。这个新的 JavaScript 文件需要包含在编辑器 HTML 文件的`<script ...>` 标签列表中。
    
::: tip 提示
大多数块都可以使用 [Blockly Developer Tools](https://developers.google.com/blockly/guides/create-custom-blocks/blockly-developer-tools.html) 定义，而不是手动创建下面的代码。
:::

一个典型的块定义如下所示：

:::: tabs

::: tab JSON
```javascript
Blockly.Blocks['string_length'] = {
  init: function() {
    this.jsonInit({
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
    });
  }
};
```
:::

::: tab JavaScript
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
:::

- `string_length`：这是块的类型名称。由于所有块共享相同的命名空间，因此最好使用由您的分类（在本例中为 `string`）组成的名称，后跟您的块函数（在本例中为 `length`）。

- `init`：此函数定义块的外观。

这定义了以下块：

![字符串长度块](./text-length.png)

块定义的详细信息可以在 [定义块](/guides/create-custom-blocks/define-blocks.html) 中找到。

### JSON 数组

通过使用 JSON 块定义数组，可以一次定义多个块。

:::: tabs
::: tab JSON
```javascript
Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    "type": "colour_picker",
    "message0": "%1",
    "args0": [
      {
        "type": "field_colour",
        "name": "COLOUR",
        "colour": "#ff0000"
      }
    ],
    "output": "Colour",
    "helpUrl": "%{BKY_COLOUR_PICKER_HELPURL}",
    "style": "colour_blocks",
    "tooltip": "%{BKY_COLOUR_PICKER_TOOLTIP}",
    "extensions": ["parent_tooltip_when_inline"]
  },
  // Block for random colour.
  {
    "type": "colour_random",
    "message0": "%{BKY_COLOUR_RANDOM_TITLE}",
    "output": "Colour",
    "helpUrl": "%{BKY_COLOUR_RANDOM_HELPURL}",
    "style": "colour_blocks",
    "tooltip": "%{BKY_COLOUR_RANDOM_TOOLTIP}"
  }
]);
```
:::
::::

## 添加工具箱引用
定义后，使用类型名称将块引用到工具箱：

```XML
<xml id="toolbox" style="display: none">
  <category name="Text">
    <block type="string_length"></block>
  </category>
  ...
</xml>
```
在 [工具箱](/guides/configure/toolbox.html) 中可以看到更多细节。

## 添加生成器函数

最后，要将块转换为代码，请将块与生成器函数配对。生成器针对于特定的输出语言，但标准生成器通常采用以下格式：

```javascript
Blockly.JavaScript['text_length'] = function(block) {
  // String or array length.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
  return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
};
```
生成器函数引用块进行处理。它将输入（上面的 `VALUE` 输入）呈现为代码字符串，然后将它们连接成更大的表达式。

有关详细信息，请参阅 [使用自定义生成器](/guides/create-custom-blocks/generating-code.html)。