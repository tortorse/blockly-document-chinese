# 撰写优质 issue

所有优秀的项目都是以用户反馈为基础的。Blockly 使用 GitHub issue 来跟踪反馈。本页详细介绍了如何编写易于开发者阅读和回复的 issue，这样更有可能解决您的 bug 报告/功能请求！

## 前期工作

### 有问题要问？

我们很乐意听到您的问题！但 GitHub 问题对他们来说不是很好的媒介。如果您有疑问，请转到我们的 [开发者论坛](https://groups.google.com/forum/?hl=zh-cn#!forum/blockly)。如果您在该部分提出问题，就更有可能收到及时而全面的回答，因为它已经有多位像您一样使用 Blockly 的开发者了！

### 检查是否存在重复内容

在编写 _任何_ 类型的 issue 之前，最好先查看是否有已存在 issue 相匹配。如果有的话，您就不必自行编写代码了！因此，在开始编写之前，请搜索重复或相关 issue。

- 在 [blockly-samples](https://github.com/google/blockly-samples/issues?q=is%3Aissue+mySearchHere) 中搜索
- 在 [Blockly core](https://github.com/google/blockly/issues?q=is%3Aissue+mySearchHere) 中搜索
- 搜索 [论坛](https://groups.google.com/g/blockly/search?q=mySearchHere&hl=zh-cn)

如果您发现匹配问题，请竖起大拇指或添加备注，详细说明您的想法。这对于 bug 报告和功能请求尤为重要。如果开发者发现某个 issue 受到了大量关注，就更有可能解决该问题！

## 报告 bug

你认为你发现了一个 bug?太棒了！我们希望收到错误报告，因为我们希望这个项目尽可能稳定。您可以遵循下面的步骤来帮助修复 bug。

1. [检查是否存在重复](#检查是否存在重复内容)
2. [收集证据](#收集证据)
3. [定位问题](#定位问题)
4. [确保重现](#确保重现)
5. [溯因建议](#溯因建议)
6. [编写 issue！](#写下您的问题)

### 收集证据

通常，你提供的 bug 包含的信息越多越好。以下是您可能想要提供的一些信息：

- 如果 bug 导致了视觉层面的问题，**屏幕截图或 GIF** 会非常有帮助。
- 如果 bug 只会影响某些类型的代码块或工作区配置，**示例代码**会非常有用。
- 如果您在特定环境之外无法重现错误，那么 **已部署的站点** 会是您的理想之选。

### 定位问题

在核心库、插件、示例和 Codelab 之间，我们有大量 Blockly 代码。告诉我们问题的确切位置，以帮助我们解决问题。

如果问题出在核心，是哪个组件？ 例如，它可能是工具箱、缩放控件或库块的问题。 要尽可能具体。

如果问题出在 blockly-samples 中，找出它在哪个插件、代码实验室或示例中。如果您在多个地方发现相同的错误，请也告诉我们。

### 确保重现

bug 只有在可重现时才能修复，因此在提交问题之前，请确保您有可靠的方法让 bug 发生。

您最终应呈现一个有序列表，告知开发者如何重现 bug。例如：

1. 打开 X Codelab。
2. 前往 Y 页。
3. 运行 Z 示例代码。
4. 观察看起来像 W 的错误行为。

如果您的问题出在 Blockly 核心中，请尝试在 [playground](https://blockly-demo.appspot.com/static/tests/playground.html) 中重现它。

### 溯因建议

如果您认为自己知道 bug 发生的原因，请同时添加这些信息。同样，请尽可能具体说明。

### 写下您的 issue！

现在该撰写 bug 报告了。选择您的代码仓库：

- [Blockly core](https://github.com/google/blockly/issues/new?assignees=&labels=type%3A+bug%2C+triage&template=bug_report.md)
- [Blockly-samples](https://github.com/google/blockly-samples/issues/new?assignees=&labels=type%3A+bug%2C+triage&template=bug_report.md)

请务必填写 issue 模板的所有部分，包括此处没有详细介绍的部分。

感谢您报告错误，祝您编写愉快！

### 后续操作

- 系统会自动为您的错误报告添加标签。
- Blockly 团队的值班成员会进行核实，并可能会提出澄清性问题。他们还会添加标签，让我们的 bug 井然有序。
- 相应 issue 可能会被标记为 "Help Wanted"，在这种情况下，您可以申领它并开始着手解决。
- 该 issue 可能会被分配给 Blockly 团队成员解决。
- 该 issue 可能会标有季度里程碑，以指示何时完成。
- 该 issue 可能放置在 Icebox 里程碑中，这意味着我们不打算在可预见的未来对其进行处理。
  - 出现低频率 issue 或有已知解决方法的 bug 时，可能会发生这种情况。
  - 您仍然可以处理 Icebox issue。
- 该 issue 可能会被放置在 Bug Bash Backlog 里程碑中，这意味着它不紧急，但我们仍想修复它。
  - 在每个季度末，团队都会花几周时间处理从 Bug Bash Backlog 里程碑中提取的错误。
- 如果需要，issue 可能会从 Blockly core 转移到 blockly-samples（或相反的方向）。
- 该 issue 可能已关闭。

## 功能请求

有什么你想改变的，让 Blockly 变得更好吗？ 您有关于插件、示例或代码实验室的想法吗？ 也许已经有一个你喜欢的，并且你想出了一个改进它的方法。 如果是这样，那么您来对地方了！ 以下步骤可帮助您创建出色的功能请求并获得响应。

1.  [检查是否存在重复](#检查是否存在重复内容)
2.  [核查需求](#核查需求)
3.  [收集想法](#收集您的想法)
4.  [撰写功能请求！](#撰写您的功能请求！)

### 核查需求

我们希望允许每一个想法进入此代码库！遗憾的是，我们只是人类，所以对于要实现的要求，我们制定了一些准则。

以下是不同类别的项目准则：

- [Blockly core](/guides/contribute.html)
- [Plugins](/guides/contribute/samples/plugin_overview.html#第一方标准)
- 示例：展示如何仅使用一个或两个 Blockly 功能。
- 代码实验室：展示如何完成单个任务或实现单个行为。

但这些并不是硬性规定。 它们只是为了让您在花时间构建您的功能请求之前了解我们正在寻找什么。

如果您不确定某些内容是否合适，请尝试将其发布到我们的 [开发者论坛](https://groups.google.com/forum/#!forum/blockly)。 请记住，即使您的想法没有被接受，我们仍然希望您将其构建为第三方插件或教程！

### 收集您的想法

在继续提交之前，您的想法不需要用金属丝和图表 100% 充实，但您应该对自己要寻找的内容有一个明确的想法。 在开始写作之前，这些是一些需要思考的好问题：

- 为什么我需要这个功能？
- 这个功能能解决问题吗？
- 此功能的目标受众是谁？
- 为什么这个功能为他们服务？
- 有哪些替代方案可以达到同样的目的？

一旦你弄清楚了这些事情，你将获得一个好的功能请求！

### 撰写您的功能请求！

现在您已准备好编写您的功能请求。选择您的存储库：

- [Blockly core](https://github.com/google/blockly/issues/new?assignees=&labels=type%3A+feature+request%2C+triage&template=feature_request.md)
- [Blockly-samples](https://github.com/google/blockly-samples/issues/new?assignees=&labels=type%3A+feature+request%2C+triage&template=feature_request.md)

请务必填写 issue 模板的所有部分，即使是此处未详细说明的部分。

感谢您有兴趣提交功能请求，祝您写作愉快！

### 后续操作

- 您的功能请求会自动分类。
- Blockly 团队的值班成员会进行核实，并可能会提出澄清性问题。他们还会添加标签，让我们的 bug 井然有序。
- 该功能可能会标有 "Help Wanted" 字样，在这种情况下，您可以声领该功能并开始处理。
- 该功能可分配给 Blockly 团队成员以供实现。
- 您可以根据需要将功能请求从 Blockly core 移至 blockly-samples（或相反的方向）。
- 功能请求可能会关闭，在这种情况下，您仍然可以选择将其作为第三方插件实现。
