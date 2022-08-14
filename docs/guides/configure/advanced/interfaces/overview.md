# Interfaces in Blockly

In Blockly, interfaces describe functions that an object must implement in order to replace the default object.

You don't need to inherit from a particular class in order to implement the interface. You can do whatever you want under the hood, as long as you provide the correct functions and adhere to any requirements described in comments on the interface. However, a common pattern for plugins is to extend the default class and only override the functions you want to change.

To indicate to the type checker that you implement a specific interface, annotate your class with `@implements {InterfaceName}`.

Blockly's interfaces are defined in [core/interfaces](https://github.com/google/blockly/tree/master/core/interfaces).