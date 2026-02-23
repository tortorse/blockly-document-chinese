# 渲染器概念总览

在开始编写自定义渲染器前，先理解渲染器由哪些组件构成，以及一个块如何被拆分为行和元素。

## 渲染器组件

渲染器由多个组件协作完成，每个组件职责单一，便于复用和扩展。

### 渲染器

[渲染器](/guides/create-custom-blocks/renderers/concepts/renderer)是工厂类，负责组装其他组件。

### 常量提供器

[常量提供器](/guides/create-custom-blocks/renderers/concepts/constants)维护渲染中复用的尺寸、形状和常量。

### 渲染信息

[渲染信息](/guides/create-custom-blocks/renderers/concepts/info)根据块定义计算布局，并生成可测量对象，供绘制器使用。

### 路径对象

[路径对象](/guides/create-custom-blocks/renderers/concepts/path-object)持有构成块外观的 SVG 元素。

### 绘制器

[绘制器](/guides/create-custom-blocks/renderers/concepts/drawer)根据渲染信息生成 SVG 路径，并应用到路径对象。

## 块可测量对象

可测量对象是块中某一矩形区域的抽象。渲染信息通过它们描述块布局。

不同渲染器可以扩展可测量对象，改变数据结构与布局计算逻辑。

### 行

[行](/guides/create-custom-blocks/renderers/concepts/rows)是元素和元素间距组成的横向集合。

![行示意](/static/blockly/images/rendering/debug-renderer/row.png)

### 行间距

[行间距](/guides/create-custom-blocks/renderers/concepts/rows#row_spacer)是两行之间的纵向留白。

![行间距示意](/static/blockly/images/rendering/debug-renderer/row-spacer.png)

### 元素

[元素](/guides/create-custom-blocks/renderers/concepts/elements)表示块上的可见内容，例如[字段](/guides/create-custom-blocks/fields/overview)、[图标](/guides/create-custom-blocks/icons/overview)、连接等。

![元素示意](/static/blockly/images/rendering/debug-renderer/element.png)

### 元素间距

[元素间距](/guides/create-custom-blocks/renderers/concepts/elements#element_spacer)是同一行内元素之间的空白区域。

![元素间距示意](/static/blockly/images/rendering/debug-renderer/element-spacer.png)
