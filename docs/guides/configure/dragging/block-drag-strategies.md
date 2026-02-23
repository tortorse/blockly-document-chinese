# 自定义块拖拽策略

块拖拽策略是一个对象，用来决定块如何处理拖拽。它实现了把块作为 [可拖拽对象](/guides/configure/dragging/draggable) 的逻辑。

通过创建新的块拖拽策略，你可以替换块的拖拽处理方式，而不需要自己实现自定义可选中对象，也不需要自己处理选择逻辑。

例如，你可能希望“拖拽时复制块”，而不是普通拖拽。块拖拽策略就可以实现这类行为。

拖拽策略的方法与 `IDraggable` 基本一致，唯一例外是 `getRelativeToSurfaceXY`。

## 实现

要创建拖拽策略，需要实现 `IDragStrategy` 接口。它要求的方法与 `IDraggable` 相同，但不包括 `getRelativeToSurfaceXY`，因为块本身已经实现了该方法。

你可以按 [可拖拽对象实现指南](/guides/configure/dragging/draggable#实现) 的方式来写拖拽策略，只需跳过 `getRelativeToSurfaceXY()`。

## 使用

要使用自定义拖拽策略，需要把策略应用到每一个块实例。可在块的 `init` 方法里调用 `setDragStrategy`：

```javascript
Blockly.Blocks['my_block'] = {
  init: function() {
    // 其他初始化逻辑...
    this.setDragStrategy(new MyDragStrategy());
    // 其他初始化逻辑...
  }
}
```
