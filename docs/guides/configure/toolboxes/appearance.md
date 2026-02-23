# 分类外观

Blockly 提供了默认的分类工具箱界面，并支持基础样式定制。

如果你需要更深入的 UI 定制，可参考[自定义 Blockly 工具箱 Codelab](https://blocklycodelabs.dev/codelabs/custom-toolbox/index.html?index=..%2F..index#0)和[2021 Toolbox APIs 演讲](https://www.youtube.com/watch?v=JJVX_YuKDbo&list=PLSIUOFhnxEiCjoIwJ0jAdwpTZET73CK7d&index=9&t=1s)。

![分类颜色与块颜色对应示意图。](/static/blockly/images/toolboxes/toolbox-colours.png)

## 分类 CSS

你可以使用 CSS 定制分类工具箱。

分类工具箱由多个 HTML 元素组成，每一部分对应不同角色。例如，每个分类有独立的 `div`，图标和标签分别使用不同的 `span`。

Blockly 会为同类型部件分配默认 CSS 类。例如所有标签 `span` 都会使用 `blocklyToolboxCategoryLabel`。你可以用这些类统一设置同类型部件样式。Blockly 自身也在分类工具箱默认样式中使用这些类。

你还可以给单个部件指定自定义 CSS 类。例如给不同分类标签分配不同类名，实现同类型部件的差异化样式。

### 默认 CSS 类

下表列出分类工具箱各部件的类型、描述和默认 CSS 类。

| 部件类型 | 描述 | 默认 CSS 类 |
| --- | --- | --- |
| `contents` | 包含全部分类的 `div` | `blocklyToolboxCategoryGroup` |
| `container` | 包含单个分类及其子分类的 `div` | `blocklyToolboxCategoryContainer` |
| `row` | 包含分类行的 `div` | `blocklyToolboxCategory` |
| `rowcontentcontainer` | 包含标签和图标的 `div` | `blocklyTreeRowContentContainer` |
| `icon` | 包含图标的 `span` | `blocklyToolboxCategoryIcon` |
| `label` | 包含标签文本的 `span` | `blocklyToolboxCategoryLabel` |

CSS 也用于标记部件状态：

| 状态 | 描述 | 默认 CSS 类 |
| --- | --- | --- |
| `selected` | 分类被选中时添加到 `row` `div` | `blocklyToolboxSelected` |
| `openicon` | 带子分类的分类展开时添加到 `icon` `span` | `blocklyToolboxCategoryIconOpen` |
| `closedicon` | 带子分类的分类折叠时添加到 `icon` `span` | `blocklyToolboxCategoryIconClosed` |

### 自定义 CSS 类

使用 `JSON` 工具箱时，通过 `cssConfig` 属性配置自定义类；使用 `XML` 工具箱时，通过 `css-` 前缀属性配置自定义类。部件定位都用“部件类型”来指定。

例如你想让所有标签都为白色，但每个分类行使用不同背景色，就可以为分类行添加不同自定义类。

![使用自定义 CSS 类区分分类背景色示意图。](/static/blockly/images/toolboxes/toolbox-css.png)

下面示例给每个分类的 `row` 分配自定义 CSS 类。注意示例中保留了默认 `row` 类 `blocklyToolboxCategory`，因为 Blockly 在设置类名时会覆盖 `class` 属性。如果不保留默认类，会丢失该默认类对应样式。

::::tabs
::: tab JSON
使用 `cssConfig` 配置自定义 CSS 类。

```javascript
{
  "kind": "category",
  "name": "My category",
  "cssConfig": {
    "row": "blocklyToolboxCategory myRow"  // 用部件类型 row 作为键
  },
  "contents": [...],
},
{
  "kind": "category",
  "name": "Your category",
  "cssConfig": {
    "row": "blocklyToolboxCategory yourRow"
  },
  "contents": [...],
},
```
:::
::: tab XML
使用属性名 `css-<部件类型>` 配置自定义 CSS 类。

```xml
<category name="My category" css-row="blocklyToolboxCategory myRow">
  ...
</category>
<category name="Your category" css-row="blocklyToolboxCategory yourRow">
  ...
</category>
```
:::
::::

在 CSS 文件中，可以用自定义类设置行颜色，并用默认类设置标签颜色：

```css
.myRow {background-color: green}
.yourRow {background-color: red}
.blocklyToolboxCategoryLabel {color: white}
```

## 主题

[主题](/guides/configure/appearance/themes)可以一次性定义整个工作区的颜色，包括分类颜色。  
如果你需要更细粒度控制，请使用 CSS。

要使用主题分类样式，需要在分类上设置 `categorystyle`：

::::tabs
::: tab JSON
```javascript
{
  "kind": "category",
  "name": "Logic",
  "categorystyle": "logic_category"
}
```
:::
::: tab XML
```xml
<category name="Logic" categorystyle="logic_category"></category>
```
:::
::::

### 颜色

你也可以直接在分类上指定颜色，但官方不推荐。  
颜色值是 `0-360` 的字符串，表示色相。注意字段拼写是英式 `colour`。

::::tabs
::: tab JSON
```javascript
{
  "contents": [
    {
      "kind": "category",
      "name": "Logic",
      "colour": "210"
    },
    {
      "kind": "category",
      "name": "Loops",
      "colour": "120"
    }
  ]
}
```
:::
::: tab XML
```xml
<xml id="toolbox" style="display: none">
  <category name="Logic" colour="210">...</category>
  <category name="Loops" colour="120">...</category>
  <category name="Math" colour="230">...</category>
  <category name="Colour" colour="20">...</category>
  <category name="Variables" colour="330" custom="VARIABLE"></category>
  <category name="Functions" colour="290" custom="PROCEDURE"></category>
</xml>
```
:::
::::

另外也支持使用可本地化的[颜色引用](/guides/configure/appearance/colour-formats)。
