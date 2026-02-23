# 定义弹出工具箱

弹出工具箱会始终展示同一组块。

![包含两个块的弹出工具箱工作区示意图。](/static/blockly/images/toolboxes/toolbox-minimal.png)

要创建弹出工具箱，需要把描述工具箱的 `JSON` 或 `XML` 传给[配置结构](/guides/configure/configuration_struct)中的 `toolbox` 属性。

工具箱配置可以用 `JSON`、通过 `ID` 引用的 `XML`，或 `XML` 字符串提供。

::::tabs
::: tab JSON
```javascript
var toolbox = {
    "kind": "flyoutToolbox",
    "contents": [
      {
        "kind": "block",
        "type": "controls_if"
      },
      {
        "kind": "block",
        "type": "controls_whileUntil"
      }
    ]
  };
var workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});
```
:::
::: tab XML
```xml
<xml id="toolbox" style="display: none">
  <block type="controls_if"></block>
  <block type="controls_whileUntil"></block>
</xml>
<script>
  var workspace = Blockly.inject('blocklyDiv',
      {toolbox: document.getElementById('toolbox')});
</script>
```
:::
::: tab XML String
```javascript
var toolbox = '<xml>' +
    '<block type="controls_if"></block>' +
    '<block type="controls_whileUntil"></block>' +
    '</xml>';
var workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});
```
:::
::::
