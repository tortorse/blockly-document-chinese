# 生成并运行 JavaScript

Blockly 应用通常以 JavaScript 作为输出语言，一般运行在网页中（可能是同一页面，也可能是嵌入式 WebView）。和其他生成器一样，第一步是引入 JavaScript 生成器。

```javascript
import {javascriptGenerator} from 'blockly/javascript';
```

从工作区生成 JavaScript：

```javascript
javascriptGenerator.addReservedWords('code');
var code = javascriptGenerator.workspaceToCode(workspace);
```

生成后的代码可以直接在目标网页执行。

**警告：** 使用 `eval` 执行 JavaScript 有[严重安全风险](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)，只建议在原型阶段使用。生产环境应使用沙盒解释器，例如 [JS-Interpreter](#js-interpreter)。

```javascript
try {
  eval(code);
} catch (e) {
  alert(e);
}
```

上面的片段本质上是“生成代码并执行”。常见优化有两点：一是把 `eval` 包在 `try`/`catch` 中，避免运行时错误静默失败；二是把 `code` 加入保留词，防止与用户变量重名冲突。你定义的局部变量也应按同样方式加入保留词。

## 高亮块

代码运行时高亮当前执行块，能帮助用户理解程序行为。可以在生成 JavaScript 前设置 `STATEMENT_PREFIX`，按语句级高亮：

```javascript
javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
javascriptGenerator.addReservedWords('highlightBlock');
```

定义 `highlightBlock`，在工作区中高亮对应块：

```javascript
function highlightBlock(id) {
  workspace.highlightBlock(id);
}
```

这样会在每条语句前插入 `highlightBlock('123');`，其中 `123` 是要高亮块的序列号。

## 无限循环

虽然生成代码始终语法正确，但仍可能出现无限循环。由于解决[停机问题](https://en.wikipedia.org/wiki/Halting_problem)不在 Blockly 范围内，通常做法是维护一个计数器，每次循环迭代时递减。把 `javascriptGenerator.INFINITE_LOOP_TRAP` 设为要注入每个循环和函数的代码片段即可：

```javascript
window.LoopTrap = 1000;
javascriptGenerator.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
var code = javascriptGenerator.workspaceToCode(workspace);
```

## 示例

这里有一个生成并执行 JavaScript 的[在线示例](https://raspberrypifoundation.github.io/blockly-samples/examples/generator-demo/)。

## JS-Interpreter

如果你要可靠地执行用户搭建的程序，推荐使用 [JS-Interpreter](https://github.com/NeilFraser/JS-Interpreter)。它独立于 Blockly，但就是为 Blockly 这类场景设计的。

- 可按任意速度执行代码。
- 支持暂停、恢复、单步执行。
- 可在执行时高亮对应块。
- 与浏览器 JavaScript 完全隔离。

### 运行解释器

先从 GitHub 下载 JS-Interpreter：

- [下载 zip 包](https://github.com/NeilFraser/JS-Interpreter/zipball/master)
- [下载 tar 包](https://github.com/NeilFraser/JS-Interpreter/tarball/master)
- [查看 GitHub 仓库](https://github.com/NeilFraser/JS-Interpreter)

然后在页面中引入：

```javascript
<script src="acorn_interpreter.js"></script>
```

最简单的调用方式是先生成 JavaScript，再创建解释器并执行：

```javascript
var code = javascriptGenerator.workspaceToCode(workspace);
var myInterpreter = new Interpreter(code);
myInterpreter.run();
```

### 单步执行解释器

如果要更慢或更可控地执行，把 `run` 换成循环 `step`（下面示例是每 10ms 一步）：

```javascript
function nextStep() {
  if (myInterpreter.step()) {
    setTimeout(nextStep, 10);
  }
}
nextStep();
```

注意每一步不是“一行代码”或“一个块”，而是 JavaScript 语义层面的一个执行单元，可能非常细。

### 添加 API

JS-Interpreter 是完全隔离浏览器环境的沙盒。凡是需要与外部世界交互的块，都要给解释器注册 API。完整说明见 [JS-Interpreter 文档](https://neil.fraser.name/software/JS-Interpreter/docs.html)。先看支持 `alert` 和 `prompt` 的基础 API：

```javascript
function initApi(interpreter, globalObject) {
  // Add an API function for the alert() block.
  var wrapper = function(text) {
    return alert(arguments.length ? text : '');
  };
  interpreter.setProperty(globalObject, 'alert',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for the prompt() block.
  wrapper = function(text) {
    return prompt(text);
  };
  interpreter.setProperty(globalObject, 'prompt',
      interpreter.createNativeFunction(wrapper));
}
```

然后在初始化解释器时传入 `initApi`：

```javascript
var myInterpreter = new Interpreter(code, initApi);
```

默认块集中，`alert` 和 `prompt` 是仅有的两个需要自定义解释器 API 的块。

### 连接 `highlightBlock()`

在 JS-Interpreter 场景下，用户单步执行时，`highlightBlock()` 应立即在沙盒外执行。做法是包装 `highlightBlock()` 并注册为原生函数：

```javascript
function initApi(interpreter, globalObject) {
  // Add an API function for highlighting blocks.
  var wrapper = function(id) {
    return workspace.highlightBlock(id);
  };
  interpreter.setProperty(globalObject, 'highlightBlock',
      interpreter.createNativeFunction(wrapper));
}
```

更复杂的应用可以持续执行多个步骤，直到遇到高亮命令再暂停，从而模拟“逐行执行”。下面示例采用了这种方式。

### JS-Interpreter 示例

这是逐步解释执行 JavaScript 的[在线示例](https://raspberrypifoundation.github.io/blockly-samples/examples/interpreter-demo/step-execution.html)。另一个[在线示例](https://raspberrypifoundation.github.io/blockly-samples/examples/interpreter-demo/async-execution.html)包含等待块，适合参考其他异步行为场景（如语音、音频、用户输入）。
