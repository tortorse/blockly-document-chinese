# Label fields

A label field stores a string as its value and a string as its text. The value and text of a label field are always the same.

#### Label field

![](./label/on_block.png)

#### Label field on collapsed block

![](./label/collapsed.png)

## Creation

:::: tabs
::: tab JSON

```json
{
  "type": "example_label",
  "message0": "a label %1 and another label",
  "args0": [
    {
      "type": "input_dummy"
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_label'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabel('a label'));
    this.appendDummyInput()
        .appendField('and another label');
  }
};
```

:::
::::
The [appendField](https://developers.google.com/blockly/reference/js/Blockly.Input#appendField) function accepts both FieldLabel objects and, more commonly, strings to create labels.

The label field takes in an optional value, and an optional css class string. Both default to an empty string.

## Serialization
Label fields are not serializable.

If you would like your label to be serialized, because it is being changed programmatically, see the [Serializable Label](/guides/create-custom-blocks/fields/built-in-fields/label-serializable) field.

## Validators
Label fields do not support validators, because they are not editable.
