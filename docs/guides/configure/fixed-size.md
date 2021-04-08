# 固定尺寸的工作区

将 Blockly 放入网页的最简单方法是将其注入空的 'div' 标签。

## 注入
首先，包括核心 Blockly 脚本和核心模块。请注意，路径可能会有所不同，具体取决于您的网页与 Blockly 文件相关的位置：

```html
<script src="blockly_compressed.js"></script>
<script src="fixed-sizeblocks_compressed.js"></script>
```

然后包含用户语言的消息（在本例中为英语）：
```html
<script src="msg/js/en.js"></script>
```
在页面正文的某处添加一个空 div 并设置其大小：

```html
<div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
```
在页面的任意位置添加工具箱的结构（请参阅 [定义工具箱](/guides/configure/toolbox) 以获取更多信息）：

```xml
<xml id="toolbox" style="display: none">
  <block type="controls_if"></block>
  <block type="controls_repeat_ext"></block>
  <block type="logic_compare"></block>
  <block type="math_number"></block>
  <block type="math_arithmetic"></block>
  <block type="text"></block>
  <block type="text_print"></block>
</xml>
```
最后，调用以下命令将 Blockly 注入空d iv。此脚本应位于页面底部，或由 onload 事件调用。

```html
<script>
  var workspace = Blockly.inject('blocklyDiv',
      {toolbox: document.getElementById('toolbox')});
</script>
```
当前未使用 `workspace` 变量，但稍后当想要保存块或生成代码时，它将变得很重要。如果将多个 Blockly 实例注入到同一页面上，请确保每个返回的工作空间都存储在不同的变量中。

在浏览器中测试页面。您应该看到 Blockly 编辑器填充了 div，工具箱中有七个块。[在线演示](https://blockly-demo.appspot.com/static/demos/fixed/index.html)。