# 绘制器

[`Drawer` 类](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.drawer_class)根据[渲染信息](/guides/create-custom-blocks/renderers/concepts/info)生成 SVG 路径，并把结果交给[路径对象](/guides/create-custom-blocks/renderers/concepts/path-object)。

它会把不同可测量对象对应的路径片段拼接起来。这些可测量对象由[常量提供器](/guides/create-custom-blocks/renderers/concepts/constants)定义。

绘制时会使用 Blockly 提供的 [SVG 路径工具](https://developers.google.com/blockly/reference/js/blockly.utils_namespace.svgpaths_namespace)。

绘制器还会更新块内各连接的偏移量。
