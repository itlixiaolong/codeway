# BEM 规范详解

## 命名规则

**block-name__elem-name--mod-name**

- 名称以小写字母书写
- 复杂单词由连字符（-）分隔
- 块名称为其元素和修饰符定义命名空间
- 元素名称与块名称由双下划线（__）分隔
- 修饰符名称与块或元素名称由双连字符（--）分隔

## 什么是 BEM

### B：Block（块）

本身就有意义的独立实体，可以重用的功能独立的页面组件。

**特征**：
- 不影响其环境，不应该为块设置外边距或定位
- 块可以相互嵌套

### E：Element（元素）

不能单独使用的块的复合部分，没有独立的含义并且在语义上与其块相关联。

**特征**：
- 元素全名的结构是 `block-name__element-name`
- 元素可以相互嵌套
- 元素始终是块的一部分，而不是另一个元素

### M：Modifier（修饰符）

块或元素上的标志，使用它们来改变外观、状态和行为。

**特征**：
- `block-name--modifier-name` 或 `block-name__element-name--modifier-name`
- 修饰符不能单独使用

## 为什么使用 BEM

1. **模块化**：块样式永远不会依赖于页面上的其他元素
2. **可重用性**：可以智能地重用，减少必须维护的 CSS 代码量
3. **结构**：BEM 方法提供简单易懂的坚实结构

## BEM 能解决的三个问题

1. 想知道选择器的作用，只需查看其名称即可
2. 想了解选择器的使用位置，只需查看它即可
3. 想了解类名之间的关系，只需查看它们即可

## 常见问题

### 1. 块结构复杂并且其元素嵌套

CSS 类不需要反映块的嵌套 DOM 结构，应该展平：

```html
<div class='block'>
    <div class='block__elem1'>
        <div class='block__elem2'>
            <div class='block__elem3'></div>
        </div>
    </div>
</div>
```

### 2. 如何为修饰符选择名称？

根据语义选择修饰符名称，而不是它们描述的 CSS 属性。

```html
<!-- Good -->
<button class="button button--view-action"> ... </button>

<!-- Bad -->
<button class="button button--background-yellow"> ... </button>
```

### 3. BEM 中使用级联

BEM 方法允许使用级联，但应用级联会增加代码耦合并使重用变得不可能。

```css
.nav_hovered .nav__link {
    text-decoration: underline;
}
```
