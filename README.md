# Blockly 中文文档

> Blockly 是一个将可视代码编辑器添加到 Web 和移动应用程序的库。 Blockly 编辑器使用互锁的图形块来表示代码概念，如变量，逻辑表达式，循环等。它使得用户可以不必关注语法细节就能直接按照编程原则进行编程。

Blockly 中文站点: <https://blockly.tortorse.com>

Blockly 官方站点: <https://developers.google.com/blockly>

## 翻译进度(v0.0.1)

- Guide 指南
  - [x] [Overview 总览](./docs/guides/overview.md) (粗翻)
  - [x] [Get Started 入门](./docs/guides/get-started.md) (粗翻)
  - Configure Blockly 配置 Blockly
    - Injection Options 注入选项
      - [x] [Configuration Struct 配置结构](./docs/guides/configure/configuration_struct.md) (粗翻)
      - [x] [Grid 栅格](./docs/guides/configure/grid.md) (粗翻)
      - [x] [Move 移动](./docs/guides/configure/move.md) (粗翻)
      - [x] [Zoom 缩放](./docs/guides/configure/zoom.md) (粗翻)
    - [x] [Fixed Size Workspace 固定尺寸的工作区](./docs/guides/configure/fixed-size) (粗翻)
    - [x] [Resizable Workspace 可调整尺寸的工作区](./docs/guides/configure/resizable.md) (粗翻)
    - [x] [Toolbox 工具箱](./docs/guides/configure/toolbox.md) (粗翻)
    - [x] [Code Generators 代码生成器](./docs/guides/configure/code-generators.md) (粗翻)
    - [x] [Events 事件](./docs/guides/configure/events.md) (粗翻)
    - [x] [Serialization 序列化](./docs/guides/configure/serialization.md) (粗翻)
    - [x] [Themes 主题](./docs/guides/configure/themes.md) (粗翻)
    - [x] [Keyboard Navigation 键盘导航](./docs/guides/configure/keyboard-nav.md) (粗翻)
    - [x] [Translations 翻译](./docs/guides/configure/translations.md) (粗翻)
    - [x] [Context Menus 上下文菜单](./docs/guides/configure/context-menus.md) (粗翻)
    - [x] [Add Custom Blocks 添加自定义块](./docs/guides/configure/custom-blocks.md) (粗翻)
    - Advanced Customization 高阶定制
      - [x] [Using Blockly APIs 使用 Blockly API](./docs/guides/configure/advanced/using_blockly_apis.md) (粗翻)
      - [x] [Forking 复刻](./docs/guides/configure/advanced/forking_blockly.md)(粗翻)
      - Using Interfaces
        - [x] [Overview 总览](./docs/guides/configure/advanced/interfaces/overview.md) (粗翻)
        - [x] [Connection Checker 连接检查器](./docs/guides/configure/advanced/interfaces/connection_checker.md) (粗翻)
        - [x] [Metrics Manager 度量管理器](./docs/guides/configure/advanced/interfaces/metrics_manager) (粗翻)
          <!-- - [x] Cloud Storage 云存储 (粗翻) -->
  - Create Custom Blocks 创建自定义块
    - [x] [Overview 总览](./docs/guides/create-custom-blocks/overview.md) (粗翻)
    - [x] [Blockly Developer Tools Blockly 开发者工具](./docs/guides/create-custom-blocks/blockly-developer-tools.md) (粗翻)
    - [x] [Define Blocks 定义块](./docs/guides/create-custom-blocks/blockly-developer-tools.md) (粗翻)
    - [x] [Block Colour 块颜色](./docs/guides/create-custom-blocks/block-colour.md) (粗翻)
    - [x] [Localize Blocks 本地化块](./docs/guides/create-custom-blocks/localize-blocks) (粗翻)
    - [x] [Generating Code 生成代码](./docs/guides/create-custom-blocks/generating-code.md) (粗翻)
    - [x] [Block Paradigms 块范例](./docs/guides/create-custom-blocks/block-paradigms.md) (粗翻)
    - [x] [Style Guide 样式指南](./docs/guides/create-custom-blocks/style-guide.md) (粗翻)
    - [x] [Operator Precedence 操作符优先级](./docs/guides/create-custom-blocks/operator-precedence.md) (粗翻)
    - [x] [Caching Arguments 缓存参数](./docs/guides/create-custom-blocks/caching-arguments.md) (粗翻)
    - [x] [Type Checks 类型检查](./docs/guides/create-custom-blocks/type-checks.md) (粗翻)
    - [x] [Extensions and Mutators 扩展和变形器](./docs/guides/create-custom-blocks/extensions.md) (粗翻)
    - [x] [Variables 变量](./docs/guides/create-custom-blocks/variables.md) (粗翻)
    - Fields
      - [x] [Overview 总览](./docs/guides/create-custom-blocks/fields/overview.md) (粗翻)
      - [x] [Anatomy of a Field 字段解析](./docs/guides/create-custom-blocks/fields/anatomy-of-a-field.md) (粗翻)
      - [x] [Validators 校验器](./docs/guides/create-custom-blocks/fields/validators.md) (粗翻)
      - Built-in Fields 内置字段
        - [x] [Overview 总览](./docs/guides/create-custom-blocks/fields/built-in-fields/overview.md) (粗翻)
        - [x] [Angle 角度](./docs/guides/create-custom-blocks/fields/built-in-fields/angle.md)(原文)
        - [x] [Checkbox 复选框](./docs/guides/create-custom-blocks/fields/built-in-fields/checkbox.md)(原文)
        - [x] [Colour 颜色](./docs/guides/create-custom-blocks/fields/built-in-fields/colour.md)(原文)
        - [x] [Date 日期](./docs/guides/create-custom-blocks/fields/built-in-fields/date.md)(粗翻)
        - [x] [Dropdown 下拉菜单](./docs/guides/create-custom-blocks/fields/built-in-fields/dropdown.md)(原文)
        - [ ] [Image 图片](./docs/guides/create-custom-blocks/fields/built-in-fields/image.md)(原文)
        - [ ] [Label 标签](./docs/guides/create-custom-blocks/fields/built-in-fields/label.md)(原文)
        - [ ] [Label 可序列化标签(Serializable)](./docs/guides/create-custom-blocks/fields/built-in-fields/label-serializable.md) (原文)
        - [ ] [Number 数字](./docs/guides/create-custom-blocks/fields/built-in-fields/number.md)(原文)
        - [ ] [Text Input 文本输入](./docs/guides/create-custom-blocks/fields/built-in-fields/text-input.md)(原文)
        - [ ] [Variable 变量](./docs/guides/create-custom-blocks/fields/built-in-fields/variable.md)(原文)
      - Customizing Fields 自定义字段 (原文)
        - [ ] [Overview 总览](./docs/guides/create-custom-blocks/fields/customizing-fields/overview) (原文)
        - [ ] [Creating a Custom Field 创建自定义字段](./docs/guides/create-custom-blocks/fields/customizing-fields/creating) (原文)
        - [ ] [Extending an Existing Field 扩展已有字段](./docs/guides/create-custom-blocks/fields/customizing-fields/extending.md) (原文)
        - [ ] [Upgrading a Custom Field 升级自定义字段](./docs/guides/create-custom-blocks/fields/customizing-fields/upgrading.md) (原文)
  - Application Integration 应用集成
    - [ ] [Best Practices 最佳实践](./docs/guides/app-integration/best-practices.md)(原文)
    - [ ] [Generating and Running JavaScript 生成并运行 JavaScript](./docs/guides/app-integration/running-javascript.md)(原文)
    - [ ] [Attributing Blockly 源自 Blockly](./docs/guides/app-integration/attribution.md)(原文)
  - Contributing to Blockly 共建 Blockly
    - [x] [overview 总览](./docs/guides/contribute/README.md) (粗翻)
    - Get started 入门
      - [x] [Overview 总览](./docs/guides/contribute/get-started/README.md) (粗翻)
      - [x] [Development Tools 开发工具](./docs/guides/contribute/get-started/development_tools.md) (粗翻)
      - [ ] [Writing a Good Issue 提一个好 issue](./docs/guides/contribute/get-started/write_a_good_issue.md) (原文)
      - [ ] [Writing a Good PR 提一个好的合并请求](./docs/guides/contribute/get-started/write_a_good_pr.md) (原文)
      - [x] [Commit Message Guide 提交信息指南](./docs/guides/contribute/get-started/commits.md) (粗翻)
      - [ ] [Code Review Process 代码评审过程](./docs/guides/contribute/get-started/pr_review_process.md) (原文)
      - [ ] [Issue Labels 问题标签](./docs/guides/contribute/get-started/issue_labels.md) (原文)
      - [x] [Using the Playground 使用训练场](./docs/guides/contribute/get-started/playground.md)
    - Contributing to Core 为核心做贡献
      - [x] [Overview 总览](./docs/guides/contribute/core/README.md) (粗翻)
      - [x] [Style Guide 风格指南](./docs/guides/contribute/core/style_guide.md) (粗翻)
      - [x] [Building 构建 构建](./docs//guides/contribute/core/building.md) (粗翻)
      - [x] [Advanced Compilation 进阶编译](./docs/guides/contribute/core/advanced.md) (粗翻)
      - Translating (粗翻)
        - [x] [overview 总览](./docs/guides/contribute/core/translating.md)
        - [ ] [Klingon](./docs/guides/contribute/core/klingon.md) (原文)
      - [x] [Unit Testing 单元测试](./docs/guides/contribute/core/unit_testing.md)
    - Contributing to Samples 贡献样例
      - [x] [Overview 总览](./docs/guides/contribute/samples/README.md) (粗翻)
      - [ ] [Repository Structure 代码仓库文件结构](./docs/guides/contribute/samples/repository_structure.md)
        <!-- - [x] Blockly-samples Repository Structure (粗翻) -->
      - [x] [Plugin Overview 插件总览](./docs/guides/contribute/samples/plugin_overview.md) (粗翻)
      - [ ] [Adding a Plugin 添加插件](./docs/guides/contribute/samples/add_a_plugin.md) (原文)
      - [ ] [Naming Conventions 命名约定](./docs/guides/contribute/samples/naming.md) (原文)
      - [ ] [Debugging 调试](./docs/guides/contribute/samples/debugging.md) (原文)
      - [ ] [Writing a Codelab 编写代码实验室](./docs/guides/contribute/samples/write_a_codelab) (原文)
- Reference 参考

## 术语

- Blockly 不翻译
- block 块，指 Blockly 中的每一个块状结构
- handler 句柄，但前端里面一般指特定的处理函数
- UI 用户界面
- building 构建、建设
- field 字段
- cursor 游标、光标
- anatomy 解析、剖析
- fork 复刻、分叉、副本化
