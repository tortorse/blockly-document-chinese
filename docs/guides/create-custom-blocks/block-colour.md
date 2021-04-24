# 块颜色

大多数 Blockly 应用程序使用各种色块颜色以可视方式将块分组。 Blockly 随附的块包括八个类别，其颜色通过演示中的各种工具栏类别进行镜像：
![](./standard-block-colors.png)

许多工具箱条目还包括影子块作为默认输入值。 例如，蓝色加法块的编号。 影子块的颜色是从块的标准颜色派生而来的，但降低了饱和度。

## 定义块颜色

块颜色可以用 JSON 或 JavaScript 表示法定义：

:::: tabs
::: tab JSON
```json
{
  // ...,
  "colour": 160,
}
```
:::
::: tab JavaScript
```js
init: function() {
  // ...
  this.setColour(160);
}
```
:::
::::

请注意英式英语（colour）的拼写。未能设置颜色的结果是产生黑色的块。

该 `colour` 值可以采用多种形式之一。最简单的是 0-360 之间的数字，在 [色调-饱和度-值](https://en.wikipedia.org/wiki/HSL_and_HSV)（HSV）颜色模型中定义块的色调。

![](./hsv.png)

将所有块颜色的 HSV 的饱和度和值固定时，可以轻松选择块颜色，同时确保所有图块共享一个内聚的调色板。

许多颜色选择器提供 HSV 颜色空间，例如 [HSV选择器](http://www.rapidtables.com/web/color/color-picker.htm)。 输入 Blockly 的饱和度和值常数（默认分别为45％和65％），然后根据需要滑动色相。 使用此色相编号作为 `colour` 值（JSON），或使用 `this.setColour（..）`（JavaScript）函数的参数。

通过覆盖以下 Blockly 常量，可以为每个应用程序调整饱和度和值：

```javascript
Blockly.HSV_SATURATION // 0 (inclusive) to 1 (exclusive), defaulting to 0.45
Blockly.HSV_VALUE // 0 (inclusive) to 1 (exclusive), defaulting to 0.65
```

## 颜色参考

通常，多个块共享相同的颜色，集中颜色定义简化了颜色管理并添加了正确颜色的新块。块颜色可以使用 [字符串表引用](/guides/create-custom-blocks/localize-blocks.html#字符串表) 来完成。

Blockly 在字符串表中包括九个颜色常量，对应于工具箱分类，另外还为动态变量提供了不同的颜色：

```javascript
'%{BKY_LOGIC_HUE}'
'%{BKY_LOOPS_HUE}'
'%{BKY_MATH_HUE}'
'%{BKY_TEXTS_HUE}'
'%{BKY_LISTS_HUE}'
'%{BKY_COLOUR_HUE}'
'%{BKY_VARIABLES_HUE}'
'%{BKY_VARIABLES_DYNAMIC_HUE}'
'%{BKY_PROCEDURES_HUE}'
```
这些字符串值可在JSON定义和 [`block.setColour(...)`](https://developers.google.com/blockly/reference/js/Blockly.Block#setColour) 中使用。

您可以通过添加到 `Blockly.Msg` 以下内容来添加自己的颜色常量：

```javascript
// Define the colour
Blockly.Msg.EVERYTHING_HUE = 42;
// Use in a block or block definition:
block.setColour('%{BKY_EVERYTHING_HUE}');
```

::: tip 注意
虽然 Blockly 当前仅支持 **BKY_** 前缀，但是参考系统将扩展为支持指向其他字符串表的其他前缀。 这将有助于隔离特定于应用程序的代码，并减少与未来版本的 Blockly 发生冲突的机会。
:::

将颜色存储在本地化字符串表中可能看起来很不寻常，但考虑到 JSON 表达已经支持引用，所以还是很方便的。如果需要，它还允许使用 [本地化颜色](http://translation-blog.multilizer.com/color-localization-infographics/)。

工具箱 XML 还支持分类 `color` 属性中的此类颜色引用：
```html
<category name="Logic" colour="%{BKY_LOGIC_HUE}">
  ...
</category>
```

## 自定义饱和度和值

可以通过覆盖以下 Blockly 常量来为每个应用程序调整饱和度和值：

```javascript
Blockly.HSV_SATURATION // 0 (inclusive) to 1 (exclusive), defaulting to 0.45
Blockly.HSV_VALUE // 0 (inclusive) to 1 (exclusive), defaulting to 0.65
```

## 十六进制表示的颜色值

强烈建议使用 HSV 色彩空间，但 Blockly 依然支持形如 `#RRGGBB` 的十六进制的块颜色。虽然这可以促进与其他应用程序颜色（例如CSS中的样式）和设计应用程序（例如，Photoshop）的协调，但如果不仔细选择，则设计风险很容易导致不协调的块。

![](./fruit-salad.png)

除非您拥有专门的视觉设计资源，否则建议在 HSV 色彩空间的限制范围内工作。如果尝试以这种方式重新定义所有颜色，请考虑 [Google 的 Material Design 颜色资源](https://material.io/guidelines/style/color.html)。

## 可访问性问题

Blockly 使用颜色作为每个块的作用的强烈暗示，并将块组合在一起。对于所包含的块，此可提供行仅次于块上的文本，因此不是关键属性。但是，在选择块调色板时，应考虑色盲。

虽然 Blockly 没有对色盲调节的具体支持，但 [此页面](http://mkweb.bcgsc.ca/colorblind/) 包括示例 7, 12 和 15 调色板，这些调色板试图最大程度地区分最常见形式的色盲。请注意，这不会映射到 Blockly 中的 7,12 或 15 个块分类，因为应为影子块和字段保留一些阴影。
