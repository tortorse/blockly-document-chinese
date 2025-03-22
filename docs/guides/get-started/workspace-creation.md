# 创建工作区

Blockly 工作区是 Blockly 中最高级别的组件。它是您用来通过块进行编程的用户界面。

有关工作区及其子组件的更多信息，请参阅[可视化术语表](https://developers.google.com/blockly/guides/get-started/workspace-anatomy)。

## 注入 div

Blockly 工作区必须被*注入*到一个 `<div>` 中，这个 div 被称为"注入 div"。

注入 div 可以是[固定大小](https://google.github.io/blockly-samples/examples/fixed-demo/index.html)或[动态大小](https://google.github.io/blockly-samples/examples/resizable-demo/index.html)。当窗口调整大小时，div 内的 Blockly 元素会更新其大小。

以下代码片段展示了一个固定大小的注入 div 的 HTML：

```html
<div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
```

## 注入

注入会创建构成工作区用户界面的所有 HTML 子元素。它还会执行使工作区准备就绪所需的所有初始化工作。

注入函数可以接收注入 div 的 ID，或注入 div 本身

```javascript
// 传入 ID
const workspace = Blockly.inject('blocklyDiv', {
  /* config */
});

// 传入注入 div
const workspace = Blockly.inject(document.getElementById('blocklyDiv'), {
  /* config */
});
```

## 配置

在注入过程中，可以使用多个选项（如布局和样式）来配置工作区。

有关配置选项的更多信息，请参阅 [配置选项](/guides/configure/configuration_struct).
