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
    - [ ] [Serialization 序列化](./docs/guides/configure/serialization.md) (原文)
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
        - [ ] [Connection Checker 连接检查器](./docs/guides/configure/advanced/interfaces/connection_checker.md) (原文)
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
    - [x] Operator Precedence 操作符优先级 (粗翻)
    - [x] Caching Arguments 缓存参数 (粗翻)
    - [x] Type Checks 类型检查 (粗翻)
    - [x] Extensions and Mutators 扩展和变形器 (粗翻)
    - [x] Variables 变量 (粗翻)
    - Fields
      - [x] Overview 总览 (粗翻)
      - [x] Anatomy of a Field 字段解析 (粗翻)
      - [ ] Validators 校验器 (部分原文)
      - Built-in Fields
        - [ ] Overview (原文)
        - [ ] Angle (原文)
        - [ ] Checkbox (原文)
        - [ ] Colour (原文)
        - [ ] Date (原文)
        - [ ] Dropdown (原文)
        - [ ] Image (原文)
        - [ ] Label (原文)
        - [ ] Label (Serializable) (原文)
        - [ ] Number (原文)
        - [ ] Text Input (原文)
        - [ ] Variable (原文)
      - [ ] Customizing Fields (原文)
        - [ ] Overview (原文)
        - [ ] Creating a Custom Field (原文)
        - [ ] Extending an Existing Field (原文)
        - [ ] Upgrading a Custom Field (原文)
  - Application Integration
    - [ ] Best Practices(原文)
    - [ ] Generating and Running JavaScript(原文)
    - [ ] Attributing Blockly(原文)
  - Contributing to Blockly
    - [x] overview (粗翻)
    - Get started
      - [x] Overview (粗翻)
      - [x] Development Tools (粗翻)
      - [ ] Writing a Good Issue (原文)
      - [ ] Writing a Good PR (原文)
      - [x] Commit Message Guide (粗翻)
      - [ ] Code Review Process (原文)
      - [ ] Issue Labels (原文)
      - [x] Using the Playground
    - Contributing to Core
      - [x] Overview (粗翻)
      - [x] Style Guide (粗翻)
      - [x] Building (粗翻)
      - [x] Advanced Compilation (粗翻)
      - [x] Translating (粗翻)
        - [ ] overview
        - [ ] Klingon
      - [x] Unit Testing
    - Contributing to Samples
      - [x] Overview (粗翻)
      - [ ] Repository Structure
        <!-- - [x] Blockly-samples Repository Structure (粗翻) -->
      - [x] Plugin Overview (粗翻)
      - [ ] Adding a Plugin (原文)
      - [ ] Naming Conventions (原文)
      - [ ] Debugging (原文)
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
