# 使用过程块

## 使用插件

要使用过程块，我们建议使用 [@blockly/block-sharable-procedures](https://www.npmjs.com/package/@blockly/block-sharable-procedures) 插件。有关插件块和内置块之间的区别，请参阅[概述](/guides/create-custom-blocks/procedures/overview.html)。

### 安装

Yarn: `yarn add @blockly/block-sharable-procedures`

NPM: `npm install @blockly/block-sharable-procedures`

### 使用

```javascript
import Blockly from 'blockly';
import {blocks, unregisterProcedureBlocks} '@blockly/block-sharable-procedures';

unregisterProcedureBlocks();
Blockly.common.defineBlocks(blocks);
```

这将定义具有与传统内置过程块相同名称的过程块。因此，如果您加载的是使用旧过程块保存的 JSON 或 XML，它们将继续正常加载。

#### 将它们添加到工具箱

在定义了块（插件或传统内置块）后，您需要使它们对用户可用。这需要您使用类别样式工具箱，因为过程类别是动态填充的，这不受飞出工具箱支持。

您可以将动态类别添加到工具箱，如下所示：

::::tabs
::: tab JSON

```json
{ 
  "kind": "categoryToolbox", 
  "contents": [   
    {     
      "kind": "category",     
      "name": "Functions",     
      "custom": "PROCEDURE"   
    } 
  ]
};
```

:::
::: tab XML

```xml
<xml id="toolbox" style="display: none">  
  <category name="Functions" cusotm="PROCEDURE">
</xml>
```
:::
::::
