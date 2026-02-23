# 插件

插件（plugin）是为 Blockly 增加功能的独立代码模块。例如，它可以添加自定义字段（field）、定义新主题（theme），或提供自定义渲染器（renderer）。插件通常通过 npm 打包与分发。

::: tip 注意
[`BlocklyOptions` 对象](https://developers.google.com/blockly/guides/configure/web/configuration_struct#the_options_dictionary)里有 `plugins` 属性，可用于注入自定义 Blockly 行为的类。此类代码可以做成插件，但并非必须，两者没有强绑定关系。
:::

若想快速了解插件，可先看官方视频：[Plugins Overview talk (2021)](https://www.youtube.com/watch?v=rg-V0w7UZFc&list=PLSIUOFhnxEiCjoIwJ0jAdwpTZET73CK7d&index=3)。

若你想创建自己的插件，请看：[添加插件](/guides/contribute/samples/add_a_plugin)。

## 第一方插件与第三方插件

*第一方插件*由 Blockly 团队维护，并以 npm 的 `@blockly` scope 发布，目标是适配广泛的 Blockly 应用场景。

*第三方插件*由社区或组织独立维护与发布，可能更复杂、更实验性，或更聚焦某个垂直场景。

## 查找插件

- 访问 [Blockly Plugins & Demos](https://raspberrypifoundation.github.io/blockly-samples/#plugins)，可直接体验第一方插件示例。
- 在 npm 搜索 [`keyword:blockly-plugin`](https://www.npmjs.com/search?q=keyword%3Ablockly-plugin)。其中 `@blockly` scope 的插件来自 Blockly 团队。若需要更宽泛结果，可搜索 [`keyword:blockly`](https://www.npmjs.com/search?q=keyword%3Ablockly) 或 [`blockly`](https://www.npmjs.com/search?q=blockly)。
- 查看 GitHub 上的 [`blockly-samples/plugins` 目录](https://github.com/RaspberryPiFoundation/blockly-samples/tree/main/plugins)。每个插件通常都有 README，说明行为和适用场景。

## 安装插件

建议优先用 npm 或 yarn 这类包管理器安装插件，便于接收更新。

- **使用包管理器安装**

### npm

```bash
npm install @blockly/field-angle
```

### yarn

```bash
yarn add @blockly/field-angle
```

- **不使用包管理器安装**

### unpkg

```html
<script src="https://unpkg.com/@blockly/field-angle"></script>
```

你也可以直接克隆包含插件的 GitHub 仓库。第一方插件对应仓库是 [`blockly-samples`](https://github.com/RaspberryPiFoundation/blockly-samples/tree/main)。

安装前请先看插件 README，确认是否有额外安装步骤。

## 使用插件

每个插件的使用方式都不完全相同，请以插件 README 为准。下面用 [`@blockly/field-angle`](https://www.npmjs.com/package/@blockly/field-angle) 做示例：

1. 从插件导入代码（方式取决于你的安装方式）。

### npm 或 yarn

```javascript
import Blockly from 'blockly';
import {registerFieldAngle} from '@blockly/field-angle';
```

### unpkg

不需要 `import` 语句。

### 克隆仓库

```javascript
import {registerFieldAngle} from 'path/to/plugin';
```

2. 按需初始化插件。对于自定义字段类插件，通常要先注册字段：

```javascript
registerFieldAngle();
```

3. 在 block 定义里使用该插件功能：

```javascript
Blockly.common.defineBlocksWithJsonArray([
  {
    type: 'my_angle_block',
    message0: '%1 degrees',
    args0: [
      {
        type: 'field_angle',
        name: 'FIELDNAME',
        value: 45,
      },
    ],
    output: null,
    style: 'math_blocks',
  },
]);
```

<img src="/static/blockly/images/field-angle.png" alt="360 度表盘角度选择字段" width="150">

## 插件版本

`blockly-samples` 中的插件采用 [语义化版本（semver）](https://semver.org)。这意味着破坏性变更必须升级主版本号。对 core 做 monkey patch 的新插件通常会使用主版本 `0`，表示仍在[初始开发阶段](https://semver.org/#spec-item-4)。

多数插件会将 `blockly` 声明为 [`peerDependency`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#peerdependencies)，而不是 `dependency`。因为默认前提是你已经安装了 Blockly。这会让你自行管理 Blockly 版本，同时也要求你查看插件的 `package.json`，确认插件要求的最低 Blockly 版本。若插件升级后需要更高 Blockly 版本，这会被视为破坏性变更，并触发插件主版本升级。

当你在应用的 `package.json` 中添加插件时，默认通常会在版本前加 `^`：

```json
"dependencies": {
  "@blockly/field-angle": "^5.0.12"
}
```

这表示 npm 可安装该主版本下更高的次版本和补丁版本，例如 `5.0.20`、`5.1.0`，但不会自动升级到新主版本（如 `6.0.1`）。当你升级 Blockly 主版本时，建议同时检查插件是否也有可升级的主版本。
