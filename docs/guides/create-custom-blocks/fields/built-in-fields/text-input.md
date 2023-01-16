# 文本输入字段

文本输入字段将字符串存储为其值，将字符串存储为文本。其值始终是有效的字符串，而其文本可以是输入到编辑器中的任何字符串。

#### 文本输入字段

![](./text-input/on_block.png)

#### 打开编辑器的文本输入字段

![](./text-input/with_editor.png)

#### 收起块上的文本输入字段

![](./text-input/collapsed.png)

## 创建

:::: tabs
::: tab JSON

```json
{
  "type": "example_textinput",
  "message0": "text input: %1",
  "args0": [
    {
      "type": "field_input",
      "name": "FIELDNAME",
      "text": "default text",
      "spellcheck": false
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_textinput'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('text input:')
      .appendField(new Blockly.FieldTextInput('default text'), 'FIELDNAME');
  }
};
```

:::
::::
文本输入构造函数可接收可选值和可选的 [校验器](#创建文本输入校验器)。该值应转换为字符串。如果值为 `null` 或 `undefined`，则使用空字符串。

JSON 定义还允许您设置 [拼写检查](#拼写检查) 选项。

## 序列化和 XML

:::: tabs
::: tab JSON
文本输入字段的 JSON 如下所示：

```json
{
  "fields": {
    "FIELDNAME": "text"
  }
}
```

其中 `FIELDNAME` 是引用文本输入字段的字符串，值是应用于该字段的值。该值遵循与构造函数值相同的规则。

:::
::: tab XML
文本输入字段的 XML 如下所示：

```xml
<field name="FIELDNAME">text</field>
```

其中，字段的 `name` 属性包含引用文本输入字段的字符串，内部文本是要应用于该字段的值。内部文本值遵循与构造函数值相同的规则。

:::
::::

## 自定义

### 拼写检查

设置 [拼写检查](https://developers.google.com/blockly/reference/js/Blockly.FieldTextInput#setSpellcheck) 功能可用于设置相应字段是否对输入文本进行拼写检查。

### 包含和不带拼写检查的文本输入字段

![](./text-input/spellcheck.gif)

拼写检查默认处于开启状态。

这适用于单个字段。如果要修改所有字段，请更改 `Blockly.FieldTextInput.prototype.spellcheck_` 属性。

## 创建文本输入校验器

:::tip
**注意**：如需查看有关校验器的一般信息，请参阅 [校验器](/guides/create-custom-blocks/fields/validators)。
:::

```javascript
function(newValue) {
  return newValue.replace(/a/g, '');
}
```

![](./text-input/validator.gif)
