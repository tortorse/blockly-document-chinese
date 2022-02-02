# Extending an existing field

In order to extend an existing field you must subclass a built in field (e.g `FieldTextInput`, `FieldColour`) and then modify part of it to fit your needs. Some parts of a field you can modify are:

- Its [editor](/guides/create-custom-blocks/fields/anatomy-of-a-field.html#编辑器显示).
- Its [on-block display](/guides/create-custom-blocks/fields/anatomy-of-a-field.html#块上显示).
- The [text](/guides/create-custom-blocks/fields/anatomy-of-a-field.html#文本) it displays.

If you want to [create a custom field](/guides/create-custom-blocks/fields/customizing-fields/creating) that does not need behaviour from any built-in field you should subclass `Field`.

## Common extensions

Most custom fields extend one of these three types:

- [Text Input](/guides/create-custom-blocks/fields/built-in-fields/text-input)

  If you want your users to type into your field, you should extend `FieldTextInput`.

- [Number](/guides/create-custom-blocks/fields/built-in-fields/number)

  If you want to store a number, you should extend `FieldNumber`.

- [Dropdown](/guides/create-custom-blocks/fields/built-in-fields/dropdown)

  If you want to create a dropdown, but you want it to store a different model than the default string model, you should extend `FieldDropdown`.
  :::warning
  Caution: Before extending `FieldDropdown`, check that the dropdown field's [customization options](/guides/create-custom-blocks/fields/built-in-fields/dropdown.html#customization) cannot fulfill your needs.
  :::

Under certain circumstances you may wish to extend a different field type. For example `FieldLabelSerializable` extends `FieldLabel`.

## Subclassing

```javascript
'use strict';

goog.provide('MySubclassName');

goog.require('MySuperclassName');

MySubclassName = function(opt_value, opt_validator) {
  opt_value = this.doClassValidation_(opt_value);
  if (opt_value === null) {
    opt_value = MySubclassName.DEFAULT_VALUE;
  } // Else the original value is fine.

  MySubclassName.superClass_.constructor.call(this, opt_value, opt_validator);
};
Blockly.utils.object.inherits(MySubclassName, MySuperclassName);
```

The constructor for a field's subclass looks very similar to the constructor for a custom field. Simply replace `MySubclassName` with the name of your new field, and replace `MySuperclassName` with the name of the field you are subclassing (e.g. `Blockly.FieldWhatever`). The signature of the sub-constructor should generally match the signature of the super-constructor.

For more information about constructors see [Implementing a constructor](/guides/create-custom-blocks/fields/customizing-fields/creating.html#implementing-a-constructor).

## JSON and registration

You should also be sure to register the field so that it works with the JSON format.

```javascript
MySubclassName.fromJson = function(options) {
  var value = Blockly.utils.replaceMessageReferences(options['value']);
  return new MySubclassName(value);
};

Blockly.fieldRegistry.register('field_my_subclass', MySubclassName);
```
Registering an extended field works the same as registering a custom field. Just replace `MySubclassName` with your new field, and replace `'field_my_subclass'` with the JSON field name you want.

For more information about registering a field see the [JSON and registration](/guides/create-custom-blocks/fields/customizing-fields/creating.html#json-and-registration) section in Creating a Custom Field.
