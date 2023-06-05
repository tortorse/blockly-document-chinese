## BasicCursor class

Class for a basic cursor. This will allow the user to get to all nodes in the AST by hitting next or previous.

**Signature:**

```
export declare class BasicCursor extends Cursor
```

**Extends:** [Cursor](/reference/js/blockly.cursor_class.md)

## Constructors

| Constructor                                                                               | Modifiers | Description                                          |
| ----------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------- |
| [(constructor)()](/reference/js/blockly.basiccursor_class._constructor__1_constructor.md) |           | Constructs a new instance of the `BasicCursor` class |

## Properties

| Property                                                                                 | Modifiers | Type | Description |
| ---------------------------------------------------------------------------------------- | --------- | ---- | ----------- |
| [registrationName](/reference/js/blockly.basiccursor_class.registrationname_property.md) |

`readonly`

`static`

| (not declared) | Name used for registering a basic cursor. |

## Methods

| Method                                                                                                   | Modifiers   | Description                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [getNextNode\_(node, isValid)](/reference/js/blockly.basiccursor_class.getnextnode__1_method.md)         | `protected` | Uses pre order traversal to navigate the Blockly AST. This will allow a user to easily navigate the entire Blockly AST without having to go in and out levels on the tree.                |
| [getPreviousNode\_(node, isValid)](/reference/js/blockly.basiccursor_class.getpreviousnode__1_method.md) | `protected` | Reverses the pre order traversal in order to find the previous node. This will allow a user to easily navigate the entire Blockly AST without having to go in and out levels on the tree. |
| [in()](/reference/js/blockly.basiccursor_class.in_1_method.md)                                           |             | For a basic cursor we only have the ability to go next and previous, so in will also allow the user to get to the next node in the pre order traversal.                                   |
| [next()](/reference/js/blockly.basiccursor_class.next_1_method.md)                                       |             | Find the next node in the pre order traversal.                                                                                                                                            |
| [out()](/reference/js/blockly.basiccursor_class.out_1_method.md)                                         |             | For a basic cursor we only have the ability to go next and previous, so out will allow the user to get to the previous node in the pre order traversal.                                   |
| [prev()](/reference/js/blockly.basiccursor_class.prev_1_method.md)                                       |             | Find the previous node in the pre order traversal.                                                                                                                                        |
| [validNode\_(node)](/reference/js/blockly.basiccursor_class.validnode__1_method.md)                      | `protected` | Decides what nodes to traverse and which ones to skip. Currently, it skips output, stack and workspace nodes.                                                                             |
