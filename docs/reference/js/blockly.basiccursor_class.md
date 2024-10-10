# BasicCursor 类

基本光标类。这将允许用户通过点击“下一个”或“上一个”来访问 AST 中的所有节点。

**签名:**

```javascript
export declare class BasicCursor extends Cursor
```

**继承自:** [Cursor](/reference/js/blockly.cursor_class.md)

## 构造器

| 构造器                                                                                    | 修饰符 | 描述                          |
| ----------------------------------------------------------------------------------------- | ------ | ----------------------------- |
| [(constructor)()](/reference/js/blockly.basiccursor_class._constructor__1_constructor.md) |        | 构造 `BasicCursor` 类的新实例 |

## 属性

| 属性                                                                                     | 修饰符              | 类型     | 描述                     |
| ---------------------------------------------------------------------------------------- | ------------------- | -------- | ------------------------ |
| [registrationName](/reference/js/blockly.basiccursor_class.registrationname_property.md) | `readonly` `static` | (未声明) | 用于注册基本光标的名称。 |

## 方法

| 方法                                                                                                     | 修饰符      | 描述                                                                                               |
| -------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| [getNextNode\_(node, isValid)](/reference/js/blockly.basiccursor_class.getnextnode__1_method.md)         | `protected` | 使用前序遍历导航 Blockly AST。这将允许用户轻松地导航整个 Blockly AST，而无需在树的不同层级中进出。 |
| [getPreviousNode\_(node, isValid)](/reference/js/blockly.basiccursor_class.getpreviousnode__1_method.md) | `protected` | 反转前序遍历以找到前一个节点。这将允许用户轻松地导航整个 Blockly AST，而无需在树的不同层级中进出   |
| [in()](/reference/js/blockly.basiccursor_class.in_1_method.md)                                           |             | 对于基本光标，我们只有能力去下一个和上一个，所以 in 也将允许用户在前序遍历中获得下一个节点。       |
| [next()](/reference/js/blockly.basiccursor_class.next_1_method.md)                                       |             | 查找前序遍历中的下一个节点。                                                                       |
| [out()](/reference/js/blockly.basiccursor_class.out_1_method.md)                                         |             | 对于基本光标，我们只有能力去下一个和上一个，所以 out 将允许用户在前序遍历中获得前一个节点。        |
| [prev()](/reference/js/blockly.basiccursor_class.prev_1_method.md)                                       |             | 查找前序遍历中的前一个节点。                                                                       |
| [validNode\_(node)](/reference/js/blockly.basiccursor_class.validnode__1_method.md)                      | `protected` | 决定要遍历哪些节点以及要跳过哪些节点。目前，它跳过输出、栈和工作区节点。                           |
