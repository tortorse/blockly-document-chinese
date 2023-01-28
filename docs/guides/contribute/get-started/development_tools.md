# 开发工具

Blockly 使用一些工具和库进行开发，包括 Git、npm 和 Closure Compiler。本节将提供每个工具的一些基本描述，以及指向您可以找到有关每个工具的更多信息的链接。

我们通过脚本使用其中的许多工具。您可能不需要直接运行它们。知道名称可能仍然有助于调试或填充 issue 或功能请求。

### Git

[Git](https://git-scm.com/) 是一个版本控制系统，我们用来跟踪和管理文件的更改。

### GitHub

[GitHub](https://github.com/) 是一个用于版本控制、协作和分发开源代码的托管平台。Git 跟踪文件；GitHub 为审查代码、跟踪 issue 和查看更改历史提供了流畅的界面。

**入门**：如果您不熟悉 Git 和 GitHub，请阅读 GitHub 的 [快速入门](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/quickstart) 教程以熟悉基础知识。

### Node

[Node.js](https://nodejs.org/)是一种在服务器（而不是浏览器）上运行 JavaScript 的方法。npm（见下文）在节点上运行。

### npm

[npm](https://www.npmjs.com/)用来干两件事：

- 我们用来安装依赖项和运行脚本的命令行工具。
- 我们发布代码的在线注册表，使其他开发人员可以轻松使用 Blockly。

**入门**：[安装](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) Node 和 npm。

### Closure Compiler

[Closure Compiler](https://github.com/google/closure-compiler) 是一个让 JavaScript 下载和运行更快的工具。我们使用它将我们所有的 JavaScript 文件合并到一个库中；我们还使用它来检查语法和类型。

**入门**：您不需要直接安装或运行 Closure 编译器：我们通过 npm 安装和运行它。

**Read more**: Closure Compiler 上关于 [JavaScript 类型](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System) 和 [类型注解](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler)的文档。

### ESLint

[ESLint](https://eslint.org/) 是一个静态分析器，可以发现 JavaScript 代码的问题。我们使用它在我们的代码库中定义和强制执行一致的样式。代码的小问题（缺少分号、间距不一致等）通常称为*lint*。当您向我们发送拉取请求时，ESLint 会自动运行。您也可以在本地运行它。

**入门**：在 Blockly 核心和 blockly-samples 中，您都可以使用`npm run lint`. 许多代码编辑器还集成了 ESLint 以在您键入时显示问题。

**阅读更多**：每个 ESLint 规则都有一个 [文档页面](https://eslint.org/docs/rules/no-unreachable) 描述该规则并给出了正确和错误代码的示例。

### Mocha

[Mocha](https://mochajs.org/) 是一个 JavaScript 测试框架。我们使用它在浏览器和 Node.js 上运行测试（用于无头用例）。

**入门**：在 Blockly 核心和 blockly-samples 中，您都可以使用`npm run test`. 在 Blockly 核心中，这也将运行其他测试。Blockly core 的 Mocha 测试定义在 [tests/mocha](https://github.com/google/blockly/tree/master/tests/mocha) 目录中。

**阅读更多**：Mocha 允许开发人员定义 [钩子](https://mochajs.org/#hooks)，允许您为测试定义集中设置和拆卸功能。

### Chai

[Chai](https://www.chaijs.com/) 是我们在 Mocha 测试中使用的断言库。

**阅读更多**：Chai 有多种语法“风格”，可以轻松与现有项目集成。Blockly 使用 [断言](https://www.chaijs.com/api/assert/) 风格。
