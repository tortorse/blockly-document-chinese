# Text input fields

A text input field stores a string as its value and a string as its text. Its value is always a valid string, while its text could be any string entered into its editor.

#### Text input field

![](./text-input/on_block.png)

#### Text input field with editor open

![](./text-input/with_editor.png)

#### Text input field on collapsed block

![](./text-input/collapsed.png)

## Creation

:::: tabs
::: tab JSON

```json
{
  "type": "example_textinput",
  "message0": "text input: %1",
  "args0": [
    {
      "type": "field_input",
      "name": "FIELDNAME",
      "text": "default text",
      "spellcheck": false
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_textinput'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('text input:')
      .appendField(new Blockly.FieldTextInput('default text'), 'FIELDNAME');
  }
};
```

:::
::::
The text input constructor takes in an optional value and an optional [validator](#creating-a-text-input-validator). The value should cast to a string. If it is `null` or `undefined`, an empty string will be used.

The JSON definition also allows you to set the [spellcheck](#spellcheck) option.

## Serialization and XML

:::: tabs
::: tab JSON
The JSON for a text input field looks like so:

```json
{
  "fields": {
    "FIELDNAME": "text"
  }
}
```

Where `FIELDNAME` is a string referencing a text input field, and the value is the value to apply to the field. The value follows the same rules as the constructor value.

:::
::: tab XML
The XML for a text input field looks like so:

```xml
<field name="FIELDNAME">text</field>
```

Where the field's `name` attribute contains a string referencing a text input field, and the inner text is the value to apply to the field. The inner text value follows the same rules as the constructor value.

:::
::::

## Customization

### Spellcheck

The [setSpellcheck](https://developers.google.com/blockly/reference/js/Blockly.FieldTextInput#setSpellcheck) function can be used to set whether the field spellchecks its input text or not.

### Text input fields with and without spellcheck

![](./text-input/spellcheck.gif)

Spellchecking is on by default.

This applies to individual fields. If you want to modify all fields change the `Blockly.FieldTextInput.prototype.spellcheck_` property.

## Creating a text input validator

:::tip
Note: For information on validators in general see [Validators](/guides/create-custom-blocks/fields/validators).
:::
A text input field's value is a string, so any validators must accept a string and return a string, `null`, or `undefined`.

Here is an example of a validator that removes all 'a' characters from the string:

```javascript
function(newValue) {
  return newValue.replace(/a/g, '');
}
```

![](./text-input/validator.gif)
