# 自定义字段

虽然 Blockly 提供许多有用的字段，但您的应用可能具有特殊情况。以下是自定义字段的几个步骤：

1. 请阅读与所需字段类似的任何字段的文档；它们可能会提供有用的自定义界面。例如，[下拉菜单](/guides/create-custom-blocks/fields/built-in-fields/dropdown.html) 有许多隐藏的功能。

2. 考虑使用 [校验器](/guides/create-custom-blocks/fields/validators.html) 来解决您的问题。校验器仅允许您接受某些值、修改输入或在字段的值发生更改时触发功能。

3. 考虑 [扩展字段](/guides/create-custom-blocks/fields/customizing-fields/extending.html)。 如果存在表示所需值类型的字段，但想修改其 [编辑器](/guides/create-custom-blocks/fields/anatomy-of-a-field.html#编辑器显示)、其 [外观](/guides/create-custom-blocks/fields/anatomy-of-a-field.html#块上显示) 或显示的 [文本](/guides/create-custom-blocks/fields/customizing-fields/creating.html#文本)，则可以[创建一个子类](/guides/create-custom-blocks/fields/customizing-fields/extending#subclassing)，该子类会继承大部分功能，同时替换您想要更改的特定部分。

4. [创建新的字段类型](/guides/create-custom-blocks/fields/customizing-fields/creating.html)。 虽然这是最强大的选项，但它最耗时，因此通常只有在需要存储新的值类型时才应使用。
