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


获得代码后，将浏览器指向 `demos/fixed/index.html` 并验证是否可以拖动块。

在您的应用程序代码中，您可以使用以下方式加载 Blockly：
## 在页面中注入 Blockly

验证Blockly安装无误后，使用固定大小的div将Blockly注入网页中。详见下一章《固定工作区域》

更高级的网页可能希望允许Blockly调整大小以填充页面。详见下一章《调整工作区域》

## 组件
前述示例中使用的Blockly.inject行包含“名称-值”对作为第二个参数，这些参数可用于配置。支持一下选项：

| 名称 | 类型 | 描述 |
| --- | --- | :-----:|
| collapse | 布尔型 | 允许折叠或展开块。如果工具箱具有类别，则默认为true，否则为false。 |
| comments | 布尔型 | 允许块有注释。如果工具箱具有类别，则默认为true，否则为false。 |
| css | 布尔型 | 如果为false，请不要注入CSS（提供CSS成为文档的责任）。默认为true。 |
| disable | 布尔型 | 允许禁用块。如果工具箱具有类别，则默认为true，否则为false。 |
| grid | 对象 | 配置可以捕捉到块的网格。详见《网格》...... |
| horizontalLayout | 布尔型 | 如果true工具箱是水平的，如果false则工具箱是垂直的。默认为false。 |
| maxBlocks | 数值型 | 可以创建的最大块数。对学生练习很有用。默认为无限。 |
| maxInstances | 对象 | 从块类型映射到可以创建的该类型的最大块数。未声明的类型默认为Infinity。 |
| media | 字符串 | 从页面（或框架）到Blockly媒体目录的路径，默认是“https://blockly-demo.appspot.com/static/media/” |
| move | 对象 | 配置用户如何在工作区中移动的行为。详见《移动》 |
| oneBasedIndex | 布尔型 | 如果true则列表和字符串操作应该从1开始索引，如果false索引从0开始。默认为true。 |
| readOnly | 布尔型 | 如果为true，则阻止用户编辑。隐藏工具箱和垃圾桶。默认为false。 |
| rtl | 布尔型 | 如果为true，则镜像编辑器（对于阿拉伯语或希伯来语语言环境）。请参阅RTL演示。默认为false。 |
| scrollbars | 布尔型 | 设置工作空间是否可滚动。如果工具箱具有类别，则默认为true，否则为false。 |
| sounds | 布尔型 | 如果为false，则不播放声音（例如，单击和删除）。默认为true。 |
| theme | Blockly.Theme | 如果未提供主题，则默认为经典主题。 详见《主题》|
| toolbox | XML nodes 或 字符串 | 用户可用的类别和块的树结构。请参阅下面的详细信息。 |
| toolboxPosition | 字符串 | 如果“start”工具箱位于顶部（如果是水平）或左侧（如果是垂直和LTR）或右侧（如果是垂直和RTL）。如果“end”工具箱位于对面。默认为“start”。 |
| trashcan | 布尔型 | 显示或隐藏垃圾桶。如果工具箱具有类别，则默认为true，否则为false。 |
| maxTrashcanContents | 数值型 | 将显示在垃圾箱弹出窗口中的最大已删除项目数。 '0'禁用该功能。默认为'32'。 |
| zoom | 对象 | 配置缩放行为。详见《缩放》... |

最重要的选项是工具箱。这是一个XML树，它指定工具箱中可用的块（侧边菜单）、它们的分组方式以及是否有类别。详见《定义toolbox》。

除了Blockly附带的默认块之外，还需要构建自定义块来调用Web应用程序的API。一个例子是迷宫游戏，它有自定义的移动块。详见《创建自定义块》。

## 代码生成器
Blockly不是一种编程语言，不能“运行”一个Blockly程序。相反，Blockly可以将用户的程序转换为JavaScript，Python，PHP，Dart或其他语言。详见《代码生成器》。

## 导入和导出块
如果您的应用程序需要保存并存储用户的块并在以后访问时恢复它们，请使用此调用导出到XML：
```
var xml = Blockly.Xml.workspaceToDom(workspace);
var xml_text = Blockly.Xml.domToText(xml);
```
这将生成一个包含用户块的XML的最小（但很难看）的字符串。如果希望获得更可读（但更大）的字符串，请改用Blockly.Xml.domToPrettyText。

从XML字符串恢复到块也很简单：
```
var xml = Blockly.Xml.textToDom(xml_text);
Blockly.Xml.domToWorkspace(xml, workspace);
```

## 云存储
Blockly附带可选的云存储功能。它使用户能够保存，加载，共享和发布他们的程序。如果您的项目托管在App Engine上，则可以利用此服务。详见《云存储》。