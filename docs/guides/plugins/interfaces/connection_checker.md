<!--
 * @Date: 2021-04-07 16:08:49
 * @LastEditors: tortorse
 * @LastEditTime: 2021-10-18 09:44:05
 * @FilePath: \blockly-document-chinese\docs\guides\plugins\interfaces\connection_checker.md
-->
# The Connection Checker

A major benefit of using Blockly is that it ensures the generated code is syntactically correct.

The Connection Checker is the object that enforces Blockly's rules about which connections are compatible. By default the checker applies a simple type system, as described in the [Type Checks](https://developers.google.com/blockly/guides/create-custom-blocks/type-checks) page.

## The Checks

Blockly applies three levels of checks: safety, type, and drag checks.

### Safety checks

Safety checks ensure that the blocks are on the same workspace, that the connections are on different blocks, and so on. These ensure that Blockly does not get into a bad state.

Safety checks also block nonsensical combinations, such as connecting two next connections.

### Type checks

Developers can label connections with type information. Type checks use this information to enforce a type system--e.g. by blocking the connection of a string where a number is expected.

### Drag checks

Drag checks are applied only when connecting blocks by dragging, rather than programmatically. For example, only connections within a certain radius should be considered during a drag.

## Overriding the Connection Checker

Developers who wish to provide their own logic for type checks or drag checks can register a substitute connection checker object that implements the `IConnectionChecker` interface.

To implement your own safety checks: override [doSafetyChecks](https://github.com/google/blockly/blob/master/core/interfaces/i_connection_checker.js#L73) on your connection checker.

:::warning 警告
In general, developers should not override Blockly's safety checks.
:::

To implement your own type checks: override [doTypeChecks](https://github.com/google/blockly/blob/master/core/interfaces/i_connection_checker.js#L84) on your connection checker.

To implement your own drag checks: override [doDragChecks](https://github.com/google/blockly/blob/master/core/interfaces/i_connection_checker.js#L94) on your connection checker.

## Example code

The [strict connection checker plugin](https://github.com/google/blockly-samples/tree/master/plugins/strict-connection-checker) is a simple example of a custom checker.