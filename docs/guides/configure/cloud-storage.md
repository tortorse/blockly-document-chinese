# 云存储

如果您的应用程序托管在 App Engine 上，则可以使用云存储服务，用户可以保存，加载，共享和发布其程序。

## 设置 App Engine

第一个目标是在 App Engine 上运行您自己的 Blockly 副本。

1. 下载并安装 [Python SDK](https://cloud.google.com/appengine/downloads)。

2. 登录 [Google App Engine](https://appengine.google.com/) 并创建一个应用程序。

3. 编辑 `appengine/app.yaml` 编辑 `appengine/app.yaml` 并将应用程序ID 从 `blockd-demo` 更改为您在上一步中创建的应用程序名称。

4. 将以下文件和目录复制（或软链接）到 `appengine/static/`：

    - `demos/`

    - `msg/`

    - `media/`

    - `*_compressed.js`

5. 可选：如果您想在服务器上使用 `blockly_uncompressed.js`，还要将该文件复制到 `appengine/static/`，同时复制 `core` 到 `appengine/static/`

6. 可选：如果您想运行 Blockly 操练场，你必须复制 `blocks`，`generators` 和 `tests` 目录以及步骤 5 中的文件。
7. 从 GUI 运行 Google App Engine Launcher，将您的 `appengine`目录添加为现有应用程序，然后按下“部署”按钮。如果您更喜欢使用命令行，请运行：`appcfg.py --oauth2 update appengine/`。

上传 Blockly 后，您可以用浏览器访问您在步骤 2 中创建的 URL。您应该会看到演示列表，包括云存储演示。

## 云端通信

在 [demos/storage/index.html](https://blockly-demo.appspot.com/static/demos/storage/index.html) 中检查 [存储演示](https://github.com/google/blockly/blob/master/demos/storage/index.html)的源码， 并注意以下功能。首先，有一个引入加载云存储API的脚本：

```html
<script src="/storage.js"></script>
```

请注意，此脚本假定页面上只有一个 Blockly 工作区。还有些消息定义，您应该根据需要进行修改：

```javascript
BlocklyStorage.HTTPREQUEST_ERROR = 'There was a problem with the request.\n';
BlocklyStorage.LINK_ALERT = 'Share your blocks with this link:\n\n%1';
BlocklyStorage.HASH_ERROR = 'Sorry, "%1" doesn\'t correspond with any saved Blockly file.';
BlocklyStorage.XML_ERROR = 'Could not load your saved file.\n' +
    'Perhaps it was created with a different version of Blockly?';
```
可以在 [json 目录](https://github.com/google/blockly-games/tree/master/json)中的 Blockly Games 中找到这些消息的其他语言的翻译。

保存当前块只需一次调用 `BlocklyStorage.link()`：

```html
<button onclick="BlocklyStorage.link()">Save Blocks</button>
```

要在页面加载时恢复已保存的块，只需在注入 Blockly 后使用 URL 的哈希调用 `BlocklyStorage.retrieveXml`：

```javascript
if ('BlocklyStorage' in window && window.location.hash.length > 1) {
  BlocklyStorage.retrieveXml(window.location.hash.substring(1));
}
```

## 本地存储

该 `storage.js` API 还提供了在浏览器的本地存储保存一组块的能力。这可以代替云存储来实现，也可以与云存储一起实现（尽管在后一种情况下,要小心尝试同时还原这两种类型的存储）。

要从本地存储中恢复块，请在注入 Blockly 后延时调用 `BlocklyStorage.restoreBlocks`。

```js
window.setTimeout(BlocklyStorage.restoreBlocks, 0);
```

要在用户离开页面时自动将块备份到本地存储中，请调用 `BlocklyStorage.backupOnUnload`，它将在页面的 unload 事件上注册事件监听器。

```js
BlocklyStorage.backupOnUnload();
```

## 例子

这是云存储的 [在线演示](https://blockly-demo.appspot.com/static/demos/storage/index.html)。
