# Number fields

A number field stores a number as its `value`, and a string as its `text`. Its `value` is always a valid number as defined by the [constraints](#constraints) given to the field at creation; its text could be any string entered into its editor.

#### Number field

![](./number/on_block.png)

#### Number field with editor open

![](./number/with_editor.png)

#### Number field on collapsed block

![](./number/collapsed.png)

## Creation

:::: tabs
::: tab JSON

```json
{
  "type": "example_number",
  "message0": "number: %1",
  "args0": [
    {
      "type": "field_number",
      "name": "FIELDNAME",
      "value": 100,
      "min": 0,
      "max": 100,
      "precision": 10
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_number'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('number:')
      .appendField(new Blockly.FieldNumber(100, 0, 100, 10), 'FIELDNAME');
  }
};
```

:::
::::

The number constructor takes in the following:

- an optional `value`
- an optional [min](#minimum-value)
- an optional [max](#maximum-value)
- an optional [precision](#rounding)
- an optional [validator](#creating-a-number-validator)

The `value` should cast to a number. If it does not 0 will be used.

## Serialization

:::: tabs
::: tab JSON
The JSON for a number field looks like so:

```json
{
  "fields": {
    "FIELDNAME": 0
  }
}
```

Where `FIELDNAME` is a string referencing a number field, and the value is the value to apply to the field. The value follows the same rules as the constructor value.
:::
::: tab XML
The XML for a number field looks like so:

```xml
<field name="FIELDNAME">0</field>
```

The `field` node's `name` attribute contains a string referencing a number field, and the node's inner `text` is the `value` to apply to the field. The inner text value follows the same rules as the constructor value.

:::
::::

## Constraints

Constraints can be set in the field definition, or by using the [setConstraints](https://developers.google.com/blockly/reference/js/Blockly.FieldNumber#setConstraints) function.

### Minimum value

The `min` value sets the smallest/most-negative value the field is allowed to contain.

### Maximum value

The `max` value sets the largest/most-positive value the field is allowed to contain.

### Rounding

The `precision` rounds the value to the nearest multiple of precision. This can be used to make the field only accept multiples of .01, 10, 42, etc.

## Common constraints

### Positive numbers

To force your field to only accept positive numbers, set the `min` value to 1.

### Integers

To force your field to only accept integers, set the `precision` to 1.

## Creating a number validator

:::tip
Note: For information on validators in general see [Validators](/guides/create-custom-blocks/fields/validators).
:::
A number field's value is a `number`, so any validators must accept a `number` and return a `number`, `null`, or `undefined`.

Here is an example of a validator that changes the value to be either 0 or 1 depending on if the value was odd or even.

```javascript
function(newValue) {
  return newValue % 2;
}
```

![](./number/validator.gif)
