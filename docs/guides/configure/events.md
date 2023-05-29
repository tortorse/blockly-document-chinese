# 事件

工作区上的每个更改都会触发一个事件。这些事件完整地描述了每个变化的前后状态。

## 监听事件

工作区具有可用于侦听事件流的 `addChangeListener` 方法和 `removeChangeListener` 方法。一个例子是 [实时生成代码](/guides/configure/code-generators.html#实时生成)。另一个例子是 [块最大数量限制演示](https://blockly-demo.appspot.com/static/demos/maxBlocks/index.html)。通常情况下，这两个例子都不关心触发事件是什么。他们只是查看工作区的当前状态。

更复杂的事件监听器将查看触发事件。以下示例检测用户何时创建其第一条注释，发出警报，然后停止监听，以便不再触发其他警报。

```javascript
function onFirstComment(event) {
  if (
    event.type == Blockly.Events.CHANGE &&
    event.element == 'comment' &&
    !event.oldValue &&
    event.newValue
  ) {
    alert('Congratulations on creating your first comment!');
    workspace.removeChangeListener(onFirstComment);
  }
}
workspace.addChangeListener(onFirstComment);
```

为了监听弹出事件中发生的任意事件，可以将一个侦听器添加到弹出的工作区中。

```javascript
var flyoutWorkspace = yourWorkspace.getFlyout().getWorkspace();
flyoutWorkspace.addChangeListener(onFirstComment);
```

块具有另一种侦听事件流的方法。块可以定义一个 `onchange` 函数或使用 [setOnChange](/guides/create-custom-blocks/define-blocks.html#修改监听器和校验器.html)，只要块的工作空间发生更改，就会调用该函数。

## 事件类型

请参阅 [参考文档](/reference/js/blockly.events_namespace.html) 以获取有关各个事件的信息。

## 演示

如果您想了解有关事件的一些有趣示例，可以查看 [mirror demo](https://google.github.io/blockly-samples/examples/mirror-demo/)。该演示展示了两个 Blockly 工作区如何通过事件保持同步。
