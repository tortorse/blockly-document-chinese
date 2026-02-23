# 高级定制

Blockly 允许你通过替换对应类来定制部分功能。

## 可替换类

下列 Blockly 类支持替换：

| Blockly 类 | 接口 | 注册表类型名 |
| --- | --- | --- |
| [`Blockly.dragging.Dragger`](/reference/js/blockly.dragging_namespace.dragger_class) | [`Blockly.IDragger`](/reference/js/blockly.idragger_interface) | `blockDragger` |
| [`Blockly.ConnectionChecker`](/reference/js/blockly.connectionchecker_class) | [`Blockly.IConnectionChecker`](/reference/js/blockly.iconnectionchecker_interface) | `connectionChecker` |
| [`Blockly.InsertionMarkerPreviewer`](/reference/js/blockly.insertionmarkerpreviewer_class) | [`Blockly.IConnectionPreviewer`](/reference/js/blockly.iconnectionpreviewer_interface) | `connectionPreviewer` |
| [`Blockly.HorizontalFlyout`](/reference/js/blockly.horizontalflyout_class) | [`Blockly.IFlyout`](/reference/js/blockly.iflyout_interface) | `flyoutsHorizontalToolbox` |
| [`Blockly.VerticalFlyout`](/reference/js/blockly.verticalflyout_class) | [`Blockly.IFlyout`](/reference/js/blockly.iflyout_interface) | `flyoutsVerticalToolbox` |
| [`Blockly.MetricsManager`](/reference/js/blockly.metricsmanager_class) | [`Blockly.IMetricsManager`](/reference/js/blockly.imetricsmanager_interface) | `metricsManager` |
| [`Blockly.Toolbox`](/reference/js/blockly.toolbox_class) | [`Blockly.IToolbox`](/reference/js/blockly.itoolbox_interface) | `toolbox` |
| [`Blockly.VariableMap`](/reference/js/blockly.variablemap_class) | [`Blockly.IVariableMap`](/reference/js/blockly.ivariablemap_interface) | `variableMap` |
| [`Blockly.VariableModel`](/reference/js/blockly.variablemodel_class) | [`Blockly.IVariableModel`](/reference/js/blockly.ivariablemodel_interface) | -- |

若要替换渲染器，见[创建自定义渲染器](/guides/create-custom-blocks/renderers/create-custom-renderers/basic-implementation)。

## 创建替换类

创建替换类时，需要实现对应接口中的函数。你可以：

- 新建一个类并实现全部函数。
- 继承 Blockly 原类，只覆写你想改动的函数。

唯一要求是：你自己或基类必须实现接口要求的全部函数，并满足接口注释里的约束。

为了让类型检查器识别你实现了某个接口：

- JavaScript：用 `@implements {InterfaceName}` 的 JSDoc 标注。
- TypeScript：用 `implements` 关键字。

## 告诉 Blockly 使用你的替换类

可以通过两种方式告诉 Blockly 使用替换类：

- 注册为该类型的默认类（推荐）
- 在初始化时通过 `plugins` 配置项注入

### 注册为默认类

推荐方式是把替换类注册为该类型默认类。调用 `Blockly.registry.register`，名称使用 `Blockly.registry.DEFAULT`，并把 `opt_allowOverrides` 设为 `true`。

```javascript
Blockly.registry.register(
  Blockly.registry.Type.VARIABLE_MODEL,
  Blockly.registry.DEFAULT,
  CustomVariableModel,
  true,
);
```

### 注入替换类

你也可以通过 `plugins` [配置项](/guides/configure/configuration_struct) 注入替换类。
它是一个对象：属性名为[注册表类型名](#可替换类)，属性值为替换类或已注册名称。

尽管这个属性名叫 `plugins`，这里的类不要求像“扩展 Blockly 的插件”那样打包并通过 npm 发布。两者不同，插件体系见[插件总览](/guides/programming/plugin_overview)。

可以直接把替换类传给 `Blockly.inject`：

```javascript
Blockly.inject('blocklyDiv', {
  plugins: {
    'metricsManager': CustomMetricsManagerClass
  }
}
```

也可以先用 `Blockly.registry.register` 注册名称，再把名称传给 `Blockly.inject`。当你把配置项存成纯 JSON 时，这种方式更合适。

```javascript
Blockly.registry.register(Blockly.registry.Type.METRICS_MANAGER, 'YOUR_NAME', CustomMetricsManagerClass);

Blockly.inject('blocklyDiv', {
  plugins: {
    'metricsManager': 'YOUR_NAME'
  }
}
```
