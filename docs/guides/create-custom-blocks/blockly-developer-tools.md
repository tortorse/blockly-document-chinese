# Blockly 开发者工具

[Blockly Developer Tools](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html) 是一个基于Web的开发人员工具，可自动执行部分 Blockly 配置过程，包括创建自定义块，构建工具箱以及配置 web Blockly 工作区。

使用该工具的 Blockly 开发人员流程包括三个部分：

- 使用 Block Factory 和 Block Exporter 创建自定义块

- 使用 Workspace Factory 构建工具箱和默认工作区

- 使用 Workspace Factory 配置工作区（当前是仅限Web的功能）

## 块工厂 (Block Factory) 选项卡

“块工厂”(Block Factory)选项卡可帮助您为自定义块创建 [块定义](/guides/create-custom-blocks/define-blocks) 和 [代码生成器](/guides/create-custom-blocks/generating-code.html)。在此选项卡上，您可以轻松创建，修改和保存自定义块。

### 定义一个块

该视频详细介绍了定义块的步骤。 用户界面已过时，但突出显示的块功能仍然准确。

<iframe width="560" height="315" src="https://www.youtube.com/embed/s2_xaEvcVI0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 管理库

块由其名称引用，因此要创建的每个块必须具有唯一的名称。用户界面强制执行此操作，并在您“保存”新块或“更新”现有块时明确说明。

![block_save_as](./block_save_as.png)
![update_button](./update_button.png)

您可以在之前保存的块之间切换，也可以通过单击“库”按钮创建新的空块。更改现有块的名称是另一种快速创建具有相似定义的块的方法。

![blocklib_button](./blocklib_button.png)

### 导出和导入库

块将保存到浏览器的本地存储中。清除浏览器的本地存储将删除您的块。要无限期保存块，必须下载库。您的块库将作为 XML 文件下载，可以导入该块以将块库设置为下载文件时的状态。请注意，导入块库会替换当前块，因此您可能希望先导出。

导入和导出功能也是维护和共享不同自定义块集的推荐方法。

![block_manage_buttons](./block_manage_buttons.png)

## 块导出器 (Block Exporter) 选项卡

设计块后，需要导出块定义和生成器存根，以便在应用程序中使用它们。这是在“块导出器”选项卡上完成的。

存储在块库中的每个块都将显示在块选择器中。单击块以选择或取消选择它以进行导出。如果要选择库中的所有块，请使用“选择”→“所有存储在块库”选项。如果使用“工作区工厂”选项卡构建工具箱或配置工作区，则还可以通过单击“选择”→“工作区工厂中的所有使用”来选择所用的所有块。

![block_exporter_select](./block_exporter_select.png)

通过导出设置，您可以选择要定位的生成语言，以及是否需要所选块的定义，生成器存根或两者。选择这些后，单击“导出”以下载文件。

![block_exporter_tab](./block_exporter_tab.png)

## 工作区工厂 (Workspace Factory) 选项卡

Workspace Factory可以轻松配置工作区和工作区中的默认块集。您可以使用“工具箱”和“工作区”按钮在编辑工具箱和起始工作区之间切换。

![ws_fac_tb_ws_buttons](./ws_fac_tb_ws_buttons.png)


### 构建工具箱

此选项卡有助于为工具箱构建 XML。该材料假定您熟悉 [工具箱](/guides/configure/web/toolbox.html) 的功能。如果您已在此处编辑了要编辑的工具箱的 XML，则可以通过单击“加载到编辑”来加载它。

### 没有分类的工具箱

如果您有几个块并且想要显示它们而没有任何类别，只需将它们拖到工作区中，您将看到预览中的工具箱中出现了块.

![](./workspace_fac_no_cat.png)

### 带有分类的工具箱

如果要在类别中显示块，请单击“+”按钮并选择新类别的下拉项。这会将类别添加到您可以选择和编辑的类别列表中。选择“标准类别”以添加单个标准块类别（逻辑，循环等）或“标准工具箱”以添加所有标准块类别。使用箭头按钮重新排序类别。

![](./category_menu.png)

::: tip 注意
标准分类和工具箱包括 [游乐场](https://blockly-demo.appspot.com/static/tests/playground.html) 中的所有块。这组块不适用于大多数应用程序，应根据需要进行修剪。此外，移动设备尚不支持某些功能块。
:::

要更改所选类别的名称或颜色，请使用“编辑类别”下拉列表。将块拖动到工作区中会将其添加到所选类别。

![](./edit_category.png)

### 高级块
默认情况下，您可以将库中的任何标准块或任何块添加到工具箱中。如果您在 JSON 中定义了不在库中的块，则可以使用“导入自定义块”按钮导入它们。

某些块应该一起使用或包含默认值。这是通过 [组和影子块](/guides/configure/toolbox.html) 完成的。在编辑器中连接的任何块都将作为一个组添加到工具箱中。通过选择子块并单击“制作阴影”按钮，也可以将附加到另一个块的块更改为阴影块。注意：只有不包含变量的子块可能会更改为阴影块。

如果在其工具箱中包含变量或功能块，请在工具箱中包含“变量”或“功能”类别，以允许用户充分利用该块。了解有关 [“变量”或“函数”分类](/guides/configure/toolbox.html#分类.html) 的更多信息。

### 配置工作区

要配置工作区的不同部分，请转到“工作区工厂(Workspace Factory)”选项卡，然后选择“工作区(Workspace)”。

#### 选择工作区选项

为 [配置选项](/guides/get-started.html#配置) 设置不同的值， 并在预览区域中查看结果。启用 [网格](/guides/configure/grid) 或 [缩放](/guides/configure/zoom.html) 功能可显示更多选项。此外，切换到使用类别通常需要更复杂的工作空间; 添加第一个类别时会自动添加垃圾桶和滚动条。

![](./configure_workspace.png)

#### 将预加载的块添加到工作区

这是可选的，但如果要在工作空间中显示一组块，则可能是必需的：

- 当应用程序加载时。

- 当触发事件（提升级别，单击帮助按钮等）时。

将块拖动到编辑空间中以在预览中的工作区中查看它们。您可以在选择块组时创建块组，禁用块以及创建某些影子块。

![](./load_workspace_blocks.png)

您可以将这些块导出为 XML（请参见下文）。创建工作区后，立即使用 `Blockly.Xml.domToWorkspace` 将它们添加到您的工作区中：

```javascript
var xmlText = '<xml xmlns="https://developers.google.com/blockly/xml">' +
    '<block type="math_number"></block></xml>';
Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xmlText), workspace);
```

此示例代码将单个 `math_number` 块添加到工作区。

### 导出

工作区工厂(Workspace Factory)为您提供以下导出选项：

![](./workspace_export_opt.png)

- 初始代码：生成初始 html 和 javascript 以注入您自定义的 Blockly 工作区。
- Toolbox：生成 XML 用来设定您的工具箱。
- 工作区块：生成可以加载到工作区的 XML。