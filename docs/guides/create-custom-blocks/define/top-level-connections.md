# 顶层连接

块有三种可选的顶层连接：

- `nextStatement`
- `previousStatement`
- `output`

## 语句连接

用户可以通过 `nextStatement` 和 `previousStatement` 把块纵向堆叠成语句序列。  
在 Blockly 的默认布局中，这两个连接分别位于块底部和顶部。

带 `previousStatement` 的块不能再有 `output`。  
通常把没有 `output` 的块称为语句块，语句块一般同时具有 `previousStatement` 和 `nextStatement`。

`nextStatement` 与 `previousStatement` 也支持类型约束，具体可见[连接检查](/guides/create-custom-blocks/type-checks)。

### 下一个连接

下一个连接会在块底部生成一个连接点，允许其它语句块接在下方。  
如果一个块只有下一个连接、没有上一个连接，这类块通常表示事件入口，也可以配置为带起始帽，见[应用设计页](/guides/design/applications.html#事件驱动程序)。

![下一个连接示意](/static/blockly/images/set-next-statement.png)

#### JSON

未指定类型：

```javascript
{
  ...,
  "nextStatement": null,
}
```

指定类型（较少使用）：

```javascript
{
  "nextStatement": "Action",
  ...
}
```

#### JavaScript

未指定类型：

```javascript
this.setNextStatement(true); // false 表示不设置下一个连接（默认）
```

指定类型（较少使用）：

```javascript
this.setNextStatement(true, 'Action');
```

### 上一个连接

上一个连接会在块顶部生成一个凹槽，使当前块可作为语句栈中的一环。  
带上一个连接的块不能再有输出连接。

![上一个连接示意](/static/blockly/images/set-previous-statement.png)

#### JSON

未指定类型：

```javascript
{
  ...,
  "previousStatement": null,
}
```

指定类型（较少使用）：

```javascript
{
  "previousStatement": "Action",
  ...
}
```

#### JavaScript

未指定类型：

```javascript
this.setPreviousStatement(true); // false 表示不设置上一个连接（默认）
```

指定类型（较少使用）：

```javascript
this.setPreviousStatement(true, 'Action');
```

## 输出连接

一个块可以有一个输出连接，通常位于前缘，形状类似拼图凸起。  
输出连接用于接到值输入；带输出连接的块通常称为值块。

![输出连接示意](/static/blockly/images/set-output.png)

#### JSON

未指定类型：

```javascript
{
  // ...,
  "output": null,
}
```

指定类型：

```javascript
{
  // ...,
  "output": "Number",
}
```

#### JavaScript

未指定类型：

```javascript
init: function() {
  // ...
  this.setOutput(true);
}
```

指定类型：

```javascript
init: function() {
  // ...
  this.setOutput(true, 'Number');
}
```

带输出连接的块不能同时拥有上一个连接。
