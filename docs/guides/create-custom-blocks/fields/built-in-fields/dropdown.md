# 下拉菜单字段

下拉菜单字段存储一个字符串作为其值，并存储一个字符串作为其文本。该值是一个语言中性键，将用于访问文本，不会在 Blockly 之间切换语言时进行翻译。该文本是用户可理解的字符串。

#### 下拉菜单字段

![](./dropdown/on_block.png)

#### 打开编辑器的下拉字段

![](./dropdown/with_editor.png)

#### 收起的块上的下拉字段

![](./dropdown/collapsed.png)

## 创建

下拉菜单构造函数可接受菜单生成器和可选的 [校验器](#creating_a_dropdown_validator)。菜单生成器具有很大的灵活性，但本质上是选项数组，每个选项都包含一个人类可读懂的部分和一个语言中性字符串。

### 简单的文本下拉菜单

![Open dropdown with two text options](./dropdown/with_editor.png)

:::: tabs
::: tab JSON

```json
{
  "type": "example_dropdown",
  "message0": "drop down: %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "FIELDNAME",
      "options": [
        ["first item", "ITEM1"],
        ["second item", "ITEM2"]
      ]
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_dropdown'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('drop down:')
      .appendField(
        new Blockly.FieldDropdown([
          ['first item', 'ITEM1'],
          ['second item', 'ITEM2']
        ]),
        'FIELDNAME'
      );
  }
};
```

:::
::::

通过让人类可读的信息与语言中立键分开，可以在不同语言之间保留下拉菜单的设置。例如，英语版本的块可以定义 `[['left', 'LEFT'], ['right', 'RIGHT]]`，而相同块的德语版本可以定义 `[['links', 'LEFT'], ['rechts', 'RIGHT]]`。

### 图片下拉菜单

下拉菜单中的选项可能是图片，而不是文本。映像对象通过 `src`、`width`、`height` 和 `alt` 属性指定。

请注意，尽管某个下拉列表可以同时包含文本选项和图片选项，但单个选项目前不能同时包含图片和文字。

![Dropdown field containing images and text](./dropdown/with_images.png)

::::tabs
::: tab JSON

```json
{
  "type": "image_dropdown",
  "message0": "flag %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "FLAG",
      "options": [
        ["none", "NONE"],
        [
          { "src": "canada.png", "width": 50, "height": 25, "alt": "Canada" },
          "CANADA"
        ],
        [{ "src": "usa.png", "width": 50, "height": 25, "alt": "USA" }, "USA"],
        [
          { "src": "mexico.png", "width": 50, "height": 25, "alt": "Mexico" },
          "MEXICO"
        ]
      ]
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['image_dropdown'] = {
  init: function() {
    var input = this.appendDummyInput().appendField('flag');
    var options = [
      ['none', 'NONE'],
      [{ src: 'canada.png', width: 50, height: 25, alt: 'Canada' }, 'CANADA'],
      [{ src: 'usa.png', width: 50, height: 25, alt: 'USA' }, 'USA'],
      [{ src: 'mexico.png', width: 50, height: 25, alt: 'Mexico' }, 'MEXICO']
    ];
    input.appendField(new Blockly.FieldDropdown(options), 'FLAG');
  }
};
```

:::
::::

### 动态下拉列表

![Dropdown field with days of the week](./dropdown/dynamic.png)
::::tabs
::: tab JSON

```json
{
  "type": "dynamic_dropdown",
  "message0": "day %1",
  "args0": [
    {
      "type": "input_dummy",
      "name": "INPUT"
    }
  ],
  "extensions": ["dynamic_menu_extension"]
}
```

```javascript
Blockly.Extensions.register('dynamic_menu_extension', function() {
  this.getInput('INPUT').appendField(
    new Blockly.FieldDropdown(function() {
      var options = [];
      var now = Date.now();
      for (var i = 0; i < 7; i++) {
        var dateString = String(new Date(now)).substring(0, 3);
        options.push([dateString, dateString.toUpperCase()]);
        now += 24 * 60 * 60 * 1000;
      }
      return options;
    }),
    'DAY'
  );
});
```
此操作使用 JSON [扩展程序](/guides/create-custom-blocks/extensions) 完成。
:::
::: tab JavaScript

```javascript
Blockly.Blocks['dynamic_dropdown'] = {
  init: function() {
    var input = this.appendDummyInput()
      .appendField('day')
      .appendField(new Blockly.FieldDropdown(this.generateOptions), 'DAY');
  },

  generateOptions: function() {
    var options = [];
    var now = Date.now();
    for (var i = 0; i < 7; i++) {
      var dateString = String(new Date(now)).substring(0, 3);
      options.push([dateString, dateString.toUpperCase()]);
      now += 24 * 60 * 60 * 1000;
    }
    return options;
  }
};
```

:::
::::
系统还可以为函数提供下拉菜单，而不是静态列表，从而使选项可以动态变化。该函数应返回一个采用静态选项的 `[human-readable-value, language-neutral-key]` 格式的选项数组。每次点击下拉菜单，系统都会运行函数并重新计算选项。

:::tip
**注意**：动态下拉菜单不会发生 [前缀后缀匹配](#前缀后缀匹配)。
:::

## 序列化

::::tabs
::: tab JSON
下拉菜单字段的 JSON 如下所示：

```json
{
  "fields": {
    "FIELDNAME": "LANGUAGE-NEUTRAL-KEY"
  }
}
```

其中 `FIELDNAME` 是引用下拉菜单字段的字符串，值是应用于该字段的值。该值应为中性选项键。
:::
::: tab XML
下拉菜单字段的 XML 如下所示：

```xml
<field name="FIELDNAME">LANGUAGE-NEUTRAL-KEY</field>
```

其中，字段的 `name` 属性包含引用下拉菜单字段的字符串，内部文本是应用于该字段的值。内部文本应为有效的语言中性选项键。

:::
::::

## 自定义

### 下拉箭头

`Blockly.FieldDropdown.ARROW_CHAR` 属性可用于更改表示下拉箭头的 Unicode 字符。

![Dropdown field with custom arrow](./dropdown/customized_arrow.png)

`ARROW_CHAR` 属性在 Android 上默认为 `\u25BC` (▼)，在其他情况下默认为 `\u25BE` (▾)。

这是一个全局属性，因此会在设置时修改所有下拉菜单字段。

### 菜单高度

`Blockly.FieldDropdown.MAX_MENU_HEIGHT_VH` 属性可用于更改菜单的最大高度。它定义为视口高度的百分比，视口就是窗口。

`MAX_MENU_HEIGHT_VH` 属性默认为 0.45。

这是一个全局属性，因此会在设置时修改所有下拉菜单字段。

## 前缀后缀匹配

如果所有下拉菜单选项共用相同的前缀和/或后缀字词，系统会自动分离这些字词并将其作为静态文本插入。例如，您可以通过以下两种方法创建相同的块（第一种方式没有后缀匹配，第二种方式使用后缀）：

没有后缀匹配：
::::tabs
::: tab JSON

```json
{
  "type": "dropdown_no_matching",
  "message0": "hello %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "MODE",
      "options": [
        ["world", "WORLD"],
        ["computer", "CPU"]
      ]
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['dropdown_no_matching'] = {
  init: function() {
    var options = [
      ['world', 'WORLD'],
      ['computer', 'CPU']
    ];

    this.appendDummyInput()
      .appendField('hello')
      .appendField(new Blockly.FieldDropdown(options), 'MODE');
  }
};
```

:::
::::

使用后缀匹配时：

::::tabs
::: tab JSON

```json
{
  "type": "dropdown_with_matching",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "MODE",
      "options": [
        ["hello world", "WORLD"],
        ["hello computer", "CPU"]
      ]
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['dropdown_with_matching'] = {
  init: function() {
    var options = [
      ['hello world', 'WORLD'],
      ['hello computer', 'CPU']
    ];

    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown(options),
      'MODE'
    );
  }
};
```

:::
::::
![Dropdown field with "hello" as a label and "world", "computer" as options](./dropdown/prefix_matched.png)

这种方法的一个优势是，该代码块更易于翻译成其他语言。之前的代码具有字符串 `'hello'`、`'world'` 和 `'computer'`，而修改后的代码具有字符串 `'hello world'` 和 `'hello computer'`。译员翻译短语的时间要比单独翻译短语容易得多。

这种方法的另一个优势是，字词顺序往往因语言而异。假设某个语言使用 `'world hello'` 和 `'computer hello'`。后缀匹配算法会检测通用 `'hello'`，并在下拉菜单后面显示该匹配项。

但是，前缀/后缀匹配有时会失败。在某些情况下，两个单词应始终组合在一起，并且不应考虑前缀。例如，`'drive red car'` 和 `'drive red truck'` 应该只有 `'drive'` 被分解，而没有 `'drive red'`。Unicode 不间断空格 `'\u00A0'` 可以代替常规空格来抑制前缀/后缀匹配器。因此，可以使用 `'drive red\u00A0car'` 和 `'drive red\u00A0truck'` 修复上面的示例。

前缀/后缀匹配失败的另一个位置是语言，不以空格分隔各个字词。中文就是一个很好的例子。字符串 `'訪問中國'` 表示 `'visit China'`，请注意字词之间缺少空格。后两个字符 (`'中國'`) 共同表示 `'China'` 的单词，但如果拆分，这两个符号分别表示 `'centre'` 和 `'country'`。为了使前缀/后缀匹配在中文等语言中正常工作，只需在空格处插入一个空格即可。例如，`'訪問 中國'` 和 `'訪問 美國'` 会生成 `"visit [China/USA]"`，而 `'訪問 中 國'` 和 `'訪問 美 國'` 会生成 `"visit [centre/beautiful] country"`。

## 创建下拉菜单校验器

:::tip
**注意**：如需查看有关校验器的一般信息，请参阅 [校验器](/guides/create-custom-blocks/fields/validators)。
:::
下拉菜单字段的值是与语言无关的字符串，因此任何验证工具都必须接受字符串并返回字符串_这是一个可用选项_、`null` 或 `undefined`。

如果校验器返回任何其他内容，Blockly 的行为将处于未定义状态，并且程序可能会崩溃。

例如，您可以使用三个选项和一个校验器定义下拉菜单字段，如下所示：

```javascript
validate: function(newValue) {
  this.getSourceBlock().updateConnections(newValue);
  return newValue;
},

init: function() {
  var options = [
   ['has neither', 'NEITHER'],
   ['has statement', 'STATEMENT'],
   ['has value', 'VALUE'],
  ];

  this.appendDummyInput()
  // Pass the field constructor the options list, the validator, and the name.
      .appendField(new Blockly.FieldDropdown(options, this.validate), 'MODE');
}
```

`validate` 始终返回所传递的值，但它会调用辅助函数 `updateConnection`，该函数会根据下拉菜单值添加或移除输入：

```javascript
updateConnections: function(newValue) {
  this.removeInput('STATEMENT', /* no error */ true);
  this.removeInput('VALUE', /* no error */ true);
  if (newValue == 'STATEMENT') {
    this.appendStatementInput('STATEMENT');
  } else if (newValue == 'VALUE') {
    this.appendValueInput('VALUE');
  }
}
```

![](./dropdown/validator.gif)
