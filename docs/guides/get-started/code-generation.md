# 生成代码

代码生成是将工作区中的块转换为可执行代码字符串的过程。

代码生成非常重要，因为它使您的块能够真正地*执行*操作，比如计算算术表达式、在迷宫中移动角色或配置在线商店！

Blockly 不会直接"运行"块。相反，您需要生成代码字符串，然后执行这些代码。

## 代码生成器

要生成代码，您需要使用代码生成器实例。

这段代码片段展示了如何为工作区中的块生成 JavaScript 代码：

```javascript
// javascriptGenerator 是一个生成 JavaScript 字符串的代码生成器。
import { javascriptGenerator } from 'blockly/javascript';

const code = javascriptGenerator.workspaceToCode(myWorkspace);
```

有关 Blockly 提供的不同代码生成器及如何访问它们的更多信息，请参阅 [代码生成器概述](/guides/create-custom-blocks/code-generation/overview#code_generators).

## 块代码生成器

每个块都有一个关联的块代码生成器，用于定义它生成的代码。对于您想要生成的每种编程语言，都需要定义一个块代码生成器。

这段代码片段定义了一个"向前移动"块的 JavaScript 块代码生成器：

```javascript
javascriptGenerator.forBlock['my_custom_block'] = function (block, generator) {
  const steps = block.getFieldValue('FIELD_NAME');
  // moveForward 是一个您需要自己定义并在执行上下文中提供的函数。
  return `moveForward(${steps});\n`;
};
```

有关如何定义块代码生成器的更多信息，请参阅 [块代码生成器](/guides/create-custom-blocks/code-generation/overview#block-code_generators).

## 执行

生成代码后，您需要确定如何执行它。决定如何执行代码是非常特定于应用程序的，这超出了 Blockly 的范围。

有关执行代码的方法的更多信息，请参阅[代码执行](/guides/create-custom-blocks/code-generation/overview#execution).
