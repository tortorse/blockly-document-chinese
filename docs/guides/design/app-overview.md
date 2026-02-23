# Blockly 应用简介

Blockly 应用是一个包含 Blockly 编辑器（workspace）的 Web 应用。本文介绍 Blockly 应用通常用于解决哪些问题，以及常见的用户界面（UI）组成。

如果你还没有阅读相关基础内容，建议先看[可视化术语表](/guides/get-started/workspace-anatomy)和[应用基础步骤](/guides/get-started/workspace-creation)。

## Blockly 应用能做什么？

Blockly 应用可以帮助用户在很多领域编写程序，例如游戏、机器人和数据分析。用户使用**块（block）**编写程序，应用将其**生成文本代码**（如 JavaScript、Python），然后由应用**直接运行**，或由用户**下载到其他平台运行**（例如机器人或掌机）。

下面是常见场景：

- **解谜、动画或音乐：** 生成代码用于解谜（如迷宫）、播放动画或音乐。示例可见 [Code.org Music Lab](https://studio.code.org/projects/music/new)。
- **电子游戏：** 生成代码用于运行游戏。例如在 [MakeCode Arcade](https://arcade.makecode.com/) 制作“Whack the Mole”前两关，并下载到控制器或在模拟器中运行。
- **机器人：** 生成代码用于控制机器人。例如使用 [Ozoblockly](https://games.ozoblockly.com/shapetracer-freeform) 编程，并下载到实体机器人或在模拟器中运行。
- **绘图：** 生成代码用于绘制 2D/3D 图形。示例可见 [BlocksCAD](https://www.blockscad3d.com/editor/)。
- **数据分析：** 生成代码用于分析数据并绘制图表。示例可见 [Dialogic Platform 演示](https://dialogiconderzoek.nl/diadashboard/platform/demo1.gif)。
- **应用专用代码：** 生成代码用于特定应用任务。例如 [Blockly 开发者工具](https://raspberrypifoundation.github.io/blockly-samples/examples/developer-tools/index.html) 可用于设计新块，并生成块定义代码供开发者复制到自己的 Blockly 应用中。

## 用户界面

理解 Blockly 应用常见组成的一个好方法，就是先看它们的用户界面。

### 基础 UI 组件

几乎所有 Blockly 应用都有三个基础组件：Blockly 编辑器（workspace）、输出面板和“运行（Run）”按钮。下面是 Blockly Games 里 [Maze](https://blockly.games/maze?level=4) 的界面：

<img src="/static/blockly/images/application-overview/games-maze.png" alt="迷宫应用界面，包含编辑器、输出面板和运行按钮。" width="75%">

有些 Blockly 应用不提供“运行（Run）”按钮，而是在用户每次修改后自动更新输出。例如 Blockly samples 中的 [Graph](https://raspberrypifoundation.github.io/blockly-samples/examples/graph-demo/index.html) 示例有两个输出面板（图像与方程），并且会在每次修改后自动刷新。

<img src="/static/blockly/images/application-overview/graph-sample.png" alt="图形应用界面，包含编辑器、方程输出面板和图形输出面板。" width="75%">

还有一些应用没有输出面板，这在硬件类应用（如机器人编程）里很常见。部分应用会提供硬件模拟器，但很多应用是直接让用户下载代码并在目标设备上运行。

### 附加 UI 组件

大多数应用还会包含附加 UI 组件。有些是通用需求（例如保存用户工作），有些是应用特定需求（例如 GUI 设计器）。例如：

- [Scratch](https://scratch.mit.edu/)（用于制作动画和游戏）提供图形与声音编辑器、精灵与背景面板，以及文件/编辑/设置菜单。

  <img src="/static/blockly/images/application-overview/mit-scratch.png" alt="Scratch 用户界面。" width="85%">

- [MakeCode Arcade](https://www.microsoft.com/en-us/makecode)（用于制作游戏）提供输出控制、代码与图形编辑器、设置菜单，以及下载和保存按钮。其输出面板模拟掌机设备。

  <img src="/static/blockly/images/application-overview/makecode-arcade.png" alt="MakeCode Arcade 用户界面。" width="85%">

- [MIT App Inventor](https://appinventor.mit.edu/)（用于制作手机应用）将 GUI 设计器和 Blockly 编辑器分为两个界面，并提供文件、连接、构建和设置菜单。它不依赖传统输出面板，而是让用户在手机上测试生成代码。

  <img src="/static/blockly/images/application-overview/mit-app-inventor-gui.png" alt="App Inventor 的 GUI 设计器界面。" width="85%">
  <img src="/static/blockly/images/application-overview/mit-app-inventor-blockly.png" alt="App Inventor 的 Blockly 编辑器界面。" width="85%">

要添加哪些附加组件，取决于你的应用目标和用户能力。常见组件包括：

- **管理类（Administration）**
  - 文件管理（新建、打开、保存、另存为、删除）
  - 账户管理（创建、登录、登出）
  - 设置（语言、UI 配置）
- **编程类（Programming）**
  - 编辑命令（撤销、重做、复制、剪切、粘贴、复制副本）
  - GUI 设计器
  - 图形与声音编辑器
  - 代码编辑器或只读代码展示
- **测试类（Testing）**
  - 输出配置（开始/停止、播放速度、音量、截图等）
  - 调试器（断点、运行、单步、块高亮）
  - 测试参数设置
- **硬件类（Hardware）**
  - 连接方式（USB、蓝牙、二维码）
  - 配置（型号选择、配件选择、组件命名）
  - 控制（手动控制机器人、记录机器人位置）
  - 下载代码
- **帮助类（Help）**
  - 文档
  - 交互式教程
  - 上下文敏感帮助

## 下一步

如果你还在设计应用，可以继续阅读[应用设计](/guides/design/applications)。

如果你想体验构建一个简单应用的流程，可以尝试 [Getting started with Blockly codelab](https://blocklycodelabs.dev/codelabs/getting-started/index.html)。

如果你准备开始开发应用：

- [构建编辑器](/guides/configure/configuration_struct)
- [构建块](/guides/create-custom-blocks/overview)
- [构建应用](/guides/app-integration/best-practices)
