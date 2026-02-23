# 自定义连接检查器

使用 Blockly 的一个核心收益，是它能保证生成代码在语法层面正确。

连接检查器（Connection Checker）负责执行 Blockly 关于“哪些连接可兼容”的规则。  
默认检查器使用的是一个简单类型系统，见[连接检查](/guides/create-custom-blocks/inputs/connection-checks)。

## 检查层级

Blockly 会应用三层检查：安全检查、类型检查、拖拽检查。

### 安全检查

安全检查用于保证块位于同一工作区、连接来自不同块等基础约束，避免 Blockly 进入错误状态。

它也会阻止明显不合理的组合，例如把两个 `next` 连接直接相连。

### 类型检查

开发者可以给连接打上类型标签。  
类型检查会基于这些标签执行类型约束，例如阻止“期望数字的位置接入字符串”。

### 拖拽检查

拖拽检查只在“通过拖拽连接块”时生效，不影响程序化连接。  
例如拖拽时只会考虑一定半径内的候选连接。

## 覆盖默认连接检查器

如果你希望自定义类型检查或拖拽检查逻辑，可以注册一个实现 `IConnectionChecker` 接口的替代检查器对象。

要自定义安全检查：重写 `doSafetyChecks`：  
[doSafetyChecks](https://github.com/RaspberryPiFoundation/blockly/blob/7e03c6e31c084606d5c3f8c5ecd26b0c4459ac6d/core/interfaces/i_connection_checker.ts#L75)

::: warning 警告
一般不建议覆盖 Blockly 默认安全检查。
:::

要自定义类型检查：重写 `doTypeChecks`：  
[doTypeChecks](https://github.com/RaspberryPiFoundation/blockly/blob/7e03c6e31c084606d5c3f8c5ecd26b0c4459ac6d/core/interfaces/i_connection_checker.ts#L86)

要自定义拖拽检查：重写 `doDragChecks`：  
[doDragChecks](https://github.com/RaspberryPiFoundation/blockly/blob/7e03c6e31c084606d5c3f8c5ecd26b0c4459ac6d/core/interfaces/i_connection_checker.ts#L96)

## 示例代码

可参考官方的 strict connection checker 插件示例：  
[strict connection checker plugin](https://github.com/RaspberryPiFoundation/blockly-samples/tree/main/plugins/strict-connection-checker)
