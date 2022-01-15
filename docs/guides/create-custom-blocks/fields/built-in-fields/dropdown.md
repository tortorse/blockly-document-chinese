# Dropdown fields

The dropdown field stores a string as its value and a string as its text. The value is a language-neutral key that will be used for accessing the text and will not get translated when Blockly is switched between languages. The text is a human-readable string that will be displayed to the user.

#### Dropdown field

![](./dropdown/on_block.png)

#### Dropdown field with editor open

![](./dropdown/with_editor.png)

#### Dropdown field on collapsed block

![](./dropdown/collapsed.png)

## Creation

The dropdown constructor takes in a menu generator and an optional [validator](#creating-a-dropdown-validator). The menu generator has lots of flexibility, but it is essentially an array of options, each option containing a human-readable part, and a language-neutral string.

### Simple text dropdowns

![Open dropdown with two text options](./dropdown/with_editor.png)

:::: tabs
::: tab JSON

```json
{
  "type": "example_dropdown",
  "message0": "drop down: %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "FIELDNAME",
      "options": [
        ["first item", "ITEM1"],
        ["second item", "ITEM2"]
      ]
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_dropdown'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('drop down:')
      .appendField(
        new Blockly.FieldDropdown([
          ['first item', 'ITEM1'],
          ['second item', 'ITEM2']
        ]),
        'FIELDNAME'
      );
  }
};
```

:::
::::

Keeping the human-readable information separate from the language-neutral key allows the dropdown menu's setting to be preserved between languages. For instance an English version of a block may define `[['left', 'LEFT'], ['right', 'RIGHT]]` while a German version of the same block would define `[['links', 'LEFT'], ['rechts', 'RIGHT]]`.

### Image dropdowns

Options in a dropdown menu may also be images instead of text. Image objects are specified with `src`, `width`, `height`, and `alt` properties.

Note that although a dropdown can have a mix of text options and image options, an individual option cannot currently contain both an image and text.

![Dropdown field containing images and text](./dropdown/with_images.png)

::::tabs
::: tab JSON

```json
{
  "type": "image_dropdown",
  "message0": "flag %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "FLAG",
      "options": [
        ["none", "NONE"],
        [
          { "src": "canada.png", "width": 50, "height": 25, "alt": "Canada" },
          "CANADA"
        ],
        [{ "src": "usa.png", "width": 50, "height": 25, "alt": "USA" }, "USA"],
        [
          { "src": "mexico.png", "width": 50, "height": 25, "alt": "Mexico" },
          "MEXICO"
        ]
      ]
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['image_dropdown'] = {
  init: function() {
    var input = this.appendDummyInput().appendField('flag');
    var options = [
      ['none', 'NONE'],
      [{ src: 'canada.png', width: 50, height: 25, alt: 'Canada' }, 'CANADA'],
      [{ src: 'usa.png', width: 50, height: 25, alt: 'USA' }, 'USA'],
      [{ src: 'mexico.png', width: 50, height: 25, alt: 'Mexico' }, 'MEXICO']
    ];
    input.appendField(new Blockly.FieldDropdown(options), 'FLAG');
  }
};
```

:::
::::

### Dynamic dropdowns

![Dropdown field with days of the week](./dropdown/dynamic.png)
::::tabs
::: tab JSON

```json
{
  "type": "dynamic_dropdown",
  "message0": "day %1",
  "args0": [
    {
      "type": "input_dummy",
      "name": "INPUT"
    }
  ],
  "extensions": ["dynamic_menu_extension"]
}
```

```javascript
Blockly.Extensions.register('dynamic_menu_extension', function() {
  this.getInput('INPUT').appendField(
    new Blockly.FieldDropdown(function() {
      var options = [];
      var now = Date.now();
      for (var i = 0; i < 7; i++) {
        var dateString = String(new Date(now)).substring(0, 3);
        options.push([dateString, dateString.toUpperCase()]);
        now += 24 * 60 * 60 * 1000;
      }
      return options;
    }),
    'DAY'
  );
});
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['dynamic_dropdown'] = {
  init: function() {
    var input = this.appendDummyInput()
      .appendField('day')
      .appendField(new Blockly.FieldDropdown(this.generateOptions), 'DAY');
  },

  generateOptions: function() {
    var options = [];
    var now = Date.now();
    for (var i = 0; i < 7; i++) {
      var dateString = String(new Date(now)).substring(0, 3);
      options.push([dateString, dateString.toUpperCase()]);
      now += 24 * 60 * 60 * 1000;
    }
    return options;
  }
};
```

:::
::::
A dropdown can also be provided with a function instead of a list of static options, which allows the options to be dynamic. The function should return an array of options in the same `[human-readable-value, language-neutral-key]` format as static options. Every time the dropdown is clicked the function is run and the options are recalculated.

:::tip
Note: Prefix/suffix matching does not occur for dynamic dropdowns.
:::

## Serialization

::::tabs
::: tab JSON
The JSON for a dropdown field looks like so:

```json
{
  "fields": {
    "FIELDNAME": "LANGUAGE-NEUTRAL-KEY"
  }
}
```

Where `FIELDNAME` is a string referencing an dropdown field, and the value is the value to apply to the field. The value should be a language-neutral option key.
:::
::: tab XML
The XML for a dropdown field looks like so:

```xml
<field name="FIELDNAME">LANGUAGE-NEUTRAL-KEY</field>
```

Where the field's `name` attribute contains a string referencing a dropdown field, and the inner text is the value to apply to the field. The inner text should be a valid language-neutral option key.

:::
::::

## Customization

### Dropdown arrow

The `Blockly.FieldDropdown.ARROW_CHAR` property can be used to change the unicode character representing the dropdown arrow.

![Dropdown field with custom arrow](./dropdown/customized_arrow.png)

The `ARROW_CHAR` property defaults to `\u25BC` (▼) on Android and \u25BE (▾) otherwise.

This is a global property, so it will modify all dropdown fields when set.

### Menu height

The `Blockly.FieldDropdown.MAX_MENU_HEIGHT_VH` property can be used to change the maximum height of the menu. It is defined as a percentage of the viewport height, the viewport being the window.

The `MAX_MENU_HEIGHT_VH` property defaults to 0.45.

This is a global property, so it will modify all dropdown fields when set.

## Prefix/suffix matching

If all the dropdown menu options share common prefix and/or suffix words, these words are automatically factored out and inserted as static text. For example, here are two ways to create the same block (this first without suffix matching, and the second with):

Without suffix matching:
::::tabs
::: tab JSON

```json
{
  "type": "dropdown_no_matching",
  "message0": "hello %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "MODE",
      "options": [
        ["world", "WORLD"],
        ["computer", "CPU"]
      ]
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['dropdown_no_matching'] = {
  init: function() {
    var options = [
      ['world', 'WORLD'],
      ['computer', 'CPU']
    ];

    this.appendDummyInput()
      .appendField('hello')
      .appendField(new Blockly.FieldDropdown(options), 'MODE');
  }
};
```

:::
::::

With suffix matching:

::::tabs
::: tab JSON

```json
{
  "type": "dropdown_with_matching",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "MODE",
      "options": [
        ["hello world", "WORLD"],
        ["hello computer", "CPU"]
      ]
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['dropdown_with_matching'] = {
  init: function() {
    var options = [
      ['hello world', 'WORLD'],
      ['hello computer', 'CPU']
    ];

    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown(options),
      'MODE'
    );
  }
};
```

:::
::::
![Dropdown field with "hello" as a label and "world", "computer" as options](./dropdown/prefix_matched.png)

One advantage of this approach is that the block is easier to translate into other languages. The earlier code has the strings `'hello'`, `'world'`, and `'computer'`, whereas the revised code has the strings `'hello world'` and `'hello computer'`. Translators have a much easier time translating phrases than words in isolation.

Another advantage of this approach is that word order often changes between languages. Imagine a language that used `'world hello'` and `'computer hello'`. The suffix matching algorithm will detect the common `'hello'` and display it after the drop-down.

However, sometimes the prefix/suffix matching fails. There are some cases where two words should always go together and the prefix should not be factored out. For example `'drive red car'` and `'drive red truck'` should arguably only have `'drive'` factored out, not `'drive red'`. The Unicode non-breaking space `'\u00A0'` may be used in place of a regular space to suppress the prefix/suffix matcher. Thus the above example can be fixed with `'drive red\u00A0car'` and `'drive red\u00A0truck'`.

Another place where prefix/suffix matching fails is in languages that do not separate individual words with spaces. Chinese is a good example. The string `'訪問中國'` means `'visit China'`, note the lack of spaces between words. Collectively, the last two characters `('中國'`) are the word for `'China'`, but if split they would mean `'centre'` and `'country'` respectively. To make prefix/suffix matching work in languages such as Chinese, just insert a space where the break should be. For example `'訪問 中國'` and `'訪問 美國'` would result in `"visit [China/USA]"`, whereas `'訪問 中 國'` and `'訪問 美 國'` would result in `"visit [centre/beautiful] country"`.

## Creating a dropdown validator

:::tip
Note: For information on validators in general see Validators.
:::
A dropdown field's value is a language-neutral string, so any validators must accept a string and return a string _that is an available option_, `null`, or `undefined`.

For example, you could define a dropdown field with three options and a validator like this:

```javascript
validate: function(newValue) {
  this.getSourceBlock().updateConnections(newValue);
  return newValue;
},

init: function() {
  var options = [
   ['has neither', 'NEITHER'],
   ['has statement', 'STATEMENT'],
   ['has value', 'VALUE'],
  ];

  this.appendDummyInput()
  // Pass the field constructor the options list, the validator, and the name.
      .appendField(new Blockly.FieldDropdown(options, this.validate), 'MODE');
}
```

`validate` always returns the value it was passed, but it calls the helper function `updateConnection` which adds or removes inputs based on the dropdown value:

```javascript
updateConnections: function(newValue) {
  this.removeInput('STATEMENT', /* no error */ true);
  this.removeInput('VALUE', /* no error */ true);
  if (newValue == 'STATEMENT') {
    this.appendStatementInput('STATEMENT');
  } else if (newValue == 'VALUE') {
    this.appendValueInput('VALUE');
  }
}
```

![](./dropdown/validator.gif)
