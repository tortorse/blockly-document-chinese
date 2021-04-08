# 入门

本文档面向希望创建将Blockly作为代码编辑器的应用程序的开发人员。这里假设用户已经熟悉 Blockly 的用法，并且人们对 HTML 和 JavaScript 有基本的了解。

## 总览
Blockly 被设计成可以轻松安装到您的 Web 应用程序中。用户拖动块，Blockly 生成代码，您的应用程序使用该代码执行某些操作。从您的应用程序的角度来看，Blockly 只是一个文本区域，用户可以在其中键入语法上完美的 JavaScript，Python，PHP，Lua，Dart 或其他语言。

Blockly 是 100％ 的客户端，不需要服务器的任何支持（除非有人想使用云存储功能）。 没有第三方依赖（除非有人想重新编译内核）。 一切都是开源的。
## 获取源代码

### 推荐使用: npm

Blockly 已在 [npm](https://www.npmjs.com/package/blockly) 和 [yarn](https://yarnpkg.com/package/blockly) 上发布。 我们建议通过 npm 获取 Blockly，因为：

- 可以随时获取最新版本的 Blockly
- 鼓励 [使用插件](/guides/plugins/overview) 而非脏补丁

如果您已经在使用 npm，则可以通过以下方式安装 Blockly

```bash
npm install --save blockly
```
您可以使用以下代码在应用程序代码中引用 Blockly：

```javascript
import Blockly from 'blockly';
```

这将导入默认软件包。 有关更多信息，请参阅程序包 [自述文件](https://www.npmjs.com/package/blockly)，以及结合 [Node](https://github.com/google/blockly-samples/tree/master/examples/blockly-node) 与 [webpack](https://github.com/google/blockly-samples/tree/master/examples/blockly-webpack) 使用 Blockly 的示例。

### Unpkg

如果您的项目未使用包管理器，但又不想自己拷贝代码，则可以使用 unpkg。

```html
<script src="https://unpkg.com/blockly/blockly.min.js"></script>
```
Unpkg 会获取已发布代码的最新版本，因此使用此方法将不会有任何版本控制。 它非常适合演示或快速实验，我们在许多代码实验室中都使用它。

### GitHub

您还可以从 GitHub 复制整个源代码。 但是，您将必须定期手动同步到我们的代码仓库，以便接收最新的更新和对 Blockly 的修复。

首先，从 GitHub 下载源代码。 如果您知道如何使用 Git 或 Subversion，我们强烈建议您从存储库中进行同步，以使您的代码保持最新状态。


- [下载 zip](https://github.com/google/blockly/zipball/master)
- [下载 TAR Ball](https://github.com/google/blockly/tarball/master)
- [GitHub](https://github.com/google/blockly)

获得代码后，将浏览器指向 `demos/fixed/index.html` 并验证是否可以拖动块。

在您的应用程序代码中，您可以使用以下方式加载 Blockly：

```html
<script src="blockly_compressed.js"></script>
```

您可能还需要引入其他文件，这些文件将在下一节链接的“注入 Blockly”指南中进行说明。

## 注入 Blockly

验证Blockly安装无误后，使用固定大小的 `div` 将 Blockly 注入网页中。

→ 详细信息见 [注入固定尺寸的 Blockly...](/guides/configure/fixed-size)

更高级的网页可能希望允许 Blockly 调整大小以填充页面。

→ 详细信息见 [注入可调整尺寸的 Blockly...](/guides/configure/resizable)

## 配置

Blockly 是高度可配置的。 例如，您可以在工作空间上设置主题或渲染器，将工作空间设置为 RTL(自右向左) 模式，或从各种缩放和滚动模式中进行选择。

通过在注入 Blockly 工作区时传递配置结构，可以完成每个工作区的配置。

→ 详细信息见 [配置工作区...](/guides/configure/configuration_struct)


## 定义块

除了 Blockly 随附的默认块之外，还需要构建自定义块来调用您自己的 Web应用程序的API。 一个例子就是这个[迷宫游戏](https://blockly.games/maze)，它具有自定义的移动块。

→ 详细信息见 [创建自定义块...](/guides/create-custom-blocks/overview)

## 代码生成器

Blockly 不是一种编程语言，无法“运行” Blockly 程序。 相反，Blockly 可以将用户的程序转换为 JavaScript，Python，PHP，Dart 或其他某种语言。

→ 详细信息见 [代码生成器...](/guides/configure/code-generators)

## 导入和导出块

如果您的应用程序需要保存和存储用户的块并在以后访问时恢复它们，请使用此调用导出到 XML：

```javascript
var xml = Blockly.Xml.workspaceToDom(workspace);
var xml_text = Blockly.Xml.domToText(xml);
```

这将产生一个最小（但难看）的字符串，其中包含用户块的 XML。 如果希望获取更易读（但更大）的字符串，请改用 `Blockly.Xml.domToPrettyText`。

从 XML 字符串还原到块很简单：

```javascript
var xml = Blockly.Xml.textToDom(xml_text);
Blockly.Xml.domToWorkspace(xml, workspace);
```

## 云存储

Blockly 带有可选的云存储功能。 它使用户可以保存，加载，共享和发布他们的程序。 如果您的项目托管在 App Engine 上，则可以利用此服务。

→ 详细信息见 [云存储...](//guides/configure/cloud-storage)