# 度量管理器

度量管理器会收集并返回与 Blockly 工作区相关的各类度量数据。本文说明每一组度量的含义。更多背景可观看官方视频：[2021 年度量深入讲解](https://www.youtube.com/watch?v=6e6vntCqbic&list=PLSIUOFhnxEiCjoIwJ0jAdwpTZET73CK7d&index=9)。

## 度量项

### 工具箱度量

`workspace.getMetricsManager().getToolboxMetrics();`

工具箱度量由分类工具箱的 `height`、`width` 和 `position` 组成，不包含其附带弹出区的信息。

<img src="/static/blockly/images/metrics_manager/toolbox_metrics.png" alt="展示工具箱宽高的 Blockly workspace" width="300">

其中 `position` 的类型为 `Blockly.utils.toolbox.Position`。

### 弹出工具箱度量

`workspace.getMetricsManager().getFlyoutMetrics();`

弹出工具箱度量由弹出工具箱的 `height`、`width` 和 `position` 组成。这里特指弹出工具箱本身，不是分类工具箱旁边附带的弹出区。

<img src="/static/blockly/images/metrics_manager/flyout_toolbox_metrics.png" alt="展示 flyout 宽高的 Blockly workspace" width="300">

其中 `position` 的类型也为 `Blockly.utils.toolbox.Position`。

### 容器度量

`workspace.getMetricsManager().getSvgMetrics();`

容器度量由工作区父级 SVG 的 `width` 和 `height` 组成。对于主工作区，这个 SVG 是带有 `blocklySvg` 类名的元素。该 SVG 同时包含可见工作区和工具箱。

<img src="/static/blockly/images/metrics_manager/svg_metrics.png" alt="SVG 边界示意图" width="300">

### 视口度量

`workspace.getMetricsManager().getViewMetrics(opt_getWorkspaceCoordinates);`

视口度量由视口的 `height`、`width`、`top` 和 `left` 组成。视口是当前可见工作区区域，不包含任意类型的工具箱。

<img src="/static/blockly/images/metrics_manager/view_metrics.png" alt="不含工具箱的可见视口区域示意图" width="300">

`top` 与 `left` 相对于工作区原点。随着拖拽平移，视口的 `top/left` 会更新。

<img src="/static/blockly/images/metrics_manager/view_metrics_origin.png" alt="带原点偏移示意的视口区域图" width="300">

### 绝对度量

`workspace.getMetricsManager().getAbsoluteMetrics();`

绝对度量由视口相对父级 SVG 的 `top` 和 `left` 偏移组成。根据工具箱的位置不同，这个偏移通常等于工具箱的宽度或高度。

<img src="/static/blockly/images/metrics_manager/absolute_metrics.png" alt="垂直工具箱下的绝对偏移示意图" width="300">
<img src="/static/blockly/images/metrics_manager/absolute_metrics_2.png" alt="水平工具箱下的绝对偏移示意图" width="300">

### 内容度量

`workspace.getMetricsManager().getContentMetrics(opt_getWorkspaceCoordinates);`

内容度量由包含所有块和工作区注释的包围盒 `height`、`width`、`top` 和 `left` 组成。

::: tip 注意
内容度量不包含块注释，只包含工作区注释。
:::

<img src="/static/blockly/images/metrics_manager/content_metrics.png" alt="workspace 内容包围盒示意图" width="300">

### 滚动度量

`workspace.getMetricsManager().getScrollMetrics(opt_getWorkspaceCoordinates);`

滚动度量由可滚动区域的 `height`、`width`、`top` 和 `left` 组成。对于可移动工作区，可滚动区域等于内容区域加上一段留白。

<img src="/static/blockly/images/metrics_manager/scroll_metrics.png" alt="可滚动区域示意图" width="300">

## 坐标系

默认情况下，度量管理器返回的是像素坐标。对于支持的度量方法，可传入 `true` 返回工作区坐标，例如：

`metricsManager.getViewMetrics(true)`

```text
workspaceCoordinate = pixelCoordinates / workspace.scale
```

工作区坐标通常用于位于工作区上的对象，如块和工作区注释。用户缩放时，工作区坐标本身不会变化。

## 覆盖度量行为

如果你希望为工作区提供自定义度量逻辑，可注册一个替代度量管理器对象。该对象需实现 `IMetricsManager` 接口，或继承 `Blockly.MetricsManager`。

示例可参考：

- [Continuous Toolbox 插件示例](https://github.com/RaspberryPiFoundation/blockly-samples/blob/main/plugins/continuous-toolbox/src/ContinuousMetrics.ts)
- [Fixed Edges 插件示例](https://github.com/RaspberryPiFoundation/blockly-samples/blob/main/plugins/fixed-edges/src/index.js)
