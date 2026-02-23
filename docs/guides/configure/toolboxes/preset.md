# 预设块

你可以在工具箱中预设块的状态。例如给字段设置默认值，或把两个块预先连接起来。你也可以创建[阴影块](#阴影块)，作为子块的默认占位。

## 示例

下面是一些预设块示例。

### 预设字段值的块

下面这个 `math_number` 块展示的字段值是 `42`，而不是默认值 `0`：

![字段值预设为 42 的数字块。](/static/blockly/images/toolboxes/42.png)

对应工具箱配置如下：

::::tabs
::: tab JSON
```json
{
 "kind": "flyoutToolbox",
 "contents": [
   {
     "kind": "block",
     "type": "math_number",
     "fields": {
       "NUM": 42
     }
   },
 ]
}
```
:::
::: tab XML
```xml
<xml id="toolbox" style="display: none">
 <block type="math_number">
   <field name="NUM">42</field>
 </block>
</xml>
```
:::
::::

### 预连接块

下面这个 `controls_for` 块预先连接了三个 `math_number` 块：

![count-with 块预连接数字块示意图。](/static/blockly/images/toolboxes/count-with.png)

对应工具箱配置如下：

::::tabs
::: tab JSON
```json
{
 "kind": "flyoutToolbox",
 "contents": [
   {
     "kind": "block",
     "type": "controls_for",
     "inputs": {
       "FROM": {
         "block": {
           "type": "math_number",
           "fields": {
             "NUM": 1
           }
         }
       },
       "TO": {
         "block": {
           "type": "math_number",
           "fields": {
             "NUM": 10
           }
         }
       },
       "BY": {
         "block": {
           "type": "math_number",
           "fields": {
             "NUM": 1
           }
         }
       },
     }
   },
 ]
}
```
:::
::: tab XML
```xml
<xml id="toolbox" style="display: none">
 <block type="controls_for">
   <value name="FROM">
     <block type="math_number">
       <field name="NUM">1</field>
     </block>
   </value>
   <value name="TO">
     <block type="math_number">
       <field name="NUM">10</field>
     </block>
   </value>
   <value name="BY">
     <block type="math_number">
       <field name="NUM">1</field>
     </block>
   </value>
 </block>
</xml>
```
:::
::::

### 禁用块

被禁用的块不能从工具箱拖出。可以通过可选的 `disabled` 属性按块禁用。

![工具箱中禁用块示意图。](/static/blockly/images/toolboxes/toolbox-disabled.png)

::::tabs
::: tab JSON
```json
{
 "kind": "flyoutToolbox",
 "contents": [
   {
     "kind": "block",
     "type": "math_number"
   },
   {
     "kind": "block",
     "type": "math_arithmetic"
   },
   {
     "kind": "block",
     "type": "math_single",
     "disabled": "true"
   }
 ]
}
```
:::
::: tab XML
```xml
<xml id="toolbox" style="display: none">
 <block type="math_number"></block>
 <block type="math_arithmetic"></block>
 <block type="math_single" disabled="true"></block>
</xml>
```
:::
::::

你也可以通过 [`setDisabledReason`](https://developers.google.com/blockly/reference/js/blockly.block_class.setdisabledreason_1_method) 在代码中禁用或启用块。

## 配置你的块

在工具箱里，你能做的块配置基本等同于在工作区里能做的配置。比如设置字段值、连接值输入或语句输入、添加注释、折叠块、禁用块等。这是因为工具箱配置块和工作区序列化使用的是同一套机制。

这也让创建块配置变得直接：先把块加载到工作区，按目标样式配置，再在控制台运行以下代码序列化。

::::tabs
::: tab JSON
```javascript
console.log(Blockly.serialization.workspaces.save(Blockly.getMainWorkspace()));
```
:::
::: tab XML
```xml
console.log(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
```
:::
::::

然后把序列化结果复制到工具箱定义中。注意移除 `x`、`y`、`id` 属性，这些属性在工具箱里会被忽略。

### 变量字段

变量字段在工具箱里的写法，可能与普通序列化结果不同。

特别是 JSON 序列化时，变量字段通常只保存变量 `ID`，因为变量名和类型会在别处单独序列化。但工具箱里没有这部分信息，所以需要在变量字段中直接写入名称和类型。

```javascript
{
  "kind": "flyoutToolbox",
  "content": [
    {
      "kind": "block",
      "type": "controls_for",
      "fields": {
        "VAR": {
          "name": "index",
          "type": "Number"
        }
      }
    }
  ]
}
```

## 阴影块

阴影块是占位块，主要作用包括：

- 表示父块的默认值。
- 允许用户直接输入值，而不必再拖一个数字块或文本块。
- 与普通块不同，用户拖入其他块时会替换阴影块。
- 提示用户该输入期望的数据类型。

::: warning 注意
阴影块不能包含变量字段，也不能有非阴影子块。
:::

创建阴影块时，`JSON` 使用 `shadow` 属性，`XML` 使用 `<shadow>` 标签，而不是 `block` 属性或 `<block>` 标签。  
例如，下面这个 `math_arithmetic` 块有两个连接在值输入上的 `math_number` 阴影块：

![带两个数字阴影块的 math_arithmetic 示例。](/static/blockly/images/toolboxes/1plus1.png)

对应工具箱配置如下：

::::tabs
::: tab JSON
```json
{
 "kind": "flyoutToolbox",
 "contents": [
   {
     "kind": "block",
     "type": "math_arithmetic",
     "fields": {
       "OP": "ADD"
     },
     "inputs": {
       "A": {
         "shadow": {
           "type": "math_number",
           "fields": {
             "NUM": 1
           }
         }
       },
       "B": {
         "shadow": {
           "type": "math_number",
           "fields": {
             "NUM": 1
           }
         }
       }
     }
   },
 ]
}
```
:::
::: tab XML
```xml
<xml id="toolbox" style="display: none">
 <block type="math_arithmetic">
   <field name="OP">ADD</field>
   <value name="A">
     <shadow type="math_number">
       <field name="NUM">1</field>
     </shadow>
   </value>
   <value name="B">
     <shadow type="math_number">
       <field name="NUM">1</field>
     </shadow>
   </value>
 </block>
</xml>
```
:::
::::
