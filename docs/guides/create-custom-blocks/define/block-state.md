# 块状态

块实例有一组状态属性，用于控制用户可执行的操作。  
这些状态可以在块定义中设置，也常用于根据业务规则限制工作区内块的行为，或聚焦用户操作范围（如教程场景）。

## 可删除状态

```javascript
block.setDeletable(false);
```

当设置为 `false` 时，用户不能删除该块。  
在可编辑工作区中，块默认可删除。

即使块不可删除，也可以通过代码删除：

```javascript
block.dispose();
```

## 可编辑状态

```javascript
block.setEditable(false);
```

当设置为 `false` 时，用户不能修改块字段（如下拉框、文本输入）。  
在可编辑工作区中，块默认可编辑。

## 可移动状态

```javascript
block.setMovable(false);
```

当设置为 `false` 时，用户不能直接拖动该块。  
若一个不可移动块是其他块的子块，则不能把它从父块上直接拆下；但移动父块时它会跟随移动。  
在可编辑工作区中，块默认可移动。

即使块不可移动，只要它已经在工作区中，仍可通过代码移动：

```javascript
block.moveBy(dx, dy);
```

块放入工作区后的默认起始位置是 `(0, 0)`。

## 块数据

```javascript
block.data = '16dcb3a4-bd39-11e4-8dfc-aa07a5b093db';
```

`data` 是附加在块上的可选字符串，可存放任意业务数据。  
块序列化时会一并保存这段数据，包括复制、粘贴和克隆时。

常见用法是把块与外部资源建立关联。

序列化为 JSON 时，`data` 会作为块的顶层属性保存：

```json
{
  "type": "my_block",
  "data": "16dcb3a4-bd39-11e4-8dfc-aa07a5b093db"
}
```

序列化为 XML（旧的冻结序列化体系）时，`data` 存在块内部的 `<data></data>` 标签中：

```xml
<block type="my_block">
  <data>16dcb3a4-bd39-11e4-8dfc-aa07a5b093db</data>
</block>
```
