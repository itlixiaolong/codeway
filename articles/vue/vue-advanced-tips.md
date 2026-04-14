# Vue 高级开发技巧

## 1. 在 v-for 中使用函数

```vue
<div v-for="item in items.filter(item => item.active)">
  {{ item.name }}
</div>
```

## 2. 使用 Object.assign 进行多个响应式属性赋值

```js
// 代替逐个赋值
Object.assign(this.$data, this.$options.data())
```

## 3. 使用修饰符 .passive 提升移动端性能

```vue
<div @touchstart.passive="onTouch">...</div>
```

## 4. 使用 inheritAttrs:false 禁止属性继承

```js
export default {
  inheritAttrs: false,
  // 但不影响 class 和 style 的合并
}
```

## 5. 使用 @hook:生命周期 来优化代码

```vue
<ChildComponent @hook:mounted="onChildMounted" />
```

## 6. 使用 Vue.observable 打造小型 Vuex

```js
import Vue from 'vue'

const state = Vue.observable({
  count: 0
})

const mutations = {
  increment() {
    state.count++
  }
}
```

## 7. 使用 Vue.extend 开发全局组件

```js
import Vue from 'vue'
import LoadingComponent from './loading.vue'

const LoadingContructor = Vue.extend(LoadingComponent)

const instance = new LoadingContructor({
  el: document.createElement('div')
})

document.body.appendChild(instance.$el)

Vue.prototype.$loading = {
  show: () => instance.show(),
  hide: () => instance.hide()
}
```

## 8. 使用自定义指令让组件更灵活

```js
Vue.directive('loading', {
  bind(el, binding) {
    const instance = new LoadingContructor({
      el: document.createElement('div'),
      data: {}
    })
    el.appendChild(instance.$el)
    el.instance = instance
  },
  update(el, binding) {
    if (binding.oldValue !== binding.value) {
      el.instance.visible = binding.value
    }
  },
  unbind(el) {
    el.instance.$destroy()
  }
})
```

## 9. 使用 $watch 函数随时监听，随时取消

```js
const unwatch = this.$watch('value', (newVal) => {
  // handle change
})

// 取消监听
unwatch()
```

## 10. 函数式组件提升性能

```vue
<template functional>
  <div class="icon">{{ props.name }}</div>
</template>

<script>
export default {
  functional: true
}
</script>
```

## 11. 使用 $bus 进行组件通讯

```js
// main.js
Vue.prototype.$bus = new Vue()

// 组件 A 触发
this.$bus.$emit('message', data)

// 组件 B 监听
this.$bus.$on('message', (data) => {
  // handle
})
```

## 12. 自定义封装 v-model 组件

```vue
<template>
  <select :value="selected" @change="$emit('change', $event.target.value)">
    <option v-for="item in selectData" :key="item.value" :value="item.value">
      {{ item.text }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'ASelect',
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    selectData: Array,
    selected: [String, Number]
  }
}
</script>
```

## 13. 作用域插槽的使用

```vue
<List>
  <template v-slot:default="{ item }">
    <div>{{ item.name }}</div>
  </template>
</List>
```

## 14. Vue 长列表渲染性能优化

使用 `v-virtual-scroller` 或手写虚拟滚动。

## 15. watch 监听多个 data

```js
watch: {
  '$route.query': {
    handler: 'fetchData',
    immediate: true
  }
}
```

## 16. 解耦路由参数

```js
export default {
  props: {
    id: String
  },
  watch: {
    id(newId) {
      this.fetchData(newId)
    }
  }
}
```

## 17. 巧用作用域插槽

```vue
<MyComponent>
  <template v-slot="{ row }">
    <span>{{ row.name }}</span>
  </template>
</MyComponent>
```

## 18. 列表动画效果

使用 Vue 内置的 `<transition-group>` 组件。

## 19. 使用 $attrs 实现属性透传

```vue
<BaseInput v-bind="$attrs" />
```

## 20. 动态组件属性透传

```vue
<component :is="config.type" v-bind="config.props" />
```

## 21. CSS scoped 和深度作用选择器

```vue
<style scoped>
::v-deep .child-class { }  /* Vue 2 */
:deep(.child-class) { }    /* Vue 3 */
</style>
```

## 22. 使用 v-cloak 解决页面闪烁

```vue
<div v-cloak>{{ message }}</div>

<style>
[v-cloak] { display: none; }
</style>
```

## 23. v-once 和 v-pre 提升性能

- `v-once`: 只渲染一次
- `v-pre`: 跳过编译

## 24. 自定义 prop 的校验器

```js
props: {
  type: {
    type: String,
    validator: (value) => ['success', 'warning', 'error'].includes(value)
  }
}
```

## 25. 巧用 ES6 解构赋值

```js
// 代替 this.xxx
const { name, age } = this
```

## 26. 在 Vue 中使用 JSX

需要配置 `@vue/babel-preset-jsx` 插件。

## 27. 路由懒加载的 3 种方式

```js
// 方式一
const Home = () => import('./Home.vue')

// 方式二
const Home = () => import(/* webpackChunkName: "home" */ './Home.vue')

// 方式三
component: resolve => require(['./Home.vue'], resolve)
```

## 28. 使用 .sync 简化父子组件通讯

```vue
<ChildComponent :visible.sync="isShow" />
```

## 29. 组件元数据

```js
export default {
  name: 'MyComponent',
  // 元数据
  columns: 3,
  created() {
    console.log(this.$options.columns)
  }
}
```
