# Blockly 中的接口

在 Blockly 中，接口描述了对象为了替换默认对象而必须实现的功能。

您不需要从特定类继承来实现接口。只要您提供正确的功能并遵守界面注释中描述的任何要求，您就可以在后台做任何您想做的事情。但是，插件的一个常见模式是扩展默认类，并且只覆盖您想要更改的功能。

要向类型检查器指示您实现了特定接口，请使用`@implements {InterfaceName}`.

Blockly 的接口定义在[core/interfaces](https://github.com/google/blockly/tree/master/core/interfaces).