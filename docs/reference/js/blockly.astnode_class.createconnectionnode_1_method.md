## ASTNode.createConnectionNode() method

Creates an AST node pointing to a connection. If the connection has a parent input then create an AST node of type input that will hold the connection.

**Signature:**

```javascript
static createConnectionNode(connection: Connection): ASTNode | null;
```

## Parameters

| Parameter  | Type                                                    | Description                                    |
| ---------- | ------------------------------------------------------- | ---------------------------------------------- |
| connection | [Connection](/reference/js/blockly.connection_class.md) | This is the connection the node will point to. |

**Returns:**

[ASTNode](/reference/js/blockly.astnode_class.md) | null

An AST node pointing to a connection.
