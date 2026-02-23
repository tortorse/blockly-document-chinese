# 行

块在定义上是输入集合，但[渲染信息](/guides/create-custom-blocks/renderers/concepts/info)会决定这些输入如何被拆分为行和行间距。

例如同一个块，在设置为[内联输入或外部输入](/guides/create-custom-blocks/define/inline-vs-external)时，输入数量相同，但行数可能不同。

![内联与外部输入](/static/blockly/images/set-inputs-inline.png)

## 行

[`Row` 类](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.row_class)是由不重叠的[元素](/guides/create-custom-blocks/renderers/concepts/elements)和元素间距组成的横向集合。

![行示意](/static/blockly/images/rendering/debug-renderer/row.png)

一行的边界由该行内元素和元素间距共同决定，确保这些元素都被包含在行的范围内。

## 行间距

[`RowSpacer` 类](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.spacerrow_class)是位于两行之间的纵向留白区域。

![行间距示意](/static/blockly/images/rendering/debug-renderer/row-spacer.png)

行间距的边界由[渲染信息](/guides/create-custom-blocks/renderers/concepts/info)决定。渲染信息在测量完全部行后，会在行与行之间插入设定大小的间距。
