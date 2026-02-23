# 定义分类工具箱

分类工具箱会把多组块按不同分类组织起来。

![包含 Control 与 Logic 分类的分类工具箱示意图。](/static/blockly/images/toolboxes/toolbox-categories.png)

要创建分类工具箱，需要把描述工具箱的 `JSON` 或 `XML` 传给[配置结构](/guides/configure/configuration_struct)中的 `toolbox` 属性。

工具箱配置可以用 `JSON`、通过 `ID` 引用的 `XML`，或 `XML` 字符串提供。

::::tabs
::: tab JSON
```javascript
var toolbox = {
    "kind": "categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "Control",
        "contents": [
          {
            "kind": "block",
            "type": "controls_if"
          },
        ]
      },
      {
        "kind": "category",
        "name": "Logic",
        "contents": [
          {
            "kind": "block",
            "type": "logic_compare"
          },
          {
            "kind": "block",
            "type": "logic_operation"
          },
          {
            "kind": "block",
            "type": "logic_boolean"
          }
        ]
      }
    ]
  };
var workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});
```
:::
::: tab XML
```xml
<xml id="toolbox" style="display: none">
  <category name="Control">
    <block type="controls_if"></block>
  </category>
  <category name="Logic">
    <block type="logic_compare"></block>
    <block type="logic_operation"></block>
    <block type="logic_boolean"></block>
  </category>
</xml>
<script>
  var workspace = Blockly.inject('blocklyDiv',
      {toolbox: document.getElementById('toolbox')});
</script>
```
:::
::: tab XML String
```javascript
var toolbox = '<xml id="toolbox" style="display: none">' +
    '<category name="Control">' +
    '<block type="controls_if"></block>' +
    '</category>' +
    '<category name="Logic">' +
    '<block type="logic_compare"></block>' +
    '<block type="logic_operation"></block>' +
    '<block type="logic_boolean"></block>' +
    '</category>' +
    '</xml>';
var workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});
```
:::
::::
