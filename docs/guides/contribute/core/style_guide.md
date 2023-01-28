# Blockly 风格指南

## 太长不看

遵循 [Google JavaScript 样式指南](https://google.github.io/styleguide/jsguide.html)。新代码应在适用的情况下使用 ES6 语言特性，如`let`, `const`, `class`, 解构赋值等。

## 迁移到 ES6

Blockly 最初是用 ES5.1 编写的，符合[旧的当时版本的 Google JavaScript 样式指南](https://google.github.io/styleguide/javascriptguide.xml)。我们正在将代码库迁移到 ES6 和新样式指南。旧版浏览器，包括 Internet Explorer 11，将继续通过转译为 ES5.1 得到支持。

## 可以

- 用空格缩进，而不是制表符。
- 使用[eslint](http://eslint.org/)。
  - 我们 [`.eslintrc.json`](https://github.com/google/blockly/blob/master/.eslintrc.json) 为我们喜欢的风格设置了规则。
- 使用 [分号](https://google.github.io/styleguide/jsguide.html#formatting-semicolons-are-required)。
- `protectedVariableNames_`在、 `privateVariableNames_`、`protectedFunctionNames_`和 的末尾使用下划线`privateFunctionNames_`。
- 用于`camelCase`变量和函数。
- 用于`TitleCase`上课。
- 用于`ALL_CAPS`常量。
- [对所有控制结构使用大括号](https://google.github.io/styleguide/jsguide.html#formatting-braces-all) 。
- 使用单引号（编写 JSON 时除外）。
- `for`在循环中重新声明变量。也就是说，总是写`for (let i = 0; ...)`而不是`for (i = 0; ...)`.
  - 不这样做会增加在函数中更高层重构后变量将成为孤立变量并成为令人惊讶的全局变量的风险。
- 在 80 个字符处换行，以便于查看。
- 用四个空格缩进换行。
  - 如果一行在多个句法级别中断，则每个级别都应从前一行/句法级别缩进四个空格。
- 注释以大写字母开始，以句点结束。
- 使用 TODO 创建 GitHub issue 并使用`TODO(#issueNumber)`.
- [使用 JSDoc](https://developers.google.com/blockly/guides/contribute#jsdoc)注释所有内容。

## 不可以

- 用制表符缩进。
- `publicVariableNames`在和 的末尾使用下划线`publicFunctionNames`。
- 使用`snake_case`.
- 使用双引号（编写 JSON 时除外）。
- 使用格式错误的 JSDoc。
  - 我们的 JSDoc 会自动作为文档的一部分发布。
- 写`TODO (username)`。
  - 而是使用 TODO 创建 GitHub issue 并使用 `TODO(#issueNumber)`.
- 使用`string.startsWith`. 改为使用`Blockly.utils.string.startsWith`。

## JSDoc

Blockly 团队使用[JSDoc](http://usejsdoc.org/about-getting-started.html)来注释我们的代码并生成文档。我们期望 JSDoc 用于类的所有属性和所有函数。

JSDoc 注释必须以开头`/**`和结尾`*/`才能正确解析。

Blockly 使用四个可见性标签。始终尽可能使用最受限制的范围。

- `public`意味着任何人都可以使用该功能或属性，包括外部开发人员。
- `package`表示该函数或属性可以被 Blockly 内部的任何类使用，但外部开发者可能无法使用。
- `protected`表示该函数或属性可以被所属类或所属类的子类使用。
- `private`表示该函数或属性可以由所属类使用，并且只能由所属类使用。

### 属性

属性注释应包括

- 物业描述
- [类型](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System)\_[](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System)
- 可见性标签：`public`, `package`, `protected`, 或`private`

首选：

```javascript
/**
 * Whether the block may be deleted by the user.
 *  @type {boolean}
 *  @private
 */
this.deletable_ = true;
```

允许，仅当属性的含义很明显时。

```javascript
/** @type {boolean} */
this.isInFlyout = false;
```

### 函数

函数注释应包括

- 功能说明
- 每个参数一个[`@param`](http://usejsdoc.org/tags-param.html)标签，包括
  - [类型](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System)
  - 姓名
  - 描述
- 可见性标签：`public`、`package`或` protected``private `
- 一个[`@return`](http://usejsdoc.org/tags-returns.html)标签，如果函数将返回一个值，包括
  - [类型](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System)
  - 返回值的描述，如果有的话

例如：

```javascript
/**
 * Obtain a newly created block.
 * @param {!Blockly.Workspace} workspace The block's workspace.
 * @param {string} prototypeName Name of the language object containing
 *     type-specific functions for this block.
 * @return {!Blockly.Block} The created block.
 * @public * @deprecated December 2015. Will be removed Decmeber 2016. Use
 *     workspace.newBlock instead.
 */
Blockly.Block.obtain = function(workspace, prototypeName) {
  Blockly.utils.deprecation.warn(
    'Connection.prototype.checkType',
    'December 2015',
    'December 2016',
    'workspace.newBlock'
  );
  return workspace.newBlock(prototypeName);
};
```
