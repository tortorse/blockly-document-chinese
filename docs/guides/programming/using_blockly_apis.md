# 使用 Blockly API

本页介绍调用 Blockly 核心（core）函数和访问属性的最佳实践。这些原则适用于为 Blockly 开发[插件（plugin）](https://developers.google.com/blockly/guides/programming/plugin_overview)，也适用于将 Blockly 集成到独立应用中。

## 可见性

在 Blockly 核心库中，我们使用 [TypeScript 访问修饰符](https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility)标记成员可见性，包括 `public`、`private` 和 `protected`。有些属性还会在 [TsDoc](https://api-extractor.com/pages/tsdoc/tag_internal/) 注释中标记 `@internal`。

所有 `public` 和 `protected` 属性都记录在 Blockly 网站的[参考（Reference）](https://developers.google.com/blockly/reference/js/blockly)部分。你也可以直接阅读源码来确认可见性。

::: warning 注意
虽然 JavaScript 不会强制执行这些可见性标记，但你应避免访问任何非 `public` 成员。Blockly 团队不保证非公开属性和函数在版本间的稳定性。
:::

### public

任何标记为 `public` 的成员，都是公共 API 的一部分。模块中未显式声明可见性的属性，也默认视为 `public`。

我们通常不会频繁修改公共 API，也不会在没有充分理由和预警的情况下修改。一个例外是：某个 API 可能在一个版本公开后，在下一个版本基于早期反馈进行调整。之后，可将该 `public` 函数或属性视为稳定。

`public` 函数可以在任何位置调用，也可以在子类中重写（前提是签名不变）。

### protected

`protected` 函数和属性只能由定义它的类或其子类访问。

子类可以重写 `protected` 函数和属性，但不能改变类型签名。

例如，一个继承基础渲染器类的自定义渲染器，可以访问其 `protected` 属性。

无论哪种情况，都应先确认该函数或属性在其余代码中的使用方式。

### private

`private` 成员只能在定义所在的同一文件中访问。直接访问这类属性可能导致未定义行为。

子类不能重写 `private` 函数和属性。

`private` 属性不属于 Blockly 公共 API，因此可能在无预告情况下变更。

Blockly 中部分函数没有可见性标记，是因为它们没有从模块导出。这些函数本质上是模块内局部变量，不能在模块外使用，应视作等价于 `private` 属性。

::: tip 注意
Blockly 过去使用后缀下划线表示私有成员（例如 `example_`）。按照当前 Google 风格指南，新代码已不再沿用该规则，旧代码也可能调整。调用 Blockly 方法前，请确认它在参考文档中可见，或在代码中未标记为 `private`。在极少数情况下，某些原本私有且被广泛使用的函数后来转为公开，所以你会看到少量以 `_` 结尾的公开函数。
:::

### internal

`internal` 函数和属性用于核心库内部，不用于外部。它们通过 TsDoc 的 `@internal` 标记。

`internal` 成员不属于 Blockly 公共 API，因此可在无预告情况下变更。

`internal` 成员可以在核心库内部任意位置访问，也可在核心库内部子类中重写（前提是签名不变），但不能从核心库外部访问。

### deprecated

凡标记 `@deprecated` 的内容都不应继续使用。多数弃用项会在控制台警告或 TsDoc 中给出推荐替代方案。

在条件允许时，被弃用函数会输出警告，包含预计删除时间和推荐替代函数。

## 常见问题（FAQs）

以下是 Blockly 团队常见到的问题。

### 如果我想用的函数不是 `public`，怎么办？

请在 core Blockly 提交 [feature request](https://github.com/RaspberryPiFoundation/blockly/issues/new?assignees=&labels=issue%3A+feature+request%2C+issue%3A+triage&template=feature_request.yaml)，并描述你的使用场景，以及希望公开的具体内容。

团队会基于该 feature request 讨论是否公开该能力，或是否有其他方式满足同样需求。

若决定公开，你或 Blockly 团队会提交相应改动，并在下一次 Blockly 发布中上线。

如果你仍选择在插件中使用非公开成员，建议将插件标记为 beta，并在 `README` 中明确说明。

### 猴子补丁（monkeypatching）怎么办？

可先阅读 [monkeypatching](https://en.wikipedia.org/wiki/Monkey_patch#Applications)。

monkeypatching 不安全，因为它依赖非公开 API，补丁可能在没有通知的情况下失效。尤其在插件中，若多个插件 monkeypatch 同一段代码，兼容性风险更高。因此我们**强烈**不建议在应用和第三方插件中使用 monkeypatching，也不会在第一方插件中接受这类方案。

### 我可以重写 `public` 函数吗？

在子类化场景：可以。否则：不可以，那属于 monkeypatching。

### 我可以重写 `protected` 函数吗？

在子类化场景：可以。否则：不可以，那属于 monkeypatching。

### 我可以重写 `internal` 或 `private` 函数吗？

不可以，那属于 monkeypatching。

### 我何时可以直接访问属性？何时应使用 getter/setter？

如果官方提供了 getter 或 setter，请优先使用，而不要直接访问属性。若属性不是 `public`，则更应使用 getter/setter。

::: tip 注意
在插件中一致使用 getter/setter，可以让 Blockly 核心在演进时有更大灵活性，同时降低已发布代码被破坏的风险。
:::

### 如果属性没有标注可见性怎么办？

默认按 `public` 处理。但建议你告诉我们你的用法，我们可能会为该属性补充 getter/setter 配对接口。

### 如果函数没有标注可见性怎么办？

默认是 `public`。

### 如果我还是不确定怎么办？

可在[论坛](https://groups.google.com/g/blockly)提问，团队通常会在几天内回复。
