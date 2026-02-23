# 焦点系统

焦点系统用于跟踪用户在 Blockly 编辑器中的当前位置。Blockly 和自定义代码都可以用它确定当前哪个组件有焦点，并把焦点移动到其他组件。

理解焦点系统很重要，这样你的自定义代码才能与 Blockly 的交互和无障碍能力正确协同。

## 架构

焦点系统由三部分组成：

- `FocusManager`：全局单例，负责协调整个 Blockly 的焦点。
  - 可查询当前哪个组件拥有 Blockly 焦点。
  - 可把 Blockly 焦点移动到其他组件。
  - 监听 DOM 焦点事件，保持 Blockly 焦点与 DOM 焦点同步。
  - 管理“当前焦点高亮”所用的 CSS 类。
  - 主要由 Blockly 内部使用，自定义代码通常在[使用 FocusManager](#use_the_focus_manager)时会直接调用。
- `IFocusableTree`：编辑器中的独立区域，例如工作区、工具箱。
  - 由多个可聚焦节点组成，例如块、字段。
  - 可包含子树，例如主工作区中某块上的 mutator 工作区。
  - 主要由 `FocusManager` 使用；除非你实现自定义工具箱，一般不需要在自定义类中实现它（见[自定义类](#custom_classes)）。
- `IFocusableNode`：可获得焦点的 Blockly 组件，例如块、字段、工具箱分类。
  - 每个节点都有一个 DOM 元素；当节点有 Blockly 焦点时，该元素也有 DOM 焦点。
  - 树本身也是节点，例如“整个工作区”也可以被聚焦。
  - `FocusManager` 会调用其方法。
  - 在 API 中也常用它表示“当前聚焦组件”，例如上下文菜单回调拿到的目标组件。
  - 编写自定义组件时，可能需要实现它（见[自定义类](#custom_classes)）。

## 焦点类型

焦点系统定义了多种焦点类型。

### Blockly 焦点与 DOM 焦点

两种核心焦点类型：

- **Blockly 焦点**：表示哪个 Blockly 组件（块、字段、工具箱分类等）有焦点。  
  这对组件级交互是必要的，例如 [键盘导航](/guides/configure/keyboard-nav) 用方向键在组件间移动，或上下文菜单系统根据当前组件类型生成不同菜单。
- **DOM 焦点**：表示哪个 DOM 元素有焦点。  
  这对 DOM 级交互是必要的，例如屏幕阅读器读取当前 DOM 焦点元素，Tab 在 DOM 元素间切换。

`FocusManager` 会保持两者同步：当节点有 Blockly 焦点时，其底层 DOM 元素也有 DOM 焦点，反之亦然。

#### 主动焦点与被动焦点

Blockly 焦点进一步分为**主动焦点**和**被动焦点**：

- 主动焦点：节点会接收用户输入（如按键）。
- 被动焦点：节点曾拥有主动焦点，但当用户切到另一个树（如从工作区切到工具箱）或离开 Blockly 编辑器后失去主动焦点。若该树重新获得焦点，此节点会恢复主动焦点。

每棵树都有独立焦点上下文：树内最多一个节点有焦点。该焦点是主动还是被动，取决于这棵树当前是否获得焦点。整页最多只有一个节点拥有主动焦点。

`FocusManager` 会对主动/被动焦点使用不同高亮样式，帮助用户理解“当前所在位置”和“返回后将落点的位置”。

<a id="ephemeral_focus"></a>
### 临时焦点

还有一种焦点叫**临时焦点**。  
对话框、字段编辑器等独立流程会向 `FocusManager` 请求临时焦点。授予后，焦点系统会暂时挂起。这样这些流程可以接管 DOM 焦点事件，不会与焦点系统的默认处理冲突。

授予临时焦点时，`FocusManager` 会把当前主动焦点节点改为被动焦点；归还临时焦点后，再恢复为主动焦点。

## 示例

下面的示例说明 Blockly 如何使用焦点系统，帮助你判断自定义代码该如何接入。

### 用键盘移动焦点

假设一个含两个字段的块当前有 Blockly 焦点（块对应 DOM 元素有高亮类），用户按下右方向键：

1. [键盘导航](/guides/configure/keyboard-nav) 插件：
   - 收到按键事件。
   - 请求导航系统（Blockly core 的一部分）把焦点移动到“下一个”组件。
2. 导航系统：
   - 向 `FocusManager` 查询当前 Blockly 焦点组件，得到该块（`IFocusableNode`）。
   - 判断该节点是 `BlockSvg`，按块导航规则从“块整体”切到“块上第一个字段”。
   - 通知 `FocusManager` 把 Blockly 焦点移到第一个字段。
3. `FocusManager`：
   - 更新状态，把 Blockly 焦点设到第一个字段。
   - 把 DOM 焦点设到该字段对应 DOM 元素。
   - 把高亮类从块元素移动到字段元素。

### 用鼠标移动焦点

如果用户点击该块的第二个字段，`FocusManager` 会：

1. 接收第一个字段 DOM 元素的 `focusout` 事件，以及第二个字段 DOM 元素的 `focusin` 事件。
2. 判断获得焦点的 DOM 元素对应第二个字段。
3. 更新状态，把 Blockly 焦点设到第二个字段（此时浏览器已设置 DOM 焦点，无需重复设置）。
4. 把高亮类从第一个字段元素移动到第二个字段元素。

### 其他示例

- 用户把块从工具箱拖到工作区时，鼠标事件处理会创建新块并调用 `FocusManager` 把焦点设到该块。
- 删除块时，块的 `dispose` 会调用 `FocusManager` 把焦点移到父块。
- [键盘快捷键](/guides/configure/keyboard-shortcuts) 使用 `IFocusableNode` 识别当前快捷键作用的 Blockly 组件。
- [上下文菜单](/guides/configure/context-menus) 使用 `IFocusableNode` 识别菜单是在哪个 Blockly 组件上被打开的。

## 自定义与焦点系统

你在自定义 Blockly 时，需要确保代码与焦点系统协同正确；也可以用焦点系统查询或设置当前聚焦节点。

### 自定义块与工具箱内容

最常见的自定义方式是定义自定义块、调整工具箱内容。这两类操作本身不会影响焦点系统。

<a id="custom_classes"></a>
### 自定义类

自定义类有时需要实现 `IFocusableTree`、`IFocusableNode`，有时不需要，判断并不总是直观。

明确需要实现焦点接口的情况包括：

- 自定义工具箱类：需要实现 `IFocusableTree` 和 `IFocusableNode`。
- 创建可见且可导航组件的类（如字段、图标）：需要实现 `IFocusableNode`。

有些类即便不创建可见组件，或创建了用户不可导航的可见组件，也仍需实现 `IFocusableNode`：

- 实现了“继承 `IFocusableNode` 的接口”的类。  
  例如键盘导航插件中的 move icon 本体不可见、用户也不能直接导航到它，但由于 icon 实现 `IIcon` 且 `IIcon` 继承 `IFocusableNode`，因此仍需实现。
- 被用于“要求 `IFocusableNode` 参数”的 API 的类。  
  例如 `FlyoutSeparator` 不创建 DOM 元素、不可导航，但它被存入 `FlyoutItem`，而 `FlyoutItem` 构造器要求 `IFocusableNode`。
- 继承了已实现 `IFocusableNode` 基类的类。  
  例如 `ToolboxSeparator` 继承 `ToolboxItem`（后者实现了 `IFocusableNode`）。工具箱分隔符虽有可见组件，但不可操作、也不可导航。

还有一些类虽然创建了可见且可导航组件，但不必实现 `IFocusableNode`：

- 自己管理焦点的可见组件类，例如字段编辑器、对话框。  
  这类组件需要在开始时[获取临时焦点](#ephemeral_focus)、结束时归还。使用 `WidgetDiv` 或 `DropDownDiv` 时会自动处理。

另外，以下类与焦点系统无交互，不需要实现 `IFocusableTree` 或 `IFocusableNode`：

- 创建纯装饰性、不可导航不可操作且对屏幕阅读器无信息价值的组件（例如游戏背景装饰）。
- 与焦点系统完全无关的类，例如实现 `IMetricsManager`、`IVariableMap` 的类。

如果你不确定某个类是否会与焦点系统交互，可先用键盘导航插件测试：

- 若失败，可能需要实现 `IFocusableTree` 或 `IFocusableNode`。
- 若通过但仍不确定，继续检查该类的调用方，看是否显式要求这两个接口或存在其他焦点交互。

#### 实现焦点接口

实现 `IFocusableTree` 或 `IFocusableNode` 的最简单方式，是继承已经实现这些接口的基类。

- 自定义工具箱可继承 `Toolbox`（实现了 `IFocusableTree` 与 `IFocusableNode`）。
- 自定义字段可继承 `Field`（实现了 `IFocusableNode`）。

继承后要确认你自己的代码不会破坏基类中的焦点接口逻辑。

若继承了已实现焦点接口的类，通常不需要覆写方法。最常见例外是 `IFocusableNode.canBeFocused`：如果你不希望用户导航到该组件，需要覆写它。

较少见的是覆写焦点回调方法：

- `IFocusableTree`：`onTreeFocus`、`onTreeBlur`
- `IFocusableNode`：`onNodeFocus`、`onNodeBlur`

注意：在这些方法内部尝试切焦点（调用 `FocusManager.focusNode` 或 `FocusManager.focusTree`）会抛出异常。

如果你是从零实现自定义组件，则需自行实现焦点接口。实现完成后，建议用键盘导航插件验证“应可导航的能导航、应不可导航的不能导航”。

<a id="use_the_focus_manager"></a>
#### 使用 FocusManager

自定义类最常见的 `FocusManager` 用法是：

- 获取当前聚焦节点
- 把焦点移动到另一个节点

获取 `FocusManager`：

```javascript
const focusManager = Blockly.getFocusManager();
```

获取当前聚焦节点：

```javascript
const focusedNode = focusManager.getFocusedNode();
// 对 focusedNode 执行你的逻辑
```

把焦点移动到其他节点：

```javascript
// 把焦点移到另一个块
focusManager.focusNode(myOtherBlock);
```

把焦点移动到某棵树：

```javascript
// 把焦点移到主工作区
focusManager.focusTree(myMainWorkspace);
```

`focusTree` 同时会把节点焦点设为该树的根节点。

另一个常见用法是“获取并归还临时焦点”。`takeEphemeralFocus` 返回一个函数，你必须调用它来归还临时焦点：

```javascript
const returnEphemeralFocus = focusManager.takeEphemeralFocus();
// 执行需要临时焦点的流程
returnEphemeralFocus();
```

若使用 `WidgetDiv` 或 `DropDownDiv`，它们会自动处理临时焦点的获取与归还。

### Tab 停靠点

焦点系统会在所有树的根元素上设置 Tab 停靠点（`tabindex=0`），包括主工作区、工具箱、弹出工作区。  
这样用户可以用 Tab 在编辑器主要区域间切换，再通过键盘导航插件用方向键在区域内部导航。不要改动这些停靠点，否则会影响 `FocusManager` 的管理能力。

一般也应避免在 Blockly 内部其他 DOM 元素上额外设置 Tab 停靠点，这会破坏 Blockly 的“Tab 切区域、方向键走区域内”的导航模型。并且这种额外停靠点常常不能按预期工作：每个可聚焦节点会声明自己的焦点 DOM 元素；若你把停靠点放在其后代节点，用户 Tab 过去后，`FocusManager` 仍会把 DOM 焦点拉回声明的焦点元素。

在 Blockly 编辑器之外的应用元素上设置 Tab 停靠点是安全的。用户从编辑器 Tab 到这些元素时，`FocusManager` 会把 Blockly 焦点从主动转为被动。出于无障碍考虑，`tabindex` 建议使用 `0` 或 `-1`。

### DOM 焦点

出于无障碍考虑，应用应避免直接调用 DOM 元素的 `focus()`，这会让屏幕阅读器用户被突然跳转到未知位置。

另外，`FocusManager` 会响应焦点事件并把 DOM 焦点设到“最近的已声明可聚焦祖先（或自身）”元素。这可能与你直接调用 `focus()` 的目标元素不同。  
若不存在这样的可聚焦祖先（例如对 Blockly 编辑器外元素调用了 `focus()`），`FocusManager` 只会把当前主动焦点节点改为被动焦点。

### Positionables

Positionable 是叠加在工作区上方并实现 `IPositionable` 的组件，例如垃圾桶、backpack 插件中的背包。  
目前 Positionables 还未集成到焦点系统中。
