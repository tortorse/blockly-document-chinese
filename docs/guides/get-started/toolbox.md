# 添加工具箱

工具箱包含了您用来编程的块。这些块可以被拖动到工作区中。

有关工具箱外观的更多信息，请参阅[可视化术语表](/guides/get-started/workspace-anatomy#toolbox)。

## 基本定义

工具箱定义指定了哪些块会被包含在工具箱中，以及它们的顺序。工具箱的大部分外观和样式是通过其他方式指定的。

我们建议使用 JSON 来定义您的工具箱。

这段代码片段定义了一个包含两个块的弹出式工具箱：

```javascript
const toolbox = {
  // 有两种工具箱。较简单的一种是弹出式工具箱。
  kind: 'flyoutToolbox',
  // contents 是工具箱中存在的块和其他项目。
  contents: [
    {
      kind: 'block',
      type: 'controls_if'
    },
    {
      kind: 'block',
      type: 'controls_whileUntil'
    }
    // 您可以在这个数组中添加更多的块。
  ]
};

// 工具箱在注入过程中被传递给配置结构。
const workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});

```

![](/static/blockly/images/toolbox-minimal.png)

有关如何定义和配置工具箱的更多信息，请参阅 [工具箱概述](/guides/configure/toolbox).

有关注入的更多信息，请参阅 [创建工作区](/guides/get-started/workspace-creation).
