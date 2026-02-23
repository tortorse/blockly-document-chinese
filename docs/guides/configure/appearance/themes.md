# 主题

主题用于定制 Blockly 的外观和体验。你可以通过 `Themes` 类自定义块颜色、分类颜色和部分组件。对于未被主题字段直接覆盖的组件，Blockly 会把主题名作为类名挂到注入的 `div` 上，你可以继续用 `CSS` 调整。主题体系的目标之一是帮助开发者构建更易访问的 Blockly 体验。

::: tip 提示
给 Blockly 做样式定制，最简单的方式是主题。若需要更细粒度控制，请使用 [CSS](/guides/configure/appearance/css)。
:::

::: tip 提示
如果你只想控制块的主色，而不需要完整外观控制，可以直接在块定义里设置颜色，参考 [块颜色](/guides/configure/appearance/block-colour)。如果你要改块形状而不是颜色，请参考 [Renderers](https://developers.google.com/blockly/guides/create-custom-blocks/renderers/overview)。
:::

## 主题属性

主题是一个对象，通常包含这些属性：要继承的基础主题、块样式对象、分类样式对象、组件样式对象、字体样式对象，以及是否给起始块使用帽子的配置。

::: warning 重要
Blockly 代码中使用非美式拼写 `colour`。所有颜色属性都支持色相值或十六进制值。
:::

### 块样式

块样式由四个字段组成：

- `colourPrimary`（必填）：块背景色。
- `colourSecondary`（可选）：阴影块背景色。
- `colourTertiary`（可选）：块边框色或高亮色。
- `hat`（可选）：当值为 `cap` 时为块加帽子。更多说明见 [起始帽子使用场景](/guides/design/applications.html#事件驱动程序)。

![块主色、副色、第三色示意图。](/static/blockly/images/appearance/ColourExplanation.png)

```javascript
const listBlocks = {
   'colourPrimary': '#4a148c',
   'colourSecondary': '#AD7BE9',
   'colourTertiary': '#CDB6E9',
   'hat': 'cap'
}
```

主题中的 `blockStyles` 是“样式名 -> 样式对象”的映射：

```javascript
const blockStyles = {
   'list_blocks': {
      'colourPrimary': '#4a148c',
      'colourSecondary': '#AD7BE9',
      'colourTertiary': '#CDB6E9'
   },
   'logic_blocks': {
      'colourPrimary': '#01579b',
      'colourSecondary': '#64C7FF',
      'colourTertiary': '#C5EAFF'
   }
}
```

### 分类样式

分类样式只包含一个颜色属性：

- `colour`（必填）：工具箱中该分类的颜色。通常建议和该分类多数块的 `colourPrimary` 保持一致，便于用户识别分类归属。

![工具箱分类颜色示意图。](/static/blockly/images/appearance/CategoryColours.png)

```javascript
const mathCategory = {
   'colour':'290'
}
```

主题中的 `categoryStyles` 同样是映射结构：

```javascript
const categoryStyles = {
   'list_category': {
      'colour': '#4a148c'
   },
   'logic_category': {
      'colour': '#01579b',
   }
}
```

### 组件样式

主题可设置以下组件的颜色或数值：

- `workspaceBackgroundColour`：工作区背景色
- `toolboxBackgroundColour`：工具箱背景色
- `toolboxForegroundColour`：工具箱分类文本颜色
- `flyoutBackgroundColour`：弹出层背景色
- `flyoutForegroundColour`：弹出层标签文本颜色
- `flyoutOpacity`：弹出层透明度
- `scrollbarColour`：滚动条颜色
- `scrollbarOpacity`：滚动条透明度
- `insertionMarkerColour`：插入标记颜色
- `insertionMarkerOpacity`：插入标记透明度
- `markerColour`：键盘导航模式下标记颜色
- `cursorColour`：键盘导航模式下光标颜色

多数其他组件可以通过主题名配合 `CSS` 调整。如果某个组件既不在上述列表、也无法通过 `CSS` 调整，可在这里提交需求：[issue](https://github.com/RaspberryPiFoundation/blockly/issues/new/choose)。

```javascript
const componentStyle = {
   'workspaceBackgroundColour': '#1e1e1e',
   'toolboxBackgroundColour': '#333'
}
```

### 字体样式

字体样式对象包含字体族、字重和字号：

```javascript
const fontStyle = {
   'family': 'Georgia, serif',
   'weight': 'bold',
   'size': 12
}
```

### 起始帽子

::: tip 提示
起始帽子的使用场景见 [应用设计页](/guides/design/applications.html#事件驱动程序)。
:::

如果你在主题对象上设置 `startHats: true`，所有没有上连接且没有输出连接的块都会加帽子。若要更精细控制哪些块有帽子，请在块样式中设置 `hat`。

## 自定义主题

把主题接入 Blockly 应用通常分三步：

1. 创建主题
2. 添加样式名称
3. 在工作区设置主题

### 创建主题

主题可以通过构造函数创建，也可以使用 `defineTheme` 创建。`defineTheme` 便于扩展已有主题，并用一个对象集中设置所有值。主题有名称，并包含上面介绍的块样式、分类样式和其他属性。

主题还可以指定基础主题，为未显式设置的字段提供默认值。

```javascript
const theme = Blockly.Theme.defineTheme('themeName', {
   'base': Blockly.Themes.Classic,
   'blockStyles': {
      'logic_blocks': {
         'colourPrimary': '#4a148c'
      },
      'math_blocks': {...}
   },
   'categoryStyles': {...},
   'componentStyles': {...},
   'fontStyle': {...},
   'startHats': true
});
```

`defineTheme` 用法示例见：[theme-dark 示例](https://github.com/RaspberryPiFoundation/blockly-samples/blob/aba88bea60bddf3d31ce630b836e2933836ed287/plugins/theme-dark/src/index.js#L21)。

### 添加样式名称

创建主题后，需要把样式名绑定到分类定义和块定义。

#### 分类

要使用 `categoryStyles` 中定义的分类样式，在分类定义里设置 `categorystyle`：

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

#### 块

要使用 `blockStyles` 中定义的块样式，在块定义里设置样式名：

::::tabs
::: tab JSON
```javascript
"style":"logic_blocks"
```
:::
::: tab JavaScript
```javascript
this.setStyle('logic_blocks');
```
:::
::::

### 在工作区设置主题

你还需要告诉 Blockly 当前工作区使用哪个主题。若你定义了多个主题，并且它们复用同一套块样式名和分类样式名，就可以允许用户动态切换主题，而无需改块定义本身。

#### 初始主题

设置初始主题的最佳方式是在 `Blockly.inject` 调用中提供 `theme` 配置。可传入 `JSON` 或 `JavaScript` 主题对象。

::::tabs
::: tab JSON
```javascript
Blockly.inject('blocklyDiv', {
  theme: {
     "blockStyles" : {
        "list_blocks": {
           "colourPrimary": "#4a148c",
           "colourSecondary":"#AD7BE9",
           "colourTertiary":"#CDB6E9"
        }
     },
     "categoryStyles" : {
        "list_category": {
           "colour": "#4a148c"
        }
     },
     "componentStyles" : {
        "workspaceBackgroundColour": "#1e1e1e"
     }
  },
  ...
});
```
:::
::: tab JavaScript
```javascript
Blockly.inject('blocklyDiv', {
  theme: Blockly.Theme.defineTheme('themeName', {
     'blockStyles': blockStyles,
     'categoryStyles': categoryStyles,
     'componentStyles': componentStyles
  }),
  ...
});
```
:::
::::

如果没有提供主题，默认使用 [Classic Theme](https://github.com/RaspberryPiFoundation/blockly/blob/main/core/theme/classic.ts)。

#### 动态主题

如果你要在运行时切换主题，例如让用户通过下拉菜单选择主题，可调用：

```javascript
yourWorkspace.setTheme(theme);
```

## 创建块样式脚本

Blockly 提供了一个脚本：输入色相值或十六进制值映射后，会自动计算对应的二级色和三级色。脚本位置：[`scripts/themes`](https://github.com/RaspberryPiFoundation/blockly/tree/main/scripts/themes)。

## 内置主题

Blockly 提供了多套面向无障碍场景的主题，重点覆盖不同类型的色觉缺陷：

- [High contrast](https://raspberrypifoundation.github.io/blockly-samples/plugins/theme-highcontrast/test/)
- [Deuteranopia/Protanopia](https://raspberrypifoundation.github.io/blockly-samples/plugins/theme-deuteranopia/test/)
- [Tritanopia](https://raspberrypifoundation.github.io/blockly-samples/plugins/theme-tritanopia/test/)

另外还包括：

- Classic theme
- [Modern](https://raspberrypifoundation.github.io/blockly-samples/plugins/theme-modern/test/)
- [Dark mode](https://raspberrypifoundation.github.io/blockly-samples/plugins/theme-dark/test/)
