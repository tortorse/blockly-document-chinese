# 工具箱

工具箱是用户获取块的地方。通常它显示在工作区的一侧。有时它有类别，有时没有。

本页面主要关注如何指定工具箱的结构（即它包含哪些类别和块）。如果您想了解有关如何更改工具箱的 UI 的详细信息，请查看 [自定义 Blockly 工具箱 codelab](https://blocklycodelabs.dev/codelabs/custom-toolbox/index.html?index=..%2F..index#0) 和 [2021 Toolbox APIs talk](https://www.youtube.com/watch?v=JJVX_YuKDbo&list=PLSIUOFhnxEiCjoIwJ0jAdwpTZET73CK7d&index=9&t=1s)。

## 格式

Blockly 允许您使用几种不同的格式来指定工具箱的结构。新的推荐格式使用 JSON，而旧格式使用 XML。

![toolbox-minimal](./toolbox-minimal.png)

以下是指定上述工具箱的不同方法：

::::tabs
::: tab JSON
从 [2020 年 9 月发布版本](https://github.com/google/blockly/releases/tag/3.20200924.0) 开始，可以使用 JSON 定义工具箱：

```javascript
var toolbox = {
  kind: 'flyoutToolbox',
  contents: [
    {
      kind: 'block',
      type: 'controls_if'
    },
    {
      kind: 'block',
      type: 'controls_whileUntil'
    }
  ]
};
var workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox });
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
var toolbox =
  '<xml>' +
  '<block type="controls_if"></block>' +
  '<block type="controls_whileUntil"></block>' +
  '</xml>';
var workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox });
```

:::
::::

## 分类

工具箱中的块可以按类别组织。

![toolbox-categories](./toolbox-categories.png)

以下是您可以定义上述工具箱的方式，它有两个类别（'Control'和'Logic'），每个类别都包含块：

:::: tabs
::: tab JSON

```json
{
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
        {
          "kind": "block",
          "type": "controls_whileUntil"
        },
        {
          "kind": "block",
          "type": "controls_for"
        }
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
}
```

:::
::: tab XML

```XML
<xml id="toolbox" style="display: none">
  <category name="Control">
    <block type="controls_if"></block>
    <block type="controls_whileUntil"></block>
    <block type="controls_for">
  </category>
  <category name="Logic">
    <block type="logic_compare"></block>
    <block type="logic_operation"></block>
    <block type="logic_boolean"></block>
  </category>
</xml>
```

:::
::::

### 嵌套的分类

分类可以嵌套在其他分类中。这里有两个顶级分类（'Core' 和 'Custom'），每个分类包含两个子分类，每个子类别都包含块：

请注意，分类可以包含子分类和块。在上面的例子中，'Custom' 有两个子分类（'Move' 和 'Turn'），以及它自己的一个块（'start'）。
:::: tabs
::: tab JSON

```json
{
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Core",
      "contents": [
        {
          "kind": "category",
          "name": "Control",
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
            },
            {
              "kind": "block",
              "type": "move_backward"
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
            },
            {
              "kind": "block",
              "type": "turn_right"
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
    <category name="Control">
      <block type="controls_if"></block>
      <block type="controls_whileUntil"></block>
    </category>
    <category name="Logic">
      <block type="logic_compare"></block>
      <block type="logic_operation"></block>
      <block type="logic_boolean"></block>
    </category>
  </category>
  <category name="Custom">
    <block type="start"></block>
    <category name="Move">
      <block type="move_forward"></block>
      <block type="move_backward"></block>
    </category>
    <category name="Turn">
      <block type="turn_left"></block>
      <block type="turn_right"></block>
    </category>
  </category>
</xml>
```

:::
::::

### 动态分类

动态分类是根据每次打开时的函数动态重新填充的类别。

Blockly 允许您通过已注册的字符串键将类别与函数关联来支持此功能。该函数应返回类别内容的定义（包括块、按钮、标签等）。内容可以指定为 JSON 或 XML，但建议使用 JSON。

还要注意，该函数将目标工作区作为参数提供，因此您动态类别中的块可以基于工作区的状态。

:::: tabs
::: tab JSON
截至 2021 年 9 月发布版本，您可以在不使用 `blockxml` 的情况下指定块的状态。

```javascript
// Returns an array of objects.
var coloursFlyoutCallback = function(workspace) {
  // Returns an array of hex colours, e.g. ['#4286f4', '#ef0447']
  var colourList = getPalette();
  var blockList = [];
  for (var i = 0; i < colourList.length; i++) {
    blockList.push({
      'kind': 'block',
      'type': 'colour_picker',
      'fields': {
        'COLOUR': colourList[i]
      }
    });
  }
  return blockList;
};

// Associates the function with the string 'COLOUR_PALETTE'
myWorkspace.registerToolboxCategoryCallback(
    'COLOUR_PALETTE', coloursFlyoutCallback);
```
:::
::: tab Old JSON

在 2021 年 9 月发布之前，您必须使用 `blockxml` 属性来指定块的状态。

```javascript
// Returns an array of objects.
var coloursFlyoutCallback = function(workspace) {
  // Returns an array of hex colours, e.g. ['#4286f4', '#ef0447']
  var colourList = getPalette();
  var blockList = [];
  for (var i = 0; i < colourList.length; i++) {
    blockList.push({
      'kind': 'block',
      'type': 'colour_picker', // Type is optional if you provide blockxml
      'blockxml': '<block type="colour_picker">' +
          '<field name="COLOUR">' + colourList[i] + '</field>' +
          '</block>'
    });
  }
  return blockList;
};

// Associates the function with the string 'COLOUR_PALETTE'
myWorkspace.registerToolboxCategoryCallback(
    'COLOUR_PALETTE', coloursFlyoutCallback);
```
:::
::: tab XML
```javascript
// Returns an arry of XML nodes.
var coloursFlyoutCallback = function(workspace) {
  // Returns an array of hex colours, e.g. ['#4286f4', '#ef0447']
  var colourList = getPalette();
  var blockList = [];
  for (var i = 0; i < colourList.length; i++) {
    var block = document.createElement('block');
    block.setAttribute('type', 'colour_picker');
    var field = document.createElement('field');
    field.setAttribute('name', 'COLOUR');
    field.innerText = colourList[i];
    block.appendChild(field);
    blockList.push(block);
  }
  return blockList;
};

// Associates the function with the string 'COLOUR_PALETTE'
myWorkspace.registerToolboxCategoryCallback(
    'COLOUR_PALETTE', coloursFlyoutCallback);
```
:::
::::

将动态类别函数与字符串键（也称为注册）相关联后，您可以将此字符串键分配给类别定义的自定义属性，以使该类别成为动态类别。

::::tabs
::: tab JSON
```json
{
  "kind": "category",
  "name": "Colours",
  "custom": "COLOUR_PALETTE"
}
```
:::
::: tab XML
```xml
<category name="Colours" custom="COLOUR_PALETTE"></category>
```
:::
::::

#### 内置动态类别

Blockly 提供了两个内置的动态类别。其中一个创建变量类别，另一个创建过程（也称为函数）类别。它们的字符串键分别为 `VARIABLE` 和 `PROCEDURE`。您可以像这样将它们添加到您的工具箱中：

::::tabs
::: tab JSON
```json
{
  "kind": "category",
  "name": "Variables",
  "custom": "VARIABLE"
},
{
  "kind": "category",
  "name": "Functions",
  "custom": "PROCEDURE"
}
```
:::
::: tab XML
```xml
<category name="Variables" custom="VARIABLE"></category>
<category name="Functions" custom="PROCEDURE"></category>
```
:::
::::

*注意：在 Blockly 代码库中，使用单词 “procedure” 表示过程和函数，但是学生更容易理解 “function”。对于不匹配的情况我们表示抱歉。*

### 禁用某个分类

禁用某个分类将不允许用户点击该分类，如果用户使用键盘操作工具箱，则将跳过该分类。 

```javascript
var category = toolbox.getToolboxItems()[0];
category.setDisabled('true');
```

当一个类别被禁用时，一个 `'disabled'` 属性会被添加到 DOM 元素中，这允许你控制禁用类别的外观。

```css
.blocklyToolboxCategory[disabled="true"] {
  opacity: .5;
}
```

### 显示/隐藏分类

分类可以在首次注入工具箱时隐藏，也可以在之后通过 JavaScript 隐藏。

:::: tabs
::: tab JSON

```json
{
  "kind": "category",
  "name": "...",
  "hidden": "true"
}
```

:::
::: tab XML

```xml
<category name="..." hidden="true"></category>
```

:::
::: tab JavaScript

```javascript
var category = toolbox.getToolboxItems()[0];
category.hide();
// etc...
category.show();
```
:::
::::

### 展开

这仅适用于包含其他 [嵌套类别](#嵌套的分类) 的类别。

展开的类别将显示其子类别。默认情况下，嵌套类别是折叠的，需要点击才能展开。

:::: tabs
::: tab JSON

```json
{
  "kind": "category",
  "name": "...",
  "expanded": "true"
}
```
:::
::: tab XML

```xml
<category name="..." expanded="true"></category>
```
:::
::::

### 样式

Blockly 提供了一个默认的类别 UI，并提供了一些基本的样式选项。如果您想了解更高级的 UI 样式/配置信息，请查看 [Customizing a Blockly toolbox codelab](https://blocklycodelabs.dev/codelabs/custom-toolbox/index.html?index=..%2F..index#0) 和 [2021 Toolbox APIs talk](https://www.youtube.com/watch?v=JJVX_YuKDbo&list=PLSIUOFhnxEiCjoIwJ0jAdwpTZET73CK7d&index=9&t=1s)。

![toolbox-colours](./toolbox-colours.png)

#### 主题

如果您已经开始使用 Blockly 主题，那么您将需要添加 `categorystyle` 属性而不是 `colour` 属性，如下所示。

[主题](/guides/configure/themes.html) 可以一次性指定工作区的所有颜色，包括类别的颜色。

要使用主题，您必须将类别与特定的类别样式关联起来。

:::: tabs
::: tab JSON

```json
{
  "kind": "category",
  "name": "Logic",
  "categorystyle": "logic_category"
}
```
:::
::: tab XML

```xml
<category name="Logic" categorystyle="logic_category"></category>
```
:::
::::

#### 颜色

可以使用可选的 `colour` 属性为每个分类分配一种颜色。 请注意英式拼写。`colour` 的值是定义色调的数字（0-360）。

:::: tabs
::: tab JSON

```json
{
  "contents": [
    {
      "kind": "category",
      "name": "Logic",
      "colour": "210"
    },
    {
      "kind": "category",
      "name": "Loops",
      "colour": "120"
    }
  ]
}
```
:::
::: tab XML

```xml
<xml id="toolbox" style="display: none">
  <category name="Logic" colour="210">...</category>
  <category name="Loops" colour="120">...</category>
  <category name="Math" colour="230">...</category>
  <category name="Colour" colour="20">...</category>
  <category name="Variables" colour="330" custom="VARIABLE"></category>
  <category name="Functions" colour="290" custom="PROCEDURE"></category>
</xml>
```
:::
::::

请注意，我们还支持使用本地化的 [颜色参考](/guides/create-custom-blocks/block-colour.html#颜色参考)。

#### 分类 CSS

如果您想进行更强大的自定义操作，Blockly 还允许您为默认 UI 的不同元素指定 CSS 类。然后，您可以使用 CSS 对这些元素进行样式设置。

以下元素类型可以应用 CSS 类：

- container - 分类父级 div 的类。默认为 `blocklyToolboxCategory`。

- row - 包含分类标签和图表组的 div 类. 默认为 `blocklyTreeRow`。

- icon - 分类图标的类。默认为 `blocklyTreeIcon`。

- label - 分类标签的类。 默认为 `blocklyTreeLabel`。

- selected - 分类被选中时添加的类。 默认为 `blocklyTreeSelected`。

- openicon - 当嵌套的分类打开时被添加的类。默认为 `blocklyTreeIconOpen`。

- closedicon - 当嵌套的分类关闭时被添加的类。 默认为 `blocklyTreeIconClosed`。

以下是如何使用任一格式指定类的方法：

:::: tabs
::: tab JSON
使用 cssConfig 属性来设置特定元素类型的 CSS 类。
```json
{
  "kind": "category",
  "name": "...",
  "cssConfig": {
    "container": "yourClassName"
  }
}
```
:::
::: tab XML
通过在特定元素类型前添加“css-”来设置它的CSS类。
```xml
<category name="..." css-container="yourClassName"></category>
```
:::
::::

### 访问分类

有两种方法可以通过编程方式访问类别。您可以通过索引访问它（其中 0 是顶级类别）：

```javascript
var category = toolbox.getToolboxItems()[0];
```

或者通过 ID

```javascript
var category = toolbox.getToolboxItemById('categoryId');
```

其中ID在工具箱定义中指定:

:::: tabs
::: tab JSON
```json
{
  "kind": "category",
  "name": "...",
  "toolboxitemid": "categoryId"
}
```
:::
::: tab XML

```xml
<category name="..." toolboxitemid="categoryId"></category>
```
:::
::::

## 预设块

工具箱定义可以包含将字段设置为默认值的块，或者包含已经连接在一起的块。

下面是四个块：

1. 一个简单的无预设值的 `logic_boolean` 块：

   ![true](./true.png)

2. 经过修改以显示数字 42 而不是默认值 0 的 `math_number` 块：

   ![42](./42.png)

3) 一个 `controls_for` 块，具有三个与之相连的 `math_number` 块：

   ![count-with](./count-with.png)

4) 一个 `math_arithmetic` 块，其中连接了两个 `math_number` [影子块](/guides/configure/toolbox#影子块.html)：

   ![1plus1](./1plus1.png)

以下是在工具箱中生成这四个块的代码：

::::tabs
::: tab JSON
从2021年9月版本开始，您可以在不使用 `blockxml` 的情况下指定块的状态。
```json
{
  "kind": "flyoutToolbox",
  "contents": [
    {
      "kind": "block",
      "type": "logic_boolean"
    },
    {
      "kind": "block",
      "type": "math_number",
      "fields": {
        "NUM": 42
      }
    },
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
::: tab OldJSON
在2021年9月版本之前，您必须使用 `blockxml` 属性来指定块的状态。
```json
{
  "kind": "flyoutToolbox",
  "contents": [
    {
      "kind": "block",
      "type": "logic_boolean"
    },
    {
      "kind": "block",
      "blockxml":
          '<block type="math_number">' +
          '<field name="NUM">42</field>' +
          '</block>'
    },
    {
      "kind": "block",
      "blockxml":
          '<block type="controls_for">' +
            '<value name="FROM">' +
              '<block type="math_number">' +
                '<field name="NUM">1</field>' +
              '</block>' +
            '</value>' +
            '<value name="TO">' +
              '<block type="math_number">' +
                '<field name="NUM">10</field>' +
              '</block>' +
            '</value>' +
            '<value name="BY">' +
              '<block type="math_number">' +
                '<field name="NUM">1</field>' +
              '</block>' +
            '</value>' +
          '</block>'
    },
    {
      "kind": "block",
      "blockxml":
          '<block type="math_arithmetic">' +
            '<field name="OP">ADD</field>' +
            '<value name="A">' +
              '<shadow type="math_number">' +
                '<field name="NUM">1</field>' +
              '</shadow>' +
            '</value>' +
            '<value name="B">' +
              '<shadow type="math_number">' +
                '<field name="NUM">1</field>' +
              '</shadow>' +
            '</value>' +
          '</block>'
    },
  ]
}
```
:::
::: tab XML
```xml
<xml id="toolbox" style="display: none">
  <block type="logic_boolean"></block>

  <block type="math_number">
    <field name="NUM">42</field>
  </block>

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

手动编写这些定义可能有点麻烦。相反，您可以将块加载到工作区中，然后运行以下代码以获取定义。这些调用起作用是因为工具箱使用与序列化系统相同的块格式。

::::tabs
::: tab JSON
```javascript
console.log(Blockly.serialization.workspaces.save(Blockly.getMainWorkspace()));
```
:::
::: tab XML
```javascript
console.log(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
```
:::
::::

您也可以删除 x、y 和 id 属性，因为这些属性在工具箱中会被忽略。

## 影子块

影子块是执行以下功能的占位符块：

- 它们指示其父块的默认值。

- 它们允许用户直接键入值，而无需获取数字或字符串块。

- 与常规块不同，如果用户在其上放置块，则会替换它们。

- 它们告知用户预期的值类型。

::: tip 注意
影子块可能不包含变量字段或具有不是影子块的子项。
:::

### 禁用的块

禁用的块无法从工具箱中拖动。可以使用可选的 `disabled` 属性单独禁用块。

![toolbox-disabled](./toolbox-disabled.png)

:::: tabs
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

您还可以通过使用 `setEnabled` 的编程方式禁用或启用块。

## 变量字段

当变量字段在工具箱中和简单序列化时，可能需要以不同的方式指定。

特别是，当变量字段通常序列化为 JSON 时，它们只包含它们所代表的变量的 ID，因为变量的名称和类型是单独序列化的。但是，工具箱不包含该信息，因此需要直接在变量字段中包含它。

```json
{
  "kind": "flyoutToolbox",
  "content": [
    {
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

## 分隔符

在任何两个分类之间添加分隔符将在这两个类别之间创建一行并留出额外的空间。

![toolbox-separator](./toolbox-separator.png)

您可以在 JSON 或 XML 工具箱定义中更改分隔符的类。

:::: tabs
::: tab JSON

```json
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

在任意两个块之间添加分隔符将在两个块之间创建间隙。 默认情况下，每个块与其下相邻块相距 24 个像素。 可以使用 'gap' 属性更改此间距，该属性将替换默认间距。

![toolbox-gap](./toolbox-gap.png)

这使您可以在工具箱中创建逻辑块的分组。

:::: tabs
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
      "kind": "sep",
      "gap": "32"
    },
    {
      "kind": "block",
      "blockxml": "<block type='math_arithmetic'><field name='OP'>ADD</field></block>"
    },
    {
      "kind": "sep",
      "gap": "8"
    },
    {
      "kind": "block",
      "blockxml": "<block type='math_arithmetic'><field name='OP'>MINUS</field></block>"
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

## 按钮和标签

您可以在工具箱中可以放置块的任何地方放置按钮或标签。

![label-and-button](./label-and-button.png)

:::: tabs
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
      "text": "A label",
      "web-class": "myLabelStyle"
    },
    {
      "kind": "label",
      "text": "Another label"
    },
    {
      "kind": "block",
      "type": "logic_negate"
    },
    {
      "kind": "button",
      "text": "A button",
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
  <label text="A label" web-class="myLabelStyle"></label>
  <label text="Another label"></label>
  <block type="logic_negate"></block>
  <button text="A button" callbackKey="myFirstButtonPressed"></button>
  <block type="logic_boolean"></block>
</xml>
```
:::
::::

```html
<style>
  .myLabelStyle > .blocklyFlyoutLabelText {
    font-style: italic;
    fill: green;
  }
</style>
```

您可以指定要应用于按钮或标签的 CSS 类名称。在上面的示例中，第一个标签使用自定义样式，而第二个标签使用默认样式。

按钮应该有回调函数，而标签不需要。要为给定按钮设置回调函数，使用

```JavaScript
yourWorkspace.registerButtonCallback(yourCallbackKey, yourFunction).
```

您的函数应接受点击的按钮作为参数。 变量类别中的 “创建变量...” 按钮是带有回调的按钮的一个很好的例子。

## 更改工具箱

应用程序可以通过单个函数调用随时更改工具箱中可用的块：

```JavaScript
workspace.updateToolbox(newTree);
```

与初始配置期间的情况一样，`newTree` 可以是节点树或字符串表达或 JSON 对象。唯一的限制是不能更改模式;也就是说，如果最初定义的工具箱中有分类，则新工具箱也必须具有分类（尽管分类可能会更改）。同样，如果最初定义的工具箱没有任何分类，则新工具箱可能没有任何分类。

可以通过以下方式更新单个分类的内容：

```javascript
var category = toolbox.getToolboxItems()[0];
category.updateFlyoutContents(flyoutContents);
```

其中 flyoutContents 可以是使用 JSON 定义的块列表，节点树或字符串表达。

请注意，此时更新工具箱会导致一些次要的 UI 重置：

- 在没有类别的工具箱中，用户更改的任何字段（例如下拉列表）将恢复为默认值。

这是一个包含分类和块组的分类树 [在线示例](https://blockly-demo.appspot.com/static/demos/toolbox/index.html)。
