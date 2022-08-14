# 贡献样本

[Blockly 示例](https://github.com/google/blockly-samples)包含与 Blockly 相关的额外内容，这些内容不属于核心存储库，包括插件、代码实验室和示例代码。有关其中每一项的更多详细信息，请参阅 [代码仓结构](/guides/contribute/samples/repository_structure) 页面。

## 需要知道

以下是创建 PR 需要了解的有关块状样本的事实的快速概述。

- 工作分支是**master**，所有 PR 都应该针对 master。
- **`npm install`在 blockly-samples 的根级别运行**，而不是在单个插件级别运行。Blockly-samples 是一个 monorepo，这意味着它在同一个存储库中包含多个包，并且在根级别安装是使用 Lerna 管理 monorepo 的工作流程的一部分。
- 代码必须符合 Google 的[JavaScript 样式指南](https://google.github.io/styleguide/jsguide.html) 或 [TypeScript 样式指南](https://google.github.io/styleguide/tsguide.html) ，具体取决于所使用的语言。
- 在提交消息和拉取请求标题中使用 [常规提交。](/guides/contribute/get-started/commits)
- 任何新的代码文件都必须以 Apache License v2.0 为前缀：

  ```javascript
  /**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */
  ```

## 进行和验证更改

1.  在 blockly-samples 的根级别运行`npm install`以安装依赖项。
2.  在插件目录中运行`npm run start`以构建和启动运行插件测试页面的服务器。您可以使用此页面查看插件的现有行为，或者如果您要添加新插件，则需要将此页面设置为有用的测试页面，以便其他人可以看到您的插件的功能。有关更多信息，请参阅[操场](/guides/contribute/get-started/playground)页面。
3.  对插件的代码进行任何必要的更改。
4.  如果您让服务器保持运行，您的更改将自动加载。否则，重新启动服务器并验证插件是否按预期运行，并且控制台中没有错误或警告。
5.  运行`npm run build`并确保没有构建错误。
6.  `test/`在目录中编写自动 mocha 测试。
7.  运行`npm run test`以运行自动化测试。
8.  运行`npm run lint`并确保没有警告或错误。
9.  如果所有测试都通过了，您就可以使用您的更改打开针对 master 分支的 **PR**。
