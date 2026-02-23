# 保存和加载图标

有些图标有需要持久化的状态，也有些图标是根据已有状态自动创建的。比如注释图标需要保存文本，而警告图标通常不需要，因为它会根据块连接关系自动生成。

如果图标需要保存状态，就要实现 `ISerializable` 接口，并且[注册图标类](#注册图标类)。

图标返回的状态会写入块状态中的 `icons` 字段：

```javascript
{
  'blocks': {
    'languageVersion': 0,
    'blocks': [
      {
        'type': 'my_block',
        'icons': {
          // Your state goes here!
          'my_icon': 'some state',
        }
      }
    ]
  }
}
```

::: warning 重要
自定义图标的保存与加载仅支持新的 JSON 序列化系统，不支持旧的 XML 序列化系统。
:::

## 保存状态

要保存图标状态，需要实现 `ISerializable` 的 `saveState` 方法。该方法可以返回任意 JSON 兼容数据，后续会传给 `loadState`。

```javascript
saveState() {
  return this.state;  // Some arbirtary JSON-compatible data.
}
```

### 完整序列化与后备数据

`saveState` 还会接收可选参数 `doFullSerialization`。当图标依赖于由其他序列化器保存的状态（例如后备数据模型）时，会用到这个参数。它表示反序列化时这些被引用状态不可用，因此图标需要把后备状态本身完整序列化进去。

典型场景包括：

- 单独加载某个块到工作区时，如果对应后备数据模型不存在，图标可凭自身状态创建新的数据模型。
- 块复制粘贴时，图标总是创建新的后备数据模型，而不是引用旧模型。

## 加载状态

要加载图标状态，需要实现 `ISerializable` 的 `loadState` 方法。该方法接收 `saveState` 返回的 JSON 数据。

```javascript
loadState(state) {
  this.state = state;
}
```

## 注册图标类

最后需要注册图标类，让序列化系统能够实例化它。用于注册的 `IconType` 字符串，必须和 `getType` 返回的字符串一致。

```javascript
class myIcon extends Blockly.icons.Icon {
  getType() {
    return new Blockly.icons.IconType('my_icon');
  }
}

Blockly.icons.registry.register(
    new Blockly.icons.IconType('my_icon'), myIcon);
```
