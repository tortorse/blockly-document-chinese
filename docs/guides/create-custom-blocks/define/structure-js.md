# JavaScript 中的块结构

本文说明如何用 JavaScript API 定义块中的输入和字段（含标签）。  
如果你还不熟悉这些概念，先看[块的解剖](/guides/create-custom-blocks/define/block-anatomy)。

你也可以用 JSON 定义，见[JSON 中的块结构](/guides/create-custom-blocks/define/structure-json)。

## 追加输入

JavaScript API 为每种输入类型都提供了 `append` 方法：

```javascript
init: function() {
  // ...
  this.appendEndRowInput()
      .appendField('for each')
      .appendField('item')
      .appendField(new Blockly.FieldVariable(), 'VAR');
  this.appendValueInput('LIST')
      .setCheck('Array')
      .setAlign(Blockly.inputs.Align.RIGHT)
      .appendField('in list');
  this.appendStatementInput('DO')
      .appendField('do');
  this.appendDummyInput()
      .appendField('end');
}
```

![append 输入示意](/static/blockly/images/append-input.png)

每个 `appendInput` 方法都可以接收输入标识符字符串。代码生成器会通过这个标识符读取连接到该输入的代码。  
通常虚拟输入和换行输入很少在生成器里直接引用，因此一般不必给它们命名。

JavaScript API 还提供通用的 `appendInput`，用于追加自定义输入：

```javascript
init: function() {
  // ...
  this.appendInput(new MyCustomInput('INPUT_NAME'))
      .appendField('an example label');
}
```

所有 `appendInput`（通用与非通用）都会返回输入对象，因此可以继续链式配置。

## 追加字段

输入通过 `appendInput` 创建后，可以继续追加任意数量的字段。  
这些字段常用于标注输入用途。

```javascript
init: function() {
  // ...
  this.appendDummyInput()
      .appendField('hello');
}
```

![append 字段示意](/static/blockly/images/append-field.png)

最简单的字段是标签。Blockly 约定普通标签优先使用小写文本（专有名词除外，如 Google、SQL）。

同一输入行可包含多个字段，`appendField` 可以链式连续调用：

```javascript
init: function() {
  // ...
  this.appendDummyInput()
      .appendField('hello')
      .appendField(new Blockly.FieldLabel('Neil', 'person'));
}
```

![多个字段示意](/static/blockly/images/append-field-label.png)

`appendField('hello')` 实际是 `appendField(new Blockly.FieldLabel('hello'))` 的简写。  
只有在你要指定类名并用 CSS 做样式时，才通常需要显式写 `FieldLabel` 构造器。

## 连接检查

```javascript
init: function() {
  // ...
  this.appendValueInput('NUM')
      .setCheck('Number');
}
```

`setCheck` 用于连接类型检查。传 `null`（默认值）表示该输入可连接任意块。  
更多见[连接检查](/guides/create-custom-blocks/type-checks)。

## 字段对齐

```javascript
init: function() {
  // ...
  this.appendValueInput('LIST')
      .appendField('in list')
      .setAlign(Blockly.inputs.Align.RIGHT);
}
```

`setAlign` 用于控制输入内字段对齐，可选：

- `Blockly.inputs.Align.LEFT`
- `Blockly.inputs.Align.RIGHT`
- `Blockly.inputs.Align.CENTER`

在 RTL 模式（如阿拉伯语、希伯来语）中，左右会反转。  
因此 `Blockly.inputs.Align.RIGHT` 会表现为左对齐。
