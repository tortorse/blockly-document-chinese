# 编程式访问

你可以通过两种方式在代码中访问分类：

- 按索引访问（`0` 表示最上面的分类）
- 按分类 `ID` 访问

```javascript
var category = toolbox.getToolboxItems()[0];
```

```javascript
var category = toolbox.getToolboxItemById('categoryId');
```

其中 `ID` 需要先在工具箱定义中声明：

::::tabs
::: tab JSON
```javascript
{
  "kind": "category",
  "name": "...",
  "toolboxitemid": "categoryId"
}
```
:::
::: tab XML
```xml
<category name="..." toolboxitemid="categoryId"></category>
```
:::
::::
