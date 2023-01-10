# 颜色字段

颜色字段将字符串存储为其 `value`，并将字符串存储为其 `text`。其 `value` 是格式为 `#rrggbb` 的字符串，而其 `text` 可能的是格式为 `#rgb` 的字符串（如果可能）。

#### 颜色字段

![](./colour/on_block.png)

#### 打开编辑器时显示的颜色字段

![](./colour/with_editor.png)

#### 收起的块上的颜色字段

![](./colour/collapsed.png)

## 创建

:::: tabs
::: tab JSON

```json
{
  "type": "example_colour",
  "message0": "colour: %1",
  "args0": [
    {
      "type": "field_colour",
      "name": "FIELDNAME",
      "colour": "#ff4040",
      "colourOptions": [
        "#ff4040",
        "#ff8080",
        "#ffc0c0",
        "#4040ff",
        "#8080ff",
        "#c0c0ff"
      ],
      "colourTitles": [
        "dark pink",
        "pink",
        "light pink",
        "dark blue",
        "blue",
        "light blue"
      ],
      "columns": 3
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_colour'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('colour:')
      .appendField(
        new Blockly.FieldColour('#ff4040', {
          colourOptions: [
            '#ff4040',
            '#ff8080',
            '#ffc0c0',
            '#4040ff',
            '#8080ff',
            '#c0c0ff'
          ],
          colourTitles: [
            'dark pink',
            'pink',
            'light pink',
            'dark blue',
            'blue',
            'light blue'
          ],
          columns: 3
        }),
        'FIELDNAME'
      );
  }
};
```

:::
::::

颜色构造函数接受以下内容：

- 可选的 `value`
- 可选的[校验器](/guides/configure/advanced/interfaces/connection_checker#creating_a_colour_validator)
- 可选的选项映射，包括：
  - `colourOptions`
  - `colourTitles`
  - `columns`

`value` 应该是 `#rrggbb` 格式的字符串。如果未指定 `value` 或指定的 `value` 无效，则使用默认颜色数组中的第一个条目。

您还可以在 JSON 中设置以下选项：

- `colourOptions`
- `colourTitles`
- `columns`

或者，您可以使用 [JavaScript 钩子](#editor_options)对其进行设置。

## 序列化

:::: tabs
::: tab JSON
颜色字段的 JSON 如下所示：

```json
{
  "fields": {
    "FIELDNAME": "#ff0000"
  }
}
```

其中 `FIELDNAME` 是引用颜色字段的字符串，值是应用于该字段的值。该值遵循与构造函数值相同的规则。

:::
::: tab XML
颜色字段的 XML 如下所示：

```xml
<field name="FIELDNAME">#ff0000</field>
```

`field` 节点的 `name` 属性包含引用颜色字段的字符串，而节点的内部文本是应用于该字段的值。内部文本值遵循与构造函数值相同的规则。

请注意，在反序列化和重新序列化后，所有内部文本值都将采用 `#rrggbb` 格式。这在区分工作区时有时很重要。
:::
::::

## 自定义

### 编辑器选项

[setColours](https://developers.google.com/blockly/reference/js/Blockly.FieldColour#setColours) 函数可用于设置颜色字段的颜色选项。它接受一组颜色字符串（必须以 `#rrggbb` 格式定义）和一个可选的提示数组。如果未提供提示数组，则系统会使用默认提示数组。

提示和颜色是根据数组索引（而不是值）进行匹配的。如果 colours 数组比提示数组长，则额外颜色的提示将是其 `#rrggbb` 值。

[setColumns](https://developers.google.com/blockly/reference/js/Blockly.FieldColour#setColumns) 函数会设置颜色选择器中的列数。

:::: tabs
::: tab JSON

```json
{
  "type": "example_colour",
  "message0": "colour: %1",
  "args0": [
    {
      "type": "field_colour",
      "name": "COLOUR",
      "colour": "#ff4040"
    }
  ],
  "extensions": ["set_colours_extension"]
}
```

```javascript
Blockly.Extensions.register('set_colours_extension', function() {
  var field = this.getField('COLOUR');
  field.setColours(
    ['#ff4040', '#ff8080', '#ffc0c0', '#4040ff', '#8080ff', '#c0c0ff'],
    ['dark pink', 'pink', 'light pink', 'dark blue', 'blue', 'light blue']
  );
  field.setColumns(3);
});
```

此操作使用 JSON [扩展程序](/guides/create-custom-blocks/extensions)完成。

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_colour'] = {
  init: function() {
    var field = new Blockly.FieldColour('#ff4040');
    field.setColours(
      ['#ff4040', '#ff8080', '#ffc0c0', '#4040ff', '#8080ff', '#c0c0ff'],
      ['dark pink', 'pink', 'light pink', 'dark blue', 'blue', 'light blue']
    );
    field.setColumns(3);
    this.appendDummyInput()
      .appendField('colour:')
      .appendField(field, 'COLOUR');
  }
};
```

:::
::::

![Customized colour field editor](./colour/customized.png)

或者，可以全局替换默认颜色、提示和列。这意味着，它们会影响所有颜色字段，而不是特定字段。

```javascript
Blockly.FieldColour.COLOURS = [
  '#ff4040',
  '#ff8080',
  '#ffc0c0',
  '#4040ff',
  '#8080ff',
  '#c0c0ff'
];
Blockly.FieldColour.TITLES = [
  'dark pink',
  'pink',
  'light pink',
  'dark blue',
  'blue',
  'light blue'
];
Blockly.FieldColour.COLUMNS = 3;
```

## 创建颜色校验器

:::tip
**注意**：如需查看有关校验器的一般信息，请参阅 [校验器](https://developers.google.com/blockly/guides/create-custom-blocks/fields/validators)。
:::
颜色字段的值为 `#rrggbb` 格式字符串，因此任何验证工具都必须接受 `#rrggbb` 格式的字符串，并返回 `#rrggbb` 格式的字符串、`null` 或 `undefined`。

下面是一个验证器示例，它会更改代码块的颜色以匹配字段的颜色。

```javascript
function(newValue) {
  this.getSourceBlock().setColour(newValue);
  return newValue;
}
```

#### 根据颜色字段阻止更改颜色

![](./colour/validator.gif)
