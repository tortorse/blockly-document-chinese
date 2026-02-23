# 禁用、隐藏或展开分类

你可以对分类执行禁用、隐藏或展开操作。

## 禁用分类

被禁用的分类无法被用户打开，并且会在键盘导航时被跳过。

```javascript
var category = toolbox.getToolboxItems()[0];
category.setDisabled('true');
```

分类被禁用后，分类对应的 DOM 元素会增加 `disabled` 属性，你可以基于这个属性定制禁用态样式。

```css
.blocklyToolboxCategoryContainer[disabled="true"] {
  opacity: .5;
}
```

## 隐藏分类

隐藏分类不会显示在工具箱中。

::::tabs
::: tab JSON
```javascript
{
  "kind": "category",
  "name": "...",
  "hidden": "true",
}
```
:::
::: tab XML
```xml
<category name="..." hidden="true"></category>
```
:::
::::

隐藏分类后，也可以在后续通过 JavaScript 再次显示。

```javascript
var category = toolbox.getToolboxItems()[0];
category.hide();
// ...
category.show();
```

## 展开分类

该能力只适用于包含[嵌套分类](/guides/configure/toolboxes/nested)的分类。

展开后的分类会直接显示其子分类。默认情况下，嵌套分类是折叠的，需要点击后才展开。

::::tabs
::: tab JSON
```javascript
{
  "kind": "category",
  "name": "...",
  "expanded": "true",
}
```
:::
::: tab XML
```xml
<category name="..." expanded="true"></category>
```
:::
::::
