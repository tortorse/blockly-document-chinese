# Blockly 简介

Blockly是一个将可视代码编辑器添加到Web和移动应用程序的库。 Blockly 编辑器使用互锁的图形块来表示代码概念，如变量，逻辑表达式，循环等。它使得用户可以不必关注语法细节就能直接按照编程原则进行编程。

::: tip 提示
Blockly 适用于开发人员。 用 Blockly 创建的应用程序适用于学生。 如果您是在使用教育性应用程序而不是构建它们，请查看这些 [计算机科学学习机会](https://www.google.com/edu/resources/computerscience/learning/)。
:::

## 创建一个 Blokcly 应用程序

从用户的角度来看，Blockly 是一种直观的可视化代码构建方式。从开发人员的角度来看，Blockly是一个现成的用户界面，用于创建可视化语言，从而为用户生成正确的代码。 Blockly 可以将块导出为多种编程语言，包括以下流行的选项：

- JavaScript
- Python
- PHP
- Lua
- Dart

以下是构建 Blockly 应用程序的高层级细分：
1.  **集成 Blockly 编辑器**。 最简单的 Blockly 编辑器包含一个用于存储块类型的工具箱和一个用于排列块的工作空间。 

2.  **创建您的应用程序块**。 在应用程序中安装了 Blockly 后，您需要为用户创建用于编码的块，然后将其添加到您的 Blockly 工具箱中。

3.  **了解如何创建自定义块概述**。 构建应用程序的其余部分。 Blockly 本身就是一种生成代码的方法。 您的应用的核心是决定如何处理该代码。 

4.  **为Blockly做出贡献**。 如果您想让人们知道您使用Blockly构建应用程序，可以从贡献页面获取Built on Blockly徽章。

## Blockly的优势和其他选择

在越来越丰富的可视化编程环境中，Blockly仅仅是其中的一个，下面列举几个Blockly的优势：

- **可导出代码**。用户可以将基于块编写的程序转换成通用编程语言，并平滑过渡到基于文本的编程。

- **开源**。关于Blockly的一切都是开放的：您可以用您自己的方式修改它，并在您自己的网站中使用它。

- **精简**。 Blockly不仅仅是玩具，您可以用它实现复杂的编程任务，例如在单个块中计算标准偏差。

- **国际化**。 Blockly已被翻译成40多种语言，包括阿拉伯语和希伯来语的从右到左的版本。

但是即便有上述这些优点，Blockly依然不是所有应用程序的解决方案。以下是一些您可能会发现有用的其他可视化编辑器：
- [Scratch Blocks](https://scratch.mit.edu/developers)：基于 Blockly 代码库并由麻省理工学院 Scratch 团队的设计人员设计，Scratch Blocks提供了一种适合青少年的简化编程模型。

- [PXT](https://github.com/Microsoft/pxt)：为 Microsoft MakeCode 编辑器提供支持的可视化和基于文本的编程环境。 PXT将Blocks，TypeScript，模拟器和编译器捆绑在一个库中。

- [Droplet](https://github.com/PencilCode/droplet)：为 Pencil Code 提供支持的图形编程编辑器，其独特之处在于能够将代码转换为块。

- [Snap](https://github.com/jmoenig/Snap--Build-Your-Own-Blocks)：一种 Scratch 风格的图形编程语言，它不是一个库，而是一个带有集成执行环境的完整应用程序。



