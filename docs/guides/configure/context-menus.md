# 上下文菜单

上下文菜单列出了用户可对某个组件执行的操作，例如工作区、块、工作区注释。用户右键或在触摸设备上长按时会显示菜单。  
如果使用 [键盘导航](/guides/configure/keyboard-nav) 插件，也可以用键盘快捷键打开菜单，默认是 Windows 的 `Ctrl+Enter` 或 Mac 的 `Command+Enter`。

<img src="/static/blockly/images/context-menus/block-default-menu.png" alt="块的默认上下文菜单" width="200">

上下文菜单适合放“低频操作”，例如下载截图。如果某个操作使用频率更高，通常更适合做成更容易发现的入口。

工作区、块、工作区注释、气泡、连接器都支持上下文菜单。你也可以在自定义组件上实现上下文菜单。Blockly 提供了可定制的标准菜单，并支持按“每个工作区”或“每类块”进一步定制。

## 上下文菜单如何工作

Blockly 有一个注册表，里面存放“菜单项模板”。每个模板定义如何构造一条菜单项。用户在某个组件上打开上下文菜单时，组件会执行：

1. 让注册表生成适用于该组件的菜单项数组。注册表会逐个询问模板是否适用，适用就加入数组。
2. 如果组件是工作区或块，再检查该工作区或块是否提供了自定义函数。若提供，就把数组交给该函数做增删改。
3. 用最终数组渲染上下文菜单。

Blockly 内置了工作区、块、工作区注释的标准模板。工作区和块的模板会自动预加载。若要使用工作区注释模板，需要你自己加载到注册表，可参考 [工作区注释](/guides/configure/workspace_comment)。

注册表模板的增删改见本文的 [自定义注册表](#自定义注册表)。

::: tip 术语说明
Blockly 文档中 `item` 和 `option` 都可能指“注册表中的模板”或“菜单中的条目”，具体含义取决于上下文。
:::

## Scope 对象

上下文菜单由多种组件实现，包括工作区、工作区注释、连接器、块、气泡及自定义组件。不同组件可展示不同菜单项，同一菜单项也可能因组件类型而行为不同，所以系统需要知道“菜单是在哪个组件上被打开的”。

注册表通过 `Scope` 对象传递这层信息。被操作组件位于 `focusedNode` 属性中，其类型实现了 [`IFocusableNode`](/reference/js/blockly.ifocusablenode_interface)。关于焦点系统可见 [焦点系统](/guides/configure/focus)。

模板中多个函数都会收到 `Scope`。你可以基于 `focusedNode` 类型做分支逻辑，例如判断是否为块：

```javascript
if (scope.focusedNode instanceof Blockly.BlockSvg) {
  // 对块执行操作
}
```

`Scope` 还有一些历史字段，仍可能被设置，但不建议继续依赖：

- `block`：仅当组件是 `BlockSvg` 时设置。
- `workspace`：仅当组件是 `WorkspaceSvg` 时设置。
- `comment`：仅当组件是 `RenderedWorkspaceComment` 时设置。

这些字段无法覆盖所有可能拥有上下文菜单的组件类型，优先使用 `focusedNode`。

## RegistryItem 类型

模板类型为 [`ContextMenuRegistry.RegistryItem`](/reference/js/blockly.contextmenuregistry_namespace.registryitem_typealias)。  
注意：`preconditionFn`、`displayText`、`callback` 与 `separator` 互斥。

### ID

`id` 必须是唯一字符串，能表达菜单项用途。

```javascript
const collapseTemplate = {
  id: 'collapseBlock',
  // ...
};
```

### 前置条件函数

`preconditionFn` 用于控制菜单项何时展示、以何种状态展示。  
返回值只能是 `enabled`、`disabled`、`hidden`。

| 值 | 说明 | 示例 |
| --- | --- | --- |
| `enabled` | 菜单项可用 | <img src="/static/blockly/images/context-menus/enabled-option.png" alt="可用菜单项" width="150"> |
| `disabled` | 菜单项不可用 | <img src="/static/blockly/images/context-menus/disabled-option.png" alt="不可用菜单项" width="150"> |
| `hidden` | 菜单项隐藏 |  |

`preconditionFn` 也会收到 [`Scope`](#scope-对象)，可据此判断组件类型和组件状态。

示例：仅对块显示该项，且块未折叠时可用，已折叠时禁用：

```javascript
const collapseTemplate = {
  // ...
  preconditionFn: (scope) => {
    if (scope.focusedNode instanceof Blockly.BlockSvg) {
      if (!scope.focusedNode.isCollapsed()) {
        return 'enabled';
      } else {
        return 'disabled';
      }
    }
    return 'hidden';
  },
  // ...
}
```

### 显示文本

`displayText` 是给用户看的菜单文字。它可以是字符串、HTML，或返回字符串/HTML 的函数。

```javascript
const collapseTemplate = {
  // ...
  displayText: 'Collapse block',
  // ...
};
```

如果要显示 `Blockly.Msg` 中的翻译文本，应使用函数形式。直接赋值可能在消息尚未加载时得到 `undefined`。

```javascript
const collapseTemplate = {
  // ...
  displayText: () => Blockly.Msg['MY_COLLAPSE_BLOCK_TEXT'],
  // ...
};
```

当 `displayText` 是函数时，也会收到 `Scope`，可动态拼接组件信息：

```javascript
const collapseTemplate = {
  // ...
  displayText: (scope) => {
    if (scope.focusedNode instanceof Blockly.Block) {
      return `Collapse ${scope.focusedNode.type} block`;
    }
    return '';
  },
  // ...
}
```

### 权重

`weight` 决定菜单项顺序。值越大越靠下显示。

```javascript
const collapseTemplate = {
  // ...
  weight: 10,
  // ...
}
```

内置菜单项权重通常从 1 开始按 1 递增。

### 回调函数

`callback` 是点击菜单项后执行的函数，参数包括：

- `scope`：[`Scope`](#scope-对象) 对象，指向当前打开菜单的组件。
- `menuOpenEvent`：触发“打开菜单”的事件，可能是 `PointerEvent` 或 `KeyboardEvent`。
- `menuSelectEvent`：触发“选中此菜单项”的事件，可能是 `PointerEvent` 或 `KeyboardEvent`。
- `location`：菜单打开位置的 `Coordinate`，单位是 [像素坐标](/guides/configure/metrics_manager.html#坐标系)。

```javascript
const collapseTemplate = {
  // ...
  callback: (scope, menuOpenEvent, menuSelectEvent, location) => {
    if (scope.focusedNode instanceof Blockly.BlockSvg) {
      scope.focusedNode.collapse();
    }
  },
}
```

你也可以基于 `scope` 对不同组件做不同动作：

```javascript
const collapseTemplate = {
  // ...
  callback: (scope) => {
    if (scope.focusedNode instanceof Blockly.BlockSvg) {
      // 在块上：仅折叠当前块
      const block = scope.focusedNode;
      block.collapse();
    } else if (scope.focusedNode instanceof Blockly.WorkspaceSvg) {
      // 在工作区上：折叠全部块
      let workspace = scope.focusedNode;
      collapseAllBlocks(workspace);
    }
  }
}
```

### 分隔线

`separator` 用于在菜单中绘制分隔线。

带 `separator` 的模板不能再包含 `preconditionFn`、`displayText`、`callback`，并且只能用 `scopeType` 做作用域限制。因此它只能用于工作区、块、工作区注释的上下文菜单。

```javascript
const separatorAfterCollapseBlockTemplate = {
  id: 'separatorAfterCollapseBlock',
  scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
  weight: 11, // 放在你要分隔的两个项目之间
  separator: true,
};
```

每条分隔线都需要单独模板，位置通过 `weight` 控制。

### scopeType

`scopeType` 已废弃。它过去用于限制菜单项仅在块、工作区注释或工作区显示。由于上下文菜单现在可用于更多组件，仅靠 `scopeType` 过于受限，建议改用 `preconditionFn` 控制显示与隐藏。

已有依赖 `scopeType` 的模板仍可继续工作。

```javascript
const collapseTemplate = {
  // ...
  scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
  // ...
};
```

## 自定义注册表

你可以在注册表里新增、删除、修改模板。默认模板见 [`contextmenu_items.ts`](https://github.com/RaspberryPiFoundation/blockly/blob/main/core/contextmenu_items.ts)。

### 添加模板

通过注册加入模板。通常在页面加载阶段执行一次，注入工作区前后都可以。

```javascript
const collapseTemplate = { /* 上文属性 */ };
Blockly.ContextMenuRegistry.registry.register(collapseTemplate);
```

::: tip 注意
可参考 [context menu codelab](https://blocklycodelabs.dev/codelabs/context-menu-option/index.html) 的完整示例。
:::

### 删除模板

按 `id` 注销模板：

```javascript
Blockly.ContextMenuRegistry.registry.unregister('someID');
```

### 修改模板

先从注册表取出模板，再原地修改：

```javascript
const template = Blockly.ContextMenuRegistry.registry.getItem('someID');
template?.displayText = 'some other display text';
```

## 禁用块的上下文菜单

默认情况下，块的上下文菜单提供了添加块注释、复制块等操作。

可对单个块禁用：

```javascript
block.contextMenu = false;
```

在块类型 JSON 中可使用 `enableContextMenu`：

```javascript
{
  // ...,
  "enableContextMenu": false,
}
```

## 按块类型或工作区自定义上下文菜单

当 Blockly 生成好菜单项数组后，你可以按具体块或工作区继续定制。做法是给 [`BlockSvg.customContextMenu`](/reference/js/blockly.blocksvg_class.customcontextmenu_property) 或 [`WorkspaceSvg.configureContextMenu`](/reference/js/blockly.workspacesvg_class.configurecontextmenu_property) 赋值一个函数，原地修改该数组。

传给块的数组元素类型是 [`ContextMenuOption`](/reference/js/blockly.contextmenuregistry_namespace.contextmenuoption_typealias) 或实现 [`LegacyContextMenuOption`](/reference/js/blockly.contextmenuregistry_namespace.legacycontextmenuoption_interface) 的对象。传给工作区的元素类型是 `ContextMenuOption`。Blockly 会使用以下字段：

- `text`：显示文本。
- `enabled`：若为 `false`，用灰色显示。
- `callback`：点击后的执行函数。
- `separator`：是否分隔线，和其他三项互斥。

可在参考文档查看字段类型与函数签名。

示例：给工作区菜单追加 `Hello, World!`：

```javascript
workspace.configureContextMenu = function (menuOptions, e) {
  const item = {
    text: 'Hello, World!',
    enabled: true,
    callback: function () {
      alert('Hello, World!');
    },
  };
  // 追加到菜单末尾
  menuOptions.push(item);
}
```

## 在自定义对象上显示上下文菜单

要让自定义组件支持上下文菜单，可按以下步骤：

1. 实现 [`IFocusableNode`](/reference/js/blockly.ifocusablenode_interface) 接口，或继承已实现该接口的类。上下文菜单系统会用它识别组件，键盘导航也依赖它进行聚焦。
2. 实现 [`IContextMenu`](/reference/js/blockly.icontextmenu_interface)，其中包含 `showContextMenu`。该函数需从注册表获取菜单项、计算屏幕坐标并在有可用菜单项时展示菜单。

```javascript
class MyBubble implements IFocusableNode, IContextMenu {
  ...
  showContextMenu(menuOpenEvent) {
    // 从注册表获取菜单项
    const scope = {focusedNode: this};
    const items = Blockly.ContextMenuRegistry.registry.getContextMenuOptions(scope, menuOpenEvent);

    // 没有菜单项则直接返回
    if (!items.length) return;

    // 在组件对应的屏幕位置显示菜单
    // 位置使用像素坐标，因此需要把工作区坐标转换为屏幕坐标
    const location = Blockly.utils.svgMath.wsToScreenCoordinates(new Coordinate(this.x, this.y));

    // 显示菜单
    Blockly.ContextMenu.show(menuOpenEvent, items, this.workspace.RTL, this.workspace, location);
  }
}
```

3. 添加事件处理，在用户右键组件时调用 `showContextMenu`。  
   若使用 [键盘导航](/guides/configure/keyboard-nav) 插件，插件会处理 `Ctrl+Enter`（Windows）或 `Command+Enter`（Mac）来调用 `showContextMenu`。
4. 把自定义菜单项模板 [注册到注册表](#添加模板)。
