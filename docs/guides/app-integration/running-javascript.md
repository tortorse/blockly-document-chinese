# Generating and Running JavaScript

Blockly applications often generate JavaScript as their output language, generally to run within a web page (possibly the same, or a embedded WebView). Like any generator, the first step is to include the JavaScript generator.

For web Blockly, include `javascript_compressed.js`, right after `blockly_compressed.js`:

```html
<script src="blockly_compressed.js"></script>
<script src="javascript_compressed.js"></script>
```

To generate JavaScript from the workspace, call:

```javascript
Blockly.JavaScript.addReservedWords('code');
var code = Blockly.JavaScript.workspaceToCode(workspace);
```

The resulting code can be executed right in the destination web page:

```javascript
try {
  eval(code);
} catch (e) {
  alert(e);
}
```

Basically, the above snippet just generates the code and evals it. However, there are a couple of refinements. One refinement is that the eval is wrapped in a `try/catch` so that any runtime errors are visible, instead of failing quietly. Another refinement is that `code` is added to the list of reserved words so that if the user's code contains a variable of that name it will be automatically renamed instead of colliding. Any local variables should be reserved in this way.

## Highlight Blocks (Web Only)

Web applications which run the code within the same page often include highlighting of the currently executing block as the code runs. This may be done on a statement-by-statement level by setting `STATEMENT_PREFIX` prior to generating the JavaScript code:

```javascript
Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');
```

Define `highlightBlock` to mark the block on the workspace.

```javascript
function highlightBlock(id) {
  workspace.highlightBlock(id);
}
```

This results in the statement `highlightBlock('123');` being added to before every statement, where `123` is the serial number of the block to be highlighted.

## Infinite Loops

Although the resulting code is guaranteed to be syntactically correct at all times, it may contain infinite loops. Since solving the [Halting problem](https://en.wikipedia.org/wiki/Halting_problem) is beyond Blockly's scope (!) the best approach for dealing with these cases is to maintain a counter and decrement it every time an iteration is performed. To accomplish this, just set `Blockly.JavaScript.INFINITE_LOOP_TRAP` to a code snippet which will be inserted into every loop and every function. Here is an example:

```javascript
window.LoopTrap = 1000;
Blockly.JavaScript.INFINITE_LOOP_TRAP =
  'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
var code = Blockly.JavaScript.workspaceToCode(workspace);
```

## Example

Here is [a live demo](https://blockly-demo.appspot.com/static/demos/generator/index.html) of generating and executing JavaScript.

## JS-Interpreter

If you are serious about running the user's blocks properly, then the [JS-Interpreter](https://github.com/NeilFraser/JS-Interpreter) project is the way to go. This project is separate from Blockly, but was specifically written for Blockly.

- Execute code at any speed.

- Pause/resume/step-through execution.

- Highlight blocks as they execute.

- Completely isolated from browser's JS.

Here is [a live demo](https://blockly-demo.appspot.com/static/demos/generator/index.html) of using Blockly and JS-Interpreter to generate and execute JavaScript.

### Run the Interpreter

First, download the JS-Interpreter from GitHub:

<img src="./download.png" usemap="#download-links" style="display:block;margin:0 auto;width:282px">
<map name="download-links">
  <area shape="rect" coords="0,0,96,52" href="https://github.com/NeilFraser/JS-Interpreter/zipball/master" alt="Download ZIP File">
  <area shape="rect" coords="96,0,186,52" href="https://github.com/NeilFraser/JS-Interpreter/tarball/master" alt="Download TAR Ball">
  <area shape="rect" coords="186,0,282,52" href="https://github.com/NeilFraser/JS-Interpreter" alt="View On GitHub">
</map>

Then add it to your page:

```javascript
<script src="acorn_interpreter.js"></script>
```

The simplest method of calling it is to generate the JavaScript, create the interpreter, and run the code:

```javascript
var code = Blockly.JavaScript.workspaceToCode(workspace);
var myInterpreter = new Interpreter(code);
myInterpreter.run();
```

### Step the Interpreter

In order to execute the code slower, or in a more controlled manner, replace the call to `run` with a loop that steps (in this case one step every 10ms):

```javascript
function nextStep() {
  if (myInterpreter.step()) {
    setTimeout(nextStep, 10);
  }
}
nextStep();
```

Note that each step is not a line or a block, it is a semantic unit in JavaScript, which may be extremely fine-grained.

### Add an API

The JS-Interpreter is a sandbox that is completely isolated from the browser. Any blocks that perform actions with the outside world require an API added to the interpreter. For a full description, see the [JS-Interpreter documentation](https://neil.fraser.name/software/JS-Interpreter/docs.html). But to start with, here is the API needed to support the alert and prompt blocks:

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

Then modify your interpreter initialization to pass in the initApi function:

```javascript
var myInterpreter = new Interpreter(code, initApi);
```

The alert and prompt blocks are the only two blocks in the default set of blocks that require a custom API for the interpreter.

### Connecting highlightBlock()

When running in JS-Interpreter, `highlightBlock()` should be executed immediately, outside the sandbox, as the user steps through the program. To do this, create a wrapper function `highlightBlock()` to capture the function argument, and register it as a native function.

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

More sophisticated applications might wish to repeatedly execute steps without pause until a highlight command is reached, then pause. This strategy simulates line-by-line execution. The example below uses this approach.

### JS-Interpreter Example

Here is [a live demo](https://blockly-demo.appspot.com/static/demos/interpreter/step-execution.html) of interpreting JavaScript step by step. And [this demo](https://blockly-demo.appspot.com/static/demos/interpreter/async-execution.html) includes a wait block, a good example to use for other asynchronous behavior (e.g., speech or audio, user input).