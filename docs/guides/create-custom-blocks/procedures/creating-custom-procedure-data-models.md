# 创建自定义过程数据模型

[@blockly/block-sharable-procedures](https://www.npmjs.com/package/@blockly/block-sharable-procedures) 插件提供的数据模型旨在复制 Blockly 的旧版内置过程块的行为。这包括一些您可能不希望在您的自定义过程块中使用的功能，包括：

- 不支持返回类型
- 所有参数都关联到全局变量

为了解决这个问题，您可以创建自己的自定义过程数据模型。

要创建自己的自定义过程数据模型，您需要实现过程模型的 [IProcedureModel](https://developers.google.com/blockly/reference/js/blockly.procedures_namespace.iproceduremodel_interface) 接口，以及参数模型的 [IParameterModel](https://developers.google.com/blockly/reference/js/blockly.procedures_namespace.iproceduremodel_interface) 接口。

您还需要在修改过程模型的每个方法中调用 [@blockly/block-sharable-procedures](https://www.npmjs.com/package/@blockly/block-sharable-procedures) 插件的 `triggerProceduresUpdate` 方法，以便在您的过程块上调用 `doProcedureUpdate`（使它们重新渲染）。
