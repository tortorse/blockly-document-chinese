# 元素

在[测量阶段](/guides/create-custom-blocks/renderers/concepts/info)，块会被拆分为[行](/guides/create-custom-blocks/renderers/concepts/rows)。每一行包含不重叠的元素与元素间距。

## 元素

元素表示块上的可见内容，常见包括：

- 字段
- 图标
- 连接
- 角

![元素示意](/static/blockly/images/rendering/debug-renderer/element.png)

每个元素都是一个矩形区域，用于描述对应可见内容的边界，并携带该元素类型需要的附加数据。

元素边界通常由其所代表的外部对象决定。  
例如字段元素对应字段对象，其尺寸由字段的 [`getSize`](https://developers.google.com/blockly/reference/js/blockly.field_class.getsize_1_method) 方法决定。

## 元素间距

元素间距是同一行中两个元素之间的空白区域。

![元素间距示意](/static/blockly/images/rendering/debug-renderer/element-spacer.png)

元素间距的边界由[渲染信息](/guides/create-custom-blocks/renderers/concepts/info)在测量阶段决定。  
渲染信息在测量完元素后，会按规则插入间距。间距大小不要求一致，常会根据左右两侧元素类型而变化。
