# 标签字段 

标签字段将字符串存储为其 `value`，并将字符串存储为其 `text`。标签字段的 `value` 和 `text` 始终相同。

#### 标签字段

![](./label/on_block.png)

#### 收起的块上的标签字段

![](./label/collapsed.png)

## 创建

:::: tabs
::: tab JSON

```json
{
  "type": "example_label",
  "message0": "a label %1 and another label",
  "args0": [
    {
      "type": "input_dummy"
    }
  ]
}
```
插值参数之间的任何消息文本都会成为标签字符串。或者，也可以明确将标签作为对象或文本进行内插。我们通常不建议这样做，因为这会增加翻译难度。

```json
{
  "type": "example_label",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "field_label",
      "text": "a label"
    },
    {
      "type": "input_dummy"
    },
    "and another label"
  ]
}
```
:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_label'] = {
  init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldLabel('a label'));
    this.appendDummyInput().appendField('and another label');
  }
};
```

:::
::::
[appendField](https://developers.google.com/blockly/reference/js/Blockly.Input#appendField) 函数可接受 `FieldLabel` 对象和（更常见的）字符串来创建标签。

label 字段接受一个可选值和一个可选的 css 类字符串。 两者均默认为空字符串。

## 序列化

标签字段不可序列化。

由于系统正在以编程方式更改标签，因此您希望对其进行序列化处理，请参阅 [可序列化标签](/guides/create-custom-blocks/fields/built-in-fields/label-serializable.html) 字段。

## 校验器

标签字段不支持验证程序，因为它们无法修改。
