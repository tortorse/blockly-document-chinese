# 扩展和变形

高级模块可以使用扩展名或变形器，使其更具动态性和可配置性。

扩展允许将块的程序化配置，额外的初始化或自定义行为添加到块中。例如，几个块 [`parent_tooltip_when_inline`](https://github.com/google/blockly/blob/develop/core/extensions.js) 在连接到另一个块时使用扩展显示其父级的工具提示。

变形器非常类似于扩展。除了更改块之外，它还定义了如何将那些更改保存到 XML 以及如何从 XML 加载。变形器还可以具有其他 UI，供用户配置其状态。在 Blockly 中，最容易识别的变形器是 if 块。

![](./mutator1.png)

## 扩展

扩展是块的自定义配置或行为，可以通过块的 [JSON定义](/guides/create-custom-blocks/define-blocks.html) 将其应用于块 。使用 `extensions` 键添加块的扩展名。多个扩展可以应用于单个块。

```JSON
{
  //...,
  "extensions": ["break_warning_extension", "parent_tooltip_extension"],
}
```

由于扩展执行的工作超出 Blockly 的默认行为，因此必须为所使用的每个平台编写一次扩展。每个平台都包括一个用于向 Blockly 注册扩展的 API。每个扩展都定义了一个在块创建时运行的功能。将扩展名添加到块的“extensions”键后，表示在创建该类型的每个新块时，关联函数应运行一次。

每个扩展必须通过调用 Blockly 库进行注册。

```js
Blockly.Extensions.register('parent_tooltip_extension',
  function() {
    // this refers to the block that the extension is being run on
    var thisBlock = this;
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
        Blockly.Msg.MATH_NUMBER_TOOLTIP;
    });
  });
```

## 变形器

变形器是在块上提供自定义可序列化状态的唯一方法。使用 “mutator” 键在块的 JSON 定义中声明它们。块上只能声明一个变形器。

变形器是通过在实例化时 [混合](https://en.wikipedia.org/wiki/Mixin) 块中的方法集合以及用于用户配置“变形器”的可选 UI 来实现的。 一个块只能有一组 “变形器” 方法。

```JSON
{
  //...,
  "mutator": "controls_if_mutator",
}
```

变形器最明显的例子是弹出对话框，该对话框允许 `if` 语句获取更多的 `else if` 和 `else` 子句。 但是，并非所有的“变形器”都那么复杂。

::: tip 注意
[blocks-plus-minus 插件](https://github.com/google/blockly-samples/blob/master/plugins/block-plus-minus/README.md) 为核心块实现了备用的 变形器 UI。 如果要实现自己的变形器 UI，则该代码是一个不错的起点。
:::

## 注册变形器

就像 [扩展](/guides/create-custom-blocks/extensions.html) 一样，必须在 Blockly.Extensions 中注册变形器。 Blockly 库提供了一种方便的方法，可以对变形器进行基本验证并处理标准配置。

```js
Blockly.Extensions.registerMutator(
    name, mixinObj, opt_helperFn, opt_blockList);
```