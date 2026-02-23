# Blockly 开发者工具

[Blockly 开发者工具](https://raspberrypifoundation.github.io/blockly-samples/examples/developer-tools/index.html) 是一个网页开发工具，可帮助你构建[自定义块](/guides/create-custom-blocks/overview)并接入到应用中。

::: tip 注意
本文对应兼容 Blockly v10+ 的新版工具。若你在找旧版，请查看[旧版文档](https://developers.google.com/blockly/guides/create-custom-blocks/legacy-blockly-developer-tools)。
:::

![Blockly 开发者工具总览](/static/blockly/images/block-factory/block_factory_overview.png)

## 定义块

Block Factory 工作区默认会放置一个空的配置块。你可以从工具箱对应分类拖入块，向配置块添加输入和字段，也可以配置提示文本、帮助链接、颜色和连接检查。

你可以在同一时间设计一种块类型。如果你要设计多个可连接的块，需要分别设计，再在工具箱定义中组合。  
另外，像变形器这类高级特性不能在 Factory 中直接生成，通常先生成基础块，再按文档补充高级逻辑。

当你修改配置块时，右侧块预览会自动更新，同时需要拷贝到应用里的代码也会自动更新。

## 输出配置

Blockly 支持不同的块定义方式、Blockly 加载方式和多种内置代码生成语言。Block Factory 会根据你的配置切换输出代码格式。

![输出配置面板](/static/blockly/images/block-factory/block_factory_configuration.png)

### Blockly 引入方式

你可以通过 HTML 的 `<script>` 标签加载 Blockly，也可以在带构建工具的项目里使用 `import`。这会影响你引用 Blockly API 的写法。  
更多可见[加载 Blockly](/guides/get-started/get-the-code)。无论选择哪种方式，都要在 Block Factory 里选择一致选项，以保证生成代码可直接使用。

### 块定义格式

Blockly 支持 JSON 和 JavaScript 两种块定义格式。通常推荐 JSON；如果你要补充变形器等高级逻辑，可以使用 JavaScript 形式。  
可参考[JSON 和 JavaScript](/guides/create-custom-blocks/define/json-and-js)。

### 代码生成语言

Blockly 内置多种代码生成语言。按你的应用需要选择对应语言，Block Factory 才会给出对应的块代码生成器存根。  
如果你使用自定义语言生成器，把代码拷贝到项目后再改成你的 `CodeGenerator` 类名即可。可参考[代码生成](/guides/create-custom-blocks/generating-code)。

## 代码输出

Block Factory 后续区域会给出需要拷贝到应用中的代码，用于加载你刚创建的块。一般顺序是：

1. 先执行代码头。
2. 再执行块定义。
3. 在使用工具箱前确保块定义已加载。
4. 在生成工作区代码前确保块代码生成器已加载。

每个代码区块都可用复制按钮一次性复制。

如果你还不确定这些代码该放哪里，可以参考[示例应用](/guides/get-started/get-the-code)。

### 代码头

代码头会给出加载 Blockly 核心库和所选语言生成器的代码。  
如果你在块中用到了插件字段，也会有对应导入或初始化代码，需要在后续代码前先执行。插件体系见[插件总览](/guides/programming/plugin_overview)。

### 块定义

块定义用于告诉 Blockly 你的块形状、字段、输入、颜色等信息。执行后，Blockly 就能通过 `type` 创建该块。  
在示例应用里，这部分通常可放在 `blocks/` 目录文件中。无论你的项目结构如何，都要保证“按名称引用块”之前先加载这段代码，并带上代码头。

### 生成器存根

块代码生成器用于描述该块应该生成什么代码。Block Factory 给出的存根会先帮你取出输入值和字段值，最终拼装成目标代码仍需你自己完成。  
在示例应用里，这部分通常可放在 `generators/` 目录文件中。无论你的项目结构如何，都要保证“为包含该块的工作区生成代码”之前先加载这段代码，并带上代码头。

### 视频演示

该视频详细演示了定义块流程。界面较旧，但核心能力仍可参考。

<iframe width="560" height="315" src="https://www.youtube.com/embed/s2_xaEvcVI0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 块库

你每次修改块后，块定义都会自动保存到浏览器本地存储。你可以通过顶部工具栏创建新块，或从本地存储加载已有块。

### 从旧版 Block Factory 导入

如果你之前使用过旧版 Block Factory，并且要把旧块迁移到新版，可按以下步骤操作：

1. 在旧版工具点击工具栏的 `Export Block Library` 按钮，下载包含所有块定义的文件。  
   ![旧版导出块库](/static/blockly/images/block-factory/block_factory_legacy_export.png)
2. 在新版工具点击顶部 `Load block`。
3. 在菜单选择 `Import from Block Factory`。  
   ![新版导入入口](/static/blockly/images/block-factory/block_factory_import.png)
4. 上传第 1 步下载的文件。
5. 工具会自动转换为新格式，并出现在 `Load block` 菜单中。若与已有块重名，可能会自动重命名。
6. 如果某些块解析失败，将无法导入。可到 [blockly-samples 仓库](https://github.com/RaspberryPiFoundation/blockly-samples/issues/new/choose) 提交问题并附上失败文件。
