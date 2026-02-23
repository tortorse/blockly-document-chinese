# 块代码生成器

块代码生成器是一个函数，用来为某个块生成代码字符串并返回。  
一个块生成什么代码，取决于它的块类型：

- 值块有输出连接。它在文本语言里更像表达式，生成的是表达式代码字符串。
- 语句块没有输出连接。它在文本语言里更像语句，生成的是语句代码字符串。

## 如何编写块代码生成器

你创建的每个自定义块，都需要为每个目标语言各写一个块代码生成器。  
即使最终生成的是其他语言代码，这些块代码生成器本身也都用 JavaScript 编写。

所有块代码生成器都遵循同一流程：

1. 导入语言代码生成器。
2. 读取每个字段值，并转换为代码字符串。
3. 读取内部块生成的代码字符串（值输入和语句输入上连接的块）。
4. 拼接并返回当前块的代码字符串。

## 示例块

下面用两个示例块演示 JavaScript 代码生成器的写法。

- `custom_compare` 是一个值块，包含：
  - 名为 `LEFT` 的值输入
  - 名为 `OPERATOR` 的下拉字段
  - 名为 `RIGHT` 的数字字段  
    它生成形如 `'0 = 0'` 的表达式字符串。

![`custom_compare` 示例块](/static/blockly/images/code-generation/custom-compare.png)

- `custom_if` 是一个语句块，包含：
  - 名为 `NOT` 的复选框字段
  - 名为 `CONDITION` 的值输入
  - 名为 `THEN` 的语句输入  
    它生成形如 `'if (...) {\n...\n};\n'` 的语句字符串。

![`custom_if` 示例块](/static/blockly/images/code-generation/custom-if.png)

本文按步骤搭建这两个生成器，完整版本见文末“[完整代码生成器](#完整代码生成器)”。

这两个块仅用于演示代码生成思路。实际项目中可优先使用内置的 `logic_compare` 和 `controls_if`。

## 导入语言代码生成器

你可以用以下任一种方式导入语言代码生成器。  
导入后，把自定义块的块代码生成器挂到对应生成器的 `forBlock` 对象上。

### Modules

```javascript
import {javascriptGenerator} from 'blockly/javascript';
import {pythonGenerator} from 'blockly/python';
import {phpGenerator} from 'blockly/php';
import {luaGenerator} from 'blockly/lua';
import {dartGenerator} from 'blockly/dart';

// 为 custom_if 块添加块代码生成器。
javascriptGenerator.forBlock['custom_if'] = function (block, generator) { /* ... */ };
pythonGenerator.forBlock['custom_if'] = function (block, generator) { /* ... */ };
phpGenerator.forBlock['custom_if'] = function (block, generator) { /* ... */ };
luaGenerator.forBlock['custom_if'] = function (block, generator) { /* ... */ };
dartGenerator.forBlock['custom_if'] = function (block, generator) { /* ... */ };
```

### Unpkg

需要先引入 Blockly，再引入对应语言生成器。

```html
<script src="https://unpkg.com/blockly"></script>
<script src="https://unpkg.com/blockly/javascript_compressed"></script>
<script src="https://unpkg.com/blockly/python_compressed"></script>
<script src="https://unpkg.com/blockly/php_compressed"></script>
<script src="https://unpkg.com/blockly/lua_compressed"></script>
<script src="https://unpkg.com/blockly/dart_compressed"></script>
```

```javascript
// 为 custom_if 块添加块代码生成器。
javascript.javascriptGenerator.forBlock['custom_if'] = function (block, generator) { /* ... */ };
python.pythonGenerator.forBlock['custom_if'] = function (block, generator) { /* ... */ };
php.phpGenerator.forBlock['custom_if'] = function (block, generator) { /* ... */ };
lua.luaGenerator.forBlock['custom_if'] = function (block, generator) { /* ... */ };
dart.dartGenerator.forBlock['custom_if'] = function (block, generator) { /* ... */ };
```

### 本地脚本

需要先引入 Blockly，再引入对应语言生成器。

```html
<script src="blockly_compressed.js"></script>
<script src="javascript_compressed.js"></script>
<script src="python_compressed.js"></script>
<script src="php_compressed.js"></script>
<script src="lua_compressed.js"></script>
<script src="dart_compressed.js"></script>
```

```javascript
// 为 custom_if 块添加块代码生成器。
javascript.javascriptGenerator.forBlock['custom_if'] = function (block, generator) { /* ... */ };
python.pythonGenerator.forBlock['custom_if'] = function (block, generator) { /* ... */ };
php.phpGenerator.forBlock['custom_if'] = function (block, generator) { /* ... */ };
lua.luaGenerator.forBlock['custom_if'] = function (block, generator) { /* ... */ };
dart.dartGenerator.forBlock['custom_if'] = function (block, generator) { /* ... */ };
```

## 获取字段值

字段让用户输入字符串、数字、颜色等值。  
读取字段值使用 `getFieldValue`。不同字段返回值不同：  
例如文本字段会返回用户输入文本，下拉字段返回与选中项对应的语言无关标识。  
详见[内置字段总览](/guides/create-custom-blocks/fields/built-in-fields/overview)。

根据字段类型，你可能需要先把返回值转换成可拼接的代码片段。

### `custom_compare`

```javascript
javascriptGenerator.forBlock['custom_compare'] = function (block, generator) {
  // 用 OPERATOR 字段值查表得到真正运算符。
  const OPERATORS = {
    EQUALS: '==',
    LESS: '<',
    GREATER: '>',
  };
  const operator = OPERATORS[block.getFieldValue('OPERATOR')];
  // RIGHT 是数字字段，可直接用于拼接代码。
  const right = block.getFieldValue('RIGHT');
  // ...
};
```

### `custom_if`

```javascript
javascriptGenerator.forBlock['custom_if'] = function (block, generator) {
  // 用 NOT 字段值决定是否拼接取反运算符。
  const checkbox = block.getFieldValue('NOT');
  const negate = checkbox === 'TRUE' ? '!' : '';
  // ...
};
```

更多见[转换字段值](/guides/create-custom-blocks/code-generation/fields)。

## 获取内部块代码

内部块是连接在当前块值输入和语句输入上的块。  
例如 `custom_if` 里，条件是一个值内部块，执行体是语句内部块。

与字段值不同，内部块返回的是可直接拼接的代码字符串，通常不需要再转换。

::: tip 注意
连接在“下一个连接”上的块不属于内部块，当前块代码生成器应忽略它。  
下一个连接上的代码由语言代码生成器统一串联。
:::

### 内部值块

从值输入连接的内部块读取代码，使用 `valueToCode`。它会调用该内部块的块代码生成器。

#### `custom_compare`

```javascript
import {javascriptGenerator, Order} from 'blockly/javascript';

javascriptGenerator.forBlock['custom_compare'] = function (block, generator) {
  // ...
  const order = operator === '==' ? Order.EQUALITY : Order.RELATIONAL;
  const left = generator.valueToCode(block, 'LEFT', order);
  // ...
};
```

#### `custom_if`

```javascript
import {javascriptGenerator, Order} from 'blockly/javascript';

javascriptGenerator.forBlock['custom_if'] = function (block, generator) {
  // ...
  const order = checkbox === 'TRUE' ? Order.LOGICAL_NOT : Order.NONE;
  const condition = generator.valueToCode(block, 'CONDITION', order) || 'false';
  // ...
};
```

调用 `valueToCode` 时，需要传入“当前代码中将作用在该内部值上的最强运算符优先级”。  
`valueToCode` 会用它判断是否要给内部块代码补括号。

例如 `custom_if` 勾选 `NOT` 后，会对条件应用逻辑非 `!`。  
这时传入 `Order.LOGICAL_NOT`，`valueToCode` 会和内部块的最低优先级比较，并按需加括号：

- 如果 `CONDITION` 是变量块，会得到 `!myBoolean`，不需要额外括号。
- 如果 `CONDITION` 是比较块，会得到 `!(a < b)`，避免错误的 `!a < b`。

你不需要手工判断是否加括号，只需正确传入优先级并拼接返回值。  
更多见[运算符优先级](/guides/create-custom-blocks/code-generation/operator-precedence)。

### 内部语句块

从语句输入连接的内部块读取代码，使用 `statementToCode`。  
它会调用内部块生成器，并自动处理缩进。

#### `custom_compare`

`custom_compare` 没有语句输入。

#### `custom_if`

```javascript
javascriptGenerator.forBlock['custom_if'] = function (block, generator) {
  // ...
  const statements = generator.statementToCode(block, 'THEN');
  // ...
};
```

你只需要对语句输入直接连接的第一个块调用 `statementToCode`，后续连接的语句块会由它一并处理。

## 构建并返回代码字符串

拿到字段值和内部块代码后，就可以拼接并返回当前块代码。返回值取决于块类型：

- **值块**：返回 `[code, order]`，其中 `order` 是当前代码最低优先级，供外层 `valueToCode` 判断是否加括号。
- **语句块**：直接返回代码字符串。

### `custom_compare`

```javascript
import {javascriptGenerator, Order} from 'blockly/javascript';

javascriptGenerator.forBlock['custom_compare'] = function (block, generator) {
  // ...
  const order = operator === '==' ? Order.EQUALITY : Order.RELATIONAL;
  // ...
  const code = left + ' ' + operator + ' ' + right;
  return [code, order];
};
```

### `custom_if`

```javascript
javascriptGenerator.forBlock['custom_if'] = function (block, generator) {
  // ...
  const code = 'if (' + negate + condition + ') {\n' + statements + '}\n';
  return code;
};
```

如果一个内部值块的代码会被重复使用，建议先做[缓存内层值块代码](/guides/create-custom-blocks/code-generation/caching-arguments)，以避免隐藏 bug 和副作用。

## 完整代码生成器

下面给出两个示例块的完整实现。

### `custom_compare`

```javascript
import {javascriptGenerator, Order} from 'blockly/javascript';

javascriptGenerator.forBlock['custom_compare'] = function (block, generator) {
  const OPERATORS = {
    EQUALS: '==',
    LESS: '<',
    GREATER: '>',
  };
  const operator = OPERATORS[block.getFieldValue('OPERATOR')];
  const order = operator === '==' ? Order.EQUALITY : Order.RELATIONAL;
  const left = generator.valueToCode(block, 'LEFT', order);
  const right = block.getFieldValue('RIGHT');
  const code = left + ' ' + operator + ' ' + right;
  return [code, order];
};
```

### `custom_if`

```javascript
import {javascriptGenerator, Order} from 'blockly/javascript';

javascriptGenerator.forBlock['custom_if'] = function (block, generator) {
  const checkbox = block.getFieldValue('NOT');
  const negate = checkbox === 'TRUE' ? '!' : '';
  const order = checkbox === 'TRUE' ? Order.LOGICAL_NOT : Order.NONE;
  const condition = generator.valueToCode(block, 'CONDITION', order) || 'false';
  const statements = generator.statementToCode(block, 'THEN');
  const code = 'if (' + negate + condition + ') {\n' + statements + '}\n';
  return code;
};
```
