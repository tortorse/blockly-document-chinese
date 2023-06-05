## ASTNode.(constructor)

Constructs a new instance of the `ASTNode` class

**Signature:**

```javascript
constructor(type: string, location: IASTNodeLocation, opt_params?: Params);
```

## Parameters

| Parameter  | Type                                                                    | Description                                         |
| ---------- | ----------------------------------------------------------------------- | --------------------------------------------------- |
| type       | string                                                                  | The type of the location. Must be in ASTNode.types. |
| location   | [IASTNodeLocation](/reference/js/blockly.iastnodelocation_interface.md) | The position in the AST.                            |
| opt_params | Params                                                                  | _(Optional)_ Optional dictionary of options.        |
