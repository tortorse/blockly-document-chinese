# 分隔符

在任意两个分类之间添加分隔符，会在两者之间增加一条分割线和额外间距。

![分类之间的分隔线示意图。](/static/blockly/images/toolboxes/toolbox-separator.png)

你可以在 `JSON` 或 `XML` 工具箱定义中修改分隔符的类名：

::::tabs
::: tab JSON
```javascript
{
  "kind": "sep",
  "cssConfig": {
    "container": "yourClassName"
  }
}
```
:::
::: tab XML
```xml
<sep css-container="yourClassName"></sep>
```
:::
::::

在任意两个块之间添加分隔符，会在块之间创建空隙。默认每个块与下方相邻块之间间距是 `24` 像素。你可以用 `gap` 属性覆盖默认间距。

这样可以把工具箱中的块组织成逻辑分组。

![块之间通过 gap 形成分组间距示意图。](/static/blockly/images/toolboxes/toolbox-gap.png)

::::tabs
::: tab JSON
```javascript
{
  "kind": "flyoutToolbox",
  "contents": [
    {
      "kind": "block",
      "type": "math_number"
    },
    {
      "kind": "sep",
      "gap": "32"
    },
    {
      "kind": "block",
      "type": "math_arithmetic",
      "fields": {
        "OP": "ADD"
      }
    },
    {
      "kind": "sep",
      "gap": "8"
    },
    {
      "kind": "block",
      "type": "math_arithmetic",
      "fields": {
        "OP": "MINUS"
      }
    }
  ]
}
```
:::
::: tab XML
```xml
<xml id="toolbox" style="display: none">
  <block type="math_number"></block>
  <sep gap="32"></sep>
  <block type="math_arithmetic">
    <field name="OP">ADD</field>
  </block>
  <sep gap="8"></sep>
  <block type="math_arithmetic">
    <field name="OP">MINUS</field>
  </block>
</xml>
```
:::
::::
