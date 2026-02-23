# 使用弹出气泡

内置图标会用弹出气泡样式展示附加信息或编辑器。自定义图标也可以复用这种交互，以保持一致的界面体验。

如果你的图标需要显示气泡，就应实现 `IHasBubble` 接口。

## 显示或隐藏气泡

使用气泡的图标应实现 `setBubbleVisible` 方法来控制气泡显示和隐藏。

```javascript
// Implement the setBubbleVisible method of the IHasBubble interface.
async setBubbleVisible(visible) {
  // State is already correct.
  if (!!this.myBubble === visible) return;

  // Wait for queued renders to finish so that the icon will be correctly
  // positioned before displaying the bubble.
  await Blockly.renderManagement.finishQueuedRenders();

  if (visible) {
    this.myBubble = new MyBubble(this.getAnchorLocation(), this.getOwnerRect());
  } else {
    this.myBubble?.dispose();
  }
}

// Implement helper methods for getting the anchor location and bounds.

// Returns the location of the middle of this icon in workspace coordinates.
getAnchorLocation() {
  const size = this.getSize();
  const midIcon = new Blockly.utils.Coordinate(size.width / 2, size.height / 2);
  return Blockly.utils.Coordinate.sum(this.workspaceLocation, midIcon);
}

// Returns the rect the bubble should avoid overlapping, i.e. the block this
// icon is appended to.
getOwnerRect() {
  const bbox = this.sourceBlock.getSvgRoot().getBBox();
  return new Blockly.utils.Rect(
      bbox.y, bbox.y + bbox.height, bbox.x, bbox.x + bbox.width);
}
```

## 处理块拖拽

图标位置变化时，气泡不会自动跟随。你需要手动更新气泡位置或隐藏气泡。可在 `IIcon` 的 `onLocationChange` 方法中处理。

```javascript
onLocationChange(blockOrigin) {
  super.onLocationChange(blockOrigin);
  this.myBubble?.setAnchorLocation(this.getAnchorLocation());
}
```

## 返回气泡可见性

`IHasBubble` 还要求实现 `bubbleIsVisible` 方法，以返回气泡当前是否可见。

```javascript
isBubbleVisible() {
  return !!this.myBubble;
}
```
