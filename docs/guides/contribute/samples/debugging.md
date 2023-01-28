# 使用 Blockly 和 blockly-samples 进行调试

有时，在 blockly-samples 中开发插件时，您需要在 Blockly 本身中进行相应更改。大多数插件都设置为从 npm 注册表中提取 Blockly 资源，因此您只能使用已在 npm 上发布的代码。这会使得调试您的 Blockly 更改变得困难。如果您想要同时在 blockly 和 blockly-samples 中进行测试和测试更改，则可以使用以下任一方法将未发布的更改结合使用。

## 方法 1: npm link

您可以指示 npm 使用计算机上的软件包，而不是从 npm 注册表中提取软件包。使用此方法，您应该能够访问 sourcemap 以便更容易地调试 lockly_compressed。您可以将此方法用于尚未推送到 GitHub 的核心更改。

1.  在你的 blockly 复刻版本中：

    ```bash
    $ npm run package
    $ cd dist
    $ npm link
    ```

    以下步骤用于构建核心 Blockly，将其打包，然后创建指向所打包后文件的软链接。

2.  在你的 blockly-samples 复刻版本中：

    ```bash
    $ npm link blockly
    ```

    此步骤指示 npm 查找您之前创建的软链接，而不是从 npm 中提取软件包。

3.  `npm run start` 来测试您的插件。

在核心中进行更改时，您必须重新构建并重新打包它。

## 方法 2：从 GitHub 提取

您可以指示 npm 从 GitHub（而非 npm 注册表）提取软件包。使用此方法，您应该可以访问 sourcemap 以便能够更轻松地调试 blockly_compress。您必须使用已在 GitHub 上某个位置发布的 Blockly 版本。

1.  确保插件的 `package.json` 中的 `scripts` 部分包含以下各项：

    ```json
    "postinstall": "blockly-scripts postinstall"
    ```

    此脚本将在后续步骤中从 GitHub 安装后自动构建 Blockly。

2.  请提供 git 地址和分支名称，而不是在 `package.json` 中针对 block 提供版本号：

    ```json
    "blockly": "git://github.com/google/blockly.git#develop"
    ```

    如果您有未合并的更改，也可以链接您自己的 blockly 复刻版本。

3.  与平时一样 `npm install`

4.  `npm run start`，用于测试您的插件

在核心 Blockly 中进行更改时，您必须将更改推送到指定分支的 GitHub 中。此外，如果您希望 npm 从 GitHub 提取新版本，则必须 `npm uninstall blockly`（或从 `node_modules` 中移除此版本），然后按照上述说明重新安装它。

## 方法 3：进阶训练场

您可以使用进阶训练场（在核心 Blockly 中）来调试插件。 使用此方法时，您将使用 `blockly_uncompressed`，这可能会更便于调试，因为您不依赖于 sourcemaps。如果您在使用 sourcemaps 进行调试时遇到问题，或者想使用进阶训练场的功能测试插件，请使用此方法。

1.  在 blockly-samples 的插件目录中：

    ```bash
    $ npm run build
    $ cd dist
    $ pwd
    ```

    这会构建并打包您的插件。然后，它会输出插件的 dist 目录的完整目录路径。复制此路径；我们将在下一步中使用此路径。

2.  在 blockly 的 `advanced_playground.html` 中：

    ```html
    <script src="$PATH_TO_DIST_DIR/index.js">
    ```

    然后，您还需要对插件进行所需的设置。例如，您可能需要在 options 对象中指定某些值。请在现有工作区设置中进行此设置。

3.  在浏览器中打开进阶训练场以测试您的插件。

对 blockly 做出更改后，您只需刷新即可。更改插件时，您需要重新运行 `npm run build`。
