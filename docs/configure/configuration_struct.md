# 注入 选项

## 注入

您可以通过调用 `Blockly.inject（location，options）` 来注入一个 Blockly 工作区。 第一个参数告诉Blockly将工作空间注入DOM的位置。 第二个参数是用于配置的名称-值对字典。 注入代码将选项字典解析为 `Blockly.Options` 的实例。

## 直接创建

您还可以直接通过调用创建工作区 `Blockly.WorkspaceSvg(new Blockly.Options(options))`。请注意，您需要调用 `new Blockly.Options(options)`，并传入您的 选项字典-工作区构造函数需要一个实例 `Blockly.Options`，而不是裸选项字典。

## 选项字典

