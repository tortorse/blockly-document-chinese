# 变形器

变形器是一个混入对象，用于给块增加额外序列化能力，也就是保存和恢复额外状态。

例如内置的 `controls_if` 和 `lists_create_with` 会保存输入数量，这类状态就通过变形器处理。变形器还可以提供界面，让用户直接修改块形状。

![列表块变形示例](/static/blockly/images/mutators/lists-mutated.png)

![条件块变形示例](/static/blockly/images/mutators/if-mutated.png)

需要注意的是：块形状变化不一定就要用变形器。  
例如 `math_number_property` 依据下拉字段切换形状，而字段值本身已会序列化，这种场景通常使用[字段校验器](/guides/create-custom-blocks/fields/validators)即可。

![偶数模式](/static/blockly/images/mutators/is-even.png)
![整除模式](/static/blockly/images/mutators/is-divisible-by.png)

关于何时需要额外状态，见[序列化文档](/guides/configure/serialization.html#何时保存额外状态)。

## 序列化钩子

变形器有两组序列化钩子：

- JSON 序列化：`saveExtraState` 和 `loadExtraState`
- XML 序列化：`mutationToDom` 和 `domToMutation`

你至少需要实现其中一组。

### `saveExtraState` 和 `loadExtraState`

这组钩子用于 JSON 序列化。`saveExtraState` 返回可 JSON 序列化的数据，`loadExtraState` 接收该数据并恢复到块实例。

```javascript
// lists_create_with 的示例。
saveExtraState: function() {
  return {
    'itemCount': this.itemCount_,
  };
},

loadExtraState: function(state) {
  this.itemCount_ = state['itemCount'];
  this.updateShape_();
},
```

对应 JSON 类似：

```json
{
  "type": "lists_create_with",
  "extraState": {
    "itemCount": 3
  }
}
```

#### 无额外状态

如果块处于默认状态，`saveExtraState` 可以返回 `null`，这样输出 JSON 不会包含 `extraState` 字段，可减小保存体积。

#### 完整序列化与后备数据

`saveExtraState` 可接收可选参数 `doFullSerialization`。当块依赖其他序列化器保存的数据时，该参数用于提示当前块自行保存完整后备状态。

常见场景：

- 单独复制某个块时，需要确保它能独立恢复完整状态。
- 粘贴时需要创建新的后备数据模型，而不是继续引用旧模型。

### `mutationToDom` 和 `domToMutation`

这组钩子用于旧版 XML 序列化。只有在维护旧系统时才建议使用，新项目优先使用 `saveExtraState` 和 `loadExtraState`。

```javascript
// lists_create_with 的旧版 XML 示例。
mutationToDom: function() {
  var container = Blockly.utils.xml.createElement('mutation');
  container.setAttribute('items', this.itemCount_);
  return container;
},

domToMutation: function(xmlElement) {
  this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
  this.updateShape_();
},
```

对应 XML 类似：

```xml
<block type="lists_create_with">
  <mutation items="3"></mutation>
</block>
```

若 `mutationToDom` 返回 `null`，则不会写入额外 XML 节点。

## 界面钩子

如果你实现了一组可选方法，Blockly 会给块自动挂载默认变形器界面。

![变形器界面示例](/static/blockly/images/mutators/mutator-annot.png)

你也可以完全不用这套默认界面，只保留额外序列化逻辑，或自行实现自定义界面。

### `compose` 和 `decompose`

默认界面依赖这两个方法：

- `decompose`：把主块拆成变形器工作区中的子块结构，并返回顶层块。
- `compose`：读取子块结构，回写主块形状。

```javascript
decompose: function(workspace) {
  var topBlock = workspace.newBlock('lists_create_with_container');
  topBlock.initSvg();
  var connection = topBlock.getInput('STACK').connection;
  for (var i = 0; i < this.itemCount_; i++) {
    var itemBlock = workspace.newBlock('lists_create_with_item');
    itemBlock.initSvg();
    connection.connect(itemBlock.previousConnection);
    connection = itemBlock.nextConnection;
  }
  return topBlock;
},

compose: function(topBlock) {
  var itemBlock = topBlock.getInputTargetBlock('STACK');
  var connections = [];
  while (itemBlock && !itemBlock.isInsertionMarker()) {
    connections.push(itemBlock.valueConnection_);
    itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
  }

  this.itemCount_ = connections.length;
  this.updateShape_();

  for (var i = 0; i < this.itemCount_; i++) {
    connections[i] && connections[i].reconnect(this, 'ADD' + i);
  }
},
```

### `saveConnections`

该方法可选。它在 `compose` 前执行，用来把主工作区中的子块连接关系暂存到变形器子块上，便于重组后恢复连接。

```javascript
saveConnections: function(topBlock) {
  var itemBlock = topBlock.getInputTargetBlock('STACK');
  var i = 0;
  while (itemBlock) {
    var input = this.getInput('ADD' + i);
    itemBlock.valueConnection_ =
      input && input.connection.targetConnection;
    i++;
    itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
  }
},
```

## 注册变形器

变形器属于特殊混入对象，使用前要先注册，然后在块的 JSON 定义中通过 `mutator` 字段引用。

```javascript
// 函数签名
Blockly.Extensions.registerMutator(name, mixinObj, opt_helperFn, opt_blockList);

// 示例
Blockly.Extensions.registerMutator(
  'controls_if_mutator',
  { /* 变形器方法 */ },
  undefined,
  ['controls_if_elseif', 'controls_if_else'],
);
```

- `name`：变形器名称，供 JSON 使用。
- `mixinObj`：变形器方法集合，例如 `saveExtraState`、`loadExtraState`。
- `opt_helperFn`：可选辅助函数，混入后执行。
- `opt_blockList`：可选，默认变形器界面中显示的子块类型列表。

```javascript
{
  "type": "my_block",
  "mutator": "controls_if_mutator"
}
```

与扩展不同，一个块类型只能绑定一个变形器。

### 辅助函数

辅助函数会在块创建并完成混入后执行，可用于设置初始状态或附加行为。

```javascript
var helper = function() {
  this.itemCount_ = 5;
  this.updateShape_();
};
```
