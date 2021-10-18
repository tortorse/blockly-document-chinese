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

- `name`: JSON 中使用的变形器的字符串名称

- `mixinObj`: 一个包含各种变形方法的对象。

- `opt_helperFn`:  一个可选的辅助函数，将在 mixin 之后在块上运行。

- `opt_blockList`: 一个可选的块列表，用于默认的变形器编辑界面。

## Mixin object

Mutators on web are just a set of methods that are mixed in to the block's object during initialization. At a minimum, a mutator on a block must add `mutationToDom` and `domToMutation` which specify how to serialize and deserialize the mutation state. Mutations that use the default mutator UI must also implement `decompose` and `compose` to tell the UI how to explode a block into sub-blocks and how to update the mutation from a set of sub-blocks.

The methods on the mixin object will be added to each block instance, so `this` may be used to refer to the block.

### mutationToDom and domToMutation

The XML format used to load, save, copy, and paste blocks automatically captures and restores all data stored in editable fields. However, if the block contains additional information, this information would be lost when the block is saved and reloaded. Each block's XML has an optional mutator element where arbitrary data may be stored.

:::tip 提示
The mutationToDom and domToMutation methods are also used by insertion markers. Changing the structure of a block and not implementing these methods can cause errors.
:::

A simple example of this is [math.js](https://github.com/google/blockly/blob/master/blocks/math.js)'s math_number_property block. By default it has one input:

![](./is-even.png)

If the dropdown is changed to "divisible by", a second input appears:

![](./is-divisible-by.png)

This is easily accomplished with the use of a change handler on the dropdown menu. The problem is that when this block is created from XML (as occurs when displayed in the toolbox, cloned from the toolbox, copied and pasted, duplicated, or loaded from a saved file) the init function will build the block in its default one-input shape. This results in an error if the XML specifies that some other block needs to be connected to an input that does not exist.

Solving this problem simply involves writing a note to the mutator element recording that this block has an extra input:

```xml
<block type="math_number_property">
  <mutation divisor_input="true"></mutation>
  <field name="PROPERTY">DIVISIBLE_BY</field>
</block>
```

Saving mutation data is done by adding a `mutationToDom` function to the mixinObj. Here is the example from the `math_number_property` block:

```javascript
mutationToDom: function() {
  var container = document.createElement('mutation');
  var divisorInput = (this.getFieldValue('PROPERTY') == 'DIVISIBLE_BY');
  container.setAttribute('divisor_input', divisorInput);
  return container;
}
```

This function is called whenever a block is being written to XML. If the function does not exist or returns null, then no mutation is recorded. If the function exists and returns a 'mutation' XML element, then this element (and any properties or child elements) will be stored at the beginning of the block's XML representation.

The inverse function is `domToMutation` which is called whenever a block is being restored from XML. Here is the example from the `math_number_property` block:

```javascript
domToMutation: function(xmlElement) {
  var hasDivisorInput = (xmlElement.getAttribute('divisor_input') == 'true');
  this.updateShape_(hasDivisorInput);  // Helper function for adding/removing 2nd input.
}
```

If this function exists, it is passed the block's 'mutation' XML element. The function may parse the element and reconfigure the block based on the element's properties and child elements.

### compose and decompose

Mutation dialogs allow a user to explode a block into smaller sub-blocks and reconfigure them, thereby changing the shape of the original block. The dialog button and the default editing UI is added to a block if both the `compose` and `decompose` methods are defined on the mixinObj. If neither is defined no mutator UI will be created, but events or other code may still cause a mutation. Defining only one of these two functions is an error.

![](./mutator-annot.png)

See [Mutator editing UI](/guides/create-custom-blocks/extensions.html#mutator_editing_ui) for more details on the editing UI.

When a mutator dialog is opened, the block's `decompose` function is called to populate the mutator's workspace.

```javascript
decompose: function(workspace) {
  var topBlock = workspace.newBlock('controls_if_if');
  topBlock.initSvg();
  ...
  return topBlock;
}
```

At a minimum this function must create and initialize a top-level block for the mutator dialog, and return it. This function should also populate this top-level block with any sub-blocks which are appropriate.

When a mutator dialog saves its content, the block's `compose` function is called to modify the original block according to the new settings.

```javascript
compose: function(topBlock) {
  ...
}
```

This function is passed the top-level block from the mutator's workspace (the same block that was created and returned by the compose function). Typically this function would spider the sub-blocks attached to the top-level block, then update the original block accordingly.

![](./mutator2.png)

### saveConnections

Ideally the `compose` function would ensure that any blocks already connected to the original block remain connected to the correct inputs, even if the inputs are reordered. To do this, define a `saveConnections` method on your `mixinObj`:

```javascript
/**
 * Store pointers to any connected child blocks.
 * @param {!Blockly.Block} containerBlock Root block in mutator.
 * @this {Blockly.Block}
 */
saveConnections: function(containerBlock) {
  ...
}
```

If `saveConnections` is defined, the mutator will call it before compose.

## Helper function

Along with the mixin a mutator may register a helper function. This function is run on the block after it is instantiated and the mixinObj is added and can be used to add additional triggers or effects to a mutation.

One example is the `math_is_divisibleby_mutator` in the [math blocks](https://github.com/google/blockly/blob/develop/blocks/math.js) which checks the dropdown and updates the block to have the correct number of inputs.

```javascript
Blockly.Constants.Math.IS_DIVISIBLE_MUTATOR_EXTENSION = function() {
  this.getField('PROPERTY').setValidator(function(option) {
    var divisorInput = (option == 'DIVISIBLE_BY');
    this.sourceBlock_.updateShape_(divisorInput);
  });
};

Blockly.Extensions.registerMutator('math_is_divisibleby_mutator',
  Blockly.Constants.Math.IS_DIVISIBLEBY_MUTATOR_MIXIN,
  Blockly.Constants.Math.IS_DIVISIBLE_MUTATOR_EXTENSION);
```

## Mutator editing UI

The mutator also needs UI if the user should be able to edit the block's shape. The easiest way to add this is to implement [`compose` and `decompose`](/guides/create-custom-blocks/extensions.html#compose_and_decompose) in your mixin and optionally provide a list of blocks to include in the default editor.

```javascript
    Blockly.Extensions.registerMutator('controls_if_mutator',
      Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN, null,
      ['controls_if_elseif', 'controls_if_else']);
```

In this case, Blockly will use the default mutator UI and allow the user to add controls_if_elseif and controls_if_else blocks to the stack returned by [`decompose`](/guides/create-custom-blocks/extensions.html#compose_and_decompose).

![](./mutator1.png)

### Custom editor UIs

If your app uses a custom mutator UI, you can also use the `opt_helperFn` to set the custom editor UI on the block with the `setMutator` method.

```javascript
    // declare the helper function
    var myMutatorFn = function() {
      // this will refer to the block
      this.setMutator(new MyMutator(...));
    };
    //...
    // register the mutator along with the helper function
    Blockly.Extensions.registerMutator('my_mutator', MY_MUTATOR_MIXIN,
      myMutatorFn, null);
```

![](./controls-if.png)

The `setMutator` function takes one argument, a new Mutator. The default mutator used by Blockly is implemented in [mutator.js](https://github.com/google/blockly/blob/master/core/mutator.js).