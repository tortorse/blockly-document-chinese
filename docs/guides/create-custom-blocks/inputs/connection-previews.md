# 连接预览器

连接预览器用于给“待连接状态”提供可视化预览。  
它能提示你：当前正在拖拽的块在松手后会连接到哪里。

默认连接预览器会在将要连接的位置显示[插入标记](/guides/get-started/workspace-anatomy#插入标记)，并高亮相关连接；如果会发生替换，还会给被替换块加淡出效果。

![内置连接预览器演示](/static/blockly/images/connections/built-in-previewer.gif)

## 待连接的两种情况

待连接主要有两类：替换和插入。

- **替换**：放下后会替换已有块，被替换块将断开。
- **插入**：放下后直接插入，不会让现有块被断开。

### 替换

当拖拽块的某个连接要连到一个“已连接了块”的连接上，且原有块没有可重新挂接的位置时，会发生替换。  
松手后原块断开，拖拽块占据其位置。

默认预览方式是：给将被替换的块添加淡出效果。

![内置替换预览](/static/blockly/images/connections/built-in-replacement-preview.png)

### 插入

插入有两种常见情况：

1. 拖拽块连接到空连接；
2. 拖拽块连接到已有块的连接，但可插入两块之间，因此不需要断开已有块。

默认预览方式是：创建插入标记，并高亮将要连接的连接点。

![内置插入预览](/static/blockly/images/connections/built-in-insertion-preview.png)

## 创建自定义预览器

如果你希望用不同视觉方案预览待连接，可实现自定义 `IConnectionPreviewer`。

### 构造与销毁

`IConnectionPreviewer` 需要实现构造函数和销毁方法。

构造函数在每次开始拖拽块时调用，并收到当前被拖拽块。  
若需要基于拖拽块初始化状态，可在构造函数中处理。

```javascript
class MyConnectionPreviewer implements IConnectionPreviewer {
  constructor(draggedBlock: Blockly.BlockSvg) {
    // 在这里初始化状态。
  }
}
```

`dispose` 会在每次拖拽结束时调用。  
若需要释放引用或清理状态，应在这里处理。

```javascript
dispose() {
  // 释放并清理状态。
}
```

### 创建预览

`IConnectionPreviewer` 需要实现可视化预览逻辑。

#### 替换预览

要预览[替换](#替换)，实现 `previewReplacement`：

```javascript
previewReplacement(draggedConn, staticConn, replacedBlock) {
  // 可视化显示 replacedBlock 将断开，
  // 且 draggedConn 将连接到 staticConn。
}
```

#### 插入预览

要预览[插入](#插入)，实现 `previewConnection`：

```javascript
previewConnection(draggedConn, staticConn) {
  // 可视化显示 draggedConn 将连接到 staticConn。
}
```

如果你想区分“接到空输入”与“插入两块之间”，可检查 `staticConn` 是否已有目标连接：  
若 `staticConn.targetConnection` 存在，表示当前是插入到已有连接之间。

```javascript
previewConnection(draggedConn, staticConn) {
  if (staticConn.targetConnection) {
    // 拖拽块将插入两块之间。
  } else {
    // 拖拽块将连接到空输入。
  }
}
```

#### 基于 CSS 的预览

你可以通过给块加 CSS 类实现预览。  
例如默认替换淡出就是通过在块上切换 `blocklyReplaceable` 类实现的。

```javascript
previewReplacement(draggedConn, staticConn, replacedBlock) {
  Blockly.utils.dom.addClass(replacedBlock.getSvgRoot(), 'my-custom-class');
}
```

#### 基于渲染器的预览

你也可以通过实现带预览钩子的自定义渲染器来做预览。

```javascript
previewReplacement(draggedConn, staticConn, replacedBlock) {
  const renderer = replacedBlock.workspace.getRenderer();
  if (renderer.addReplacementIndicator) {
    renderer.addReplacementIndicator(replacedBlock);
  }
}
```

### 隐藏预览

`IConnectionPreviewer` 还需要能隐藏预览。  
当拖拽块移出所有候选连接范围时会调用；在预览器销毁前也会调用。

```javascript
hidePreview() {
  // 移除 CSS 类、关闭渲染器指示器等。
}
```

### 注册与使用

完成 `IConnectionPreviewer` 后需要注册。  
注册后可在配置中通过“名称”使用，也可直接传构造函数。

```javascript
Blockly.registry.register(
  Blockly.registry.Type.CONNECTION_PREVIEWER,
  'MyConnectionPreviewer',
  MyConnectionPreviewer,
);

// 通过名称使用。
const myWorkspace = Blockly.inject({
  // options...
  plugins: {
    connectionPreviewer: 'myConnectionPreviewer',
  },
});

// 或直接传类 / 构造函数。
const myWorkspace = Blockly.inject({
  // options...
  plugins: {
    connectionPreviewer: MyConnectionPreviewer,
  },
});
```

更多关于注册的说明可见[注入替换类](/guides/configure/customization#注入替换类)。
