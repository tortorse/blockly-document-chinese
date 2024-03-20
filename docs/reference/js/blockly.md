# 参考

## blockly 软件包

## 类

| 类                                                                                                                     | 说明                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ASTNode](/reference/js/blockly.astnode_class.md)                                | AST 节点的类。建议您使用其中一个 createNode 方法，而不是直接创建节点。                                                                                                             |
| [BasicCursor](/reference/js/blockly.basiccursor_class.md)                            | 用于基本光标的类。这将使用户能够通过点击“下一页”或“上一页”转到 AST 中的所有节点。                                                                                                  |
| [Block](/reference/js/blockly.block_class.md)                                        | 一个块的类。通常不直接调用，建议使用 workspace.newBlock()。                                                                                                                        |
| [BlockDragger](/reference/js/blockly.blockdragger_class.md)                       | 块拖动器的类。当用户通过鼠标或触摸操作来拖动工作区时，这些块会移到工作区中。                                                                                                       |
| [BlockDragSurfaceSvg](/reference/js/blockly.blockdragsurfacesvg_class.md)         | 此类用于当前拖动的块的拖动表面。这是一个单独的 SVG，仅包含当前移动的块，或不包含任何内容。                                                                                         |
| [BlockSvg](/reference/js/blockly.blocksvg_class.md)                               | 用于块的 SVG 表示法的类。通常不直接调用，建议使用 workspace.newBlock()。                                                                                                           |
| [Bubble](/reference/js/blockly.bubble_class.md)                                     | 用于界面气泡的类。                                                                                                                                                                 |
| [BubbleDragger](/reference/js/blockly.bubbledragger_class.md)                      | 气泡拖动器的类。当用户通过鼠标或触摸操作拖动气泡时，系统会在画布上移动这些内容。包括块评论、更改器、警告或工作区评论。                                                             |
| [CodeGenerator](/reference/js/blockly.codegenerator_class.md)                        | 用于将代码块转换为语言的代码生成器类。                                                                                                                                             |
| [CollapsibleToolboxCategory](/reference/js/blockly.collapsibletoolboxcategory_class.md)     | 工具箱中某个类别的类，可收起。                                                                                                                                                     |
| [Comment](/reference/js/blockly.comment_class.md)                                    | 注释的类。                                                                                                                                                                         |
| [ComponentManager](/reference/js/blockly.componentmanager_class.md)                     | 已向工作区注册的所有项的管理器。                                                                                                                                                   |
| [Connection](/reference/js/blockly.connection_class.md)                                 | 用于块之间的连接的类。                                                                                                                                                             |
| [ConnectionChecker](/reference/js/blockly.connectionchecker_class.md)             | 用于连接类型检查逻辑的类。                                                                                                                                                         |
| [ConnectionDB](/reference/js/blockly.connectiondb_class.md)                       | 连接数据库。连接按其垂直组件的顺序存储。这样，使用二进制搜索可以快速查找某个区域内的连接。                                                                                         |
| [ContextMenuRegistry](/reference/js/blockly.contextmenuregistry_class.md)              | 用于注册菜单项的类。此属性应是单例。您不应创建新实例，而应仅从 ContextMenuRegistry.registry 访问此类。                                                                             |
| [Cursor](/reference/js/blockly.cursor_class.md)                                   | 光标的类。光标用于控制用户如何进行 Blockly AST 导航。                                                                                                                              |
| [DeleteArea](/reference/js/blockly.deletearea_class.md)                             | 组件的抽象类，该类可以删除放置在上面的块或气泡。                                                                                                                                   |
| [DragTarget](/reference/js/blockly.dragtarget_class.md)                             | 一个组件的抽象类，当某个组件或气泡在组件上方或下方拖动时，具有自定义行为的组件。                                                                                                   |
| [Field](/reference/js/blockly.field_class.md)                                      | 可编辑字段的抽象类。                                                                                                                                                               |
| [FieldAngle](/reference/js/blockly.fieldangle_class.md)                           | 用于可编辑角度字段的类。                                                                                                                                                           |
| [FieldCheckbox](/reference/js/blockly.fieldcheckbox_class.md)                     | 复选框字段的类。                                                                                                                                                                   |
| [FieldColour](/reference/js/blockly.fieldcolour_class.md)                         | 颜色输入字段的类。                                                                                                                                                                 |
| [FieldDropdown](/reference/js/blockly.fielddropdown_class.md)                      | 用于可修改下拉菜单字段的类。                                                                                                                                                       |
| [FieldImage](/reference/js/blockly.fieldimage_class.md)                           | 用于块上的图像的类。                                                                                                                                                               |
| [FieldLabel](/reference/js/blockly.fieldlabel_class.md)                           | 用于不可修改、不可序列化的文本字段的类。                                                                                                                                           |
| [FieldLabelSerializable](/reference/js/blockly.fieldlabelserializable_class.md)   | 用于不可修改且可序列化的文本字段的类。                                                                                                                                             |
| [FieldMultilineInput](/reference/js/blockly.fieldmultilineinput_class.md)         | 用于可编辑文本字段的类。                                                                                                                                                           |
| [FieldNumber](/reference/js/blockly.fieldnumber_class.md)                         | 用于可修改的数字字段的类。                                                                                                                                                         |
| [FieldTextInput](/reference/js/blockly.fieldtextinput_class.md)                   |                                                                                                                                                                                    |
| [FieldVariable](/reference/js/blockly.fieldvariable_class.md)                     | 变量的下拉字段的类。                                                                                                                                                               |
| [Flyout](/reference/js/blockly.flyout_class.md)                                   | 一个飞出课程。                                                                                                                                                                     |
| [FlyoutButton](/reference/js/blockly.flyoutbutton_class.md)                       | 用于飞出按钮或标签的类。                                                                                                                                                           |
| [FlyoutMetricsManager](/reference/js/blockly.flyoutmetricsmanager_class.md)       | 计算飞出工作区的指标。这些指标主要用于调整飞出滚动条的大小。                                                                                                                       |
| [Gesture](/reference/js/blockly.gesture_class.md)                                    | 用于一个手势的类。                                                                                                                                                                 |
| [Grid](/reference/js/blockly.grid_class.md)                                       | 工作区网格的类。                                                                                                                                                                   |
| [HorizontalFlyout](/reference/js/blockly.horizontalflyout_class.md)                       | 一个飞出课程。                                                                                                                                                                     |
| [Icon](/reference/js/blockly.icon_class.md)                                       | 图标的类。                                                                                                                                                                         |
| [Input](/reference/js/blockly.input_class.md)                                      | 包含可选字段的输入的类。                                                                                                                                                           |
| [InsertionMarkerManager](/reference/js/blockly.insertionmarkermanager_class.md)   | 用于控制拖动期间连接更新的类。它主要负责查找最符合条件的连接，并在拖动期间根据需要突出显示或取消突出显示。                                                                         |
| [Marker](/reference/js/blockly.marker_class.md)                                   | 用于标记的类。该键用于在键盘导航中将位置保存在 Blockly AST 中。                                                                                                                    |
| [MarkerManager](/reference/js/blockly.markermanager_class.md)                     | 用于管理工作区上的多个标记和光标的类。                                                                                                                                             |
| [Menu](/reference/js/blockly.menu_class.md)                                       | 基本菜单类。                                                                                                                                                                       |
| [MenuItem](/reference/js/blockly.menuitem_class.md)                               | 代表菜单项的类。                                                                                                                                                                   |
| [MetricsManager](/reference/js/blockly.metricsmanager_class.md)                   | 所有工作区指标计算的管理器。                                                                                                                                                       |
| [Mutator](/reference/js/blockly.mutator_class.md)                                  | 转变器对话框的类。                                                                                                                                                                 |
| [Names](/reference/js/blockly.names_class.md)                                      | 实体名称数据库（变量、过程等）的类。                                                                                                                                               |
| [Options](/reference/js/blockly.options_class.md)                                    | 使用合理的默认设置解析用户指定的选项（行为未指定）。                                                                                                                               |
| [RenderedConnection](/reference/js/blockly.renderedconnection_class.md)           | 此类用于连接可能在屏幕中呈现的块之间的连接。                                                                                                                                       |
| [Scrollbar](/reference/js/blockly.scrollbar_class.md)                                | 用于纯 SVG 滚动条的类。此技术提供的滚动条保证能够正常运行，但其外观或行为可能不如系统的滚动条。                                                                                    |
| [ScrollbarPair](/reference/js/blockly.scrollbarpair_class.md)                     | 用于一对滚动条的类。水平和垂直。                                                                                                                                                   |
| [ShortcutRegistry](/reference/js/blockly.shortcutregistry_class.md)               | 用于注册键盘快捷键的类。此属性应是单例。您不应创建新实例，而只能从 ShortcutRegistry.registry 访问此类。                                                                            |
| [TabNavigateCursor](/reference/js/blockly.tabnavigatecursor_class.md)             | 用于在标签页可导航字段之间导航的光标。                                                                                                                                             |
| [Theme](/reference/js/blockly.theme_class.md)                                      | 主题的类。                                                                                                                                                                         |
| [ThemeManager](/reference/js/blockly.thememanager_class.md)                       | 用于存储和更新工作区主题和界面组件的类。                                                                                                                                           |
| [Toolbox](/reference/js/blockly.toolbox_class.md)                                  | 工具箱的类。创建工具箱的 DOM。                                                                                                                                                     |
| [ToolboxCategory](/reference/js/blockly.toolboxcategory_class.md)                      | 工具箱中的类别类。                                                                                                                                                                 |
| [ToolboxItem](/reference/js/blockly.toolboxitem_class.md)                         | 工具箱中项目的类。                                                                                                                                                                 |
| [ToolboxSeparator](/reference/js/blockly.toolboxseparator_class.md)               | 工具箱分隔符的类。这是工具箱上显示的细线。此项目无法交互。                                                                                                                         |
| [Trashcan](/reference/js/blockly.trashcan_class.md)                                 | 垃圾桶类。                                                                                                                                                                         |
| [VariableMap](/reference/js/blockly.variablemap_class.md)                            | 用于变量映射的类。其中包含一个字典数据结构，其中变量类型为键，变量列表为值。变量列表是由键指定的类型。                                                                             |
| [VariableModel](/reference/js/blockly.variablemodel_class.md)                          | 变量模型的类。保存变量的信息，包括名称、ID 和类型。                                                                                                                                |
| [VerticalFlyout](/reference/js/blockly.verticalflyout_class.md)                   | 一个飞出课程。                                                                                                                                                                     |
| [Warning](/reference/js/blockly.warning_class.md)                                    | 警告对应的类。                                                                                                                                                                     |
| [Workspace](/reference/js/blockly.workspace_class.md)                                | 工作区类。这是一种包含数据块的数据结构。没有界面，可以无头创建。                                                                                                                   |
| [WorkspaceAudio](/reference/js/blockly.workspaceaudio_class.md)                   | 用于加载、存储和播放工作区音频的类。                                                                                                                                               |
| [WorkspaceComment](/reference/js/blockly.workspacecomment_class.md)                 | 工作区注释的类。                                                                                                                                                                   |
| [WorkspaceCommentsSvg](/reference/js/blockly.workspacecommentsvg_class.md)        | 工作区注释的 SVG 表示法的类。                                                                                                                                                      |
| [WorkspaceDragger](/reference/js/blockly.workspacedragger_class.md)               | 工作区拖动器的类。当用户通过鼠标或触摸操作来拖动工作区时，工作区会四处移动。请注意，工作区本身管理它是否具有拖动表面，以及如何根据拖动表面进行转换。这只会根据事件传递正确的命令。 |
| [WorkspaceDragSurfaceSvg](/reference/js/blockly.workspacedragsurfacesvg_class.md) | 拖动期间，相关块会被移到此 SVG 中，从而提升了性能。整个 SVG 都使用 CSS 转换（而不是 SVG）进行转换，因此，在拖动提升期间，块绝不会被重新绘制。                                      |
| [WorkspaceSvg](/reference/js/blockly.workspacesvg_class.md)                       | 工作区类。屏幕上的这一区域包含可选的垃圾桶、滚动条、气泡和拖动。                                                                                                                   |
| [ZoomControls](/reference/js/blockly.zoomcontrols_class.md)                       | 缩放控件的类。                                                                                                                                                                     |

## 枚举

| 枚举项                                                                                   | 说明                   |
| --------------------------------------------------------------------------------------------- | ---------------------- |
| [ConnectionType](/reference/js/blockly.connectiontype_enum.md) | 连接或输入类型的枚举。 |
| [inputTypes](/reference/js/blockly.inputtypes_enum.md)     | 连接或输入类型的枚举。 |

## 函数

| 函数                                                                                                                                                                                                 | 说明                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [bindEvent\_(node, name, thisObject, Func)](/reference/js/blockly.bindevent__1_function.md)                                                                      | 绑定应调用的事件处理脚本（无论其是否属于有效触摸流）。它可用于不属于多部分手势的事件（例如，用于鼠标悬停的提示）。                                                 |
| [bindEventWithChecks\_(node, name, thisObject, Func, opt_noCaptureIdentifier, \_opt_nopreventDefault)](/reference/js/blockly.bindeventwithchecks__1_function.md) | 绑定一个事件处理脚本，如果事件不是活动触摸流的一部分，则可将其忽略。此方法适用于启动或继续多部分手势（例如，鼠标点击或鼠标移动，可能是拖动或点击的一部分）的事件。 |
| [copy(toCopy)](/reference/js/blockly.copy_1_function.md)                                                                                                         | 将文本块或工作区注释复制到本地剪贴板。                                                                                                                             |
| [duplicate(toDuplicate)](/reference/js/blockly.duplicate_1_function.md)                                                                                          | 复制此块及其子项，或工作区注释。                                                                                                                                   |
| [hideChaff(opt_onlyClosePopup)](/reference/js/blockly.hidechaff_1_function.md)                                                                                   | 关闭提示、上下文菜单、下拉菜单选项等                                                                                                                               |
| [hueToHex(hue)](/reference/js/blockly.huetohex_1_function.md)                                                                                                    | 将色调（HSV 模型）转换为 RGB 十六进制三元组。                                                                                                                      |
| [ject(container, opt_options)](/reference/js/blockly.inject_1_function.md)                                                                                       | 将 Blockly 编辑器注入指定的容器元素（通常是 div）。                                                                                                                |
| [isNumber(str)](/reference/js/blockly.isnumber_1_function.md)                                                                                                    | 给定字符串是否为数字（包括负和小数）。                                                                                                                             |
| [paste()](/reference/js/blockly.paste_1_function.md)                                                                                                                | 将代码块或工作区注释粘贴到主工作区。                                                                                                                               |
| [unbindEvent\_(bindData)](/reference/js/blockly.unbindevent__1_function.md)                                                                                      | 一个或多个事件事件与函数调用解除绑定。                                                                                                                             |

## 接口

| 接口                                                                                                                           | 说明                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [BlocklyOptions](/reference/js/blockly.blocklyoptions_interface.md)                         | 块选项。                                                                     |
| [IASTNodeLocation](/reference/js/blockly.iastnodelocation_interface.md)                      | AST 节点位置接口。                                                           |
| [IASTNodeLocationSvg](/reference/js/blockly.iastnodelocationsvg_interface.md)             | AST 节点位置 SVG 接口。                                                      |
| [IASTNodeLocationWithBlock](/reference/js/blockly.iastnodelocationwithblock_interface.md) | 具有关联块的 AST 节点位置。                                                  |
| [IAutoHideable](/reference/js/blockly.iautohideable_interface.md)                         | 可自动隐藏的组件的接口。                                                     |
| [IBlockDragger](/reference/js/blockly.iblockdragger_interface.md)                         | 块拖动界面。                                                                 |
| [IBoundedElement](/reference/js/blockly.iboundedelement_interface.md)                     | 有界限元素接口。                                                             |
| [IBubble](/reference/js/blockly.ibubble_interface.md)                                     | 气泡界面。                                                                   |
| [ICollapsibleToolboxItem](/reference/js/blockly.icollapsibletoolboxitem_interface.md)     | 工具箱中可收起项的界面。                                                     |
| [IComponent](/reference/js/blockly.icomponent_interface.md)                               | 工作区组件的接口，该组件可通过 ComponentManager 注册。                       |
| [IConnectionChecker](/reference/js/blockly.iconnectionchecker_interface.md)               | 用于连接类型检查逻辑的类。                                                   |
| [IContextMenu](/reference/js/blockly.icontextmenu_interface.md)                           |                                                                              |
| [ICopyable](/reference/js/blockly.icopyable_interface.md)                                 |                                                                              |
| [IDeletable](/reference/js/blockly.ideletable_interface.md)                                   | 可以删除的对象接口。                                                         |
| [IDeleteArea](/reference/js/blockly.ideletearea_interface.md)                             | 组件的接口，可删除置于其上的块或气泡。                                       |
| [IDraggable](/reference/js/blockly.idraggable_interface.md)                                   | 可拖动对象的接口。                                                           |
| [IDragTarget](/reference/js/blockly.idragtarget_interface.md)                             | 一个组件的行为组件，当某个组件或气泡拖到该组件或气泡之上时，具有自定义行为。 |
| [IFlyout](/reference/js/blockly.iflyout_interface.md)                                     | 一个飞出界面。                                                               |
| [IKeyboardAccessible](/reference/js/blockly.ikeyboardaccessible_interface.md)             | 处理键盘快捷键的对象的接口。                                                 |
| [IMetricsManager](/reference/js/blockly.imetricsmanager_interface.md)                     | 指标管理器的界面。                                                           |
| [IMovable](/reference/js/blockly.imovable_interface.md)                                       | 可移动对象的接口。                                                           |
| [IPositionable](/reference/js/blockly.ipositionable_interface.md)                                | 位于工作区上方的组件的接口。                                                 |
| [可注册](/reference/js/blockly.iregistrable_interface.md)                                 | 可注册的 Blockly 组件的接口。                                                |
| [IRegistrable](/reference/js/blockly.iselectable_interface.md)                             | 可选对象的接口。                                                             |
| [ISelectableToolboxItem](/reference/js/blockly.iselectabletoolboxitem_interface.md)       | 工具箱中选定项的界面。                                                       |
| [IStyleable](/reference/js/blockly.istyleable_interface.md)                               | 可添加样式的对象的界面。                                                     |
| [Iboxbox](/reference/js/blockly.itoolbox_interface.md)                                    | 工具箱的界面。                                                               |
| [IToolboxItem](/reference/js/blockly.itoolboxitem_interface.md)                           | 工具箱中某一项的界面。                                                       |

## 命名空间

| 命名空间                                                                                                                 | 说明 |
| ------------------------------------------------------------------------------------------------------------------------ | ---- |
| [ASTNode](/reference/js/blockly.astnode_namespace.md)                              |      |
| [Block](/reference/js/blockly.block_namespace.md)                                      |      |
| [blockAnimations](/reference/js/blockly.blockanimations_namespace.md)               |      |
| [blockRendering](/reference/js/blockly.blockrendering_namespace.md)                 |      |
| [browserEvents](/reference/js/blockly.browserevents_namespace.md)                   |      |
| [bumpObjects](/reference/js/blockly.bumpobjects_namespace.md)                       |      |
| [clipboard](/reference/js/blockly.clipboard_namespace.md)                              |      |
| [CollapsibleToolboxCategory](/reference/js/blockly.collapsibletoolboxcategory_namespace.md)   |      |
| [common](/reference/js/blockly.common_namespace.md)                                 |      |
| [ComponentManager](/reference/js/blockly.componentmanager_namespace.md)                   |      |
| [constants](/reference/js/blockly.constants_namespace.md)                                |      |
| [ContextMenu](/reference/js/blockly.contextmenu_namespace.md)                        |      |
| [ContextMenuItems](/reference/js/blockly.contextmenuitems_namespace.md)             |      |
| [ContextMenuRegistry](/reference/js/blockly.contextmenuregistry_namespace.md)            |      |
| [Css](/reference/js/blockly.css_namespace.md)                                       |      |
| [dialog](/reference/js/blockly.dialog_namespace.md)                                 |      |
| [Events](/reference/js/blockly.events_namespace.html)                                   |      |
| [Extensions](/reference/js/blockly.extensions_namespace.md)                           |      |
| [fieldRegistry](/reference/js/blockly.fieldregistry_namespace.md)                   |      |
| [geras](/reference/js/blockly.geras_namespace.md)                                   |      |
| [ICopyable](/reference/js/blockly.icopyable_namespace.md)                           |      |
| [Input](/reference/js/blockly.input_namespace.md)                                    |      |
| [InsertionMarkerManager](/reference/js/blockly.insertionmarkermanager_namespace.md) |      |
| [libraryBlocks](/reference/js/blockly.libraryblocks_namespace.md)                   |      |
| [MetricsManager](/reference/js/blockly.metricsmanager_namespace.md)                 |      |
| [minimalist](/reference/js/blockly.minimalist_namespace.md)                           |      |
| [Names](/reference/js/blockly.names_namespace.md)                                    |      |
| [Options](/reference/js/blockly.options_namespace.md)                                  |      |
| [Procedures](/reference/js/blockly.procedures_namespace.md)                               |      |
| [registry](/reference/js/blockly.registry_namespace.md)                     |      |
| [RenderedConnection](/reference/js/blockly.renderedconnection_namespace.md)         |      |
| [serialization](/reference/js/blockly.serialization_namespace.md)                          |      |
| [ShortcutItems](/reference/js/blockly.shortcutitems_namespace.md)                   |      |
| [ShortcutRegistry](/reference/js/blockly.shortcutregistry_namespace.md)             |      |
| [Theme](/reference/js/blockly.theme_namespace.md)                                    |      |
| [ThemeManager](/reference/js/blockly.thememanager_namespace.md)                     |      |
| [Themes](/reference/js/blockly.themes_namespace.md)                                   |      |
| [thrasos](/reference/js/blockly.thrasos_namespace.md)                               |      |
| [ToolboxCategory](/reference/js/blockly.toolboxcategory_namespace.md)                    |      |
| [ToolboxSeparator](/reference/js/blockly.toolboxseparator_namespace.md)             |      |
| [Tooltip](/reference/js/blockly.tooltip_namespace.md)                                  |      |
| [Touch](/reference/js/blockly.touch_namespace.md)                                    |      |
| [uiPosition](/reference/js/blockly.uiposition_namespace.md)                         |      |
| [utils](/reference/js/blockly.utils_namespace.md)                                |      |
| [Variables](/reference/js/blockly.variables_namespace.md)                                |      |
| [VariablesDynamic](/reference/js/blockly.variablesdynamic_namespace.md)                     |      |
| [WidgetDiv](/reference/js/blockly.widgetdiv_namespace.md)                           |      |
| [XML](/reference/js/blockly.xml_namespace.md)                                       |      |
| [zelos](/reference/js/blockly.zelos_namespace.md)                                   |      |

## 变量

| 变量 | 说明 |
| --- | --- |
| [ALIGN_CENTRE](/reference/js/blockly.align_centre_variable.md) |  |
| [ALIGN_LEFT](/reference/js/blockly.align_left_variable.md) |  |
| [ALIGN_RIGHT](/reference/js/blockly.align_right_variable.md) |  |
| [Blocks](/reference/js/blockly.blocks_variable.md) | 块类型名称与块原型对象的映射。 |
| [COCHAPSE_CHARS](/reference/js/blockly.collapse_chars_variable.md) |  |
| [COLLAPSED_FIELD_NAME](/reference/js/blockly.collapsed_field_name_variable.md) |  |
| [COLLAPSED_INPUT_NAME](/reference/js/blockly.collapsed_input_name_variable.md) |  |
| [config](/reference/js/blockly.config_variable.md)                                         | 此对象用于保存开发者希望能够更改 Blockly 上的所有值。                                                     |
| [connectionType](/reference/js/blockly.connectiontypes_variable.md)                      |                                                                                                           |
| [defineBlocksWithJsonArray](/reference/js/blockly.defineblockswithjsonarray_variable.md) | 定义一组 JSON 块定义的块，可能由 Blockly 开发者工具生成。                                                 |
| [DELETE_VARIABLE_ID](/reference/js/blockly.delete_variable_id_variable.md)               |                                                                                                           |
| [DRAG_STACK](/reference/js/blockly.drag_stack_variable.md)                               |                                                                                                           |
| [DropDownDiv](/reference/js/blockly.dropdowndiv_variable.md)                             |                                                                                                           |
| [DUMMY_INPUT](/reference/js/blockly.dummy_input_variable.md)                             |                                                                                                           |
| [getMainWorkspace](/reference/js/blockly.getmainworkspace_variable.md)                   | 返回主工作区。返回上次使用的主工作区（基于焦点）。尽量不要使用此功能，尤其是网页上有多个 Blockly 实例时。 |
| [getSelected](/reference/js/blockly.getselected_variable.md)                                  | 返回当前选定的可复制对象。                                                                                |
| [INPUT_VALUE](/reference/js/blockly.input_value_variable.md)                                  |                                                                                                           |
| [JavaScript](/reference/js/blockly.javascript_variable.md)                               |                                                                                                           |
| [消息](/reference/js/blockly.msg_variable.md)                                            | 本地化消息的字典。                                                                                        |
| [NEXT_STATEMENT](/reference/js/blockly.next_statement_variable.md)                       |                                                                                                           |
| [OPPOSITE_TYPE](/reference/js/blockly.opposite_type_variable.md)                         | |
| [OUTPUT_VALUE](/reference/js/blockly.output_value_variable.md)                           | |
| [PREVIOUS_STATEMENT](/reference/js/blockly.previous_statement_variable.md)                       | |
| [PROCEDURE_CATEGORY_NAME](/reference/js/blockly.procedure_category_name_variable.md)     | 用于工具箱 XML 中某个类别的“自定义”属性的字符串。该字符串表示应使用过程块动态填充类别。                   |
| [RENAME_VARIABLE_ID](/reference/js/blockly.rename_variable_id_variable.md)               | |
| [resizeSvgContents](/reference/js/blockly.resizesvgcontents_variable.md) | |
| [setLocale](/reference/js/blockly.setlocale_variable.md) | <p>将语言区域（即本地化的消息/block-text/其他）设置为给定的语言区域。</p><p>这在从脚本标记加载时没有用处/没有必要，因为消息会自动插入到 Blockly.Msg 对象中。不过，我们在脚本标记和非脚本标记上下文中提供此类参数，以便 tscompiler 可以正确创建我们的类型定义文件。</p> |
| [setParentContainer](/reference/js/blockly.setparentcontainer_variable.md) | 设置父级容器。这是 WidgetDiv、dropDownDiv 和提示在首次调用 `Blockly.inject` 时呈现的容器元素。如果在第一个 `Blockly.inject` 之后调用此方法，则为 NOP。 |
| [svgResize](/reference/js/blockly.svgresize_variable.md) | 调整 SVG 图片的尺寸，使其完全填满容器。当视图实际大小发生变化时（例如，在窗口调整大小/设备屏幕方向发生变化时）调用此方法。请参阅 workspace.resizeContents，以便在内容发生更改时（例如，添加或移除块时）调整工作区的大小。记录 SVG 图片的高度/宽度。 |
| [TOOLBOX_AT_BOTTOM](/reference/js/blockly.toolbox_at_bottom_variable.md) | |
| [TOOLBOX_AT_LEFT](/reference/js/blockly.toolbox_at_left_variable.md) | |
| [TOOLBOX_AT_RIGHT](/reference/js/blockly.toolbox_at_right_variable.md) | |
| [TOOLBOX_AT_TOP](/reference/js/blockly.toolbox_at_top_variable.md) | |
| [VARIABLE_CATEGORY_NAME](/reference/js/blockly.variable_category_name_variable.md) | 用于工具箱 XML 中某个类别的“自定义”属性的字符串。此字符串表示应使用变量块动态填充类别。 |
| [VARIABLE_DYNAMIC_CATEGORY_NAME](/reference/js/blockly.variable_dynamic_category_name_variable.md) | 用于工具箱 XML 中某个类别的“自定义”属性的字符串。此字符串表示应使用变量块动态填充类别。 |
| [VERSION](/reference/js/blockly.version_variable.md) | Blockly 核心版本。此常量会被 build 脚本（npm run build）替换到 package.json 中的版本值。此操作由 build 压缩的 gulp 任务中的 Closure Compiler 完成。对于本地构建，您可以将 --define='Blockly.VERSION=X.Y.Z' 传递给编译器以替换此常量。 |

## 类型别名

| 类型别名                                                                                                                             | 说明                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| [FieldAngleValidator](/reference/js/blockly.fieldanglevalidator_typealias.md)                   |                                                                                        |
| [FieldCheckboxValidator](/reference/js/blockly.fieldcheckboxvalidator_typealias.md)             |                                                                                        |
| [FieldColourValidator](/reference/js/blockly.fieldcolourvalidator_typealias.md)                 |                                                                                        |
| [FieldDropdownValidator](/reference/js/blockly.fielddropdownvalidator_typealias.md)             |                                                                                        |
| [FieldMultilineInputValidator](/reference/js/blockly.fieldmultilineinputvalidator_typealias.md) |                                                                                        |
| [FieldNumberValidator](/reference/js/blockly.fieldnumbervalidator_typealias.md)                 |                                                                                        |
| [FieldTextInputValidator](/reference/js/blockly.fieldtextinputvalidator_typealias.md)           |                                                                                        |
| [FieldValidator](/reference/js/blockly.fieldvalidator_typealias.md)                             |                                                                                        |
| [FieldVariableValidator](/reference/js/blockly.fieldvariablevalidator_typealias.md)             |                                                                                        |
| [MenuGenerator](/reference/js/blockly.menugenerator_typealias.md)                                  | 可以是菜单选项数组，也可以是用于为 FieldDropdown 或其后代生成菜单选项数组的函数。      |
| [MenuGeneratorFunction](/reference/js/blockly.menugeneratorfunction_typealias.md)               | 用于为 FieldDropdown 或其后代生成菜单选项数组的函数。                                  |
| [MenuOption](/reference/js/blockly.menuoption_typealias.md)                                       | 下拉菜单中的单个选项。第一个元素是人类可读的值（文本或图片），第二个元素是语言中性值。 |
