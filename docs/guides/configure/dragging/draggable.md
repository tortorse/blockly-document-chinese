# 自定义可拖拽对象

可拖拽对象是存在于 [工作区](/guides/get-started/workspace-anatomy#工作区) 中、可被拖拽与放置的可渲染对象。它们实现 [`IDraggable`](/reference/js/blockly.idraggable_interface) 接口。

通常很少需要向 Blockly 新增可拖拽对象。典型场景例如 [multiselect 插件](https://www.npmjs.com/package/@mit-app-inventor/blockly-plugin-workspace-multiselect)，或修改已有对象的拖拽行为。因为 Blockly 里可渲染对象的类型本身是固定的，工作区内只有块、气泡和工作区注释。

## 职责

可拖拽对象在执行拖拽时主要负责：

- 把 SVG 元素移动到拖拽层。
- 平移 SVG 元素。
- 触发移动 [事件](/guides/configure/events)。

## 实现

要创建新的可拖拽对象，需要实现 [`IRenderedElement`](/reference/js/blockly.irenderedelement_interface) 与 [`IDraggable`](/reference/js/blockly.idraggable_interface) 接口，让 Blockly 知道该对象可见且可拖拽。

```javascript
class MyDraggable implements IRenderedElement, IDraggable {}
```

### 返回根 SVG 元素

`getSvgRoot` 需要返回根 SVG 元素，通常是一个 `<g>`，它承载该可拖拽对象的全部可视元素。

```javascript
getSvgRoot() {
  return this.rootSvg;
}
```

### 返回可移动状态

`isMovable` 用于返回当前对象是否可移动。你可以临时禁用某对象的拖拽。  
若 `isMovable` 返回 `false`，则会改为拖动工作区本身。

```javascript
isMovable() {
  return true;
}
```

### 返回位置

`getRelativeToSurfaceXY` 返回一个 [`Coordinate`](/reference/js/blockly.utils_namespace.coordinate_class)，表示该对象左上角在工作区坐标系中的位置。

工作区坐标系原点位于工作区绝对左上角，不会随着工作区缩放或平移而改变。

```javascript
getRelativeToSurfaceXY() {
  return this.loc;
}
```

### 开始拖拽

`startDrag` 用于初始化拖拽。它本身不移动对象，但应在这里保存拖拽中需要的数据、创建所需对象，并保存可用于 `revertDrag` 回滚的数据。

还应把 SVG 元素移到工作区拖拽层，确保显示在其他元素之上。  
该方法会接收事件参数，可用于检查按键状态，例如区分“按住 Shift 的拖拽”和普通拖拽。

```javascript
startDrag(e) {
  // 保存初始位置，供回滚使用。
  this.startLoc = this.getRelativeToSurfaceXY();

  // 为性能考虑，拖拽时先关闭工作区 resize。
  this.workspace.setResizesEnabled(false);

  // 把元素放到拖拽层。
  this.workspace.getLayerManager()?.moveToDragLayer(this);

  // 触发拖拽事件...

  // 其他初始化逻辑...
}
```

### 拖拽

`drag` 负责实际移动对象。`newLoc` 是工作区坐标，方法同样会收到事件参数以检查按键状态。

```javascript
drag(newLoc, e) {
  this.moveTo(newLoc);
}
```

### 回滚拖拽

`revertDrag` 会把对象恢复到拖拽开始时的位置。  
例如当对象被放到一个阻止移动的 [`DragTarget`](/reference/js/blockly.dragtarget_class) 上时，就会发生回滚。

```javascript
revertDrag() {
  // 回到在 startDrag 中记录的位置。
  this.moveTo(this.startLoc);
}
```

### 结束拖拽

`endDrag` 用于清理拖拽过程，释放临时数据或对象，并把元素放回原图层。  
如果调用了 `revertDrag`，随后一定会调用 `endDrag`。

```javascript
endDrag() {
  // 放回原始图层（此处示例为 BLOCK 层）。
  this.workspace
    .getLayerManager()
    ?.moveOffDragLayer(this, Blockly.layers.BLOCK);

  // 恢复工作区 resize。
  this.workspace.setResizesEnabled(true);
}
```

## 选择

当系统检测到拖拽时，真正被拖动的是“当前已选中”的元素。

### ISelectable

要让可拖拽对象可被选中，需实现 [`ISelectable`](/reference/js/blockly.iselectable_interface) 接口。

```javascript
class MyDraggable implements ISelectable {
  constructor(workspace) {
    this.id = Blockly.utils.idGenerator.genUid();
    this.workspace = workspace;
  }

  select() {
    // 视觉上标记为已选中。
  }

  unselect() {
    // 视觉上标记为未选中。
  }
}
```

### 设置选中

可通过 [`Blockly.common.setSelected()`](/reference/js/blockly.common_namespace.setselected_2_function) 设置当前选中元素。通常在用户触发 `pointerdown` 时调用。

```javascript
constructor() {
  this.initSvg();

  Blockly.browserEvents.conditionalBind(
    this.getSvgRoot(),
    'pointerdown',
    this,
    () => Blockly.common.setSelected(this));
}
```

## 兼容性

可拖拽对象还可以实现更多接口，以接入 Blockly 的其他系统。

### 可删除

实现 [`IDeletable`](/reference/js/blockly.ideletable_interface) 后，对象可被垃圾桶或其他删除目标释放。

```javascript
class MyDraggable implements IDeletable {
  isDeletable() {
    return true;
  }

  dispose() {
    // 释放数据引用与 SVG 元素。
  }

  setDeleteStyle() {
    // 视觉上提示“即将被删除”。
  }
}
```

### 可复制

你可以实现 `ICopyable` 让对象可复制，再定义 `IPaster` 让对象可粘贴。  
更多信息见 [复制与粘贴](/guides/configure/copy-paste)。
