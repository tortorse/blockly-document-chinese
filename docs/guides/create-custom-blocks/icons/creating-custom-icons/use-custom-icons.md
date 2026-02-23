# 使用自定义图标

要使用自定义图标，可在块上调用 `addIcon` 或 `getIcon`。

## 添加图标

要向块添加自定义图标，把块实例传给图标构造函数，然后在该块上调用 `addIcon`。通常可在块初始化阶段执行，也可以在事件响应中执行。

::::tabs
::: tab JSON

```javascript
// Use an extension to add a custom icon during initialization.
Blockly.Extensions.register("addMyIcon", function () {
  this.addIcon(new MyIcon(this));
})

Blockly.common.defineBlocksWithJsonArray([
  {
    type: "my_block",
    // ...
    extensions: ["addMyIcon"],
  },
])
```

:::
::: tab JavaScript

```javascript
// Add a custom icon during initialization.
Blockly.Blocks['my_block'] = {
  init: function() {
    //...
    this.addIcon(new MyIcon(this));
  },
}
```

:::
::::

## 获取图标

要从块中获取自定义图标，调用 `getIcon` 并传入[图标类型字符串](/guides/create-custom-blocks/icons/creating-custom-icons/basic-implementation#指定图标类型)。

```javascript
const myIcon = myBlock.getIcon('my_icon');
```
