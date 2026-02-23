# 键盘快捷键

Blockly 维护了一个快捷键注册表，把按键或组合键（例如 `ctrl-C`）映射到具体动作。这个注册表预置了一批默认快捷键，例如复制对应的 `ctrl-C` 与 `meta-C`。你可以新增或删除快捷键。

## 键盘快捷键如何工作

快捷键注册表里存放的是“快捷键对象”。当用户按下按键或组合键时，Blockly 会执行以下流程：

1. 检查注册表中是否有快捷键匹配该按键。  
   如果同一个键有多个快捷键，按**注册顺序的逆序**尝试，也就是最后注册的先尝试。
2. 调用快捷键的 `preconditionFn`，判断当前上下文是否适用。  
   如果返回 `false`，会尝试下一个匹配快捷键。
3. 调用快捷键的 `callback` 执行动作。  
   如果返回 `true`，流程结束；如果返回 `false`，继续尝试下一个匹配快捷键。

## Scope

[`Scope`](/reference/js/blockly.contextmenuregistry_namespace.scope_interface) 对象表示当前获得焦点的 Blockly 组件。`preconditionFn` 与 `callback` 会用它来判断是否适用、以及如何执行动作。

`Scope` 常用的是 `focusedNode` 属性。它实现了 [`IFocusableNode`](/reference/js/blockly.ifocusablenode_interface)，包括工作区、块、字段、注释和自定义可聚焦组件。更多见 [焦点系统](/guides/configure/focus.html#焦点系统)。

例如，只让某快捷键作用于块：

```javascript
preconditionFn(workspace, scope) {
  return (scope.focusedNode instanceof Blockly.BlockSvg);
}
```

## KeyboardShortcut 接口

注册表中的对象实现 [`KeyboardShortcut`](/reference/js/blockly.shortcutregistry_namespace.keyboardshortcut_interface) 接口，主要字段如下。

### `name`（必填）

快捷键唯一名称，不展示给用户，也不需要可读性，不应翻译。

```javascript
const logFieldsShortcut = {
  name: 'logFields',
  // ...
};
```

### `preconditionFn`（可选）

用于判断当前场景是否适用当前快捷键。返回 `true` 才会执行 `callback`。

```javascript
const logFieldsShortcut = {
  // ...
  preconditionFn(workspace, scope) {
    // 此快捷键只作用于块。
    return (scope.focusedNode instanceof Blockly.BlockSvg);
  },
  // ...
};
```

如果快捷键始终适用，可以省略该函数，但这并不常见。  
不建议省略后在 `callback` 里再做条件判断，这会影响 Blockly 构建“上下文相关帮助菜单”等能力。

### `callback`（可选）

执行快捷键动作，仅在 `preconditionFn` 返回 `true` 或未定义时调用。

参数：

- `workspace`：当前 `WorkspaceSvg`
- `event`：触发该快捷键的 `Event`
- `shortcut`：当前 `KeyboardShortcut`
- `scope`：当前 `Scope`

返回值：成功返回 `true`，失败返回 `false`。

```javascript
const logFieldsShortcut = {
  // ...
  callback(workspace, event, shortcut, scope) {
    // preconditionFn 已保证 focusedNode 是 BlockSvg。
    for (input of scope.focusedNode.inputList) {
      // 输出所有有名称的字段值。
      for (field of input.fieldRow) {
        if (field.name) {
          console.log(field.name + ': ' + field.getText());
        }
      }
    }
    return true;
  },
  // ...
};
```

### `keyCodes`（可选）

触发该快捷键的键或组合键数组。键值使用 [`Blockly.utils.KeyCodes`](/reference/js/blockly.utils_namespace.keycodes_enum)。

```javascript
const logFieldsShortcut = {
  // ...
  keyCodes: [Blockly.utils.KeyCodes.L],
  // ...
};
```

如果你想给已有快捷键追加键位映射，可用 [`Blockly.ShortcutRegistry.registry.addKeyMapping`](/reference/js/blockly.shortcutregistry_class.addkeymapping_1_method)。

#### 组合键

对于 `Control + C` 这类组合键，先用 `createSerializedKey` 生成序列化键值：

```javascript
const ctrlC = Blockly.ShortcutRegistry.registry.createSerializedKey(
  Blockly.utils.KeyCodes.C,       // 主键
  [Blockly.utils.KeyCodes.CTRL],  // 修饰键数组
);

const copyShortcut = {
  // ...
  keyCodes: [ctrlC],
  // ...
};
```

#### Control 与 Meta

Windows 常用 `Control`，macOS 常用 `Command`（对应 `META` 键码）。要跨系统支持，通常要同时注册 `CTRL` 和 `META`：

```javascript
const ctrlC = Blockly.ShortcutRegistry.registry.createSerializedKey(
  Blockly.utils.KeyCodes.C,
  [Blockly.utils.KeyCodes.CTRL],
);
const metaC = Blockly.ShortcutRegistry.registry.createSerializedKey(
  Blockly.utils.KeyCodes.C,
  [Blockly.utils.KeyCodes.META],
);

const copyShortcut = {
  // ...
  keyCodes: [ctrlC, metaC],
  // ...
};
```

#### 实现说明

Blockly 的键盘事件处理当前使用 `KeyboardEvent` 的 `keyCode` 属性，即使该属性已被标记为弃用。

### `allowCollision`（可选）

默认同一个键或组合键只能注册一个快捷键。设为 `true` 后，当前快捷键即使键位与已有快捷键冲突也可注册。

注意：

- 该字段只影响“当前快捷键注册时”的冲突判断。
- 它不会阻止其他快捷键使用相同键位，是否允许取决于对方的 `allowCollision`。
- 同一键位即使注册了多个快捷键，最终最多只会成功执行一个；按“后注册先尝试”的顺序，某个 `callback` 返回 `true` 后就停止。

### `metadata`（可选）

任意附加信息对象，可通过 `callback` 的 `shortcut` 参数读取。

## 新增、删除与修改快捷键

新增快捷键：

```javascript
Blockly.ShortcutRegistry.registry.register(logFieldsShortcut);
```

`register` 有第二个参数 `allowOverrides`，可用于覆盖同名快捷键。  
它与 `allowCollision` 不同：`allowCollision` 处理的是“不同名但同键位”的冲突。

删除快捷键：

```javascript
Blockly.ShortcutRegistry.registry.unregister('logFields');
```

快捷键不能原地修改。应先删后加：

```javascript
// 获取已有快捷键。getRegistry 返回按名称索引的对象。
const allShortcuts = Blockly.ShortcutRegistry.registry.getRegistry();
const modLogFieldsShortcut = allShortcuts[logFieldsShortcut.name];
// 只对 math_ 开头的块生效。
modLogFieldsShortcut.preconditionFn = function (workspace, scope) {
  return (scope.focusedNode instanceof Blockly.BlockSvg &&
          scope.focusedNode.type.startsWith('math_'));
}
// 删除旧快捷键并注册新快捷键。
Blockly.ShortcutRegistry.registry.unregister(logFieldsShortcut.name);
Blockly.ShortcutRegistry.registry.register(modLogFieldsShortcut);
```

## 默认快捷键

注册表默认包含一组快捷键，定义见：

- [`shortcut_items.ts`](https://github.com/RaspberryPiFoundation/blockly/blob/main/core/shortcut_items.ts)

默认快捷键在 `registerXxxx` 系列函数中定义。

## 键盘导航快捷键

[键盘导航](/guides/configure/keyboard-nav.html#使用键盘导航) 插件包含用于键盘导航 Blockly 的快捷键，例如方向键导航。  
这对无法使用鼠标的用户（例如部分运动或视觉障碍用户）是必需能力，对高频用户也有显著效率提升。
