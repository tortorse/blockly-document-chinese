# 使用 CSS 设置样式

Blockly 应用由 `HTML` 和 `SVG` 元素组成。这些元素带有 `CSS` 类，用于标识其类型（例如 `blocklyBlock`、`blocklyField`）和状态（例如 `blocklyEditing`、`blocklySelected`）。Blockly 也提供了一套默认 `CSS` 规则。

你可以通过 `CSS` 来定制应用：

- 用自己的规则覆盖 Blockly 默认规则。
- 给 Blockly 组件添加自定义类，提升选择器精度。
- 为自定义组件编写独立样式规则。

::: tip 提示
最简单的样式定制方式是主题。若需要更细粒度控制，再使用 `CSS`。参考 [/guides/configure/appearance/themes](/guides/configure/appearance/themes)。
:::

## CSS 类

Blockly 使用 `CSS` 类来标识元素，比按元素类型选择器有更细的控制能力。

### Blockly 内置 CSS 类

Blockly 的类名主要表达以下信息：

- **类型**：表示元素是什么。  
  例如块的根元素是 `blocklyBlock`。文本输入字段根元素可能同时包含 `blocklyField`、`blocklyInputField`、`blocklyTextInputField`。类型类在组件生命周期内通常不变。
- **状态**：表示元素当前状态。  
  例如文本输入正在编辑时，会带上 `blocklyEditing`；结束编辑后会移除。
- **附加信息**：提供额外上下文。  
  例如注入用的 `<div>` 会带上当前渲染器名和主题名。此类信息通常在应用生命周期内保持稳定。

查看类名最直接的方式：打开浏览器开发者工具并检查页面元素。

<a id="custom-css-classes"></a>

### 自定义 CSS 类

你可以给 Blockly 组件添加自定义类，进一步提高样式可控性。

#### 工作区

要给工作区注入 `<div>` 添加或移除类，使用 `WorkspaceSvg.addClass` 和 `WorkspaceSvg.removeClass`。

#### 工具箱

- 给工具箱中的按钮或标签加类：在工具箱 `JSON` 中使用 `web-class`。参考 [/guides/configure/toolboxes/buttons](/guides/configure/toolboxes/buttons)。
- 覆盖分类不同部分的类：在分类 `JSON` 中使用 `cssConfig`，可对单个分类定制样式。参考 [/guides/configure/toolboxes/appearance](/guides/configure/toolboxes/appearance)。

#### 块

给自定义块添加类：在 `classes` 字段传入字符串或字符串数组。

```javascript
Blockly.common.defineBlocksWithJsonArray([{
  "type": "string_length",
  "message0": "length of %1",
  "args0": [
    {
      "type": "input_value",
      "name": "VALUE",
      "check": "String",
    }
  ],
  "classes": "myStringLengthBlock",
  "output": "Number",
  "colour": 160,
}]);
```

你也可以调用 `BlockSvg.addClass` 或 `BlockSvg.removeClass`，为块的 `<g>` 元素动态增删类。

#### 标签字段

要给标签字段或可序列化标签字段使用的 `<text>` 元素增删类，调用 `FieldLabel.setClass`。也可以在标签构造函数中直接传入类名。

### CSS 类与自定义组件

实现自定义组件时，可用以下方式添加自定义类：

- 如果组件继承自 `Field` 或 `Icon`，重写 `initView`：

```javascript
class MyCustomField extends Blockly.FieldTextInput {
  ...

  initView() {
    super.initView();

    // 添加自定义类，便于样式定制。
    if (this.fieldGroup_) {
      Blockly.utils.dom.addClass(this.fieldGroup_, 'myCustomField');
    }
  }
}
```

相关内容可参考 [使用 CSS 自定义字段](https://developers.google.com/blockly/guides/create-custom-blocks/fields/customizing-fields/creating#css) 和 [创建图标视图](https://developers.google.com/blockly/guides/create-custom-blocks/icons/creating-custom-icons/basic-implementation#create_the_icons_view)。

- 创建 `SVG` 元素时，在 `Blockly.utils.dom.createSvgElement` 中传入类：

```javascript
this.svgRoot = Blockly.utils.dom.createSvgElement(Svg.G, {'class': 'myCustomComponent'});
```

- 创建 `HTML` 元素时，使用 `Blockly.utils.dom.addClass`：

```javascript
const myDiv = document.createElement('div');
Blockly.utils.dom.addClass(myDiv, 'myInformation');
```

构建后若要动态切换类，使用 `Blockly.utils.dom.addClass` 和 `Blockly.utils.dom.removeClass`：

```javascript
setMyHighlight(highlight) {
  if (highlight) {
    Blockly.utils.dom.addClass(this.svgRoot, 'myHighlight');
  } else {
    Blockly.utils.dom.removeClass(this.svgRoot, 'myHighlight');
  }
}
```

::: warning 警告
不要用 `dom.addClass` 或 `dom.removeClass` 去修改由他人组件（包括 Blockly 内部组件）管理的类名，这会导致不可预期行为。
:::

## CSS 规则背景

如果你已经熟悉 `SVG` 样式属性和 `CSS` 层叠规则，可直接跳到 [CSS 规则](#css-rules)。

<a id="svg-style"></a>

### SVG 样式属性与 CSS 属性

`SVG` 元素用 [SVG 样式属性](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute#presentation_attributes) 控制外观。它既可以写在 `SVG` 属性里（展示属性），也可以写在 `CSS` 规则里。下面四种写法效果等价：

```html
<!-- 使用 SVG 展示属性 -->
<circle fill="red" ... />
```

```html
<!-- 在 SVG 内使用 style 标签 -->
<style>
  circle {fill: red;}
</style>
<circle ... />
```

```css
/* 外部 CSS 文件 */
circle {fill: red;}
```

```html
<!-- 内联 style -->
<circle style="fill:red;" ... />
```

`SVG` 样式属性与 `CSS` 属性相关但不相同：

- **同概念同名称**：例如都用 `direction` 表示文本方向。
- **同概念不同名称**：例如 `SVG` 用 `fill`，`CSS` 用 `background-color`。
- **仅 CSS 有**：例如 `margin`、`padding`。
- **仅 SVG 有**：例如 `x`、`y`。

因此：样式目标是 `SVG` 元素时，优先看 `SVG` 样式属性；样式目标是 `HTML` 元素时，使用 `CSS` 属性。

### CSS 层叠

[CSS 层叠规则](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Cascade#cascading_order) 决定了规则优先级。当多个规则同时命中同一元素同一属性时，会按优先级选中一个。下面是针对 Blockly 常见场景的简化流程：

<a id="simplified"></a>

#### 简化层叠流程

确定某元素某属性最终规则时，按以下步骤筛选，直到只剩一个规则：

1. 收集所有命中该元素与属性的规则。
2. 若存在 `!important`，丢弃未标记 `!important` 的规则。
3. 保留特异性最高的规则。
   - `SVG` 展示属性特异性为 0。
   - `<style>` 标签与外部样式表按常规特异性计算。
   - 内联样式特异性高于任何选择器。
4. 若仍并列，取文档中靠后的规则。
5. 若仍无规则，继承父元素对应属性值。

该简化流程未覆盖以下层叠因素：

- [`transition`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition)（最高优先级；Blockly 有少量使用）。
- [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)（Blockly 有使用）。
- 浏览器或用户层规则。
- `@scope`、`@layer`、`animation`（Blockly 不使用）。

<a id="css-rules"></a>

## CSS 规则

`CSS` 规则决定应用最终样式。Blockly 提供默认规则，你可以覆盖。

### Blockly 默认 CSS 规则

Blockly 默认规则来自多个来源，加载方式和位置会影响其优先级。

#### style 标签

Blockly 大部分规则通过两个 `<style>` 标签注入。因为这两个标签通常位于页面较前位置，所以在特异性相同情况下，后出现的规则会覆盖它们。

##### Blockly.css.register 规则

Blockly 注入时会在 `<head>` 下添加一个 `<style>` 标签，规则来源包括：

- `Blockly.css` 命名空间。可在 [`core/css.ts`](https://github.com/RaspberryPiFoundation/blockly/blob/main/core/css.ts) 搜索 `let content` 查看。
- 各组件通过 `Blockly.css.register` 注入的组件规则。后注册的同特异性规则优先级更高。可参考 [Blockly.css.register 调用位置](https://github.com/search?q=repo%3ARaspberryPiFoundation%2Fblockly+css.register+path%3Acore&type=code)。

若不想使用这部分默认规则，可将配置项 [`css`](/guides/configure/configuration_struct) 设为 `false`。此时你需要自行提供替代样式。

##### 渲染器规则

渲染器实例化时也会向 `<head>` 注入一个包含渲染器专属规则的 `<style>` 标签。  
这部分规则不受 `css` 配置项影响，总会注入。可在对应渲染器中搜索 `getCss_` 查看来源。

#### 内联样式

内联样式通过 `style` 属性设置，通常在组件创建 DOM 时写入。参考 [相关代码检索](https://github.com/search?q=repo%3ARaspberryPiFoundation%2Fblockly+.style+path%3Acore&type=code)。

内联样式直接挂在元素上，特异性高于任何选择器。要覆盖它通常需要 [`!important`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity#the_!important_exception)。

#### SVG 展示属性

[SVG 展示属性](#svg-style) 是写在 `SVG` 元素属性上的 `SVG` 样式属性。其特异性为 0，且不能带 `!important`，因此在 Blockly 样式来源中优先级最低。Blockly 多在 [`createSvgElement` 调用](https://github.com/search?q=repo%3ARaspberryPiFoundation%2Fblockly%20createsvgelement%20path%3Acore&type=code) 中生成这些属性。

### 添加你自己的 CSS 规则

你可以用与 Blockly 相同的方法注入自己的规则：

- 在 Blockly 注入前调用 `Blockly.css.register`。你的规则会追加在 Blockly 规则之后，同特异性下优先级更高。
- 在 `<head>` 后部添加 `<style>` 或外链样式表。Blockly 默认规则会放在 `<head>` 前两个子节点，因此你后加的同特异性规则优先级更高。
- 在自定义组件中使用内联样式。其特异性高于任何选择器规则。
- 在自定义 `SVG` 组件中使用展示属性。其特异性低于任何选择器规则。

### 排查问题

如果样式不生效，常见原因有：

- 把 `CSS` 属性用于 `SVG` 元素，或把 `SVG` 样式属性用于 `HTML` 元素。参考 [SVG 样式属性与 CSS 属性](#svg-style)。
- 你的规则优先级低于其他规则，通常是特异性不足。可尝试：
  - 用类选择器替代元素选择器。
  - 组合多个选择器提升特异性。
  - 在目标元素上 [添加自定义类](#custom-css-classes) 后再匹配。
  - 最后手段是加 `!important`。当竞争规则来自内联样式时，这通常是唯一方式。
- 与另一条规则特异性相同，但出现顺序更早。若无法提升特异性，把规则放到页面更靠后位置。

有两类规则无法覆盖：

- 在 `transition` 中设置的属性。
- 浏览器声明的 `!important` 规则。
