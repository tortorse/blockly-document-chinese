# 创建自定义图标

要创建自定义图标，需要实现 `IIcon` 接口。这个接口定义了图标如何渲染、点击后做什么等行为。

推荐继承 `Blockly.icons.Icon` 抽象类，因为它已经为 `IIcon` 的多个方法提供了默认实现。

```javascript
class MyIcon extends Blockly.icons.Icon {
  // 构造函数应始终接收 sourceBlock，确保 SVG 元素可正确创建。
  constructor(sourceBlock) {
    super(sourceBlock);
  }
}
```

## 指定图标类型

`getType` 方法返回图标类型值。它用于序列化时注册图标，也用于从 `getIcon` 读取图标实例。

::::tabs
::: tab JavaScript

```javascript
getType() {
  return new Blockly.icons.IconType('my_icon');
}
```

:::
::: tab TypeScript

```typescript
getType(): Blockly.icons.IconType<MyIcon> {
  return new Blockly.icons.IconType<MyIcon>('my_icon');
}
```

:::
::::

## 创建图标视图

图标视图是指显示在块上的 SVG 元素。

### 初始化视图

`initView` 方法用于创建图标在块上的 SVG 元素。新元素应作为 `this.svgRoot` 的子元素，这样图标销毁时可自动清理。

`Blockly.utils.dom` 模块提供了更简洁的 SVG 创建接口。

```javascript
initView(pointerdownListener) {
  if (this.svgRoot) return;  // Already initialized.

  // This adds the pointerdownListener to the svgRoot element.
  // If you do not call `super` you must do this yourself.
  super.initView(pointerdownListener);

  Blockly.utils.dom.createSvgElement(
    Blockly.utils.Svg.CIRCLE,
    {
      'class': 'my-css-class',
      'r': '8',
      'cx': '8',
      'cy': '8',
    },
    this.svgRoot  // Append to the svgRoot.
  );
}
```

### 返回尺寸

`getSize` 方法返回图标尺寸，渲染器会据此为图标预留足够宽度。

尺寸单位是工作区单位，不会随工作区缩放变化。

```javascript
getSize() {
  return new Blockly.utils.Size(16, 16);
}
```

### 设置顺序

图标在块上有固定顺序。例如，内置变形器图标总在注释图标前，注释图标又在警告图标前。

排序由 `getWeight` 返回值控制。权重更大的图标会在权重更小的图标后渲染。

```javascript
getWeight() {
  return 10;
}
```

::: tip 提示
权重只在图标挂到块上时计算一次，不支持动态权重。
:::

## 实现点击行为

很多图标是可交互的，点击后会触发动作。比如内置图标点击后会显示[气泡](https://developers.google.com/blockly/guides/create-custom-blocks/icons/creating-custom-icons/use-bubbles)。你可以在 `onClick` 方法中实现此类逻辑。

```javascript
onClick() {
  // Do something when clicked.
}
```

## 响应块状态变化

有些图标还需要响应块状态变化，尤其是“可编辑状态”和“折叠状态”。

### 可编辑状态

如果图标在块不可编辑时要有不同行为（例如不可点击），可实现 `updateEditable` 方法。块可编辑状态变化时会自动调用该方法。

```javascript
updateEditable() {
  if (this.sourceBlock.isEditable()) {
    // Do editable things.
  } else {
    // Do non-editable things.
  }
}
```

### 折叠状态

有些图标在块折叠时也需要显示，但默认不会显示。此时可重写 `isShownWhenCollapsed` 并返回 `true`。

```javascript
isShownWhenCollapsed() {
  return true;
}
```

然后重写 `updateCollapsed`。

```javascript
updateCollapsed() {
  // By default icons are hidden when the block is collapsed. We want it to
  // be shown, so do nothing.
}
```

## 释放图标资源

图标销毁时应清理自身创建的 DOM 元素和外部引用。追加到 `this.svgRoot` 的元素默认会自动销毁，但其他引用需要手动清理。应在 `dispose` 方法中完成。

```javascript
dispose() {
  // Always call super!
  super.dispose();

  this.myBubble?.dispose();
  this.myOtherReference?.dispose();
}
```
