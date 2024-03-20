# 可调整尺寸的工作区

一个好的 Web 应用程序将调整 Blockly 的大小以填充屏幕上的可用空间，而不是固定大小。有几种方法可以做到这一点，包括使用 iframe ，CSS 和 JavaScript 定位。此页面演示了一种强大而灵活的叠加方法。

这是一个三步过程。第一步是定义区域。第二步是注入 Blockly。第三步是将 Blockly 定位在这个区域上。

## 1. 定义区域

使用 HTML 表格或带有 CSS 的 div，创建一个空白区域，该区域在页面调整大小时会重排。 确保该区域具有 ID（在此页面上，我们将其称为 `blocklyArea`）。

这是一个填充在屏幕底部的表格单元格的 [在线演示](https://blockly-demo.appspot.com/static/demos/resizable/index.html)。

## 2. 注入工作区

注入 Blockly 与 [注入固定尺寸的 Blockly](/guides/configure/fixed-size.html) 中描述的过程相同。添加脚本，`blocklyDiv`元素，工具箱和注入脚本。

Blockly 现在应该在页面上运行，而不是位于它应该位于的位置（可能在屏幕外）。

## 3. 定位工作区

最后一步是将 `blocklyDiv` 元素放在 `blocklyArea` 元素上。为此，从 `blocklyDiv` 中删除任何 `height` 和 `width` 样式并添加绝对定位：

```html
<div id="blocklyDiv" style="position: absolute"></div>
```

然后将注入脚本替换为将 'blocklyDiv' 置于 'blocklyArea' 上的脚本：

```javascript
const blocklyArea = document.getElementById('blocklyArea');
const blocklyDiv = document.getElementById('blocklyDiv');
const workspace = Blockly.inject(blocklyDiv, {
  toolbox: document.getElementById('toolbox')
});
const onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  const element = blocklyArea;
  let x = 0;
  let y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(workspace);
};
window.addEventListener('resize', onresize, false);
onresize();
```

这是填满屏幕的底部的 Blockly 的 [在线演示](https://blockly-demo.appspot.com/static/demos/resizable/overlay.html)。
