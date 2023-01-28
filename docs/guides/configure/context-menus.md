# 上下文菜单

当用户在块或工作区上单击鼠标右键（或长按）时，将显示带有其他操作的上下文菜单。 您可以配置此上下文菜单以显示其他选项或删除默认选项。 本指南是关于向所有块或所有工作区添加自定义选项的。 如果只想更改一种类型的块的上下文菜单，请参见 [自定义块页面](/guides/create-custom-blocks/define-blocks.html#上下文菜单.html) 上的信息。

::: tip 注意 
请查看 [上下文菜单 Codelab](https://blocklycodelabs.dev/codelabs/context-menu-option/index.html)，以获取自定义上下文菜单的有效示例。
:::

## 上下文菜单 API

`ContextMenuRegistry` 类包含用于注册，注销和获取所有上下文菜单选项的方法。 该类是单例，因此应在 `Blockly.ContextMenuRegistry.registry` 对象上调用方法，而不是自己实例化一个新实例。 每当应该显示上下文菜单时，`ContextMenu` 类就会调用 `getContextMenuItems` 方法。 如果块或工作空间具有`customContextMenu` 函数，则稍后将其调用以修改选项列表。

## 添加自定义选项

注册表中的每个菜单选项都有几个属性：

- `callback`：单击菜单选项时调用的函数。

- `scopeType`：应该在其中显示此选项的 `Blockly.ContextMenuRegistry.ScopeType.BLOCK` 或 `Blockly.ContextMenuRegistry.ScopeType.WORKSPACE` 之一。 如果应同时为工作空间和块显示一个选项，则应为每个 `scopeType` 注册一次。

- `displayText`：字符串或返回字符串的函数。 确定菜单中显示的文本。

- `preconditionFn`：此函数返回 `enabled`，`disabled` 或 `hidden` 其中之一以确定是否显示以及如何呈现菜单选项。

- `weight`：确定选项排序顺序的数字。 权重较高的选项会后出现在上下文菜单中。

- `id`：该选项的唯一字符串 id。

每个函数 `callback`，`displayText`（如果是函数）和 `preconditionFn` 都将被一个 `Scope` 对象调用，该 `Scope` 对象包含有关所单击的确切工作区或块的信息。 这样，您的上下文菜单选项可以引用有关工作区或块的属性。 例如，如果工作区包含 42 个块，则允许用户删除所有块的上下文菜单选项显示为“删除 42 个块”。 在使用`preconditionFn` 的情况下，可以根据该块的某些属性是否为 `true`，设置菜单选项为 `enabled` 或 `disabled` 。

有关更多示例，您可以在 [contextmenu_items.js](https://github.com/google/blockly/blob/master/core/contextmenu_items.js) 中看到默认上下文菜单选项的注册。

## 更改或删除默认选项

您可以使用 `Blockly.ContextMenuRegistry.registry.unregister(id)`取消注册任何选项。 默认选项的 id在 [contextmenu_items.js](https://github.com/google/blockly/blob/master/core/contextmenu_items.js) 中。

要更改默认选项，请使用 id 调用 `getItem` 并根据需要对其进行更改。