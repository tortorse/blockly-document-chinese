# 创建自定义输入

要创建自定义输入，你需要继承 [`Input`](/reference/js/blockly.inputs_namespace.input_class)，或继承它的某个子类。

```javascript
class MyInput extends Blockly.inputs.Input {
  // 构造函数应始终接收 name 和 block，才能与 JSON 块定义兼容。
  constructor(name, block) {
    super(name, block);
    // ...
  }
}
```

## 可选：创建连接

如果你希望这个输入带连接，应在构造函数中调用 `makeConnection` 创建连接。

```javascript
constructor(name, block) {
  super(name, block);
  this.connection = this.makeConnection(ConnectionType.INPUT_VALUE);
}
```

## 注册输入

若要在 [JSON 块定义](/guides/create-custom-blocks/define/json-and-js)中使用自定义输入，你需要先注册它，并把它与一个字符串标识关联。

```javascript
class MyInput extends Blockly.inputs.Input {}

Blockly.registry.register(Blockly.registry.Type.INPUT, 'my_input', MyInput);
```

::: tip 说明
与[自定义字段](/guides/create-custom-blocks/fields/customizing-fields/creating)不同，你不能覆盖内置输入，也不能给内置输入添加自定义 JSON 配置。
:::
