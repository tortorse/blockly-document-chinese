# 代码评审流程

### 目标

我们的评审流程包含多个目标：

- 在功能和可读性方面都**确保实现高质量的代码**。
- **发现 bug**，因为会发生错误。
- **保持一致的风格**，以便在代码库的任何部分轻松开始工作。

无论是由社区贡献者还是 Blockly 团队成员编写，放入 [blockly-samples](https://www.github.com/google/blockly-samples) 和 [core Blockly](https://www.github.com/google/blockly) 的所有代码都会经过评审。

作为评审者，我们的目标是与您合作，帮助您尽可能改善所做更改。 作为贡献者，请您与我们交流，通过评审并合并您的拉取请求。

# 流程

PR 评审流程分为几个阶段：

1.  [分配](#分配)
2.  [反馈](#反馈)
3.  [讨论](#讨论)
4.  [修订](#修订)
5.  [复核](#复核)
6.  [合并！](#合并)

## 分配

拉取请求传入时，Blockly 团队的值班成员会分配评审者。

评审人员是系统根据专业知识挑选和均匀分配工作负载的。

分配评审者可能需要几天时间，而获得评审可能需要几天时间。不用担心，这是正常现象。

## 反馈

在反馈阶段，评审者会针对您的 PR 提出更改建议。 这可能很简单，可让您的代码符合 [Google JavaScript 风格指南](https://google.github.io/styleguide/jsguide.html)。 或者，也可能是大型任务，例如要求您重新整理函数定义。

我们鼓励评审者使用 [GitHub 的代码评审](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/reviewing-proposed-changes-in-a-pull-request#starting-a-review)（而不是逐一评审），以便只收到一条通知，而不是多条通知。

## 讨论

在讨论阶段，您有机会对反馈进行回复。也许其中一条评审评论不明确：现在是您澄清理由的机会。或者，虽然评审者提出了更改请求，但您认为更改会产生影响：现在是您寻求妥协的机会。

:::tip
**注意**：为实现上述目标，双方需要本着 **协作** 的精神展开讨论。我们的目标不是“谁胜谁负”，而是让双方都引以为傲。
:::

## 修订

在修改阶段，您可以更改 PR。这些修改通常是评审人员在反馈阶段说过的内容。

完成修订后，加上 [tag](https://help.github.com/zh/github/writing-on-github/basic-writing-and-formatting-syntax#mentioning-people-and-teams) 以提醒评审人员再看一眼是比较有益的行为。

:::tip
**注意**：讨论和修订可能会同时进行。
:::

## 复核

After the revision phase your reviewer has another chance to give [feedback](/guides/contribute/get-started/pr_review_process#feedback), and the process starts from the beginning.

Often a second review is simple and focuses on nits such as punctuation and code style. But sometimes a second review can be quite big. Your first reviewer may even ask someone else to take a look, to get a fresh perspective.

在修订阶段结束后，评审者将有机会再次提供 [反馈](#反馈)，并且评审流程会从头开始。

通常，第二次评审非常简单，而且侧重于一些细枝末节（例如标点符号和代码样式）。但有时，第二次评审可能会变得相当大。您的第一位评审者甚至可能会让其他人来看看，以便获得新的视角。

## 合并!

The merge phase is your chance to **celebrate**. You've created a change, discussed and revised it, and finally gotten it merged! This is a grand achievement that many people never start, let alone complete!

Thank you for all of your hard work to make Blockly better. And congratulations!

合并阶段让您有机会 **庆祝** 一下。您创建了一项更改、讨论并进行了修订，最后将其合并！这是一项了不起的成就，许多人从未开始，更不用说完成了！

感谢您付出辛勤努力来改进 Blockly。恭喜！
