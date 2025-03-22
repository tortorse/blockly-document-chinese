# 保存和加载

序列化是保存工作区状态的过程，以便之后可以将其重新加载到工作区中。您需要将所有要保存的数据转换为基于文本的格式，以便于存储。

我们建议将工作区序列化为 JSON 格式。

有关更多信息，请参阅[序列化](/guides/configure/serialization)。

## 保存

以下代码片段展示了如何将工作区的状态转换为 JSON 格式以进行保存：

```javascript
// 序列化状态
const state = Blockly.serialization.workspaces.save(myWorkspace);

// 然后将状态保存，例如保存到本地存储
localStorage.setItem('workspace-state', state);
```

## 加载

以下代码片段展示了如何将保存的状态加载到工作区中：

```javascript
// 从某处获取保存的状态，例如从本地存储
const state = localStorage.getItem('workspace-state');

// 反序列化状态
Blockly.serialization.workspaces.load(state, myWorkspace);
```

这将在工作区中创建所有已保存的块、变量和其他元素。
