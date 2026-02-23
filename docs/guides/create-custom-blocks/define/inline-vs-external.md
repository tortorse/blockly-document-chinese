# 内联与外部输入

输入可以渲染为**内联**或**外部**。  
这会影响值输入连接器是在块内部显示还是在外缘显示，也会影响多个输入是否同排。

![内联与外部输入对比](/static/blockly/images/set-inputs-inline.png)

## 基本配置

块定义可以通过一个可选布尔值控制输入是否内联。

### JSON

```javascript
{
  // ...,
  "inputsInline": true
}
```

### JavaScript

```javascript
init: function() {
  // ...
  this.setInputsInline(true);
}
```

## `true`：内联输入

当设置为 `true` 时：

- 值输入连接器渲染在块内部。
- 语句输入始终独占一行。
- 虚拟输入、换行输入和值输入通常会同排渲染；但语句输入或换行输入之后的输入会换到新行。

## `false`：外部输入

当设置为 `false` 时：

- 值输入连接器渲染在块外缘。
- 各输入通常独占一行；但“虚拟输入后紧跟换行输入”会与该虚拟输入同排。

## 调试与实践建议

如果你不容易直观看出差异，可在[Blockly 开发者工具](https://raspberrypifoundation.github.io/blockly-samples/examples/developer-tools/index.html)中构建示例块，并切换 `inputs` 的 `automatic`、`external`、`inline` 选项。

如果没有显式设置该布尔值，Blockly 会使用启发式规则自动判断显示模式。  
在自动判断正确的前提下，保留未设置通常更利于多语言，因为不同翻译可自动得到不同的最佳布局。可参考[JSON 中的块结构](/guides/create-custom-blocks/define/structure-json)里关于插值顺序调整的示例。

一般来说，若块更可能接入较短值（如数字），更适合内联输入。  
用户也可以在右键菜单中切换此选项。
