# 创建自定义渲染器

::: tip 提示
如果你还没读过[渲染器概念文档](/guides/create-custom-blocks/renderers/concepts/renderer)，或还没做过官方 codelab（[custom renderer codelab](https://blocklycodelabs.dev/codelabs/custom-renderer/index.html)），建议先完成。
:::

要创建自定义渲染器，需要继承 `Renderer` 类。

```javascript
class CustomRenderer extends Blockly.blockRendering.Renderer {
  constructor() {
    super();
  }
}
```

不做额外改动时，基类渲染器效果如下：

![基础渲染器](/static/blockly/images/rendering/renderers/base-renderer.png)

也可以继承某个内置渲染器，再定向覆盖其中一部分能力：

```javascript
class CustomRenderer extends Blockly.thrasos.Renderer {
  constructor() {
    super();
  }
}
```

内置渲染器见[渲染器总览](/guides/create-custom-blocks/renderers/overview)。

## 继承其他渲染器组件

块的具体形状由渲染器子组件共同决定。  
`Renderer` 默认提供可用的组件实现，所以你可以只改一个组件而不必重写全部。

例如你只想改连接形状，可以仅覆盖[常量提供器](/guides/create-custom-blocks/renderers/concepts/constants)。  
对应做法见下一页[连接形状](/guides/create-custom-blocks/renderers/create-custom-renderers/connection-shapes)。

## 覆盖工厂方法

当你继承了某个子组件后，还要覆盖 `Renderer` 对应工厂方法，让组件装配为你的子类实现。

可覆盖的方法有：

- [`makeConstants_`](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.renderer_class.makeconstants__1_method)
- [`makeRenderInfo_`](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.renderer_class.makerenderinfo__1_method)
- [`makePathObject`](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.renderer_class.makepathobject_1_method)
- [`makeDrawer_`](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.renderer_class.makedrawer__1_method)

## 注册渲染器

创建完成后需要注册渲染器，并在注入配置中通过字符串名称启用它。

```javascript
Blockly.blockRendering.register('custom_renderer', CustomRenderer);

const workspace = Blockly.inject(blocklyDiv, {
  renderer: 'custom_renderer',
});
```

配置项结构见[创建工作区](/guides/configure/configuration_struct)。
