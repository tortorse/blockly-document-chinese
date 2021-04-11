# 栅格

Blockly 的主工作区可以有一个栅格。 块可以被制作成吸附到栅格，从而实现更整洁的布局。 这对于在大面积上分布多个代码组的大型应用程序尤其有用。

栅格的设置是由 Blockly 配置的一部分对象定义的。 这是一个例子：

```javascript
var workspace = Blockly.inject('blocklyDiv',
    {toolbox: document.getElementById('toolbox'),
     grid:
         {spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true},
     trashcan: true});
```

## 间距（Spacing）

最重要的栅格属性是间距，它定义了栅格点之间的距离。默认值为 0，这将导致没有栅格。以下是间距设置为 10,20 和 40 的示例：

![grid-spacing](./grid-spacing.png)

## 长度（length）

`length` 属性是一个定义栅格点形状的数字。长度为 0 会产生不可见的栅格（但仍然可以吸附），长度为 1（默认值）会产生点，较长的长度会导致交叉，长度等于或大于间距会形成网格。以下是设置为 1,5 和 20 的长度示例：

![grid-length](./grid-length.png)

## 颜色（Colour）

`colour` 属性是一个设置点颜色的字符串。请注意使用英式英语拼写。使用任意 CSS 所兼容的格式，包括 `#f00`，`#ff0000` 或 `rgb（255,0,0）`。默认值为`#888`。以下是设置 `colour` 为 `#000`，`#ccc` 和 `#f00` 的示例：

![grid-colour](./grid-colour.png)

## 吸附（Snap）

`snap` 属性是一个布尔值，用于设置块放置在工作区时是否应吸附到最近的栅格点。默认值为 `false`。

![grid-snap](./grid-snap.png)