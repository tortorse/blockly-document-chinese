# 构建 Blockly

Blockly 由一百多个 JavaScript 文件组成。通过 Internet 加载这些对于最终用户来说是一种缓慢的体验。为了使 Blockly 加载更快，它可以压缩到六个文件，总计约 720kb。

Blockly 还在其未压缩代码中使用了高级 JavaScript 功能，这些功能可能与所有浏览器都不兼容。构建代码会将其转换为 es5，它通常与旧版浏览器（如 Internet Explorer）兼容。因此，仅向最终用户提供压缩代码非常重要。

Blockly 附带源代码和压缩文件，除非你需要魔改 `core`、`blocks`、`generators`或`msg`目录中的文件，否则无需构建 Blockly 。
:::tip 注意
在本文档中，我们经常交替使用“构建”和“压缩”，因为我们的构建过程也会压缩代码。
:::
压缩 Blockly 非常简单。只需运行以下命令：

```
npm run build
```

此命令大约需要 20 秒，并使用 Google 的 Closure Compiler 重建几个关键文件：

- 目录的内容`core/`变为`blockly_compressed.js`.
- 生成一个名为的替代文件`blockly_uncompressed.js`（见下文）。
- 目录的内容`blocks/`变为`blocks_compressed.js`.
- 目录的内容`generators/`变为 `javascript_compressed.js`、`python_compressed.js`、`php_compressed.js`和 。` lua_compressed.js``dart_compressed.js `
- 对文件的任何更改都会`messages.js`映射到`msg/json`文件上，然后`msg/js`重新生成文件。

此脚本的输出位于`build`目录中，该目录未签入到 git。要将此输出复制到顶级构建文件，请运行`npm run checkin:built`. 如果您需要顶级文件来反映您的更改（例如不建议通过文件 url 直接访问 Playground，或者如果您是 Blockly 团队成员准备新版本），您只需要这样做。如果您通过运行其中一个 [训练场](/guides/contribute/get-started/playground.html) 来测试 Blockly，或者 您正在对 Blockly 进行例行更改，则不需要这样做。

## 构建脚本

您可能不想为您的开发过程构建所有 Blockly。您可以使用以下命令来构建文件的子集：

- `npm run build`构建一切。
- `npm run build:blocks`构建`blocks_compressed`.
- `npm run build:compressed`构建`blockly_compressed`.
- `npm run build:core`构建`blockly_compressed`,`blockly_uncompressed`和`blocks_compressed`.
- `npm run build:generators`构建每个`<language>_compressed.js`文件。
- `npm run build:langfiles`构建每个`msg/js/<LANG>.js`文件。
- `npm run build:uncompressed`构建`blockly_uncompressed`.

每个脚本的输出都在`build`目录中，如上所述。

## 压缩模式

作为压缩的结果，Blockly 可以加载少量的 HTTP 请求：

```html
<script src="blockly_compressed.js"></script>
<script src="blocks_compressed.js"></script>
<script src="javascript_compressed.js"></script>
<script src="msg/js/en.js"></script>
```

请记住，作为开发人员，您可能拥有比您的用户更好的 Internet 连接和更现代的浏览器。压缩代码对用户来说意义重大。

## 未压缩模式

也就是说，压缩代码很难阅读。修改核心 Blockly 时，使用未压缩模式。让我们分解上面列出的四个脚本并找到它们的未压缩版本：
:::tip 注意
未压缩的 Blockly 可能使用 ES6 语言特性，并且不兼容 Internet Explorer。如果要发布到 IE，请确保使用压缩文件。
:::

### Core

```html
<script src="blockly_compressed.js"></script>
```

这很容易。只需将 “compressed” 更改为 “**un**compressed” 即可：

```html
<script src="blockly_uncompressed.js"></script>
```

该 `blockly_uncompressed.js` 文件由构建脚本生成并加载所有必需的 `core/` 文件。

### Blocks

```html
<script src="blocks_compressed.js"></script>
```

如果有人魔改默认块，请将压缩块文件替换为原始源文件：

```html
<script src="blocks/logic.js"></script>
<script src="blocks/loops.js"></script>
<script src="blocks/math.js"></script>
<script src="blocks/text.js"></script>
<script src="blocks/lists.js"></script>
<script src="blocks/colour.js"></script>
<script src="blocks/variables.js"></script>
<script src="blocks/procedures.js"></script>
```

### Generators

```html
<script src="javascript_compressed.js"></script>
```

如果要魔改默认块，请将压缩块文件替换为原始源文件（根据需要将“javascript”更改为“python”、“php”、“lua”或“dart”）：

```html
<script src="generators/javascript.js"></script>
<script src="generators/javascript/logic.js"></script>
<script src="generators/javascript/loops.js"></script>
<script src="generators/javascript/math.js"></script>
<script src="generators/javascript/text.js"></script>
<script src="generators/javascript/lists.js"></script>
<script src="generators/javascript/colour.js"></script>
<script src="generators/javascript/variables.js"></script>
<script src="generators/javascript/procedures.js"></script>
```

### Language

```html
<script src="msg/js/en.js"></script>
```

将语言文件（`en`、、、`ru`等`vi`）替换为`messages.js`：

```html
<script src="msg/messages.js"></script>
```
