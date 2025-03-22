# 应用设计

在设计使用 Blockly 的应用程序时，有几种范式可供选择。由于这些选择会影响用户需要的块，因此应该尽早考虑这些选择。

## 配置

许多 Blockly 应用程序用于描述配置，而不是可执行程序。配置类应用程序通常从在工作区初始化一个根级别块开始。Blockly 开发者工具中的块工厂选项卡就是一个很好的例子：

![一个用于设计其他块的块。用户可以指定块名称、块输入、输入是内部还是外部等。](/static/blockly/images/configuration.png)

```javascript
Blockly.Blocks['factory_base'] = {
  init: function () {
    this.setDeletable(false);
    this.setMovable(false);
    this.setEditable(false);
    // 等等...
  },
};

Blockly.serialization.blocks.append({ type: 'factory_base' }, workspace);
```

这会创建一个不可删除、不可移动的块，用于保存用户的所有配置。可以随时序列化工作区以确定当前配置。

这类应用程序可能希望自动禁用任何未连接到根块的块。这可以通过一行代码实现：

```javascript
workspace.addChangeListener(Blockly.Events.disableOrphans);
```

## 串行程序

大多数 Blockly 应用程序都被设计用来创建串行程序。用户将块堆叠在一起，按顺序执行。

![A stack of blocks with commands to move, turn left, and move again.](/static/blockly/images/stack.png)

工作区上的每个（未禁用的）积木都将成为程序的一部分。如果有多个积木堆叠，较高的会先执行。（如果两个堆叠的高度大致相同，左侧的堆叠（在 RTL 模式下是右侧）优先级更高。）

工作区可以随时导出为可执行代码。这些代码可以在客户端使用 JavaScript（使用 eval 或 JS 解释器）执行，也可以在服务器端使用任何语言执行。

工作区可以随时导出为可执行代码。这些代码可以在客户端使用 JavaScript（使用 eval 或 JS 解释器）执行，也可以在服务器端使用任何语言执行。

```javascript
import { javascriptGenerator } from 'blockly/javascript';

var code = javascriptGenerator.workspaceToCode(workspace);
```

## 并行程序

一些 Blockly 应用程序选择并行执行所有积木堆叠，而不是串行执行。例如，一个音乐应用程序中，鼓循环与旋律同时运行。

实现并行执行的一种方法是分别为每个积木生成代码：

```javascript
import { javascriptGenerator } from 'blockly/javascript';

var json = Blockly.serialization.workspaces.save(workspace);

// 单独存储顶层积木，并从 JSON 中移除它们
var blocks = json['blocks']['blocks'];
var topBlocks = blocks.slice(); // Create shallow copy.
blocks.length = 0;

// 将每个积木单独加载到工作区并生成代码
var allCode = [];
var headless = new Blockly.Workspace();
for (var i = 0; block < topBlocks.length; i++) {
  var block = topBlocks[i];
  blocks.push(block);
  Blockly.serialization.workspaces.load(json, headless);
  allCode.push(javascriptGenerator.workspaceToCode(headless));
  blocks.length = 0;
}
```

如果目标语言是 JavaScript，则可以使用 `allCode` 数组创建多个 JS 解释器以实现同时执行。如果目标语言是 Python 之类的语言，则可以将 `allCode` 数组组装成一个使用线程模块的单个程序。

与任何并行程序一样，需要仔细考虑如何处理变量和函数等共享资源。

## 事件驱动程序

事件处理程序只是由系统调用而不是由程序调用的函数。这些积木可以包含要执行的积木堆叠，也可以作为积木堆叠顶部的头部

![Two "on mouse click" blocks, one with a statement input and one with a next connection.](/static/blockly/images/event1.png)

S 一些开发者喜欢在事件积木的顶部添加"帽子"，使其看起来与其他积木不同。这不是 Blockly 的默认外观，但可以通过将渲染器常量 ADD_START_HATS 覆盖为 `true` ([自定义渲染器代码实验室 - 覆盖常量](https://blocklycodelabs.dev/codelabs/custom-renderer/index.html?index=..%2F..index#3))来添加，或者通过添加主题并在积木样式上设置帽子选项。有关在主题中设置积木帽子的更多信息，请参见 [这里](/guides/configure/web/themes#block_style).

![The same "on mouse click" blocks with hats, which form a hump on top of the block.](/static/blockly/images/event2.png)

在事件驱动模型中，为程序启动添加一个处理程序也是有意义的。在这种模型下，工作区中任何未连接到事件处理程序的积木都会被忽略且不会执行。

在设计使用事件的系统时，请考虑是否可能或需要支持同一事件处理程序的多个实例。

## 工作区布局

从左到右布局屏幕有两种合理的方式。一种方式是工具栏在左侧，工作区在中间，输出可视化在右侧。这种布局被 Scratch 第 1 版以及 Made with Code 使用。

![An application with the toolbar on the left, the workspace in the middle, and a maze (the output visualization) on the right.](/static/blockly/images/mistakes08a.png)

另一种方式是输出可视化在左侧，工具栏在中间，工作区在右侧。这种布局被 Scratch 第 2 版以及大多数 Blockly 应用程序使用。

![An application with a maze (the output visualization) on the left, the toolbar in the middle, and the workspace on the right.](/static/blockly/images/mistakes08b.png)

无论哪种情况，工作区都应该延伸以占用可用的屏幕空间 —— 用户需要尽可能多的编程空间。从上面的截图可以看出，第一种布局在宽屏上表现不佳，因为用户的代码和输出可视化是分开的。而第二种布局为更大的程序提供了额外空间，同时仍然保持所有三个部分紧密相连。

从逻辑上讲，让用户首先考虑他们试图解决的问题，然后查看提供的工具，最后才开始编程也是有意义的。

当然，对于阿拉伯语和希伯来语翻译，整个顺序需要翻转。

在某些情况下，例如使用少量简单积木时，将工具箱放在工作区的上方或下方可能更有意义。Blockly 支持工具箱中的水平滚动，但应谨慎使用。

_建议：将程序可视化放在工具栏旁边。_