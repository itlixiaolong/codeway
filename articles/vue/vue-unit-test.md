# Vue 单元测试常见问题及解决方案

## 1. document 原生方法注册

**问题**：单元测试环境下无法获取 document 方法（如 `document.getElementById`）

**解决方案**：使用 `jest.spyOn().mockImplementation()`

```js
jest.spyOn(document, 'getElementById').mockImplementation(() => mockElement)
```

## 2. window 自定义属性注册

**问题**：单元测试环境下无法获取 window 自定义属性（如 `window.zhuge`）

**解决方案**：使用 `jest.spyOn().mockImplementation()`

```js
jest.spyOn(window, 'zhuge', 'get').mockImplementation(() => mockZhuge)
```

## 3. element-ui 等外部组件注册

**问题**：单元测试环境下无法识别除 vue 框架本身的组件

**解决方案**：

```js
import { shallowMount, mount } from '@vue/test-utils'
import ElementUI from 'element-ui'

// 注册组件
wrapper.vm.$mount()
wrapper.vm.$refs.xxx // 访问子组件
```

## 4. 纯展示外部组件替换渲染方式

使用 `stub` 替换子组件，避免渲染第三方组件：

```js
shallowMount(Component, {
  stubs: {
    'el-button': { template: '<button><slot /></button>' }
  }
})
```

## 5. wrapper.find() 方法踩坑

使用 `wrapper.find()` 方法获取 DOM 对象时，此方法优先获取 `render()` 函数中返回的结构。

## 6. 对于第三方组件的逻辑测试

- 对于 `el-` 开头的组件使用 `mount` 渲染，使用 `find` 找到根节点元素，然后通过 `trigger` 触发事件
- 对于 `el-` 开头的组件使用 `shallowMount` 渲染，需要借用 `localVue` 将 el 组件注入

## 7. 对于引入 node_modules 依赖的报错

通过配置 `jest.config.js` 解决：

```js
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/src/$1',
  '^element-ui': '<rootDir>/__mocks__/element-ui.js'
}
```
