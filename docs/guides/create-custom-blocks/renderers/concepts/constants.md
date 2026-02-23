# 常量提供器

[`ConstantProvider` 类](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.constantprovider_class)维护一组魔法数字、形状和字符串，供其他渲染组件及内置字段复用。

所有常量都应在运行期保持不变。  
运行时修改这些值容易导致渲染异常。

## 连接形状

常量提供器定义了连接器的标准形状：

- [`Notch`](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.constantprovider_class.notch_property)用于上一个连接和下一个连接
- [`PuzzleTab`](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.constantprovider_class.puzzle_tab_property)用于输入连接和输出连接

这些命名基于默认渲染器的外观。

### 基于连接检查的形状

常量提供器还可以根据连接检查动态决定连接形状。  
这通过 [`shapeFor`](https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.constantprovider_class.shapefor_1_method) 方法实现。

连接检查规则见[连接检查](/guides/create-custom-blocks/inputs/connection-checks)。

## 其他路径

常量提供器还定义了块的其他路径片段，例如折叠块的锯齿边。

## 其他数值

常量提供器也定义了多种布局数值，例如：

- 不同元素之间的间距
- 行的最小高度
