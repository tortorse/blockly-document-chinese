# 块的解剖

本文介绍一个 Blockly 块由哪些部分组成，以及这些部分如何协同工作。

## 连接

**连接**用于定义块能接到哪里，以及能和什么类型的块连接。

::: tip 术语说明
在 Blockly 语境里，连接通常指连接器本身，类似插头或插槽。把两个块连接起来，本质上是把它们的连接器接合在一起。
:::

连接有四种：

| 连接类型 | 示意 |
| --- | --- |
| 输出连接 | ![输出连接](/static/blockly/images/connections/output-connection.png) |
| 输入连接 | ![输入连接](/static/blockly/images/connections/input-connection.png) |
| 上一个连接 | ![上一个连接](/static/blockly/images/connections/previous-connection.png) |
| 下一个连接 | ![下一个连接](/static/blockly/images/connections/next-connection.png) |

输出连接与输入连接配对；下一个连接与上一个连接配对。  
你还可以用[连接检查](/guides/create-custom-blocks/type-checks)进一步限制可连接关系。

连接形状也可以通过自定义渲染能力进行扩展，当前可先参考[扩展和混入](/guides/create-custom-blocks/extensions)。

### 顶层连接

块有三种顶层连接，这三种都不是强制的。

一个块可以有一个输出连接，位于块的前缘，常用来把该块表达的值传给其他块。  
带输出连接的块通常称为**值块**。

![输出连接示例](/static/blockly/images/block-anatomy/output-connection.png)

一个块也可以在顶部有上一个连接、底部有下一个连接，从而纵向堆叠为语句序列。  
没有输出连接的块通常称为**语句块**，并且常同时具有上一个连接和下一个连接。

![上下连接示例](/static/blockly/images/block-anatomy/prev-next-connection.png)

## 字段

**字段**决定了块里大部分界面元素，包括文本标签、下拉菜单、复选框、图片，以及字符串和数字等字面量输入。

![字段示例](/static/blockly/images/block-anatomy/loop.png)

Blockly 提供多种[内置字段](/guides/create-custom-blocks/fields/built-in-fields/overview)，也支持[自定义字段](/guides/create-custom-blocks/fields/customizing-fields/overview)。  
更多见[字段总览](/guides/create-custom-blocks/fields/overview)。

## 输入

**输入**是字段和连接的容器。块是通过把一个或多个输入按行渲染出来构成的。

::: tip 术语说明
输入在 Blockly 中有多种含义。本文中的输入，专指字段和连接的容器。
:::

输入有四类，全部都能放字段，其中两类带连接：

| 输入类型 | 连接类型 | 示意 |
| --- | --- | --- |
| 虚拟输入 | 无 | ![虚拟输入](/static/blockly/images/connections/dummy-input.png) |
| 换行输入 | 无 | ![换行输入](/static/blockly/images/connections/dummy-input.png) |
| 值输入 | 输入连接 | ![值输入](/static/blockly/images/connections/input-connection.png) |
| 语句输入 | 下一个连接 | ![语句输入](/static/blockly/images/connections/statement-input.png) |

你也可以扩展输入能力，当前可先参考[输入总览](/guides/create-custom-blocks/inputs/overview)。  
如果你要定义块中的输入、连接和字段，当前可先参考[JSON 和 JavaScript](/guides/create-custom-blocks/define/json-and-js)。

### 虚拟输入

虚拟输入只承载字段，不带连接。  
例如下图的数字块，只有一个虚拟输入，里面是一个数字字段。

![虚拟输入简单示例](/static/blockly/images/block-anatomy/dummy-input-simple.png)

更复杂一点的加法块，也可以由一个虚拟输入承载三个字段：

![一个输入三个字段](/static/blockly/images/block-anatomy/dummy-input-1-3.png)

也可以拆成三个虚拟输入，每个输入一个字段：

![三个输入各一个字段](/static/blockly/images/block-anatomy/dummy-input-3-1.png)

### 换行输入

Blockly 会根据启发式规则决定输入是同一行还是分行渲染。  
如果你希望后续输入一定换到新行，可以把前一个输入设为换行输入。

换行输入和虚拟输入一样可以放字段，但不带连接。  
下图中，第一个输入是换行输入，强制后面的虚拟输入在新行显示。

![换行输入示例](/static/blockly/images/block-anatomy/end-of-row-inputs.png)

### 值输入

字段可承载的数据类型有限。比如数字字段只能填数字。  
如果你希望位置上能接入“任意返回值的块”，应使用值输入而不是普通字段。

值输入可包含零个或多个字段，并以输入连接结尾。  
下图的加法块把数字字段改成了两个值输入，第一个没有字段，第二个带一个标签字段。

![值输入示例](/static/blockly/images/block-anatomy/value-inputs-addition.png)

### 语句输入

语句输入可包含零个或多个字段，并以下一个连接结尾。  
这个连接允许在当前块内部嵌套一串语句块。

![语句输入示例](/static/blockly/images/block-anatomy/statement-input-repeat.png)

语句输入始终独占一行。下图里第一行是值输入，后两行是语句输入。

![语句输入分行示例](/static/blockly/images/block-anatomy/statement-input-ite.png)

### 内联与外部输入

输入可以渲染为**内联**或**外部**。  
这会影响值输入连接器是在块内部显示还是在外缘显示，也会影响多个输入是否同排。

![内联与外部输入对比](/static/blockly/images/set-inputs-inline.png)

创建自定义块时，你可以显式指定，也可以交给 Blockly 自动决定。

### 动手试试

学习输入、字段、连接最直接的方式，是在[Blockly 开发者工具](https://raspberrypifoundation.github.io/blockly-samples/examples/developer-tools/index.html)里实际搭块，并切换 `inputs` 的 `automatic`、`external`、`inline` 选项观察差异。

## 图标

除输入、连接、字段外，块还能带一个或多个**图标**，例如警告图标、块注释图标、变形器图标。

![图标示例](/static/blockly/images/block-anatomy/comment-icon.png)

更多可先参考[扩展和混入](/guides/create-custom-blocks/extensions)。

## 块与 JavaScript 对象

块、输入、连接、字段、图标本质上都是 JavaScript 对象。

| Blockly 组件 | 基类 | 子类示例 |
| --- | --- | --- |
| 块 | `Block` | `BlockSvg` |
| 输入 | `Input` | `DummyInput` |
| 输入 | `Input` | `EndRowInput` |
| 输入 | `Input` | `ValueInput` |
| 输入 | `Input` | `StatementInput` |
| 输入 | `Input` | 自定义输入 |
| 连接 | `Connection` | `RenderedConnection` |
| 字段 | `Field` | `FieldTextInput` |
| 字段 | `Field` | `FieldNumber` |
| 字段 | `Field` | `FieldLabel` |
| 字段 | `Field` | 自定义字段 |
| 图标 | `Icon` | `CommentIcon` |
| 图标 | `Icon` | `MutatorIcon` |
| 图标 | `Icon` | `WarningIcon` |
| 图标 | `Icon` | 自定义图标 |

这些对象在一个块内部形成树状结构。理解图形外观与对象树的对应关系，有助于编写程序化操作块的代码。  
例如 `controls_for`：

![controls_for 块示意](/static/blockly/images/block-anatomy/controls-for.png)

可以对应为下面的对象树：

```javascript
// <Object> 表示某个对象实例。
{                                   // Block
  nextConnection: <Connection>,     // ConnectionType NEXT_STATEMENT
  outputConnection: null,
  previousConnection: <Connection>, // ConnectionType PREVIOUS_STATEMENT
  inputList: [                      // 当前块中的 Input 数组
    {                               // ValueInput
      connection: <Connection>,     // ConnectionType INPUT_VALUE
      fieldRow: [                   // 当前 Input 中的字段数组
        <FieldLabel>,               // 'count with'
        <FieldVariable>,            // i
        <FieldLabel>,               // 'from'
      ],
    },
    {                               // ValueInput
      connection: <Connection>,     // ConnectionType INPUT_VALUE
      fieldRow: [
        <FieldLabel>,               // 'to'
      ],
    },
    {                               // ValueInput
      connection: <Connection>,     // ConnectionType INPUT_VALUE
      fieldRow: [
        <FieldLabel>,               // 'by'
      ],
    },
    {                               // StatementInput
      connection: <Connection>,     // ConnectionType NEXT_STATEMENT
      fieldRow: [
        <FieldLabel>,               // 'do'
      ],
    },
  ],
}
```
