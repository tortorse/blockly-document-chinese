# 变量字段 

变量字段存储字符串作为其值，存储字符串作为其文本。该值是变量的 ID，而文本是变量的名称。

#### 变量字段

![](./variable/on_block.png)

#### 打开编辑器的变量字段

![](./variable/with_editor.png)

#### 收起块上的变量字段

![](./variable/collapsed.png)

## 创建

### 无类型

:::: tabs
::: tab JSON

```json
{
  "type": "example_variable_untyped",
  "message0": "variable: %1",
  "args0": [
    {
      "type": "field_variable",
      "name": "FIELDNAME",
      "variable": "x"
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_variable_untyped'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('variable:')
      .appendField(new Blockly.FieldVariable('x'), 'FIELDNAME');
  }
};
```

:::
::::

### 类型化

:::: tabs
::: tab JSON

```json
{
  "type": "example_variable_typed",
  "message0": "variable: %1",
  "args0": [
    {
      "type": "field_variable",
      "name": "FIELDNAME",
      "variable": "x",
      "variableTypes": ["Number", "String"],
      "defaultType": "Number"
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_variable_typed'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('variable:')
      .appendField(
        new Blockly.FieldVariable('X', null, ['Number', 'String'], 'Number'),
        'FIELDNAME'
      );
  }
};
```

:::
::::
变量构造函数接受可选的变量名称、可选的 [校验器](#创建变量校验器)、可选的变量类型数组以及可选的默认类型。

- **变量名称**应为字符串。这是字段存储的初始变量的名称。如果此值为 null 或未定义，系统会生成一个唯一名称。
- **变量类型**应为字符串数组。此属性用于告知字段可存储哪些类型的变量（即要向下拉菜单中添加的变量类型）。如果值为 null 或未定义，则系统接受所有变量类型（并将其添加到下拉列表中）。
- **默认类型**应为字符串。这将在创建字段的初始变量模型时使用。如果已定义，则应将其包含在变量类型数组中。如果此值为 null 或未定义，则此值默认为空字符串，这意味着初始变量可灵活输入。

→ 如需详细了解严格输入，请参阅 [类型检查](/guides/create-custom-blocks/type-checks)。

## 序列化

:::: tabs
::: tab JSON
变量字段的 JSON 如下所示：

```json
{
  "fields": {
    "FIELDNAME": {
      "id": "QJD^+@[RVIwbLSZoDb:V"
    }
  }
}
```

其中 `FIELDNAME` 是引用变量字段的字符串，值是字段引用的变量的 ID。

如果您在工具箱中使用此字段，还可以直接指定名称和（可选）类型，因为没有变量可供引用。

```json
{
  "fields": {
    "FIELDNAME": {
      "name": "my_variable",
      "type": "string"
    }
  }
}
```

:::
::: tab XML
变量字段的 XML 如下所示：

```xml
<field name="VARIABLE" id="QJD^+@[RVIwbLSZoDb:V" variabletype="">name</field>
```

- 该节点的 `name` 属性包含引用变量字段的字符串。
- 节点的 `id` 属性包含字段引用的变量的 ID。
- 节点的 `variabletype` 属性包含变量的类型。`variabletype` 遵循与构造函数的默认类型参数相同的规则。
- 节点的内部文本是变量的名称。内部文本值遵循与构造函数的变量名称参数相同的规则。
:::
::::

## 创建变量校验器

:::tip
**注意**：如需查看有关校验器的一般信息，请参阅 [校验器](/guides/create-custom-blocks/fields/validators)。
:::
变量字段的值是一个字符串，因此任何校验器都必须接受字符串并返回字符串 `null` 或 `undefined`。

下面是一个仅接受部分预定义变量作为选项的验证程序示例。加载工作区时，需要使用 [Workspace.createVariable](https://developers.google.com/blockly/reference/js/Blockly.Workspace#createVariable) 函数定义这些变量。

```javascript
function(newValue) {
  var validIds = ['Worf', 'Riker', 'Picard'];
  if (validIds.indexOf(newValue) == -1) {
    return null;
  }
  return newValue;
}
```

![](./variable/validator.gif)
