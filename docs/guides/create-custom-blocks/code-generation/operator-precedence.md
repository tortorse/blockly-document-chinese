# 运算符优先级

块天然带有分组含义。  
例如看到下面的块，你会理解为 `-(5 + 2)`，而不是 `-5 + 2`：因为 `5` 和 `2` 属于同一个块，`-` 属于外层另一个块。

![块结构对应 `-(5 + 2)`](/static/blockly/images/code-generation/parentheses/negation-and-addition.png)

但如果给每个块都加括号，代码可读性会明显下降。  
比如 `(((5) * (2)) + (3))` 与 `5 * 2 + 3` 结果都为 `13`，后者更易读。

Blockly 的运算符优先级规则，就是在保证语义正确的前提下，尽量少加括号。

## 生成“正确”输出

如果你不要求生成代码给人阅读，那么不必刻意最小化括号。  
给每个块都包上括号是可行方案，而且能保证执行语义正确。

想要优先保证正确性时，可用这条固定策略：

- 调用 `valueToCode` 时统一传 `Order.ATOMIC`
- 值块代码生成器统一返回 `Order.NONE`

## 生成最优括号

只有在“不加括号会改变语义”时，才需要插入括号。  
典型场景是：外层块运算符优先级强于内层块运算符优先级。

::: tip 说明
优先级就是运算符的计算顺序。比如基础算术常用的 [PEMDAS](https://en.wikipedia.org/wiki/Order_of_operations#Mnemonics)。
:::

下面示例里同时存在一元负号与加法，其中一元负号优先级更强：

![一元负号与加法](/static/blockly/images/code-generation/parentheses/negation-and-addition.png)

如果不加括号会得到 `-5 + 2`，`-` 会先于 `+` 执行，语义与块结构不一致。

你可以通过“告知生成器各运算符强度”来控制何时加括号：  
当生成器发现“外层运算符强于内层运算符”时，会自动给内层代码加括号。

`valueToCode` 接收外层运算符优先级，返回元组里的优先级用于表示当前块内部运算符优先级。

下面是一个包含两个运算符的示例块：

![包含子块的示例](/static/blockly/images/code-generation/parentheses/negate-plus-two-with-child.png)

```javascript
import {javascriptGenerator, Order} from 'blockly/javascript';

javascriptGenerator.forBlock['negate_plus_two'] = function(block, generator) {
  // valueToCode 传入外层运算符优先级。
  const innerCode = generator.valueToCode(block, 'INNER', Order.UNARY_NEGATION);
  const code = `-${innerCode} + 2`;
  // 返回元组中的优先级表示当前块内部运算符优先级。
  return [code, Order.ADDITION];
};
```

### `valueToCode` 优先级

调用 `valueToCode` 生成内部块代码时，应传入“作用在该内部代码上的最强运算符优先级”。  
也就是内部代码需要被保护不被拆开的那个运算符。

例如下面这个块里，一元负号和加法都作用在内部块代码上，而一元负号更强，所以应传 `Order.UNARY_NEGATION`：

![包含子块的示例](/static/blockly/images/code-generation/parentheses/negate-plus-two-with-child.png)

```javascript
// - 是作用在内部代码上的最强运算符。
const innerCode = generator.valueToCode(block, 'INNER', Order.UNARY_NEGATION);
const code = `-${innerCode} + 2`;
```

### 返回优先级

从块代码生成器返回优先级时，应返回“当前块代码里最弱运算符”的优先级。  
这是最需要被外层保护的运算符。

例如下面这个块包含一元负号和加法，其中加法更弱，所以应返回 `Order.ADDITION`：

![不含子块的示例](/static/blockly/images/code-generation/parentheses/negate-plus-two.png)

```javascript
const code = `-${innerCode} + 2`;
// + 是当前块里的最弱运算符。
return [code, Order.ADDITION];
```

## `Order` 枚举

每个语言生成器模块都定义了自己的 `Order` 枚举，包含该语言全部运算符优先级。

强优先级对应更小的底层值，弱优先级对应更大的底层值。  
可以理解为：越“强”的优先级，排序越靠前。

内置语言的 `Order` 定义：

- [Dart order](https://github.com/RaspberryPiFoundation/blockly/blob/dcd2d0e539f2b7aa34b58969d5dc812e7848800c/generators/dart/dart_generator.ts#L27)
- [JavaScript order](https://github.com/RaspberryPiFoundation/blockly/blob/dcd2d0e539f2b7aa34b58969d5dc812e7848800c/generators/javascript/javascript_generator.ts#L27)
- [Lua order](https://github.com/RaspberryPiFoundation/blockly/blob/dcd2d0e539f2b7aa34b58969d5dc812e7848800c/generators/lua/lua_generator.ts#L28)
- [PHP order](https://github.com/RaspberryPiFoundation/blockly/blob/dcd2d0e539f2b7aa34b58969d5dc812e7848800c/generators/php/php_generator.ts#L26)
- [Python order](https://github.com/RaspberryPiFoundation/blockly/blob/dcd2d0e539f2b7aa34b58969d5dc812e7848800c/generators/python/python_generator.ts#L27)

### 特殊优先级

大多数 `Order` 项与目标文本语言保持一致。  
但有两个特殊值：`Order.ATOMIC` 与 `Order.NONE`。

`Order.ATOMIC` 是最强优先级，常用于：

- 你希望始终加括号，因此把它传给 `valueToCode`
- 块本身不含运算符，因此从块代码生成器返回它

`Order.NONE` 是最弱优先级，常用于：

- 你希望始终加括号，因此从块代码生成器返回它
- 作用在内部块上的运算符为空，因此把它传给 `valueToCode`
