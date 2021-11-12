## 校验器 

A validator is a function that takes in the fields new value, and then acts on it. They are a simple way to customize a field. They allow you to trigger functionality when a field's value changes, modify input, or limit which values are acceptable.

校验器是一个函数，它接收字段的新值，然后对其进行操作。它们是自定义字段的简单方法。它们允许您在字段值更改、修改输入或限制可接受的值时触发功能。

Some common examples:

- Restricting a text field to only accept letters.

- Requiring that a text field be non-empty.

- Requiring that a date be in the future.

- Modifying a block's shape based on a dropdown.

一些常见的例子：

- 限制文本字段只接受字母。

- 要求文本字段非空。

- 要求未来的日期。

- 根据下拉菜单修改块的形状。

::: tip 提示
Note: Validators modify a field's *[value not its text](/guides/create-custom-blocks/fields/anatomy-of-a-field.html#值)*.

注意：校验器修改字段的 *[值而不是它的 text](/guides/create-custom-blocks/fields/anatomy-of-a-field.html#值)*。

:::

## 校验器的类型

Validators execute at different times depending on what kind of validator they are.

校验器根据它们是哪种校验器在不同的时间执行。

**Class validators** are part of a field type's class definition, and are usually used to restrict the type of value allowed by the field (e.g. number fields only accept numeric characters). Class validators are run on all values passed to the field (including the value passed to the constructor).

**类校验器**是字段类型类定义的一部分，通常用于限制字段允许的值类型（例如数字字段只接受数字字符）。类校验器对传递给字段的所有值（包括传递给构造函数的值）运行。

For more information about class validators see the [Implementing a class validator](/guides/create-custom-blocks/fields/customizing-fields/creating.html#implementing_a_class_validator) section in Creating a Custom Field.

有关类校验器的更多信息，请参阅创建自定义字段中的[实现类校验器](/guides/create-custom-blocks/fields/customizing-fields/creating.html#实现类校验器) 部分。

**Local validators** are defined at the time of a field's construction. Local validators run on all values passed to the field except the value passed to the constructor. This means they run on:

**本地校验器**是在字段构建时定义的。本地校验器对传递给字段的所有值运行，但传递给构造函数的值除外。这意味着它们继续运行：

- Values contained in XML.

- Values passed to setValue.

- Values passed to setFieldValue.

- Values changed by the user.

Class validators are run before local validators because they act like gatekeepers. They make sure that the value is of the correct type before passing it on.

For more information about the sequence of value validation, and values in general see Values.

## Registering a local validator

Local validators can be registered in two ways:

- Directly added in a field's constructor.

::: tip 提示
Note: The signature of the field constructor may be different depending on the field type.
:::

```javascript
Blockly.Blocks['validator_example'] = {
  init: function() {
    // Remove all 'a' characters from the text input's value.
    var validator = function(newValue) {
      return newValue.replace(/\a/g, '');
    };

    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('default', validator));
  }
};
```
- With setValidator.

```javascript
Blockly.Blocks['validator_example'] = {
  init: function() {
    // Remove all 'a' characters from the text input's value.
    var validator = function(newValue) {
      return newValue.replace(/\a/g, '');
    };

    var field = new Blockly.FieldTextInput('default');
    field.setValidator(validator);

    this.appendDummyInput().appendField(field);
  }
};
```
