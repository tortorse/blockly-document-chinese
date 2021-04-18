# 移动

可以使用三种不同的方法在 Blockly 的主工作区中移动：滚动条，鼠标或鼠标滚轮。

有关移动的设置由 [Blockly 配置](/guides/get-started.html#配置) 的一部分对象来定义。 这是一个例子：

```javascript
var workspace = Blockly.inject('blocklyDiv',
    {move:{
        scrollbars: true,
        drag: true,
        wheel: false}
    });
```

## 滚动条

确定工作区是否具有垂直或水平滚动条。 使用一个对象，其中的 `horizontal` 属性确定是否启用水平滚动，而 `vertical` 属性确定了是否启用垂直滚动。 如果传递了布尔值，则相当于同时将 `horizontal` 和 `vertical` 属性设置为该布尔值。 如果工作空间具有分类，则默认为 `true`（启用水平和垂直滚动）。

## 拖动

确定是否可以使用鼠标拖动工作区。 如果滚动条为 `false`（至少在选项中解析），则始终为 `false`。 如果滚动条为 `true`，则默认为 `true`。
## 鼠标滚轮

确定是否可以使用鼠标滚轮滚动工作区。 如果滚动条为 `false`（至少在选项中解析），则始终为 `false`。 默认为 `false`。