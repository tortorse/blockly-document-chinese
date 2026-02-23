# 连接形状

连接形状的自定义有多种方式，复杂度逐步提升。  
这些方式都依赖先创建一个[自定义渲染器](/guides/create-custom-blocks/renderers/create-custom-renderers/basic-implementation)。

## 基础尺寸

![连接尺寸示例](/static/blockly/images/rendering/connection-shapes/overridden-connection-constants.png)

你可以只改连接的宽高，保留原始连接轮廓。做法是自定义[常量提供器](/guides/create-custom-blocks/renderers/concepts/constants)，覆盖对应常量。

不同渲染器使用的常量不完全一致，可先看各自参考文档：

- [base constants](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.constantprovider_class)
- [Geras constants](https://developers.google.com/blockly/reference/js/blockly.geras_namespace.constantprovider_class)
- [Zelos constants](https://developers.google.com/blockly/reference/js/blockly.zelos_namespace.constantprovider_class)

::: tip 提示
Thrasos 不单独定义常量，使用 base constants。
:::

对于基础渲染器，可覆盖：

- `NOTCH_WIDTH`、`NOTCH_HEIGHT`（上一个/下一个连接）
- `TAB_WIDTH`、`TAB_HEIGHT`（输入/输出连接）

```javascript
class CustomConstantProvider extends Blockly.blockRendering.ConstantProvider {
  constructor() {
    super();
    this.NOTCH_WIDTH = 20;
    this.NOTCH_HEIGHT = 10;
    this.TAB_HEIGHT = 8;
  }
}
```

## 基础形状

![连接形状示例](/static/blockly/images/rendering/connection-shapes/overridden-connection-shapes.png)

你可以直接覆盖连接轮廓本身。基础连接形状由宽、高和两条路径组成：

- `pathUp`
- `pathDown`

两条路径画的是同一形状，但方向相反。

![双向路径示意](/static/blockly/images/rendering/connection-shapes/shape-direction.png)

这是因为绘制块轮廓时，连接会在不同方向被绘制。

![绘制方向示意](/static/blockly/images/rendering/connection-shapes/drawing-direction.png)

::: tip 提示
[路径对象](/guides/create-custom-blocks/renderers/concepts/path-object)会处理 RTL 翻转，你只需按 LTR 思路定义路径。
:::

可覆盖：

- [`makeNotch`](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.constantprovider_class.makenotch_1_method)
- [`makePuzzleTab`](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.constantprovider_class.makepuzzletab_1_method)

```javascript
class CustomConstantProvider extends Blockly.blockRendering.ConstantProvider {
  makePuzzleTab() {
    const width = this.TAB_WIDTH;
    const height = this.TAB_HEIGHT;
    return {
      type: this.SHAPES.PUZZLE,
      width,
      height,
      pathUp: Blockly.utils.svgPaths.line([
        Blockly.utils.svgPaths.point(-width, -height / 2),
        Blockly.utils.svgPaths.point(width, -height / 2),
      ]),
      pathDown: Blockly.utils.svgPaths.line([
        Blockly.utils.svgPaths.point(-width, height / 2),
        Blockly.utils.svgPaths.point(width, height / 2),
      ]),
    };
  }
}
```

路径字符串可参考 [MDN SVG Paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)。`Blockly.utils.svgPaths` 是对路径字符串的简化封装。

## 按连接检查切换形状

![按类型切换形状](/static/blockly/images/rendering/connection-shapes/connection-check-specific-shapes.png)

还可以按连接检查动态返回不同形状。  
例如字符串连接用三角形，布尔连接用圆角。

实现方式是覆盖 [`shapeFor`](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.constantprovider_class.shapefor_1_method)，并在 `init` 阶段初始化要返回的形状对象。

连接检查规则见[连接检查](/guides/create-custom-blocks/inputs/connection-checks)。

```javascript
export class ConstantProvider extends Blockly.blockRendering.BaseConstantProvider {
  shapeFor(connection) {
    let check = connection.getCheck();
    if (!check && connection.targetConnection) {
      check = connection.targetConnection.getCheck();
    }
    if (check && check.includes('String')) return this.TRIANGULAR_TAB;
    if (check && check.includes('Boolean')) return this.ROUND_TAB;
    return super.shapeFor(connection);
  }
}
```

## 自定义输入

如果你希望某些连接与其他连接不同，但不是按连接检查区分，可通过“自定义输入”实现。

例如希望某些值输入像语句输入一样缩进，就可以定义新的输入类型。

### 创建自定义输入类

先按[创建自定义输入](/guides/create-custom-blocks/inputs/creating-custom-inputs)完成输入类型本身。

### 创建可测量对象

你需要给该输入提供对应可测量对象。通常继承 `Blockly.blockRendering.InputConnection`。

```javascript
export class CustomInputMeasurable extends Blockly.blockRendering.InputConnection {
  constructor(constants, input) {
    super(constants, input);
  }
}
```

### 在渲染信息中实例化

在自定义 `RenderInfo` 中覆盖 `addInput_`，把你的输入转换为自定义可测量对象。

```javascript
export class RenderInfo extends Blockly.blockRendering.RenderInfo {
  addInput_(input, activeRow) {
    if (input instanceof CustomInput) {
      activeRow.elements.push(
        new CustomInputMeasurable(this.constants_, input),
      );
    }
    super.addInput_(input, activeRow);
  }
}
```

### 可选：触发新行

默认输入不会自动新起一行。  
若需要，可覆盖 `shouldStartNewRow_`。

```javascript
export class RenderInfo extends Blockly.blockRendering.RenderInfo {
  shouldStartNewRow_(currInput, prevInput) {
    if (prevInput instanceof CustomInput) return true;
    return super.shouldStartNewRow_(currInput, prevInput);
  }
}
```

### 可选：定义输入形状常量

建议像 `notch` 和 `tab` 一样，把自定义输入形状抽到常量中，便于维护和复用。

### 在绘制器里绘制

最后在[绘制器](/guides/create-custom-blocks/renderers/concepts/drawer)中添加该输入的绘制逻辑。

自定义输入可能：

- 影响块外轮廓（类似语句输入）
- 影响块内部结构（类似内联值输入）

![影响外轮廓](/static/blockly/images/rendering/connection-shapes/outline-inputs.png)
![影响内部结构](/static/blockly/images/rendering/connection-shapes/internal-inputs.png)

如果影响外轮廓，覆盖 [`drawOutline_`](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.drawer_class.drawoutline__1_method)；否则覆盖 [`drawInternals_`](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.drawer_class.drawinternals__1_method)。

```javascript
export class Drawer extends Blockly.blockRendering.Drawer {
  drawOutline_() {
    this.drawTop_();
    for (let r = 1; r < this.info_.rows.length - 1; r++) {
      const row = this.info_.rows[r];
      if (row.getLastInput() instanceof CustomInputMeasurable) {
        this.drawCustomInput(row);
      } else if (row.hasJaggedEdge) {
        this.drawJaggedEdge_(row);
      } else if (row.hasStatement) {
        this.drawStatementInput_(row);
      } else if (row.hasExternalInput) {
        this.drawValueInput_(row);
      } else {
        this.drawRightSideRow_(row);
      }
    }
    this.drawBottom_();
    this.drawLeft_();
  }
}
```
