# Vue 专家不想让你知道的 7 个秘密

## 1. 聪明的 watch

使用 `immediate: true` 简化代码：

```js
watch: {
  searchText: {
    handler: 'fetchUserList',
    immediate: true  // 立即执行，不再需要在 created 中调用
  }
}
```

## 2. 批量组件注册

```js
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst' 
import camelCase from 'lodash/camelCase'

const requireComponent = require.context('.', false, /base-[\w-]+\.vue$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(camelCase(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  ))
  Vue.component(componentName, componentConfig.default || componentConfig) 
})
```

## 3. 批量导入 Vuex Module

```js
import camelCase from 'lodash/camelCase'
const requireModule = require.context('.', false, /\.js$/) 
const modules = {}

requireModule.keys().forEach(fileName => {
  if (fileName === './index.js') return
  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''))
  modules[moduleName] = requireModule(fileName)
})

export default modules
```

## 4. 干净的 View 视图

配合 `<router-view :key="$route.fullPath">` 可以简化代码：

```js
created() {
  this.getPost(this.$route.params.id)
},
methods: {
  getPost(postId) {
    // ...
  }
}
```

## 5. 属性透传

使用 `v-bind="$attrs"` 解决二次封装时的属性透传问题：

```vue
<template>
  <label>
    {{ label }}
    <input v-bind="$attrs" />
  </label>
</template>
```

## 6. 解锁可能性

### 多根节点组件

使用 `<template>` 标签作为包装：

```vue
<template>
  <div>...</div>
  <div>...</div>
</template>
```

### 渲染没有 HTML 的组件

使用函数式组件：

```vue
<script>
export default {
  functional: true,
  render(h, { data, children }) {
    return h('div', data, children)
  }
}
</script>
```

## 7. Mix 混合

混合多个 BEM 实体：

```html
<div class="header">
  <div class="search-form header__search-form"></div>
</div>
```
