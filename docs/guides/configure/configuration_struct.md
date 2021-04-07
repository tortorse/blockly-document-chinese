# 注入 选项

## 注入

您可以通过调用 `Blockly.inject（location，options）` 来注入一个 Blockly 工作区。 第一个参数告诉Blockly将工作空间注入DOM的位置。 第二个参数是用于配置的名称-值对字典。 注入代码将选项字典解析为 `Blockly.Options` 的实例。

## 直接创建

您还可以直接通过调用创建工作区 `Blockly.WorkspaceSvg(new Blockly.Options(options))`。请注意，您需要调用 `new Blockly.Options(options)`，并传入您的 选项字典-工作区构造函数需要一个实例 `Blockly.Options`，而不是裸选项字典。

## 选项字典

支持以下选项:

| 名称 | 类型 | 描述 |
| --- | --- | :-----:|
| collapse | 布尔型 | 允许折叠或展开块。如果工具箱具有类别，则默认为 true，否则为 false。 |
| comments | 布尔型 | 允许块有注释。如果工具箱具有类别，则默认为 true，否则为 false。 |
| css | 布尔型 | 如果为false，请不要注入CSS（提供CSS成为文档的责任）。默认为 true。 |
| disable | 布尔型 | 允许禁用块。如果工具箱具有类别，则默认为true，否则为false。 |
| grid | 对象 | 配置可以捕捉到块的网格。详见 [网格](/guides/configure/grid) |
| horizontalLayout | 布尔型 | 如果true工具箱是水平的，如果false则工具箱是垂直的。默认为false。 |
| maxBlocks | 数值型 | 可以创建的最大块数。对学生练习很有用。默认为无限。 |
| maxInstances | 对象 | 从块类型映射到可以创建的该类型的最大块数。未声明的类型默认为Infinity。 |
| media | 字符串 | 从页面（或框架）到Blockly媒体目录的路径，默认是“https://blockly-demo.appspot.com/static/media/” |
| move | 对象 | 配置用户如何在工作区中移动的行为。详见《移动》 |
| oneBasedIndex | 布尔型 | 如果true则列表和字符串操作应该从1开始索引，如果false索引从0开始。默认为true。 |
| readOnly | 布尔型 | 如果为true，则阻止用户编辑。隐藏工具箱和垃圾桶。默认为false。 |
| rtl | 布尔型 | 如果为true，则镜像编辑器（对于阿拉伯语或希伯来语语言环境）。请参阅RTL演示。默认为false。 |
| scrollbars | 布尔型 | 设置工作空间是否可滚动。如果工具箱具有类别，则默认为true，否则为false。 |
| sounds | 布尔型 | 如果为false，则不播放声音（例如，单击和删除）。默认为true。 |
| theme | Blockly.Theme | 如果未提供主题，则默认为经典主题。 详见《主题》|
| toolbox | XML nodes 或 字符串 | 用户可用的类别和块的树结构。请参阅下面的详细信息。 |
| toolboxPosition | 字符串 | 如果“start”工具箱位于顶部（如果是水平）或左侧（如果是垂直和LTR）或右侧（如果是垂直和RTL）。如果“end”工具箱位于对面。默认为“start”。 |
| trashcan | 布尔型 | 显示或隐藏垃圾桶。如果工具箱具有类别，则默认为true，否则为false。 |
| maxTrashcanContents | 数值型 | 将显示在垃圾箱弹出窗口中的最大已删除项目数。 '0'禁用该功能。默认为'32'。 |
| zoom | 对象 | 配置缩放行为。详见《缩放》... |