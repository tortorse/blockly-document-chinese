<!--
 * @Date: 2021-04-07 16:05:21
 * @LastEditors: tortorse
 * @LastEditTime: 2021-10-18 13:24:16
 * @FilePath: \blockly-document-chinese\docs\guides\plugins\overview.md
-->
## Plugins

## Introduction

A plugin is a self-contained piece of code that adds functionality to Blockly. Plugins can add fields, define themes, create renderers, and much more.

The target user for a plugin is a developer who finds and uses the plugin through npm. For more information on building a plugin you can also watch our [2021 How to Build a Plugin talk](https://www.youtube.com/watch?v=cZlZrTk2aQU&list=PLSIUOFhnxEiCjoIwJ0jAdwpTZET73CK7d&index=7) and our [2021 Plugins Overview talk](https://www.youtube.com/watch?v=rg-V0w7UZFc&list=PLSIUOFhnxEiCjoIwJ0jAdwpTZET73CK7d&index=3).

## First-party vs third-party

Plugins defined in the [blockly-samples](https://github.com/google/blockly-samples) repository are first-party plugins, which means that they are supported by the Blockly team and published under the @blockly scope on npm.

Great first party plugins:

- have obvious use cases
- are general-purpose
- are stable
- are easy to use

Third party plugins are maintained and published independently. Third party plugins may be more complex, more experimental, or more targeted.

For instance, a field for setting motor speed could be used in many robotics projects. On the other hand, a field for editing a specific object defined by your database schema is better as a third party plugin.

