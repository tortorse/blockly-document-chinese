<!--
 * @Date: 2021-04-07 16:05:21
 * @LastEditors: tortorse
 * @LastEditTime: 2021-10-18 13:24:16
 * @FilePath: \blockly-document-chinese\docs\guides\plugins\overview.md
-->
# 插件

## 介绍

插件是一段独立的代码，可以为 Blockly 添加功能。插件可以添加字段、定义主题、创建渲染器等等。

插件的目标用户是通过 npm 找到并使用插件的开发者。有关构建插件的更多信息，您还可以观看我们的 [2021 如何构建插件演讲](https://www.youtube.com/watch?v=cZlZrTk2aQU&list=PLSIUOFhnxEiCjoIwJ0jAdwpTZET73CK7d&index=7) 和我们的 [2021 插件概述演讲](https://www.youtube.com/watch?v=rg-V0w7UZFc&list=PLSIUOFhnxEiCjoIwJ0jAdwpTZET73CK7d&index=3)。

## 第一方与第三方

在 [blockly-samples](https://github.com/google/blockly-samples) 存储库中定义的插件是第一方插件，这意味着它们由 Blockly 团队支持，并发布在 npm 的 @blockly 域内。

超赞的第一方插件：

- 有明显的用例

- 是通用的

- 稳定

- 易于使用

第三方插件独立维护和发布。第三方插件可能更复杂、更具实验性或更有针对性。

例如，用于设置电机速度的字段可用于许多机器人项目。另一方面，用于编辑由您的数据库架构定义的特定对象的字段作为第三方插件更好。

## 第一方标准

第一方插件必须满足以下要求：

- 适用于所有主要平台，除非 Blockly 团队授予豁免。

  - Chrome、火狐、Safari、Edge

- 有一个愿意在第一年处理错误的作者。

- 不会对 Blockly 进行猴子补丁。

- 具有明确定义和记录的 API。

- 不从 Blockly 核心调用私有或包函数，除非 Blockly 团队授予豁免。
  
  - 允许在您定义的子类上覆盖包函数。

  - 如果您想要豁免，请在有关 blockly-samples 的 issue 中询问我们。

- 有测试。

::: tip 提示
准备好编写插件了吗？按照本指南了解 [如何添加插件](/guides/plugins/modify/contribute/add_a_plugin.html) 至 blockly-samples。
:::

## 寻找插件
- **在 GitHub 页面上** 浏览第一方插件的 [在线演示](https://google.github.io/blockly-samples/)。

- **在 npm 上** 搜索 @blockly 以查看 Blockly 团队发布的插件列表。

- **在 GitHub 上** 查看 blockly-samples 存储库中的 [插件目录](https://github.com/google/blockly-samples/tree/master/plugins)。每个插件都有一个描述其行为和预期用途的自述文件。

## 安装插件

1. 使用上述资源之一找到您要安装的插件，然后找到自述文件。

2. 按照自述文件中的任何安装说明进行操作。一般来说，你需要从 npm 安装插件，例如

    ```shell
    npm install @blockly/block-plus-minus --save
    ```

    并将其导入您的代码中，例如

    ```javascript
    import Blockly from 'blockly';
    import '@blockly/block-plus-minus';
    ```
3. 某些插件可能需要额外的步骤，例如初始化或注册插件。这些步骤将列在自述文件中。

#### 插件版本

blockly-samples 中的插件遵循 [语义版本控制](https://www.semver.org)，因此任何重大更改都将出现在新的主要版本中。任何依赖猴子补丁核心的新插件都将有一个主版本 0 来表示 [semver 规范](https://semver.org/#spec-item-4) 中所述的初始开发。

大多数插件包括主 `blockly` 包作为 peerDependency 而不是依赖。这是因为我们希望您已经在自己的应用程序中安装了 Blockly（使用插件而不使用 Blockly 是没有意义的），因此您可以自己管理 Blockly 的版本。但是，开发了许多插件以使用 Blockly 最新版本中的新 API，因此您确实需要了解版本要求。该插件 `package.json` 会告诉您哪个是与该插件兼容的 Blockly 的最低版本。如果插件更新为需要更新版本的 Blockly，例如为了利用全新的 API，插件的主要版本将增加，因为我们认为这是一个重大变化。

当您将插件添加到您的 `package.json` 时，默认是在版本之前包含一个插入符号，例如

```json
"@blockly/block-plus-minus": "^2.0.15"
```

这将让 npm 安装列出版本或更高版本的任何次要版本，因此版本 `2.0.20` 或 `2.1.0` 可以工作，但不能安装新的主要版本，例如 `3.0.1`. 当您更新到 Blockly 的新版本时，最好检查一下您的任何插件是否也可以更新到新的主要版本。

#### 不使用 npm 安装插件

或者，您可以克隆 `blockly-samples` 存储库并在本地引入文件，这与您克隆 Blockly 的方式类似。但是，我们鼓励您尽可能使用包管理器，因为它可以帮助您了解插件中的最新功能和错误修复。

使用此方法，您仍需要执行插件自述文件中列出的任何初始化或注册步骤。