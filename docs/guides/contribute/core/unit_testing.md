# 单元测试

更改或添加代码后，您应该运行现有的单元测试并考虑编写更多代码。所有测试都在未压缩的代码版本上执行。

有两组单元测试：JS 测试和块生成器测试。

## JS 测试

JS 测试确认了 Blockly 核心中内部 JavaScript 函数的运行。我们使用[Mocha](https://mochajs.org/)运行单元测试， 使用[Sinon](https://sinonjs.org/)存根依赖项， 使用[Chai](https://www.chaijs.com/)对代码进行断言。

### 运行测试

在块状和块状样本中，`npm run test`将运行单元测试。在 blockly 中，这还将运行其他测试，例如 linting 和编译。您还可以`tests/mocha/index.html`在浏览器中打开以交互方式运行所有 mocha 测试。

### 编写测试

我们使用 Mocha TDD 接口来运行测试。测试被组织成套件，其中可以包含额外的子套件和/或测试。通常，Blockly 的每个组件（例如`toolbox`或`workspace`）都有自己的测试文件，其中包含一个或多个套件。每个套件都可以有一个`setup`and`teardown` 方法，该方法将分别在该套件中的每个测试之前和之后调用。

#### 测试助手

我们有许多特定于 Blockly 的辅助函数，它们在编写测试时可能很有用。这些可以在 [core](https://github.com/google/blockly/blob/master/tests/mocha/test_helpers.js) 和 [blockly-samples](https://github.com/google/blockly-samples/blob/master/plugins/dev-tools/src/test_helpers.mocha.js)中找到。

辅助函数包括在测试之前和之后**需要**调用的函数（请参阅需求`sharedTestSetup`部分`sharedTestTeardown`）。

##### `sharedTestSetup`：

- 设置 sinon 假计时器（在某些测试中您需要使用 `this.clock.runAll`）。
- 存根 Blockly.Events.fire 立即触发（可配置）。
- 设置虽然定义的块类型的自动清理 `defineBlocksWithJsonArray`。
- `this`在上下文中 声明一些可以访问的属性：
  - `this.clock`（但不应恢复，否则会导致问题 `sharedTestTeardown`）
  - `this.eventsFireStub`
  - `this.sharedCleanup`（与`addMessageToCleanup`and 一起使用）（注意：如果您使用 定义了块 ，则`addBlockTypeToCleanup`不需要 使用）` addBlockTypeToCleanup``defineBlocksWithJsonArray `

该函数有一个可选`options`参数来配置设置。目前，它仅用于确定是否存根`Blockly.Events.fire`立即触发（默认会存根）。

##### `sharedTestTeardown`：

- 工作区的处置`this.workspace`（取决于它的定义位置，有关更多信息，请参阅测试要求部分）。
- 恢复所有存根。
- 清除所有添加的方块类型`defineBlocksWithJsonArray`和 `addBlockTypeToCleanup`。
- 清除所有添加的消息`addMessageToCleanup`。

#### 测试要求

- 每个测试都必须`sharedTestSetup.call(this);`作为最外层套件设置的第一行和`sharedTestTeardown.call(this);`文件最外层套件拆解中的最后一行调用。
- 如果您需要一个带有通用工具箱的工作区，您可以使用 test 中[预设的工具箱](https://github.com/google/blockly/blob/c12be77701cf34434274351f40356f5ad8e7b469/tests/mocha/index.html#L117)`index.html`之一。请参阅下面的示例。
- 您必须妥善处理`this.workspace`. 在大多数测试中，您将`this.workspace`在最外层套件中定义并将其用于所有后续测试，但在某些情况下，您可能会在内部套件中定义或重新定义它（例如，您的一个测试需要具有与您最初不同的选项的工作区设置）。它必须在测试结束时处理掉。
  - 如果您`this.workspace`在最外层套件中定义并且从不重新定义它，则不需要进一步的操作。它将被自动处理掉 `sharedTestTeardown`。
  - 如果您`this.workspace`第一次在内部套件中定义（即您没有在最外面的套件中定义它），您必须通过调用`workspaceTeardown.call(this, this.workspace)` 该套件的拆卸来手动处理它。
  - 如果您`this.workpace`在最外层套件中定义，然后在内部测试套件中重新定义它，则必须 `workspaceTeardown.call(this, this.workspace)` **在重新定义之前先调用它** 以拆除顶层套件中定义的原始工作区。`workspaceTeardown.call(this, this.workspace)`您还必须通过在此内部套件的拆解中再次调用来手动处置新值 。

#### 测试结构

单元测试通常遵循一套结构，可以概括为 _编排、行动、断言。_

1.  **编排**：设置世界的状态和被测行为的任何必要条件。
2.  **行动** : 调用被测代码来触发被测行为。
3.  **断言**：对返回值或与模拟对象的交互进行断言，以验证正确性。

在一个简单的测试中，可能没有任何行为要安排，并且可以通过在断言中内联对被测代码的调用来组合行为和断言阶段。对于更复杂的情况，如果您坚持这 3 个阶段，您的测试将更具可读性。

这是一个示例测试文件（从真实的东西中简化）。

```javascript
suite('Flyout', function() {
  setup(function() {
    sharedTestSetup.call(this);
    this.toolboxXml = document.getElementById('toolbox-simple');
    this.workspace = Blockly.inject('blocklyDiv', { toolbox: this.toolboxXml });
  });
  teardown(function() {
    sharedTestTeardown.call(this);
  });
  suite('simple flyout', function() {
    setup(function() {
      this.flyout = this.workspace.getFlyout();
    });
    test('y is always 0', function() {
      // Act and assert stages combined for simple test case
      chai.assert.equal(
        this.flyout.getY(),
        0,
        'y coordinate in vertical flyout is 0'
      );
    });
    test('x is right of workspace if flyout at right', function() {
      // Arrange
      sinon
        .stub(this.flyout.targetWorkspace, 'getMetrics')
        .returns({ viewWidth: 100 });
      this.flyout.targetWorkspace.toolboxPosition = Blockly.TOOLBOX_AT_RIGHT;
      this.flyout.toolboxPosition_ = Blockly.TOOLBOX_AT_RIGHT;
      // Act
      var x = this.flyout.getX();
      // Assert
      chai.assert.equal(x, 100, 'x is right of workspace');
    });
  });
});
```

此示例中需要注意的事项：

- 一个套件可以包含具有附加`setup`和`teardown` 方法的其他套件。
- 每个套件和测试都有一个描述性名称。
- Chai 断言用于对代码进行断言。
  - 您可以提供一个可选的字符串参数，如果测试失败将显示该参数。这使得调试损坏的测试变得更容易。
  - 参数的顺序是`chai.assert.equal(actualValue, expectedValue, optionalMessage)`。如果您交换`actual`and `expected`，错误消息将没有意义。
- 当您不想调用真实代码时，Sinon 用于存根方法。在这个例子中，我们不想调用真正的度量函数，因为它与这个测试无关。我们只关心被测方法如何使用结果。Sinon 对`getMetrics`函数进行存根以返回一个预设响应，我们可以在测试断言中轻松检查该响应。
- 每个套件的`setup`方法应该只包含适用于所有测试的通用设置。如果对特定行为的测试依赖于特定条件，则应在相关测试中明确说明该条件。

### 调试测试

- 您可以在浏览器中打开测试并使用开发人员工具设置断点并调查您的测试是否意外失败（或意外通过！）。
- 在测试或套件上设置`.only()`或`.skip()`以仅运行该组测试，或跳过测试。例如：

  ```javascript
  suite.only('Workspace', function() {
    suite('updateToolbox', function() {
      test('test name', function() {
        // ...
      });
      test.skip('test I don’t care about', function() {
        // ...
      });
    });
  });
  ```

  请记住在提交代码之前删除这些。

## 块生成器测试

每个块都有自己的单元测试。这些测试验证块生成的代码比预期的功能。

1.  `tests/generators/index.html`在 Firefox 或 Safari 中加载。请注意，Chrome 和 Opera 具有阻止从本地“file://”系统加载测试的安全限制（问题[41024](https://code.google.com/p/chromium/issues/detail?id=41024) 和[47416](https://code.google.com/p/chromium/issues/detail?id=47416)）。
2.  从下拉菜单中选择系统的相关部分进行测试，然后单击“加载”。块应该出现在工作区中。
3.  点击“JavaScript”。  
    在 JavaScript 控制台中复制并运行生成的代码。如果输出以“OK”结束，则测试通过。
4.  点击“Python”。[在 Python 解释器](https://repl.it/languages/python)  
    中复制并运行生成的代码。如果输出以“OK”结束，则测试通过。[](https://repl.it/languages/python)
5.  点击“PHP”。[复制并在 PHP 解释器](https://repl.it/languages/php)  
    中运行生成的代码。如果输出以“OK”结束，则测试通过。[](https://repl.it/languages/php)
6.  点击“Lua”。[复制并在 Lua 解释器](https://repl.it/languages/lua)  
    中运行生成的代码。如果输出以“OK”结束，则测试通过。[](https://repl.it/languages/lua)
7.  点击“飞镖”。[复制并在 Dart 解释器](https://dartpad.dartlang.org/)  
    中运行生成的代码。如果输出以“OK”结束，则测试通过。[](https://dartpad.dartlang.org/)

## 编辑块生成器测试

1.  `tests/generators/index.html`在浏览器中加载。
2.  从下拉菜单中选择系统的相关部分，然后单击“加载”。块应该出现在工作区中。
3.  对块进行任何更改或添加。
4.  单击“XML”。
5.  将生成的 XML 复制到`tests/generators/`.
