# 颜色格式

颜色值可以使用 `HSV`、`RGB` 或颜色名称。

## 色相-饱和度-明度

定义颜色最简单的方式是使用 `0-360` 的数字，表示 `HSV` 色彩模型中的色相值。

![HSV 色谱示意图。](/static/blockly/images/appearance/hsv.png)

当所有块共用固定的饱和度和明度时，使用 `HSV` 可以在保持整体配色统一的同时，灵活选择不同色相。

你可以通过以下函数调整饱和度和明度：

```javascript
Blockly.utils.colour.setHsvSaturation(0.45) // 取值范围为 [0, 1)，默认 0.45
Blockly.utils.colour.setHsvValue(0.65) // 取值范围为 [0, 1)，默认 0.65
```

你可以使用支持 `HSV` 的取色器，例如 [HSV picker](http://www.rapidtables.com/web/color/color-picker.htm)。输入 Blockly 的饱和度和明度常量后，拖动色相滑块，得到的色相值即可作为 `colour`。

## RGB

虽然更推荐使用 `HSV`，Blockly 也支持 `#RRGGBB` 十六进制字符串。这样便于与应用中其他颜色系统协同，例如 `CSS` 样式或设计稿配色。

但如果不谨慎选择，`RGB` 配色容易导致块之间不协调。

![不协调配色示例。](/static/blockly/images/appearance/fruit-salad.png)

除非你有专门的视觉设计资源，否则建议优先在 `HSV` 约束内配色。如果要全面改造颜色体系，可参考 [Material Design 颜色指南](https://material.io/guidelines/style/color.html)。

## 颜色名称

也可以直接使用 [W3C 定义的颜色名称](https://www.w3.org/TR/css-color-3/#html4)。

## 颜色引用

多个块共用同一颜色时，建议集中管理颜色常量，便于维护和扩展。块颜色和工具箱分类都可以通过本地化令牌复用颜色值，参考 [/guides/configure/translations](/guides/configure/translations)。

Blockly 在字符串表内内置了 9 个分类色常量，以及 1 个动态变量色常量：

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

这些字符串可用于 `JSON` 定义，也可用于 [`block.setColour(..)`](/reference/js/blockly.block_class.setcolour_1_method)。

你也可以向 `Blockly.Msg` 增加自己的颜色常量：

```javascript
// 定义颜色常量
Blockly.Msg['EVERYTHING_HUE'] = '42';
// 在块或块定义中使用
block.setColour('%{BKY_EVERYTHING_HUE}');
```

把颜色放到本地化字符串表看起来不常见，但它与 `JSON` 中的令牌机制天然兼容，也支持按需做颜色本地化。
