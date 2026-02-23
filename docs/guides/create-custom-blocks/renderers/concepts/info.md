# 渲染信息

[`RenderInfo` 类](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.renderinfo_class)用于决定块的可视布局。

块由输入、连接和字段组成，但它们可以有多种排布方式。  
例如同一个块定义可以渲染为[内联输入或外部输入](/guides/create-custom-blocks/define/inline-vs-external)。

![内联与外部输入](/static/blockly/images/set-inputs-inline.png)

渲染信息负责从这些可能方案中选择最终布局。

在渲染流程的第一步，渲染信息会读取块定义和各视觉片段尺寸，然后整理为不重叠的布局数据：

- [元素](/guides/create-custom-blocks/renderers/concepts/elements)与元素间距
- [行](/guides/create-custom-blocks/renderers/concepts/rows)与行间距

随后[绘制器](/guides/create-custom-blocks/renderers/concepts/drawer)会基于这份布局数据生成块对应的 SVG 路径。
