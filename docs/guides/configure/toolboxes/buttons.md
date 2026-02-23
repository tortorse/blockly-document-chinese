# 按钮与标签

你可以在工具箱中任意可放置块的位置放置按钮和标签。

![包含标签与按钮的工具箱示意图。](/static/blockly/images/toolboxes/label-and-button.png)

::::tabs
::: tab JSON
```json
{
  "kind": "flyoutToolbox",
  "contents": [
    {
      "kind": "block",
      "type": "logic_operation"
    },
    {
      "kind": "label",
      "text": "一个标签",
      "web-class": "myLabelStyle"
    },
    {
      "kind": "label",
      "text": "另一个标签"
    },
    {
      "kind": "block",
      "type": "logic_negate"
    },
    {
      "kind": "button",
      "text": "一个按钮",
      "callbackKey": "myFirstButtonPressed"
    },
    {
      "kind": "block",
      "type": "logic_boolean"
    }
  ]
}
```
:::
::: tab XML
```xml
<xml id="toolbox" style="display: none">
  <block type="logic_operation"></block>
  <label text="一个标签" web-class="myLabelStyle"></label>
  <label text="另一个标签"></label>
  <block type="logic_negate"></block>
  <button text="一个按钮" callbackKey="myFirstButtonPressed"></button>
  <block type="logic_boolean"></block>
</xml>
```
:::
::::

你可以为按钮或标签指定 `CSS` 类名。

```html
<style>
.myLabelStyle > .blocklyFlyoutLabelText {
  font-style: italic;
  fill: green;
}
</style>
```

上例中，第一个标签应用了自定义样式，第二个标签使用默认样式。

按钮应当绑定回调函数，标签不应绑定回调。你可以用以下方式为按钮注册回调：

```javascript
yourWorkspace.registerButtonCallback(yourCallbackKey, yourFunction);
```

回调函数应接收被点击的按钮对象作为参数。变量分类中的 `Create variable...` 按钮就是典型示例。
