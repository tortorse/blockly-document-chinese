# 日期字段

日期字段将字符串存储为 its `value`，将字符串存储为 its `text`。它`value`和`text`两者都具有格式`YYYY-MM-DD`。

#### 日期字段

![](./date/on_block.png)

#### 编辑器打开的日期字段

![](./date/with_editor.png)

#### 折叠块上的日期字段

![](./date/collapsed.png)

:::warning
警告：日期字段不再是核心 Blockly 库的一部分。我们现在将其发布为名为[@blockly/field-date 的 npm 包](https://www.npmjs.com/package/@blockly/field-date)
:::

## 创建

::::tabs
::: tab JSON

```json
{
  "type": "example_date",
  "message0": "date: %1",
  "args0": [
    {
      "type": "field_date",
      "name": "FIELDNAME",
      "date": "2020-02-20"
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_date'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('date:')
      .appendField(new Blockly.FieldDate('2020-02-20'), 'FIELDNAME');
  }
};
```

:::
::::

日期字段构造函数接受一个可选的`value`和一个可选的 [校验器](#创建日期验证器)。`value`应该是格式中的字符串`YYYY-MM-DD`。否则将使用当前（今天）日期。

## 序列化和 XML

日期字段的 XML 如下所示：

```xml
<field name="FIELDNAME">2020-02-20</field>
```

`field`节点的属性`name`包含引用日期字段的字符串，节点的内部文本是应用于该字段的值。内部文本值遵循与构造函数值相同的规则。
## 创建日期验证器

::: tip
**注意：** 有关验证器的一般信息，请参阅验证器。
:::

日期字段的值是`YYYY-MM-DD`格式字符串，因此任何验证器都必须接受`YYYY-MM-DD`格式字符串，并返回`YYYY-MM-DD`格式字符串`null`、 或`undefined`。

[请注意，在验证日期时，使用 Closure 的日期类](https://google.github.io/closure-library/api/goog.date.Date.html)可能会有用 [（打开新窗口）](https://google.github.io/closure-library/api/goog.date.Date.html).

下面是一个只接受工作日的验证器示例：

```javascript
function(newValue) {
  var date = goog.date.Date.fromIsoString(newValue);
  var weekday = date.getWeekday();
  if (weekday == 0 || weekday == 6) {
    return null;
  }
  return date.toIsoString(true);
}
```

![](./date/validator.gif)
