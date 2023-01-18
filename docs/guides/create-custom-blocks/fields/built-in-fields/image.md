# 图片字段

图片字段存储字符串作为其值，存储字符串作为其文本。其值是图片的 src，而其文本是描述/表示图片的替代字符串。

#### 图片字段

![](./image/on_block.png)

#### 展开前块上的图片字段

![](./image/collapsed.png)

## 创建

:::: tabs
::: tab JSON

```json
{
  "type": "example_image",
  "message0": "image: %1",
  "args0": [
    {
      "type": "field_image",
      "src": "https://www.gstatic.com/codesite/ph/images/star_on.gif",
      "width": 15,
      "height": 15,
      "alt": "*"
    }
  ]
}
```

:::
::: tab JavaScript

```javascript
Blockly.Blocks['example_image'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('image:')
      .appendField(
        new Blockly.FieldImage(
          'https://www.gstatic.com/codesite/ph/images/star_on.gif',
          15,
          15,
          '*'
        )
      );
  }
};
```

:::
::::

图片构造函数可接受：

| 参数          | 说明                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| `src`         | 指向 [光栅图片](https://developer.mozilla.org/en-US/docs/Glossary/raster_image)文件的字符串。                       |
| `width`       | 必须转换为非零数字。                                                                                                |
| `height`      | 必须转换为非零数字。                                                                                                |
| `opt_alt`     | （可选）可准确描述/表示图片的字符串。如果值是 `null` 或 `undefined`，将使用空字符串。                               |
| `opt_onClick` | （可选）在用户点击字段时调用的函数。                                                                                |
| `opt_flipRtl` | （可选）布尔值。如果为 `true`，则在从右到左模式下，图片会沿垂直轴翻转。默认值为 `false`。适用于“左转”和“向右”图标。 |

## 序列化

映像字段不可序列化。

## 点击处理程序

:::tip
**注意**：如需查看有关校验器的一般信息，请参阅[校验器](/guides/create-custom-blocks/fields/validators.html)。
:::
图片字段不接受验证器，而是明确接受每当用户点击字段时都会调用的函数。也就是说，图片可以像按钮一样存在于按钮上。

*点击处理程序*可通过 [JavaScript 构造函数](#创建) 或使用 [setOnClickHandler](https://developers.google.com/blockly/reference/js/Blockly.FieldImage#setOnClickHandler) 函数进行设置。_

以下是一个在调用时收起代码块的点击处理程序示例。

```javascript
function() {
    this.getSourceBlock().setCollapsed(true);
}
```

![](./image/click_handler.gif)
