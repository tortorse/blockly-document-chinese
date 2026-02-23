# 本地化

Blockly 提供了一套本地化系统，用于本地化应用里的文本，例如提示、上下文菜单文案和块上的文本。Blockly 自身也使用这套系统，你也可以用它处理应用自己的文本。

::: tip 说明
本地化和翻译的区别在于：本地化允许同一种语言在不同国家使用不同译文，例如葡萄牙葡萄牙语和巴西葡萄牙语。
:::

## 本地化系统如何工作

本地化系统由三部分组成：

- 本地化令牌
- 本地化表
- 用本地化表把令牌替换为目标语言字符串的函数

### 本地化令牌

本地化令牌是一个短字符串，用来代表需要本地化的文本。  
例如自定义日期块的提示可使用 `MY_DATE_TOOLTIP`。代码里放令牌而不是直接放文本，运行时 Blockly 再把令牌替换为本地化字符串。

### 本地化表

本地化表也叫字符串表或消息表，本质是“令牌 -> 本地化字符串”的映射对象。每个地区码都要有一张表。  
例如同时支持英文和西班牙文：

```javascript
enTable.MY_DATE_TOOLTIP = 'Enter a date.';
esTable.MY_DATE_TOOLTIP = 'Introduzca una fecha.';
```

Blockly 已内置自身文本的本地化表，发布包中路径格式为 `blockly/msg/xx.js`，`xx` 是地区码。

你需要为自己的文本准备本地化表。运行时要把 Blockly 的表和你的表一起加载到 `Blockly.Msg`，这是 Blockly 内部使用的本地化表。

## 何时使用本地化系统

在接入本地化前，先确定你只支持一个地区，还是现在或未来需要支持多个地区。

- **仅支持单一地区**
  - 直接在代码里写文本即可，不必使用本地化令牌。
  - 若地区码是 `en`，不需要额外操作，英文表默认已加载。
  - 若不是 `en`，需要[加载 Blockly 本地化表](#load-blockly)。
- **现在或未来支持多个地区**
  1. [定义并使用本地化令牌](#define)。
  2. 设计[选择地区](#choose)策略。
  3. [加载 Blockly 本地化表](#load-blockly)。
  4. [加载自定义本地化表](#load-custom)。

<a id="define"></a>
## 定义并使用本地化令牌

支持多地区时，应为所有自定义文本使用本地化令牌。

### 定义本地化令牌

每一段需要本地化的文本都定义一个令牌。建议加自定义前缀，避免与 Blockly 未来新增令牌冲突。

例如你有一个自定义日期块和一个自定义分类，可定义：

```javascript
MY_DATE_BLOCK_TEXT
MY_DATE_TOOLTIP
MY_DATE_HELPURL
MY_DATE_CATEGORY
```

### 定义本地化表

为每个支持地区定义一张本地化表，例如：

```javascript
// 英文：my_tokens_en.js
export const myEnTable = {
  MY_DATE_BLOCK_TEXT: 'Date %1',
  MY_DATE_TOOLTIP: 'Enter a date.',
  MY_DATE_HELPURL: 'https://myownpersonaldomain.com/help/en/dateblock',
  MY_DATE_CATEGORY: 'Dates',
};

// 西班牙文：my_tokens_es.js
export const myEsTable = {
  MY_DATE_BLOCK_TEXT: 'Fecha %1',
  MY_DATE_TOOLTIP: 'Introduzca una fecha.',
  MY_DATE_HELPURL: 'https://myownpersonaldomain.com/help/es/dateblock',
  MY_DATE_CATEGORY: 'Fechas',
};
```

### 在 JSON 中使用本地化令牌

在 JSON 里，把要本地化的字符串替换为令牌引用。  
令牌引用格式是 `%{BKY_TOKEN}`，示例：

```javascript
Blockly.common.defineBlocksWithJsonArray([{
  type: 'my_date',
  message0: '%{BKY_MY_DATE_BLOCK_TEXT}',
  args0: [{
    type: 'field_input',
    name: 'DATE',
  }],
  output: 'Date',
  colour: '%{BKY_MY_DATE_COLOUR}',
  tooltip: '%{BKY_MY_DATE_TOOLTIP}',
  helpUrl: '%{BKY_MY_DATE_HELPURL}',
  extensions: ['validate_date'],
}]);
```

JSON 被处理时（本例是块实例化时），Blockly 会去 `Blockly.Msg` 查令牌并替换。  
若找不到令牌，会保留原引用并发出警告。

#### JSON message 插值

JSON 块定义中的 `message` 键用于定义输入和字段。把令牌引用放在 `message` 中，可让同一份块定义适配不同语言的词序和方向。  
例如 Blockly 的 `lists_repeat` 在不同语言下显示为：

<img src="/static/blockly/images/createlist-en.png" alt="lists_repeat 英文">
<br>
<img src="/static/blockly/images/createlist-es.png" alt="lists_repeat 西班牙文">
<br>
<img src="/static/blockly/images/createlist-ko.png" alt="lists_repeat 韩文">
<br>
<img src="/static/blockly/images/createlist-ar.png" alt="lists_repeat 阿拉伯文（从右到左）">

这些块共享同一份定义，其中 `message0` 为：

```javascript
message0: '%{BKY_LISTS_REPEAT_TITLE}',
```

英文表中该令牌的值是：

```javascript
Blockly.Msg['LISTS_REPEAT_TITLE'] = 'create list with item %1 repeated %2 times';
```

`%1`、`%2` 这类插值标记对应块中定义的输入和字段，标记之间的文本会变成无名标签字段。  
由于 `message0` 文本存放在本地化表而不是块定义里，同一份 JSON 块定义可以支持不同字段顺序：

```javascript
// 西班牙文：标签、输入、标签、输入、标签
Blockly.Msg['LISTS_REPEAT_TITLE'] = 'crear lista con el elemento %1 repetido %2 veces';

// 韩文：输入、标签、输入、标签、输入（虚拟输入）
Blockly.Msg['LISTS_REPEAT_TITLE'] = '%1을 %2번 넣어, 리스트 생성';
```

这在 JavaScript 形式的块定义里做不到，因为字段顺序不同需要写不同调用顺序。

使用从右到左语言时，应按“视觉顺序”书写消息字符串，不要插入 Unicode 方向控制字符：

```javascript
// 阿拉伯文。注意从右到左阅读时，%2 在 %1 左侧。
Blockly.Msg['LISTS_REPEAT_TITLE'] = 'إنشئ قائمة مع العنصر  %1 %2 مرات';
```

更多关于 `message` 如何转换为输入与字段，可见 [JSON 定义块结构](https://developers.google.com/blockly/guides/create-custom-blocks/define/structure-json)。

### 在 JavaScript 中使用本地化令牌

在 JavaScript 里，要把待本地化字符串替换为 `Blockly.Msg['TOKEN']`：

```javascript
// 返回本地化后的上下文菜单文案。
displayText: () => Blockly.Msg['MY_CONTEXT_MENU_ITEM'];
```

除附录列出的例外，Blockly 不会在 JavaScript 字符串里自动解析令牌引用：

```javascript
// 不会生效，返回的是原字符串 '%{BKY_MY_CONTEXT_MENU_ITEM}'。
displayText: () => '%{BKY_MY_CONTEXT_MENU_ITEM}';
```

<a id="choose"></a>
## 选择地区

如何选地区属于应用层策略，不由 Blockly 规定。  
例如固定地区、从 URL 参数推断、或让用户在列表中选择。

通用建议是：在创建工作区之前确定地区并加载对应本地化表。  
如果工作区创建后才切换地区并加载新表，需要重建工作区；现有工具箱和块不会自动更新。若要保留用户内容，可先保存状态，重建后再回灌状态。

<a id="load-blockly"></a>
## 加载 Blockly 本地化表

Blockly 为自身所有文本提供了本地化表（包括内置块文本）。除了默认的 `en`，其他地区都需要手动加载对应表。

Blockly 本地化表文件路径格式为 `blockly/msg/xx.js`。支持地区可见 [msg/json 目录](https://github.com/RaspberryPiFoundation/blockly/tree/main/msg/json)。

### 使用 npm 加载 Blockly 本地化表

当你使用 `import * as Blockly from 'blockly';` 时，默认会包含 Blockly core、内置块、JavaScript 生成器和英文表。

要加载其他地区：

1) 导入默认模块：

```javascript
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript'; // 或你使用的其他生成器
```

2) 导入目标地区表，例如西班牙文：

```javascript
import * as Es from 'blockly/msg/es';
```

3) 调用 `Blockly.setLocale`：

```javascript
Blockly.setLocale(Es);
```

`setLocale` 仅在 Blockly 的 npm 版本中提供。

### 不使用 npm 加载 Blockly 本地化表

可通过 `<script>` 直接从 `msg` 目录加载：

```html
<script src="../../blockly_compressed.js"></script>
<script src="../../blocks_compressed.js"></script>
<script src="../../msg/es.js"></script>
```

加载后会自动生效。

<a id="load-custom"></a>
## 加载自定义本地化表

如果你定义了自己的本地化表，需要按当前地区加载对应表。

- 使用 npm 时，可继续用 `Blockly.setLocale`：

```javascript
import * as Es from 'blockly/msg/es';
import {myEsTable} from '../my_tokens_es';
Blockly.setLocale(Es);
Blockly.setLocale(myEsTable);
```

`setLocale` 会把输入对象所有键值复制进 `Blockly.Msg`。可多次调用；若键重复，后一次会覆盖前一次。

- 不使用 npm 时，需要手动把表复制到 `Blockly.Msg`。最简单是自己实现一个 `setLocale`：

```javascript
function mySetLocale(locale) {
  Object.keys(locale).forEach(function (key) {
    Blockly.Msg[key] = locale[key];
  });
}

mySetLocale(myEsTable);
```

## 解析令牌引用的函数

Blockly 提供两个函数用于解析令牌引用：

- `Blockly.utils.parsing.replaceMessageReferences`（常用）
- `Blockly.utils.parsing.tokenizeInterpolation`（较少直接使用）

多数场景不需要手动调用，因为 Blockly 会在支持令牌引用的位置自动处理，例如 JSON 块定义中的 `messageN`、`tooltip`、`helpUrl`。

手动调用的典型场景是自定义字段：如果自定义字段的配置项允许令牌引用，可在字段实现中调用 `replaceMessageReferences`。可参考 [创建自定义字段](https://developers.google.com/blockly/guides/create-custom-blocks/fields/customizing-fields/creating#json_and_registration)。

## 相关主题

- 从右到左语言：查看 [RTL demo](https://raspberrypifoundation.github.io/blockly-samples/examples/rtl-demo/)
- 参与翻译 Blockly：查看 [贡献指南中的翻译](https://developers.google.com/blockly/guides/contribute/core/translating)

## 附录：允许使用令牌引用的位置

可以在以下 JSON 键中使用令牌引用：

- 分类工具箱定义：
  - `name`
  - `colour`
- 块定义：
  - `messageN`
  - `tooltip`
  - `helpUrl`
  - `colour`
- 所有字段通用选项：
  - `tooltip`
- `field_dropdown` 的 `options` 嵌套数组：
  - 第一项为字符串时，第一项本身
  - 第一项为图片对象时，`alt` 的值
- `field_variable` 选项：
  - `variable`
- `field_label` 与 `field_label_serializable` 选项：
  - `text`
- `field_image` 选项：
  - `height`
  - `width`
  - `src`
  - `alt`
- 主题配置：
  - 分类样式中的 `colour`
  - 块样式中的 `colourPrimary`、`colourSecondary`、`colourTertiary`

也可作为以下方法参数值使用：

- `Block.setColour`
- `Blockly.utils.extensions.buildTooltipForDropDown`
- `Blockly.utils.extensions.buildTooltipWithFieldText`
- `Blockly.utils.parsing.parseBlockColour`

另外，在工具箱 XML 的 `<category>` 上也支持：

- `name`
- `colour`

关于把令牌引用用于颜色值，可见 [颜色格式](/guides/configure/appearance/colour-formats)。
