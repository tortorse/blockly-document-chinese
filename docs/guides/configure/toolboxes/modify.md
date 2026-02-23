# 修改工具箱

应用可以在任意时刻通过一次函数调用修改工具箱中的可用块：

```javascript
workspace.updateToolbox(newTree);
```

与初始配置时一致，`newTree` 可以是节点树、字符串表示或 `JSON` 对象。唯一限制是不能改变模式：如果初始定义的工具箱有分类，新工具箱也必须有分类（分类内容可以变化）；同样，如果初始定义的工具箱没有分类，新工具箱也不能包含分类。

单个分类的内容可以这样更新：

```javascript
var category = workspace.getToolbox().getToolboxItems()[0];
category.updateFlyoutContents(flyoutContents);
```

其中 `flyoutContents` 可以是用 `JSON` 定义的块列表、节点树或字符串表示。

请注意，当前更新工具箱会触发一些轻微的界面重置：

- 在无分类工具箱中，用户已修改过的字段值会恢复到默认值，例如下拉字段。

这里有一个包含分类和块分组树的在线示例：[工具箱动态更新示例](https://raspberrypifoundation.github.io/blockly-samples/examples/toolbox-demo/)。
