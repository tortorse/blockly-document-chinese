# 连接和输入

连接和输入定义了你的块如何连接到其他块。

## 连接

连接定义了不同块何时何地可以连接在一起。有四种不同类型的连接：

| 连接类型 | 图片                                                                        |
| -------- | ---------------------------------------------------------------------------- |
| 输出     | <img src="/static/images/connections/output-connection.png" width="45" alt="一个输出连接" /> |
| 输入     | <img src="/static/images/connections/input-connection.png" width="45" alt="一个输入连接" /> |
| 前一个   | <img src="/static/images/connections/previous-connection.png" width="45" alt="一个前一个连接" /> |
| 下一个   | <img src="/static/images/connections/next-connection.png" width="45" alt="一个下一个连接" /> |


输出连接和输入连接可以连接在一起，下一个连接和前一个连接可以连接在一起。

你可以通过设置[连接检查](/guides/create-custom-blocks/inputs/connection-checks)进一步限制哪些连接可以连接在一起。

你可以使用自定义渲染器[自定义连接的形状](/guides/create-custom-blocks/renderers/create-custom-renderers/connection-shapes)。

## 输入

一个输入包含一系列[字段](/guides/create-custom-blocks/fields/overview)，并且可能包含或不包含一个连接。有三种不同类型的[内置输入](/guides/create-custom-blocks/define-blocks#block_inputs)，它们处理了 Blockly 的大多数用例。你也可以[定义自定义输入](/guides/create-custom-blocks/inputs/creating-custom-inputs)，它们支持[自定义渲染](/guides/configure/web/appearance/renderers)。
