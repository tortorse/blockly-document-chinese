# 升级自定义字段

2019 年 7 月（[版本 2.20190722](https://github.com/google/blockly/releases/tag/2.20190722.0)）添加了一个更加编码的字段 API。它旨在尽可能向后兼容。这意味着，如果您在 2019 年 7 月之前创建了自定义字段，它很可能会继续工作。在决定您的自定义字段是否需要升级之前，您应该通读 [危险区域](#危险区域) 部分，并对您的字段进行全面测试。

由于在 2019 年 7 月之前字段之间缺乏标准化，因此很难涵盖开发人员可能需要进行的所有更改。本文档试图涵盖所有可能的更改，但如果本文档未涵盖您感兴趣的内容，请阅读 [获取升级帮助](#获取升级帮助) 部分。

::: tip 注意：
如果您有少量自定义字段，则使用 [自定义字段创建说明](/guides/create-custom-blocks/fields/customizing-fields/creating.html) 简单地重写它们可能更容易，而不是尝试逐个升级它们。
:::

## 危险区域

危险区域是 API 已更改的已知位置，您的字段可能会被破坏。

### Blockly.Field.register

字段不再通过 注册 `Blockly.Field.register();`。现在有一个 fieldRegistry 命名空间来处理注册。

```javascript
Blockly.Field.register('my_field_name', myFieldClass);
```

变成：

```javascript
Blockly.fieldRegistry.register('my_field_name', myFieldClass);
```

### setText

Blockly 核心不再调用 `setText` 函数，因此，如果您的 `setText` 函数包含逻辑，它需要移至 [值处理](/guides/create-custom-blocks/fields/customizing-fields/creating.html#值处理) 套件、[getText](/guides/create-custom-blocks/fields/customizing-fields/creating.html#文本) 函数和 [渲染函数](/guides/create-custom-blocks/fields/customizing-fields/creating.html#更新块上显示)（具体取决于 `setText` 函数的作用）。

```javascript
CustomFields.UpgradeField.prototype.setText = function(newText) {
  // Do validation.
  if (typeof newText != 'string' || newText === this.text_) {
    return;
  }
  // Fire event.
  if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
    Blockly.events.fire(
      new Blockly.Events.BlockChange(
        this.sourceBlock_,
        'field',
        this.name,
        this.text_,
        newText
      )
    );
  }
  // Update text value.
  this.text_ = 'prefix' + newText;
  // Rerender.
  this.size_.width = 0;
};
```

变成：

```javascript
CustomFields.UpgradeField.prototype.doClassValidation_ = function(newValue) {
  if (typeof newValue != 'string') {
    return null;
  }
  return newValue;
};
CustomFields.UpgradeField.prototype.getText = function() {
  return 'prefix' + this.value_;
};
```

Blockly 自动处理：

- 检查新值是否与旧值不同。
- 更新价值。
- 触发更改事件。
- 重新渲染字段。

您将需要处理：

- [值校验](/guides/create-custom-blocks/fields/customizing-fields/creating.html#值处理)( `doClassValidation_`)。
- [字段文本](/guides/create-custom-blocks/fields/customizing-fields/creating.html#文本)( `getText`)。
- [字段用户界面](/guides/create-custom-blocks/fields/customizing-fields/creating.html#更新块上显示)

:::tip
**注意**：我们建议您将 `setText` 调用更改为 `setValue` 调用，因为 `setValue` 支持验证，而 `setText` 不支持验证。
:::

## 推荐升级

推荐的升级是字段 API 发生更改的位置，但如果您选择不进行更改，该字段很可能会仍然正常运行。

### 序列化

有关 `EDITABLE` 和 `SERIALIZABLE` 属性的更多信息，请参阅 [可编辑和可序列化的属性](/guides/create-custom-blocks/fields/customizing-fields/creating.html#可修改且可序列化的属性)。

```javascript
CustomFields.UpgradeField.prototype.SERIALIZABLE = true;
```

下面的警告是可以忽略的，但您可以通过定义 `SERIALIZABLE` 属性来解决它：

```javascript
Detected an editable field that was not serializable. Please define
SERIALIZABLE property as true on all editable custom fields. Proceeding
with serialization.
```

上述警告表示 Blockly 认为您希望序列化字段（因为 `EDITABLE` 属性为 true），但直到定义 `SERIALIZABLE` 属性后才会确定。如果您选择将此项留空，则一切将正常运行，您的字段将被序列化，但您会收到控制台警告。

### size\_.width

```javascript
this.size_.width = 0;
```

变成：

```javascript
this.isDirty_ = true;
```

以下警告可以忽略，但您可以通过设置 `isDirty_` 属性（而不是 `size_.width` 属性）来解决此问题：

```javascript
Deprecated use of setting size_.width to 0 to rerender a field. Set
field.isDirty_ to true instead.
```

上述警告表示 Blockly 检测到您正在使用旧方法重新渲染字段，并且您希望使用新方法。

如需详细了解 `isDirty_` 属性，请参阅 [isDirty\_](/guides/create-custom-blocks/fields/customizing-fields/creating.html#isdirty_)。

### init

该 `init` 函数已被制成 [模板函数](https://en.wikipedia.org/wiki/Template_method_pattern)，以减少子类中的重复代码。

```javascript
CustomFields.UpgradeField.prototype.init = function() {
  if (this.fieldGroup_) {
    // Already initialized once.
    return;
  }
  // Call superclass.
  CustomFields.UpgradeField.superClass_.init.call(this);
  // Create DOM elements.
  this.extraDom_ = Blockly.utils.createSvgElement('image', {
    height: '10px',
    width: '10px'
  });
  this.extraDom_.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'xlink:href',
    'image.svg'
  );
  this.extraDom_.style.cursor = 'pointer';
  this.fieldGroup_.appendChild(this.extraDom_);
  // Bind events.
  this.mouseOverWrapper_ = Blockly.bindEvent_(
    this.getClickTarget_(),
    'mouseover',
    this,
    this.onMouseOver_
  );
  this.mouseOutWrapper_ = Blockly.bindEvent_(
    this.getClickTarget_(),
    'mouseout',
    this,
    this.onMouseOut_
  );
  // Render.
  this.setValue(this.getValue());
};
```

变成：

```javascript
CustomFields.UpgradeField.prototype.initView = function() {
  CustomFields.UpgradeField.superClass_.initView.call(this);
  this.extraDom_ = Blockly.utils.dom.createSvgElement('image', {
    height: '10px',
    width: '10px'
  });
  this.extraDom_.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'xlink:href',
    'image.svg'
  );
  this.extraDom_.style.cursor = 'pointer';
  this.fieldGroup_.appendChild(this.extraDom_);
};
CustomFields.UpgradeField.prototype.bindEvents_ = function() {
  CustomFields.UpgradeField.superClass_.bindEvents_.call(this);
  this.mouseOverWrapper_ = Blockly.bindEvent_(
    this.getClickTarget_(),
    'mouseover',
    this,
    this.onMouseOver_
  );
  this.mouseOutWrapper_ = Blockly.bindEvent_(
    this.getClickTarget_(),
    'mouseout',
    this,
    this.onMouseOut_
  );
};
```

这意味着 blockly 现在会自动处理：

- 检查该字段是否已初始化。
- 创建 `fieldGroup_`.
- 渲染字段。
- 绑定提示和显示编辑器事件。

您将需要处理：

- 添加额外的 [DOM 元素](/guides/create-custom-blocks/fields/customizing-fields/creating.html#块上显示)(`initView`)。
- 添加额外的 [事件绑定](/guides/create-custom-blocks/fields/customizing-fields/creating.html#输入事件)(`bindEvents_`)。
- [处理](/guides/create-custom-blocks/fields/customizing-fields/creating.html#处置) 事件绑定 ( `dispose`)。

::: tip
**重要提示**：所有 DOM 创建操作都应在 `initView` 内完成，因为效率最高。如果您在构造函数、`setText`、`setValue` 或 `render_` 内创建了 DOM，请考虑重构。
:::

### onMouseDown\_

```javascript
CustomFields.UpgradeField.prototype.onMouseDown_ = function(e) {
  // ...
};
```

变成：

```javascript
CustomFields.UpgradeField.prototype.showEditor_ = function() {
  // ...
};
```

我们建议您替换 `showEditor_` 函数来处理鼠标点击，而不是 `onMouseDown_` 函数，因为前者允许输入通过手势系统。

有关编辑器的更多信息，请参阅 [编辑器](/guides/create-custom-blocks/fields/customizing-fields/creating.html#创建编辑器)。

### setValue

`setValue` 函数现在是一个[模板函数](https://en.wikipedia.org/wiki/Template_method_pattern)，可减少子类中的重复代码。如果您的 `setValue` 函数包含逻辑，请考虑对其进行重构，以适合 [值处理](/guides/create-custom-blocks/fields/customizing-fields/creating.html#值处理) 中所述的值处理路径。

### text\_

建议您永远不要直接访问 `text_` 字段或更新其属性。相反，请使用 [getText](/reference/js/Blockly.Field#getText) 函数访问字段的用户可读文本，并使用 [setValue](/reference/js/Blockly.Field#setValue) 函数更新字段的存储值。

有关字段值与其文本的更多信息，请参阅 [字段剖析](/guides/create-custom-blocks/fields/anatomy-of-a-field.html)。

## 获取升级帮助

::: tip 注意
在寻求升级帮助之前，请尽量使用提供的信息独立升级您的字段。
:::

### 提供什么

在寻求帮助时，最好提出具体问题：

不推荐：“这个字段有什么问题？”

也不推荐：“帮我升级这个字段。”

推荐：“字段文本未正确更新。”

也有必要向帮助您的人提供资源。这些文件应该易于其他人使用。

不建议：

- 代码截图。
- 不完整的代码。

推荐的：

- 文本格式的完整字段代码。
- 不良字段行为的 GIF 图像。
- 重现不良字段行为的步骤。
- 您要升级的 blockly 版本。

### 在哪里发帖

在 [blockly 开发者论坛](https://groups.google.com/forum/#!forum/blockly) 上发布升级问题。

如果您确定问题是 blockly 核心的问题，您也可以 在 blockly GitHub 上[发布问题](https://github.com/google/blockly/issues)。如果您决定发布问题，请填写所有要求的信息。
