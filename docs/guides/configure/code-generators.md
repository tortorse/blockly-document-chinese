# 代码生成器

大多数 Blockly 应用程序都可以将用户程序翻译成 JavaScript，Python，PHP，Lua，Dart 或其他语言。此操作由 Blockly 在客户端执行。

## 生成代码

第一步是引入相关语言的生成器。 Blockly 包括以下生成器：

- JavaScript
- Python
- PHP
- Lua
- Dart

您可以使用以下方法之一导入和使用代码生成器。

::::tabs
::: tab Modules
```javascript
import {javascriptGenerator} from 'blockly/javascript';
import {pythonGenerator} from 'blockly/python';
import {phpGenerator} from 'blockly/php';
import {luaGenerator} from 'blockly/lua';
import {dartGenerator} from 'blockly/dart';

const jsCode = javascriptGenerator.workspaceToCode(workspace);
const pythonCode = pythonGenerator.workspaceToCode(workspace);
const phpCode = phpGenerator.workspaceToCode(workspace);
const luaCode = luaGenerator.workspaceToCode(workspace);
const dartCode = dartGenerator.workspaceToCode(workspace);
```
:::
::: tab Unpkg
您必须在引入 Blockly 之后，再引入代码生成器。
```html
<script src="https://unpkg.com/blockly"></script>
<script src="https://unpkg.com/blockly/javascript_compressed"></script>
<script src="https://unpkg.com/blockly/python_compressed"></script>
<script src="https://unpkg.com/blockly/php_compressed"></script>
<script src="https://unpkg.com/blockly/lua_compressed"></script>
<script src="https://unpkg.com/blockly/dart_compressed"></script>
```
```javascript
const jsCode = Blockly.JavaScript.workspaceToCode(workspace);
const pythonCode = Blockly.Python.workspaceToCode(workspace);
const phpCode = Blockly.PHP.workspaceToCode(workspace);
const luaCode = Blockly.Lua.workspaceToCode(workspace);
const dartCode = Blockly.Dart.workspaceToCode(workspace);
```
:::
::: Local scripts
您必须在引入 Blockly 之后，再引入代码生成器。
```html
<script src="blockly_compressed.js"></script>
<script src="javascript_compressed.js"></script>
<script src="python_compressed.js"></script>
<script src="php_compressed.js"></script>
<script src="lua_compressed.js"></script>
<script src="dart_compressed.js"></script>
```
```javascript
const jsCode = Blockly.JavaScript.workspaceToCode(workspace);
const pythonCode = Blockly.Python.workspaceToCode(workspace);
const phpCode = Blockly.PHP.workspaceToCode(workspace);
const luaCode = Blockly.Lua.workspaceToCode(workspace);
const dartCode = Blockly.Dart.workspaceToCode(workspace);
```
:::
::::

## 实时生成

生成代码是一个非常快速的操作，因此频繁调用这个函数不会有任何问题。一个常见的策略是通过添加监听器到 Blockly 的 change 事件来实时生成和显示代码：

```javascript
import {javascriptGenerator} from 'blockly/javascript';
function updateCode(event) {
  const code = javascriptGenerator.workspaceToCode(workspace);
  document.getElementById('textarea').value = code;
}
workspace.addChangeListener(updateCode);
```

查看 [事件](/guides/configure/events.html) 获取更多信息。

## 自定义代码生成器

如果您想了解有关编写新语言生成器的信息，或者如何为您创建的块生成代码，请参阅[自定义块文档](/guides/create-custom-blocks/generating-code.html)。