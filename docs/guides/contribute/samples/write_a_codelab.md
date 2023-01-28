# 编写优秀的 Codelab

## 简介

 Codelab 是以 Markdown 语法编写的互动式教程。我们将在 [blocklycodelabs.dev](https://www.blocklycodelabs.dev) 上发布我们的 Codelab。此 Codelab 会混合使用自然语言、代码示例和屏幕截图，打造更有趣的教程体验。 Codelab 的目标是让用户跟随它们进行操作，并在他们阅读时运行代码。

编写 Codelab 是为社区做贡献的好方法。通过这种方法，您可以分享您的知识，让下一位遇到同样问题的开发者更轻松地生活。

### 是何造就了出色的 Codelab?

出色的 Codelab 内容重点突出且易读。这样会明确地告知用户他们会构建什么以及要学习什么，并且会引导用户编写和理解代码来完成特定的任务。

### 过程

如果您有关于 Codelab 的想法，可以通过在 blockly-samples 代码库中发出 [功能请求](/guides/contribute/get-started/write_a_good_issue#功能请求) 来告知我们。添加您要教授的内容以及您将在此 Codelab 中构建的内容说明。我们将讨论并完善您的想法。 然后，您可以编写代码并提交拉取请求。通过审核后，Blockly 团队成员会发布该文件。

## 写作提示

本页的其余部分包含一组提示和问题，可指导您编写一个 Codelab。

请参阅 [技术文案撰写](https://developers.google.com/tech-writing/one) 快速了解技术写作。

### 受众

- 目标读者是谁？
- 关于使用 Blockly，他们知道些什么？
- 他们想要学习什么？

### 设置

- 用户运行您的代码至少需要设置什么？

如果有帮助，您可以在 `examples` 目录中发布 [起始代码](https://github.com/google/blockly-samples/tree/master/examples/context-menu-codelab/starter-code) 和 [已完成的代码](https://github.com/google/blockly-samples/tree/master/examples/context-menu-codelab/complete-code)。

### 结构

就像撰写文案一样，我们先介绍大纲。对于大多数 Codelab 而言，这是一个很好的结构：

- 简介
  - 学习内容
  - 您将构建的内容
  - 须知事项
  - 设置说明
- 第 1 步：\[在此处输入标题\]
  - 说明/动机
  - 代码示例
  - 预期结果
  - （可选）更多说明
- ……
- 第 10 步：\[在此处输入标题\]
- 摘要
  - 所学内容
  - 构建内容
  - 其他资源
  - 已完成代码的链接（如果有）

虽然您可以拥有超过 10 个步骤，但如果您达到 20 个步骤，则应考虑将其拆分为 2 个 Codelab。

### 写作风格

- 采用对话式写作风格。
- 使用标题让内容组织更清晰。
- 使用项目符号列表拆分文本墙。
- 使用图片和 GIF！

### 代码风格

- 您可以使用 ES5、ES6 或 TypeScript 编写代码，但要一开始就告知读者。
- 遵循 [Google 风格指南](https://google.github.io/styleguide/jsguide.html)
