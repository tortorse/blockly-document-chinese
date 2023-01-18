# 数字字段

数字字段存储一个数字作为其 `value`，并将一个字符串存储为其 `text`。根据创建时为字段提供的 [约束条件](#约束)，其 `value` 始终是有效数字；其文本可以是输入到编辑器中的任何字符串。

#### 数字字段

![](./number/on_block.png)

#### 已打开编辑器的数字字段

![](./number/with_editor.png)

#### 收起的块上的数字字段

![](./number/collapsed.png)

## 创建

:::: tabs
::: tab JSON

```json
{
  "type": "example_number",
  "message0": "number: %1",
  "args0": [
    {
      "type": "field_number",
      "name": "FIELDNAME",
      "value": 100,
      "min": 0,
      "max": 100,
      "precision": 10
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_number'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('number:')
      .appendField(new Blockly.FieldNumber(100, 0, 100, 10), 'FIELDNAME');
  }
};
```

:::
::::

数字构造函数会接受以下内容：

-   可选的 `value`
-   可选的 [最小值](#最小值)
-   可选的 [最大值](#最大值)
-   可选的 [精度](#精度)
-   可选的 [校验器](#校验器)

`value` 应转换为数字。否则为 0。

## 序列化

:::: tabs
::: tab JSON
数字字段的 JSON 如下所示：

```json
{
  "fields": {
    "FIELDNAME": 0
  }
}
```

其中 `FIELDNAME` 是引用数字字段的字符串，值是应用于该字段的值。该值遵循与构造函数值相同的规则。
:::
::: tab XML
数字字段的 XML 应如下所示：

```xml
<field name="FIELDNAME">0</field>
```

`field` 节点的 `name` 属性包含引用数字字段的字符串，节点的内部 `text` 是应用于该字段的 `value`。内部文本值遵循与构造函数值相同的规则。

:::
::::

## 约束

您可以在字段定义中设置约束条件，也可以通过使用 [setConstraints](https://developers.google.com/blockly/reference/js/Blockly.FieldNumber#setConstraints) 函数进行设置。

### 最小值

`min` 值用于设置允许字段包含的最小值/最负值。

### 最大值

`max` 值用于设置允许字段包含的最大值/最正值。

### 精度

`precision` 将值四舍五入为最接近的精度倍数。这可用于使字段仅接受 0.01、10、42 等的倍数。

## 常见约束条件

### 正数

如需强制字段仅接受正数，请将 `min` 值设置为 1。

### 整数

如需强制字段仅接受整数，请将 `precision` 设置为 1。

## 创建数字校验器

:::tip
**注意**：如需查看有关校验器的一般信息，请参阅 [校验器](/guides/create-custom-blocks/fields/validators.html)。
:::
数字字段的值是一个数字，因此任何验证器都必须接受 `number` 并返回 `number`、`null` 或 `undefined`。

下面是一个验证程序，它会将值更改为 0 或 1，具体取决于该值是奇数还是偶数。

```javascript
function(newValue) {
  return newValue % 2;
}
```

![](./number/validator.gif)
