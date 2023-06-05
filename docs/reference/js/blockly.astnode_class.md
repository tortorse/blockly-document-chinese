## ASTNode class

Class for an AST node. It is recommended that you use one of the createNode methods instead of creating a node directly.

**Signature:**

```javascript
export declare class ASTNode
```

## Constructors

| Constructor                                                                                                     | Modifiers | Description                                      |
| --------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------ |
| [(constructor)(type, location, opt_params)](/reference/js/blockly.astnode_class._constructor__1_constructor.md) |           | Constructs a new instance of the `ASTNode` class |

## Properties

| Property                                                                                   | Modifiers | Type    | Description                                                                 |
| ------------------------------------------------------------------------------------------ | --------- | ------- | --------------------------------------------------------------------------- |
| [NAVIGATE_ALL_FIELDS](/reference/js/blockly.astnode_class.navigate_all_fields_property.md) | `static`  | boolean | True to navigate to all fields. False to only navigate to clickable fields. |

## Methods

| Method                                                                                                              | Modifiers | Description                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [createBlockNode(block)](/reference/js/blockly.astnode_class.createblocknode_1_method.md)                           | `static`  | Creates an AST node pointing to a block.                                                                                                                   |
| [createConnectionNode(connection)](/reference/js/blockly.astnode_class.createconnectionnode_1_method.md)            | `static`  | Creates an AST node pointing to a connection. If the connection has a parent input then create an AST node of type input that will hold the connection.    |
| [createFieldNode(field)](/reference/js/blockly.astnode_class.createfieldnode_1_method.md)                           | `static`  | Create an AST node pointing to a field.                                                                                                                    |
| [createInputNode(input)](/reference/js/blockly.astnode_class.createinputnode_1_method.md)                           | `static`  | Creates an AST node pointing to an input. Stores the input connection as the location.                                                                     |
| [createStackNode(topBlock)](/reference/js/blockly.astnode_class.createstacknode_1_method.md)                        | `static`  | Create an AST node of type stack. A stack, represented by its top block, is the set of all blocks connected to a top block, including the top block.       |
| [createTopNode(block)](/reference/js/blockly.astnode_class.createtopnode_1_method.md)                               | `static`  | Creates an AST node for the top position on a block. This is either an output connection, previous connection, or block.                                   |
| [createWorkspaceNode(workspace, wsCoordinate)](/reference/js/blockly.astnode_class.createworkspacenode_1_method.md) | `static`  | Creates an AST node pointing to a workspace.                                                                                                               |
| [getLocation()](/reference/js/blockly.astnode_class.getlocation_1_method.md)                                        |           | Gets the value pointed to by this node. It is the callers responsibility to check the node type to figure out what type of object they get back from this. |
| [getSourceBlock()](/reference/js/blockly.astnode_class.getsourceblock_1_method.md)                                  |           | Finds the source block of the location of this node.                                                                                                       |
| [getType()](/reference/js/blockly.astnode_class.gettype_1_method.md)                                                |           | The type of the current location. One of ASTNode.types                                                                                                     |
| [getWsCoordinate()](/reference/js/blockly.astnode_class.getwscoordinate_1_method.md)                                |           | The coordinate on the workspace.                                                                                                                           |
| [in()](/reference/js/blockly.astnode_class.in_1_method.md)                                                          |           | Find the element one level below and all the way to the left of the current location.                                                                      |
| [next()](/reference/js/blockly.astnode_class.next_1_method.md)                                                      |           | Find the element to the right of the current element in the AST.                                                                                           |
| [out()](/reference/js/blockly.astnode_class.out_1_method.md)                                                        |           | Find the next element that is one position above and all the way to the left of the current location.                                                      |
| [prev()](/reference/js/blockly.astnode_class.prev_1_method.md)                                                      |           | Find the element to the left of the current element in the AST.                                                                                            |
