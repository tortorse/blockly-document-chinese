# 为核心做贡献

Blockly 核心存储库包含运行任何基于 Blockly 的应用程序所需的代码[。](https://github.com/google/blockly)

## 需要知道

以下是创建 PR 需要了解的有关块状核心的事实的快速概述。

- 工作分支是**开发**，所有的 PR 都应该针对开发。
- 您必须使用请求的信息填写拉取请求模板。
- 代码必须符合 Google 的 [TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)。
- 在提交消息和拉取请求标题中使用 [常规提交](/guides/contribute/get-started/commits)。
- 用户可见的字符串必须在`/msg/messages.js`文件中，以便它们可以被翻译。世界上不到 6% 的人以英语为母语。
- 块上的文本通常应该全部小写（就像大多数编程语言中的关键字一样）。
- 保持向后兼容性。那里有\_很多\_Blockly 应用程序，不要破坏其他所有人。
- 任何新的代码文件都必须以 Apache License v2.0 为前缀：

  ```javascript
  /**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */
  ```

## 进行和验证更改

1.  运行`npm install`以安装依赖项。
2.  运行`npm run start`以启动运行 Playground 的服务器。您可以使用此页面来测试现有行为。有关更多信息，请参阅 [训练场](/guides/contribute/get-started/playground)页面。
3.  对代码进行任何必要的更改。
4.  如果您让服务器保持运行，请刷新以查看您的更改。否则，重新启动服务器并验证代码是否按预期运行，并且控制台中没有错误或警告。
5.  运行`npm run build`并确保没有构建错误。
6.  编写自动化测试。通常，这些将是 `tests/mocha`目录中的 mocha 测试，但我们可能会要求您提供其他类型的测试。
7.  运行`npm run test`以运行自动化测试。
8.  运行`npm run format`以格式化代码并自动修复一些 lint 问题。
9.  运行`npm run lint`并确保没有警告或错误。
10. 如果所有测试都通过了，你就可以打开一个 PR 反对用你的更改进行**开发**。
