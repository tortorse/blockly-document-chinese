# 自定义块

本文档面向希望在 Blockly 中创建新块的开发人员。假定有人拥有一个可以编辑的 Blockly 本地副本，一个人通常熟悉 Blockly 的用法，并且一个人对 JavaScript 有基本的了解。

![logo](./logo.png)

Blockly 附带了大量预定义的块。从数学函数到循环结构的一切。但是，为了与外部应用程序连接，必须创建自定义块以形成 API。例如，在创建绘图程序时，可能需要创建“ *绘制半径为R的圆* ”块。

在大多数情况下，最简单的方法是找到一个已经存在的非常相似的块，复制它，并根据需要进行修改。以下文档适用于需要更多帮助的人员。

## 定义一个块

第一步是创建一个块; 指定其形状，字段和连接点。使用 Blockly 开发者工具是编写此代码的最简单方法。

→ 更多信息可参阅 [Blockly 开发者工具](/guides/create-custom-blocks/blockly-developer-tools.html)...

或者，可以在研究 API 之后手动编写此代码。

→ 更多信息可参阅 [定义块](/guides/create-custom-blocks/define-blocks.html)...

高级块可以响应于用户或其他因素动态地改变它们的形状。

→ 更多信息可参阅 [变形器](/guides/create-custom-blocks/extensions.html)...

## 代码生成

第二步是创建生成器代码以将新块导出为编程语言（例如 JavaScript，Python，PHP，Lua 或 Dart）。

→ 更多信息可参阅 [生成代码](/guides/create-custom-blocks/generating-code.html)...

要生成既干净又正确的代码，必须注意给定语言的操作列表顺序。

→ 更多信息可参阅 [操作符优先级](/guides/create-custom-blocks/operator-precedence.html)...

创建更复杂的块需要使用临时变量和/或实用程序功能。当输入使用两次并且需要缓存时尤其如此。

→ 更多信息可参阅 [缓存参数](/guides/create-custom-blocks/caching-arguments.html)...

## 使用新块
创建块后，不要忘记将其添加到工具箱中或在工作区中使用它。

→ 更多信息可参阅 [工具箱](/guides/configure/toolbox.html)...


