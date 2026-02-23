# 退出复刻 Blockly

本文面向曾经复刻（fork）过 Blockly、并希望升级到较新 Blockly 版本且不再补丁核心库的开发者。这个过程看起来可能很重，但可以分步骤推进并逐步收敛风险。

## 理解“退出复刻”

使用主线 Blockly（mainline Blockly）意味着：

- 你使用的是近期发布的 Blockly 版本。
- 你的定制都基于 Blockly 公开 API。
- 你不再依赖 monkeypatching。

“退出复刻”就是把 fork 中的自定义功能，迁移到主线 API 可支持的实现方式。

## 简单退出复刻场景

下面是两个常见 fork 原因及回归主线的处理方式：

- **你创建了自定义 block 和代码生成器，但没有改 Blockly 核心代码**：  
  把自定义 block 和代码生成器从 Blockly 仓库移到你自己的应用代码中，然后就可以升级 Blockly 版本。
- **你在 Blockly 命名空间上加了自定义能力，但没有改 Blockly 核心代码**：  
  例如只在你应用里用到的自定义 field 或辅助方法。把这些代码迁移到应用自身代码库（不放在 Blockly 仓库内），然后就可以升级 Blockly 版本。

## 重度退出复刻场景

### 确认 fork 的功能改动

还有一类常见 fork 原因是：通过 patch Blockly 实现当时上游尚不具备的能力。如果你的 fork 已经明显滞后，所需能力可能已在插件（plugin）或 core 中支持。先梳理你在 fork 里新增了哪些功能，这会成为后续迁移路线图。

### 理解目标架构

当你已经识别出依赖 fork 专有 API 的功能后，建议逐项评估：

- 每个功能是否都能用 Blockly 公开 API 复现？
- 如果看起来不能，请通过论坛联系团队，或在 [GitHub](https://github.com/RaspberryPiFoundation/blockly/issues/new/choose) 提交 issue，说明你的场景。团队会评估是否补充对应 API。

### 选择退出复刻路径

开始落地新架构时，通常有两种主路径：

- **先升级 Blockly，再修复破坏点**：  
  你会立刻看到哪些位置需要改动，再结合你已知的自定义行为逐步修复。
- **先重构代码，将自定义功能与 Blockly 解耦**：  
  这要求你清晰区分“来自 fork 的功能”和“原生 Blockly 功能”。解耦完成后，再替换成最新 Blockly，最后处理剩余集成问题。

## 持续演进建议

作为后续开发约束，建议遵循：

- 一般不要向 Blockly 命名空间新增类。你可以通过注册机制挂载自定义 field 或其他可注册类，不必把代码放进 Blockly 仓库或 Blockly 命名空间。
- 不要依赖 Blockly 的构建工具来编译你自己的应用。Blockly 构建链不属于公开 API，未来变更可能直接破坏你的应用。应用构建应由你自己的工具链负责。

## 获取支持

如果你在退出复刻过程中遇到问题，可以在 [Blockly Forum](https://groups.google.com/g/blockly) 发帖，Blockly 团队会协助排查。
