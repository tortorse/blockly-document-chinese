# Issue 标签

标签是 GitHub 的一项超酷功能，可让您过滤 issue 和拉取请求。他们可以帮助您找到适合自己水平的趣味操作。

对于我们的代码库，为 issue 添加新标签完全由核心 Blockly 团队处理，以确保不会出错。

::: tip
**注意**：如需详细了解如何使用标签，请参阅 [筛选 issue 和拉取请求](https://help.github.com/en/github/managing-your-work-on-github/filtering-issues-and-pull-requests-by-labels)。
:::

### 大小

有些 issue 轻巧美观，而有些 issue 可能需要数周的时间才能战胜。这些标签有助于您了解某个 issue 可能需要耗费多少精力。

- **[Good first issue](https://github.com/google/blockly-samples/labels/good%20first%20issue)**：这些 issue 非常适合初次使用代码库的用户。所需时间不到半天，并且对代码库的要求有限。您可以立即着手解决这些 issue ，无需经过团队批准。

### 管辖区

处理广泛使用的代码库可能是一个敏感的过程，有些 issue 可能比其他 issue 更敏感。这些标签有助于您了解哪些 issue 有待改进，哪些 issue 需要避免。

- **[Help wanted](https://github.com/google/blockly-samples/labels/help%20wanted)**：这些 issue 专为贡献者提供。它们通常是核心团队认为有用的功能，但没有时间来实现。他们可能需要讨论或实施，因此请查看状态标签，了解需要执行的工作。这里非常适合寻找有趣的创意项目！
- **[Internal](https://github.com/google/blockly-samples/labels/internal)**：这些 issue 仅限核心团队成员使用。它们通常是敏感或复杂的 bug，需要进行特殊讨论。最好掌控这些 issue ，因为周围的情况可能会快速变化！
- **[Neither](https://github.com/google/blockly-samples/issues?q=is%3Aissue+is%3Aopen+-label%3A%22help+wanted%22+-label%3A%22internal%22)**：无标签的 issue 可由贡献者 _和_ 核心团队成员解决。如果您觉得某个未加标签的 issue 看起来很有趣，尽管动手去处理！

### 状态

某些 issue （尤其是功能请求）会经历几个不同的阶段，之后才会被视为“已解决”。这些标签会说明 issue 当前所处的阶段，以便您了解接下来需要做什么。

- **[Discussion](/guides/contribute/samples/add_a_plugin.html#讨论)**：这意味着在实现之前仍有需要解决的 issue 。如果您对此 issue 有任何想法，欢迎发表评论！我们一直在寻找更多反馈。
- **[Implementation](https://github.com/google/blockly-samples/labels/status%3A%20implementation)**：这些 issue 已经过充分讨论，已明确定义且已移至 [实现阶段](/guides/contribute/samples/add_a_plugin.html#实现)。他们正在等待实施，或者已经在实施。如果您有意研究其中一个 issue ，请仔细阅读整个 issue ，然后留言说明要处理哪个部分，接下来就深入了解一下！
- **[Neither](https://github.com/google/blockly-samples/issues?q=is%3Aissue+is%3Aopen+-label%3A%22status%3A+discussion%22+-label%3A%22status%3A+implementation%22+)**：没有标签的 issue 可能处于上述两种状态。如果您对如何实现该 issue 有任何想法，欢迎发表评论！或者，如果您想 _处理_ 该 issue ，最好先发表评论，了解是否可以进行处理。

### 类型

不同的 issue 需要不同的回应。有些只需修改几行代码，有些则需要大量设计和讨论。通过这些标签，您可以了解 issue 需要采取哪种操作。

- **[Bug](https://github.com/google/blockly-samples/labels/type%3A%20bug)**：这些 issue 记录了代码库的 issue 。它们通常要进行一些调试来诊断导致 issue 的原因，但有些稍稍调试即可轻松解决。如果您想深入研究代码是如何执行的，这些对您来说就是非常好的 issue 。您可以通过修正 bug 或进行深入了解来了解 issue ，并编写一份关于根本原因的清晰解释。
- **[Feature request](https://github.com/google/blockly-samples/labels/type%3A%20feature%20request)**：这些 issue 记录了某人想要添加的功能。这可以应用于整个代码库，也可以应用于单个项目。如果您更喜欢充实设计理念和添加新的功能，这可能最适合您。
- **[Question](https://github.com/google/blockly-samples/labels/type%3A%20question)**：这些 issue 记录了某人对代码库的 issue 。这些 issue 通常会重定向到 [开发者论坛](https://groups.google.com/forum/?hl=zh-cn#!forum/blockly)，但如果您看到自己能够提供帮助的 issue ，可随时加入并回复。

### 类别

此代码库包含几种不同类型的项目，以及几种不同的目标受众。如果您热衷于教程，或者喜欢处理插件，这些标签可以帮助您找到感兴趣的 issue 。

- **[Codelab](https://github.com/google/blockly-samples/labels/category%3A%20codelab)**：这些 issue 与 Blockly [Codelab](/guides/contribute/samples/repository_structure.html#代码实验室) 相关，这是一套交互式教程。
- **[Example](https://github.com/google/blockly-samples/labels/category%3A%20example)**：这些 issue 与 Blockly [示例](/guides/contribute/samples/repository_structure.html#例子) 有关，这是一个独立的演示版，展示了如何引入和扩展 Blockly。
- **[Plugin](https://github.com/google/blockly-samples/labels/category%3A%20plugin)**：这些 issue 与 Blockly [插件](/guides/contribute/samples/repository_structure.html#插件)（一组用于添加 Blockly 功能的扩展程序）相关。

### 项目

如果您想更加细化，还可以查看各个独立项目的标记。这些库通常是针对插件创建的，这类插件往往存在更多与其相关的 issue ，但也可能会为代码库和示例创建。如果您对特定项目感兴趣，这些标签可以帮助您查找与该项目相关的 issue 。

另请注意，我们会经常添加新项目，因此此列表可能会过时！ 如果您没有看到所关注项目的条目，请参阅 [完整标签列表](https://github.com/google/blockly-samples/labels)。

- **[开发者工具](https://github.com/google/blockly-samples/labels/%E2%9A%AA%20dev-tools)**：这些 issue 与 [dev tools](https://github.com/google/blockly-samples/tree/master/plugins/dev-tools) 软件包有关，后者是一个适用于 Blockly 扩展程序通用实用程序的库。
- **[日期字段](https://github.com/google/blockly-samples/labels/%E2%9A%AA%20field-date)**：这些 issue 与[日期字段](https://github.com/google/blockly-samples/tree/master/plugins/field-date)软件包相关，后者是一个使用 Google Closure 日期选择器的日期选择器字段。

### 其他

与所有事物一样，您也应该了解一些意外的情况。当您要解决某个 issue 时，这些标签可能没什么用，但它们仍然可以提供有用的信息。

- **[Triage](https://github.com/google/blockly-samples/labels/triage)**：核心团队尚未正确标记这些 issue 。与此标签有关的 issue 可能已包含另一个简单标签（如 [bug](https://github.com/google/blockly-samples/labels/type%3A%20bug) 或 [feature request](https://github.com/google/blockly-samples/labels/type%3A%20feature%20request)），但系统可能很快就会添加更多标签。
- **[Duplicate](https://github.com/google/blockly-samples/labels/duplicate)**：这些 issue 记录了已由其他 issue 涵盖的 issue 、请求或 issue 。通过该标签，您可以了解不应回复此 issue ，而应该回复原始 issue 。
