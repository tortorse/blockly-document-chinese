# 训练场

在魔改 Blockly 的核心或开发插件时，训练场是一个非常有用的工具。它有一个预先配置的 Blockly 实例，可用于测试、调试或原型设计。在 Google，Blockly 的几乎所有开发都是使用 Playground 进行的。作为预览，这里是 [演示服务器上的简单训练场](https://blockly-demo.appspot.com/static/tests/playground.html)。

核心 Blockly 有 3 种类型的训练场：简单、高级和多实例。在块状样本中，通常只使用高级训练场。

## 先决条件

Blockly 现在使用 Closure 模块系统。由于它们的加载方式，未编译的 Closure 模块必须从一个`http:`或`https:`URL 中获取，并且不能直接从`file:`URL 中获取。因此，要以非编译模式加载 Playground，您必须从本地 Web 服务器加载它。

我们创建了一个脚本来启动本地服务器并加载加载 Blockly 模块所需的所有代码。你需要 [在你的机器上安装 npm](/guides/contribute/get-started/development_tools#npm) 并`npm install`从 Blockly 的根目录运行以安装所有依赖项。

### 使用 Internet Explorer

Blockly 现在在其代码库中使用可能与 Internet Explorer 不兼容的高级功能。在压缩（编译）代码中，这些功能被转译为可与 IE 一起使用，但加载未压缩代码可能无法正常工作。如果您在 IE 中加载 Playground，即使是通过本地 http 服务器，Playground 也会因此自动加载压缩的 Blockly 代码以确保兼容性。有关在压缩模式下测试 Playground 更改的更多详细信息，请参阅“直接访问 Playground”部分。

## 简单的训练场

简单的 Playground 是其他两个 Playground 的基础。它显示一个工具箱和工作区，并允许您调整有限数量的设置。

要打开操场，请运行

```bash
npm run start
```

来自 Blockly 的根源。确保端口 8080 上没有其他任何东西在监听。这个命令将启动一个托管 Blockly 模块的服务器，并自动打开你的浏览器到 Playground 页面。当您准备好关闭 Playground 时，结束进程（在 Mac 和 Linux 环境中按 ctrl-c）。

训练场特色：

- 所有代码都未压缩以进行快速开发。
- 所有默认块（一些已弃用的块除外）。
- 所有语言生成器（JavaScript、Python、PHP、Lua 和 Dart）。
- 序列化和反序列化工作区状态（JSON 或 XML）。
- 在 LTR 和 RTL 布局之间切换。
- 在工具箱布局之间切换。
- 渲染器的压力测试。
- 在控制台中记录所有事件。

## 高级训练场

高级 Playground 包含额外的功能，使 Blockly 的调试更加容易。这也是所有插件的 blockly-samples 中使用的默认训练场。

这个训练场具有所有简单的训练场功能以及：

- 可以配置其他设置，例如网格大小、缩放/移动控件、渲染器、主题等。
- 使用的设置和块被缓存并在下次加载 Playground 时自动使用。
- 在同一窗口中查看每个生成器的输出。

要为 blockly-samples 中的任何插件启动高级 Playground，请`npm run start`从插件的根目录运行。目前，一次只能运行一个插件，它使用端口 3000。如果您无法启动插件，请首先确保没有其他任何东西在该端口上侦听。

要在核心中启动高级训练场，`npm run start`请从 Blockly 的根目录运行，然后单击标题下的“高级”链接。

[您还可以使用 Blockly 的开发工具包](https://www.npmjs.com/package/@blockly/dev-tools)创建自己的测试页面，其中包含高级训练场。

## 多训练场

多训练场包含多个针对 LTR 模式和工具箱位置的不同配置的训练场。这主要用于快速检查 Blockly 在发布之前是否没有破坏任何与 LTR 相关的内容。要打开此 Playground，请按照简单 Playground 的步骤操作，然后将 URL 更改为`/tests/multi_playground.html`.

## 测试更改

从本地服务器运行任何 Playground 时，在大多数情况下，您只需刷新页面即可查看 Blockly 中的更改。如果您添加了新文件或向文件添加了新依赖项，您可能需要先运行`npm run build`更新`test/deps.js`文件以确保正确加载依赖项，然后刷新页面。

如果您正在运行插件的高级训练场，您甚至不需要刷新页面。更改会自动热加载！

## 直接进入训练场

`test/playground.html`以前，通过在浏览器中直接导航到文件，可以在本地访问简单的 Playground 。使用简单和多训练场仍然可以做到这一点，但不再推荐。如果你这样做，playground 将检测到你没有运行本地服务器并自动使用压缩的 Blockly 文件（有关更多信息，请参阅 [Building Blockly 页面](/guides/contribute/core/building)），并且每当你更改核心 Blockly 中的某些内容时，你将不得不重新构建核心和阶段变化。如果托管在远程服务器上，您仍然可以访问这些页面，例如我们在演示站点上托管的示例。只要您处于压缩模式，背景就会变成亮蓝色。

高级训练场不可通过`file:`访问获得。
