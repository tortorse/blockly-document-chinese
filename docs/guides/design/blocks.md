# 块设计

多年来，Blockly 团队设计了许多自己的块，并帮助其他人设计他们的块。以下是他们学到的一些经验。

## 偏好高级块

在可能的情况下，应该采用更高级的方法，即使这会降低执行性能或灵活性。考虑这个 Apps Script 表达式：

```javascript
SpreadsheetApp.getActiveSheet().getDataRange().getValues()
```

在保留所有潜在功能的 1:1 映射下，上述表达式将使用四个块构建。但 Blockly 的目标是更高级的方法，会提供一个封装整个表达式的块。目标是针对 95% 的情况进行优化，即使这会使剩余 5% 的情况变得更困难。Blockly 的目的不是要替代基于文本的编程语言，而是帮助用户克服初始学习曲线，以便他们能够使用基于文本的编程语言。

_建议：不要盲目地将整个 API 转换为块_

## 考虑用户输入选择

![Three repeat blocks showing different ways to input a number: drop-down,numeric field, and value input.](/static/blockly/images/language03.png)

从用户获取参数有三种方式。下拉菜单是最受限制的，适用于简单的教程和练习。输入字段提供更多自由度，适用于更具创造性的活动。值块输入（通常带有阴影块）提供了计算值的机会（例如随机生成器），而不仅仅是静态值。

_建议：选择适合你的用户的输入方式。_

## 使用独立的条件和循环块

![Counterexample showing if/then and while blocks in the same category.](/static/blockly/images/language01.png)

对新用户来说，最难掌握的块是条件和循环。许多基于块的环境将这两种块都归入同一个"控制"类别，两种块具有相同的形状和颜色。这经常导致新用户混淆这两种块。Blockly 建议将条件和循环分别移到"逻辑"和"循环"类别中，每个类别使用不同的颜色。这清楚地表明，尽管形状相似，但这些是表现不同的独特概念。

_建议：将条件和循环块分开。_

## 处理可变数量的输入

某些块可能需要可变数量的输入。例如，一个对任意数字集合求和的加法块，或带有任意数量 elseif 子句的 if/elseif/else 块，或带有任意数量初始化元素的列表构造器。有几种策略，每种都有其优缺点。

a) 最简单的方法是让用户用较小的块组合成所需的块。例如，通过嵌套两个双数字加法块来实现三个数字相加。另一个例子是只提供 if/else 块，让用户通过嵌套来创建 elseif 条件。

![Nested addition blocks: 1 + (2 + 3).](/static/blockly/images/mutate-compound.png)

这种方法的优点是初始简单性（对用户和开发者都是如此）。缺点是在有大量嵌套的情况下，代码变得非常繁琐，用户难以阅读和维护。

b) 另一种方法是动态扩展块，使其末尾始终有一个空闲输入。同样，如果末尾有两个空闲输入，块会删除最后一个输入。这是 App Inventor 第一个版本使用的方法。

![Block that adds four value inputs, the last one of which is empty.](/static/blockly/images/mutate-extra.png)

App Inventor 的用户不喜欢自动增长的块，原因有几个。首先，总是有一个空闲输入，程序永远不会"完成"。其次，在堆栈中间插入元素很烦人，因为需要断开编辑点以下的所有元素然后重新连接。话虽如此，如果顺序不重要，而且用户可以接受程序中的空洞，这是一个非常方便的选择。

c) 为了解决空洞问题，一些开发者在块上添加 +/- 按钮来手动添加或删除输入。Open Roberta 使用两个这样的按钮来从底部添加或删除输入。其他开发者在每一行添加两个按钮，以便可以在堆栈中间进行插入和删除。还有一些开发者在每一行添加两个上/下按钮，以便可以重新排序堆栈。

![Block that adds three external value inputs and has plus and minus buttons to add or remove inputs.](/static/blockly/images/mutate-add-minus.png)

这种策略提供了从每个块两个按钮到每行四个按钮的一系列选择。一端是用户无法执行所需操作的风险，另一端是界面布满按钮，看起来像星际迷航企业号的舰桥。

d) 最灵活的方法是为块添加变形器气泡。这表现为一个打开该块配置对话框的单个按钮。可以随意添加、删除或重新排列元素。

![Block that adds three value inputs and has a mutator for adding or removing value inputs.](/static/blockly/images/mutate-bubble.png)

这种方法的缺点是变形器对新手用户来说不直观。引入变形器需要某种形式的指导。针对年龄较小儿童的基于 Blockly 的应用程序不应使用变形器。不过一旦掌握，它们对高级用户来说是非常宝贵的。

_建议：每种策略都有优缺点，选择适合你的用户的方案。_