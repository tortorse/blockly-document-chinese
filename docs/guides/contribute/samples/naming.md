# 插件命名规约

## 概览

一致的插件名称对于整理和搜索插件，以及在 npm 上查找已发布的插件很有用。

本页列出了我们的标准插件命名惯例。如果您的插件不属于任何类别，请使用本页面底部的通用插件命名格式。

我们建议您在 `package.json` 中添加建议的标记，以便更轻松地在 npm 上找到插件。

## 插件类型

### 字段

字段插件发布单个自定义字段。

加载字段插件会注册一种新的字段类型，用于页面中的所有 Blockly 工作区。

详细了解如何 [创建自定义字段](/guides/create-custom-blocks/fields/customizing-fields/overview.html)。

| <div style="min-width:9em">第一方</div> | <div style="min-width:9em">第三方</div> | 示例                                                                                           | 建议的标签                |
| --------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------- |
| `@blockly/field-*`                      | `blockly-field-*`                       | [`@blockly/field-slider`](https://google.github.io/blockly-samples/plugins/field-slider/test/) | `blockly-plugin`，`field` |

### 主题

主题插件会发布单个 Blockly 主题。

加载主题插件可为页面上的所有 Blockly 工作区定义一个新主题。

详细了解 [主题](/guides/configure/themes.html)。

| <div style="min-width:9em">第一方</div> | <div style="min-width:9em">第三方</div> | 示例                                                                           | 建议的标签                |
| --------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------ | ------------------------- |
| `@blockly/theme-*`                      | `blockly-theme-*`                       | [`@blockly/theme-modern`](https://www.npmjs.com/package/@blockly/theme-modern) | `blockly-plugin`，`theme` |

### 块

块插件可以发布一个或多个块定义。

加载块插件会为页面上的所有 Blockly 工作区定义这些块。

详细了解如何 [创建自定义块](/guides/create-custom-blocks/define-blocks.html)。

| <div style="min-width:10em">第一方</div> | <div style="min-width:10em">第三方</div> | 示例                                                                                                    | 建议的标签                          |
| ---------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `@blockly/block(s)-*`                    | `blockly-block(s)-*`                     | [`@blockly/blocks-plus-minus`](https://google.github.io/blockly-samples/plugins/block-plus-minus/test/) | `blockly-plugin`，`block`，`blocks` |

### 块扩展

块扩展插件会发布一个或多个块扩展，它们可用于以编程方式共享块之间的行为。

加载块扩展插件会注册扩展程序，以用于页面上的所有 Blockly 工作区。

详细了解 [扩展](/guides/create-custom-blocks/extensions.html)。

| <div style="min-width:11em">第一方</div> | <div style="min-width:10em">第三方</div> | <div style="min-width:2em">示例</div> | 建议的标签                          |
| ---------------------------------------- | ---------------------------------------- | ------------------------------------- | ----------------------------------- |
| `@blockly/extension-*`                   | `blockly-extension-*`                    | 尚无                                  | `blockly-plugin`、`block-extension` |

### 工作区

工作区插件可为单个工作区添加行为。

在 Blockly 工作区上初始化工作区插件之前，加载插件不会执行任何操作。

| 第一方                 | 第三方                | 示例 | 建议的标签                    |
| ---------------------- | --------------------- | ---- | ----------------------------- |
| `@blockly/workspace-*` | `blockly-workspace-*` | 尚无 | `blockly-plugin`、`workspace` |

### 通用插件

这是最通用的插件类型。如果您的插件不符合任何其他插件类型的要求，请使用此命名惯例。

| 第一方              | 第三方             | 示例                                                                                    | 建议的标签       |
| ------------------- | ------------------ | --------------------------------------------------------------------------------------- | ---------------- |
| `@blockly/plugin-*` | `blockly-plugin-*` | [`@blockly/plugin-modal`](https://google.github.io/blockly-samples/plugins/modal/test/) | `blockly-plugin` |
