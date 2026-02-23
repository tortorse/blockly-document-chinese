# 动态分类

动态分类是在每次打开时，都根据函数重新生成内容的分类。

Blockly 支持通过“已注册字符串键”把分类与函数关联。函数需要返回分类内容定义，内容可包含块、按钮、标签等。内容可以用 `JSON` 或 `XML` 描述，推荐使用 `JSON`。

另外，这个函数会收到目标工作区参数，因此你可以根据工作区状态动态决定分类里的块。

::::tabs
::: tab JSON
```javascript
// 返回对象数组。
var coloursFlyoutCallback = function(workspace) {
  // 返回十六进制颜色数组，例如 ['#4286f4', '#ef0447']
  var colourList = getPalette();
  var blockList = [];
  for (var i = 0; i < colourList.length; i++) {
    blockList.push({
      'kind': 'block',
      'type': 'colour_picker',
      'fields': {
        'COLOUR': colourList[i]
      }
    });
  }
  return blockList;
};

// 将函数与字符串键 'COLOUR_PALETTE' 绑定
myWorkspace.registerToolboxCategoryCallback(
    'COLOUR_PALETTE', coloursFlyoutCallback);
```
:::
::: tab XML
```javascript
// 返回 XML 节点数组。
var coloursFlyoutCallback = function(workspace) {
  // 返回十六进制颜色数组，例如 ['#4286f4', '#ef0447']
  var colourList = getPalette();
  var blockList = [];
  for (var i = 0; i < colourList.length; i++) {
    var block = document.createElement('block');
    block.setAttribute('type', 'colour_picker');
    var field = document.createElement('field');
    field.setAttribute('name', 'COLOUR');
    field.innerText = colourList[i];
    block.appendChild(field);
    blockList.push(block);
  }
  return blockList;
};

// 将函数与字符串键 'COLOUR_PALETTE' 绑定
myWorkspace.registerToolboxCategoryCallback(
    'COLOUR_PALETTE', coloursFlyoutCallback);
```
:::
::::

当你把动态分类函数和字符串键完成绑定后，就可以在分类定义中把这个字符串键赋给 `custom` 属性，使该分类成为动态分类。

::::tabs
::: tab JSON
```javascript
{
  "kind": "category",
  "name": "Colours",
  "custom": "COLOUR_PALETTE"
}
```
:::
::: tab XML
```xml
<category name="Colours" custom="COLOUR_PALETTE"></category>
```
:::
::::

## 内置动态分类

Blockly 提供了三个内置动态分类：

- `'VARIABLE'`：创建“无类型变量”分类，详见[变量文档](/guides/create-custom-blocks/variables)。
- `'VARIABLE_DYNAMIC'`：创建“有类型变量”分类，并带有创建字符串、数字、颜色变量的按钮。
- `'PROCEDURE'`：创建函数块分类。

::::tabs
::: tab JSON
```javascript
{
  "kind": "category",
  "name": "Variables",
  "custom": "VARIABLE"
},
{
  "kind": "category",
  "name": "Variables",
  "custom": "VARIABLE_DYNAMIC"
},
{
  "kind": "category",
  "name": "Functions",
  "custom": "PROCEDURE"
}
```
:::
::: tab XML
```xml
<category name="Variables" custom="VARIABLE"></category>
<category name="Variables" custom="VARIABLE_DYNAMIC"></category>
<category name="Functions" custom="PROCEDURE"></category>
```
:::
::::

*说明：Blockly 代码中长期使用 `procedure` 一词，但对学生更易理解的词通常是 `function`。两者在这里指代同一类概念。*
