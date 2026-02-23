# 代码生成总览

代码生成是把工作区中的块转换为可执行代码字符串的过程。

代码生成之所以关键，是因为它让你的块真正“做事”，例如计算表达式、驱动角色移动，或配置应用行为。  
块本身不能直接运行，你需要先生成代码字符串，再由应用执行这些代码。

## 语言代码生成器

要生成代码，先要确定目标文本语言。  
每种语言都需要自己的语言代码生成器。

**语言代码生成器**（通常简称**代码生成器**）是一个类，负责该语言通用但不针对单个块的生成规则，例如：

- 注释格式
- 语句缩进
- 字符串引用方式

Blockly 内置 5 种语言代码生成器：

- JavaScript ES5
- Python 3
- Lua 5.1
- Dart 2
- PHP 7

如果你需要的语言不在列表里，可以自己实现语言代码生成器。  
可先参考官方 codelab：[Build a custom generator](https://blocklycodelabs.dev/codelabs/custom-generator/index.html?index=..%2F..index#0)。

## 块代码生成器

每个块负责生成自己的代码。  
因此你创建一个块时，需要为每个要支持的目标语言各写一个块代码生成器。

**块代码生成器**本质是函数，返回该块对应的代码字符串。  
例如，比较大小的块可能返回 `'a < b'`，`if` 语句块可能返回 `'if (...) {\n...\n};\n'`。

```javascript
import {javascriptGenerator} from 'blockly/javascript';
import {pythonGenerator} from 'blockly/python';

// 为 JavaScript 和 Python 注册同一个自定义块的块代码生成器。
javascriptGenerator.forBlock['my_custom_block'] = function(block, generator) { /* ... */ };
pythonGenerator.forBlock['my_custom_block'] = function(block, generator) { /* ... */ };
```

块代码生成器由语言代码生成器调用。  
更多可先参考现有页面：[生成代码](/guides/create-custom-blocks/generating-code)。

## 生成并运行代码

应用可以在任意时机触发代码生成，例如：

- 用户点击“运行”按钮时
- 用户每次改动工作区时

生成代码后，如何执行属于应用层设计，超出 Blockly 本身范围。  
可先参考：[生成并运行 JavaScript](/guides/app-integration/running-javascript)。
