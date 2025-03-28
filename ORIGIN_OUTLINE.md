- **Get started**
  - [What is Blockly?](./docs/guides/get-started/what-is-blockly.md) ✅
  - [Why Blockly?](./docs/guides/get-started/why-blockly.md) ✅
  - [Get the code](./docs/guides/get-started/get-the-code.md) ✅
  - [Visual glossary](./docs/guides/get-started/workspace-anatomy.md) ✅
  - **Basic steps**
    - [Create a workspace](./docs/guides/get-started/workspace-creation.md) ✅
    - [Add a toolbox](./docs/guides/get-started/toolbox.md) ✅
    - [Define custom blocks](./docs/guides/get-started/blocks.md) ✅
    - [Generate code](./docs/guides/get-started/code-generation.md) ✅
    - [Save and load](./docs/guides/get-started/save-and-load.md) ✅
  - **Try Blockly**
    - [Get started codelab](https://blocklycodelabs.dev/codelabs/getting-started/index.html?index=..%2F..index#0) ✅
    - [Blockly Playground](https://blockly-demo.appspot.com/static/tests/playground.html) ✅
    - [Block Factory](https://google.github.io/blockly-samples/examples/developer-tools/index.html) ✅

- **Design considerations**
  - [Application design](./docs/guides/design/applications.md) ✅
  - [Educational applications](./docs/guides/design/education.md) ✅
  - [Block design](./docs/guides/design/blocks.md) ✅
  - [Block- vs. text-based languages](./docs/guides/design/languages.md) ✅
  - [Block appearance](./docs/guides/design/appearance.md) ✅

- **Programming considerations**
  - [API visibility](./docs/guides/programming/using_blockly_apis.md)
  - [Fork Blockly](./docs/guides/programming/forking_blockly.md)
  - [Unfork Blockly](./docs/guides/programming/unforking_blockly.md)

- **Build your editor**
  - **Workspaces**
    - **Create a workspace**
      - [Create a workspace](./docs/guides/configure/configuration_struct.md)
      - [Grid option](./docs/guides/configure/grid.md)
      - [Media folder option](./docs/guides/configure/media.md)
      - [Move option](./docs/guides/configure/move.md)
      - [Zoom option](./docs/guides/configure/zoom.md)
    - **Workspace size**
      - [Fixed size workspace](./docs/guides/configure/fixed-size.md)
      - [Resizable workspace](./docs/guides/configure/resizable.md)
      - [Metrics Manager](./docs/guides/configure/metrics_manager.md)
  - **Toolboxes**
    - [Overview](./docs/guides/configure/toolboxes/toolbox.md)
    - **Flyout toolboxes**
      - [Define a flyout toolbox](./docs/guides/configure/toolboxes/flyout.md)
    - **Category toolboxes**
      - [Define a category toolbox](./docs/guides/configure/toolboxes/category.md)
      - [Nested categories](./docs/guides/configure/toolboxes/nested.md)
      - [Dynamic categories](./docs/guides/configure/toolboxes/dynamic.md)
      - [Disable, hide, or expand categories](./docs/guides/configure/toolboxes/disable-categories.md)
      - [Category appearance](./docs/guides/configure/toolboxes/appearance.md)
      - [Programmatic access](./docs/guides/configure/toolboxes/programmatic.md)
    - [Preset blocks](./docs/guides/configure/toolboxes/preset.md)
    - [Separators](./docs/guides/configure/toolboxes/separators.md)
    - [Buttons and labels](./docs/guides/configure/toolboxes/buttons.md)
    - [Modify toolboxes](./docs/guides/configure/toolboxes/modify.md)

- **Colours and themes**
  - [Colour formats](./docs/guides/configure/appearance/colour-formats.md)
  - [Block colours](./docs/guides/configure/appearance/block-colour.md)
  - [Themes](./docs/guides/configure/appearance/themes.md)

- **Save and load**
  - [Serialization](./docs/guides/configure/serialization.md)

- **Events**
  - [Events](./docs/guides/configure/events.md)

- **Shortcuts and context menus**
  - [Copy and paste](./docs/guides/configure/copy-paste.md)
  - **Drag and drop**
    - [Custom draggables](./docs/guides/configure/dragging/draggable.md)
    - [Custom block drag strategies](./docs/guides/configure/dragging/block-drag-strategies.md)
    - [Custom draggers](./docs/guides/configure/dragging/dragger.md)
  - [Context menus](./docs/guides/configure/context-menus.md)

- **Comments**
  - [Workspace comments](./docs/guides/configure/workspace_comment.md)
  - [Block comments](./docs/guides/configure/block_comment.md)

- **Localization**
  - [Translations](./docs/guides/configure/translations.md)

- **Add Custom Blocks**
  - [Overview](./docs/guides/create-custom-blocks/overview.md)
  - [Blockly Developer Tools](./docs/guides/create-custom-blocks/blockly-developer-tools.md)
  - [Define Blocks](./docs/guides/create-custom-blocks/define-blocks.md)
  - [Extensions and Mutators](./docs/guides/create-custom-blocks/extensions.md)
  - [Variables](./docs/guides/create-custom-blocks/variables.md)
  - **Connections and inputs**
    - [Overview](./docs/guides/create-custom-blocks/inputs/overview.md)
    - [Connection checks](./docs/guides/create-custom-blocks/inputs/connection-checks.md)
    - [Custom connection checkers](./docs/guides/create-custom-blocks/inputs/connection_checker.md)
    - [Connection previewers](./docs/guides/create-custom-blocks/inputs/connection-previews.md)
    - [Create custom inputs](./docs/guides/create-custom-blocks/inputs/creating-custom-inputs.md)
  - **Fields**
    - [Overview](./docs/guides/create-custom-blocks/fields/overview.md)
    - [Fields vs Icons](./docs/guides/create-custom-blocks/fields/fields-vs-icons.md)
    - [Anatomy of a Field](./docs/guides/create-custom-blocks/fields/anatomy-of-a-field.md)
    - [Validators](./docs/guides/create-custom-blocks/fields/validators.md)
    - **Built-in Fields**
      - [Overview](./docs/guides/create-custom-blocks/fields/built-in-fields/overview.md)
      - [Checkbox](./docs/guides/create-custom-blocks/fields/built-in-fields/checkbox.md)
      - [Dropdown](./docs/guides/create-custom-blocks/fields/built-in-fields/dropdown.md)
      - [Image](./docs/guides/create-custom-blocks/fields/built-in-fields/image.md)
      - [Label](./docs/guides/create-custom-blocks/fields/built-in-fields/label.md)
      - [Label (Serializable)](./docs/guides/create-custom-blocks/fields/built-in-fields/label-serializable.md)
      - [Number](./docs/guides/create-custom-blocks/fields/built-in-fields/number.md)
      - [Text Input](./docs/guides/create-custom-blocks/fields/built-in-fields/text-input.md)
      - [Variable](./docs/guides/create-custom-blocks/fields/built-in-fields/variable.md)
    - **Custom fields creation**
      - [Overview](./docs/guides/create-custom-blocks/fields/customizing-fields/overview.md)
      - [Creating a Custom Field](./docs/guides/create-custom-blocks/fields/customizing-fields/creating.md)
      - [Extending an Existing Field](./docs/guides/create-custom-blocks/fields/customizing-fields/extending.md)
      - [Upgrading a Custom Field](./docs/guides/create-custom-blocks/fields/customizing-fields/upgrading.md)
  - **Icons**
    - [Overview](./docs/guides/create-custom-blocks/icons/overview.md)
    - [Fields vs Icons](./docs/guides/create-custom-blocks/fields/fields-vs-icons.md)
    - **Create custom icons**
      - [Basic implementation](./docs/guides/create-custom-blocks/icons/creating-custom-icons/basic-implementation.md)
      - [Save and load icons](./docs/guides/create-custom-blocks/icons/creating-custom-icons/save-and-load.md)
      - [Use pop-up bubbles](./docs/guides/create-custom-blocks/icons/creating-custom-icons/use-bubbles.md)
      - [Create custom bubbles](./docs/guides/create-custom-blocks/icons/creating-custom-icons/creating-custom-bubbles.md)
  - **Code generation**
    - [Overview](./docs/guides/create-custom-blocks/code-generation/overview.md)
    - [Fields](./docs/guides/create-custom-blocks/code-generation/fields.md)
    - [Inner blocks](./docs/guides/create-custom-blocks/code-generation/inner-blocks.md)
    - **Statement blocks**
      - [Basic implementation](./docs/guides/create-custom-blocks/code-generation/statements/basic-implementation.md)
      - [Argument caching](./docs/guides/create-custom-blocks/code-generation/statements/caching-arguments.md)
    - **Value Blocks**
      - [Basic implementation](./docs/guides/create-custom-blocks/code-generation/values/basic-implementation.md)
      - [Parentheses](./docs/guides/create-custom-blocks/code-generation/values/operator-precedence.md)
      - [Argument Caching](./docs/guides/create-custom-blocks/code-generation/values/caching-arguments.md)
  - **Shape**
    - [Overview](./docs/guides/create-custom-blocks/renderers/overview.md)
    - **Concepts**
      - [Overview](./docs/guides/create-custom-blocks/renderers/concepts/overview.md)
      - [Renderer](./docs/guides/create-custom-blocks/renderers/concepts/renderer.md)
      - [Constants](./docs/guides/create-custom-blocks/renderers/concepts/constants.md)
      - [Render info](./docs/guides/create-custom-blocks/renderers/concepts/info.md)
      - [Path object](./docs/guides/create-custom-blocks/renderers/concepts/path-object.md)
      - [Drawer](./docs/guides/create-custom-blocks/renderers/concepts/drawer.md)
      - [Rows](./docs/guides/create-custom-blocks/renderers/concepts/rows.md)
      - [Elements](./docs/guides/create-custom-blocks/renderers/concepts/elements.md)
    - [Create custom renderers](./docs/guides/create-custom-blocks/renderers/create-custom-renderers/basic-implementation.md)
    - [Connection shapes](./docs/guides/create-custom-blocks/renderers/create-custom-renderers/connection-shapes.md)

- **Procedures**
  - [Overview](./docs/guides/create-custom-blocks/procedures/overview.md)
  - [Using built-in procedure blocks](./docs/guides/create-custom-blocks/procedures/using-procedures.md)
  - [Creating custom procedure blocks](./docs/guides/create-custom-blocks/procedures/creating-custom-procedure-blocks.md)
  - [Creating custom procedure data models](./docs/guides/create-custom-blocks/procedures/creating-custom-procedure-data-models.md)

- **Application Integration**
  - [Generating and Running JavaScript](./docs/guides/app-integration/running-javascript.md)
  - [Attributing Blockly](./docs/guides/app-integration/attribution.md)

- **Contributing to Blockly**
  - [Overview](./docs/guides/contribute.md)
  - **Get Started**
    - [Overview](./docs/guides/contribute/get-started.md)
    - [Development Tools](./docs/guides/contribute/get-started/development_tools.md)
    - [Writing a Good Issue](./docs/guides/contribute/get-started/write_a_good_issue.md)
    - [Writing a Good PR](./docs/guides/contribute/get-started/write_a_good_pr.md)
    - [Commit Message Guide](./docs/guides/contribute/get-started/commits.md)
    - [Code Review Process](./docs/guides/contribute/get-started/pr_review_process.md)
    - [Issue Labels](./docs/guides/contribute/get-started/issue_labels.md)
    - [Using the Playground](./docs/guides/contribute/get-started/playground.md)
  - **Contributing to Core**
    - [Overview](./docs/guides/contribute/core.md)
    - [Style Guide](./docs/guides/contribute/core/style_guide.md)
    - [Building](./docs/guides/contribute/core/building.md)
    - [Advanced Compilation](./docs/guides/contribute/core/advanced.md)
    - **Localization**
      - [Translate text](./docs/guides/contribute/core/translating.md)
      - [Klingon](./docs/guides/contribute/core/klingon.md)
    - [Unit Testing](./docs/guides/contribute/core/unit_testing.md)

- **Contributing to Samples**
  - [Overview](./docs/guides/contribute/samples.md)
  - [Repository Structure](./docs/guides/contribute/samples/repository_structure.md)
  - [Plugin Overview](./docs/guides/contribute/samples/plugin_overview.md)
  - [Add a Plugin](./docs/guides/contribute/samples/add_a_plugin.md)
  - [Add a Plugin Field to Block Factory](./docs/guides/contribute/samples/block_factory.md)
  - [Publish Block Libraries](./docs/guides/contribute/samples/block_libraries.md)
  - [Naming Conventions](./docs/guides/contribute/samples/naming.md)
  - [Debugging](./docs/guides/contribute/samples/debugging.md)
  - [Write a Codelab](./docs/guides/contribute/samples/write_a_codelab.md)
