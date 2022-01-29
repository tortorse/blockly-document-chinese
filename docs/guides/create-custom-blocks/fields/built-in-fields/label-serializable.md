# Serializable label fields

Serializable labels work exactly the same as normal labels except they also serialize to XML. They should only be used if you are editing the content of a label programmatically, and wish it to serialize to XML.

#### Serializable label field

![](./label-serializable/on_block.png)

#### Serializable label field on a collapsed block

![](./label-serializable/collapsed.png)

## Creation

:::: tabs
::: tab JSON

```json
{
  "type": "example_serializable_label",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "FIELDNAME",
      "text": "a serializable label"
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_serializable_label'] = {
  init: function() {
    this.appendDummyInput().appendField(
      new Blockly.FieldLabelSerializable('a serializable label'),
      'FIELDNAME'
    );
  }
};
```

:::
::::
The serializable label field takes in an optional value, and an optional css class string. Both default to an empty string.

## Serialization

:::: tabs
::: tab JSON
The JSON for a serializable label field looks like so:

```json
{
  "fields": {
    "FIELDNAME": text
  }
}
```

Where `FIELDNAME` is a string referencing a serializable label field, and the value is the value to apply to the field. The value follows the same rules as the constructor value.
:::
::: tab XML
The XML for a serializable label field looks like so:

```xml
<field name="FIELDNAME">text</field>
```

The `field` node's `name` attribute contains a string referencing a serializable label field, and the node's inner text is the value to apply to the field.
:::
::::

## Validators

Serializable label fields do not support validators, because they are not editable by a user.
