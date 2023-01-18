# 序列化 

序列化操作会保存工作区的状态，以便稍后将其重新加载到工作区。这包括将要保存的所有代码块、变量或插件的状态序列化。您可以将需要保存的所有数据转换为基于文本的格式，以方便存储，之后再将该数据加载回功能齐全的工作区。

Blockly 为这种数据提供了两种格式：JSON 和 XML。我们建议您为新项目使用 JSON 系统，并鼓励使用 XML 的旧版项目进行升级。XML 系统是旧版保存格式。该版本不会移除，但不会获得新功能。

## JSON 系统

::: tip 提示
注意：如需了解如何从 XML 迁移到 JSON，请参阅 [迁移指南](https://docs.google.com/document/d/1wv5ORrO4icVHeU15FLSn37mdNLyJpQbMTo7mmTqsGl0/edit?usp=sharing)。
:::

JSON 序列化系统由多个序列化器组成。其中提供了块和变量的内置序列化器，您还可以注册其他序列化器。每个序列化器负责对特定插件或系统的状态进行序列化和反序列化。

## APIs

您需要的基本调用包括 `Blockly.serialization.workspaces.save(workspace)`（用于保存工作区状态）和 `Blockly.serialization.workspaces.load(stateToLoad, workspace)`（用于将已保存的状态加载到工作区中）。

需详细了解 JSON 序列化器 API，请参阅 [参考文档](https://developers.google.com/blockly/reference/js/blockly.serialization_namespace.workspaces_namespace)。您还可以序列化单个 [块](https://developers.google.com/blockly/reference/js/blockly.serialization_namespace.blocks_namespace)。

### 反序列化顺序

JSON 系统具有明确的反序列化顺序，可让您更轻松地防止在保存过程中出现重复状态。

调用 `Blockly.serialization.workspaces.load` 时，系统会按照_优先级_为序列化器提供状态来反序列化。[序列化器](/guides/configure/serialization#serializer_hooks.html) 部分对此做了进一步说明，其目的是允许序列化器依赖于来自其他系统的状态。

内置序列化器的反序列化顺序如下：

1.  **变量反序列化。**
2.  **块是反序列化的。** 各个堆栈/顶级代码块按_任意顺序_进行反序列化。

    a.  **类型反序列化。** 这会触发代码块的 init 方法、扩展程序混合等。

    b.  **属性是反序列化的。** 这包括可以应用于任何块的属性。例如：x、y、已收起、已停用、数据等。

    c.  **Extra 状态是反序列化的。** 如需了解详情，请参阅 [扩展程序和转变器](/guides/create-custom-blocks/extensions.html) 文档。

    d.  **代码块连接到其父项（如果存在）。**

    e.  **图标是反序列化的。** 各个图标按_任意顺序_进行反序列化。
    
    f.  **字段反序列化。** 各个字段按_任意顺序_进行反序列化。

    g.  **输入块是反序列化的。** 这包括连接到值输入和语句输入的块。各个输入按任意顺序进行反序列化。

    h.  **后续代码块会反序列化。**

### 何时保存额外状态

对于代码块，如果您的某些项依赖于顺序中较高的项，则应复制该数据并将其添加到额外状态。

例如，如果您的某个字段仅在连接下一个代码块时存在，则应将有关下一个代码块的信息添加到额外状态，以便可以在该字段的状态反序列化之前将该代码添加到代码块中。

但是，如果您的输入仅在字段具有特定值时存在，您就无需将该字段的相关信息添加到额外状态。这是因为字段的状态会先被反序列化，如果是，您就可以将输入添加到代码块中。添加输入通常由 [校验器](/guides/create-custom-blocks/fields/validators.html#注册本地验证器) 触发。

请注意，有关复制状态的规则还应考虑块堆栈、图标、字段和输入块按任意顺序反序列化。例如，如果您有一个字段 B，仅当另一个字段 A 具有特定值时，该字段 B 才存在，则应将有关 A 的信息添加到额外状态，以防 B 在 A 之前反序列化。

### 块钩子

如需了解如何向块添加额外的序列化内容，请参阅 [扩展程序和变形器](/guides/create-custom-blocks/extensions.html) 文档。

### 字段钩子

如需了解如何对字段进行序列化，请参阅 [自定义字段](/guides/create-custom-blocks/fields/customizing-fields/creating.html#serialization) 文档。

### 序列化器钩子

通过 JSON 系统，您可以注册序列化器，以便对某些状态进行序列化和反序列化。Blockly 的内置序列化器负责序列化有关块和变量的信息，但如果您想序列化其他信息，则需要添加您自己的序列化器。例如，默认情况下，JSON 系统不会序列化工作区级注释。如果要将它们序列化，您需要注册额外的序列化器。

其他序列化器通常用于对插件的状态进行序列化和反序列化。

```javascript
Blockly.serialization.registry.register(
    'workspace-comments',  // Name
    {
      save: saveFn,      // Save function
      load: loadFn,      // Load function
      clear: clearFn,    // Clear function
      priority: 10,      // Priority
    });
```

注册序列化器时，必须提供以下几项：

- 序列化器的名称，数据也将保存在此名称下。
- 用于对与序列化器关联的插件/系统的状态执行 `save` 的函数。
- 用于对状态应用 `clear` 的函数。
- 用于对状态应用 `load` 的函数。
- `priority`，用于确定[反序列化顺序](/guides/configure/serialization.html#反序列化顺序)。
    
    您可以根据[内置优先级](https://developers.google.com/blockly/reference/js/blockly.serialization_namespace.priorities_namespace)来确定序列化器的优先级
    

调用 `Blockly.serialization.workspaces.save` 时，系统会调用每个序列化器的 `save` 函数，并将其数据添加到最终 JSON 输出中：

```javascript
{
  "blocks": { ... },
  "workspaceComments": [ // Provided by workspace-comments serializer
    {
      "x": 239,
      "y": 31,
      "text": "Add 2 + 2"
    },
    // etc...
  ]
}
```

调用 `Blockly.serialization.workspaces.load` 时，系统会按优先级顺序触发每个序列化器。优先级值较高的序列化器先于优先级值较低的序列化器触发。

触发序列化器后，会发生以下两种情况：

  1. 系统会调用提供的 `clear` 函数。这样可以确保在加载更多状态之前，插件/系统的状态是干净的。例如，workspace-comments 序列化器会从工作区中移除所有现有注释。
  2. 系统会调用提供的 `load` 函数。

## XML 系统

借助 XML 系统，您可以将工作区序列化为 XML 节点。这是 Blockly 的原始序列化系统。它现在已进行了 Box，这意味着它将不再接收新功能。因此，我们建议您尽可能使用 JSON 系统。

:::tip 提示
**注意**：如需了解如何迁移到 JSON，请参阅 [迁移指南](https://docs.google.com/document/d/1wv5ORrO4icVHeU15FLSn37mdNLyJpQbMTo7mmTqsGl0/edit?usp=sharing)。
:::

### APIs

如需了解 XML 系统的 API，请参阅 [参考文档](https://developers.google.com/blockly/reference/js/blockly.xml_namespace)。

### 块钩子

如需了解如何向块添加额外的序列化内容，请参阅[扩展程序和转变器](/guides/create-custom-blocks/extensions.html)文档。

### 字段钩子

如需了解如何对字段进行序列化，请参阅 [自定义字段](/guides/create-custom-blocks/fields/customizing-fields/creating.html#序列化) 文档。

## 在 JSON 和 XML 之间进行选择

我们建议使用 JSON 序列化器，而非 XML。通过 JSON 系统，您可以将工作区的状态序列化为 JavaScript 对象。这样做的好处在于：

1. JSON 易于压缩或转换为其他格式。
2. 通过编程方式，JSON 非常易于使用。
3. JSON 可以轻松扩展和附加数据。

此外，XML 系统将不再接收更新，并且与 JSON 序列化器相比，它已经缺少功能。例如，您可以注册自己的 JSON 序列化器，以便轻松保存和加载其他数据，例如用于插件的数据或已添加的自定义数据。在 XML 系统中无法做到这一点。

如果您之前使用过 XML 序列化，请参阅 [迁移指南](https://docs.google.com/document/d/1wv5ORrO4icVHeU15FLSn37mdNLyJpQbMTo7mmTqsGl0/edit?usp=sharing)，了解如何升级。