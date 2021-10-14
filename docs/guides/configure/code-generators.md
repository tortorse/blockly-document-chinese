# 代码生成器

大多数 Blockly 应用程序都可以将用户程序翻译成 JavaScript，Python，PHP，Lua，Dart 或其他语言。此操作由 Blockly 在客户端执行。

## 生成代码

第一步是引入相关语言的生成器。 Blockly 包括以下生成器：

- [`javascript_compressed.js`](https://raw.githubusercontent.com/google/blockly/master/javascript_compressed.js)

- [`python_compressed.js`](https://raw.githubusercontent.com/google/blockly/master/python_compressed.js)

- [`php_compressed.js`](https://raw.githubusercontent.com/google/blockly/master/php_compressed.js)

- [`lua_compressed.js`](https://raw.githubusercontent.com/google/blockly/master/lua_compressed.js)

- [`dart_compressed.js`](https://raw.githubusercontent.com/google/blockly/master/dart_compressed.js)

生成器类应该在 `blockly_compressed.js`之后引入。 例如，以下包含了 JavaScript 生成器：

```html
<script src="blockly_compressed.js"></script>
<script src="javascript_compressed.js"></script>
```

通过此调用，用户的块可以随时从您的应用程序导出到代码：

```javascript
var code = Blockly.JavaScript.workspaceToCode(workspace);
```

在前两行中，用 Python，PHP，Lua 或 Dart 替换 JavaScript，以切换生成的语言。
## 实时生成

生成代码是一种非常快速的操作，因此频繁调用此函数没有任何害处。一个常见的策略是通过为 Blockly 的 change 事件添加一个监听器来实时生成和显示代码：

```javascript
function myUpdateFunction(event) {
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById('textarea').value = code;
}
workspace.addChangeListener(myUpdateFunction);
```

查看 [事件](/guides/configure/events.html) 获取更多信息。
