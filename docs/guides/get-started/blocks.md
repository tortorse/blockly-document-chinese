# 块

块是你用来编程的。它们代表了基于文本的编程语言中的表达式和语句。

有关块及其各部分的更多信息，请参见[视觉解析](/guides/get-started/workspace-anatomy#blocks)。

## 块定义

块定义指定了块上的拼图块连接和字段。块的大部分外观和样式是通过其他方式指定的。块转换成的字符串（通常是代码）被定义为[块代码生成器](/guides/get-started/code-generation)。

定义简单块的最简单方法是使用 JSON。

这个代码片段定义了一个带有下一个和上一个连接以及一个距离字段的“向前移动”块。

```javascript
// 创建定义。
const definitions = Blockly.createBlockDefinitionsFromJsonArray([
  {
    // 类型就像块的“类名”。它用于构造新实例。例如在工具箱中。
    type: 'my_custom_block',
    // 消息定义了块的基本文本，以及输入或字段将插入的位置。
    message0: 'move forward %1',
    args0: [
      // 每个参数都与消息中的%#相关联。
      // 这个将替换%1。
      {
        // 类型指定要插入的输入或字段的种类。
        type: 'field_number',
        // 名称允许你引用字段并获取其值。
        name: 'FIELD_NAME',
      }
    ],
    // 在块的顶部添加一个无类型的上一个连接。
    previousStatement: null,
    // 在块的底部添加一个无类型的下一个连接。
    nextStatement: null,
  }
]);

// 注册定义。
Blockly.defineBlocks(definitions);
```
<img src="/static/images/example-blocks/move-forward.png" alt="向前移动的块" width="250">

有关如何定义块的更多信息，请参见[定义块](/guides/create-custom-blocks/define-blocks)。

有关如何在工具箱中包含块的信息，请参见[工具箱概述](/guides/configure/toolbox)。

