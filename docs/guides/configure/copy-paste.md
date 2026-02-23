# 复制与粘贴

Blockly 对多种内置组件提供了复制、剪切和粘贴能力，例如块、工作区注释和气泡。

## 默认剪贴板行为

Blockly Core 内置了一组[键盘快捷键](/guides/configure/keyboard-shortcuts.html#默认快捷键)，可对块、工作区注释以及任何实现了 [`ICopyable`](/reference/js/blockly.icopyable_interface)、[`IDraggable`](/reference/js/blockly.idraggable_interface)、[`IDeletable`](/reference/js/blockly.ideletable_interface) 的组件执行剪切、复制和粘贴。  
它也内置了块“复制副本”的[上下文菜单](/guides/configure/context-menus)项。你可以按需修改或移除这些默认快捷键和菜单项。

默认剪贴板实现下，可复制对象只能粘贴回它原本所在工作区，或者在对象来自 flyout 时粘贴到该 flyout 的目标工作区。  
这意味着你可以把 flyout 里的块复制到其目标工作区，但不能把一个主工作区里的块直接复制到另一个主工作区。

## 跨工作区和标签页复制粘贴

如果你希望用户把块从一个工作区复制到另一个工作区，甚至复制到另一个浏览器标签页中的同应用实例，可安装插件：

- [`@blockly/plugin-cross-tab-copy-paste`](https://www.npmjs.com/package/@blockly/plugin-cross-tab-copy-paste)

## 自定义剪贴板行为

如果你需要不同的行为，可以卸载 Blockly 自带的快捷键并改装自己的快捷键逻辑。  
Blockly 提供了 [`Blockly.clipboard` 命名空间](/reference/js/blockly.clipboard_namespace) 方法来执行复制、粘贴，或做更细粒度控制，例如设置对象来源工作区。

## 自定义可复制对象

任意对象要接入复制粘贴系统，需要用到 5 个接口：

- [`ICopyable`](/reference/js/blockly.icopyable_interface)
- [`IDraggable`](/reference/js/blockly.idraggable_interface)
- [`IDeletable`](/reference/js/blockly.ideletable_interface)
- [`ICopyData`](https://developers.google.com/blockly/reference/js/blockly.icopyable_namespace.icopydata_interface)
- [`IPaster`](https://developers.google.com/blockly/reference/js/blockly.ipaster_interface)

其中前 3 个用于描述“可被复制”的对象，`ICopyData` 用于描述复制后的数据，`IPaster` 用于把复制数据还原为可复制对象。  
每一种 `ICopyable` 都必须有一个对应的 `IPaster` 来粘贴该数据。

只要对象实现了 `ICopyable`、`IDraggable`、`IDeletable`，并且有匹配的 `ICopyData` 与 `IPaster`，就能自动接入默认剪贴板系统。

需要强调的是，真正需要“自定义 copyable 或 paster”的场景很少（例如 [multiselect plugin](https://www.npmjs.com/package/@mit-app-inventor/blockly-plugin-workspace-multiselect)）。  
因为 copyable 对象是可渲染对象，而 Blockly 工作区可新增的渲染对象类型本身很有限，主要只有块、气泡和工作区注释。

### 实现可复制对象

要创建 copyable 对象，需实现 `ICopyable`、`IDraggable`、`IDeletable`。后两者用于保证粘贴后的对象可被操作和删除。

#### 可选中

`ICopyable` 继承了 [`ISelectable`](/reference/js/blockly.iselectable_interface)，所以也需要实现其属性和方法。  
可选中是必须的，因为快捷键复制逻辑会根据“当前选中对象”判断复制目标。

```javascript
class MyCopyable implements ISelectable {
  constructor(workspace) {
    this.id = Blockly.utils.idGenerator.genUid();
    this.workspace = workspace;
  }

  select() {
    // 在视觉上标记为已选中。
  }

  unselect() {
    // 在视觉上标记为未选中。
  }
}
```

#### 可复制

`ICopyable` 只有一个必需方法 `toCopyData`，返回可 JSON 序列化的状态，用于重建对象。

复制数据还必须包含 `paster` 字段，用于标识应该由哪个已注册 paster 来处理该数据。

```javascript
class MyCopyable implements ICopyable {
  constructor(workspace, state) {
    this.workspace = workspace;
    this.myState = state;
  }

  toCopyData() {
    return {
      // 这个字符串要与 paster 注册时使用的名称一致。
      paster: 'MY_PASTER',
      state: this.myState,
    };
  }
}
```

`ICopyable` 还有可选方法 `isCopyable`，用于返回对象当前是否可复制。

#### 可拖拽与可删除

关于 `IDraggable` 和 `IDeletable` 的实现，可参考[自定义可拖拽对象](/guides/configure/dragging/draggable)。

### 实现粘贴器

要创建 paster，需要实现 `IPaster` 接口。它只有一个 `paste` 方法，接收：

- 被粘贴对象的 copy data
- 粘贴目标工作区
- 可选坐标（粘贴位置）

```javascript
class MyPaster implements IPaster {
  paste(copyData, workspace, coordinate) {
    return new MyCopyable(workspace, copyData.state);
    // 可选：把对象放到 coordinate 指定位置。
    // 可选：粘贴后自动选中该对象。
  }
}
```

#### 注册

实现 paster 后，需要注册，才能通过 copy data 里的 `paster` 字段找到对应处理器：

```javascript
// 该字符串需与 copy data 中的 'paster' 字段一致。
Blockly.clipboard.registry.register('MY_PASTER', new MyPaster());
```
