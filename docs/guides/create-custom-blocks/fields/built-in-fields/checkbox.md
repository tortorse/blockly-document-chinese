# 复选框字段

复选框字段存储字符串作为其值，存储字符串作为其文本。其值为 `'TRUE'` 或 `'FALSE'`，并且其文本为 `'true'` 或 `'false'`。

#### 复选框字段

![](./checkbox/on_block.png)

#### 收起的块上的复选框字段

![](./checkbox/collapsed.png)

## 创建

::::tabs
::: tab JSON

```json
{
  "type": "example_checkbox",
  "message0": "checkbox: %1",
  "args0": [
    {
      "type": "field_checkbox",
      "name": "FIELDNAME",
      "checked": true
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_checkbox'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('checkbox:')
      .appendField(new Blockly.FieldCheckbox(true), 'FIELDNAME');
  }
};
```

:::
::::

复选框构造函数会接收一个可选值和一个可选的 [校验器](/guides/configure/advanced/interfaces/connection_checker#creating_a_checkbox_validator)。可选值应为 `'TRUE'`、`'FALSE'` 或布尔值，否则默认值为 `false`。

## 序列化

:::: tabs
::: tab JSON
复选框字段的 JSON 如下所示：
```json
{
  "fields": {
    "FIELDNAME": true
  }
}
```

其中 `name` 属性包含引用复选框字段的字符串，而内部文本是要应用于该字段的值。内部文本值遵循与构造函数值相同的规则。
:::
::: tab XML
复选框字段的 XML 如下所示：

```xml
<field name="FIELDNAME">TRUE</field>
```

或

```xml
<field name="FIELDNAME">true</field>
```
:::tip
注意：无需对内部文本应用引号。
:::
其中 `name` 属性包含引用复选框字段的字符串，而内部文本是要应用于该字段的值。内部文本值遵循与构造函数值相同的规则。

请注意，在反序列化和重新序列化后，所有内部文本值都将处于上限值（`'TRUE'` 或 `'FALSE'`）。这在区分工作区时有时很重要。
:::
::::

## 自定义

### 对勾标记字符

`Blockly.FieldCheckbox.CHECK_CHAR` 属性可用于更改对勾标记的外观。该值应为包含 Unicode 字符的字符串。

![Checkbox field with heart instead of check](./checkbox/customized.png)

`CHECK_CHAR` 属性默认为 '\\u2713' 或 ✓。

这是一个全局属性，因此会在设置时修改所有复选框字段。

## 创建复选框验证程序

:::tip
**注意**：如需查看有关校验器的一般信息，请参阅 [校验器](/guides/create-custom-blocks/fields/validators)。
:::
复选框字段的值为 `'TRUE'` 或 `'FALSE'`，因此验证工具应接受这些值（即字符串），并返回 `'TRUE'`、`'FALSE'`、`null` 或 `undefined`。

:::warning
**注意**：不应在验证程序中使用 `getValueBoolean` 方法，因为它会根据当前值（而非新值）返回结果。
:::
以下是一个验证工具示例，该验证程序根据复选框是否已选中来隐藏或显示文本输入字段：

```javascript
  validate: function(newValue) {
    var sourceBlock = this.getSourceBlock();
    sourceBlock.showTextField_ = newValue == 'TRUE';
    sourceBlock.updateTextField();

    return newValue;
  },

  updateTextField: function() {
    var input = this.getInput('DUMMY');
    if (this.showTextField_ && !this.getField('TEXT')) {
      input.appendField(new Blockly.FieldTextInput(), 'TEXT');
    } else if (!this.showTextField_ && this.getField('TEXT')) {
      input.removeField('TEXT');
    }
  }
```

#### 包含验证器的复选框字段

![](./checkbox/validator.gif)
