# Checkbox fields

A checkbox field stores a string as its value, and a string as its text. Its value is either `'TRUE'` or `'FALSE'`, and its text is either `'true'` or `'false'`.

#### Checkbox field

![](./checkbox/on_block.png)

#### Checkbox field on collapsed block

![](./checkbox/collapsed.png)

## Creation

::::tabs
::: tab JSON

```json
{
  "type": "example_checkbox",
  "message0": "checkbox: %1",
  "args0": [
    {
      "type": "field_checkbox",
      "name": "FIELDNAME",
      "checked": true
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_checkbox'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('checkbox:')
      .appendField(new Blockly.FieldCheckbox(true), 'FIELDNAME');
  }
};
```

:::
::::

The checkbox constructor takes in an optional value and an optional [validator](#creating_a_checkbox_validator). The optional value should be either `'TRUE'`, `'FALSE'`, or a boolean, otherwise it will default to `false`.

## Serialization

:::: tabs
::: tab JSON

```json
{
  "fields": {
    "FIELDNAME": true
  }
}
```

Where `FIELDNAME` is a string referencing a checkbox field, and the value is the value to apply to the field. The value must be a boolean.
:::
::: tab XML
The XML for a checkbox field looks like so:

```xml
<field name="FIELDNAME">TRUE</field>
```

or

```xml
<field name="FIELDNAME">true</field>
```

:::tip
Note: Quotes do not need to be applied to the inner text.
:::
Where the `name` attribute contains a string referencing an checkbox field, and the inner text is the value to apply to the field. The inner text value follows the same rules as the constructor value.

Note that after being deserialized and reserialized all of the inner text values will be in caps ('TRUE' or 'FALSE'). This is sometimes important when diffing workspaces.
:::
::::

## Customization

### Checkmark character

The `Blockly.FieldCheckbox.CHECK_CHAR` property can be used to change what the checkmark looks like. The value should be a string containing a unicode character.

![Checkbox field with heart instead of check](./checkbox/customized.png)

The `CHECK_CHAR` property defaults to '\u2713' or ✓.

This is a global property, so it will modify all checkbox fields when set.

## Creating a checkbox validator

:::tip
Note: For information on validators in general see Validators.
:::
A checkbox field's value is either `'TRUE'` or `'FALSE'` so a validator should accept those values (i.e. a string) and return `'TRUE'`, `'FALSE'`, `null`, or `undefined`.

:::warning
Caution: the getValueBoolean method should not be used inside of validators, because it returns based on the current value, not the new value.
:::
Here's an example of a validator that hides or shows a text input field based on whether the checkbox is checked:

```javascript
  validate: function(newValue) {
    var sourceBlock = this.getSourceBlock();
    sourceBlock.showTextField_ = newValue == 'TRUE';
    sourceBlock.updateTextField();

    return newValue;
  },

  updateTextField: function() {
    var input = this.getInput('DUMMY');
    if (this.showTextField_ && !this.getField('TEXT')) {
      input.appendField(new Blockly.FieldTextInput(), 'TEXT');
    } else if (!this.showTextField_ && this.getField('TEXT')) {
      input.removeField('TEXT');
    }
  }
```

#### Checkbox field with a validator

![](./checkbox/validator.gif)
