# JSON 中的块结构

本文说明如何用 JSON 定义块中的输入、字段（含标签）和连接。  
如果你还不熟悉这些概念，先看[块的解剖](/guides/create-custom-blocks/define/block-anatomy)。

你也可以用 JavaScript 定义，见[JSON 和 JavaScript](/guides/create-custom-blocks/define/json-and-js)。

## 总览

在 JSON 中，块结构由一组 `message` 字符串和对应的 `args` 数组描述：

- `message0`、`message1` ...
- `args0`、`args1` ...

`message` 里包含普通文本和插值标记（`%1`、`%2` ...）：

- 普通文本会变成标签字段。
- 插值标记用于标出“非标签字段”或“输入连接”的位置。
- 具体类型和参数由 `args` 数组中对应位置的对象决定。

例如下面这个“变量赋值”块：

![变量赋值块](/static/blockly/images/variables-set.png)

```javascript
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

上例里：

- `%1` 对应 `args0` 第 1 项，是变量字段 `field_variable`。
- `%2` 对应 `args0` 第 2 项，是值输入 `input_value` 的连接位置。

## message 与输入

当插值标记表示连接时，它实际标的是“某个输入的末端”，因为值输入和语句输入的连接都在输入末端渲染。  
该输入会包含“上一个输入之后直到当前标记之前”的所有字段。

### 示例 1

```javascript
{
  "message0": "set %1 to %2",
  "args0": [
    {"type": "field_variable", ...}, // %1
    {"type": "input_value", ...}     // %2
  ]
}
```

会生成 1 个值输入，里面有 3 个字段：`set` 标签、变量字段、`to` 标签。

![示例 1](/static/blockly/images/structure-json/set-one-to-two.png)

### 示例 2

```javascript
{
  "message0": "%1 + %2",
  "args0": [
    {"type": "input_value", ...}, // %1
    {"type": "input_value", ...}  // %2
  ]
}
```

会生成 2 个值输入：第 1 个没有字段，第 2 个包含 `+` 标签。

![示例 2](/static/blockly/images/structure-json/one-plus-two.png)

### 示例 3

```javascript
{
  "message0": "%1 + %2 %3",
  "args0": [
    {"type": "input_value", ...},   // %1
    {"type": "input_end_row", ...}, // %2
    {"type": "input_value", ...}    // %3
  ]
}
```

会生成：

- 一个无字段的值输入；
- 一个带 `+` 标签的换行输入；
- 一个无字段的值输入（被换到下一行）。

![示例 3](/static/blockly/images/structure-json/one-plus-two-three.png)

## message 末尾的虚拟输入

如果 `message` 末尾是文本或字段，不必显式给它写 `input_dummy`，Blockly 会自动补一个尾部虚拟输入。

例如下面是“手动写虚拟输入”的方式：

```javascript
{
  "message0": "%1 is empty %2",
  "args0": [
    {"type": "input_value", ...}, // %1
    {"type": "input_dummy", ...}  // %2
  ]
}
```

![手动虚拟输入](/static/blockly/images/structure-json/is-empty-dummy.png)

可以简化为：

```javascript
{
  "message0": "%1 is empty",
  "args0": [
    {"type": "input_value", ...} // %1
  ]
}
```

![自动虚拟输入](/static/blockly/images/structure-json/is-empty.png)

这样有利于翻译：修改 `message` 时通常不需要同步改 `args`。

### implicitAlign

少数情况下，自动补出来的尾部虚拟输入需要对齐到 `"RIGHT"` 或 `"CENTRE"`（默认是 `"LEFT"`）。

例如 `message0` 为 `"send email to %1 subject %2 secure %3"` 时，Blockly 会自动补第三行的虚拟输入；设置 `implicitAlign0: "RIGHT"` 可强制这行右对齐。

![implicitAlign 示例](/static/blockly/images/send-email.png)

`implicitAlign` 作用于所有“未显式定义”的输入，包括由 `\n` 替换产生的换行输入。  
已弃用的 `lastDummyAlign0` 与 `implicitAlign0` 行为一致。

在 RTL 语言中左右方向会反转，因此 `"RIGHT"` 实际会把字段对齐到左侧。

## 多条 message

有些块天然由多个部分组成，适合拆成多条 `message` 与 `args`。  
例如这个重复块有两行：

![重复块](/static/blockly/images/repeat.png)

若只写成一条 `message0: "repeat %1 times %2 do %3"`，其中 `%2` 是换行输入，这对翻译不友好，也不利于复用第二行文案。更推荐拆分：

```javascript
{
  "message0": "repeat %1 times",
  "args0": [
    {"type": "input_value", ...} // message0 的 %1
  ],
  "message1": "do %1",
  "args1": [
    {"type": "input_statement", ...} // message1 的 %1
  ]
}
```

![多条 message 示例](/static/blockly/images/structure-json/controls-repeat-ext.png)

`message`、`args`、`implicitAlign` 可以定义任意多组，编号从 0 开始连续递增。

## 插值标记顺序

做本地化时，经常需要调整插值标记顺序。  
例如把 `"set %1 to %2"` 改成类似 `"put %2 in %1"` 的语序，只改 `message` 并保持 `args` 不变即可。

![原语序](/static/blockly/images/variables-set.png)
![调整后语序](/static/blockly/images/variables-put.png)

Blockly 会自动重排字段、必要时补虚拟输入，并可能在内联与外部输入之间自动切换。  
更多可见[翻译与本地化](/guides/configure/translations)。

## 文本处理

- 插值标记两侧文本会自动去掉多余空白。
- 文字里需要写 `%` 本身时，用 `%%`，避免被当作插值标记。
- `message` 里的换行符 `\n` 会被自动替换为换行输入。

```javascript
{
  "message0": "set %1\nto %2",
  "args0": [
    {"type": "field_variable", ...}, // %1
    {"type": "input_value", ...}     // %2
  ]
}
```

![换行符替换示例](/static/blockly/images/structure-json/newline-character.png)

## 参数数组 args

每条 `messageN` 都必须配套 `argsN`。  
`%1`、`%2` ... 指向 `argsN` 中的第 1、2... 个对象，必须一一对应，不能重复和缺失。

关键点：**标记数字按 `args` 数组顺序解释，不要求在 `message` 里按出现顺序排列。**

`args` 里每个对象都要有 `type`，其余属性随类型变化。

常见字段类型：

- `field_input`
- `field_dropdown`
- `field_checkbox`
- `field_colour`
- `field_number`
- `field_angle`
- `field_variable`
- `field_label`
- `field_image`

常见输入类型：

- `input_value`
- `input_statement`
- `input_dummy`
- `input_end_row`

你也可以传自定义字段和自定义输入，当前可先参考：

- [字段总览](/guides/create-custom-blocks/fields/overview)
- [输入总览](/guides/create-custom-blocks/inputs/overview)

### alt 回退

`args` 对象还可以带 `alt`。当 Blockly 不认识当前 `type` 时，会尝试使用 `alt` 对象。

例如某版本新增了 `field_time`，可以给老版本提供 `field_input` 回退：

```javascript
{
  "message0": "sound alarm at %1",
  "args0": [
    {
      "type": "field_time",
      "name": "TEMPO",
      "hour": 9,
      "minutes": 0,
      "alt": {
        "type": "field_input",
        "name": "TEMPOTEXT",
        "text": "9:00"
      }
    }
  ]
}
```

`alt` 里还可以继续套 `alt`。  
若主对象与所有回退对象都无法创建，该对象会被跳过。
