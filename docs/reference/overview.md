# 参考

## blockly 软件包

## 类

| 类                                                                                                                     | 说明                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ASTNode](https://developers.google.com/blockly/reference/js/blockly.astnode_class.md)                                | AST 节点的类。建议您使用其中一个 createNode 方法，而不是直接创建节点。                                                                                                             |
| [BasicCursor](https://developers.google.com/blockly/reference/js/blockly.basiccursor_class.md)                            | 用于基本光标的类。这将使用户能够通过点击“下一页”或“上一页”转到 AST 中的所有节点。                                                                                                  |
| [Block](https://developers.google.com/blockly/reference/js/blockly.block_class.md)                                        | 一个块的类。通常不直接调用，建议使用 workspace.newBlock()。                                                                                                                        |
| [BlockDragger](https://developers.google.com/blockly/reference/js/blockly.blockdragger_class.md)                       | 块拖动器的类。当用户通过鼠标或触摸操作来拖动工作区时，这些块会移到工作区中。                                                                                                       |
| [BlockDragSurfaceSvg](https://developers.google.com/blockly/reference/js/blockly.blockdragsurfacesvg_class.md)         | 此类用于当前拖动的块的拖动表面。这是一个单独的 SVG，仅包含当前移动的块，或不包含任何内容。                                                                                         |
| [BlockSvg](https://developers.google.com/blockly/reference/js/blockly.blocksvg_class.md)                               | 用于块的 SVG 表示法的类。通常不直接调用，建议使用 workspace.newBlock()。                                                                                                           |
| [Bubble](https://developers.google.com/blockly/reference/js/blockly.bubble_class.md)                                     | 用于界面气泡的类。                                                                                                                                                                 |
| [BubbleDragger](https://developers.google.com/blockly/reference/js/blockly.bubbledragger_class.md)                      | 气泡拖动器的类。当用户通过鼠标或触摸操作拖动气泡时，系统会在画布上移动这些内容。包括块评论、更改器、警告或工作区评论。                                                             |
| [CodeGenerator](https://developers.google.com/blockly/reference/js/blockly.codegenerator_class.md)                        | 用于将代码块转换为语言的代码生成器类。                                                                                                                                             |
| [CollapsibleToolboxCategory](https://developers.google.com/blockly/reference/js/blockly.collapsibletoolboxcategory_class.md)     | 工具箱中某个类别的类，可收起。                                                                                                                                                     |
| [Comment](https://developers.google.com/blockly/reference/js/blockly.comment_class.md)                                    | 注释的类。                                                                                                                                                                         |
| [ComponentManager](https://developers.google.com/blockly/reference/js/blockly.componentmanager_class.md)                     | 已向工作区注册的所有项的管理器。                                                                                                                                                   |
| [Connection](https://developers.google.com/blockly/reference/js/blockly.connection_class.md)                                 | 用于块之间的连接的类。                                                                                                                                                             |
| [ConnectionChecker](https://developers.google.com/blockly/reference/js/blockly.connectionchecker_class.md)             | 用于连接类型检查逻辑的类。                                                                                                                                                         |
| [ConnectionDB](https://developers.google.com/blockly/reference/js/blockly.connectiondb_class.md)                       | 连接数据库。连接按其垂直组件的顺序存储。这样，使用二进制搜索可以快速查找某个区域内的连接。                                                                                         |
| [ContextMenuRegistry](https://developers.google.com/blockly/reference/js/blockly.contextmenuregistry_class.md)              | 用于注册菜单项的类。此属性应是单例。您不应创建新实例，而应仅从 ContextMenuRegistry.registry 访问此类。                                                                             |
| [Cursor](https://developers.google.com/blockly/reference/js/blockly.cursor_class.md)                                   | 光标的类。光标用于控制用户如何进行 Blockly AST 导航。                                                                                                                              |
| [DeleteArea](https://developers.google.com/blockly/reference/js/blockly.deletearea_class.md)                             | 组件的抽象类，该类可以删除放置在上面的块或气泡。                                                                                                                                   |
| [DragTarget](https://developers.google.com/blockly/reference/js/blockly.dragtarget_class.md)                             | 一个组件的抽象类，当某个组件或气泡在组件上方或下方拖动时，具有自定义行为的组件。                                                                                                   |
| [Field](https://developers.google.com/blockly/reference/js/blockly.field_class.md)                                      | 可编辑字段的抽象类。                                                                                                                                                               |
| [FieldAngle](https://developers.google.com/blockly/reference/js/blockly.fieldangle_class.md)                           | 用于可编辑角度字段的类。                                                                                                                                                           |
| [FieldCheckbox](https://developers.google.com/blockly/reference/js/blockly.fieldcheckbox_class.md)                     | 复选框字段的类。                                                                                                                                                                   |
| [FieldColour](https://developers.google.com/blockly/reference/js/blockly.fieldcolour_class.md)                         | 颜色输入字段的类。                                                                                                                                                                 |
| [FieldDropdown](https://developers.google.com/blockly/reference/js/blockly.fielddropdown_class.md)                      | 用于可修改下拉菜单字段的类。                                                                                                                                                       |
| [FieldImage](https://developers.google.com/blockly/reference/js/blockly.fieldimage_class.md)                           | 用于块上的图像的类。                                                                                                                                                               |
| [FieldLabel](https://developers.google.com/blockly/reference/js/blockly.fieldlabel_class.md)                           | 用于不可修改、不可序列化的文本字段的类。                                                                                                                                           |
| [FieldLabelSerializable](https://developers.google.com/blockly/reference/js/blockly.fieldlabelserializable_class.md)   | 用于不可修改且可序列化的文本字段的类。                                                                                                                                             |
| [FieldMultilineInput](https://developers.google.com/blockly/reference/js/blockly.fieldmultilineinput_class.md)         | 用于可编辑文本字段的类。                                                                                                                                                           |
| [FieldNumber](https://developers.google.com/blockly/reference/js/blockly.fieldnumber_class.md)                         | 用于可修改的数字字段的类。                                                                                                                                                         |
| [FieldTextInput](https://developers.google.com/blockly/reference/js/blockly.fieldtextinput_class.md)                   |                                                                                                                                                                                    |
| [FieldVariable](https://developers.google.com/blockly/reference/js/blockly.fieldvariable_class.md)                     | 变量的下拉字段的类。                                                                                                                                                               |
| [Flyout](https://developers.google.com/blockly/reference/js/blockly.flyout_class.md)                                   | 一个飞出课程。                                                                                                                                                                     |
| [FlyoutButton](https://developers.google.com/blockly/reference/js/blockly.flyoutbutton_class.md)                       | 用于飞出按钮或标签的类。                                                                                                                                                           |
| [FlyoutMetricsManager](https://developers.google.com/blockly/reference/js/blockly.flyoutmetricsmanager_class.md)       | 计算飞出工作区的指标。这些指标主要用于调整飞出滚动条的大小。                                                                                                                       |
| [Gesture](https://developers.google.com/blockly/reference/js/blockly.gesture_class.md)                                    | 用于一个手势的类。                                                                                                                                                                 |
| [Grid](https://developers.google.com/blockly/reference/js/blockly.grid_class.md)                                       | 工作区网格的类。                                                                                                                                                                   |
| [HorizontalFlyout](https://developers.google.com/blockly/reference/js/blockly.horizontalflyout_class.md)                       | 一个飞出课程。                                                                                                                                                                     |
| [Icon](https://developers.google.com/blockly/reference/js/blockly.icon_class.md)                                       | 图标的类。                                                                                                                                                                         |
| [Input](https://developers.google.com/blockly/reference/js/blockly.input_class.md)                                      | 包含可选字段的输入的类。                                                                                                                                                           |
| [InsertionMarkerManager](https://developers.google.com/blockly/reference/js/blockly.insertionmarkermanager_class.md)   | 用于控制拖动期间连接更新的类。它主要负责查找最符合条件的连接，并在拖动期间根据需要突出显示或取消突出显示。                                                                         |
| [Marker](https://developers.google.com/blockly/reference/js/blockly.marker_class.md)                                   | 用于标记的类。该键用于在键盘导航中将位置保存在 Blockly AST 中。                                                                                                                    |
| [MarkerManager](https://developers.google.com/blockly/reference/js/blockly.markermanager_class.md)                     | 用于管理工作区上的多个标记和光标的类。                                                                                                                                             |
| [Menu](https://developers.google.com/blockly/reference/js/blockly.menu_class.md)                                       | 基本菜单类。                                                                                                                                                                       |
| [MenuItem](https://developers.google.com/blockly/reference/js/blockly.menuitem_class.md)                               | 代表菜单项的类。                                                                                                                                                                   |
| [MetricsManager](https://developers.google.com/blockly/reference/js/blockly.metricsmanager_class.md)                   | 所有工作区指标计算的管理器。                                                                                                                                                       |
| [Mutator](https://developers.google.com/blockly/reference/js/blockly.mutator_class.md)                                  | 转变器对话框的类。                                                                                                                                                                 |
| [Names](https://developers.google.com/blockly/reference/js/blockly.names_class.md)                                      | 实体名称数据库（变量、过程等）的类。                                                                                                                                               |
| [Options](https://developers.google.com/blockly/reference/js/blockly.options_class.md)                                    | 使用合理的默认设置解析用户指定的选项（行为未指定）。                                                                                                                               |
| [RenderedConnection](https://developers.google.com/blockly/reference/js/blockly.renderedconnection_class.md)           | 此类用于连接可能在屏幕中呈现的块之间的连接。                                                                                                                                       |
| [Scrollbar](https://developers.google.com/blockly/reference/js/blockly.scrollbar_class.md)                                | 用于纯 SVG 滚动条的类。此技术提供的滚动条保证能够正常运行，但其外观或行为可能不如系统的滚动条。                                                                                    |
| [ScrollbarPair](https://developers.google.com/blockly/reference/js/blockly.scrollbarpair_class.md)                     | 用于一对滚动条的类。水平和垂直。                                                                                                                                                   |
| [ShortcutRegistry](https://developers.google.com/blockly/reference/js/blockly.shortcutregistry_class.md)               | 用于注册键盘快捷键的类。此属性应是单例。您不应创建新实例，而只能从 ShortcutRegistry.registry 访问此类。                                                                            |
| [TabNavigateCursor](https://developers.google.com/blockly/reference/js/blockly.tabnavigatecursor_class.md)             | 用于在标签页可导航字段之间导航的光标。                                                                                                                                             |
| [Theme](https://developers.google.com/blockly/reference/js/blockly.theme_class.md)                                      | 主题的类。                                                                                                                                                                         |
| [ThemeManager](https://developers.google.com/blockly/reference/js/blockly.thememanager_class.md)                       | 用于存储和更新工作区主题和界面组件的类。                                                                                                                                           |
| [Toolbox](https://developers.google.com/blockly/reference/js/blockly.toolbox_class.md)                                  | 工具箱的类。创建工具箱的 DOM。                                                                                                                                                     |
| [ToolboxCategory](https://developers.google.com/blockly/reference/js/blockly.toolboxcategory_class.md)                      | 工具箱中的类别类。                                                                                                                                                                 |
| [ToolboxItem](https://developers.google.com/blockly/reference/js/blockly.toolboxitem_class.md)                         | 工具箱中项目的类。                                                                                                                                                                 |
| [ToolboxSeparator](https://developers.google.com/blockly/reference/js/blockly.toolboxseparator_class.md)               | 工具箱分隔符的类。这是工具箱上显示的细线。此项目无法交互。                                                                                                                         |
| [Trashcan](https://developers.google.com/blockly/reference/js/blockly.trashcan_class.md)                                 | 垃圾桶类。                                                                                                                                                                         |
| [VariableMap](https://developers.google.com/blockly/reference/js/blockly.variablemap_class.md)                            | 用于变量映射的类。其中包含一个字典数据结构，其中变量类型为键，变量列表为值。变量列表是由键指定的类型。                                                                             |
| [VariableModel](https://developers.google.com/blockly/reference/js/blockly.variablemodel_class.md)                          | 变量模型的类。保存变量的信息，包括名称、ID 和类型。                                                                                                                                |
| [VerticalFlyout](https://developers.google.com/blockly/reference/js/blockly.verticalflyout_class.md)                   | 一个飞出课程。                                                                                                                                                                     |
| [Warning](https://developers.google.com/blockly/reference/js/blockly.warning_class.md)                                    | 警告对应的类。                                                                                                                                                                     |
| [Workspace](https://developers.google.com/blockly/reference/js/blockly.workspace_class.md)                                | 工作区类。这是一种包含数据块的数据结构。没有界面，可以无头创建。                                                                                                                   |
| [WorkspaceAudio](https://developers.google.com/blockly/reference/js/blockly.workspaceaudio_class.md)                   | 用于加载、存储和播放工作区音频的类。                                                                                                                                               |
| [WorkspaceComment](https://developers.google.com/blockly/reference/js/blockly.workspacecomment_class.md)                 | 工作区注释的类。                                                                                                                                                                   |
| [WorkspaceCommentsSvg](https://developers.google.com/blockly/reference/js/blockly.workspacecommentsvg_class.md)        | 工作区注释的 SVG 表示法的类。                                                                                                                                                      |
| [WorkspaceDragger](https://developers.google.com/blockly/reference/js/blockly.workspacedragger_class.md)               | 工作区拖动器的类。当用户通过鼠标或触摸操作来拖动工作区时，工作区会四处移动。请注意，工作区本身管理它是否具有拖动表面，以及如何根据拖动表面进行转换。这只会根据事件传递正确的命令。 |
| [WorkspaceDragSurfaceSvg](https://developers.google.com/blockly/reference/js/blockly.workspacedragsurfacesvg_class.md) | 拖动期间，相关块会被移到此 SVG 中，从而提升了性能。整个 SVG 都使用 CSS 转换（而不是 SVG）进行转换，因此，在拖动提升期间，块绝不会被重新绘制。                                      |
| [WorkspaceSvg](https://developers.google.com/blockly/reference/js/blockly.workspacesvg_class.md)                       | 工作区类。屏幕上的这一区域包含可选的垃圾桶、滚动条、气泡和拖动。                                                                                                                   |
| [ZoomControls](https://developers.google.com/blockly/reference/js/blockly.zoomcontrols_class.md)                       | 缩放控件的类。                                                                                                                                                                     |

## 枚举

| 枚举项                                                                                   | 说明                   |
| --------------------------------------------------------------------------------------------- | ---------------------- |
| [ConnectionType](https://developers.google.com/blockly/reference/js/blockly.connectiontype_enum.md) | 连接或输入类型的枚举。 |
| [inputTypes](https://developers.google.com/blockly/reference/js/blockly.inputtypes_enum.md)     | 连接或输入类型的枚举。 |

## 函数

| 函数                                                                                                                                                                                                 | 说明                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [bindEvent\_(node, name, thisObject, Func)](https://developers.google.com/blockly/reference/js/blockly.bindevent__1_function.md)                                                                      | 绑定应调用的事件处理脚本（无论其是否属于有效触摸流）。它可用于不属于多部分手势的事件（例如，用于鼠标悬停的提示）。                                                 |
| [bindEventWithChecks\_(node, name, thisObject, Func, opt_noCaptureIdentifier, \_opt_nopreventDefault)](https://developers.google.com/blockly/reference/js/blockly.bindeventwithchecks__1_function.md) | 绑定一个事件处理脚本，如果事件不是活动触摸流的一部分，则可将其忽略。此方法适用于启动或继续多部分手势（例如，鼠标点击或鼠标移动，可能是拖动或点击的一部分）的事件。 |
| [copy(toCopy)](https://developers.google.com/blockly/reference/js/blockly.copy_1_function.md)                                                                                                         | 将文本块或工作区注释复制到本地剪贴板。                                                                                                                             |
| [duplicate(toDuplicate)](https://developers.google.com/blockly/reference/js/blockly.duplicate_1_function.md)                                                                                          | 复制此块及其子项，或工作区注释。                                                                                                                                   |
| [hideChaff(opt_onlyClosePopup)](https://developers.google.com/blockly/reference/js/blockly.hidechaff_1_function.md)                                                                                   | 关闭提示、上下文菜单、下拉菜单选项等                                                                                                                               |
| [hueToHex(hue)](https://developers.google.com/blockly/reference/js/blockly.huetohex_1_function.md)                                                                                                    | 将色调（HSV 模型）转换为 RGB 十六进制三元组。                                                                                                                      |
| [ject(container, opt_options)](https://developers.google.com/blockly/reference/js/blockly.inject_1_function.md)                                                                                       | 将 Blockly 编辑器注入指定的容器元素（通常是 div）。                                                                                                                |
| [isNumber(str)](https://developers.google.com/blockly/reference/js/blockly.isnumber_1_function.md)                                                                                                    | 给定字符串是否为数字（包括负和小数）。                                                                                                                             |
| [paste()](https://developers.google.com/blockly/reference/js/blockly.paste_1_function.md)                                                                                                                | 将代码块或工作区注释粘贴到主工作区。                                                                                                                               |
| [unbindEvent\_(bindData)](https://developers.google.com/blockly/reference/js/blockly.unbindevent__1_function.md)                                                                                      | 一个或多个事件事件与函数调用解除绑定。                                                                                                                             |

## 接口

| 接口                                                                                                                           | 说明                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [BlocklyOptions](https://developers.google.com/blockly/reference/js/blockly.blocklyoptions_interface.md)                         | 块选项。                                                                     |
| [IASTNodeLocation](https://developers.google.com/blockly/reference/js/blockly.iastnodelocation_interface.md)                      | AST 节点位置接口。                                                           |
| [IASTNodeLocationSvg](https://developers.google.com/blockly/reference/js/blockly.iastnodelocationsvg_interface.md)             | AST 节点位置 SVG 接口。                                                      |
| [IASTNodeLocationWithBlock](https://developers.google.com/blockly/reference/js/blockly.iastnodelocationwithblock_interface.md) | 具有关联块的 AST 节点位置。                                                  |
| [IAutoHideable](https://developers.google.com/blockly/reference/js/blockly.iautohideable_interface.md)                         | 可自动隐藏的组件的接口。                                                     |
| [IBlockDragger](https://developers.google.com/blockly/reference/js/blockly.iblockdragger_interface.md)                         | 块拖动界面。                                                                 |
| [IBoundedElement](https://developers.google.com/blockly/reference/js/blockly.iboundedelement_interface.md)                     | 有界限元素接口。                                                             |
| [IBubble](https://developers.google.com/blockly/reference/js/blockly.ibubble_interface.md)                                     | 气泡界面。                                                                   |
| [ICollapsibleToolboxItem](https://developers.google.com/blockly/reference/js/blockly.icollapsibletoolboxitem_interface.md)     | 工具箱中可收起项的界面。                                                     |
| [IComponent](https://developers.google.com/blockly/reference/js/blockly.icomponent_interface.md)                               | 工作区组件的接口，该组件可通过 ComponentManager 注册。                       |
| [IConnectionChecker](https://developers.google.com/blockly/reference/js/blockly.iconnectionchecker_interface.md)               | 用于连接类型检查逻辑的类。                                                   |
| [IContextMenu](https://developers.google.com/blockly/reference/js/blockly.icontextmenu_interface.md)                           |                                                                              |
| [ICopyable](https://developers.google.com/blockly/reference/js/blockly.icopyable_interface.md)                                 |                                                                              |
| [IDeletable](https://developers.google.com/blockly/reference/js/blockly.ideletable_interface.md)                                   | 可以删除的对象接口。                                                         |
| [IDeleteArea](https://developers.google.com/blockly/reference/js/blockly.ideletearea_interface.md)                             | 组件的接口，可删除置于其上的块或气泡。                                       |
| [IDraggable](https://developers.google.com/blockly/reference/js/blockly.idraggable_interface.md)                                   | 可拖动对象的接口。                                                           |
| [IDragTarget](https://developers.google.com/blockly/reference/js/blockly.idragtarget_interface.md)                             | 一个组件的行为组件，当某个组件或气泡拖到该组件或气泡之上时，具有自定义行为。 |
| [IFlyout](https://developers.google.com/blockly/reference/js/blockly.iflyout_interface.md)                                     | 一个飞出界面。                                                               |
| [IKeyboardAccessible](https://developers.google.com/blockly/reference/js/blockly.ikeyboardaccessible_interface.md)             | 处理键盘快捷键的对象的接口。                                                 |
| [IMetricsManager](https://developers.google.com/blockly/reference/js/blockly.imetricsmanager_interface.md)                     | 指标管理器的界面。                                                           |
| [IMovable](https://developers.google.com/blockly/reference/js/blockly.imovable_interface.md)                                       | 可移动对象的接口。                                                           |
| [IPositionable](https://developers.google.com/blockly/reference/js/blockly.ipositionable_interface.md)                                | 位于工作区上方的组件的接口。                                                 |
| [可注册](https://developers.google.com/blockly/reference/js/blockly.iregistrable_interface.md)                                 | 可注册的 Blockly 组件的接口。                                                |
| [IRegistrable](https://developers.google.com/blockly/reference/js/blockly.iselectable_interface.md)                             | 可选对象的接口。                                                             |
| [ISelectableToolboxItem](https://developers.google.com/blockly/reference/js/blockly.iselectabletoolboxitem_interface.md)       | 工具箱中选定项的界面。                                                       |
| [IStyleable](https://developers.google.com/blockly/reference/js/blockly.istyleable_interface.md)                               | 可添加样式的对象的界面。                                                     |
| [Iboxbox](https://developers.google.com/blockly/reference/js/blockly.itoolbox_interface.md)                                    | 工具箱的界面。                                                               |
| [IToolboxItem](https://developers.google.com/blockly/reference/js/blockly.itoolboxitem_interface.md)                           | 工具箱中某一项的界面。                                                       |

## 命名空间

| 命名空间                                                                                                                 | 说明 |
| ------------------------------------------------------------------------------------------------------------------------ | ---- |
| [ASTNode](https://developers.google.com/blockly/reference/js/blockly.astnode_namespace.md)                              |      |
| [Block](https://developers.google.com/blockly/reference/js/blockly.block_namespace.md)                                      |      |
| [blockAnimations](https://developers.google.com/blockly/reference/js/blockly.blockanimations_namespace.md)               |      |
| [blockRendering](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.md)                 |      |
| [browserEvents](https://developers.google.com/blockly/reference/js/blockly.browserevents_namespace.md)                   |      |
| [bumpObjects](https://developers.google.com/blockly/reference/js/blockly.bumpobjects_namespace.md)                       |      |
| [clipboard](https://developers.google.com/blockly/reference/js/blockly.clipboard_namespace.md)                              |      |
| [CollapsibleToolboxCategory](https://developers.google.com/blockly/reference/js/blockly.collapsibletoolboxcategory_namespace.md)   |      |
| [common](https://developers.google.com/blockly/reference/js/blockly.common_namespace.md)                                 |      |
| [ComponentManager](https://developers.google.com/blockly/reference/js/blockly.componentmanager_namespace.md)                   |      |
| [constants](https://developers.google.com/blockly/reference/js/blockly.constants_namespace.md)                                |      |
| [ContextMenu](https://developers.google.com/blockly/reference/js/blockly.contextmenu_namespace.md)                        |      |
| [ContextMenuItems](https://developers.google.com/blockly/reference/js/blockly.contextmenuitems_namespace.md)             |      |
| [ContextMenuRegistry](https://developers.google.com/blockly/reference/js/blockly.contextmenuregistry_namespace.md)            |      |
| [Css](https://developers.google.com/blockly/reference/js/blockly.css_namespace.md)                                       |      |
| [dialog](https://developers.google.com/blockly/reference/js/blockly.dialog_namespace.md)                                 |      |
| [Events](/reference/js/blockly.events_namespace.html)                                   |      |
| [Extensions](https://developers.google.com/blockly/reference/js/blockly.extensions_namespace.md)                           |      |
| [fieldRegistry](https://developers.google.com/blockly/reference/js/blockly.fieldregistry_namespace.md)                   |      |
| [geras](https://developers.google.com/blockly/reference/js/blockly.geras_namespace.md)                                   |      |
| [ICopyable](https://developers.google.com/blockly/reference/js/blockly.icopyable_namespace.md)                           |      |
| [Input](https://developers.google.com/blockly/reference/js/blockly.input_namespace.md)                                    |      |
| [InsertionMarkerManager](https://developers.google.com/blockly/reference/js/blockly.insertionmarkermanager_namespace.md) |      |
| [libraryBlocks](https://developers.google.com/blockly/reference/js/blockly.libraryblocks_namespace.md)                   |      |
| [MetricsManager](https://developers.google.com/blockly/reference/js/blockly.metricsmanager_namespace.md)                 |      |
| [minimalist](https://developers.google.com/blockly/reference/js/blockly.minimalist_namespace.md)                           |      |
| [Names](https://developers.google.com/blockly/reference/js/blockly.names_namespace.md)                                    |      |
| [Options](https://developers.google.com/blockly/reference/js/blockly.options_namespace.md)                                  |      |
| [Procedures](https://developers.google.com/blockly/reference/js/blockly.procedures_namespace.md)                               |      |
| [registry](https://developers.google.com/blockly/reference/js/blockly.registry_namespace.md)                     |      |
| [RenderedConnection](https://developers.google.com/blockly/reference/js/blockly.renderedconnection_namespace.md)         |      |
| [serialization](https://developers.google.com/blockly/reference/js/blockly.serialization_namespace.md)                          |      |
| [ShortcutItems](https://developers.google.com/blockly/reference/js/blockly.shortcutitems_namespace.md)                   |      |
| [ShortcutRegistry](https://developers.google.com/blockly/reference/js/blockly.shortcutregistry_namespace.md)             |      |
| [Theme](https://developers.google.com/blockly/reference/js/blockly.theme_namespace.md)                                    |      |
| [ThemeManager](https://developers.google.com/blockly/reference/js/blockly.thememanager_namespace.md)                     |      |
| [Themes](https://developers.google.com/blockly/reference/js/blockly.themes_namespace.md)                                   |      |
| [thrasos](https://developers.google.com/blockly/reference/js/blockly.thrasos_namespace.md)                               |      |
| [ToolboxCategory](https://developers.google.com/blockly/reference/js/blockly.toolboxcategory_namespace.md)                    |      |
| [ToolboxSeparator](https://developers.google.com/blockly/reference/js/blockly.toolboxseparator_namespace.md)             |      |
| [Tooltip](https://developers.google.com/blockly/reference/js/blockly.tooltip_namespace.md)                                  |      |
| [Touch](https://developers.google.com/blockly/reference/js/blockly.touch_namespace.md)                                    |      |
| [uiPosition](https://developers.google.com/blockly/reference/js/blockly.uiposition_namespace.md)                         |      |
| [utils](https://developers.google.com/blockly/reference/js/blockly.utils_namespace.md)                                |      |
| [Variables](https://developers.google.com/blockly/reference/js/blockly.variables_namespace.md)                                |      |
| [VariablesDynamic](https://developers.google.com/blockly/reference/js/blockly.variablesdynamic_namespace.md)                     |      |
| [WidgetDiv](https://developers.google.com/blockly/reference/js/blockly.widgetdiv_namespace.md)                           |      |
| [XML](https://developers.google.com/blockly/reference/js/blockly.xml_namespace.md)                                       |      |
| [zelos](https://developers.google.com/blockly/reference/js/blockly.zelos_namespace.md)                                   |      |

## 变量

| 变量 | 说明 |
| --- | --- |
| [ALIGN_CENTRE](https://developers.google.com/blockly/reference/js/blockly.align_centre_variable.md) |  |
| [ALIGN_LEFT](https://developers.google.com/blockly/reference/js/blockly.align_left_variable.md) |  |
| [ALIGN_RIGHT](https://developers.google.com/blockly/reference/js/blockly.align_right_variable.md) |  |
| [Blocks](https://developers.google.com/blockly/reference/js/blockly.blocks_variable.md) | 块类型名称与块原型对象的映射。 |
| [COCHAPSE_CHARS](https://developers.google.com/blockly/reference/js/blockly.collapse_chars_variable.md) |  |
| [COLLAPSED_FIELD_NAME](https://developers.google.com/blockly/reference/js/blockly.collapsed_field_name_variable.md) |  |
| [COLLAPSED_INPUT_NAME](https://developers.google.com/blockly/reference/js/blockly.collapsed_input_name_variable.md) |  |
| [config](https://developers.google.com/blockly/reference/js/blockly.config_variable.md)                                         | 此对象用于保存开发者希望能够更改 Blockly 上的所有值。                                                     |
| [connectionType](https://developers.google.com/blockly/reference/js/blockly.connectiontypes_variable.md)                      |                                                                                                           |
| [defineBlocksWithJsonArray](https://developers.google.com/blockly/reference/js/blockly.defineblockswithjsonarray_variable.md) | 定义一组 JSON 块定义的块，可能由 Blockly 开发者工具生成。                                                 |
| [DELETE_VARIABLE_ID](https://developers.google.com/blockly/reference/js/blockly.delete_variable_id_variable.md)               |                                                                                                           |
| [DRAG_STACK](https://developers.google.com/blockly/reference/js/blockly.drag_stack_variable.md)                               |                                                                                                           |
| [DropDownDiv](https://developers.google.com/blockly/reference/js/blockly.dropdowndiv_variable.md)                             |                                                                                                           |
| [DUMMY_INPUT](https://developers.google.com/blockly/reference/js/blockly.dummy_input_variable.md)                             |                                                                                                           |
| [getMainWorkspace](https://developers.google.com/blockly/reference/js/blockly.getmainworkspace_variable.md)                   | 返回主工作区。返回上次使用的主工作区（基于焦点）。尽量不要使用此功能，尤其是网页上有多个 Blockly 实例时。 |
| [getSelected](https://developers.google.com/blockly/reference/js/blockly.getselected_variable.md)                                  | 返回当前选定的可复制对象。                                                                                |
| [INPUT_VALUE](https://developers.google.com/blockly/reference/js/blockly.input_value_variable.md)                                  |                                                                                                           |
| [JavaScript](https://developers.google.com/blockly/reference/js/blockly.javascript_variable.md)                               |                                                                                                           |
| [消息](https://developers.google.com/blockly/reference/js/blockly.msg_variable.md)                                            | 本地化消息的字典。                                                                                        |
| [NEXT_STATEMENT](https://developers.google.com/blockly/reference/js/blockly.next_statement_variable.md)                       |                                                                                                           |
| [OPPOSITE_TYPE](https://developers.google.com/blockly/reference/js/blockly.opposite_type_variable.md)                         | |
| [OUTPUT_VALUE](https://developers.google.com/blockly/reference/js/blockly.output_value_variable.md)                           | |
| [PREVIOUS_STATEMENT](https://developers.google.com/blockly/reference/js/blockly.previous_statement_variable.md)                       | |
| [PROCEDURE_CATEGORY_NAME](https://developers.google.com/blockly/reference/js/blockly.procedure_category_name_variable.md)     | 用于工具箱 XML 中某个类别的“自定义”属性的字符串。该字符串表示应使用过程块动态填充类别。                   |
| [RENAME_VARIABLE_ID](https://developers.google.com/blockly/reference/js/blockly.rename_variable_id_variable.md)               | |
| [resizeSvgContents](https://developers.google.com/blockly/reference/js/blockly.resizesvgcontents_variable.md) | |
| [setLocale](https://developers.google.com/blockly/reference/js/blockly.setlocale_variable.md) | <p>将语言区域（即本地化的消息/block-text/其他）设置为给定的语言区域。</p><p>这在从脚本标记加载时没有用处/没有必要，因为消息会自动插入到 Blockly.Msg 对象中。不过，我们在脚本标记和非脚本标记上下文中提供此类参数，以便 tscompiler 可以正确创建我们的类型定义文件。</p> |
| [setParentContainer](https://developers.google.com/blockly/reference/js/blockly.setparentcontainer_variable.md) | 设置父级容器。这是 WidgetDiv、dropDownDiv 和提示在首次调用 `Blockly.inject` 时呈现的容器元素。如果在第一个 `Blockly.inject` 之后调用此方法，则为 NOP。 |
| [svgResize](https://developers.google.com/blockly/reference/js/blockly.svgresize_variable.md) | 调整 SVG 图片的尺寸，使其完全填满容器。当视图实际大小发生变化时（例如，在窗口调整大小/设备屏幕方向发生变化时）调用此方法。请参阅 workspace.resizeContents，以便在内容发生更改时（例如，添加或移除块时）调整工作区的大小。记录 SVG 图片的高度/宽度。 |
| [TOOLBOX_AT_BOTTOM](https://developers.google.com/blockly/reference/js/blockly.toolbox_at_bottom_variable.md) | |
| [TOOLBOX_AT_LEFT](https://developers.google.com/blockly/reference/js/blockly.toolbox_at_left_variable.md) | |
| [TOOLBOX_AT_RIGHT](https://developers.google.com/blockly/reference/js/blockly.toolbox_at_right_variable.md) | |
| [TOOLBOX_AT_TOP](https://developers.google.com/blockly/reference/js/blockly.toolbox_at_top_variable.md) | |
| [VARIABLE_CATEGORY_NAME](https://developers.google.com/blockly/reference/js/blockly.variable_category_name_variable.md) | 用于工具箱 XML 中某个类别的“自定义”属性的字符串。此字符串表示应使用变量块动态填充类别。 |
| [VARIABLE_DYNAMIC_CATEGORY_NAME](https://developers.google.com/blockly/reference/js/blockly.variable_dynamic_category_name_variable.md) | 用于工具箱 XML 中某个类别的“自定义”属性的字符串。此字符串表示应使用变量块动态填充类别。 |
| [VERSION](https://developers.google.com/blockly/reference/js/blockly.version_variable.md) | Blockly 核心版本。此常量会被 build 脚本（npm run build）替换到 package.json 中的版本值。此操作由 build 压缩的 gulp 任务中的 Closure Compiler 完成。对于本地构建，您可以将 --define='Blockly.VERSION=X.Y.Z' 传递给编译器以替换此常量。 |

## 类型别名

| 类型别名                                                                                                                             | 说明                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| [FieldAngleValidator](https://developers.google.com/blockly/reference/js/blockly.fieldanglevalidator_typealias.md)                   |                                                                                        |
| [FieldCheckboxValidator](https://developers.google.com/blockly/reference/js/blockly.fieldcheckboxvalidator_typealias.md)             |                                                                                        |
| [FieldColourValidator](https://developers.google.com/blockly/reference/js/blockly.fieldcolourvalidator_typealias.md)                 |                                                                                        |
| [FieldDropdownValidator](https://developers.google.com/blockly/reference/js/blockly.fielddropdownvalidator_typealias.md)             |                                                                                        |
| [FieldMultilineInputValidator](https://developers.google.com/blockly/reference/js/blockly.fieldmultilineinputvalidator_typealias.md) |                                                                                        |
| [FieldNumberValidator](https://developers.google.com/blockly/reference/js/blockly.fieldnumbervalidator_typealias.md)                 |                                                                                        |
| [FieldTextInputValidator](https://developers.google.com/blockly/reference/js/blockly.fieldtextinputvalidator_typealias.md)           |                                                                                        |
| [FieldValidator](https://developers.google.com/blockly/reference/js/blockly.fieldvalidator_typealias.md)                             |                                                                                        |
| [FieldVariableValidator](https://developers.google.com/blockly/reference/js/blockly.fieldvariablevalidator_typealias.md)             |                                                                                        |
| [MenuGenerator](https://developers.google.com/blockly/reference/js/blockly.menugenerator_typealias.md)                                  | 可以是菜单选项数组，也可以是用于为 FieldDropdown 或其后代生成菜单选项数组的函数。      |
| [MenuGeneratorFunction](https://developers.google.com/blockly/reference/js/blockly.menugeneratorfunction_typealias.md)               | 用于为 FieldDropdown 或其后代生成菜单选项数组的函数。                                  |
| [MenuOption](https://developers.google.com/blockly/reference/js/blockly.menuoption_typealias.md)                                       | 下拉菜单中的单个选项。第一个元素是人类可读的值（文本或图片），第二个元素是语言中性值。 |
