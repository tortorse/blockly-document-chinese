# 工作区注释

工作区注释是可输入文本的图形元素，通常用于给代码添加说明，作用类似文本编程语言中的注释。

<img src="/static/blockly/images/workspace-comments/workspace-comment.png" alt="工作区注释" width="150">

::: tip 注意
工作区注释不能添加到工具箱的弹出区中。
:::

## 启用工作区注释

要在应用中启用工作区注释，你需要给用户提供创建入口。常见做法是在上下文菜单中加入“创建工作区注释”选项。  
下面代码会注册默认的工作区注释菜单项（创建、删除、复制）：

```javascript
// 建议在页面加载时调用。可在注入工作区之前或之后调用。
Blockly.ContextMenuItems.registerCommentOptions();
```

你也可以自己实现上下文菜单项，或提供其他创建方式。更多见 [上下文菜单](/guides/configure/context-menus)。

## 视觉样式自定义

工作区注释支持多种外观自定义方式。这里使用的是 CSS，而不是 [主题](/guides/configure/appearance/themes)。  
你可以控制注释不同部分的大多数颜色和尺寸，但不能改变这些部分的布局位置。

### 颜色 CSS 变量

可通过 `commentFillColour` 调整文本区域背景色，通过 `commentBorderColour` 调整顶部栏和边框颜色。

```css
.blocklyWorkspace {
  --commentFillColour: blue;
  --commentBorderColour: red;
}
```

<img src="/static/blockly/images/workspace-comments/coloured-comment.png" alt="修改颜色后的工作区注释" width="150">

### CSS 类

注释视图不同元素会带有不同 CSS 类，你可以基于这些类定向改样式。

| CSS 类 | 图示 |
| --- | --- |
| `blocklyComment`, `blocklyDraggable` | <img src="/static/blockly/images/workspace-comments/workspace-comment-outline.png" alt="工作区注释整体" width="150"> |
| `blocklySelected`, `blocklyCommentHighlight` | <img src="/static/blockly/images/workspace-comments/selected-comment.png" alt="选中注释" width="150"> <img src="/static/blockly/images/workspace-comments/selected-collapsed.png" alt="选中折叠注释" width="150"> |
| `blocklyCollapsed` | <img src="/static/blockly/images/workspace-comments/collapsed-outline.png" alt="折叠注释" width="150"> |
| `blocklyCommentTopbar` | <img src="/static/blockly/images/workspace-comments/top-bar-outline.png" alt="顶部栏" width="150"> |
| `blocklyFoldoutIcon` | <img src="/static/blockly/images/workspace-comments/foldout-icon-outline.png" alt="展开收起图标" width="150"> |
| `blocklyCommentPreview`, `blocklyText` | <img src="/static/blockly/images/workspace-comments/preview-text-outline.png" alt="预览文本" width="150"> |
| `blocklyDeleteIcon` | <img src="/static/blockly/images/workspace-comments/delete-icon-outline.png" alt="删除图标" width="150"> |
| `blocklyText` | <img src="/static/blockly/images/workspace-comments/text-input-outline.png" alt="输入文本" width="150"> |
| `blocklyResizeHandle` | <img src="/static/blockly/images/workspace-comments/resize-handle-outline.png" alt="缩放手柄" width="150"> |

#### 基础 CSS 用法

多数情况下，直接对对应类添加样式即可：

```css
.blocklyCommentTopbarBackground {
  height: 50px;
}
```

<img src="/static/blockly/images/workspace-comments/tall-top-bar.png" alt="更高顶部栏" width="150">

#### 文本相关 CSS

文本样式需要更具体的选择器，才能覆盖渲染器生成的默认样式。

```css
/* 修改预览文本。 */
.blocklyComment .blocklyCommentPreview.blocklyText {
  fill: blue;
}

/* 修改输入文本。 */
.blocklyComment .blocklyText {
  color: blue;
}
```

<img src="/static/blockly/images/workspace-comments/blue-preview-text.png" alt="蓝色预览文本" width="150">

<img src="/static/blockly/images/workspace-comments/blue-text.png" alt="蓝色输入文本" width="150">

#### 选中高亮 CSS

注释被选中时，高亮样式应用对象取决于是否折叠：  
展开状态应用到 `blocklyCommentHighlight`，折叠状态应用到 `blocklyCommentTopbarBackground`。

```css
/* 展开状态高亮。 */
.blocklySelected .blocklyCommentHighlight {
  stroke: #fc3;
  stroke-width: 3px;
}

/* 折叠状态隐藏默认高亮。 */
.blocklyCollapsed.blocklySelected .blocklyCommentHighlight {
  stroke: none;
}

/* 折叠状态改为高亮顶部栏。 */
.blocklyCollapsed.blocklySelected .blocklyCommentTopbarBackground {
  stroke: #fc3;
  stroke-width: 3px;
}
```

### 图标

`blocklyFoldoutIcon`、`blocklyDeleteIcon`、`blocklyResizeHandle` 都应用在 `<image>` 元素上。  
如果你想改图标颜色或形状，可以在 `media` 目录中提供替换图像资源。

| 图像文件名 | 图示 |
| --- | --- |
| `foldout-icon.svg` | <img src="/static/blockly/images/workspace-comments/foldout-icon-outline.png" alt="展开收起图标" width="150"> |
| `delete-icon.svg` | <img src="/static/blockly/images/workspace-comments/delete-icon-outline.png" alt="删除图标" width="150"> |
| `resize-handle.svg` | <img src="/static/blockly/images/workspace-comments/resize-handle-outline.png" alt="缩放手柄" width="150"> |

#### 删除图标

删除图标默认隐藏。如果要启用，需要用 CSS 显示它：

```css
.blocklyDeleteIcon {
  display: block;
}
```

### 默认尺寸

可通过 `Blockly.comments.CommentView.defaultCommentSize` 设置默认注释尺寸：

```javascript
Blockly.comments.CommentView.defaultCommentSize = new Blockly.utils.Size(200, 200);
```
