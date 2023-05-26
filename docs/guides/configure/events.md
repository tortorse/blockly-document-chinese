# 事件

工作区上的每个更改都会触发一个事件。这些事件完整地描述了每个变化的前后状态。

## 监听事件

工作区具有可用于侦听事件流的 `addChangeListener` 方法和 `removeChangeListener` 方法。一个例子是 [实时生成代码](/guides/configure/code-generators.html#实时生成)。另一个例子是 [块最大数量限制演示](https://blockly-demo.appspot.com/static/demos/maxBlocks/index.html)。通常情况下，这两个例子都不关心触发事件是什么。他们只是查看工作区的当前状态。

更复杂的事件监听器将查看触发事件。以下示例检测用户何时创建其第一条注释，发出警报，然后停止监听，以便不再触发其他警报。

```javascript
function onFirstComment(event) {
  if (
    event.type == Blockly.Events.CHANGE &&
    event.element == 'comment' &&
    !event.oldValue &&
    event.newValue
  ) {
    alert('Congratulations on creating your first comment!');
    workspace.removeChangeListener(onFirstComment);
  }
}
workspace.addChangeListener(onFirstComment);
```

为了监听弹出事件中发生的任意事件，可以将一个侦听器添加到弹出的工作区中。

```javascript
var flyoutWorkspace = yourWorkspace.getFlyout().getWorkspace();
flyoutWorkspace.addChangeListener(onFirstComment);
```

块具有另一种侦听事件流的方法。块可以定义一个 `onchange` 函数或使用 [setOnChange](/guides/create-custom-blocks/define-blocks.html#修改监听器和校验器.html)，只要块的工作空间发生更改，就会调用该函数。

## 事件类型

请参阅 [参考文档](/reference/js/blockly.events_namespace.html) 以获取有关各个事件的信息。

<!-- 所有事件共享以下常见属性：

| 名称        | 类型   | 描述                                                                                                       |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| type        | 字符串 | `Blockly.Events.CREATE`，`Blockly.Events.DELETE`，`Blockly.Events.CHANGE`，`Blockly.Events.MOVE` 之一      |
| isUiEvent   | 布尔值 | 该事件是否是 UI 事件（例如，滚动，单击，选择，块拖动）。                                                   |
| workspaceId | 字符串 | 工作区的 UUID。通过 `Blockly.Workspace.getById(event.workspaceId)` 可以找到工作区。                        |
| blockId     | 字符串 | 块的 UUID。通过 `workspace.getBlockById(event.blockId`) 可以找到块                                         |
| group       | 字符串 | 组的 UUID。某些事件属于不可分割的组，正如在堆栈中插入语句这种情形。这用于将事件组合在一起以进行撤消/重做。 |

### 工作区事件

#### Blockly.Events.FINISHED_LOADING

加载完成事件不会添加到撤消操作堆栈中。 “加载完成”事件没有附加属性。

### 块事件

#### 块创建事件（Blockly.Events.BLOCK_CREATE）

块创建事件有两个附加属性：

| 名称 | 类型 | 描述                                     |
| ---- | ---- | ---------------------------------------- |
| xml  | 对象 | 定义新块和任何连接子块的 XML 树          |
| ids  | 数组 | 包含新块和任何连接的子块的 UUID 的数组。 |

#### 块删除事件（Blockly.Events.BLOCK_DELETE）

块删除事件有两个附加属性：

| 名称   | 类型 | 描述                                         |
| ------ | ---- | -------------------------------------------- |
| oldXml | 对象 | 定义已删除块和任何已连接子块的 XML 树        |
| ids    | 数组 | 包含已删除块和任何已连接子块的 UUID 的数组。 |

#### 块变更事件（Blockly.Events.BLOCK_DCHANGE）

块变更事件有两个附加属性：

| 名称     | 类型   | 描述                                                                   |
| -------- | ------ | ---------------------------------------------------------------------- |
| element  | 字符串 | 'field'，'comment'，'collapsed'，'disabled'，'inline'，'mutation' 之一 |
| 名称     | 字符串 | 字段名称（如果这是对字段的更改）。                                     |
| oldValue | 值     | 原有值                                                                 |
| newValue | 值     | 新值                                                                   |

#### 块移动事件（Blockly.Events.BLOCK_MOVE）

块移动事件有两个附加属性：

| 名称          | 类型   | 描述                                                         |
| ------------- | ------ | ------------------------------------------------------------ |
| oldParentId   | 字符串 | 旧父块的 UUID。 如果是顶级块，则为未定义。                   |
| oldInputName  | 字符串 | 旧父块的输入名称。如果它是顶级块或父级的下一个块，则为未定义 |
| oldCoordinate | 对象   | X 和 Y 坐标（如果它是顶级块）。如果有父块，则为未定义        |
| newParentId   | 字符串 | 新父块的 UUID。如果它是顶级块，则为未定义                    |
| newInputName  | 字符串 | 新父块的输入名称。如果它是顶级块或父级的下一个块，则为未定义 |
| newCoordinate | 对象   | X 和 Y 坐标（如果它是顶级块）。如果有父块，则为未定义        |

### 工作区注释事件

#### Blockly.Events.COMMENT_CREATE

工作区注释创建事件具有两个附加属性。

| 名称      | 类型   | 描述                  |
| --------- | ------ | --------------------- |
| commentId | 字符串 | 新创建的注释的 UUID。 |
| xml       | 对象   | 定义新注释的 XML 树。 |

#### Blockly.Events.COMMENT_DELETE

工作区注释删除事件具有两个附加属性。

| 名称      | 类型   | 描述                      |
| --------- | ------ | ------------------------- |
| commentId | 字符串 | 删除的注释的 UUID。       |
| xml       | 对象   | 定义已删除评论的 XML 树。 |

#### Blockly.Events.COMMENT_CHANGE

工作区注释更改事件具有四个附加属性。

| 名称        | 类型   | 描述                |
| ----------- | ------ | ------------------- |
| commentId   | 字符串 | 更改的注释的 UUID。 |
| oldContents | 字符串 | 先前的注释内容。    |
| newContents | 字符串 | 新注释内容          |

#### Blockly.Events.COMMENT_MOVE

工作区注释移动事件具有六个附加属性。

| 名称          | 类型   | 描述                               |
| ------------- | ------ | ---------------------------------- |
| commentId     | 字符串 | 要移动的注释的 UUID。              |
| oldCoordinate | 字符串 | 移动前的位置，以工作空间坐标表示。 |
| newCoordinate | 字符串 | 移动后的位置，以工作空间坐标表示。 |

### 变量事件

#### 变量创建事件（Blockly.Events.VAR_CREATE）

变量创建事件有两个附加属性：

| 名称    | 类型   | 描述                                                                        |
| ------- | ------ | --------------------------------------------------------------------------- |
| varType | 字符串 | 变量的类型，如 'int' 或 'string'。不需要是唯一的。这将默认为一种特定类型 “” |
| varName | 字符串 | 变量的名称。在变量和过程中是唯一的                                          |
| varId   | 字符串 | 变量的唯一 id                                                               |

#### 变量删除事件（Blockly.Events.VAR_DELETE）

变量删除事件有两个附加属性。

| 名称    | 类型   | 描述                                                                        |
| ------- | ------ | --------------------------------------------------------------------------- |
| varType | 字符串 | 变量的类型，如 'int' 或 'string'。不需要是唯一的。这将默认为一种特定类型 “” |
| varName | 字符串 | 变量的名称。在变量和过程中是唯一的                                          |
| varId   | 字符串 | 变量的唯一 id                                                               |

#### 变量重命名事件(Blockly.Events.VAR_RENAME)

变量重命名事件有两个附加属性。

| 名称    | 类型   | 描述                                   |
| ------- | ------ | -------------------------------------- |
| oldName | 字符串 | 变量的当前名称。在变量和过程中是唯一的 |
| newName | 字符串 | 变量的新名称。在变量和过程中是唯一的   |
| varId   | 字符串 | 变量的唯一 id                          |

### UI 事件

UI 事件是当多用户协作时不必传输的事件（例如，滚动工作区，缩放，打开工具箱类别）。 UI 事件不会添加到撤消堆栈中。 UI 事件的 isUiEvent 属性等于 true。

#### Blockly.Events.CLICK

点击事件有一个附加属性。

| 名称       | 类型   | 描述                                               |
| ---------- | ------ | -------------------------------------------------- |
| targetType | 字符串 | 单击的元素类型。 “块”，“工作区”，“缩放控制” 之一。 |

#### Blockly.Events.SELECT

选中事件具有两个附加属性。

| 名称         | 类型   | 描述                                                                |
| ------------ | ------ | ------------------------------------------------------------------- |
| oldElementId | 字符串 | 最后选择的元素的 id（可以是块或工作空间、注释的 id）。              |
| newElementId | 字符串 | 所选元素的 id（可以是块、工作空间、注释的 id，取消选择则为 null）。 |

#### Blockly.Events.BLOCK_DRAG

块拖动事件具有两个附加属性。

| 名称    | 类型                           | 描述                   |
| ------- | ------------------------------ | ---------------------- |
| isStart | 布尔值                         | 块是否开始拖动。       |
| blocks  | 块数组(!Array<!Blockly.Block>) | 受此拖动事件影响的块。 |

#### Blockly.Events.MARKER_MOVE

标记移动事件具有三个附加属性。

| 名称     | 类型                         | 描述                                          |
| -------- | ---------------------------- | --------------------------------------------- |
| oldNode  | 语法树节点(?Blockly.ASTNode) | 标记曾经位于的旧节点（如果没有，则为 null）。 |
| newNode  | 语法树节点(?Blockly.ASTNode) | 标记当前所在的新节点。                        |
| isCursor | 布尔值                       | 这是否是一个游标事件。                        |

#### Blockly.Events.BUBBLE_OPEN

气泡打开事件有两个附加属性。

| 名称       | 类型   | 描述                                                  |
| ---------- | ------ | ----------------------------------------------------- |
| isOpen     | 布尔值 | 如果气泡打开，则为 true，否则为 false。               |
| bubbleType | 字符串 | 气泡的类型。 “mutator”，“comment” 或 “warning” 之一。 |

#### Blockly.Events.TRASHCAN_OPEN

回收站打开事件有一个附加属性。

| 名称   | 类型   | 描述                                         |
| ------ | ------ | -------------------------------------------- |
| isOpen | 布尔值 | 垃圾桶弹出窗是否打开（如果关闭则为 false）。 |

#### Blockly.Events.TOOLBOX_ITEM_SELECT

工具箱项选择事件具有两个附加属性。

| 名称    | 类型   | 描述                       |
| ------- | ------ | -------------------------- |
| oldItem | 字符串 | 先前选择的工具箱项目名称。 |
| newItem | 字符串 | 新选择的工具箱项目名称。   |

#### Blockly.Events.THEME_CHANGE

主题更改事件具有一个附加属性。

| 名称      | 类型   | 描述     |
| --------- | ------ | -------- |
| themeName | 字符串 | 主题名称 |

#### Blockly.Events.VIEWPORT_CHANGE

视口更改事件具有三个附加属性。

| 名称     | 类型 | 描述                                               |
| -------- | ---- | -------------------------------------------------- |
| viewTop  | 数字 | 工作空间可见部分相对于工作空间原点的上边缘的距离。 |
| viewLeft | 数字 | 工作空间可见部分相对于工作空间原点的左边缘的距离。 |
| scale    | 数字 | 工作区的缩放比例                                   |

在两个 Blockly 实例之间通过事件进行同步的 [在线演示](https://blockly-demo.appspot.com/static/demos/mirror/index.html)。 -->

## 演示

如果您想了解有关事件的一些有趣示例，可以查看 [mirror demo](https://google.github.io/blockly-samples/examples/mirror-demo/)。该演示展示了两个 Blockly 工作区如何通过事件保持同步。