# 块注释

块注释允许用户为单个块添加说明文本。和文本编程语言里的注释一样，它不会影响块本身行为。  
标准语言生成器会把块注释加入到生成代码中，自定义块生成代码时同样适用。

<img src="/static/blockly/images/workspace-comments/block-comment.png" alt="带注释的 if 块">

## 注释图标

用户通过注释图标中的文本编辑器输入块注释。

默认情况下注释图标不显示。可通过两种方式显示：

- 调用 `Block.setCommentText`，并传入非 `null` 字符串。
- 让用户在块的上下文菜单中点击“添加注释”。

移除注释图标也有两种方式：

- 调用 `Block.setCommentText(null)`。
- 让用户在块的上下文菜单中点击“删除注释”。

上下文菜单里的“添加注释”和“删除注释”只会在以下条件同时满足时显示：

- 该块处于可编辑状态（可参考 [自定义块定义](/guides/create-custom-blocks/define-blocks)）。
- 该块未折叠。
- [配置项字典](/guides/configure/configuration_struct) 中 `comments` 选项为 `true`。  
  若未显式设置，默认值为：工具箱有分类时是 `true`，否则是 `false`。

## 通过代码读写块注释

获取块注释：

```javascript
// 返回注释文本；如果没有注释则返回 null。
myBlock.getCommentText();
```

设置块注释：

```javascript
// 设置注释文本并显示注释图标。
myBlock.setCommentText('My comment');
```

删除块注释：

```javascript
// 删除注释文本并移除注释图标。
myBlock.setCommentText(null);
```

无论块当前状态如何（例如是否可编辑、是否折叠），以及 `comments` 配置项是否启用，都不影响你通过代码读写块注释。
