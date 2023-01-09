# 连接检查器

使用 Blockly 的一个主要好处是，它可以确保生成的代码在语法上是正确的。

连接检查器是一个对象，可强制执行 Blockly 关于哪些连接兼容的规则。默认情况下，该检查工具会应用一个简单的类型系统，如 [类型检查](/guides/create-custom-blocks/type-checks) 页面中所述。

## 检查

Blockly 会采用三种检查级别：安全检查、类型和检查检查。

### 安全检查

安全检查可确保块位于同一个工作区中，连接位于不同的块中，依此类推。这可确保 Blockly 不会进入不良状态。

安全检查还会屏蔽无意义的组合，例如连接两个接下来的连接。

### 类型检查

开发者可以使用类型信息来标记连接。类型检查使用这些信息来强制实施类型系统，例如，通过屏蔽预计会返回数字的字符串的连接。

### 拖动检查

拖动检查仅在通过拖动连接块时应用，而不是通过编程方式。例如，在拖动期间，应仅考虑特定半径范围内的连接。

## 替换连接检查器

希望针对类型检查或拖动检查提供自己的逻辑的开发者可以注册一个实现 `IConnectionChecker` 接口的替代连接检查器对象。

如需实现您自己的安全检查，请替换连接检查工具中的 [`doSafetyChecks`](https://github.com/google/blockly/blob/master/core/interfaces/i_connection_checker.js#L73)。

:::warning 警告
**警告**：通常，开发者不应替换 Blockly 的安全检查。
:::

如需实现您自己的类型检查，请在连接检查工具上替换 [`doTypeChecks`](https://github.com/google/blockly/blob/master/core/interfaces/i_connection_checker.js#L84)。

如需实现您自己的拖动检查，请在连接检查工具上替换 [`doDragChecks`](https://github.com/google/blockly/blob/master/core/interfaces/i_connection_checker.js#L94)。

## 示例代码

[严格的连接检查工具插件](https://github.com/google/blockly-samples/tree/master/plugins/strict-connection-checker) 就是一个自定义检查工具的简单示例。