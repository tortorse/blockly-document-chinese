# 路径对象

[`PathObject` 类](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.pathobject_class)持有组成块外观的 SVG 元素。

例如在 `Geras` 渲染器中，一个块通常包含 `main`、`dark`、`light` 三条路径，用于形成立体效果。路径对象会创建并维护这些 SVG 元素。

![geras 路径](/static/blockly/images/rendering/renderers/geras-paths.png)

而 `Thrasos` 渲染器通常使用单一路径并配合描边实现视觉效果。

![thrasos 路径](/static/blockly/images/rendering/renderers/thrasos-paths.png)

路径对象还负责：

- 把[绘制器](/guides/create-custom-blocks/renderers/concepts/drawer)生成的形状应用到 SVG 元素
- 把主题色应用到 SVG 元素，见[主题](/guides/configure/appearance/themes)
- 应用其他 SVG 样式
