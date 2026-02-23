# 嵌套分类

分类可以嵌套在其他分类内。下面示例有两个顶层分类 `Core` 和 `Custom`，其中 `Custom` 下有两个子分类，且每个子分类都包含块。

注意：同一个分类可以同时包含子分类和块。在下面示例中，`Custom` 既有两个子分类 `Move`、`Turn`，也有自己的块 `start`。

::::tabs
::: tab JSON
```javascript
{
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Core",
      "contents": [
        {
          "kind": "block",
          "type": "controls_if"
        },
        {
          "kind": "block",
          "type": "logic_compare"
        },
      ]
    },
    {
      "kind": "category",
      "name": "Custom",
      "contents": [
        {
          "kind": "block",
          "type": "start"
        },
        {
          "kind": "category",
          "name": "Move",
          "contents": [
            {
              "kind": "block",
              "type": "move_forward"
            }
          ]
        },
        {
          "kind": "category",
          "name": "Turn",
          "contents": [
            {
              "kind": "block",
              "type": "turn_left"
            }
          ]
        }
      ]
    }
  ]
}
```
:::
::: tab XML
```xml
<xml id="toolbox" style="display: none">
  <category name="Core">
    <block type="controls_if"></block>
    <block type="logic_compare"></block>
  </category>
  <category name="Custom">
    <block type="start"></block>
    <category name="Move">
      <block type="move_forward"></block>
    </category>
    <category name="Turn">
      <block type="turn_left"></block>
    </category>
  </category>
</xml>
```
:::
::::
