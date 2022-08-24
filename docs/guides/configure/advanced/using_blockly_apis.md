# 使用 Blockly API

## 介绍

本页介绍了调用 Blockly 核心函数和访问属性的最佳实践。本页重点介绍插件，但类似的原则适用于任何应用程序集成。

## 子类化和扩展

Blockly 有多种添加功能的范例，包括：

- 子类（例如创建一个新的渲染器）
- 混合（例如添加块扩展或修改器）
- 块定义（例如程序块定义）

就本文档而言，所有三种情况都等同于子类化。

### 注入子类

我们支持通过注入方法替换某些类。这些子类必须要么扩展基类，要么实现它们对应的接口。

您可以将您的子类传递给注入方法。

```javascript
Blockly.inject('blocklyDiv', {
  plugins: {
    'metricsManager': CustomMetricsManagerClass
  }
}
```

或者您可以使用注册您的类 `Blockly.registry` 并使用注册名称来注入该类。

```javascript
Blockly.registry.register(Blockly.registry.Type.METRICS_MANAGER, 'YOUR_NAME', SubClass);

Blockly.inject('blocklyDiv', {
  plugins: {
    'metricsManager': 'YOUR_NAME'
  }
}
```

可以替换以下类：

| 注册名称                   | 接口/基类                                                                                                             |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `blockDragger`             | [Blockly.IBlockDragger](https://developers.google.com/blockly/reference/js/Blockly.IBlockDragger)                     |
| `connectionChecker`        | [Blockly.IConnectionChecker](https://developers.google.com/blockly/reference/js/Blockly.IConnectionChecker)           |
| `flyoutsVerticalToolbox`   | [Blockly.IFlyout](https://developers.google.com/blockly/reference/js/Blockly.IFlyout)                                 |
| `flyoutsHorizontalToolbox` | [Blockly.IFlyout](https://developers.google.com/blockly/reference/js/Blockly.IFlyout)                                 |
| `metricsManager`           | [Blockly.IMetricsManager](https://developers.google.com/blockly/reference/js/Blockly.IMetricsManager)                 |
| `renderer`                 | [Blockly.blockRendering.Renderer](https://developers.google.com/blockly/reference/js/Blockly.blockRendering.Renderer) |
| `toolbox`                  | [Blockly.IToolbox](https://developers.google.com/blockly/reference/js/Blockly.IToolbox)                               |

有关接口的更多信息，请查看文档的[接口部分](https://developers.google.com/blockly/guides/plugins/interfaces/overview) 。

::: tip 注意
注册类上的所有受保护和公共方法都可以被覆盖。但是，不应覆盖未注册类上的受保护方法。
:::

## 可见性

我们使用 Closure 编译器[注解](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#visibility-checks) 将核心库中的可见性标记为`public`、`package`、`protected`、`private`或 `deprecated`。

所有`public`、`package`和`protected`成员都记录在 Blockly 网站的 [参考](https://developers.google.com/blockly/reference/js)部分。您还可以通过阅读代码中的注释来检查可见性。

::: danger 注意：
虽然 JavaScript 不强制执行这些可见性注释，但您应该避免访问任何不是`public`. Blockly 团队不保证版本之间非公共属性和功能的稳定性。
:::

## 注解

### public

任何标记`public`的内容都是我们公共 API 的一部分。

我们尽量不要频繁更改我们的公共 API，也不要在没有充分理由和警告的情况下更改。例外情况：我们可能会在 Q1 版本中公开一个新的 API，并在 Q2 版本中修改它以响应早期反馈。之后，您可以考虑公共功能或财产稳定。

可以从任何地方调用公共函数，并在子类中重写，只要签名不变。

### package

包函数和属性旨在在核心库中使用，而不是在外部使用。我们不保证任何标记的稳定性 `@package`。这意味着任何标记的类型、含义、名称或功能签名`@package`可能会在没有警告的情况下更改。

包函数可以从任何地方调用，并在子类中被覆盖，只要签名没有改变。

### protected

受保护的函数和属性只能由定义类或子类访问。

允许子类覆盖受保护的函数和属性，而无需更改类型签名。

例如，扩展基本渲染器类的自定义渲染器可以访问其受保护的属性。

在每种情况下，您都应该确保您了解函数或属性在其余代码中的使用方式。

### private

这些只能通过与定义相同的文件中的代码访问。直接访问这些属性可能会导致未定义的行为。

不允许子类覆盖私有函数和属性。

Blockly 使用 `underscore_` 来标识私有属性和函数。

::: tip 注意
在极少数情况下，私有函数被广泛使用，以至于它们变成了公共的，但没有更改名称。例如，[`Blockly.bindEventWithChecks_`](https://github.com/google/blockly/blob/096d1c46c5066cfa7e59db3b41405b7e854b95d0/core/blockly.js#L455) 是公开的。
:::

### deprecated

`@deprecated`不应使用任何标记的东西。大多数弃用都包括有关首选代码的说明，无论是在控制台警告中还是在 JSDoc 中。

在可能的情况下，不推荐使用的函数将记录一个警告，其中包括预期的删除日期和调用替换函数的建议。

## 常见问题

### 如果我想使用的功能不是公开的怎么办？

在核心 Blockly 上提交功能[请求。](https://github.com/google/blockly/issues/new?assignees=&labels=type%3A+feature+request%2C+triage&template=feature_request.md)包括对您的用例的描述以及您希望我们公开的内容的说明。

我们将使用该功能请求讨论是否将其公开，或者是否有其他方式让您获得相同的信息。

如果我们决定将其公开，您或 Blockly 团队将进行适当的更改，并将在下一个季度发布的 Blockly 中上线。

如果您选择在插件中使用非公开成员，请考虑将您的插件标记为 beta 并将信息包含在您的`README`.

### 猴子补丁呢？

阅读[猴子补丁](https://en.wikipedia.org/wiki/Monkey_patch#Applications)。

在已发布的插件中进行 Monkeypatching 是不安全的，因为您的代码可能与任何其他对相同代码进行猴子补丁的插件交互不佳。出于这个原因，我们**强烈**建议不要在第三方插件中进行猴子补丁，并且不会在第一方插件中接受它。

### 我可以覆盖公共函数吗？

子类化时：是的。否则：不，那是猴子补丁。

### 我可以覆盖包函数吗？

子类化时：是的。否则：不，那是猴子补丁。

### 我可以覆盖受保护的功能吗？

子类化时：是的。否则：不，那是猴子补丁。

### 我什么时候可以直接访问属性？什么时候应该使用 getter 或 setter？

如果我们发布 getter 或 setter，请使用它而不是直接访问属性。如果该属性不是公开的，请务必使用 getter 和 setter。

::: tip 注意
在插件中一致地使用 getter 和 setter 使我们能够灵活地在核心 Blockly 中进行更改，而不会破坏已发布的代码。
:::

### 如果这个属性没有注解怎么办？

默认情况下它是公开的，请给我们留言，以备我们为你安排放置一个 getter/setter

### 如果这个函数没有注解怎么办？

默认是公开的。

### 如果我仍然不确定怎么办？

[在论坛](https://groups.google.com/forum/#!forum/blockly)上提问 ，我们通常会在一个工作日内回复您。
