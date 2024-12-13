# 定义块

块定义描述了块的外观和行为，包括文本，颜色，形状以及它可以连接的其他块。

::: tip 注意
可以使用 [Blockly 开发者工具](/guides/create-custom-blocks/blockly-developer-tools.html) 定义大多数块，而不是手动创建下面的代码。
:::

## JSON 格式与 JavaScript API

Blockly 有两种定义块的方式：JSON 对象和 JavaScript 函数。 JSON 格式旨在简化在开发具有不同单词顺序的语言时的 [本地化过程](/guides/create-custom-blocks/localize-blocks.html)。 JSON 格式是定义块的首选方法。

但是，JSON 格式无法直接定义高级功能，例如变形器或验证器。 这些必须通过平台原生代码: JavaScript，Java 或 Swift 编写，通常作为 [扩展](/guides/create-custom-blocks/extensions.html) 实现。

使用 Blockly 的原始 JavaScript 实现的应用程序也可以直接将块定义写入较低级别的 Blockly API 函数调用，如下面的各种 JavaScript 示例所示。

:::: tabs
::: tab JSON
```json
{
  "type": "string_length",
  "message0": 'length of %1',
  "args0": [
    {
      "type": "input_value",
      "name": "VALUE",
      "check": "String"
    }
  ],
  "output": "Number",
  "colour": 160,
  "tooltip": "Returns number of letters in the provided text.",
  "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
}
```
:::
::: tab JavaScript
```javascript
Blockly.Blocks['string_length'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck('String')
        .appendField('length of');
    this.setOutput(true, 'Number');
    this.setColour(160);
    this.setTooltip('Returns number of letters in the provided text.');
    this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
  }
};
```
`init` 函数创建块的形状。 在此功能的上下文中，关键字 `this` 是正在创建的实际块。
:::
::::


两个示例都加载相同的 'string_length' 块。

![](./text-length.png)

在 Web 上，使用 `initJson` 函数加载 JSON 格式。这也允许在 Blockly 网页中混合使用这两种格式。最好尽可能使用 JSON 定义块，并仅将 JavaScript 用于 JSON 不支持的块定义部分。

下面是一个主要使用JSON定义的块的示例，但是使用JavaScript API进行扩展以提供动态工具提示。

:::: tabs
::: tab JavaScript
```javascript
var mathChangeJson = {
  "message0": "change %1 by %2",
  "args0": [
    {"type": "field_variable", "name": "VAR", "variable": "item", "variableTypes": [""]},
    {"type": "input_value", "name": "DELTA", "check": "Number"}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230
};

Blockly.Blocks['math_change'] = {
  init: function() {
    this.jsonInit(mathChangeJson);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return 'Add a number to variable "%1".'.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  }
};
```
:::
::::

## 块颜色

块的主色由 JSON `colour` 属性，[block.setColour(...)](https://developers.google.com/blockly/reference/js/Blockly.Block#setColour) 函数定义，或通过使用 [主题](/guides/configure/themes.html) 并定义块样式来定义。

:::: tabs
::: tab JSON
```json
{
  // ...,
  "colour": 160,
}
```
:::
::: tab JavaScript
```javascript
init: function() {
  // ...
  this.setColour(160);
}
```
:::
::::

有关更多详细信息，请参见 [块颜色指南](/guides/create-custom-blocks/block-colour.html)。

## 语句连接

用户可以使用 `nextStatement` 和 `previousStatement` 连接器创建块序列。在 Blockly 的标准布局中，这些连接位于顶部和底部，并且块垂直堆叠。

具有前置连接器的块不能具有输出连接器，反之亦然。术语 *语句块* 指的是没有值输出的块。语句块通常具有前置连接和后续连接。

`nextStatement` 和 `previousStatement` 可以配置[类型](/guides/create-custom-blocks/type-checks.html) ，但标准块不使用此功能。

### 后续连接

在块的底部创建一个接口，以便其他语句可以堆叠在它下面。具有后续连接但没有前置连接的块通常表示事件，并且可以配置为使用 [帽子](/guides/create-custom-blocks/block-paradigms.html#事件驱动程序.html) 进行渲染 。

![](./set-next-statement.png)

:::: tabs
::: tab JSON
无类型:
```json
{
  ...,
  "nextStatement": null,
}
```
有类型(罕见):
```json
{
  "nextStatement": "Action",
  ...
}
```
:::
::: tab JavaScript
无类型:
```javascript
this.setNextStatement(true);  // false implies no next connector, the default
```
有类型(罕见):
```javascript
this.setNextStatement(true, 'Action');
```
:::
::::

### 前置连接

在块的顶部创建一个凹口，以便它可以作为一堆语句连接。

具有前置连接的块不能具有输出连接。

![](./set-previous-statement.png)

:::: tabs
::: tab JSON
无类型：
```json
{
  ...,
  "previousStatement": null,
}
```
有类型(罕见):
```json
{
  "previousStatement": "Action",
  ...
}
```
:::
::: tab JavaScript
无类型：
```javascript
this.setPreviousStatement(true);  // false implies no previous connector, the default
```
有类型(罕见):
```javascript
this.setPreviousStatement(true, 'Action');
```
:::
::::

## 块输出

一个块可以具有单个输出，表示为边缘上的凸形拼图连接器。输出连接到值输入。 具有输出的块通常称为 *值* 块。

![](./set-output.png)

:::: tabs
::: tab JSON
无类型：
```json
{
  // ...,
  "output": null,
}
```
有类型:
```json
{
  // ...,
  "output": "Number",
}
```
:::
::: tab JavaScript
```javascript
init: function() {
  // ...
  this.setOutput(true);
}
```
有类型:
```javascript
init: function() {
  // ...
  this.setOutput(true, 'Number');
}
```
:::
::::

具有输出连接器的块也不能具有前置语句槽口。
## 块输入

块具有一个或多个输入，其中每个输入是可以在连接中结束的标签和 [字段](/guides/create-custom-blocks/define-blocks.html#字段.html) 序列。有三种类型的输入，匹配连接类型：

- **值输入**：连接到一个 [输出连接](/guides/create-custom-blocks/define-blocks.html#块输出.html) 的 *值块*。`math_arithmetic` 块（加法，减法）是具有两个值输入一个块的例子。
- **语句输入**：连接到 [前置连接](/guides/create-custom-blocks/define-blocks.html#语句连接.html) 一个的 *语句块*。while 循环的嵌套部分是语句输入的示例。
- **虚拟输入**：没有块连接。当块配置为使用外部值输入时，其作用类似于换行符。

![](./input-types.png)

JSON 格式和 JavaScript API 使用略有不同的模型来描述其输入。

### JSON 中的输入和字段

JSON 定义的块被构造为一系列插值消息字符串（`message0`，`message1`，...），其中每个插值标记（`％1`，`％2`，...）是字段或输入端（因此，输入连接器在消息中的呈现位置）在匹配的JSON `argsN` 数组中。 此格式旨在简化国际化。

:::: tabs
::: tab JSON
```json
{
  "message0": "set %1 to %2",
  "args0": [
    {
      "type": "field_variable",
      "name": "VAR",
      "variable": "item",
      "variableTypes": [""]
    },
    {
      "type": "input_value",
      "name": "VALUE"
    }
  ]
}
```
:::
::::
![](./variables-set.png)

插值标记必须与 `args0` 数组完全匹配：无重复，无遗漏。 标记可以以任何顺序出现，这允许不同的语言更改块的布局。

插值标记两侧的文本是修剪空白的。使用该字符文本 `%`（例如，在引用百分比）时应该使用 `%%` 以便它不被解释为插值标记。

参数的顺序和参数类型定义块的形状。更改其中一个字符串可以完全更改块的布局。这在具有与英语不同的单词顺序的语言中尤为重要。考虑一种假设的语言，其中"set %1 to %2"（如上例所示）需要反过来说"put %2 in %1"。更改此一个字符串（并保持JSON的其余部分不变）将导致以下块：

参数的顺序和参数类型定义块的形状。更改这些字符串之一可以完全更改块的布局。 这对于与英语具有不同词序的语言尤其重要。考虑一种假设的语言，其中“`set ％1 to ％2`”（如上例中使用的）需要颠倒为说“`put %2 in %1`”。 更改此字符串（并使其余 JSON 保持不变）将产生以下块：

![](./variables-put.png)

Blockly自动更改字段的顺序，创建虚拟输入，并从外部输入切换到内部输入。

#### 参数(Args)

每个消息字符串均与相同编号的 `args` 数组配对。 例如，`message0` 与 `args0` 一起使用。 插值标记（`％1`，`％2`，...）引用 `args` 数组的项。每个对象都有一个 `type` 字符串。 其余参数取决于类型：

- [字段(Fields)](/guides/create-custom-blocks/define-blocks.html#字段.html):
    - `field_input`
    - `field_dropdown`
    - `field_checkbox`
    - `field_colour`
    - `field_number`
    - `field_angle`
    - `field_variable`
    - `field_date`
    - `field_label`
    - `field_image`.

- [输入(Inputs)](/guides/create-custom-blocks/define-blocks.html#块输入.html)：
    - `input_value`
    - `input_statement`
    - `input_dummy`

每个对象也可能都有一个 `alt` 字段。 如果 Blockly 无法识别对象的 `type`，则使用 `alt` 对象代替它。 例如，如果将一个名为 `field_time` 的新字段添加到 Blockly，则使用此字段的块可以使用 `alt` 来为较早版本的 Blockly 定义 `field_input` 备选项：

:::: tabs
::: tab JSON
```json
{
  "message0": "sound alarm at %1",
  "args0": [
    {
      "type": "field_time",
      "name": "TEMPO",
      "hour": 9,
      "minutes": 0,
      "alt":
        {
          "type": "field_input",
          "name": "TEMPOTEXT",
          "text": "9:00"
        }
    }
  ]
}
```
:::
::::

一个 `alt` 对象可以有自己的 `alt`对象，从而允许链接。最终，如果 Blockly 无法在 `args0` 数组中创建对象（尝试使用任何 `alt` 对象之后），则该对象将被跳过。

如果 `message` 字符串以文本或输入未包含的字段结尾，则虚拟输入将自动添加到块的末尾 。因此，如果块上的最后一个输入是虚拟输入，那么它可以从 `args` 数组中省略，并且不需要插到 `message` 中。自动添加尾随虚拟输入允许转换器更改 `message` 而无需修改其余的 JSON。请参阅本页前面的"`set %1 to %2`"（无虚拟输入）和"`put %2 in %1`"（虚拟输入添加）示例 。

#### lastDummyAlign0

在极少数情况下，自动创建的尾随虚拟输入需要与 `“RIGHT”` 或 `“CENTRE”` 对齐。如果未指定，则默认值为 `“LEFT”`。

在下面的示例中，`message0` 是 `"send email to %1 subject %2 secure %3"`，并且 Blockly 自动为第三行添加了一个虚拟输入。 将 `lastDummyAlign0` 设置为 `“RIGHT”` 会强制使该行右对齐。

![](./send-email.png)

在为 RTL（阿拉伯语和希伯来语）设计块时，左右是颠倒的。 因此，`“RIGHT”` 将使字段向左对齐。

#### message1, args1, lastDummyAlign1

一些块自然地分成两个或更多个单独的部分。考虑这个有两行的 repeat 块：

![](./repeat.png)

如果使用单个消息描述此块，则 `message0` 属性为 `"repeat %1 times %2 do %3"`。这个字符串对于翻译来说很尴尬，很难解释 `%2` 替换意味着什么。在某些语言中甚至可能甚至不需要 `％2` 虚拟输入。 并且可能有多个块希望共享第二行的文本。 更好的方法是让 JSON 使用多个消息和参数属性：

:::: tabs
::: tab JSON
```json
{
  "type": "controls_repeat_ext",
  "message0": "repeat %1 times",
  "args0": [
    {"type": "input_value", "name": "TIMES", "check": "Number"}
  ],
  "message1": "do %1",
  "args1": [
    {"type": "input_statement", "name": "DO"}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 120
}
```
:::
::::

可以使用 JSON 格式定义任意数量的 `message`，`args` 和 `lastDummyAlign` 属性，从 0 开始并按顺序递增。 请注意，“块工厂”无法将消息拆分为多个部分，但是手动进行很简单。
### JavaScript 中的输入和字段

JavaScript API包括每种输入类型的 `append` 方法：
:::: tabs
::: tab JavaScript
```javascript
this.appendDummyInput()
    .appendField('for each')
    .appendField('item')
    .appendField(new Blockly.FieldVariable());
this.appendValueInput('LIST')
    .setCheck('Array')
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField('in list');
this.appendStatementInput('DO')
    .appendField('do');
```
:::
::::

![](./append-input.png)

每种方法都可以采用一个标识符字符串，并由代码生成器使用。 虚拟输入很少需要引用，通常未设置标识符。

如上所示，每个方法都通过方法链返回输入对象以进行配置。有三个功能用于配置输入。

#### setCheck
:::: tabs
::: tab JavaScript
```javascript
input.setCheck('Number');
```
:::
::::
此可选功能用于连接输入的类型检查。 如果给定默认值为 null 的参数，则此输入可以连接到任何块。 有关详细信息，请参见 [类型检查](/guides/create-custom-blocks/type-checks.html)。

#### setAlign
:::: tabs
::: tab JavaScript
```javascript
input.setAlign(Blockly.ALIGN_RIGHT);
```
:::
::::

此可选功能用于对齐字段（请参见下文）。 可以将三个自描述值作为该函数的参数传递：`Blockly.ALIGN_LEFT`，`Blockly.ALIGN_RIGHT` 和 `Blockly.ALIGN_CENTRE`。 请注意 “centre” 的英文拼写。默认为左对齐。

在为 RTL（阿拉伯语和希伯来语）设计块时，左右是颠倒的。 因此，`Blockly.ALIGN_RIGHT` 会将字段向左对齐。

#### appendField

一旦创建了输入并将其附加到带有 `appendInput` 的块中，就可以选择将任意数量的 [字段](/guides/create-custom-blocks/define-blocks.html#字段.html) 附加到输入中。 这些字段通常用作标签来描述每个输入的用途。

:::: tabs
::: tab JavaScript
```javascript
input.appendField('hello');
```
:::
::::

![](./append-field.png)

最简单的字段元素是文本。Blockly的惯例是使用小写文本，但专有名称除外（例如Google，SQL）。

输入行可以包含任意数量的字段元素。 可以将多个 `appendField` 调用链接在一起，以有效地将多个字段添加到同一输入行。

:::: tabs
::: tab JavaScript
```javascript
input.appendField('hello')
     .appendField(new Blockly.FieldLabel('Neil', 'person'));
```
:::
::::

![](./append-field-label.png)

该 `appendField('hello')` 调用实际上是显式使用 `FieldLabel` 构造函数的快捷方式：`appendField(new Blockly.FieldLabel('hello'))`。唯一希望使用构造函数的时间是在指定类名称时，以便可以使用 CSS 规则设置文本样式。

### 内联与外部

块输入可以呈现为外部或内部。

![](./set-inputs-inline.png)

块定义可以指定一个可选的布尔值，用于控制输入是否为内联。 如果为 `false`，则任何值输入都将在外部（例如左侧的块）。 如果为 `true`，则任何值输入都将是内联的（例如上面的右侧块）。

:::: tabs
::: tab JSON
```json
{
  // ...,
  "inputsInline": true
}
```
:::
::: tab JavaScript
:::
```javascript
init: function() {
  // ...
  this.setInputsInline(true);
}
```
::::

如果没有定义，则 Blockly 将使用一些启发式方法来猜测哪种模式最佳。假设 Blockly 做出了正确的选择，将此字段保留为 undefined 是首选，因为不同的语言翻译可以自动具有不同的模式。请参阅本页前面的 `"set %1 to %2"`（外部输入）和 `"put %2 in %1"`（内联输入）的 JSON 示例。

当一个块可能有较小的输入（例如数字）时，请使用内联输入。 如果启用了 `collapse` 配置，则用户可以通过上下文菜单切换此选项（如果工具箱具有分类，则默认为`true`）。

## 字段

字段定义块中的UI元素。 这些包括字符串标签，图像和 [字面量](https://en.wikipedia.org/wiki/Literal_(computer_programming))（例如字符串和数字）的输入。 最简单的示例是 `math_number` 块，该块使用 `field_input` 来让用户键入数字。

![](./math-number.png)

Blockly 提供了许多内置字段，包括文本输入，颜色选择器和图像。您还可以创建自己的字段.

→ 更多信息参见 [内置字段](/guides/create-custom-blocks/fields/built-in-fields/overview.html)

→ 更多信息参见 [创建自定义字段](/guides/create-custom-blocks/fields/customizing-fields/overview.html)

## 提示

当用户将鼠标悬停在块上时，工具提示提供即时帮助。如果文本很长，它将自动换行。

:::: tabs
::: tab JSON
```json
{
  // ...,
  "tooltip": "Tooltip text."
}
```
:::
::: tab JavaScript
```js
init: function() {
  this.setTooltip("Tooltip text.");
}
```
:::
::::
在 JavaScript API 中，工具提示也可以定义为函数而不是静态字符串。 这样可以提供动态帮助。 请参见 `math_arithmetic`，以获取根据所选择的下拉选项而变化的工具提示的示例。

:::: tabs
::: tab JavaScript
```javascript
Blockly.Blocks['math_arithmetic'] = {
  init: function() {
    // ...

    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'ADD': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
        'MINUS': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
        'MULTIPLY': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
        'DIVIDE': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
        'POWER': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
      };
      return TOOLTIPS[mode];
    });
  }
};
```
:::
::::

使用JavaScript API，块可以指定一个函数，而不是静态字符串，它返回工具提示字符串。这样就能够允许动态工具提示。请参阅 `math_arithmetic` 示例。

## 帮助网址

块可以具有与它们关联的帮助页面。 右键单击该块并从上下文菜单中选择“帮助”，这对于 Blockly for Web 用户是可用的。 如果该值为 `null`，则菜单将显示为灰色。

:::: tabs
::: tab JSON
```json
{
  // ...,
  "helpUrl": "https://en.wikipedia.org/wiki/For_loop"
}
```
:::
::: tab JavaScript
```javascript
init: function() {
  // ...
  this.setHelpUrl('https://en.wikipedia.org/wiki/For_loop');
}
```
:::
::::

使用JavaScript API，块可以指定一个函数，而不是指定返回 URL 字符串的静态字符串，从而可以提供动态帮助。
## 更改监听器和验证器

块可以具有更改侦听器功能，这些更改侦听器功能可在工作空间的任何更改（包括与该块无关的功能）上调用。 这些主要用于设置块的警告文本，或在工作空间外部设置类似的用户通知。

通过使用函数调用 `setOnChange` 来添加该函数，如果您计划在所有平台上使用它，则可以在初始化期间设置或通过 [JSON 扩展](/guides/create-custom-blocks/mutators.html#扩展.html) 来完成。

:::: tabs
::: tab JSON
```javascript
{
  // ...,
  "extensions":["warning_on_change"],
}

Blockly.Extensions.register('warning_on_change', function() {
  // Example validation upon block change:
  this.setOnChange(function(changeEvent) {
    if (this.getInput('NUM').connection.targetBlock()) {
      this.setWarningText(null);
    } else {
      this.setWarningText('Must have an input block.');
    }
  });
});
```
:::
::: tab JavaScript
```javascript
Blockly.Blocks['block_type'] = {
  init: function() {
    // Example validation upon block change:
    this.setOnChange(function(changeEvent) {
      if (this.getInput('NUM').connection.targetBlock()) {
        this.setWarningText(null);
      } else {
        this.setWarningText('Must have an input block.');
      }
    });
  }
}
```
:::
::::
系统调用该函数，并传递 [change 事件](/guides/configure/events.html)。 在函数内部，`this` 是指块实例。

由于对任何更改都会调用该函数（如果使用），因此开发人员应确保侦听器快速运行。 还应该警惕可能会级联或循环回到侦听器的工作空间更改。

有关示例，请参见 `controls_flow_statements`，`logic_compare` 和 `procedures_ifreturn` 块。

请注意，可编辑字段具有其自己的事件侦听器，用于输入验证和引起副作用。

## 变形器

变形器允许高级块更改形状，最明显的是由于用户打开对话框以添加，删除或重新排列组件。 可以通过 JSON 使用 `mutator` 键添加变形器。

:::: tabs
::: tab JSON
```json
{
  // ...,
  "mutator":"if_else_mutator"
}
```
:::
::::

::: tip 注意
有关 [创建变形器](/guides/create-custom-blocks/mutators.html) 的更多信息
:::

## 块配置

块实例具有许多属性，用于配置它们对用户的行为方式。这些可以用于约束工作区以反映域的某些属性（例如，恰好有一个'开始'事件），或者集中用户精力（例如，教程）。

### 可删除状态

默认情况下，用户可以删除可编辑工作区（不是 `readOnly`）上的任何块。有时，使某些块永久固定是有用的。例如，教程框架代码。

```
block.setDeletable(false);
```
任何块，包括标记为不可删除的块，都可以通过编程方式删除：

:::: tabs
::: tab JavaScript(Web)
```javascript
block.dispose();
```
:::
::: tab Java(Android)
```java
blocklyController.removeBlockTree(block);
```
:::
::::

### 可编辑状态

```
block.setEditable(false);  // Web or Android
```
设置为 false 时，用户将无法更改块的字段（例如，下拉列表和文本输入）。块在可编辑工作区上默认为可编辑。

### 可移动状态

```
block.setMovable(false);  // Web or Android
```

设置为 false 时，用户将无法直接移动块。作为另一个块的子节点的不可移动块可能不会与该块断开连接，但如果移动父节点，它将与其父节点一起移动。

块默认为可在可编辑工作区上移动。

任何块（甚至是不可移动的块）一旦处在工作区中就可以以编程方式移动。在 JavaScript 中，调用 `block.moveBy(dx, dy)`。除非另行指定，否则工作空间上块的起始位置默认为（0,0）。

### Block数据 (Web Only)

```
this.data = '16dcb3a4-bd39-11e4-8dfc-aa07a5b093db';  // Web only
```

数据是附加到块的可选和任意字符串。当保存为 XML 时，数据字符串存储在 `<data></data>` 标记中，以便可以将其往返回到块。使用数据字符串将块与外部资源相关联或用于任何其他自定义目的。

请注意，如果块复制或复制/粘贴，则数据字符串也会重复。不可删除的块无法复制或复制/粘贴。