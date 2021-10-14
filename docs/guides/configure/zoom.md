# 缩放

Blockly 的主工作空间可伸缩，既可由用户动态调整，也可由开发人员静态设置。

缩放设置由 [Blockly 配置](/guides/get-started/web#configuration.html) 的一部分对象来定义。这是一个例子：

```javascript
var workspace = Blockly.inject('blocklyDiv',
    {toolbox: document.getElementById('toolbox'),
     zoom:
         {controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2},
     trashcan: true});
```

## 控制

设置为 `true` 以显示 中心缩放，放大和缩小 按钮。默认为 `false`。

![zoom-controls](./zoom-controls.png)

## 滚轮

设置为 `true` 以允许鼠标滚轮缩放。默认为 `false`。

## 初始比例（startScale）

初始放大系数。对于存在多个层级的应用程序，`startScale` 通常在第一级设置为较高值，然后随着后续级别变得更复杂而逐渐降低。默认为 `1.0`。

## 最大比例（maxScale）

可以放大的最大倍增系数。默认为 `3`。

## 最小比例（minScale）

可以缩小的最小倍增系数。默认为 `0.3`。

## 缩放速率(scaleSpeed)

对于每个放大/缩小步骤，比例分别乘以或除以比例速度，这意味着：`scale = scaleSpeed ^ steps`。请注意，在此公式中，缩小步骤为减少，放大步骤为增加。默认为 `1.2`。

## 捏合(Pinch)

设置为 `true` 以启用捏合缩放以支持触摸设备。 如果将 `wheel` 或 `controls` 选项设置为 `true`，则默认为 `true`。
