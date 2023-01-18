# 生成并运行 JavaScript

Blockly 应用程序通常生成 JavaScript 作为它们的输出语言，通常在网页内运行（可能是类似的，或者是嵌入式 WebView）。与任何生成器一样，第一步就是添加 JavaScript 生成器。

```javascript
import { javascriptGenerator } from 'blockly/javascript';
```

如需从工作区生成 JavaScript，请调用：

```javascript
javascriptGenerator.addReservedWords('code');
var code = javascriptGenerator.workspaceToCode(workspace);
```

可以直接在目标网页中执行生成的代码：

```javascript
try {
  eval(code);
} catch (e) {
  alert(e);
}
```

基本上，上面的代码片段只会生成代码并对其进行评估。不过，也有几个优化需要。其中一项优化是，评估封装在 try/catch 中，以便显示所有运行时错误，而不是静默失败。另一种优化是将 `code` 添加到保留字词列表中，以便在用户的代码包含该名称的变量时，系统会自动重命名该变量，而不是冲突。任何局部变量都应以这种方式保留。

## 突出显示文本块

在代码运行时突出显示当前执行的代码块有助于用户了解其程序的行为。您可以在生成 JavaScript 代码之前通过设置 `STATEMENT_PREFIX` 在各个语句级别进行突出显示：

```javascript
javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
javascriptGenerator.addReservedWords('highlightBlock');
```

定义 `highlightBlock` 以在工作区上标记该代码块。

```javascript
function highlightBlock(id) {
  workspace.highlightBlock(id);
}
```

这会导致每个语句之前都添加语句 `highlightBlock('123');`，其中 `123` 是要突出显示的块的序列号。

## 无限循环

虽然生成的代码在语法上始终正确，但它可能包含无限循环。由于解决 [停摆问题](https://en.wikipedia.org/wiki/Halting_problem) 超出了 Blockly 的讨论范围 (!)，处理这些情况的最佳方法是维护一个计数器，并在每次执行迭代时递减。为此，只需将 `javascriptGenerator.INFINITE_LOOP_TRAP` 设置为将插入到每个循环和每个函数中的代码片段。示例如下：

```javascript
window.LoopTrap = 1000;
javascriptGenerator.INFINITE_LOOP_TRAP =
  'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
var code = javascriptGenerator.workspaceToCode(workspace);
```

## 示例

这里是生成和执行 JavaScript 的 [实时演示](https://google.github.io/blockly-samples/examples/generator-demo/)。

## JS-Interpreter

如果您确实要正确运行用户的代码块，那么 [JS-Interpreter](https://github.com/NeilFraser/JS-Interpreter) 项目是您的不二之选。该项目独立于 Blockly，但专门为 Blockly 编写。

- 以任意速度执行代码。
- 暂停/继续/单步执行。
- 在执行过程中突出显示相应块。
- 与浏览器的 JavaScript 完全隔离。

### 运行解译器

首先，从 GitHub 下载 JS 解释器：

<img src="./download.png" usemap="#download-links" style="display:block;margin:0 auto;width:282px">
<map name="download-links">
  <area shape="rect" coords="0,0,96,52" href="https://github.com/NeilFraser/JS-Interpreter/zipball/master" alt="Download ZIP File">
  <area shape="rect" coords="96,0,186,52" href="https://github.com/NeilFraser/JS-Interpreter/tarball/master" alt="Download TAR Ball">
  <area shape="rect" coords="186,0,282,52" href="https://github.com/NeilFraser/JS-Interpreter" alt="View On GitHub">
</map>

然后将其添加到您的网页：

```javascript
<script src="acorn_interpreter.js"></script>
```

最简单的调用方法是生成 JavaScript、创建解释器并运行代码：

```javascript
var code = Blockly.JavaScript.workspaceToCode(workspace);
var myInterpreter = new Interpreter(code);
myInterpreter.run();
```

### 单步解译

为了减慢执行代码的速度或以更可控的方式执行代码，将对 `run` 的调用替换为一个循环（在此情况下，每 10 毫秒一个步骤）：

```javascript
function nextStep() {
  if (myInterpreter.step()) {
    setTimeout(nextStep, 10);
  }
}
nextStep();
```

请注意，每个步骤都不是一行或一个块，而是在 JavaScript 中进行的一个语义单元，因此可能非常精细。

### 添加 API

JS-Interpreter 是一个与浏览器完全隔离的沙盒。与外部世界执行操作的任何代码块都需要向解释器添加一个 API。有关完整说明，请参阅 [JS-Interpreter 文档](https://neil.fraser.name/software/JS-Interpreter/docs.html)。但首先，我们需要以下 API 来支持提醒和提示块：

```javascript
function initApi(interpreter, globalObject) {
  // Add an API function for the alert() block.
  var wrapper = function(text) {
    return alert(arguments.length ? text : '');
  };
  interpreter.setProperty(
    globalObject,
    'alert',
    interpreter.createNativeFunction(wrapper)
  );

  // Add an API function for the prompt() block.
  wrapper = function(text) {
    return prompt(text);
  };
  interpreter.setProperty(
    globalObject,
    'prompt',
    interpreter.createNativeFunction(wrapper)
  );
}
```

然后，修改您的解释器初始化以传入 initApi 函数：

```javascript
var myInterpreter = new Interpreter(code, initApi);
```

alert 和 prompt 块是默认块集中唯二需要解释器自定义 API 的两个块。

### 连接 highlightBlock()

在使用 JS-Interpreter 运行时，随着用户逐步执行程序，`highlightBlock()` 应在沙盒之外立即执行。为此，请创建一个封装容器函数 `highlightBlock()` 来捕获函数参数，并将其注册为原生函数。

```javascript
function initApi(interpreter, globalObject) {
  // Add an API function for highlighting blocks.
  var wrapper = function(id) {
    return workspace.highlightBlock(id);
  };
  interpreter.setProperty(
    globalObject,
    'highlightBlock',
    interpreter.createNativeFunction(wrapper)
  );
}
```

更复杂的应用可能需要反复执行不暂停执行的步骤，直到执行突出显示命令，然后暂停。此策略会模拟逐行执行。以下示例使用了此方法。

### JS-Interpreter 示例

这里是逐步解译 JavaScript 的 [实时演示](https://google.github.io/blockly-samples/examples/interpreter-demo/step-execution.html)。[此演示](https://google.github.io/blockly-samples/examples/interpreter-demo/async-execution.html)包含一个等候块，这是用于其他异步行为（例如，语音或音频、用户输入）的一个很好的例子。