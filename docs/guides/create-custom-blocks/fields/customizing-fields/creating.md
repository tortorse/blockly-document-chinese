# 创建新的字段类型

在创建新的字段类型之前，请考虑某个 [字段自定义方法](/guides/create-custom-blocks/fields/customizing-fields/overview) 是否符合您的需求。如果您的应用需要存储新的值类型，或者您希望为现有值类型创建新的界面，则可能需要创建新的字段类型。

如需创建新字段，请执行以下操作：

1.  [实现构造函数](#实现构造函数)。
2.  [注册 JSON 密钥并实现 `fromJson`](#json-和注册)。
3.  [处理代码块界面和事件监听器的初始化](#初始化)。
4.  [处理事件监听器的处理](#处置)（界面处置已为您处理）。
5.  [实现值处理](#值处理)。
6.  [为字段的值添加文本表示形式，以实现无障碍功能](#文本)。
7.  添加其他功能，例如：

    - [编辑器](#创建编辑器)。
    - [更新块上显示](#更新块上显示)：
    - [序列化](#序列化)。

8.  配置字段的其他方面，例如：

    - [可修改和可序列化的属性](#可修改且可序列化的属性)
    - [光标](#自定义光标)

本部分假定您已阅读并熟悉 [字段解析](/guides/create-custom-blocks/fields/anatomy-of-a-field) 中的内容。

如需查看自定义字段的示例，请参阅 [自定义字段演示](https://google.github.io/blockly-samples/examples/pitch-field-demo/)。

## 实现构造函数

字段的构造函数负责设置字段的初始值以及视需要设置 [本地校验器](/guides/create-custom-blocks/fields/validators)。无论源块是在 JSON 还是 JavaScript 中定义的，在源代码块初始化期间都会调用自定义字段的构造函数。因此，该自定义字段在构建期间无权访问源代码块。

以下代码示例创建了一个名为 `GenericField` 的自定义字段：

```javascript
class GenericField extends Blockly.Field {
  constructor(value, validator) {
    super(value, validator);

    this.SERIALIZABLE = true;
  }
}
```

### 方法署名

字段构造函数通常接受值和本地校验器。该值是可选值，如果您不传递值（或传递未通过类验证的值），系统将使用父类的默认值。对于默认 `Field` 类，该值为 `null`。如果您不想使用该默认值，请务必传递一个合适的值。验证工具参数仅适用于可编辑字段，通常标记为可选。如需详细了解验证程序，请参阅 [校验器文档](/guides/create-custom-blocks/fields/validators)。

### 结构

构造函数中的逻辑应遵循以下流程：

1. 调用继承的超级构造函数（所有自定义字段都应继承自 `Blockly.Field` 或其子类之一），以正确初始化值，并为字段设置本地校验器。
2. 如果您的字段可序列化，请在构造函数中设置相应的属性。可修改字段必须可序列化，并且默认情况下字段可修改，因此您可能应该将此属性设置为 true，除非您知道它不应可序列化。
3. 可选：应用其他自定义设置（例如，[标签字段](/guides/create-custom-blocks/fields/built-in-fields/label) 允许传递 css 类，该类随后应用于文本）。

## JSON 和注册

在 [JSON 块定义](/guides/create-custom-blocks/define-blocks#json_format_versus_javascript_api) 中，字段通过字符串（例如 `field_number`、`field_textinput`）进行描述。Blockly 维护从这些字符串到字段对象的映射，并在构造期间对相应对象调用 `fromJson`。

调用 `Blockly.fieldRegistry.register` 以将字段类型添加到此映射中，并传入字段类作为第二个参数：

```javascript
Blockly.fieldRegistry.register('field_generic', GenericField);
```

您还需要定义 `fromJson` 函数。您的实现首先应使用 [replaceMessageReferences](https://developers.google.com/blockly/reference/js/blockly.utils_namespace.parsing_namespace.replacemessagereferences_1_function) 取消对任何 [字符串表](/guides/create-custom-blocks/localize-blocks.html#字符串表)的引用，然后将值传递给构造函数。

```javascript
CustomFields.GenericField.fromJson = function(options) {
  var value = Blockly.utils.replaceMessageReferences(options['value']);
  return new CustomFields.GenericField(value);
};
```

:::tip
**注意**：目前，使用 JSON 定义时不支持本地校验器。但可以通过 [扩展程序](/guides/create-custom-blocks/extensions) 应用它们。
:::

## 初始化

字段构建后，基本上只包含一个值。 初始化是指构建 DOM、构建模型（如果字段具有模型）以及绑定事件。

### 块上显示

在初始化期间，您负责创建该字段的块上显示所需的所有内容。

#### 默认值、背景和文本

默认的 `initView` 函数会创建浅色 `rect` 元素和 `text` 元素。如果您想让字段同时包含这两种属性以及一些额外的好处，请在添加其余 DOM 元素之前调用父类 `initView` 函数。如果您希望字段中包含其中的一个元素，但不能同时包含这两个元素，则可以使用 `createBorderRect_` 或 `createTextElement_` 函数。

#### 自定义 DOM 构建

如果您的字段是通用文本字段（例如 [Text Input](/guides/create-custom-blocks/fields/built-in-fields/text-input)，则系统会为您处理 DOM 构建。否则，您需要替换 `initView` 函数，以创建未来渲染字段所需的 DOM 元素。

例如，下拉菜单字段可以同时包含图片和文字。在 `initView` 中，它会创建一个图片元素和一个文本元素。然后，在 `render_` 期间，它会根据所选选项的类型，显示活动元素并隐藏另一个元素。

您可以使用 `Blockly.utils.dom.createSvgElement` 方法或传统的 DOM 创建方法来创建 DOM 元素。

字段的区块显示要求如下：

- 所有 DOM 元素都必须是该字段的 `fieldGroup_` 的子元素。该字段组是自动创建的。
- 所有 DOM 元素都必须位于字段内报告的维度之内。

如需详细了解如何自定义和更新块级屏幕，请参阅 [渲染](#更新块上显示) 部分。

#### 添加文本符号

如果要向字段的文本添加符号（例如 [Angle](/guides/create-custom-blocks/fields/built-in-fields/angle) 字段的度数符号），可以直接将符号元素（通常包含在 `<tspan>` 中）附加到字段的 `textElement_`。

### 输入事件

默认情况下，字段会注册提示事件和鼠标悬停事件（用于显示 [编辑器](#创建编辑器)）。如果您想要监听其他类型的事件（例如，如果您想处理对字段的拖动操作），则应替换该字段的 `bindEvents_` 函数。

```javascript
bindEvents_() {
  // Call the superclass function to preserve the default behavior as well.
  super.bindEvents_();

  // Then register your own additional event listeners.
  this.mouseDownWrapper_ =
  Blockly.browserEvents.conditionalBind(this.getClickTarget_(), 'mousedown', this,
      function(event) {
        this.originalMouseX_ = event.clientX;
        this.isMouseDown_ = true;
        this.originalValue_ = this.getValue();
        event.stopPropagation();
      }
  );
  this.mouseMoveWrapper_ =
    Blockly.browserEvents.conditionalBind(document, 'mousemove', this,
      function(event) {
        if (!this.isMouseDown_) {
          return;
        }
        var delta = event.clientX - this.originalMouseX_;
        this.setValue(this.originalValue_ + delta);
      }
  );
  this.mouseUpWrapper_ =
    Blockly.browserEvents.conditionalBind(document, 'mouseup', this,
      function(_event) {
        this.isMouseDown_ = false;
      }
  );
}
```

:::tip
**注意**：替换 `bindEvents_` 时，您应始终调用基本函数。
:::
如需绑定到事件，您通常应使用 [`Blockly.utils.browserEvents.conditionalBind`](https://developers.google.com/blockly/reference/js/blockly.utils_namespace.browserevents_namespace.conditionalbind_1_function) 函数。这种绑定事件方法会在拖动期间过滤掉辅助触摸操作。如果您希望自己的处理程序即使在正在进行的拖动过程中也能运行，则可以使用 [`Blockly.browserEvents.bind`](https://developers.google.com/blockly/reference/js/blockly.utils_namespace.browserevents_namespace.bind_1_function) 函数。

## 处置

如果您在该字段的 `bindEvents_` 函数中注册了任何自定义事件监听器，则需要在 `dispose` 函数中取消注册这些监听器。

:::tip
**注意**：替换处置时，应始终调用基本函数。
:::
如果您正确 [初始化了字段的视图](#初始化)（方法是将所有 DOM 元素附加到 `fieldGroup_`），则该字段的 DOM 会自动被处理。

## 值处理

→ 如需了解字段的值及其文本，请参阅 [字段剖析](/guides/create-custom-blocks/fields/anatomy-of-a-field)。

### 校验顺序

![Flowchart describing the order in which validators are run](./validation-order.svg)

### 实现类校验器

字段应仅接受特定值。例如，数字字段应仅接受数字，颜色字段应仅接受颜色等。这可以通过类和本地 [校验器](/guides/create-custom-blocks/fields/validators) 来确保。类验证程序遵循与本地验证程序相同的规则，但前者也在 [构造函数](#实现构造函数) 中运行，因此不应引用源代码块。

如需实现字段的类验证程序，请替换 `doClassValidation_` 函数。

```javascript
doClassValidation_(newValue) {
  if (typeof newValue != 'string') {
    return null;
  }
  return newValue;
};
```

:::tip
**注意**：传递给 `doClassValidation_` 的 `newValue` 可以是任何类型（具体取决于其他开发者的责任），因此请做好准备处理边缘情况。
:::

### 处理有效值

如果传递给具有 `setValue` 的字段的值无效，您将收到 `doValueUpdate_` 回调。默认情况下，`doValueUpdate_` 函数：

- 将 `value_` 属性设置为 `newValue`。
- 将 [`isDirty_`](#isdirty_) 属性设置为 `true`。

如果您只是需要存储值，而不想进行任何自定义处理，则无需替换 `doValueUpdate_`。

或者，如果您想执行以下操作：

- `newValue` 的自定义存储空间。
- 根据 `newValue` 更改其他属性。
- 保存当前值是否有效。

您需要替换 `doValueUpdate_`：

```javascript
doValueUpdate_(newValue) {
  super.doValueUpdate_(newValue);
  this.displayValue_ = newValue;
  this.isValueValid_ = true;
}
```

:::warning
**注意**：如果字段在设置值时需要访问块或工作区的属性，您应将 `doValueUpdate_` 设置为不可用（如果不可用）。
:::

### 处理无效值

如果传递给带有 `setValue` 的字段的值无效，您将收到 `doValueInvalid_` 回调。默认情况下，`doValueInvalid_` 函数不执行任何操作。这意味着，系统默认不会显示无效值。这也意味着不会重新渲染该字段，因为系统不会设置 [`isDirty_`](#isdirty_) 属性。

如果您想显示无效值，则应替换 `doValueInvalid_`。 在大多数情况下，您应将 `displayValue_` 属性设置为无效值，将 [`isDirty_`](#isdirty_) 设置为 `true`，并 [替换呈现](#更新块上显示)，以便根据 `displayValue_`（而不是 `value_`）进行更新。

```javascript
doValueInvalid_(newValue) {
  this.displayValue_ = newValue;
  this.isDirty_ = true;
  this.isValueValid_ = false;
}
```

:::warning
**警告**：切勿将 `value_` 属性设置为无效值。在 [生成代码](/guides/create-custom-blocks/generating-code.html#getfieldvalue) 时，字段值应始终有效。
:::

#### 多部分的值

当您的字段包含多部分值（例如列表、向量、对象）时，您可能希望按照各个值的方式处理这些部分。

```javascript
doClassValidation_(newValue) {
  if (FieldTurtle.PATTERNS.indexOf(newValue.pattern) == -1) {
    newValue.pattern = null;
  }

  if (FieldTurtle.HATS.indexOf(newValue.hat) == -1) {
    newValue.hat = null;
  }

  if (FieldTurtle.NAMES.indexOf(newValue.turtleName) == -1) {
    newValue.turtleName = null;
  }

  if (!newValue.pattern || !newValue.hat || !newValue.turtleName) {
    this.cachedValidatedValue_ = newValue;
    return null;
  }
  return newValue;
}
```

在上面的示例中，`newValue` 的每个属性都经过单独验证。然后，在 `doClassValidation_` 函数结束时，如果任何单个属性无效，该值将缓存到 `cacheValidatedValue_` 属性中，然后返回 `null`（无效）。缓存包含单独验证的属性的对象可让 [`doValueInvalid_`](#处理无效值) 函数单独处理它们，只需执行 `!this.cacheValidatedValue_.property` 检查，而无需单独重新验证每个属性。

此多部分值验证模式还可用于[本地校验器](/guides/create-custom-blocks/fields/validators)，但目前无法强制执行此模式。

### isDirty\_

`isDirty_` 是在 [`setValue`](https://developers.google.com/blockly/reference/js/blockly.field_class.setvalue_1_method) 函数以及字段的其他部分中使用的标记，用于指示是否需要重新渲染该字段。如果该字段的显示值已更改，通常应将 `isDirty_` 设置为 `true`。

## 文本

→ 如需了解字段文本的使用位置及其与字段值的不同之处，请参阅 [字段剖析](/guides/create-custom-blocks/fields/anatomy-of-a-field)。

如果字段的文本值与字段的值不同，则应替换 [`getText`](https://developers.google.com/blockly/reference/js/blockly.field_class.gettext_1_method) 函数以提供正确的文本。

```javascript
getText() {
  let text = this.value_.turtleName + ' wearing a ' + this.value_.hat;
  if (this.value_.hat == 'Stovepipe' || this.value_.hat == 'Propeller') {
    text += ' hat';
  }
  return text;
}
```

## 创建编辑器

如果您定义了 `showEditor_` 函数，Blockly 将自动监听点击，并在适当的时候调用 `showEditor_`。在编辑器中，您可以通过将两个特殊 div（称为 DropDownDiv 和 WidgetDiv 之一）封装在一起来显示 HTML，这两个 div 浮动在 Blockly 界面的其余部分上方。
:::tip
**重要提示**：应在 [渲染](#更新块上显示) 期间处理对编辑器屏幕的更新，而不是立即进行处理。这样，校验器就可以在应用值之前对其进行拦截。
:::

### DropDownDiv 与 WidgetDiv

`DropDownDiv` 用于提供位于与字段相连的框内的编辑器。它会自动定位自身靠近字段，同时保持在可见边界内。角度选择器和颜色选择器都是很好的 `DropDownDiv` 示例。

![Image of angle picker](./angle-picker.png)

[`WidgetDiv`](https://developers.google.com/blockly/reference/js/blockly.widgetdiv_namespace) 用于提供未位于框中的编辑器。数字字段使用 WidgetDiv 以通过 HTML 文本输入框覆盖该字段。DropDownDiv 会为您处理位置，而 WidgetDiv 则不负责。您需要手动定位元素。坐标系采用相对于窗口左上角的像素坐标。文本输入编辑器就是一个很好的 `WidgetDiv` 示例。

![Image of text input editor](./text-input-editor.png)

### DropDownDiv 示例代码

```javascript
showEditor_() {
  // Create the widget HTML
  this.editor_ = this.dropdownCreate_();
  Blockly.DropDownDiv.getContentDiv().appendChild(this.editor_);

  // Set the dropdown's background colour.
  // This can be used to make it match the colour of the field.
  Blockly.DropDownDiv.setColour('white', 'silver');

  // Show it next to the field. Always pass a dispose function.
  Blockly.DropDownDiv.showPositionedByField(
      this, this.disposeWidget_.bind(this));
}
```

:::tip
**注意**：以程序化方式创建 HTML 可能相当冗长，因此在这里不做介绍。有关示例，请参阅 [自定义字段演示](https://google.github.io/blockly-samples/examples/pitch-field-demo/)。
:::

### WidgetDiv 示例代码

```javascript
showEditor_() {
  // Show the div. This automatically closes the dropdown if it is open.
  // Always pass a dispose function.
  Blockly.WidgetDiv.show(
    this, this.sourceBlock_.RTL, this.widgetDispose_.bind(this));

  // Create the widget HTML.
  var widget = this.createWidget_();
  Blockly.WidgetDiv.DIV.appendChild(widget);
}
```

:::tip
**注意**：以编程方式创建 widget HTML 可能会非常耗时，因此在这里不提供。有关示例，请参阅 [文本输入字段](https://github.com/google/blockly/blob/master/core/field_textinput.js)的实现。
:::
:::tip
**注意**：如果您要创建一个 widget，其行为类似于输入，但使用自定义元素，您可以将 `data-is-text-input='true'` 添加到元素中，以通知 Blockly 将相应元素视为输入。
:::

### 清理

DropDownDiv 和 WidgetDiv 句柄都会销毁 widget HTML 元素，但您需要手动处理已应用于这些元素的所有事件监听器。

```javascript
widgetDispose_() {
  for (let i = this.editorListeners_.length, listener;
      listener = this.editorListeners_[i]; i--) {
    Blockly.browserEvents.unbind(listener);
    this.editorListeners_.pop();
  }
}
```

`dispose` 函数在 `DropDownDiv` 上的 `null` 上下文中调用。在 `WidgetDiv` 上，系统会在 `WidgetDiv` 的上下文中调用它。无论是哪种情况，最好在传递处理函数时使用 [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) 函数，如上面的 `DropDownDiv` 和 `WidgetDiv` 示例所示。

→ 如需了解如何处置而不是具体对编辑器处置，请参阅 [处置](#处置)。

## 更新块上显示

`render_` 函数用于更新字段的块状屏幕，以匹配其内部值。

常见示例包括：

- 更改文字（下拉菜单）
- 更改颜色（颜色）

:::tip
**重要提示**：该字段绝不应直接调用 `render_`，而应通过将 [`isDirty_`](#isdirty_) 属性设置为 `true` 来触发重新渲染。
:::

### 默认值

默认的 `render_` 函数会将显示文本设置为 [`getDisplayText_`](https://developers.google.com/blockly/reference/js/blockly.field_class.getdisplaytext__1_method) 函数的结果。`getDisplayText_` 字段在截断为遵循最大文本长度后，将该字段的 `value_` 属性转换为字符串。

如果您使用的是默认块状显示区域，并且默认文本行为适用于字段，则无需替换 `render_`。

如果默认文本行为适用于字段，但字段的区块显示屏包含其他静态元素，您可以调用默认的 `render_` 函数，但仍需要替换该函数以 [更新字段的大小](#更新尺寸)。

如果默认文本行为不适用于您的字段，或者您字段的块状显示包含其他动态元素，则您需要[自定义 `render_` 函数](#自定义渲染)。

![Flowchart describing how to make decision of whether to override render_](./override-render-decision.svg)

### 自定义渲染

如果默认渲染行为不适用于您的字段，您需要定义自定义渲染行为。这涉及设置自定义显示文本、更改图片元素以及更新背景颜色等。

所有 DOM 属性更改都是合法的，请注意以下两点：

1.  应在 [初始化](#初始化) 期间处理 DOM _创建_，因为它效率更高。
2.  您应始终 [更新 `size_`](#更新尺寸) 属性，以与块上呈现的尺寸一致。

```javascript
render_() {
  switch(this.value_.hat) {
    case 'Stovepipe':
      this.stovepipe_.style.display = '';
      break;
    case 'Crown':
      this.crown_.style.display = '';
      break;
    case 'Mask':
      this.mask_.style.display = '';
      break;
    case 'Propeller':
      this.propeller_.style.display = '';
      break;
    case 'Fedora':
      this.fedora_.style.display = '';
      break;
  }

  switch(this.value_.pattern) {
    case 'Dots':
      this.shellPattern_.setAttribute('fill', 'url(#polkadots)');
      break;
    case 'Stripes':
      this.shellPattern_.setAttribute('fill', 'url(#stripes)');
      break;
    case 'Hexagons':
      this.shellPattern_.setAttribute('fill', 'url(#hexagons)');
      break;
  }

  this.textContent_.nodeValue = this.value_.turtleName;

  this.updateSize_();
}
```

:::tip
**重要提示**：请始终使用 `this.textContent_.nodeValue` 更新字段的显示文本。这有助于支持 [文本符号](#添加文本符号)。
:::

### 更新尺寸

更新字段的 `size_` 属性非常重要，因为它可以指示块渲染代码如何定位该字段。准确了解 `size_` 的最佳方式就是进行实验。

```javascript
updateSize_() {
  const bbox = this.movableGroup_.getBBox();
  let width = bbox.width;
  let height = bbox.height;
  if (this.borderRect_) {
    width += this.constants_.FIELD_BORDER_RECT_X_PADDING * 2;
    height += this.constants_.FIELD_BORDER_RECT_X_PADDING * 2;
    this.borderRect_.setAttribute('width', width);
    this.borderRect_.setAttribute('height', height);
  }
  // Note how both the width and the height can be dynamic.
  this.size_.width = width;
  this.size_.height = height;
}
```

:::warning
**注意**：在渲染期间调用 `getBBox` 可能会导致布局抖动，因此您可能需要了解其他获取尺寸的方式。
:::
:::tip
**注意**：字段的宽度和高度可以动态变化，更新尺寸不必包含在它自己的函数中；它可以在 `render_` 中进行处理。不过，为便于整理代码，通常会将其分开。
:::

### 匹配块颜色

如果您希望字段的元素与其所附加到的块的颜色一致，则应替换 `applyColour` 方法。您需要通过块的样式属性访问颜色。

```javascript
applyColour() {
  const sourceBlock = this.sourceBlock_;
  if (sourceBlock.isShadow()) {
    this.arrow_.style.fill = sourceBlock.style.colourSecondary;
  } else {
    this.arrow_.style.fill = sourceBlock.style.colourPrimary;
  }
}
```

:::tip
**注意**：您可能需要在 `applyColour` 方法中缓存颜色，以便在激活后将其应用于您的 [编辑器](#创建编辑器)。
:::

### 更新可修改性

`updateEditable` 函数可用于更改字段的显示方式，具体取决于其是否可以修改。默认函数会让背景具有悬停响应（边框不可修改）。块状屏幕不应根据其可修改性而更改尺寸，但允许进行所有其他更改。

```javascript
updateEditable() {
  if (!this.fieldGroup_) {
    // Not initialized yet.
    return;
  }
  super.updateEditable();

  const group = this.getClickTarget_();
  if (!this.isCurrentlyEditable()) {
    group.style.cursor = 'not-allowed';
  } else {
    group.style.cursor = this.CURSOR;
  }
}
```

:::warning
**注意**：与字段的光标混淆起来将很不稳定。
:::

## 序列化

[序列化](/guides/configure/web/serialization)是指保存字段的状态，以便稍后重新加载到工作区中。

工作区的状态始终包含相应字段的值，但也可能包含其他状态，例如字段界面的状态。例如，如果您的字段是支持用户选择国家/地区的可缩放地图，您也可以序列化缩放级别。

如果您的字段可序列化，则必须将 `SERIALIZABLE` 属性设置为 `true`。

Blockly 为字段提供了两组序列化钩子。一对钩子用于新的 JSON 序列化系统，另一对钩子与旧的 XML 序列化系统搭配使用。

### `saveState` 和 `loadState`

`saveState` 和 `loadState` 是适用于新 JSON 序列化系统的序列化钩子。

在某些情况下，您无需提供这些信息，因为默认实现是有效的。如果 (1) 您的字段是基础 `Blockly.Field` 类的直接子类，(2) 您的值是 [JSON 可序列化类型](https://en.wikipedia.org/wiki/JSON#Data_types)，并且 (3) 您只需要序列化该值，那么默认实现将没有问题！

否则，您的 `saveState` 函数应返回一个表示字段状态的 JSON 可序列化对象/值。您的 `loadState` 函数应接受相同的 JSON 可序列化对象/值，并将其应用于该字段。

```javascript
saveState() {
  return {
    'country': this.getValue(),  // Value state
    'zoom': this.getZoomLevel(), // UI state
  };
}

loadState(state) {
  this.setValue(state['country']);
  this.setZoomLevel(state['zoom']);
}
```

`saveState` 还会收到一个可选参数 `doFullSerialization`。这对于通常引用由不同 [序列化器](/guides/configure/serialization.html#序列化器钩子) 序列化的状态的字段很有用。它会告知它们引用的状态将不可用，因此该字段应执行所有序列化本身。例如，当单个块序列化（而不是序列化整个工作区）时，就会出现这种情况。

内置变量字段就是使用此字段的一个字段。通常，它会返回它引用的变量的 ID，但如果 `doFullSerialization` 为 true，则会返回所有状态。

```javascript
saveState(doFullSerialization) {
  const state = {'id': this.variable_.getId()};
  if (doFullSerialization) {
    state['name'] = this.variable_.name;
    state['type'] = this.variable_.type;
  }
  return state;
}

loadState(state) {
  const variable = Blockly.Variables.getOrCreateVariablePackage(
      this.getSourceBlock().workspace,
      state['id'],
      state['name'],   // May not exist.
      state['type']);  // May not exist.
  this.setValue(variable.getId());
}
```

在序列化单个块时，请务必对所有状态（而不是引用）进行序列化，因为如果没有这样做，并且您将该块反序列化到引用不存在的工作区中，则该字段将具有无效的值。

### `toXml` 和 `fromXml`

`toXml` 和 `fromXml` 是适用于旧版 XML 序列化系统的序列化钩子。请仅在必要时使用这些钩子（例如，您正在使用尚未迁移的旧代码库），否则请使用 `saveState` 和 `loadState`。

您的 `toXml` 函数应返回一个表示字段状态的 XML 节点。您的 `fromXml` 函数应接受相同的 XML 节点，并将其应用于该字段。

```javascript
toXml(fieldElement) {
  fieldElement.textContent = this.getValue();
  fieldElement.setAttribute('zoom', this.getZoomLevel());
  return fieldElement;
}

fromXml(fieldElement) {
  this.setValue(fieldElement.textContent);
  this.setZoomLevel(fieldElement.getAttribute('zoom'));
}
```

## 可修改且可序列化的属性

`EDITABLE` 属性用于确定该字段是否应具有界面以指示它可以与其交互。默认值为 `true`。

`SERIALIZABLE` 属性用于确定是否应序列化相应字段。默认为 `false`。如果此属性为 `true`，您可能需要提供序列化和反序列化函数（请参阅 [序列化](#序列化)）。

:::tip
**重要提示**：如果字段的 `EDITABLE` 为 `true`，则 `SERIALIZABLE` 也应设置为 `true`。由于向后兼容性的原因，默认情况下并不如此。
:::

## 自定义光标

`CURSOR` 属性决定了用户将鼠标悬停在字段上时会看到的光标。它应该是有效的 CSS 光标字符串。默认为由 `.blocklyDraggable` 定义的光标，即抓取光标。
