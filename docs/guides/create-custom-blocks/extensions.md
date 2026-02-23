# 扩展和混入

**扩展**是在块初始化时执行的函数，常用于给块增加自定义配置或行为。  
**混入**用于给块增加属性或辅助函数，但不会在注册时立即执行。

只有在你使用 JSON 定义块时，才需要扩展或混入。  
如果你使用 JavaScript 定义块，则可直接在 `init` 中调用初始化逻辑，并把方法或属性直接挂到定义对象上。更多可见 [JSON 和 JavaScript](/guides/create-custom-blocks/define/json-and-js)。

## 扩展

扩展会在每个对应类型的块实例创建时执行。常见用途包括：

- 添加自定义配置（如动态 tooltip）
- 添加自定义行为（如事件监听）

```javascript
// 这个扩展会把当前块的 tooltip 设置为父块的 tooltip（如果存在）。
Blockly.Extensions.register(
  'parent_tooltip_extension',
  function() { // this 指向正在执行扩展的块
    var thisBlock = this;
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          Blockly.Msg['MATH_NUMBER_TOOLTIP'];
    });
  });
```

扩展需要先注册成字符串键，再在块的 JSON 定义中通过 `extensions` 属性引用。

```javascript
{
  // ...,
  "extensions": ["parent_tooltip_extension"],
}
```

可以一次应用多个扩展。注意 `extensions` 必须是数组，即使只有一个扩展也一样。

```javascript
{
  // ...,
  "extensions": ["parent_tooltip_extension", "break_warning_extension"],
}
```

## 混入

如果你只是想给块添加一些属性或辅助函数，而不需要立刻执行逻辑，可以使用混入。  
做法是注册一个 mixin 对象；当该块类型实例化时，Blockly 会把这个对象混入块实例。

```javascript
Blockly.Extensions.registerMixin('my_mixin', {
  someProperty: 'a cool value',

  someMethod: function() {
    // Do something cool!
  },
});
```

混入注册后的字符串键，和普通扩展一样，也是在 JSON 的 `extensions` 中引用：

```javascript
{
  // ...,
  "extensions": ["my_mixin"],
}
```
