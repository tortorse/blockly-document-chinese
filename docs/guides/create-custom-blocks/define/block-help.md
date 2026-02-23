# 块帮助

你可以通过两种方式为块提供帮助信息：

- 工具提示
- 帮助链接

## 工具提示

当用户把鼠标悬停在块上时，会显示工具提示。  
提示文本较长时会自动换行。

### JSON

```javascript
{
  // ...,
  "tooltip": "Tooltip text."
}
```

### JavaScript

```javascript
init: function() {
  this.setTooltip("Tooltip text.");
}
```

在 JavaScript 中，工具提示还可以是函数而不是固定字符串，这样可以实现动态提示。  
例如可以根据下拉字段当前值返回不同提示：

```javascript
Blockly.Blocks['math_arithmetic'] = {
  init: function() {
    // ...
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'ADD': Blockly.Msg['MATH_ARITHMETIC_TOOLTIP_ADD'],
        'MINUS': Blockly.Msg['MATH_ARITHMETIC_TOOLTIP_MINUS'],
        'MULTIPLY': Blockly.Msg['MATH_ARITHMETIC_TOOLTIP_MULTIPLY'],
        'DIVIDE': Blockly.Msg['MATH_ARITHMETIC_TOOLTIP_DIVIDE'],
        'POWER': Blockly.Msg['MATH_ARITHMETIC_TOOLTIP_POWER']
      };
      return TOOLTIPS[mode];
    });
  }
};
```

### 自定义工具提示外观

你可以提供自定义渲染函数来定制工具提示外观。该函数接收两个参数：

- 一个 `div`，用于渲染提示内容
- 当前被悬停的元素

在函数体内，你可以把任意内容渲染到 `div` 中。  
如果要读取该元素对应的提示文本，可调用：

```javascript
Blockly.Tooltip.getTooltipOfObject(element);
```

然后把自定义函数注册给 Blockly：

```javascript
Blockly.Tooltip.setCustomTooltip(yourFnHere);
```

可参考官方示例：[Custom Tooltips demo](https://raspberrypifoundation.github.io/blockly-samples/examples/custom-tooltips-demo/)。

## 帮助链接

块可以绑定一个帮助页面。用户右键块后，在菜单中选择“帮助”即可打开。  
如果该值为 `null`，菜单里不会显示“帮助”项。

### JSON

```javascript
{
  // ...,
  "helpUrl": "https://en.wikipedia.org/wiki/For_loop"
}
```

### JavaScript

```javascript
init: function() {
  // ...
  this.setHelpUrl('https://en.wikipedia.org/wiki/For_loop');
}
```

在 JavaScript 中，`setHelpUrl` 也可以接收函数，从而按当前块状态动态返回链接地址。
