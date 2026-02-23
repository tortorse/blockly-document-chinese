# 字段

字段用于定义块上的大部分界面元素，例如字符串标签、图片、字符串和数字等字面量输入，以及日期选择器、角度选择器这类富编辑器。

最简单的字段示例是 `math_number` 块，它使用 `field_number` 让用户输入数字。

![数字字段示例块](/static/blockly/images/math-number.png)

::: tip 说明
如果你要展示的是块的元信息，通常更适合使用图标。  
详见[字段与图标](/guides/create-custom-blocks/fields/fields-vs-icons)。
:::

Blockly 内置了多种字段来处理不同类型的用户输入。  
它们可以通过字段自身配置或校验器进行定制。校验器用于定义字段在标准编辑器中如何处理特定内容。

→ 更多见[内置字段](/guides/create-custom-blocks/fields/built-in-fields/overview)。

→ 更多见[校验器](/guides/create-custom-blocks/fields/validators)。

如果你需要完全自定义字段，工作量会更大，通常需要阅读更多字段文档。  
建议先理解字段组成，再进入自定义字段实现。

→ 更多见[字段解析](/guides/create-custom-blocks/fields/anatomy-of-a-field)。

→ 更多见[自定义字段总览](/guides/create-custom-blocks/fields/customizing-fields/overview)。
