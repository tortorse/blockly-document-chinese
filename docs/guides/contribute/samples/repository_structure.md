# Blockly-samples 存储库结构

blockly-samples 存储库包含几个不同类别的项目。此页面旨在帮助您了解不同类别的位置以及类别中的每个项目可能包含的内容。

###  Codelab

Codelabs 是使用 markdown 语法编写并发布在 [blocklycodelabs.dev](https://blocklycodelabs.dev) 的交互式教程。Codelabs 利用自然语言、代码示例和屏幕截图的组合来创建更有趣的教程体验。目标用户在阅读时跟随并运行代码。

![自定义渲染器 Codelab 的屏幕截图](/static/images/StructureCodelab.png)

[codelabs 目录](https://github.com/google/blockly-samples/blob/master/codelabs) 有一个 [模板](https://github.com/google/blockly-samples/blob/master/codelabs/template.md) 和每个 codelab 一个文件夹。 每个 codelab 文件夹都包含一个 markdown 文件和 codelab 的所有资产（png、gif 等）。

### 示例

示例是独立的示例项目，展示了包含和扩展 Blockly 库的技术。它们通常由一个演示网页和一些支持代码组成。虽然 Codelabs 会引导您逐步构建某些东西，但示例会向您展示完成的产品，并允许您按照自己的步调进行探索。

![块反应示例的屏幕截图](/static/images/StructureExamples.png)

示例代码的注释非常好，以便于复制。目标用户可能正在阅读代码、在本地运行代码或复制代码片段。

[示例目录](https://github.com/google/blockly-samples/tree/master/examples)中的 每个示例都有一个文件夹。每个示例都可以使用 运行`npm install && npm run start`，并且有一个`README.md`包含附加上下文或说明的文件。

### 插件

插件是为 Blockly 添加功能的独立代码片段。插件可以添加字段、定义主题、创建渲染器等等。目标用户是通过 npm 找到并使用插件的开发者。此存储库中定义的插件是_第一方_插件，这意味着它们受到 Blockly 团队的支持。

![“类型化变量模态”插件的屏幕截图](/static/images/StructurePlugin.png)

[plugins 目录](https://github.com/google/blockly-samples/tree/master/plugins)中的 每个插件都有一个文件夹。每个插件都有一个`src`包含代码的`test`目录和一个演示页面所在的目录。它们还包含一个 `README.md`文件，该文件为开发人员提供有关插件功能以及如何使用它的信息。

### Github 页面

Blockly-samples 有一个[网页](https://google.github.io/blockly-samples/)，其中许多插件和演示都可以在游乐场环境中使用。该页面托管在 GitHub pages 上，该站点的代码位于 blockly-samples的[gh-pages目录中。](https://github.com/google/blockly-samples/tree/master/gh-pages)此目录包含站点上页面的模板。实际的站点内容是基于这些模板和来自每个插件或示例托管的元数据生成的。