# 缓存内层值块代码

值块对应表达式。  
当值块作为内层块使用时，你可能会在当前块代码里多次使用它生成的表达式。  
例如“取列表最后一个元素”的块，会把“生成列表的表达式”用两次。

```javascript
// 错误示例：块代码生成器。
javascriptGenerator.forBlock['last_element'] = function(block, generator) {
  // 读取生成列表的表达式。
  const listCode = generator.valueToCode(block, 'LIST', Order.MEMBER);

  // listCode 被使用了两次。
  const code = `${listCode}[${listCode}.length - 1]`;
  return [code, Order.MEMBER];
};
```

如果内层块代码每次执行结果都不同，或者这段代码有副作用，就会出问题。  
例如内层代码是函数调用时，下面这段代码可能越界：

```javascript
randomList()[randomList().length - 1]
```

要避免这类问题，应该保证内层块代码只被执行一次。常见有两种做法：

- [临时变量](#临时变量)：先计算一次内层代码结果并存入临时变量，再多次引用该变量。只适用于语句块。
- [工具函数](#工具函数)：把逻辑写入函数，把内层代码求值得到的结果作为参数传入函数。值块和语句块都可使用。

## 临时变量

临时变量用于保存内层块代码的求值结果，让这段代码只执行一次，之后可重复引用。

值块不能使用临时变量，因为值块必须返回单行表达式。  
值块请改用[工具函数](#工具函数)。

```javascript
import {javascriptGenerator, Order} from 'blockly/javascript';

// 正确示例：语句块代码生成器，打印列表最后一个元素。
javascriptGenerator.forBlock['print_last_element'] = function(block, generator) {
  // 读取生成列表的表达式。
  const listCode = generator.valueToCode(block, 'LIST', Order.MEMBER);
  // 申请一个不冲突的临时变量名。
  const listVar = generator.nameDB_.getDistinctName(
      'temp_list', Blockly.names.NameType.VARIABLE);

  // 只求值一次，并保存到临时变量。
  let code = `var ${listVar} = ${listCode};\n`;
  // 使用临时变量输出最后一个元素。
  code += `print(${listVar}[${listVar}.length - 1]);\n`;
  return code;
};
```

例如内层代码是函数调用 `randomList()`，生成结果会是：

```javascript
var temp_list = randomList();
print(temp_list[temp_list.length - 1]);
```

`getDistinctName` 接收你想要的变量名，并返回一个与用户定义变量不冲突的名称。

### 减少冗余代码

临时变量的缺点是：如果内层代码本身只是简单值，不是函数或复杂表达式，会产生冗余代码：

```javascript
// 这里给 temp_list 赋值是多余的。
var temp_list = foo;
print(temp_list[temp_list.length - 1]);
```

可先判断内层代码是否为简单值，仅在必要时引入临时变量，从而生成更简洁代码：

```javascript
if (listCode.match(/^\w+$/)) {
  const code = `print(${listCode}[${listCode}.length - 1]);\n`;
} else {
  const listVar = generator.nameDB_.getDistinctName(
      'temp_list', Blockly.names.NameType.VARIABLE);
  let code = `var ${listVar} = ${listCode};\n`;
  code += `print(${listVar}[${listVar}.length - 1]);\n`;
}
```

## 工具函数

工具函数是开发者定义并拼接到最终代码中的函数。  
它同样能保证内层块代码只求值一次，再重复使用其结果。

工具函数可用于值块和语句块。  
但语句块一般仍优先用[临时变量](#临时变量)，通常更易读。

```javascript
import {javascriptGenerator, Order} from 'blockly/javascript';

// 正确示例：值块代码生成器，获取列表最后一个元素。
javascriptGenerator.forBlock['last_element'] = function(block, generator) {
  // 读取生成列表的表达式。
  const listCode = generator.valueToCode(block, 'LIST', Order.NONE);
  // 定义一个接收列表并返回最后一个元素的函数，语言生成器会把它加入输出代码。
  const functionName = generator.provideFunction_(
      'list_lastElement',
      [
        `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(list) {`,
        `  return list[list.length - 1];`,
        `}`
      ]
  );

  // 构造函数调用表达式，把 listCode 作为参数传入。
  // 这样 listCode 只会求值一次。
  const code = `${functionName}(${listCode})`;
  return [code, Order.FUNCTION_CALL];
};
```

例如内层代码是函数调用 `randomList()` 时，生成结果为：

```javascript
// 这段函数定义会被加入整体生成代码。
function list_lastElement(list) {
  return list[list.length - 1];
}

// 这段是你的块返回的代码。
list_lastElement(randomList());
```

### 提供函数定义

可在块代码生成器里用 `provideFunction_` 定义工具函数。  
它接收函数期望名称和函数定义代码字符串数组，返回最终函数名（必要时会重命名以避免与用户函数冲突）。

`provideFunction_` 还会自动去重：即使同类块出现多次，工具函数定义也只会输出一次。

### 更新优先级

定义工具函数后，也要同步更新代码生成器中的优先级设置（用于决定如何插入括号），详见[运算符优先级](/guides/create-custom-blocks/code-generation/operator-precedence)。

优先级总是基于“块代码生成器返回的代码字符串”来判断，不关心工具函数内部的运算符。  
所以上面示例把 `valueToCode` 改为 `Order.NONE`，并把返回元组改为 `Order.FUNCTION_CALL`。
