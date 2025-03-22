# 基于块与基于文本的语言对比

基于块的语言与基于文本的语言在许多方面都有所不同，主要是因为它们是为新手用户设计的。以下是在设计你自己的基于块的语言时需要考虑的事项列表。

## 使用基于 1 的列表

![在字符串中选择特定索引处的字母的块，其中使用 1 表示第一个字母。](/static/blockly/images/language02.png)

新手程序员第一次遇到基于零的列表时反应很差。因此，Blockly 效仿 Lua 和 Lambda Moo，使列表和字符串索引基于 1。

对于 Blockly 的更高级用途，支持基于零的列表以使向文本过渡更容易。对于年轻或更新手的用户，仍然建议使用基于 1 的索引。

_建议：1 是第一个数字。_

## 支持宽松的命名规则

![带有不区分大小写的变量名 location_x（小写 x）和 location_X（大写 X）的块。](/static/blockly/images/mistakes09.png)

新手程序员不会想到 `location_X` 和 `location_x` 是不同的变量。因此，Blockly 效仿 BASIC 和 HTML，使变量和函数不区分大小写。Scratch 使用了一种更微妙的方法（如右图所示），变量名区分大小写，但相等性检查不区分大小写。

此外，Blockly 不要求变量和函数遵循典型的 `[_A-Za-z][_A-Za-z0-9]*` 模式。如果想将变量命名为 `List of zip codes` 或 `רשימת מיקודים`，这都是完全可以的。

_建议：忽略大小写，允许任何名称。_

## 使所有变量全局化

新手程序员也难以理解作用域。因此，Blockly 效仿 Scratch，使所有变量成为全局变量。全局变量的唯一缺点是递归更加棘手（必须将变量压入和弹出列表），但这是超出 Blockly 目标用户范围的编程技术。

_建议：作用域超出范围，留待以后。_

## 考虑如何处理可选的返回值

在基于文本的编程中，许多函数执行操作后会返回一个值。这个返回值可能会被使用，也可能不会被使用。一个例子是栈的 `pop()` 函数。Pop 可能被调用来获取并移除最后一个元素，也可能仅被调用来移除最后一个元素而忽略返回值。

```javascript
var last = stack.pop();  // 获取并移除最后一个元素
stack.pop();  // 仅移除最后一个元素
```

基于块的语言通常不擅长忽略返回值。值块必须插入到接受该值的某个位置。有几种策略可以处理这个问题。

a) 绕过问题。大多数基于块的语言设计时会避免这些情况。例如，Scratch 没有任何同时具有副作用和返回值的块。

b) 提供两个块。如果工具箱中的空间不是问题，一个简单的解决方案是为每种类型的块提供两个版本，一个有返回值，一个没有返回值。缺点是这可能会导致工具箱混乱，有许多几乎相同的块。

![A value block that removes and returns the last item in a list and a statement block that just removes the last item in a last.](/static/blockly/images/return1.png)

c) 变形一个块。使用下拉菜单、复选框或其他控件，允许用户选择是否有返回值。然后块根据其选项改变形状。这可以在 Blockly 的列表访问块中看到示例。

![Block that changes shape from a value block to a statement block when removing the last item in a list, depending on whether it also returns that item.](/static/blockly/images/return3.png)

d) 吞掉值。App Inventor 的第一个版本创建了一个特殊的管道块，可以吞掉任何连接的值。用户不理解这个概念，App Inventor 的第二个版本移除了管道块，转而建议用户简单地将值赋给一个临时变量。

![Blocks showing two different ways to ignore the output of a block. The first uses a pipe block to "eat" the value and the second sets the value of a variable named "junk".](/static/blockly/images/return2.png)

_建议：每种策略都有优缺点，选择适合你的用户的方案。_

## ## 生成可读的代码

高级 Blockly 用户应该能够查看生成的代码（JavaScript、Python、PHP、Lua、Dart 等）并立即认出他们编写的程序。这意味着需要额外努力使这些机器生成的代码保持可读性。多余的括号、数字变量、压缩的空白和冗长的代码模板都会妨碍生成优雅的代码。生成的代码应该包含注释，并且应该符合 [Google 的风格指南](https://github.com/google/styleguide/blob/gh-pages/README.md).

_建议：为你生成的代码感到自豪。向用户展示它。_

## 接受语言之间的差异

对清晰代码的追求的一个副作用是，Blockly 的行为在很大程度上是根据交叉编译语言的行为来定义的。最常见的输出语言是 JavaScript，但如果 Blockly 要交叉编译到不同的语言，不应该做出不合理的尝试来在两种语言之间保持完全相同的行为。例如，在 JavaScript 中空字符串是 false，而在 Lua 中是 true。无论目标语言是什么，为 Blockly 的代码定义单一的行为模式会导致不可维护的代码，看起来就像是 GWT 编译器生成的。

_建议：Blockly 不是一种语言，允许现有语言影响行为。_