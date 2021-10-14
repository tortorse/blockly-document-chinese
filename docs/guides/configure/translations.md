# 翻译

Blockly 中的默认消息（例如上下文菜单中的文本）已被翻译成许多不同的语言。 默认情况下会加载 `en` 语言环境，但也可以包括其他可用的语言环境。

## 使用 npm 配置语言环境

当您使用 `import * as Blockly from 'blockly'` 导入 Blockly 时，您将获得默认模块：Blockly core，Blockly 内置块，JavaScript 生成器和英语 lang文件。

要使用其他语言环境，您将需要更仔细地定义导入：

#### 导入 Blockly 默认模块

```javascript
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript'; // Or the generator of your choice
```

#### 导入 Blockly 语言包

例如，要导入法语消息集：

```javascript
import * as Fr from 'blockly/msg/fr';
```

有关 Blockly 支持语言环境的完整列表，请参见：<https://github.com/google/blockly/tree/master/msg/js>

#### 配置语言环境

导入所需的消息集后，您需要在 Blockly 中设置语言环境。该功能当前仅包含在 Blockly 的 npm 版本中。

```javascript
Blockly.setLocale(Fr);
```

需要在加载工作区之前调用此方法。

#### 在未使用 npm 的情况下配置语言环境

从 Blockly msg 目录引入对应的脚本路径，翻译将会自动包含在内。

```html
<script src="../../blockly_compressed.js"></script>
<script src="../../blocks_compressed.js"></script>
<script src="../../msg/js/ar.js"></script>
```

#### 定制翻译

Blockly 包括其所有默认字符串的翻译，但是如果您有带有文本的自定义块，则可能希望为这些字符串使用自己的翻译。 例如，`blockly/msg/es` 的结构类似于以下内容：

```javascript
Blockly.Msg["COLOUR_RGB_RED"] = "rojo";
```

您可以通过将 `setLocale` 与带有自定义转换的对象一起调用，来将其他自定义消息添加为 `Blockly.Msg` 对象上的新属性。 您可能希望使用自定义前缀为翻译添加前缀，以免与将来可能添加的任何默认翻译冲突。

```javascript
// In custom_es.js
export const CustomEs = {
  HELLO: "Hola",
}

// In your setup code
import * as Es from blockly/msg/Es;
import { CustomEs } from ../custom_es;
Blockly.setLocale(Es);
Blockly.setLocale(CustomEs);
```

`setLocale` 将输入对象中的每个键放入 `Blockly.Msg`。 您可以使用不同的键多次调用它，但是使用重复的键第二次调用将覆盖第一个。

要在您的块中引用翻译后的字符串，请使用 `Blockly.Msg ['HELLO']`，其中应包含您配置的语言环境的字符串。

## 相关话题

- 从右到左的语言：请参阅 [RTL演示](https://blockly-demo.appspot.com/static/demos/rtl/index.html)
- [本地化块](/guides/create-custom-blocks/localize-blocks.html)