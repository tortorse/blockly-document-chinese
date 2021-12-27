# Serialization

Serialization is about saving the state of your workspace so that it can be loaded back into the workspace later. This includes serializing the state of any blocks, variables, or plugins that you want to round-trip.

Originally Blockly only provided an XML-based serialization system, but now it also includes a JSON-based system. The XML system is being iceboxed (meaning it won’t receive new features) but the JSON system will continue to improve.

## JSON system

::: tip 提示
Note: For information on how to migrate to the new APIs, see the [migration guide](https://docs.google.com/document/d/1wv5ORrO4icVHeU15FLSn37mdNLyJpQbMTo7mmTqsGl0/edit?usp=sharing).
:::

The JSON system allows you to serialize the state of your workspace to a JavaScript object. This is advantageous because:

1. JSON is easy to compress or convert.

2. JSON is easy to work with programmatically.

3. JSON is easy to extend and append data to.

The JSON serialization system is made up of multiple serializers. There are built-in serializers for blocks and variables, and you can also register additional serializers. Each serializer is responsible for serializing and deserializing the state of a particular plugin or system.

## APIs

For information about the JSON system's APIs please see the [reference documentation](https://developers.google.com/blockly/reference/js/Blockly.serialization.workspaces).

### Deserialization order

The JSON system has an explicit deserialization order, which makes it easier to prevent duplicating state within a save.

When `Blockly.serialization.workspaces.load` is called, serializers are given state to deserialize in order of priority. This is explained further in the [Serializers](#serializer-hooks) section, and its purpose is to allow serializers to depend on state from other systems.

The order for deserialization of built-in serializers is:

1. **Variables are deserialized**.

2. **Blocks are deserialized**. Individual stacks/top-level blocks are deserialized in an arbitrary order.

  a. **Type is deserialized**. This triggers the block’s init method, mixes in extensions, etc.
  b. **Attributes are deserialized**. This includes properties that can apply to any block. For example: x, y, collapsed, disabled, data, etc.
  c. **Extra state is deserialized**. See the [Extensions and Mutators](/guides/create-custom-blocks/extensions) documentation for more info.
  d. **The block is connected to its parent (if one exists)**.
  e. **Icons are deserialized**. Individual icons are deserialized in an arbitrary order.
  f. **Fields are deserialized**. Individual fields are deserialized in an arbitrary order.
  g. **Input blocks are deserialized**. This includes blocks connected to value inputs and statement inputs. Individual inputs are deserialized in an arbitrary order.
  h. **Next blocks are deserialized**.

### When to save extra state

For blocks, if you have something lower in the order that depends on something higher in the order, you should duplicate that data and add it to your extra state.

For example, if you have a field that only exists if a next block is connected, you should add info about that next block to your extra state, so the field can be added to your block before the field’s state is deserialized.

However, if you have an input that only exists if a field has a certain value, you do not need to add info about the field to your extra state. This is because the state of your field will be deserialized first, and when it is, you can add the input to your block. Usually adding the input will be triggered by a [validator](/guides/create-custom-blocks/fields/validators#registering_a_local_validator).

Note that the rule about duplicating state should also take into account that block stacks, icons, fields, and input blocks are deserialized in an arbitrary order. For example, if you have one field B that only exists if another field A has a certain value, you should add info about A to your extra state in case B is deserialized before A.

### Block hooks

For information about how to add extra serialization to blocks, see the [Extensions and Mutators](/guides/create-custom-blocks/extensions) documentation.

### Field hooks

For information about how to serialize fields, see the [Custom fields](/guides/create-custom-blocks/fields/customizing-fields/creating#serialization) documentation.

### Serializer hooks

The JSON system allows you to register serializers which serialize and deserialize some state. Blockly's built-in serializers take care of serializing information about blocks and variables, but if you want to serialize other information you'll need to add your own serializer. For example, workspace-level comments are not serialized by default by the JSON system. If you want to serialize them, you will need to register an additional serializer.

Additional serializers are often used to serialize and deserialize the state of a plugin.

```javascript
Blockly.serialization.registry.register(
    'workspace-comments',  // Name
    {
      save: saveFn,      // Save function
      load: loadFn,      // Load function
      clear: clearFn,    // Clear function
      priority: 10,      // Priority
    });
```

When you register a serializer you must provide several things:

- A name for the serializer, which the data is also saved under.

- A function to save the state of the plugin/system associated with the serializer.

- A function to clear the state.

- A function to load the state.

- A priority, which is used to determine the [deserialization order](#deserialization-order).

  You can base the priority of your serializer on the [built-in priorities](https://developers.google.com/blockly/reference/js/Blockly.serialization.priorities)

When `Blockly.serialization.workspaces.save` is called, each serializer's `save` function will be called, and its data will be added to the final JSON output:

```javascript
{
  "blocks": { ... },
  "workspaceComments": [ // Provided by workspace-comments serializer
    {
      "x": 239,
      "y": 31,
      "text": "Add 2 + 2"
    },
    // etc...
  ]
}
```

When `Blockly.serialization.workspaces.load` is called, each serializer is triggered in order of priority. Serializers with more positive priority values are triggered before serializers with less positive priority values.

When a serializer is triggered, two things happen:

  1. The provided clear function is called. This ensures that the state of your plugin/system is clean before more state is loaded. For example, the workspace-comments serializer would remove all existing comments from the workspace.
  2. The provided load function is called.

## XML system

The XML system allows you to serialize your workspace to an XML node. This was the original serialization system of Blockly. It has now been iceboxed, which means it will not receive new features. As such, we recommend using the JSON system if possible.

:::tip 提示
Note: For information on how to migrate to the new APIs, see the [migration guide](https://docs.google.com/document/d/1wv5ORrO4icVHeU15FLSn37mdNLyJpQbMTo7mmTqsGl0/edit?usp=sharing).
:::

### APIs

For information about the XML system's APIs please see the [reference documentation](https://developers.google.com/blockly/reference/js/Blockly.Xml).

### Block hooks

For information about how to add extra serialization to blocks, see the [Extensions and Mutators](/guides/create-custom-blocks/extensions) documentation.

### Field hooks

For information about how to serialize fields, see the [Custom fields](/guides/create-custom-blocks/fields/customizing-fields/creating#serialization) documentation.

