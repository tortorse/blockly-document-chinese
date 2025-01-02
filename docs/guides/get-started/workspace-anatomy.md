# 可视化术语表

Blockly 有许多用于描述其不同视觉组件的词汇。本文档介绍了一些最重要的、你需要了解的 Blockly 基础词汇。

## 工作区

工作区是 Blockly 中最高级别的组件。它包含了所有其他组件。这里是你进行编程的地方！

![工作区](/static/images/glossary/workspace.png)

### 工具箱

[工具箱](/guides/configure/toolbox)包含了你用于编程的块。这些块可以被拖拽到工作区中。

主要有两种类型的工具箱：弹出式工具箱和分类工具箱。这两种都可以垂直或水平显示。

#### 弹出式工具箱

弹出式工具箱（也称为简单工具箱）有一组始终显示的块。

![](/static/images/glossary/flyout-toolbox.png)

#### 分类工具箱

分类工具箱有多组块。

![](/static/images/glossary/category-toolbox.png)

点击分类项目会打开一个弹出窗口，显示该分类中的块。

![](/static/images/glossary/category-with-flyout-toolbox.png)

### 垃圾箱

垃圾箱允许你通过拖放来删除块。你也可以点击垃圾箱打开一个弹出窗口，里面包含你删除的块，以便你可以取回它们。

![](/static/images/glossary/trashcan.png)

### 缩放控件

点击[缩放控件](/guides/configure/zoom)可以放大或缩小工作区。

![](/static/images/glossary/zoom-controls.png)

### 上下文菜单

当你右键点击或长按工作区的某些元素（例如工作区背景或块）时，会出现[上下文菜单](/guides/configure/context-menus)。它显示了你可以对该元素执行的操作列表。

![](/static/images/glossary//context-menu.png)

## 块

[块](/guides/create-custom-blocks/define-blocks)是你用来编程的工具。它们代表了文本编程语言中的表达式和语句。

![](/static/images/glossary/blocks.png)

### 块堆栈

块堆栈是任何相互连接的块的集合。它们可以水平或垂直连接。

![](/static/images/glossary/block-stack.png)

### 影子块

影子块是一个可编辑但不可移动的块，它与另一个块相连。你可以将非影子块拖到影子块上来覆盖它们。

![](/static/images/glossary/shadow-blocks.png)

### 插入标记

插入标记是块堆栈放置位置的预览。它看起来像是块的灰色版本。

![](/static/images/glossary/insertion-marker.png)

## 块的组成部分

块有几个不同的部分，你可以编辑和与之交互来进行编程。

### 输入

[输入](/guides/create-custom-blocks/inputs/overview#inputs)通常代表块中的一行。

| 输入 | 图示                                                                    |
| ---- | ----------------------------------------------------------------------- |
| 虚拟 | <img src="/static/images/connections/dummy-input.png" width="45"/>      |
| 值   | <img src="/static/images/connections/input-connection.png" width="45"/> |
| 语句 | <img src="/static/images/connections/statement-input.png" width="45"/>  |

### 连接

[连接](/guides/create-custom-blocks/inputs/overview#connections)是块上其他块可以连接的位置。

| 连接   | 图示                                                                       |
| ------ | -------------------------------------------------------------------------- |
| 输出   | <img src="/static/images/connections/output-connection.png" width="45"/>   |
| 输入   | <img src="/static/images/connections/input-connection.png" width="45"/>    |
| 上一个 | <img src="/static/images/connections/previous-connection.png" width="45"/> |
| 下一个 | <img src="/static/images/connections/next-connection.png" width="45"/>     |

### 字段

[字段](/guides/create-custom-blocks/fields/overview)是块上的可视元素。它可以是可编辑的（如文本输入），或者仅用于显示信息（如标签）。字段总是包含在输入中。

![](/static/images/glossary/fields.png)

### 图标

[图标](/guides/create-custom-blocks/icons/overview)是块上的可视元素。它们总是位于块的左上角，并且通常会创建气泡。

![](/static/images/glossary/icons.png)

![](/static/images/bubbles/bubbles.png)
