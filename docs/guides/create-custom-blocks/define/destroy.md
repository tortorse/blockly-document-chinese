# 销毁钩子

块有一个 `destroy` 钩子：当块从工作区删除时会触发。  
你可以在这里清理该块关联的数据模型或外部资源。

## JSON 中定义

```javascript
{
  // ...,
  "extensions": ["destroy"],
}

Blockly.Extensions.registerMixin('destroy', {
  destroy: function() {
    this.myResource.dispose();
  }
});
```

在 JSON 定义中，`destroy` 钩子通常通过混入来提供。  
可先参考[扩展和混入](/guides/create-custom-blocks/extensions)。

## JavaScript 中定义

```javascript
Blockly.Blocks['block_type'] = {
  destroy: function() {
    this.myResource.dispose();
  }
}
```

## 触发时机

`destroy` 会在父块已被销毁之后触发，但会早于该块的子块与字段销毁。
