# 生成并运行代码

你的应用可以在任意时机生成代码。比如在用户点击按钮时生成，也可以在用户每次修改后生成。

如需先了解代码生成机制，见[代码生成总览](/guides/create-custom-blocks/code-generation/overview)。

## 导入语言代码生成器

要生成代码，先导入语言代码生成器。可以使用以下任一方式。

### 模块

```javascript
import {javascriptGenerator} from 'blockly/javascript';
import {pythonGenerator} from 'blockly/python';
import {phpGenerator} from 'blockly/php';
import {luaGenerator} from 'blockly/lua';
import {dartGenerator} from 'blockly/dart';

// 为工作区中的所有块生成代码。
const jsCode = javascriptGenerator.workspaceToCode(workspace);
const pythonCode = pythonGenerator.workspaceToCode(workspace);
const phpCode = phpGenerator.workspaceToCode(workspace);
const luaCode = luaGenerator.workspaceToCode(workspace);
const dartCode = dartGenerator.workspaceToCode(workspace);
```

### Unpkg

先引入 Blockly，再引入对应语言的生成器。

```html
<script src="https://unpkg.com/blockly"></script>
<script src="https://unpkg.com/blockly/javascript_compressed"></script>
<script src="https://unpkg.com/blockly/python_compressed"></script>
<script src="https://unpkg.com/blockly/php_compressed"></script>
<script src="https://unpkg.com/blockly/lua_compressed"></script>
<script src="https://unpkg.com/blockly/dart_compressed"></script>
```

```javascript
// 为工作区中的所有块生成代码。
const jsCode = javascript.javascriptGenerator.workspaceToCode(workspace);
const pythonCode = python.pythonGenerator.workspaceToCode(workspace);
const phpCode = php.phpGenerator.workspaceToCode(workspace);
const luaCode = lua.luaGenerator.workspaceToCode(workspace);
const dartCode = dart.dartGenerator.workspaceToCode(workspace);
```

### 本地脚本

先引入 Blockly，再引入对应语言的生成器。

```html
<script src="blockly_compressed.js"></script>
<script src="javascript_compressed.js"></script>
<script src="python_compressed.js"></script>
<script src="php_compressed.js"></script>
<script src="lua_compressed.js"></script>
<script src="dart_compressed.js"></script>
```

```javascript
// 为工作区中的所有块生成代码。
const jsCode = javascript.javascriptGenerator.workspaceToCode(workspace);
const pythonCode = python.pythonGenerator.workspaceToCode(workspace);
const phpCode = php.phpGenerator.workspaceToCode(workspace);
const luaCode = lua.luaGenerator.workspaceToCode(workspace);
const dartCode = dart.dartGenerator.workspaceToCode(workspace);
```

## 生成代码

使用生成器的 `workspaceToCode` 方法：

```javascript
const code = javascriptGenerator.workspaceToCode(workspace);
```

### 持续更新

持续更新表示用户每次修改后都重新生成代码，并实时展示或运行。生成代码本身开销较小，通常可以这样做。实现方式是监听[事件](/guides/configure/events)。

```javascript
const supportedEvents = new Set([
  Blockly.Events.BLOCK_CHANGE,
  Blockly.Events.BLOCK_CREATE,
  Blockly.Events.BLOCK_DELETE,
  Blockly.Events.BLOCK_MOVE,
]);

function updateCode(event) {
  if (workspace.isDragging()) return; // 拖拽过程中不更新。
  if (!supportedEvents.has(event.type)) return;

  const code = javascriptGenerator.workspaceToCode(workspace);
  document.getElementById('textarea').value = code;
}

workspace.addChangeListener(updateCode);
```

## 添加前置代码或后置代码

生成完成后，可以在结果前后拼接额外代码。

```javascript
let code = javascriptGenerator.workspaceToCode(workspace);
// 在生成代码前后拼接代码。
const preamble = 'import {MyLibrary} from \'/path/to/my/library\';\n';
const postscript = 'MyLibrary.myKickoffFunction();\n';
code = preamble + code + postscript;
```

前置代码常用于导入外部定义，后置代码常用于在结尾触发入口函数。

如果生成代码本身就可直接运行，则不需要前置代码或后置代码。

## 执行代码

生成完成后，如何执行代码取决于你的应用场景，这部分不属于 Blockly 的通用范围。

如果你要执行 JavaScript，见[生成并运行 JavaScript](/guides/app-integration/running-javascript)。该页面还介绍了 JavaScript 生成器的特性，以及 Blockly 团队推荐的安全执行方案 [JS-Interpreter](https://github.com/NeilFraser/JS-Interpreter)。

其他语言需要使用对应语言生态中的执行方案。
