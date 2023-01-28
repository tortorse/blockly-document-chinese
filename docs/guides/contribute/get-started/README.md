# 开始为 Blockly 做贡献

Blockly 是开源的，主要由一个小团队维护。我们欢迎核心团队以外的开发者做出贡献；没有我们的社区，我们无法构建每个请求的功能或修复每个报告的错误。本节包含可能对您有所帮助的一般指南，尤其是在您不熟悉开源开发的情况下。

有关在做出贡献之前应阅读的特定于 Blockly 的信息，请参阅 [贡献核心](/guides/contribute/core)和 [贡献示例](/guides/contribute/samples)部分。

## 哪个仓库？

**代码仓库** 包含单个项目的所有文件。Blockly 有两个代码仓库库：blockly core 和 blockly-samples。

**Blockly core** 是 Blockly 库的代码仓库。如果您想以适用于库的所有用户的方式更改核心 Blockly 行为，请使用此存储库。

**Blockly samples** 是示例、插件和 Codelab 的存储库。如果您想创建或修改插件，请使用此代码仓库；编写 Codelab；或创建或修改示例。

## 一步接一步

这些是您在进行更改时将遵循的一般步骤。

1.  按照 [工具](/guides/contribute/get-started/development_tools.html) 部分中的链接 **安装** Git 和 Node 。
2.  **复刻并克隆代码仓库。** GitHub 有一个关于 [复刻代码仓库](https://help.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository)的精彩教程 。要将其应用于 Blockly，只需将 **octocat/Spoon-Knife** 的每个实例替换为 **google/blockly** 或 **google/blockly-samples**，具体取决于您要在哪个代码仓库中工作。
3.  **同步你的复刻** GitHub 也提供了 [同步复刻](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork) 的教程 。
4.  **查看主分支** 在 Blockly core 中，是 `develop` 分支。在 blockly-samples 中，是 `master`分支。
5.  通过在根目录中运行 `npm install`来 **安装** 依赖项和构建工具。
6.  通过在终端中运行 `git checkout -b myBranchName`来 **创建一个新分支**。这个分支名应该可以帮助你记住你在做什么。
7.  **进行更改。**
8.  按照 [core](/guides/contribute/core) 或 [示例](/guides/contribute/samples) 指南 **验证您的更改**。
9.  使用 `git commit -am "fix: My commit message"` **保存您的更改**。 [阅读有关提交消息的更多信息](/guides/contribute/get-started/commits.html)。
10. 使用 `git push origin myBranchName` **推送您的更改** 至 GitHub。
11. 当您的代码准备就绪时，**开启一个拉取请求** Blockly 团队的成员将审核您的更改，如果获得批准，将它们合并到 Blockly。如需更多信息，请参阅 [PR 审核流程](/guides/contribute/get-started/pr_review_process.html)。
