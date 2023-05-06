# 注入 选项

## 注入

您可以通过调用 `Blockly.inject（location，options）` 来注入一个 Blockly 工作区。 第一个参数告诉 Blockly 将工作空间注入 DOM 的位置。 第二个参数是用于配置的名称-值对字典。 注入代码将选项字典解析为 `Blockly.Options` 的实例。

## 直接创建

您还可以通过直接调用 `Blockly.WorkspaceSvg(new Blockly.Options(options))` 创建工作区。请注意，您需要调用 `new Blockly.Options(options)`，并传入您的选项字典——工作区构造函数需要一个实例 `Blockly.Options`，而不是裸选项字典。

## 选项字典

支持以下选项:

| 名称 | 类型 | 描述 |
| --- | --- | -----|
| collapse | 布尔型 | 允许折叠或展开块。如果工具箱具包含分类，则默认为 true，否则为 false。 |
| comments | 布尔型 | 允许块有注释。如果工具箱具包含分类，则默认为 true，否则为 false。 |
| css | 布尔型 | 如果为 false，请不要注入 CSS（提供CSS成为文档的责任）。默认为 true。 |
| disable | 布尔型 | 允许禁用块。如果工具箱具有类别，则默认为 true，否则为 false。 |
| grid | 对象 | 配置可以捕捉到块的网格。详见 [网格](/guides/configure/grid.html) |
| horizontalLayout | 布尔型 | 如果 true 工具箱是水平的，如果 false 则工具箱是垂直的。默认为 false。 |
| maxBlocks | 数值型 | 可以创建的最大块数。对学生练习很有用。默认为 Infinity。 |
| maxInstances | 对象 | 从块类型映射到可以创建的该类型的最大块数。未声明的类型默认为 Infinity。 |
| media | 字符串 | 从页面（或框架）到 Blockly 媒体目录的路径，默认是 “https://blockly-demo.appspot.com/static/media/” |
| move | 对象 | 配置用户如何在工作区中移动的行为。详见 [移动](/guides/configure/move.html) |
| oneBasedIndex | 布尔型 | 如果 true 则列表和字符串操作应该从 1 开始索引，如果 false 索引从 0 开始。默认为 true。 |
| readOnly | 布尔型 | 如果为 true，则阻止用户编辑。隐藏工具箱和垃圾桶。默认为 false。 |
| renderer | 字符串 | 确定 blockly使用的渲染器。 预打包的渲染器包括 'geras'（默认值），'thrasos' 和 'zelos' (类似 scratch 的渲染器）。 |
| rtl | 布尔型 | 如果为 true，则镜像编辑器（对于阿拉伯语或希伯来语语言环境）。请参阅 [RTL demo](https://blockly-demo.appspot.com/static/demos/rtl/index.html)。默认为 false。 |
| scrollbars | 对象 或 布尔型 | 设置工作空间是否可滚动。使用对象时，其中的 horizontal 属性确定是否启用水平滚动，而 vertical 属性确定了是否启用垂直滚动。 如果传递了布尔值，则等效于传递水平和垂直属性均设置为该值的对象。 如果工作空间具有类别，则默认为 true。 |
| sounds | 布尔型 | 如果为 false，则不播放声音（例如，单击和删除）。默认为 true。 |
| theme | Blockly.Theme | 如果未提供主题，则默认为经典主题。 详见 [主题](/guides/configure/themes.html) |
| toolbox | XML nodes 或 字符串 | 用户可用的分类及块的树状结构。请参阅 [定义块](/guides/configure/toolbox.html) 获取详细信息。 |
| toolboxPosition | 字符串 | 设置为 “start” 工具箱位于顶部（如果是水平）或左侧（如果是垂直和 LTR）或右侧（如果是垂直和 RTL）。设置为 “end” 工具箱位相反。默认为“start”。 |
| trashcan | 布尔型 | 显示或隐藏垃圾桶。如果工具箱包含分类，则默认为 true，否则为 false。 |
| maxTrashcanContents | 数值型 | 将在弹出窗口中显示垃圾箱的最大已删除项目数。 '0' 禁用该功能。默认为 '32'。 |
| plugins | 对象 | 插件类型与已注册插件或插件类名的映射。 |
| zoom | 对象 | 配置缩放行为。详见 [缩放](/guides/configure/zoom.html) |