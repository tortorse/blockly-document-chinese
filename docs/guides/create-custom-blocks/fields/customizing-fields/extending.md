# 扩展现有字段

为了扩展现有字段，您必须创建内置字段（例如 `FieldTextInput`、`FieldColour`）的子类，然后修改部分字段以满足您的需求。您可以修改字段的某些部分：

- 它的 [编辑器](/guides/create-custom-blocks/fields/anatomy-of-a-field.html#编辑器显示)。
- 它的 [块上显示](/guides/create-custom-blocks/fields/anatomy-of-a-field.html#块上显示)。
- 其中显示的 [文本](/guides/create-custom-blocks/fields/anatomy-of-a-field.html#文本)。

如果要 [创建不需要任何内置字段行为的自定义字段](/guides/create-custom-blocks/fields/customizing-fields/creating.html)，则应创建 `Field` 的子类。

## 常见扩展程序

大多数自定义字段都会扩展为以下三种类型之一：

- [文本输入](/guides/create-custom-blocks/fields/built-in-fields/text-input.html)：如果您希望用户在字段中输入内容，则应扩展 `FieldTextInput`。
- [数字](/guides/create-custom-blocks/fields/built-in-fields/number.html)：如果要存储数字，应扩展 `FieldNumber`。
- [下拉菜单](/guides/create-custom-blocks/fields/built-in-fields/dropdown.html)：如果要创建下拉菜单，但希望它存储与默认字符串或图片模型不同的模型，则应扩展 `FieldDropdown`。
  - 注意：在扩展 `FieldDropdown` 之前，请检查下拉字段的 [自定义选项](/guides/create-custom-blocks/fields/built-in-fields/dropdown.html#自定义) 不能满足您的需要。

在某些情况下，您可能需要扩展其他字段类型。例如，`FieldLabelSerializable` 扩展了 `FieldLabel`。

## 子类化

```javascript
import * as Blockly from 'blockly';

export class MyCustomTextField extends Blockly.FieldTextInput {
  constructor(value, validator, config) {
    super(value, validator, config);
  }
}
```

字段的子类的构造函数与 [自定义字段的构造函数](/guides/create-custom-blocks/fields/customizing-fields/creating.html#实现构造函数) 非常相似。子构造函数的签名通常应与超级构造函数的签名匹配。

## JSON 和注册

您还应注册一次该字段：

```javascript
Blockly.fieldRegistry.register('my_custom_text_field', MyCustomTextField);
```

并在类中提供 `fromJson` 的实现，以使其支持 JSON 格式：

```javascript
static fromJson(options) {
  const value = Blockly.utils.replaceMessageReferences(options.value);
  return new MySubclassName(value);
}
```

如需详细了解如何注册字段，请参阅“创建自定义字段”中的 [JSON 和注册](/guides/create-custom-blocks/fields/customizing-fields/creating.html#json-和注册) 部分。
