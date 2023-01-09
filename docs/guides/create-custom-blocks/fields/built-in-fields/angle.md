# 角度字段集

角度字段存储数字作为值，将字符串作为文本存储。其值是一个 0 到 360 之间的数字（可以[更改](#范围)），而其文本可以是输入到编辑器中的任何字符串。

#### 角度字段

![](./angle/on_block.png)

#### 包含编辑器的角度字段

![](./angle/with_editor.png)

#### 折叠角度字段

![](./angle/collapsed.png)

## 创建

::::tabs
::: tab JSON

```json
{
  "type": "example_angle",
  "message0": "angle: %1",
  "args0": [
    {
      "type": "field_angle",
      "name": "FIELDNAME",
      "angle": 90
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_angle'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('angle:')
      .appendField(new Blockly.FieldAngle(90), 'FIELDNAME');
  }
};
```

:::
::::

角度构造函数接受一个可选值和一个可选 [校验器](#创建角度校验器)。如果未指定值或给定值未转换为数字，则使用零作为默认值。
## 序列化

:::: tabs
::: tab JSON

角度字段的 JSON 如下所示：

```json
{
  "fields": {
    "FIELDNAME": 0
  }
}
```

其中 `FIELDNAME` 是引用角度字段的字符串，值是应用于该字段的值。该值遵循与构造函数值相同的规则。
:::
::: tab XML

角度字段的 XML 如下所示：

```xml
<field name="FIELDNAME">0</field>
```

其中 `name` 属性包含引用角度字段的字符串，内部文本是要应用于该字段的值。内部文本值遵循与构造函数值相同的规则。

:::
::::

## 自定义

### 吸附

`Blockly.FieldAngle.ROUND` 属性用于更改使用鼠标时角度选择器“吸附”的值。

::: tip
**注意**：这不会影响角度字段的文本输入部分，因此，如果您想确保角度值经过舍入处理，请使用[验证工具](#创建角度校验器)。
:::

下面是一个 `ROUND` 值为 70 的示例：

![Angle field with a ROUND value of 70](./angle/round_70.gif)

`ROUND` 属性默认为 15。如果要停用紧贴功能，请将其设置为 0。

这是一个全局属性，因此会在设置时修改所有角度字段。

### 方向

`Blockly.FieldAngle.CLOCKWISE` 属性会更改使角度值增加的方向。将此值设为 `true` 会使选择器在顺时针移动时增加角度，如果将其设置为 `false`，则会在逆时针移动时增加角度。

#### CLOCKWISE 设置为 true

![Angle field with CLOCKWISE set to true](./angle/clockwise_true.gif)

#### CLOCKWISE 设置为 false

![Angle field with CLOCKWISE set to false](./angle/clockwise_false.gif)

`CLOCKWISE` 属性默认为 `false`，这意味着逆时针移动会使角度增加。

这是一个全局属性，因此会在设置时修改所有角度字段。

### 零位

`Blockly.FieldAngle.OFFSET` 属性用于设置 0 度位置。默认情况下，零度与正 x 轴（向右）对齐，然后此属性按该位置“偏移”一定数量。

:::tip
**注意**：偏移的方向始终为逆时针，与 [CLOCKWISE](#方向) 属性无关。
:::

![Angle picker zero at right](./angle/offset_right.png)

![Angle picker zero at top](./angle/offset_top.png)

`OFFSET` 属性默认为 0，表示零度与正 X 轴对齐。

这是一个全局属性，因此会在设置时修改所有角度字段。

### 范围

`Blockly.FieldAngle.WRAP` 属性可设置值的范围。值的范围等于 `(-360 + WRAP, WRAP)`。也就是说，`WRAP` 值为 360 表示范围为 `(0, 359.9)`，`WRAP` 值为 180 表示范围为 `(-179.9, 180)`。

![Angle picker with wrap value of 180](./angle/wrap.gif)

`WRAP` 属性默认为 360，这意味着该字段的范围为 `(0, 359.9)`。

这是一个全局属性，因此会在设置时修改所有角度字段。

### 角度选择器大小

`Blockly.FieldAngle.HALF` 属性用于更改角度选择器的大小。该值定义了外圈的半径（以像素为单位）。

![Angle picker with default editor size](./angle/offset_right.png)

![Angle picker with large editor](./angle/editor_large.png)

`HALF` 属性默认为 50。

这是一个全局属性，因此会在设置时修改所有角度字段。

:::tip
**注意**：角度选择器的大小不受工作区缩放的影响。
:::

## 常用模式

结合使用 [方向](#方向) 和 [零位置](#零位) 可以创建一些有趣的组合。下面是两种常用的方法：

### 量角器

0 度向右，90 度向上。

```javascript
Blockly.FieldAngle.CLOCKWISE = false;
Blockly.FieldAngle.OFFSET = 0;
```

![Angle picker configured as a protractor](./angle/protractor.gif)

### 罗盘

0 度向上，90 度向右。

```javascript
Blockly.FieldAngle.CLOCKWISE = true;
Blockly.FieldAngle.OFFSET = 90;
```

![Angle picker configured as a compass](./angle/compass.gif)

## 创建角度校验器

:::tip
**注意**：如需查看有关校验器的一般信息，请参阅 [校验器](/guides/create-custom-blocks/fields/validators)。
:::
角度字段的值是数字，因此任何校验器都必须接受数字并返回数字 `null`、`undefined`。

以下是一个强制将值设为 30 的倍数的校验器示例：

```javascript
function(newValue) {
return Math.round(newValue / 30) \* 30;
}
```

![Angle picker with a validator](./angle/validator.gif)

请注意，角度字段的 [ROUND](#吸附) 属性仍然设置为 15，因此该字段的图形元素会显示 15 的倍数，而不是 30。