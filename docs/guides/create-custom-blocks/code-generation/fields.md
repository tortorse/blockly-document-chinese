# 转换字段值

大多数字段值都可以直接拼接到代码字符串里。  
但有些字段值在可用前需要先做处理。

## 字符串

字符串在拼接前需要先用 `quote_` 或 `multiline_quote_` 包裹。  
这两个方法会按目标语言进行字符转义，例如在 JavaScript 里把 `'` 转成 `\'`。

```javascript
// 单行文本字段。
const str = generator.quote_(block.getFieldValue('STR'));

// 多行文本字段。
const str = generator.multiline_quote_(block.getFieldValue('STR'));
```

::: tip 注意
`quote_` 和 `multiline_quote_` 虽然带下划线命名，但它们是公开方法。
:::

## 变量

对内置变量字段，`getFieldValue` 返回的是变量 ID，而不是变量名。  
要拿到可用于代码的变量名，需要在代码生成器里调用 `getVariableName`。  
它返回的名称既唯一又合法，主要会做这些处理：

- 把非 ASCII 字符转为 ASCII。  
  例如把 `متغير` 转成 `_D9_85_D8_AA_D8_BA_D9_8A_D8_B1`。
- 让变量名满足编程语言规则。  
  例如把空格改为下划线，给数字开头的名称加上 `my_` 前缀。
- 解决与保留字、变量名、函数名的冲突。  
  例如把 `for` 转成 `for2`。

```javascript
const identifier = generator.getVariableName(block.getFieldValue('VAR'));
```

## 下拉字段

对内置下拉字段，`getFieldValue` 返回的是语言无关标识，通常不能直接作为代码。  
例如比较运算下拉可能返回 `'EQUALS'`、`'LESS'`、`'GREATER'`，你需要把它映射成目标代码字符串。

```javascript
const OPERATORS = {
  EQUALS: '==',
  LESS: '<',
  GREATER: '>',
};
const operator = OPERATORS[block.getFieldValue('OPERATOR')];
```

## 复选框

对内置复选框字段，`getFieldValue` 返回 `'TRUE'` 或 `'FALSE'`。  
具体如何使用取决于这个复选框的语义，例如在生成代码时用于分支判断。
