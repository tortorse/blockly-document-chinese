# 添加第一方插件

详细了解 [插件](/guides/contribute/samples/plugin_overview.html)

# 流程

插件需要经历四个阶段：[建议](#建议)、[讨论](#讨论)、[实现](#实现) 和 [发布](#发布)。

## 建议

一个插件从**建议**开始。您可以通过使用 [功能请求](https://github.com/google/blockly-samples/issues/new?assignees=&labels=type%3A+feature+request%2C+triage&template=feature_request.md) 模板创建新 issue 来建议插件。

详细了解请阅读 [如何撰写功能请求](/guides/contribute/get-started/write_a_good_issue.html#功能请求)

除了基本的功能请求信息之外，插件建议应包含以下内容：

- 插件将公开的 API。
- 需要在核心 Blockly 中添加或更改的 API 以支持插件。
- 屏幕截图、GIF 或原型（如果插件包含界面功能）。
- 解释为何应将其用作第一方插件而不是第三方插件。

Blockly 团队会在收到建议时进行审核，并关闭 issue 或添加 [status: discussion](https://github.com/google/blockly-samples/labels/status%3A%20implementation) 标签。

## 讨论

接下来，插件将进入 **讨论** 阶段。此阶段包括：

- 阐明所需功能。
- 阐明插件的 API。
- 实施规划。
- 测试规划。
- 讨论核心 Blockly 中的 API 变更。
- 将大型插件分解为实现步骤。
- 插件的命名，需基于我们的 [命名规则](/guides/contribute/samples/naming.html)。
- 确认满足所有第一方规范。

此讨论一般在 GitHub issue 上发起。插件的范围越小，讨论阶段的速度就越快。较大的插件可能会吸引社区关注并就正确的解决方案积极发表意见。如果你的 issue 涉及上述情况 ，那么恭喜您！您找到了大家关心的东西

我们的目标是在讨论阶段结束时做出所有主要设计决策，并且有一个清晰的实现步骤列表。两者应记录在对该 issue 的评论中。

在讨论过程中，我们可能会判定某个插件应为第三方插件，且不在 `@blockly` 范围内发布。在这种情况下，我们将说明原因并关闭 issue。

讨论结束后，Blockly 团队成员会为 issue 添加 [status: Implementation](https://github.com/google/blockly-samples/labels/status%3A%20implementation)（状态：实现）标签。

## 实现

**实现**步骤包括：

- 运行 `npx @blockly/create-package`，通过模板设置插件及其目录结构。
- 实现插件的核心逻辑。
- 根据需要实现用户界面。
- 使用 mocha 测试插件。
- 为插件编写文档，包括 `README`。

如果插件的 issue 带有 [status: Implementation](https://github.com/google/blockly-samples/labels/status%3A%20implementation) 标签，则表明该 issue 已准备好实现或正在积极实现。为避免重复劳动，任何感兴趣的用户应针对该 issue 发表评论，并询问该 issue 是否仍可进行贡献。

实现可以由多个贡献者并行完成。您可以在自己的分支上协作实现插件，也可以通过针对此代码库的拉取请求来实现。如果您希望协作使用此代码库中的插件，请让 Blockly 团队为您创建一个功能分支。

处于构建初期的插件无法发布。

## 发布

最后，**发布**。Blockly 团队使用 [Lerna](https://lerna.js.org/) 管理所有插件的版本控制和发布。

每个星期四，Blockly 团队的成员都会使用 Lerna 来检查所有已发布插件中的更改，并重新发布所有已更改的插件。如果您需要更快地发布更改，请在拉取请求中加以记录。

尚未准备好发布的插件应在其 `package.json` 中标记为 `private`。如果插件依赖于 [core Blockly](https://github.com/google/blockly) 中尚未发布的更改，则可能会发生这种情况。Core Blockly 发布在每个季度的最后一周（每三个月一次）。