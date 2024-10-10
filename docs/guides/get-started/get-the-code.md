# 获取 Blockly

有几种方法可以获取 Blockly 代码，并且在获取代码后有几种方法可以加载它。

## Create-package 脚本

Blockly 提供了一个脚本，可以引导一个初始应用程序，然后您可以对其进行修改。它使用了常见的 Web 开发工具，如 [webpack](https://webpack.js.org/guides/) 和 [eslint](https://eslint.org/)，但不包括像 React 或 Angular 这样的框架。

这需要您在运行以下命令之前[安装 node.js 和 npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)。

要在新的 `hello-world` 目录中创建一个用 JavaScript 编写的应用程序：

```bash
npx @blockly/create-package app hello-world
```

要在新的 hello-world 目录中创建一个用 TypeScript 编写的应用程序：

```bash
npx @blockly/create-package app hello-world --typescript
```

这些命令会创建一个[imports package targets](#imports)的包。它还使用了一个package.json文件来管理依赖项，这使得保持Blockly的最新版本变得容易。

It also comes with some handy starter scripts, such as one to test the project locally in a browser:

```shell
cd hello-world
npm run start
```

您可以参考生成的 package.json 文件以获取其他命令。

## Unpkg

如果您只是想尝试一些想法，并且不想引导一个完整的应用程序，您可以使用 script 标签从 unpkg 加载 Blockly。

如果您将以下内容添加到任何 HTML 页面中，您可以直接在浏览器中打开 HTML 以试验 Blockly：

```html
<!-- Load Blockly core -->
<script src="https://unpkg.com/blockly/blockly_compressed.js"></script>
<!-- Load the default blocks -->
<script src="https://unpkg.com/blockly/blocks_compressed.js"></script>
<!-- Load a generator -->
<script src="https://unpkg.com/blockly/javascript_compressed.js"></script>
<!-- Load a message file -->
<script src="https://unpkg.com/blockly/msg/en.js"></script>
```

这不是一个获取 Blockly 的长期解决方案，因为它不适用于像 webpack 这样的打包工具，但它适合用于原型设计和实验。

## 获取代码

有几种方法可以获取运行 Blockly 的代码。

Blockly 团队推荐通过包管理器（如 [NPM](https://www.npmjs.com/package/blockly) 或 [Yarn](https://yarnpkg.com/package/blockly)）来引入 Blockly，因为：

- 这样更容易保持 Blockly 的更新
- 它鼓励[使用插件](/guides/plugins/overview.html)而不是对 Blockly 进行猴子补丁

### NPM

```bash
npm install --save blockly
```

### Yarn

```bash
yarn add blockly
```

### GitHub

您还可以从我们的[GitHub发布版本](https://github.com/google/blockly/releases)中下载压缩后的代码。然而，这需要您定期手动下载代码以获取Blockly的最新更新和修复。

::: warning 警告
GitHub下载仅为方便先前对 Blockly 进行复刻的开发人员提供。如果您是新开发人员，您应该使用包管理器。
:::

## 加载代码

一旦您获取了代码，有几种方法可以在您的代码中访问它。

#### Script tags

```javascript
<!-- Load Blockly core -->
<script src="./my-lib-directory/blockly/blockly_compressed.js"></script>
<!-- Load the default blocks -->
<script src="./my-lib-directory/blockly/blocks_compressed.js"></script>
<!-- Load a generator -->
<script src="./my-lib-directory/blockly/javascript_compressed.js"></script>
<!-- Load a message file -->
<script src="./my-lib-directory/blockly/msg/en.js"></script>

```

使用 script 标签时，您可以从全局命名空间访问导入的内容：

```javascript
// Access Blockly.
Blockly.thing;

// Access the default blocks.
Blockly.libraryBlocks['block_type'];

// Access the generator.
javascript.javascriptGenerator;
```
::: tip 提示
使用 script 标签时，您不能有多个消息文件，因为消息会直接应用到 `Blockly.Msg` 数组。
:::

#### Imports

::: tip 提示
使用我们的包目标的导入需要您使用打包工具（如 webpack），因为 Blockly 被打包为 UMD，而不是 ESM。
:::
```javascript
// Import Blockly core.
import * as Blockly from 'blockly/core';
// Import the default blocks.
import * as libraryBlocks from 'blockly/blocks';
// Import a generator.
import {javascriptGenerator} from 'blockly/javascript';
// Import a message file.
import * as En from 'blockly/msg/en';
```

当您导入消息文件时，您还需要应用它们。

```javascript
Blockly.setLocale(En);
```

#### Requires

```javascript
// Require Blockly core.
const Blockly = require('blockly/core');
// Require the default blocks.
const libraryBlocks = require('blockly/blocks');
// Require a generator.
const {javascriptGenerator} =  require('blockly/javascript');
// Require a message file.
const En = require('blockly/msg/en');
```

当您 require 消息文件时，您还需要应用它们。

```javascript
Blockly.setLocale(En);
```
