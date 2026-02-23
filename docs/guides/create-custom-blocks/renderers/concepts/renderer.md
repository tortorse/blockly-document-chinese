# 渲染器

[`Renderer` 类](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.renderer_class)是一个工厂类，用于把渲染器的各个组件组装在一起。

它负责创建并连接这些组件：

- [常量提供器](/guides/create-custom-blocks/renderers/concepts/constants)
- [渲染信息](/guides/create-custom-blocks/renderers/concepts/info)
- [路径对象](/guides/create-custom-blocks/renderers/concepts/path-object)
- [绘制器](/guides/create-custom-blocks/renderers/concepts/drawer)

在块渲染时，`Renderer` 也负责它们之间的协作流程。

如果你只想调整某个现有渲染器的一部分，例如常量配置，通常可以通过继承对应的工厂方法来实现，而不必重写整个渲染器。
