# Creating a new field type

Before creating a new field type, consider if one of the [other methods](/guides/create-custom-blocks/fields/customizing-fields/overview) for customizing fields suits your needs. If your application needs to store a new value type, or you wish to create a new UI for an existing value type, you probably need to create a new field type.

To create a new field, do the following:

1. [Implement a constructor](/#implementing-a-constructor).
2. [Register a JSON key and implement `fromJson`](#json-and-registration).
3. [Handle initialization of the on-block UI and event listeners](#initializing).
4. [Handle disposal of event listeners](#disposing) (UI disposal is handled for you).
5. [Implement value handling](#value_handling).
6. [Add a text-representation of your field's value, for accessibility](#text).
7. Add additional functionality such as:
   - [An editor](#creating_an_editor).
   - [On-block display updates](#updating-the-on-block-display).
   - [Serialization](#serialization-and-xml).
8. Configure additional aspects of your field, such as:

   - [Editable and serializable properties](#editable-and-serializable-properties)
   - [Cursor](#customizing_the_cursor)

This section assumes that you have read and are familiar with the contents in [Anatomy of a Field](/guides/create-custom-blocks/fields/anatomy-of-a-field).

For an example of a custom field see the [Custom Fields demo](https://blockly-demo.appspot.com/static/demos/custom-fields/index.html).

## Implementing a constructor

The field's constructor is responsible for setting up the field's initial value and optionally setting up a [local validator](/guides/create-custom-blocks/fields/validators). The custom field's constructor is called during the source block initialization regardless of whether the source block is defined in JSON or JavaScript. So, the custom field doesn't have access to the source block during construction.

The following code sample creates a custom field named `GenericField`:

```javascript
'use strict';

goog.provide('CustomFields.GenericField');

goog.require('Blockly.Field');

CustomFields.GenericField = function(opt_value, opt_validator) {
  opt_value = this.doClassValidation_(opt_value);
  if (opt_value === null) {
    opt_value = CustomFields.GenericField.DEFAULT_VALUE;
  } // Else the original value is fine.

  CustomFields.GenericField.superClass_.constructor.call(
    this,
    opt_value,
    opt_validator
  );
};
Blockly.utils.object.inherits(CustomFields.GenericField, Blockly.Field);
```

:::warning
Caution: Make sure to properly provide, require, and inherit when creating a custom field.
:::

### Method signature

Field constructors usually take in a value and a local validator. If there is a logical default value for your field then the value is typically optional. The validator parameter is only present for editable fields and is typically marked as optional.

### Structure

The logic inside of your constructor should follow this flow:

1. Validate the passed value with `this.doClassValidation_` (see [class validator](#implementing-a-class-validator)).

The value of a field is always stored as a single object. So, if you have multiple values provided individually in the constructor, you should compile them into a single object before validation.

2. Handle invalid values by either setting a default value or throwing a clear error.

3. Optional: Apply additional customization (for example, [Label fields](https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/label) allow a css class to be passed, which is then applied to the text).

4. Call the inherited super constructor (all custom fields should inhertit from `Blockly.Field`) to properly initialize the value and set the local validator for your field.

## JSON and registration

In [JSON block definitions](/guides/create-custom-blocks/define-blocks.html#json-格式与-javascript-api), fields are described by a string (e.g. `field_number`, `field_textinput`). Blockly maintains a map from these strings to field objects, and calls `fromJson` on the appropriate object during construction.

Call `Blockly.fieldRegistry.register` to add your field type to this map, passing in the field class as the second argument:

```javascript
Blockly.fieldRegistry.register('field_generic', CustomFields.GenericField);
```

You also need to define your `fromJson` function. Your implementation should first dereference any [string table](/guides/create-custom-blocks/localize-blocks.html#字符串表) references using [replaceMessageReferences](https://developers.google.com/blockly/reference/js/Blockly.utils#.replaceMessageReferences), and then pass the values to the constructor.

```javascript
CustomFields.GenericField.fromJson = function(options) {
  var value = Blockly.utils.replaceMessageReferences(options['value']);
  return new CustomFields.GenericField(value);
};
```

:::tip
Note: Validators are not currently supported when using a JSON definition. But they can be applied via an extension.
:::

## Initializing

When your field is constructed, it basically only contains a value. Initialization is where the DOM is built, the model is built (if the field possesses a model), and events are bound.

### On-Block display

During initialization you are responsible for creating anything you will need for the field's on-block display.

#### Defaults, background, and text

The default `initView` function creates a light coloured rect element and a text element. If you want your field to have both of these, plus some extra goodies, call the superclass initView function before adding the rest of your DOM elements. If you want your field to have one, but not both, of these elements you can use the `createBorderRect_` or `createTextElement_` functions.

#### Customizing DOM construction

If your field is a generic text field (e.g. [Text Input](/guides/create-custom-blocks/fields/built-in-fields/text-input), or [Date](/guides/create-custom-blocks/fields/built-in-fields/date)), DOM construction will be handled for you. Otherwise you will need to override the `initView` function to create the DOM elements that you will need during future rendering of your field.

For example, a dropdown field may contain both images and text. In `initView` it creates a single image element and a single text element. Then during `render_` it shows the active element and hides the other, based on the type of the selected option.

Creating DOM elements can either be done using the `Blockly.utils.dom.createSvgElement` method, or using traditional DOM creation methods.

The requirements of a field's on-block display are:

- All DOM elements must be children of the field's `fieldGroup_`. The field group is created automatically.
- All DOM elements must stay inside the reported dimensions of the field.

See the [Rendering](#updating-the-on-block-display) section for more details on customizing and updating your on-block display.

#### Adding Text Symbols

If you want to add symbols to a field's text (such as the [Angle](/guides/create-custom-blocks/fields/built-in-fields/angle) field's degree symbol) you can append the symbol element (usually contained in a `<tspan>`) directly to the field's `textElement_`.

### Input events

By default fields register tooltip events, and mouse down events (to be used for showing [editors](#creating-an-editor)). If you want to listen for other kinds of events (e.g. if you want to handle dragging on a field) you should override the field's `bindEvents_` function.

```javascript
Blockly.FieldNumberDrag.prototype.bindEvents_ = function() {
  Blockly.FieldNumberDrag.superClass_.bindEvents_.call(this);
  this.mouseDownWrapper_ = Blockly.bindEventWithChecks_(
    this.getClickTarget_(),
    'mousedown',
    this,
    function(event) {
      this.originalMouseX_ = event.clientX;
      this.isMouseDown_ = true;
      this.originalValue_ = this.getValue();
      event.stopPropagation();
    }
  );
  this.mouseMoveWrapper_ = Blockly.bindEventWithChecks_(
    document,
    'mousemove',
    this,
    function(event) {
      if (!this.isMouseDown_) {
        return;
      }
      var delta = event.clientX - this.originalMouseX_;
      this.setValue(this.originalValue_ + delta);
    }
  );
  this.mouseUpWrapper_ = Blockly.bindEventWithChecks_(
    document,
    'mouseup',
    this,
    function(_event) {
      this.isMouseDown_ = false;
    }
  );
};
```

:::tip
Note: When overriding `bindEvents_` you should always call the base function.
:::
To bind to an event you should generally use the [`Blockly.bindEventWithChecks_`](https://developers.google.com/blockly/reference/js/Blockly#.bindEventWithChecks_) function. This method of binding events filters out secondary touches during drags. If you want your handler to run even in the middle of an in-progress drag you can use the [`Blockly.bindEvent_`](https://developers.google.com/blockly/reference/js/Blockly#.bindEvent_) function.

## Disposing

If you registered any custom event listeners inside the field's `bindEvents_` function they will need to be unregistered inside the [dispose](https://developers.google.com/blockly/reference/js/Blockly.Field#dispose) function.

:::tip
Note: When overriding dispose you should always call the base function.
:::
If you correctly [initialized the view](#initializing) of your field (by appending all DOM elements to the `fieldGroup_`), then the field's DOM will be disposed of automatically.

## Value Handling

→ For information about a field's value vs its text see [Anatomy of a field](/guides/create-custom-blocks/fields/anatomy-of-a-field).

### Validation order

![Flowchart describing the order in which validators are run](./validation-order.svg)

### Implementing a class validator

Fields should only accept certain values. For example, number fields should only accept numbers, colour fields should only accept colours etc. This is ensured through class and local [validators](/guides/create-custom-blocks/fields/validators). The class validator follows the same rules as local validators except that it is also run in the [constructor](#implementing-a-constructor) and, as such, it should not reference the source block and **always** return a value.

To implement your field's class validator, override the `doClassValidation_` function.

```javascript
CustomFields.GenericField.prototype.doClassValidation_ = function(newValue) {
  if (typeof newValue != 'string') {
    return null;
  }
  return newValue;
};
```

:::tip
Note: The newValue passed to `doClassValidation_` could be of any type (depending on how responsible your fellow developers are), so be prepared to handle edge cases.
:::

#### Multi-part values

When your field contains a multipart value (e.g. lists, vectors, objects) you may wish the parts to be handled like individual values.

```javascript
CustomFields.FieldTurtle.prototype.doClassValidation_ = function(newValue) {
  if (CustomFields.FieldTurtle.PATTERNS.indexOf(newValue.pattern) == -1) {
    newValue.pattern = null;
  }

  if (CustomFields.FieldTurtle.HATS.indexOf(newValue.hat) == -1) {
    newValue.hat = null;
  }

  if (CustomFields.FieldTurtle.NAMES.indexOf(newValue.turtleName) == -1) {
    newValue.turtleName = null;
  }

  if (!newValue.pattern || !newValue.hat || !newValue.turtleName) {
    this.cachedValidatedValue_ = newValue;
    return null;
  }
  return newValue;
};
```

In the above example each property of `newValue` is validated individually. Then at the end of the `doClassValidation_` function, if any individual property is invalid, the value is cached to the `cacheValidatedValue_` property before returning `null` (invalid). Caching the object with individually validated properties allows the [`doValueInvalid_`](#handling-invalid-values) function to handle them separately, simply by doing a `!this.cacheValidatedValue_.property` check, instead of re-validating each property individually.

This pattern for validating multi-part values can also be used in [local validators](/guides/create-custom-blocks/fields/validators) but currently there is no way to enforce this pattern.

### Handling valid values

If the value passed to a field with setValue is valid you will receive a `doValueUpdate_` callback. By default the `doValueUpdate_` function:

- Sets the `value_` property to `newValue`.
- Sets the [`isDirty_`](#isdirty) property to `true`.
  If you simply need to store the value, and don't want to do any custom handling, you do not need to override `doValueUpdate_`.

Otherwise, if you wish to do things like:

- Custom storage of `newValue`.
- Change other properties based on `newValue`.
- Save whether the current value is valid or not.

You will need to override `doValueUpdate_`:

```javascript
CustomFields.GenericField.prototype.doValueUpdate_ = function(newValue) {
  CustomFields.GenericField.superClass_.doValueUpdate_.call(this, newValue);
  this.displayValue_ = newValue;
  this.isValueValid_ = true;
};
```

:::warning
Caution: If your field needs to access properties of the block or workspace when setting the value, you should make `doValueUpdate_` fail cleanly if those are not available.
:::

### Handling invalid values

If the value passed to the field with `setValue` is invalid you will receive a `doValueInvalid_` callback. By default the `doValueInvalid_` function does nothing. This means that by default invalid values will not be shown. It also means the field will not be rerendered, because the [`isDirty_`](#isdirty) property will not be set.

If you wish to display invalid values you should override `doValueInvalid_`. Under most circumstances you should set a `displayValue_` property to the invalid value, set [`isDirty_`](#isdirty) to `true`, and [override render\_](#updating-the-on-block-display) for the on-block display to update based on the `displayValue_` instead of the `value_`.

```javascript
CustomFields.GenericField.prototype.doValueInvalid_ = function(newValue) {
  this.displayValue_ = newValue;
  this.isDirty_ = true;
  this.isValueValid_ = false;
};
```

:::warning
Warning: Never set the `value_` property to an invalid value. Field values should always be valid for use in [code generation](/guides/create-custom-blocks/generating-code#getfieldvalue).
:::

### isDirty\_

`isDirty_` is a flag used in the [`setValue`](https://developers.google.com/blockly/reference/js/Blockly.Field#setValue) function, as well as other parts of the field, to tell if the field needs to be re-rendered. If the field's display value has changed `isDirty_` should usually be set to `true`.

## Text

→ For information about where a field's text is used, and how it is different from the field's value see [Anatomy of a field](/guides/create-custom-blocks/fields/anatomy-of-a-field).

```javascript
CustomFields.FieldTurtle.prototype.getText = function() {
  var text = this.value_.turtleName + ' wearing a ' + this.value_.hat;
  if (this.value_.hat == 'Stovepipe' || this.value_.hat == 'Propeller') {
    text += ' hat';
  }
  return text;
};
```

If the text of your field is different than the value of your field, you should override the [`getText`](https://developers.google.com/blockly/reference/js/Blockly.Field#getText) function to provide the correct text.

## Creating an editor

If you define the `showEditor_` function, Blockly will automatically listen for clicks and call `showEditor_` at the appropriate time. You can display any HTML in your editor by wrapping it one of two special divs, called the DropdownDiv and WidgetDiv, which float above the rest of Blockly's UI.
:::tip
Important: Updates to an editor's display should be handled during [rendering](#updating-the-on-block-display), instead of being handled immediately. This allows validators to intercept the value before it is applied.
:::

### DropDownDiv vs WidgetDiv

The [`DropDownDiv`](https://developers.google.com/blockly/reference/js/Blockly.DropDownDiv) is used to provide editors that live inside of a box connected to a field. It automatically positions itself to be near the field while staying within visible bounds. The angle picker and color picker are good examples of the `DropdownDiv`.

![Image of angle picker](./angle-picker.png)

The [`WidgetDiv`](https://developers.google.com/blockly/reference/js/Blockly.WidgetDiv) is used to provide editors that do not live inside of a box. Number fields use the WidgetDiv to cover the field with an HTML text input box. While the DropdownDiv handles positioning for you, the WidgetDiv does not. Elements will need to be manually positioned. The coordinate system is in pixel coordinates relative to the top left of the window. The text input editor is a good example of the `WidgetDiv`

![Image of text input editor](./text-input-editor.png)

### DropDownDiv sample code

```javascript
CustomFields.GenericField.prototype.showEditor_ = function() {
  // Create the widget HTML
  this.editor_ = this.dropdownCreate_();
  Blockly.DropDownDiv.getContentDiv().appendChild(this.editor_);

  // Set the dropdown's background colour.
  // This can be used to make it match the colour of the field.
  Blockly.DropDownDiv.setColour('white', 'silver');

  // Show it next to the field. Always pass a dispose function.
  Blockly.DropDownDiv.showPositionedByField(
    this,
    this.disposeWidget_.bind(this)
  );
};
```

:::tip
Note: Creating widget HTML programmatically can be quite long-winded so it is not provided here. For an example of this see the [Custom Fields Demo](https://blockly-demo.appspot.com/static/demos/custom-fields/index.html).
:::

### WidgetDiv sample code

```javascript
Blockly.GenericField.prototype.showEditor_ = function() {
  // Show the div, this automatically closes the dropdown if it is open.
  // Always pass a dispose function.
  Blockly.WidgetDiv.show(
    this,
    this.sourceBlock_.RTL,
    this.widgetDispose_.bind(this)
  );

  // Create the widget HTML.
  var widget = this.createWidget_();
  Blockly.WidgetDiv.DIV.appendChild(widget);
};
```

:::tip
Note: Creating widget HTML programmatically can be quite long-winded so it is not provided here. For an example of this see the implementation of [Text Input Field](https://github.com/google/blockly/blob/master/core/field_textinput.js).
:::
:::tip
Note: If you are creating a widget that is meant to act like an input but uses a custom element you can add `data-is-text-input='true'` to your element to notify blockly to treat the element as an input.
:::

### Cleaning up

Both the DropdownDiv and the WidgetDiv handle destroying the widget HTML elements, but you need to manually dispose of any event listeners you have applied to those elements.

```javascript
CustomFields.FieldTurtle.prototype.widgetDispose_ = function() {
  for (
    var i = this.editorListeners_.length, listener;
    (listener = this.editorListeners_[i]);
    i--
  ) {
    Blockly.unbindEvent_(listener);
    this.editorListeners_.pop();
  }
};
```

The `dispose` function is called in a `null` context on the `DropDownDiv`. On the `WidgetDiv` it is called in the context of the `WidgetDiv`. In either case it is best to use the [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) function when passing a dispose function, as shown in the above `DropDownDiv` and `WidgetDiv` examples.

→ For information about disposing not specific to disposing of editors see [Disposing](#disposing).

## Updating the on-block display

The `render_` function is used to update the field's on-block display to match its internal value.

Common examples include:

- Change the text (dropdown)
- Change the color (color)
  :::tip
  Important: The field should never call `render_` directly. Instead rerenders should be triggered by setting the [`isDirty_`](#isdirty) property to `true`.
  :::

### Defaults

The default `render_` function sets the display text to the result of the [`getDisplayText_`](https://developers.google.com/blockly/reference/js/Blockly.Field#getDisplayText_) function. The `getDisplayText_` function returns the field's `value_` property cast to a string, after it has been truncated to respect the maximum text length.

If you are using the default on-block display, and the default text behavior works for your field, you do not need to override `render_`.

If the default text behavior works for your field, but your field's on-block display has additional static elements, you can call the default `render_` function, but you will still need to override it to [update the field's size](#updating-size).

If the default text behavior does not work for your field, or your field's on-block display has additional dynamic elements, you will need to [customize the `render_` function](#customizing-rendering).

![Flowchart describing how to make decision of whether to override render_](./override-render-decision.svg)

### Customizing rendering

If the default rendering behavior does not work for your field, you will need to define custom rendering behavior. This can involve anything from setting custom display text, to changing image elements, to updating background colours.

All DOM attribute changes are legal, the only two things to remember are:

1. DOM creation should be handled during [initialization](#initializing), as it is more efficient.
2. You should always [update the `size_`](#updating-size) property to match the on-block display's size.

```javascript
      this.stovepipe_.style.display = '';
      break;
    case 'Crown':
      this.crown_.style.display = '';
      break;
    case 'Mask':
      this.mask_.style.display = '';
      break;
    case 'Propeller':
      this.propeller_.style.display = '';
      break;
    case 'Fedora':
      this.fedora_.style.display = '';
      break;
  }

  switch(this.value_.pattern) {
    case 'Dots':
      this.shellPattern_.setAttribute('fill', 'url(#polkadots)');
      break;
    case 'Stripes':
      this.shellPattern_.setAttribute('fill', 'url(#stripes)');
      break;
    case 'Hexagons':
      this.shellPattern_.setAttribute('fill', 'url(#hexagons)');
      break;
  }

  this.textContent_.nodeValue = this.value_.turtleName;

  this.updateSize_();
}
```

:::tip
Important: Always use `this.textContent_.nodeValue` to update the display text of your field. This helps support [text symbols](#adding-text-symbols).
:::

### Updating size

Updating the `size_` property of a field is very important, as it informs the block rendering code how to position the field. The best way to figure out exactly what that `size_` should be, is by experimenting.

```javascript
CustomFields.FieldTurtle.prototype.updateSize_ = function() {
  var size = this.movableGroup_.getBBox();
  if (this.borderRect_) {
    this.borderRect_.setAttribute(
      'width',
      size.width + Blockly.BlockSvg.SEP_SPACE_X
    );
    this.borderRect_.setAttribute('height', size.height + 9);
  }

  this.size_.width = size.width;
  this.size_.height = size.height + 10 + Blockly.BlockSvg.INLINE_PADDING_Y * 2;
};
```

:::tip
Note: The width and height of a field can be dynamic and updating the size does not have to be contained in its own function; it can be handled inside `render_`. However, it is usually separated to keep code more organized.
:::

### Matching block colours

If you want elements of your field to match the colours of the block they are attached to, you should override the `applyColour` method. You will want to access the colour through the block's style property.

```javascript
Blockly.FieldDropdown.prototype.applyColour = function() {
  var sourceBlock = this.sourceBlock_;
  if (sourceBlock.isShadow()) {
    this.arrow_.style.fill = sourceBlock.style.colourSecondary;
  } else {
    this.arrow_.style.fill = sourceBlock.style.colourPrimary;
  }
};
```

:::tip
Note: You may want to cache the colours in the `applyColour` method, so you can apply them to your [editor](#creating-an-editor) when it is activated.
:::
:::warning
Caution: updateColour has been deprecated as of January 2020.
:::

### Updating editability

The `updateEditable` function can be used to change how your field appears depending on if it is editable or not. The default function makes it so the background does/doesn't have a hover response (border) if it is/isn't editable. The on-block display should not change size depending on its editability, but all other changes are allowed.

```javascript
CustomFields.FieldTurtle.prototype.updateEditable = function() {
  if (!this.fieldGroup_) {
    // Not initialized yet.
    return;
  }
  Blockly.FieldColour.superClass_.updateEditable.call(this);

  var group = this.getClickTarget_();
  if (!this.isCurrentlyEditable()) {
    group.style.cursor = 'not-allowed';
  } else {
    group.style.cursor = this.CURSOR;
  }
};
```

:::warning
Caution: Messing with a field's cursor is fragile.
:::

## Serialization

[Serialization](/guides/configure/serialization) is about saving the state of your field so that it can be reloaded into the workspace later. For example, when you call `Blockly.serialization.workspaces.load`.

The state of your workspace always includes the field's value, but it could also include other state, such as the state of your field's UI. For example, if your field was a zoomable map that allowed the user to select countries, you could also serialize the zoom level.

Blockly provides two sets of serialization hooks for fields. One pair of hooks works with the new JSON serialization system, and the other pair works with the old XML serialization system.

### `saveState` and `loadState`

`saveState` and `loadState` are serialization hooks that work with the new JSON serialization system.

In some cases you do not need to provide these, because the default implementations will work. If (1) your field is a direct subclass of the base `Blockly.Field` class, (2) your value is a [JSON serializable type](https://en.wikipedia.org/wiki/JSON#Data_types), and (3) you only need to serialize the value, then the default implementation will work just fine!

Otherwise, your `saveState` function should return a JSON serializable object/value which represents the state of the field. And your `loadState` function should accept the same JSON serializable object/value, and apply it to the field. When you do this you should also set the `SERIALIZABLE` property to `true`.

```javascript
CustomFields.FieldMap.prototype.SERIALIZABLE = true;

CustomFields.FieldMap.prototype.saveState = function() {
  return {
    country: this.getValue(), // Value state
    zoom: this.getZoomLevel() // UI state
  };
};

CustomFields.FieldMap.prototype.loadState = function(state) {
  this.setValue(state['country']);
  this.setZoomLevel(state['zoom']);
};
```

`saveState` also receives an optional parameter `doFullSerialization`. This is useful for fields that normally reference state serialized by a different [serializer](/guides/configure/serialization.html#serializer-hooks). It signals to them that the referenced state won't be available, so the field should do all of the serialization itself. For example, this is true when an individual block is serialized (as opposed to serializing the whole workspace).

One field that uses this is the built-in variable field. Normally it returns the ID of the variable it is referencing, but if `doFullSerialization` is true it returns all of the state.

```javascript
Blockly.FieldVariable.prototype.saveState = function(doFullSerialization) {
  var state = { id: this.variable_.getId() };
  if (doFullSerialization) {
    state['name'] = this.variable_.name;
    state['type'] = this.variable_.type;
  }
  return state;
};

Blocky.FieldVariable.prototype.loadState = function(state) {
  var variable = Blockly.Variables.getOrCreateVariablePackage(
    this.getSourceBlock().workspace,
    state['id'],
    state['name'], // May not exist.
    state['type']
  ); // May not exist.
  this.setValue(variable.getId());
};
```

It is important to serialize all of the state (instead of a reference) when an individual block is being serialized, because if you don't and you deserialize that block into a workspace where the reference doesn't exist your field will have an invalid value.

### `toXml` and `fromXml`

`toXml` and `fromXml` are serialization hooks that work with the old XML serialization system. Only use these hooks if you have to (e.g. you're working on an old code-base that hasn't migrated yet), otherwise use `saveState` and `loadState`.

Your `toXml` function should return an XML node which represents the state of the field. And your `fromXml` function should accept the same XML node and apply it to the field. When you do this you should also set the `SERIALIZABLE` property to true.

```javascript
CustomFields.FieldMap.prototype.SERIALIZABLE = true;

CustomFields.FieldMap.prototype.toXml = function(fieldElement) {
  fieldElement.textContent = this.getValue();
  fieldElement.setAttribute('zoom', this.getZoomLevel());
  return fieldElement;
};

CustomFields.FieldMap.prototype.fromXml = function(fieldElement) {
  this.setValue(fieldElement.textContent);
  this.setZoomLevel(fieldElement.getAttribute('zoom'));
};
```

## Editable and serializable properties

The `EDITABLE` property determines if the field should have UI to indicate that it can be interacted with. It defaults to `true`.

The `SERIALIZABLE` property determines if the field should be serialized. It defaults to `false`. If this property is `true`, you may need to provide serialization and deserialization functions (see [Serialization](#serialization)).

:::tip
Important: If `EDITABLE` is `true` for your field `SERIALIZABLE` should also be set to `true`. This is not the case by default for backwards compatibility reasons.
:::

## Customizing the cursor

The `CURSOR` property determines the cursor the users see when they hover over your field. It should be a valid CSS cursor string. This defaults to the cursor defined by `.blocklyDraggable`, which is the grab cursor.
