# 创建自定义过程块

创建自定义过程块需要：

1. 安装 [@blockly/block-sharable-procedures](https://www.npmjs.com/package/@blockly/block-sharable-procedures) 插件，如 [使用过程页面](/guides/create-custom-blocks/procedures/using-procedures.html) 所述。
2. 使用 JSON 序列化系统，如 [概述页面](/guides/create-custom-blocks/procedures/overview.html) 所述。

## 将数据模型添加到工作区

过程定义和过程调用器块都引用了一个支持数据模型，该数据模型定义了过程的签名（名称、参数和返回）。这使得您在设计应用程序时可以更灵活（例如，您可以允许在一个工作区中定义过程，并在另一个工作区中引用它）。

这意味着您需要将过程数据模型添加到工作区，以使您的块正常工作。有许多方法可以做到这一点（例如，自定义 UI）。

[@blockly/block-sharable-procedures](https://www.npmjs.com/package/@blockly/block-sharable-procedures) 通过使过程定义块在实例化到工作区时动态创建其支持数据模型来实现这一点。要自己实现这一点，您可以在 `init` 中创建模型，然后在 `destroy` 中删除它。

```javascript
import {ObservableProcedureModel} from '@blockly/block-sharable-procedures';

Blockly.Blocks['my_procedure_def'] = {
  init: function() {
    this.model = new ObservableProcedureModel('default name');
    this.workspace.getProcedureMap().add(model);
    // etc...
  }

  destroy: function() {
    // Optionally:
    // Destroy the model when the definition block is deleted.
    this.workpace.getProcedureMap().delete(model.getId());
  }
}
```

## 返回有关块的信息

您的过程定义和过程调用块需要实现 `getProcedureModel`、`isProcedureDef` 和 `getVarModels` 方法。这些是 Blockly 代码用来获取有关您过程块的信息的钩子。

```javascript
Blockly.Blocks['my_procedure_def'] = {
  getProcedureModel() {
    return this.model;
  },

  isProcedureDef() {
    return true;
  },

  getVarModels() {
    // If your procedure references variables
    // then you should return those models here.
    return [];
  }
};

Blockly.Blocks['my_procedure_call'] = {
  getProcedureModel() {
    return this.model;
  },

  isProcedureDef() {
    return false;
  },

  getVarModels() {
    // If your procedure references variables
    // then you should return those models here.
    return [];
  }
};
```

## 在更新时触发重新渲染

您的过程定义和过程调用块需要实现 `doProcedureUpdate` 方法。这是数据模型调用以告诉您的过程块重新渲染自己的钩子。

```javascript
Blockly.Blocks['my_procedure_def'] = {
  doProcedureUpdate() {
    this.setFieldValue('NAME', this.model.getName());
    this.setFieldValue(
        'PARAMS',
        this.model.getParameters()
            .map((p) => p.getName())
            .join(','));
    this.setFieldValue(
        'RETURN', this.model.getReturnTypes().join(',');
  }
};

Blockly.Blocks['my_procedure_call'] = {
  doProcedureUpdate() {
    // Similar to the def block above...
  }
};
```

## 添加自定义序列化

过程块的序列化必须做两件事。1) 当从 JSON 加载时，您的块需要获取对其支持数据模型的 引用，因为块和模型是分开序列化的。2) 当复制和粘贴过程块时，块需要序列化其过程模型的整个状态，以便可以复制/重复。

这两件事都通过 `saveExtraState` 和 `loadExtraState` 来处理。注意，自定义过程块仅在使用 JSON 序列化系统时受支持，因此我们只需要定义 JSON 序列化钩子。

```javascript
import {
    ObservableProcedureModel,
    ObservableParameterModel,
    isProcedureBlock
} from '@blockly/block-sharable-procedures';

Blockly.Blocks['my_procedure_def'] = {
  saveExtraState() {
    return {
      'procedureId': this.model.getId(),

      // These properties are only necessary for pasting.
      'name': this.model.getName(),
      'parameters': this.model.getParameters().map((p) => {
        return {name: p.getName(), p.getId()};
      },
      'returnTypes': this.model.getReturnTypes(),
    };
  },

  loadExtraState(state) {
    const id = state['procedureId']
    const map = this.workspace.getProcedureMap();

    // Grab a reference to the existing procedure model.
    if (this.model.getId() != id && map.has(id) &&
        (this.isInsertionMarker || this.noBlockHasClaimedModel_(id)) {
      // Delete the existing model (created in init).
      this.workspace.getProcedureMap().delete(model.getId());
      // Grab a reference to the new model.
      this.model = this.workspace.getProcedureMap()
          .get(state['procedureId']);
      this.doProcedureUpdate();
      return;
    }

    // There is no existing procedure model (we are likely pasting), so
    // generate it from JSON.
    this.model
        .setName(state['name'])
        .setReturnTypes(state['returnTypes']);
    for (const [i, param] of state['parameters'].entries()) {
      this.model.insertParameter(
          i,
          new ObservableParameterModel(
              this.workspace, param['name'], param['id']));
    }
  },

  // We don't want to reference a model that some other procedure definition
  // is already referencing.
  noBlockHasClaimedModel_(procedureId) {
    const model =
      this.workspace.getProcedureMap().get(procedureId);
    return this.workspace.getAllBlocks(false).every(
      (block) =>
        !isProcedureBlock(block) ||
        !block.isProcedureDef() ||
        block.getProcedureModel() !== model);
  },
};

Blockly.Blocks['my_procedure_call'] = {
  saveExtraState() {
    return {
      'procedureId': this.model.getId(),
    };
  },

  loadExtraState(state) {
    // Delete our existing model (created in init).
    this.workspace.getProcedureMap().delete(model.getId());
    // Grab a reference to the new model.
    this.model = this.workspace.getProcedureMap()
        .get(state['procedureId']);
    if (this.model) this.doProcedureUpdate();
  },

  // Handle pasting after the procedure definition has been deleted.
  onchange(event) {
    if (event.type === Blockly.Events.BLOCK_CREATE &&
        event.blockId === this.id) {
      if(!this.model) { // Our procedure definition doesn't exist =(
        this.dispose();
      }
    }
  }
};
```

## 可选地修改过程模型/签名

您还可以为用户添加修改过程模型/签名的功能。调用 `insertParameter`、`deleteParameter` 或 `setReturnTypes` [方法](https://developers.google.com/reference/js/blockly.procedures_namespace.iproceduremodel_interface) 将自动触发您的块重新渲染（通过 `doProcedureUpdate`）。

创建用于修改过程模型的 UI 的选项包括使用 [变异器](/guides/create-custom-blocks/extensions.html#ui_hooks)（内置过程块使用）、带有点击处理程序的图像字段，完全独立于 Blockly 的内容等。

Blockly 的内置动态过程类别特定于 Blockly 的内置过程块。因此，要访问您的块，您需要定义自己的 [自定义动态类别](/guides/configure/toolbox#dynamic_categories.html)，并将其 [添加到工具箱](/guides/configure/toolbox.html#json)。

```javascript
const proceduresFlyoutCallback = function(workspace) {
  const blockList = [];
  blockList.push({
    kind: 'block',
    type: 'my_procedure_def'
  });
  for (const model of workspace.getProcedureMap().getProcedures()) {
    blockList.push({
      kind: 'block',
      type: 'my_procedure_call',
      extraState: {
        procedureId: model.getId()
      }
    });
  }
  return blockList;
};

myWorkspace.registerToolboxCategoryCallback(
  'MY_PROCEDURES',
  proceduresFlyoutCallback
);
```
