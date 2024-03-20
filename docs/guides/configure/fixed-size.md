# 固定尺寸的工作区

将 Blockly 放入网页的最简单方法是将其注入到一个空的 'div' 标签中。

## 1. 获取代码

以适合您的应用程序的方式 [获取代码](/guides/get-started.html#获取源代码)。

## 2. 定义区域

在页面的正文中的某个位置添加一个空的div并设置其大小：

```html
<div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
```

## 3. 注入工作区

[定义工具箱](/guides/configure/toolbox.html) 结构：

```javascript
const toolbox = {
  "kind": "flyoutToolbox",
  "contents": [
    {
      "kind": "block",
      "type": "controls_if"
    },
    {
      "kind": "block",
      "type": "controls_repeat_ext"
    },
    {
      "kind": "block",
      "type": "logic_compare"
    },
    {
      "kind": "block",
      "type": "math_number"
    },
    {
      "kind": "block",
      "type": "math_arithmetic"
    },
    {
      "kind": "block",
      "type": "text"
    },
    {
      "kind": "block",
      "type": "text_print"
    },
  ]
}
```

最后，调用以下内容将Blockly注入到您定义的div中。

```javascript
const workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});
```

`workspace` 变量目前尚未使用，但在以后需要保存模块或生成代码时，它将变得非常重要。如果在同一页面上注入了多个 Blockly 实例，请确保将每个返回的工作区存储在不同的变量中。

现在，您可以在浏览器中测试页面。您应该看到被 Blockly 的编辑器填充的 div，工具箱中有七个模块。这里有一个 [在线示例](https://google.github.io/blockly-samples/examples/fixed-demo/)。