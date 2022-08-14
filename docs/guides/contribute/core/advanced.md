# 高级编译

常规[构建过程](/guides/modify/web/building)使用 Google 的在线 JavaScript 编译器将 Blockly 减少到六个文件，总计约 720kb（压缩后为 160kb）。或者，可以在“高级编译”模式下使用 Google 的离线 JavaScript 编译器，它具有许多优点：

- 由于摇树，总 Blockly 大小减少到 300kb（压缩后 100kb）。
- 由于本地编译器执行，更快的构建时间和无网络流量。
- 无限编译（在线编译器是有速率限制的）。

## 设置

出于本教程的目的，首先在 Blockly 根目录中创建一个新目录。

### 下载闭包编译器。

下载[compiler.jar](https://unpkg.com/google-closure-compiler-java/compiler.jar)，将其重命名为`closure-compiler.jar`，并将其放在您的目录中。

通过在命令行上运行它来验证您的 Java 运行时环境是否可以运行编译器：

```bash
java -jar closure-compiler.jar --version
```

### 样板

首先，创建一个 HTML 文件，该文件定义了一个最小的 Blockly 工具箱和一个用于注入它的 div。为此，请在您的目录中创建一个 `index.html`包含以下代码的文件：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Blockly: Advanced Compilation</title>
    <script src="main_compressed.js"></script>
    <script src="../msg/js/en.js"></script>
  </head>
  <body>
    <h1>Blockly: Advanced Compilation</h1>
    <div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
    <xml id="toolbox" style="display: none">
      <block type="controls_if"></block> <block type="logic_compare"></block>
      <block type="controls_repeat_ext"></block>
      <block type="math_number"></block> <block type="math_arithmetic"></block>
      <block type="text"></block> <block type="text_print"></block>
    </xml>
  </body>
</html>
```

请务必根据您的 Blockly 路径和所需语言的需要编辑语言路径 (`../msg/js/en.js`)。

其次，创建一个 JavaScript 文件来加载 Blockly 和任何必要的消息文件或块定义，然后将 Blockly 注入到提供的 div 中。为此，请在您的目录中创建一个`main.js`包含以下代码的文件：

```javascript
goog.provide('Main'); // Core
goog.require('Blockly.requires'); // Blocks
goog.require('Blockly.Constants.Logic');
goog.require('Blockly.Constants.Loops');
goog.require('Blockly.Constants.Math');
goog.require('Blockly.Constants.Text');
Main.init = function() {
  Blockly.inject('blocklyDiv', { toolbox: document.getElementById('toolbox') });
};
window.addEventListener('load', Main.init);
```

### 编译

`main.js`通过从命令行运行 Closure Compiler 一起编译、Blockly 和 Closure 库：

```bash
java -jar closure-compiler.jar --js='main.js' \
  --js='../blocks/**.js' \  --js='../core/**.js' \
  --js='../generators/**.js' \
  --generate_exports \
  --externs ../externs/svg-externs.js \
  --compilation_level ADVANCED_OPTIMIZATIONS \
  --dependency_mode=PRUNE --entry_point=Main \
  --js_output_file main_compressed.js
```

或者使用我们的高级编译脚本：

```bash
 npm run test:compile:advanced
```

将浏览器指向`index.html`以验证一切正常。

### 更高级

为了进一步减小大小，您可以仅包含应用程序实际使用的 Blockly 组件。例如，如果您的应用程序未配置为具有垃圾桶，那么您可以从编译的组件列表中删除垃圾桶。为此，请从您的代码中删除对 `Blockly.requires` 的要求：

```javascript
// Core
goog.require('Blockly.requires');
```

取而代之的是，打开`core/requires.js`所有 require 语句并将其复制到您的代码中。然后，您可以注释掉不需要的那些。

请注意，Closure Compiler 会在编译后的输出中保留许可证。随意从此输出文件中剥离 Google 的 Apache 许可证以进一步减小大小。

Closure Compiler 有很多特性和选项，请查看他们的 [文档](https://developers.google.com/closure/compiler/docs/gettingstarted_app)。
