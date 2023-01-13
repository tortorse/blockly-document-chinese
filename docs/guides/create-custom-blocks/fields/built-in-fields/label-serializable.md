# 可序列化标签字段 

可序列化标签的工作原理与 [普通标签](/guides/create-custom-blocks/fields/built-in-fields/label) 完全相同，只是还将其序列化为 XML 格式。只有在您要以编程方式修改标签的内容，并且希望将其序列化为 XML 格式时，才应使用这些标签。

#### 可序列化标签字段

![](./label-serializable/on_block.png)

#### 收起的块上的可序列化标签字段

![](./label-serializable/collapsed.png)

## 创建

:::: tabs
::: tab JSON

```json
{
  "type": "example_serializable_label",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "FIELDNAME",
      "text": "a serializable label"
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_serializable_label'] = {
  init: function() {
    this.appendDummyInput().appendField(
      new Blockly.FieldLabelSerializable('a serializable label'),
      'FIELDNAME'
    );
  }
};
```

:::
::::
可序列化标签字段接受一个可选值和一个可选的 css 类字符串。两者均默认为空字符串。


## 序列化

:::: tabs
::: tab JSON
可序列化标签字段的 JSON 如下所示：


```json
{
  "fields": {
    "FIELDNAME": text
  }
}
```

其中 `FIELDNAME` 是引用可序列化标签字段的字符串，值是应用于该字段的值。该值遵循与构造函数值相同的规则。
:::
::: tab XML
可序列化标签字段的 XML 如下所示：

```xml
<field name="FIELDNAME">text</field>
```

`field` 节点的 `name` 属性包含引用可序列化标签字段的字符串，而节点的内部文本是应用于该字段的值。
:::
::::

## 校验器

可序列化标签字段不支持校验器，因为它们不可修改。