# 自定义拖拽器

拖拽器是一个控制器对象，用于响应用户交互并协调 [可拖拽对象](/guides/configure/dragging/draggable) 的拖拽过程。

通常很少需要实现自定义拖拽器，因为“协调拖拽”本身可定制点不多。  
例如 [scroll-options 插件](https://www.npmjs.com/package/@blockly/plugin-scroll-options) 之所以实现了自定义拖拽器，是为了在工作区边缘增加滚动行为，这会影响像素坐标转换为工作区坐标的方式。

## 职责

拖拽器在执行拖拽时主要负责：

- 调用可拖拽对象上的拖拽相关方法。
- 计算可拖拽对象在工作区坐标系中的目标位置。
- 对当前悬停的 [`DragTarget`](/reference/js/blockly.dragtarget_class) 调用拖拽目标方法。

## 实现

创建自定义拖拽器需要实现 `IDragger` 接口：

```javascript
class MyDragger implements IDragger {
  // 构造函数接收被拖拽对象，以及发生拖拽的工作区。
  constructor(draggable, workspace);
}
```

你也可以继承内置的 `Blockly.dragging.Dragger`，它已经处理了基础职责。

### 开始拖拽

`onDragStart` 负责初始化拖拽。应保存执行拖拽所需的数据，并调用被拖拽对象的 `startDrag`。

::: tip 注意
每次拖拽动作都会新建一个拖拽器实例，因此一些初始化逻辑也可放在构造函数中，例如保存初始位置。
:::

```javascript
onDragStart(e) {
  this.startLoc = this.draggable.getRelativeToSurfaceXY();

  this.draggable.startDrag(e);
}
```

### 拖拽中

`onDrag` 负责执行拖拽。它应根据 `totalDelta` 计算新的工作区坐标位置。`totalDelta` 的单位是像素坐标。

同时还应更新当前悬停的拖拽目标：

- 调用其他拖拽目标钩子前，应先调用 `wouldDelete`。
- 当悬停目标变化时，应先对旧目标调用 `onDragExit`，再对新目标调用 `onDragEnter`。
- 第一次悬停和后续持续悬停时，都应调用 `onDragOver`。

```javascript
onDrag(e, totalDelta) {
  // 更新被拖拽对象位置。
  const delta = this.pixelsToWorkspaceUnits(totalDelta);
  const newLoc = Coordinate.sum(this.startLoc, delta);
  this.draggable.drag(newLoc, e);

  // 调用 wouldDeleteDraggable。
  if (isDeletable(this.draggable)) {
    this.draggable.setDeleteStyle(
      // 检查拖拽目标是否实现 IDeleteArea，并调用 wouldDelete。
      this.wouldDeleteDraggable(e, this.draggable),
    );
  }

  const newDragTarget = this.workspace.getDragTarget(e);
  if (this.dragTarget !== newDragTarget) {
    // 先 onDragExit，再 onDragEnter。
    this.dragTarget?.onDragExit(this.draggable);
    newDragTarget?.onDragEnter(this.draggable);
  }
  // 始终调用 onDragOver
  newDragTarget?.onDragOver(this.draggable);
  this.dragTarget = newDragTarget;
}
```

### 结束拖拽

`onDragEnd` 负责结束拖拽。它应通知被拖拽对象“拖拽已结束”，并通知悬停的拖拽目标“对象已放下”。  
如果拖拽目标是删除区域，还应释放该对象。

- `onDrop` 应始终最先调用。
- 如果拖拽目标阻止移动，应调用 `revertDrag`。
- `endDrag` 应在回滚之后、释放之前调用。
- 若拖拽目标是删除区域，应调用 `dispose`。

```javascript
onDragEnd(e) {
  // 先调用 onDrop。
  const dragTarget = this.workspace.getDragTarget(e);
  if (dragTarget) {
    this.dragTarget?.onDrop(this.draggable);
  }

  // 然后按需回滚。
  if (this.shouldReturnToStart(e, this.draggable)) {
    this.draggable.revertDrag();
  }

  // 然后结束拖拽。
  this.draggable.endDrag(e);

  // 最后按需删除对象。
  if (
    isDeletable(this.draggable) &&
    this.wouldDeleteDraggable(e, this.draggable)
  ) {
    this.draggable.dispose();
  }
}
```

### 注册

你的拖拽器类必须先注册，才能在检测到拖拽时被创建：

```javascript
// 即使拖拽器不只拖拽块，这里的类型仍是 BLOCK_DRAGGER。
// 该命名是为了向后兼容。
Blockly.registry.register(registry.Type.BLOCK_DRAGGER, 'MY_DRAGGER', MyDragger);
```

## 使用

实现完成后，在工作区配置项中传入自定义拖拽器：

```javascript
const myWorkspace = Blockly.inject('blocklyDiv', {
  plugins: {
    // 即使拖拽器不只处理块，这里仍通过 blockDragger 配置。
    // 该命名是为了向后兼容。
    blockDragger: MyDragger,
  },
});
```
