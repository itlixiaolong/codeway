Vue3 Proxy 响应式（带视图渲染）极简可运行示例

以下是 Proxy 响应式 + 真实DOM视图渲染 的完整可运行代码，复制保存为 `.html` 即可打开查看效果，直观理解 Vue3 响应式底层逻辑。

完整可运行 HTML 代码

```html
<!DOCTYPE html>
<html lang="zh-CN">
<body>
  <div>姓名：<span id="name"></span></div>
  <div>年龄：<span id="age"></span></div>

  <script>
    // 1. 依赖收集容器（核心：存储对象→属性→副作用函数）
    const targetMap = new WeakMap()
    let activeEffect = null // 当前激活的副作用函数

    // 收集依赖：读取数据时，记录当前副作用函数
    function track(target, key) {
      if (!activeEffect) return
      let depsMap = targetMap.get(target)
      if (!depsMap) targetMap.set(target, (depsMap = new Map()))
      let dep = depsMap.get(key)
      if (!dep) depsMap.set(key, (dep = new Set()))
      dep.add(activeEffect)
    }

    // 触发更新：修改数据时，执行所有收集的副作用函数
    function trigger(target, key) {
      const depsMap = targetMap.get(target)
      if (!depsMap) return
      const dep = depsMap.get(key)
      dep && dep.forEach(fn => fn())
    }

    // 2. 响应式核心：Proxy 拦截对象的 get/set 操作
    function reactive(target) {
      return new Proxy(target, {
        // 读取属性时，收集依赖
        get(target, key, receiver) {
          const res = Reflect.get(target, key, receiver)
          track(target, key) // 关键：收集依赖
          return res
        },
        // 修改属性时，触发更新
        set(target, key, value, receiver) {
          const ret = Reflect.set(target, key, value, receiver)
          trigger(target, key) // 关键：触发更新
          return ret
        }
      })
    }

    // 3. 副作用函数：包裹需要响应式触发的逻辑（如视图渲染）
    function effect(fn) {
      activeEffect = fn
      fn() // 执行函数，触发get操作，完成依赖收集
      activeEffect = null
    }

    // ---------------------- 业务使用 ----------------------
    // 1. 创建响应式数据（和Vue3用法一致）
    const state = reactive({
      name: "前端开发者",
      age: 9
    })

    // 2. 视图渲染函数（模拟Vue3视图更新逻辑）
    function render() {
      document.getElementById("name").innerText = state.name
      document.getElementById("age").innerText = state.age
    }

    // 3. 关联副作用与渲染：首次渲染 + 收集依赖
    effect(render)

    // 4. 修改响应式数据 → 自动触发视图更新（核心效果）
    setTimeout(() => {
      state.name = "Vue3 响应式"
      state.age = 18
    }, 1500)
  </script>
</body>
</html>
```

运行效果

1. 页面初始渲染：
姓名：前端开发者 | 年龄：9

2. 1.5秒后自动更新（无需手动操作DOM）：
姓名：Vue3 响应式 | 年龄：18

核心逻辑（对应Vue3源码）

- reactive：对应 Vue3 官方 reactive，用 Proxy 实现对象级劫持
- track：对应源码 track，负责收集依赖（副作用函数）
- trigger：对应源码 trigger，负责触发依赖更新（视图刷新）
- effect：对应源码副作用机制，包裹需要响应式触发的逻辑（如视图渲染）

关键总结

一句话看懂底层：
读取数据（get）→ 收集依赖（track）；修改数据（set）→ 触发更新（trigger）→ 执行渲染（effect），实现「数据驱动视图」。

补充：Vue3 ref 内部响应式实现原理

结合上文 Proxy 响应式逻辑，彻底搞懂 ref 底层——核心是「包装基础类型 + 复用 reactive 逻辑」，极简且贴合源码思路。

一、ref 核心痛点（为什么需要 ref）

上文手写的 reactive 基于 Proxy 实现，但 Proxy 无法直接拦截基础数据类型（String、Number、Boolean 等），因为基础类型不是对象，没有属性可劫持（Proxy 只能代理对象）。

因此 Vue3 设计 ref，本质是「将基础类型包装成对象」，再交给 Proxy 代理，间接实现响应式。

二、ref 内部极简实现（贴合源码，可运行）

基于上文已有的 track、trigger、reactive 函数，新增 ref 实现，和 Vue3 源码逻辑一致：

```javascript
// 基于上文已有的 track、trigger、reactive 函数，新增 ref 实现
function ref(initialValue) {
  // 1. 包装基础类型：创建一个对象，用 value 属性存储基础值
  const wrapper = {
    value: initialValue
  }

  // 2. 关键：用 reactive 代理这个 wrapper 对象（复用 Proxy 响应式逻辑）
  // 劫持 wrapper 的 value 属性的 get/set，实现响应式
  return reactive(wrapper)
}

// -------------- 使用示例（和 Vue3 用法完全一致）--------------
// 1. 创建 ref 响应式数据（基础类型）
const count = ref(0)

// 2. 副作用函数（视图更新）
effect(() => {
  console.log("count 更新：", count.value) // 读取 value，触发 get → 收集依赖
})

// 3. 修改 value → 触发 set → 触发更新
count.value = 1
count.value = 2
```

三、ref 内部核心流程（背诵版）

1. 接收基础类型初始值（如 0、"abc"），创建一个 包装对象 wrapper，用 value 属性存储初始值；
2. 调用已有的 reactive 函数，代理这个 wrapper 对象（本质还是 Proxy 劫持）；
3. 读取 ref.value 时，触发 Proxy 的 get 操作，执行 track 收集依赖；
4. 修改 ref.value 时，触发 Proxy 的 set 操作，执行 trigger 触发更新；
5. 模板中自动解包：Vue3 编译时会自动识别 ref，无需手动写 .value（脚本中必须写）。

四、ref 与 reactive 的关联（核心区别）

两者均基于 Proxy + track + trigger 实现响应式，核心差异集中在处理的数据类型、使用方式上，具体对比如下：

| 对比维度 | ref | reactive |
|---------|-----|----------|
| 处理数据类型 | 主要处理基础数据类型（String、Number、Boolean 等），也可处理引用类型（不推荐） | 仅处理引用数据类型（Object、Array、Map、Set 等） |
| 底层实现 | 包装基础类型为 { value: 初始值 } 对象，复用 reactive 逻辑，间接通过 Proxy 代理 | 直接使用 Proxy 代理目标对象，对象级劫持 |
| 使用方式 | 脚本中需通过 .value 访问/修改；模板中自动解包，无需 .value | 直接访问/修改属性，无需 .value，与普通对象用法一致 |
| 嵌套数据响应 | 若包装引用类型，嵌套属性自动响应（底层依赖 reactive） | 默认深度响应式，嵌套属性自动劫持，无需额外处理 |
| 核心作用 | 弥补 Proxy 无法代理基础类型的缺陷，简化基础类型响应式使用 | 处理复杂引用类型，实现对象/数组的全面响应式 |

- ref：专门处理 基础数据类型，通过包装对象 + 复用 reactive 实现响应式；
- reactive：专门处理 引用数据类型（对象、数组等），直接用 Proxy 代理；
- 底层关联：ref 本质是「reactive 的语法糖」，最终还是通过 Proxy + track + trigger 实现响应式。

# Vue3 源码：ref 底层实现原理（精准答案）

## 核心结论
1. **ref 本身不是基于 Proxy 实现的**
2. **ref 也不是基于 Object.defineProperty 实现的**
3. **reactive 才是基于 Proxy 实现的**
4. **Vue3 已经完全抛弃了 Object.defineProperty**（不再使用）

---

## 详细拆解（源码级）

### 1. ref 的底层实现
Vue3 中 `ref` 的核心是：
- 用**类 / 对象**封装一个 `value` 属性
- 依赖 **get/set 存取器** 实现依赖收集和触发更新
- 属于 **ES6 原生 getter/setter**，和 Vue2 的 `Object.defineProperty` 原理完全不同

简化伪代码（和源码逻辑一致）：
```javascript
class RefImpl {
  private _value;
  private _rawValue;

  constructor(value) {
    this._rawValue = value;
    // 如果是对象，内部会转成 reactive
    this._value = convert(value); 
  }

  // 关键：get 收集依赖
  get value() {
    track(this, 'value'); 
    return this._value;
  }

  // 关键：set 触发更新
  set value(newVal) {
    this._rawValue = newVal;
    this._value = convert(newVal);
    trigger(this, 'value'); 
  }
}
```

### 2. 三者关系总结

| API | 底层实现 | 说明 |
|-----|---------|------|
| **ref** | ES6 原生 `get/set` 存取器 | 用于**基本类型**、单个值 |
| **reactive** | **ES6 Proxy** | 用于**对象/数组** |
| Vue2 | `Object.defineProperty` | Vue3 **已废弃** |

---

### 3. 你最容易混淆的点

很多人以为 ref 用了 Proxy，是因为：
**当你给 ref 传入 对象/数组 时**
```js
const obj = ref({ name: 'xxx' })
```
内部会自动调用 `reactive`，**这一层才用了 Proxy**，但 ref 自身不是。

---

## 最终一句话总结
✅ **Vue3 ref = 原生 get/set**
✅ **Vue3 reactive = Proxy**
✅ **Vue3 完全不用 Object.defineProperty**

---

### 总结
1. **ref** 底层是 **ES6 原生 getter/setter**，既不是 Proxy 也不是 Object.defineProperty
2. **reactive** 才是基于 **Proxy** 实现
3. Vue3 全面抛弃了 Vue2 的 `Object.defineProperty`
