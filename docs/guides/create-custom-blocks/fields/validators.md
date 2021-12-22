## 校验器 

校验器是一个函数，它接收字段的新值，然后对其进行操作。它们是自定义字段的简单方法。它们允许您在字段值更改、修改输入或限制可接受的值时触发功能。

一些常见的例子：

- 限制文本字段只接受字母。

- 要求文本字段非空。

- 要求未来的日期。

- 根据下拉菜单修改块的形状。

::: tip 提示
注意：校验器修改字段的 *[值而不是它的 text](/guides/create-custom-blocks/fields/anatomy-of-a-field.html#值)*。
:::

## 校验器的类型

校验器根据它们是哪种校验器在不同的时间执行。

**类校验器**是字段类型类定义的一部分，通常用于限制字段允许的值类型（例如数字字段只接受数字字符）。类校验器对传递给字段的所有值（包括传递给构造函数的值）运行。

有关类校验器的更多信息，请参阅创建自定义字段中的[实现类校验器](/guides/create-custom-blocks/fields/customizing-fields/creating.html#实现类校验器) 部分。

**本地校验器**是在字段构建时定义的。本地校验器对传递给字段的所有值运行，但传递给构造函数的值除外。这意味着它们继续运行：

- XML 中包含的值。

- 传递给 setValue 的值。

- 传递给 setFieldValue 的值。

- 用户更改的值。

类验证器在本地验证器之前运行，因为它们就像看门人。他们在传递之前确保值的类型正确。

有关值验证序列和一般值的更多信息，请参阅「值」。

## 注册本地验证器

本地验证器可以通过两种方式注册：

- 直接添加到字段的构造函数中。

::: tip 提示
注意：字段构造函数的签名可能因字段类型而异。
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

- 使用 [setValidator](https://developers.google.com/blockly/reference/js/Blockly.Field#setValidator)。

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

上述任何一种方法都可以包装在 [扩展](/guides/create-custom-blocks/extensions.html#扩展) 中，以支持 JSON 格式。

The field's value may be very different depending on the type of field being validated (e.g. a number field will store a number, while a text input field will store a string) so it is best to read the documentation for your specific field before creating a validator.

::: tip 提示
Note: Only editable fields accept validators, so be sure to check the specific field's documentation.
:::

## 返回值

The return value of the validator determines what the field does next. There are three possibilities:

**Modified Return Value**

A modified or different value, which then becomes the field's new value. This is often used to clean up a value, such as by removing trailing whitespace.

Example of a Modifying Validator:

```javascript
// Remove all 'a' characters from the text input's value.
var validator = function(newValue) {
  return newValue.replace(/\a/g, '');
};
```

![Text input field with a modifying validator](./modifying_validator.gif)

## Null Return Value

Null, which means the given value is invalid. In most cases the field will ignore the input value. The exact behaviour is specified by the field's doValueInvalid_ [function](/guides/create-custom-blocks/fields/customizing-fields/creating.html#handling_invalid_values).

Example of a Nulling Validator:

```javascript
// Any value containing a 'b' character is invalid.  Other values are valid.
var validator = function(newValue) {
  if (newValue.indexOf('b') != -1) {
    return null;
  }
  return newValue;
};
```

![Text input field with a nulling validator](./nulling_validator.gif)

**Undefined Return Value**

Undefined (or no return statement) or the input value, which means that the input value should become the field's new value. These types of validators generally act as change listeners.

Example of a Listener Validator:

```javascript
// Log the new value to console.
var validator = function(newValue) {
  console.log(newValue);
};
```

Note once again how the display text does not necessarily reflect the field's value.

## Value of this

Inside of a validator `this` refers to the field, not the block. If you need to access the block inside of a validator use the `getSourceBlock` function. You can also use the [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) function to set the context within which the validator is called.

Sample code using `getSourceBlock`:

```javascript
Blockly.Blocks['colour_match'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour(
            null, this.validate
        ), 'COLOUR');
    this.setColour(this.getFieldValue('COLOUR'));
  },

  validate: function(colourHex) {
    this.getSourceBlock().setColour(colourHex);
  }
};
```

Sample code using [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)]:

```javascript
Blockly.Blocks['colour_match'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldColour(
          null, this.validate.bind(this)
      ), 'COLOUR');
    this.validate(this.getFieldValue('COLOUR'));
  },

  validate: function(colourHex) {
    this.setColour(colourHex);
  }
};
```

