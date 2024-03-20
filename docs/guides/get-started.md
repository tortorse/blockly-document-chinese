# 入门

本文档面向希望创建将 Blockly 作为代码编辑器应用程序的开发人员。这里假设用户已经熟悉 Blockly 的用法，并且人们对 HTML 和 JavaScript 有基本的了解。

## 总览

Blockly 被设计成可以轻松安装到您的 Web 应用程序中。用户拖动块，Blockly 生成代码，您的应用程序使用该代码执行某些操作。从您的应用程序的角度来看，Blockly 只是一个文本区域，用户可以在其中键入语法上完美的 JavaScript，Python，PHP，Lua，Dart 或其他语言。

Blockly 是 100％ 的客户端，不需要服务器的任何支持（除非有人想使用云存储功能）。 没有第三方依赖（除非有人想重新编译内核）。 一切都是开源的。

## 获取源代码

### 推荐使用: npm

Blockly 已在 [npm](https://www.npmjs.com/package/blockly) 和 [yarn](https://yarnpkg.com/package/blockly) 上发布。 我们建议通过包管理器获取 Blockly，因为：

- 可以随时获取最新版本的 Blockly
- 鼓励 [使用插件](/guides/plugins/overview.html) 而非脏补丁

如果您已经在使用包管理器，则可以通过以下方式安装 Blockly

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

Unpkg 会获取已发布代码的最新版本，因此使用此方法将不会有任何版本控制。 它非常适合演示或快速实验，我们在许多 Codelab 中都使用它。

### GitHub

您还可以从我们的 [GitHub发布版本](https://github.com/google/blockly/releases) 中下载压缩后的代码。然而，这需要您定期手动下载代码以获取Blockly的最新更新和修复。

下载好Blockly后，您可以将以下内容添加到应用程序代码中以加载它：

```html
<script src="blockly_compressed.js"></script>
```

您可能还需要加载Blockly的内置模块，至少一个语言生成器和至少一个语言文件。

```html
<script src="blocks_compressed.js"></script>
<script src="javascript_compressed.js"></script>
<script src="msg/js/en.js"></script>
```

:::warning 警告
GitHub下载仅为方便先前对Blockly进行复刻的开发人员提供。如果您是新开发人员，您应该使用 NPM 或 unpkg。
:::

## 注入 Blockly

在获取了Blockly之后，您需要将其注入到应用页面上的一个 div 中。

→ 详细信息见 [注入固定尺寸的 Blockly...](/guides/configure/fixed-size.html)

更高级的网页可能希望允许 Blockly 调整大小以填充页面。

→ 详细信息见 [注入可调整尺寸的 Blockly...](/guides/configure/resizable.html)

## 配置

Blockly 是高度可配置的。 例如，您可以在工作空间上设置主题或渲染器，将工作空间设置为 RTL(自右向左) 模式，或从各种缩放和滚动模式中进行选择。

通过在注入 Blockly 工作区时传递配置结构，可以完成每个工作区的配置。

→ 详细信息见 [配置工作区...](/guides/configure/configuration_struct.html)

## 定义块

除了 Blockly 随附的默认块之外，还需要构建自定义块来调用您自己的 Web 应用程序的 API。 一个例子就是这个[迷宫游戏](https://blockly.games/maze)，它具有自定义的移动块。

→ 详细信息见 [创建自定义块...](/guides/create-custom-blocks/overview.html)

## 代码生成器

Blockly 不是一种编程语言，无法“运行” Blockly 程序。 相反，Blockly 可以将用户的程序转换为 JavaScript，Python，PHP，Dart 或其他某种语言。

→ 详细信息见 [代码生成器...](/guides/configure/code-generators.html)

## 导入和导出块

如果您的应用程序需要保存和存储用户的模块，并在以后的访问中恢复它们，请使用此调用将其序列化为JSON：

```javascript
var json = Blockly.serialization.workspaces.save(workspace);
```

将JSON反序列化为模块同样容易：

```javascript
Blockly.serialization.workspaces.load(json);
```
