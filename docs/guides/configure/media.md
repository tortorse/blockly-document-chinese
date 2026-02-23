# 媒体文件夹选项

媒体文件夹（media folder）是 Blockly 查找资源文件的位置，例如声音（如删除音效）和图片（如垃圾桶图标）。默认情况下，这些资源从 `https://blockly-demo.appspot.com/static/media/` 下载。

如果你要自定义这些资源（例如替换音效），或者希望应用只向你自己的域名发起 HTTP 请求，可以按以下步骤处理：

1. 从 GitHub 下载 [Blockly 的 media 资源目录](https://github.com/RaspberryPiFoundation/blockly/tree/main/media)，放到你自己的媒体目录。
2. 替换你要定制的资源文件。
3. 在[配置选项](/guides/configure/configuration_struct#选项配置参数)里设置 `media` 属性，值为你的媒体目录 URL（可以是绝对 URL，也可以是相对当前文件的路径）。
4. 部署应用时一并部署该媒体目录及其中全部资源。
