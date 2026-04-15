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
