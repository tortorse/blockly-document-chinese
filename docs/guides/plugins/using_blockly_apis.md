# Using Blockly APIs

## Introduction

This page describes best practices for calling functions and accessing properties in core Blockly. This page focuses on plugins, but similar principles apply to any application integration.

## Subclassing and extending

Blockly has multiple paradigms for adding functionality, including:

- Subclasses (e.g. creating a new renderer)
- Mixins (e.g. adding a block extension or mutator)
- Block definitions (e.g. procedure block definitions)

For the purposes of this document, all three cases are equivalent to subclassing.

## Injecting subclasses

We support replacing certain classes through the inject method. These subclasses must either extend the base class, or implement their corresponding interface.

You can pass your subclass into the inject method.

```javascript
Blockly.inject('blocklyDiv', {
  plugins: {
    'metricsManager': CustomMetricsManagerClass
  }
}
```

Or you can register your class using `Blockly.registry` and use the registry name to inject the class.

```javascript
Blockly.registry.register(Blockly.registry.Type.METRICS_MANAGER, 'YOUR_NAME', SubClass);

Blockly.inject('blocklyDiv', {
  plugins: {
    'metricsManager': 'YOUR_NAME'
  }
}
```

The following classes can be replaced:

| Registration Name        | Interface/Base Class                                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| blockDragger             | [Blockly.IBlockDragger](https://developers.google.com/blockly/reference/js/Blockly.IBlockDragger)                     |
| connectionChecker        | [Blockly.IConnectionChecker](https://developers.google.com/blockly/reference/js/Blockly.IConnectionChecker)           |
| flyoutsVerticalToolbox   | [Blockly.IFlyout](https://developers.google.com/blockly/reference/js/Blockly.IFlyout)                                 |
| flyoutsHorizontalToolbox | [Blockly.IFlyout](https://developers.google.com/blockly/reference/js/Blockly.IFlyout)                                 |
| metricsManager           | [Blockly.IMetricsManager](https://developers.google.com/blockly/reference/js/Blockly.IMetricsManager)                 |
| renderer                 | [Blockly.blockRendering.Renderer](https://developers.google.com/blockly/reference/js/Blockly.blockRendering.Renderer) |
| toolbox                  | [Blockly.IToolbox](https://developers.google.com/blockly/reference/js/Blockly.IToolbox)                               |

For more information on interfaces check the [interfaces section](/guides/plugins/interfaces/overview) of the documentation.

::: tip Note
All protected and public methods on registered classes can be overridden. However, protected methods on non registered classes should not be overridden.
:::

## Visibility

We use Closure compiler [annotations to mark visibility](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#visibility-checks) in the core library as `public`, `package`, `protected`, `private`, or `deprecated`.

All `public`, `package`, and `protected` members are documented in the [References](https://developers.google.com/blockly/reference/js) section of the Blockly website. You can also check visibility by reading the comments in the code.

::: danger Caution
While JavaScript does not enforce these visibility annotations, you should avoid accessing anything that is not public. The Blockly team does not guarantee stability of non-public properties and functions between releases.
:::

## Annotations

### public

Anything marked `public` is part of our public API.

We try to not change our public API frequently or without good reason and warning. The exception: we may make a new API public in the Q1 release and modify it in the Q2 release in response to early feedback. After that you may consider a public function or property stable.

Public functions may be called from anywhere, and overridden in subclasses as long as the signature does not change.

### package

Package functions and properties are intended to be used within the core library, but not externally. We do not guarantee stability of anything marked `@package`. This means that the type, meaning, name, or function signature of anything marked `@package` may change without warning.

Package functions may be called from anywhere, and overridden in subclasses as long as the signature does not change.

### protected

Protected functions and properties may only be accessed by the defining class or a subclass.

Subclasses are allowed to override protected functions and properties, without changing type signatures.

For instance, a custom renderer that extends the base renderer class may access its protected properties.

In each case you should make sure you understand how the function or property is used in the rest of the code.

### private

These can only be accessed by code in the same file as the definition. Directly accessing these properties may result in undefined behaviour.

Subclasses are not allowed to override private functions and properties.

Blockly uses an `underscore_` at the end of private properties and functions.

::: tip Note
In rare cases private functions were used so widely that they became public, but without name changes. For example, [Blockly.bindEventWithChecks\_](https://github.com/google/blockly/blob/096d1c46c5066cfa7e59db3b41405b7e854b95d0/core/blockly.js#L455) is public.
:::

### deprecated

Anything marked `@deprecated` should not be used. Most deprecations include directions on the preferred code, either in a console warning or JSDoc.

Where possible, deprecated functions will log a warning that includes the intended deletion date and a recommendation for a replacement function to call.

## FAQs

### What if the function I want to use isn't public?

File a [feature request](https://github.com/google/blockly/issues/new?assignees=&labels=type%3A+feature+request%2C+triage&template=feature_request.md) on core Blockly. Include a description of your use case and a statement of what you would like us to make public.

We will use the feature to request to discuss whether to make it public, or whether there are other ways for you to get the same information.

If we decide to make it public, either you or the Blockly team will make the appropriate change, and it will go live in the next quarterly Blockly release.

If you choose to use a non-public member in your plugin, consider marking your plugin as a beta and include the information in your `README`.

## What about monkeypatching?

Read up on [monkeypatching](https://en.wikipedia.org/wiki/Monkey_patch#Applications).

Monkeypatching in a published plugin is unsafe, because your code may interact poorly with any other plugin that monkeypatches the same code. For this reason we **strongly** recommend against monkeypatching in third party plugins, and will not accept it in first party plugins.

### Can I override public functions?

When subclassing: yes. Otherwise: no, that's monkeypatching.

### Can I override package functions?

When subclassing: yes. Otherwise: no, that's monkeypatching.

### Can I override protected functions?

When subclassing: yes. Otherwise: no, that's monkeypatching.

### When can I access properties directly? When should I use a getter or a setter?

If we publish a getter or a setter, please use that instead of directly accessing the property. If the property is not public, definitely use getters and setters.

::: tip Note
Consistent usage of getters and setters in plugins gives us flexibility to make changes in core Blockly without breaking published code.
:::
What if this property doesn't have an annotation?
By default it's public, but please drop us a line in case we want to put a getter/setter pair in place for you.

### What if this function doesn't have an annotation?
It's public by default.

### What if I'm still not sure?
Ask a question on the [forum](https://groups.google.com/forum/#!forum/blockly) and we'll get back to you, generally within a business day.
