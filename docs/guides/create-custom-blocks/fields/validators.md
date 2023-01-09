## 校验器

验证程序是一种接受字段新值并对其执行操作的函数。它们是自定义自定义字段的一种简单方式。它们允许您在字段值发生更改时触发功能、修改输入或限制可接受的值。

一些常见的例子：

- 将文本字段限制为仅接受字母。
- 要求文本字段不得为空。
- 要求将来的日期。
- 根据下拉菜单修改块的形状。

::: tip 提示
**注意**：校验器修改字段的 _[值而不是它的 text](/guides/create-custom-blocks/fields/anatomy-of-a-field.html#值)_。
:::

## 校验器的类型

校验器根据它们是哪种校验器在不同的时间执行。

**类校验器**是字段类型类定义的一部分，通常用于限制字段允许的值类型（例如数字字段只接受数字字符）。类校验器对传递给字段的所有值（包括传递给构造函数的值）运行。

有关类校验器的更多信息，请参阅创建自定义字段中的 [实现类校验器](/guides/create-custom-blocks/fields/customizing-fields/creating.html#实现类校验器) 部分。

**本地校验器**是在字段构建时定义的。本地校验器对传递给字段的所有值运行，但传递给构造函数的值除外。这意味着它们继续运行：

- XML 中包含的值。

- 传递给 setValue 的值。

- 传递给 setFieldValue 的值。

- 用户更改的值。

类校验器在本地校验器之前运行，因为它们就像看门人。他们在传递之前确保值的类型正确。

有关值验证序列和一般值的更多信息，请参阅「值」。

## 注册本地校验器

本地校验器可以通过两种方式注册：

- 直接添加到字段的构造函数中。

::: tip 提示
**注意**：字段构造函数的签名可能因字段类型而异。
:::

```javascript
Blockly.Blocks['validator_example'] = {
  init: function() {
    // Remove all 'a' characters from the text input's value.
    var validator = function(newValue) {
      return newValue.replace(/\a/g, '');
    };

    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput('default', validator)
    );
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

上述任何一种方法都可以包装在 [扩展程序](/guides/create-custom-blocks/extensions.html#扩展) 中，以支持 JSON 格式。

此字段的值可能会因要验证的字段的类型而有很大差异（例如，数字字段将存储数字，而文本输入字段将存储字符串），因此最好先阅读特定字段的文档，然后再创建验证器。

::: tip 提示
**注意**：只有可修改字段接受验证器，因此请务必查看特定字段的文档。
:::

## 返回值

验证程序的返回值决定了字段接下来将执行的操作。它有三种可能性：

**修改后的返回值**

修改后的值或不同的值，这些值随后会成为字段的新值。 这通常用于清理值，例如移除尾随空格。

修改验证器示例：

```javascript
// Remove all 'a' characters from the text input's value.
var validator = function(newValue) {
  return newValue.replace(/\a/g, '');
};
```

![Text input field with a modifying validator](./modifying_validator.gif)

## Null 返回值

Null，表示给定的值无效。在大多数情况下，该字段将忽略输入值。确切行为由该字段的 `doValueInvalid_` [函数](/guides/create-custom-blocks/fields/customizing-fields/creating.html#handling_invalid_values)指定。

Null 验证器示例：

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

**未定义的返回值**

未定义（或无返回语句）或输入值，这意味着输入值应成为字段的新值。这些类型的验证器通常充当变更监听器。

监听器验证工具示例：

```javascript
// Log the new value to console.
var validator = function(newValue) {
  console.log(newValue);
};
```

请再次注意，显示文本不一定反映字段的*值*。

## this 的值

在验证器内部，`this` 指的是字段，而不是块。如果您需要访问验证器内的块，请使用 `getSourceBlock` 函数。您还可以使用 [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) 函数来设置调用验证器的上下文。

使用 `getSourceBlock` 的示例代码：

```javascript
Blockly.Blocks['colour_match'] = {
  init: function() {
    this.appendDummyInput().appendField(
      new Blockly.FieldColour(null, this.validate),
      'COLOUR'
    );
    this.setColour(this.getFieldValue('COLOUR'));
  },

  validate: function(colourHex) {
    this.getSourceBlock().setColour(colourHex);
  }
};
```

使用 [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) 的示例代码：

```javascript
Blockly.Blocks['colour_match'] = {
  init: function() {
    this.appendDummyInput().appendField(
      new Blockly.FieldColour(null, this.validate.bind(this)),
      'COLOUR'
    );
    this.validate(this.getFieldValue('COLOUR'));
  },

  validate: function(colourHex) {
    this.setColour(colourHex);
  }
};
```
