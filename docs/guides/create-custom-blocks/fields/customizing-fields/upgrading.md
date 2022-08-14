# 升级自定义字段

2019 年 7 月（[版本 2.20190722](https://github.com/google/blockly/releases/tag/2.20190722.0)）添加了一个更加编码的字段 API。它旨在尽可能向后兼容。这意味着，如果您在 2019 年 7 月之前创建了自定义字段，它很可能会继续工作。在决定您的自定义字段是否需要升级之前，您应该通读[危险区域](/guides/create-custom-blocks/fields/customizing-fields/upgrading#danger_areas)部分，并对您的字段进行全面测试。

由于在 2019 年 7 月之前字段之间缺乏标准化，因此很难涵盖开发人员可能需要进行的所有更改。本文档试图涵盖所有可能的更改，但如果本文档未涵盖您感兴趣的内容，请阅读 [获取升级帮助](/guides/create-custom-blocks/fields/customizing-fields/upgrading#getting_upgrade_assistance)部分。

::: tip 注意：
如果您有少量自定义字段，则使用[自定义字段创建说明](/guides/create-custom-blocks/fields/customizing-fields/creating)简单地重写它们可能更容易，而不是尝试逐个升级它们。
:::

## 危险区域

危险区域是 API 已更改的已知位置，您的字段可能会被破坏。

### Blockly.Field.register

字段不再通过 注册`Blockly.Field.register();`。现在有一个 fieldRegistry 命名空间来处理注册。

```javascript
Blockly.Field.register('my_field_name', myFieldClass);
```

变成：

```javascript
Blockly.fieldRegistry.register('my_field_name', myFieldClass);
```

### 设置文本

`setText`Blockly 核心不再调用该函数，因此如果您的`setText` 函数包含逻辑，则需要将其移至函数的 [值处理](/guides/create-custom-blocks/fields/customizing-fields/creating#value_handling) 套件、[getText](/guides/create-custom-blocks/fields/customizing-fields/creating#text) 函数和[渲染函数](/guides/create-custom-blocks/fields/customizing-fields/creating#updating_the_on-block_display) （取决于您的`setText`函数到底在做什么）。

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

- [值验证](/guides/create-custom-blocks/fields/customizing-fields/creating#value_handling)( `doClassValidation_`)。
- [字段文本](/guides/create-custom-blocks/fields/customizing-fields/creating#text)( `getText`)。
- [字段 UI](/guides/create-custom-blocks/fields/customizing-fields/creating#updating_the_on-block_display)

**注意：**我们建议您将任何`setText`调用更改为 `setValue`调用，因为它`setValue`支持验证，`setText`但不支持。

## 推荐升级

推荐的升级是字段 API 已更改的地方，但如果您选择不进行更改，您的字段很可能仍然有效。

### 序列化

有关`EDITABLE`和`SERIALIZABLE`属性的更多信息，请参阅 [可编辑和可序列化的属性](/guides/create-custom-blocks/fields/customizing-fields/creating#editable_and_serializable_properties)。

```javascript
CustomFields.UpgradeField.prototype.SERIALIZABLE = true;
```

下面的警告是可以忽略的，但您可以通过定义 `SERIALIZABLE` 属性来解决它：

```javascript
Detected an editable field that was not serializable. Please defineSERIALIZABLE property as true on all editable custom fields. Proceedingwith serialization.
```

上面的警告意味着 Blockly 认为您希望该字段被序列化（因为该属性为 true），但在您定义该属性`EDITABLE`之前无法确定。`SERIALIZABLE`如果您选择不理会，一切都会正常运行，并且您的字段将被序列化，但您将收到控制台警告。

### size\_.width

```javascript
this.size_.width = 0;
```

变成：

```javascript
this.isDirty_ = true;
```

下面的警告是可以忽略的，但您可以通过设置`isDirty_` 属性而不是属性来解决它`size_.width`：

```javascript
Deprecated use of setting size_.width to 0 to rerender a field. Setfield.isDirty_ to true instead.
```

上面的警告意味着 Blockly 检测到您正在使用旧方法重新渲染字段，并希望您使用新方法。

有关该`isDirty_`属性的更多信息，请参阅 [isDirty\_](/guides/create-custom-blocks/fields/customizing-fields/creating#isdirty_)。

### init

该`init`函数已被制成[模板函数](https://en.wikipedia.org/wiki/Template_method_pattern)，以减少子类中的重复代码。

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
- 创建`fieldGroup_`.
- 渲染字段。
- 绑定工具提示和显示编辑器事件。

您将需要处理：

- 添加额外 的[DOM 元素](/guides/create-custom-blocks/fields/customizing-fields/creating#on-block_display)( `initView`)。
- 添加额外 的[事件绑定](/guides/create-custom-blocks/fields/customizing-fields/creating#input_events)( `bindEvents_`)。
- [处理](/guides/create-custom-blocks/fields/customizing-fields/creating#disposing)事件绑定 ( `dispose`)。

::: tip 重要提示：
所有 DOM 创建都应该在内部完成，`initView`因为这是最有效的。如果您在构造函数、`setText`、`setValue`或`render_`.
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

我们建议您覆盖`showEditor_`处理鼠标点击的`onMouseDown_`函数，而不是允许输入通过手势系统的函数。

有关编辑器的更多信息，请参阅[编辑器](/guides/create-custom-blocks/fields/customizing-fields/creating#creating_an_editor)。

### 设定值

该`setValue`函数现在是一个[模板函数](https://en.wikipedia.org/wiki/Template_method_pattern)，用于减少子类中的重复代码。如果您的`setValue`函数包含逻辑，请考虑重构它以适应值处理中描述的值处理 [路径](/guides/create-custom-blocks/fields/customizing-fields/creating#value_handling)。

### 文字\_

我们建议您永远不要直接访问`text_`字段或更新其属性。相反，请使用 [getText](/reference/js/Blockly.Field#getText)函数访问字段的用户可读文本，并使用 [setValue](/reference/js/Blockly.Field#setValue)函数更新字段的存储值。

有关字段值与其文本的更多信息，请参阅 [字段剖析](/guides/create-custom-blocks/fields/anatomy-of-a-field)。

## 获得升级帮助

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

[在 blockly 开发者论坛](https://groups.google.com/forum/#!forum/blockly)上发布升级问题。

如果您确定问题是 blockly 核心的问题，您也可以 在 blockly GitHub 上[发布问题。](https://github.com/google/blockly/issues)如果您决定发布问题，请填写所有要求的信息。
