# 块颜色

多数 Blockly 应用会使用多种块颜色，把块在视觉上分组到不同类别。Blockly 内置块本身也使用了多类别配色，并且与演示中的工具箱分类颜色对应。

![Blockly 默认块颜色示例。](/static/blockly/images/appearance/standard-block-colors.png)

块上的其他颜色会由主色推导。例如，阴影块是主色的低饱和度版本，边框颜色是主色的更深版本。

::: tip 提示
如果你需要精细控制阴影块色或边框色，请使用 [/guides/configure/appearance/themes](/guides/configure/appearance/themes) 定义主题。
:::

## 设置块颜色

块的主色可以在 `JSON` 或 `JavaScript` 中定义。你可以传入色相值（推荐）、`RGB` 值或颜色名称；详细格式请参考 [/guides/configure/appearance/colour-formats](/guides/configure/appearance/colour-formats)。

::::tabs
::: tab JSON
```javascript
{
  // ...,
  "colour": 160,
}
```
:::
::: tab JavaScript
```javascript
init: function() {
  // ...
  this.setColour(160);
}
```
:::
::::

注意拼写是 `colour`。如果没有设置颜色，块会显示为黑色。

你也可以通过 [`Block.setColour(..)`](/reference/js/blockly.block_class.setcolour_1_method) 设置块颜色，或通过 [/guides/configure/appearance/themes](/guides/configure/appearance/themes) 的块样式统一管理。

## 无障碍

关于颜色对无障碍的影响，请参考 [/guides/configure/colour-a11y](/guides/configure/colour-a11y)。
