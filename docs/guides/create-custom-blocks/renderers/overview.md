# 渲染器总览

块的外观由渲染器决定。渲染器会根据块定义中的字段和连接信息，计算布局并绘制形状。

## 内置渲染器

Blockly 内置三种渲染器：

| 渲染器 | 说明 | 示例 |
| --- | --- | --- |
| `thrasos` | 推荐使用。基于 geras 的现代化风格，间距更均匀，边框更实。 | ![thrasos](/static/blockly/images/rendering/renderers/thrasos.png) |
| `geras` | 默认渲染器，也是 Blockly 最早的渲染器。 | ![geras](/static/blockly/images/rendering/renderers/geras.png) |
| `zelos` | 参考 Scratch 3.0 风格设计。 | ![zelos](/static/blockly/images/rendering/renderers/zelos.png) |

使用方式是在注入配置中指定 `renderer`：

```javascript
Blockly.inject('blocklyDiv', {
  renderer: 'thrasos',
});
```

## 自定义渲染器

如果内置渲染器都不满足需求，可以创建自定义渲染器。官方建议按下面顺序进行：

1. 阅读[渲染器概念总览](/guides/create-custom-blocks/renderers/concepts/overview)，先理解组件关系。
2. 完成官方 codelab：[自定义渲染器实战](https://blocklycodelabs.dev/codelabs/custom-renderer/index.html)。
3. 在项目中接入调试渲染器：[debug renderer](https://www.npmjs.com/package/@blockly/dev-tools#debug-renderer)。
4. 再开始定制你的渲染器行为和视觉样式。
