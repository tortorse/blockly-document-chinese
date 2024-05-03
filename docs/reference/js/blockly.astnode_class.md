## ASTNode class

AST 节点类。建议使用其中一个 createNode 方法而不是直接创建节点。

**签名:**

```javascript
export declare class ASTNode
```

## 构造器

| 构造器                                                                                                          | 修饰符 | 描述                    |
| --------------------------------------------------------------------------------------------------------------- | ------ | ----------------------- |
| [(constructor)(type, location, opt_params)](/reference/js/blockly.astnode_class._constructor__1_constructor.md) |        | 构造 ASTNode 类的新实例 |

## 属性

| 属性                                                                                       | 修饰符   | 类型    | 描述                                                        |
| ------------------------------------------------------------------------------------------ | -------- | ------- | ----------------------------------------------------------- |
| [NAVIGATE_ALL_FIELDS](/reference/js/blockly.astnode_class.navigate_all_fields_property.md) | `static` | boolean | True 值用于导航到所有字段。False 值仅用于导航到可点击字段。 |

## 方法

| 方法                                                                                                                | 修饰符   | 描述                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [createBlockNode(block)](/reference/js/blockly.astnode_class.createblocknode_1_method.md)                           | `static` | 创建指向块的 AST 节点 |
| [createConnectionNode(connection)](/reference/js/blockly.astnode_class.createconnectionnode_1_method.md)            | `static` | 创建指向连接的 AST 节点。如果连接有一个父输入，则创建一个类型为输入的 AST 节点，该节点将包含该连接。                                                       |
| [createFieldNode(field)](/reference/js/blockly.astnode_class.createfieldnode_1_method.md)                           | `static` | 创建指向字段的 AST 节点 |
| [createInputNode(input)](/reference/js/blockly.astnode_class.createinputnode_1_method.md)                           | `static` | 创建指向输入的 AST 节点。将输入连接存储为位置。                                                                                                            |
| [createStackNode(topBlock)](/reference/js/blockly.astnode_class.createstacknode_1_method.md)                        | `static` | 创建类型为栈的 AST 节点。栈由其顶部块表示，是连接到顶部块的所有块的集合，包括顶部块。                                                                      |  |
| [createTopNode(block)](/reference/js/blockly.astnode_class.createtopnode_1_method.md)                               | `static` | 为块的顶部位置创建AST节点。这是输出连接、前一个连接或块。 |
| [createWorkspaceNode(workspace, wsCoordinate)](/reference/js/blockly.astnode_class.createworkspacenode_1_method.md) | `static` | 指向工作区的AST节点。 |
| [getLocation()](/reference/js/blockly.astnode_class.getlocation_1_method.md)                                        |          | 获取此节点指向的值。调用者有责任检查节点类型以确定他们从这个调用返回的对象是什么类型。 |
| [getSourceBlock()](/reference/js/blockly.astnode_class.getsourceblock_1_method.md)                                  |          | 查找此节点位置的源块。 |
| [getType()](/reference/js/blockly.astnode_class.gettype_1_method.md)                                                |          | 当前位置的类型。ASTNode.types 之一。|
| [getWsCoordinate()](/reference/js/blockly.astnode_class.getwscoordinate_1_method.md)                                |          | 工作区上的坐标。 |
| [in()](/reference/js/blockly.astnode_class.in_1_method.md)                                                          |          | 查找当前位置下一级并向左到最左边的元素。 |
| [next()](/reference/js/blockly.astnode_class.next_1_method.md)                                                      |          | 查找AST中当前元素右侧的元素。 |
| [out()](/reference/js/blockly.astnode_class.out_1_method.md)                                                        |          | 查找当前位置上方一级并向左到最左边的下一个元素。 |
| [prev()](/reference/js/blockly.astnode_class.prev_1_method.md)                                                      |          | 查找AST中当前元素左侧的元素。 |
