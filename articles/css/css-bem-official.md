# BEM 官方规范

## BEM 是什么？

BEM (Block, Element, Modifier) 是一个基于组件化思想的前端开发方式，它的设计哲学是将 web 界面分割成多个独立的 block，使界面开发变得简单而快速。

## Block

Block 是页面上一个功能独立的组件，可以被复用。

### 命名规则

Block 的名字表述了它的用途（它是什么？），而不是它的状态。

```html
<!-- Correct -->
<div class="error"></div>

<!-- Incorrect -->
<div class="red-text"></div>
```

### 原则

- Block 不应该影响它的环境，不应该设置外部几何属性（margin）或定位
- 在使用 BEM 时，不应该使用 CSS 标签或 ID 选择器

### 嵌套

Block 可以相互嵌套，可以有任意数量的嵌套级别。

```html
<header class="header">
    <div class="logo"></div>
    <form class="search-form"></form>
</header>
```

## Element

Element 是 Block 的一部分，不能脱离 Block 而使用。

### 命名规则

`block-name__element-name`，使用双下划线（__）分隔。

```html
<form class="search-form">
    <input class="search-form__input">
    <button class="search-form__button">Search</button>
</form>
```

### 原则

- Element 可以相互嵌套
- Element 始终是一个 Block 的一部分，而不是另一个 Element

## Modifier

Modifier 是定义 Block 和 Element 外观、状态、行为的代码片段。

### 命名规则

- `block-name_modifier-name` 或 `block-name__element-name_modifier-name`
- 建议使用 `--`：`block-name--modifier-name`

```html
<!-- Boolean modifier -->
<form class="search-form search-form--focused">
    <button class="search-form__button search-form__button--disabled">Search</button>
</form>

<!-- Key-value modifier -->
<form class="search-form search-form--theme-black">
```

## Mix

Mix 是一种在单个 DOM 节点上使用不同 BEM 实体的技术。

```html
<div class="header">
    <div class="search-form header__search-form"></div>
</div>
```

通过混合 search-form 块和 header__search-form 元素，既可以使用 search-form 的样式，又可以设置外边距。
