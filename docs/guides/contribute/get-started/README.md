# 开始为 Blockly 做贡献

Blockly 是开源的，主要由一个小团队维护。我们欢迎核心团队以外的开发者做出贡献；没有我们的社区，我们无法构建每个请求的功能或修复每个报告的错误。本节包含可能对您有所帮助的一般指南，尤其是在您不熟悉开源开发的情况下。

有关在做出贡献之前应阅读的特定于 Blockly 的信息，请参阅 [贡献核心](/guides/contribute/core)和 [贡献示例](/guides/contribute/samples)部分。

## 哪个仓库？

**存储库**包含单个项目的所有文件。Blockly 有两个存储库：blockly core 和 blockly-samples。

**Blockly 核心**是 Blockly 库的存储库。如果您想以适用于库的所有用户的方式更改核心 Blockly 行为，请使用此存储库。

**Blockly 示例**是示例、插件和代码实验室的存储库。如果您想创建或修改插件，请使用此存储库；编写代码实验室；或创建或修改示例。

## 一步接一步

这些是您在进行更改时将遵循的一般步骤。

1.  [按照工具](/guides/contribute/get-started/development_tools) 部分中的链接**安装**Git 和 Node 。
2.  **分叉并克隆存储库。**[GitHub 有一个关于fork a repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository)的精彩教程 。要将其应用于块状，只需将 **octocat/Spoon-Knife**的每个实例替换为**google/blockly**或 **google/blockly-samples**，具体取决于您要在哪个存储库中工作。
3.  **同步你的分叉。**GitHub 也提供了 [同步 fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)的教程 。
4.  **查看主分支。**在块状核心中，这是`develop` 分支。在块状样本中，这是`master`分支。
5.  `npm install`通过在根目录中运行来**安装**依赖项和构建工具。
6.  `git checkout -b myBranchName`通过在终端中运行来**创建一个新分支。**这个名字应该可以帮助你记住你在做什么。
7.  **进行更改。**
8.  [按照核心](/guides/contribute/core)或 [示例](/guides/contribute/samples)指南 **验证您的更改**。
9.  使用**保存您的更改**`git commit -am "fix: My commit message"`。 阅读有关提交消息的更多信息。
10.  **使用.push 将您的更改推**送到 GitHub `git push origin myBranchName`。
11.  当您的代码准备就绪时，**打开一个拉取请求。**Blockly 团队的成员将审核您的更改，如果获得批准，将它们合并到 Blockly。如需更多信息，请参阅 [PR 审核流程](/guides/contribute/get-started/pr_review_process)。