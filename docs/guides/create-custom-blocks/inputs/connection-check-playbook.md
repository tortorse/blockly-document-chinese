# 连接检查实践手册

本文给出一组使用[连接检查](/guides/create-custom-blocks/inputs/connection-checks)的常见模式。

## 值连接示例

为输入与输出定义连接检查时，通常可把检查值视为“类型”。

- 输入连接的检查应覆盖它可接受的所有“类型”
- 输出连接的检查应只表达它实际“返回”的类型

### 接受单一类型

最基础场景是块只“接受”或“返回”一种类型，此时把该类型写入对应连接检查即可。

![值块接受单一类型](/static/blockly/images/connection-checks/values-single.jpg)

### 接受多种类型

若块需要“接受”多种类型，应把每种可接受类型都写入输入连接检查。

![值块接受多种类型](/static/blockly/images/connection-checks/values-multiple.jpg)

按约定，如果一个输出在某些场景下可被多处接受（例如数字有时可当字符串用），应让输出更严格、输入更宽松。  
这样可避免输出连接到不被支持的位置。

### 接受任意类型

若块要“接受任意类型”，把输入连接检查设为 `null` 即可。

![值块接受任意类型](/static/blockly/images/connection-checks/values-any-type.jpg)

### 返回子类型

若块“返回一个子类型”，应在输出连接检查里同时包含子类型和其父类型。

![值块返回子类型与父类型](/static/blockly/images/connection-checks/values-subtype.png)

对子类型场景，输出检查里包含多个检查值是合理的，因为该块始终“同时返回”这两层类型信息。

### 返回参数化类型

若块“返回参数化类型”，应在输出连接检查里同时包含参数化版本和非参数化版本。

取决于你希望块语言多严格，也可以加入该类型的[变型](https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science))信息。

![值块返回参数化与非参数化类型](/static/blockly/images/connection-checks/values-parameterized-type.png)

与子类型类似，这里输出检查里有多个值也是合理的，因为该块始终“同时返回”这两类类型信息。

## 语句栈示例

在 `previous` / `next` 连接上，开发者常把连接检查用于约束块的排列顺序。

- `next` 连接检查定义“当前块后面允许接什么”
- `previous` 连接检查定义“当前块自身是什么”

::: warning 重要
块类型（例如 `'controls_if'`）与连接检查是不同概念。  
这里说“后面允许接什么块”，指的是检查字符串，而不是块类型字符串。
:::

### 保持固定顺序

要让一组块按固定顺序连接，需要：

- 在 `next` 检查里写入“允许跟在当前块后面的检查值”
- 在 `previous` 检查里写入“当前块自身的检查值”

![语句块固定顺序](/static/blockly/images/connection-checks/statements-ordered.png)

### 允许多个中间块

要做“有顺序但中间块可重复多次”的结构，需要在中间块 `next` 检查中包含至少一个来自其中间块 `previous` 检查的值。  
这样中间块后面还能继续接中间块。

![语句块允许多个中间块](/static/blockly/images/connection-checks/statements-multiple-middle-blocks.png)

### 允许没有中间块

要做“中间块可选”的结构，需要在首块 `next` 检查中同时包含：

- 中间块 `previous` 检查中的至少一个值
- 末块 `previous` 检查中的至少一个值

这样首块后面既能接中间块，也能直接接末块。

![语句块允许无中间块](/static/blockly/images/connection-checks/statements-no-middle-blocks.png)

### 二选一语句栈

若要实现“后续只能接 A 组或 B 组中的一种，不能混用”，需要两步：

1. 在首块 `next` 检查中，至少包含 A、B 两组 `previous` 检查中的各一个值。
2. 为每组块设置 `next` 检查，只允许取自本组 `previous` 检查的值。这样每组只能继续接本组。

![语句块二选一栈](/static/blockly/images/connection-checks/statements-either-or.png)
