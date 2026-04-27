# vue3中如果watchEffect中有异步操作，异步操作后面的依赖还会收集吗?

## 结论（先背）
**不会收集异步代码后面、异步内部的响应式依赖**
`watchEffect` 只会收集**同步执行阶段、同步代码直接读取**的依赖；
一旦遇到 `await` 跳出当前同步执行流，**后续所有响应式变量，都不会被追踪收集**。

---

## 一、核心原理
1. watchEffect 的依赖收集，只发生在：
   **effect 同步立即执行的同步代码段**
2. 遇到 `await / Promise.then / 定时器` 等异步：
   - 同步执行暂停，effect 函数临时退出
   - **暂停依赖收集**
3. 异步回调/await 之后的代码，**不在当前主动收集的 effect 上下文里**
=> 读取响应式数据，**不会绑定依赖**

---

## 二、实战代码验证
```ts
import { ref, watchEffect } from 'vue'

const a = ref(1)
const b = ref(2)

watchEffect(async () => {
  // 👉 同步读取：会收集依赖 a
  console.log(a.value)

  // 异步切断收集上下文
  await new Promise(resolve => setTimeout(resolve, 100))

  // 👉 异步后读取：b 不会被收集
  console.log(b.value)
})

// 只会触发 watchEffect
a.value = 999  

// 完全不会触发
b.value = 666  
```

### 现象
- 修改 `a` → 重新执行 effect
- 修改 `b` → 毫无反应

---

## 三、拓展：.then 写法同理
```ts
watchEffect(() => {
  console.log(a.value)
  Promise.resolve().then(() => {
    // 这里的依赖也不会收集
    console.log(b.value)
  })
})
```
一样：**微任务/宏任务回调内，都不收集依赖**

---

## 四、如果非要收集异步内部依赖，怎么办？
### 方案1：把异步里的依赖，提前在同步里读取
```ts
watchEffect(async () => {
  // 同步提前读取，收集依赖
  const valB = b.value

  await xxx
  console.log(valB)
})
```

### 方案2：异步内部再套一层 watchEffect（不推荐）

---

## 五、面试满分背诵短句
1. `watchEffect` 依赖收集**仅在同步执行阶段生效**；
2. 遇到 `await` / 异步回调会中断当前 effect 收集上下文；
3. **异步后面、异步内部**读取的响应式数据，**不会收集依赖**；
4. 只有同步代码直接访问的 ref/reactive 才会被监听触发更新。

---
# 原理
# 一、核心原理（极简大白话）
Vue 依赖收集的本质：
**全局有一个当前正在执行的 `currentEffect` 变量**
1. 执行 `watchEffect` 回调前：
   把当前 effect 存入全局 `currentEffect`
2. 执行**同步代码**时，读取响应式变量 → 知道现在是谁在读取它，完成依赖收集
3. 遇到 `await`：
   函数**暂停、交出执行权**，同步代码执行结束
   Vue 会**立刻清空 currentEffect = null**
4. 等异步走完、后续代码继续执行时：
   `currentEffect` 已经是 null → 再读响应式变量，**没人记录依赖**

---

# 二、手写极简模拟 Vue 底层逻辑（关键代码）
只用几十行，完美复现「await 切断依赖收集」

## 1. 模拟响应式 + 全局 effect 容器
```js
// 全局：当前正在执行的副作用（关键）
let currentEffect = null;

// 模拟 ref
function ref(val) {
  return {
    _value: val,
    // 存放依赖它的 effect
    deps: new Set(),
    get value() {
      // 读取时：如果有当前effect，就收集依赖
      if (currentEffect) {
        this.deps.add(currentEffect);
        console.log("收集依赖成功");
      }
      return this._value;
    },
    set value(v) {
      this._value = v;
      // 更新时触发所有依赖
      this.deps.forEach(fn => fn());
    }
  }
}

// 模拟 watchEffect
function watchEffect(fn) {
  // 封装副作用函数
  const effect = () => {
    // 🔥 执行前：绑定全局 currentEffect
    currentEffect = effect;
    fn();
    // 🔥 同步代码执行完，立刻清空
    currentEffect = null;
  }
  // 首次执行
  effect();
}
```

## 2. 测试：await 前后对比
```js
const a = ref(1);
const b = ref(2);

watchEffect(async () => {
  // 同步读取：currentEffect 有值 → 收集依赖
  console.log("读取 a：", a.value);

  // ⏸️ 在这里暂停！同步流程直接结束
  await Promise.resolve();

  // 恢复执行时：currentEffect 已经是 null
  console.log("读取 b：", b.value);
});

// 修改 b，不会触发重新执行
setTimeout(() => {
  console.log("修改 b");
  b.value = 999;
}, 1000);
```

---

# 三、运行结果 & 逐行解释
1. 读取 `a.value`
   - `currentEffect` 有值
   - 打印：**收集依赖成功**

2. 碰到 `await Promise.resolve()`
   - 函数挂起，让出主线程
   - **同步代码执行完毕**
   - 执行 `currentEffect = null` 清空

3. 微任务走完，await 后面代码恢复执行
   - 读取 `b.value`
   - `currentEffect` 为 `null`
   - **不会收集依赖**

4. 一秒后修改 `b.value`
   - 没有 effect 依赖它 → 不会重新执行

---

# 四、关键一句话看透本质
```js
effect() {
  currentEffect = 自己
  同步代码...
  currentEffect = null   // 👈 关键就在这一行
}
```
**只要同步代码跑完，不管里面有没有 await，Vue 直接把全局收集上下文清空**；
异步后续代码，早已不在「收集上下文」里。

---

# 五、延伸：Promise.then 写法同理
```js
watchEffect(() => {
  a.value // 收集
  Promise.resolve().then(()=>{
    b.value // 上下文已清空，不收集
  })
})
```
回调属于异步，执行时 `currentEffect` 早就清空了。

---

# 怎么手动保留异步内部依赖？
结合刚才我们手写的极简响应式模型，**直接改造一版：保留异步内部依赖**，
同时对应 Vue3 真实开发写法，两套都给你。

---

## 一、先回顾：原版为什么丢失依赖
```js
function effect() {
  currentEffect = effect
  fn() // 走到 await，同步暂停
  currentEffect = null // 同步代码走完，直接清空
}
```
关键坑：**同步执行完立刻清空 `currentEffect`**

---

## 二、改造版：异步执行完再清空（极简模拟）
核心改造点：
**不要在同步代码结束立马清空，等函数整体（包括异步）全部执行完再清空**

```js
let currentEffect = null;

function ref(val) {
  return {
    _value: val,
    deps: new Set(),
    get value() {
      if (currentEffect) {
        this.deps.add(currentEffect);
        console.log("收集依赖成功");
      }
      return this._value;
    },
    set value(v) {
      this._value = v;
      this.deps.forEach(fn => fn());
    }
  }
}

// 改造版 watchEffect
function watchEffect(fn) {
  const effect = async () => {
    currentEffect = effect;
    
    // 等待 fn 全部执行完毕（包含内部 await）
    await fn();

    // 🔥 关键：等异步全部跑完，再清空
    currentEffect = null;
  }
  effect();
}
```

### 测试代码
```js
const a = ref(1);
const b = ref(2);

watchEffect(async () => {
  console.log("读取 a：", a.value);
  await Promise.resolve();
  // 现在能正常收集 b
  console.log("读取 b：", b.value);
});

// 修改 b 也能触发更新
setTimeout(() => {
  b.value = 999;
}, 1000);
```

✅ 现在：
`a`、`b` **全部收集依赖**，异步内部变量不再丢失。

---

## 三、Vue3 真实业务代码：2 种正规解决方案（工作直接用）

### 方案1【最简单】：同步提前读取一次（推荐）
在 `await` **之前**，同步访问响应式变量，提前收集依赖
```ts
watchEffect(async () => {
  // 同步阶段提前访问，强行收集依赖
  const bVal = b.value 

  console.log(a.value)
  await xxx()

  // 后续只用变量，不重新读响应式
  console.log(bVal)
})
```

### 方案2【精准保留】：用 `track` 手动强制收集依赖
Vue 内置底层 API，手动触发收集
```ts
import { ref, watchEffect, track } from 'vue'

watchEffect(async () => {
  console.log(a.value)
  await Promise.resolve()

  // 手动追踪 b
  track(b)
  console.log(b.value)
})
```

### 方案3【终极兜底】：拆分逻辑
复杂异步逻辑，直接改用 **watch**，从根源避开问题
```ts
watch(
  () => [a.value, b.value],
  async () => {
    await xxx()
    // 天然全部监听，无依赖丢失问题
  }
)
```

---

## 四、面试一句话总结
1. 原生 `watchEffect` 在同步代码结束就清空副作用上下文，导致 `await` 后无法收集依赖；
2. 底层改造思路：**延迟清空 currentEffect，等待异步逻辑执行完毕**；
3. 业务开发不用改底层，最优解：
   - 简单场景：**同步提前取值**
   - 复杂场景：**直接用 watch**
  
#  watch里面写异步操作会有这个问题吗？
先给**结论**，再结合你刚才看懂的「`currentEffect` 原理」+ 极简代码对比，彻底吃透。

---

## 一、核心结论（背诵）
1. **watchEffect**
   自动收集依赖；
   **遇到 `await` / 异步，会切断收集上下文**，异步后面的响应式数据 **不会收集依赖**。

2. **watch**
   **手动指定依赖源**（你写什么，就监听什么）；
   内部随便写 `await`、异步、定时器，**完全不会丢失监听**，不存在「异步切断依赖」的问题。

---

## 二、底层本质区别（为什么？）
### 1. watchEffect 收集方式：**自动依赖收集**
靠全局变量：
```js
currentEffect = effect  // 开启收集
fn()                   // 执行函数，读取变量就收集
currentEffect = null   // 同步结束，关闭收集
```
`await` 会让同步代码直接走完，立刻清空 `currentEffect`，异步代码执行时无收集上下文。

### 2. watch 收集方式：**手动显性依赖**
```ts
watch(
  () => [a.value, b.value], // 👈 提前、显性、一次性声明依赖
  async (newVal) => {
    // 里面随便异步，不影响
    await xxx
    console.log(a.value, b.value)
  }
)
```
- 依赖**在第一层 getter 里提前固定死**
- 和回调内部是不是异步、有没有 `await` **毫无关系**
- 不会清空上下文、不会断依赖

---

## 三、左右对比 完整示例（可直接运行）
### 1⃣ watchEffect 异步：丢失依赖
```ts
import { ref, watchEffect, watch } from 'vue'
const a = ref(1)
const b = ref(2)

watchEffect(async () => {
  console.log('同步读取a', a.value)
  await Promise.resolve()
  // 这里b 不会被收集
  console.log('异步读取b', b.value)
})

// 改a → 触发
// 改b → 不触发
```

---

### 2⃣ watch 异步：完全没问题
```ts
watch(
  () => ({ a: a.value, b: b.value }),
  async () => {
    await Promise.resolve()
    // 哪怕全写在异步后面，照样监听
    console.log('watch 内部', a.value, b.value)
  }
)

// 修改 a 或 b，都会触发 watch 执行
```

✅ 原因：
依赖收集**只发生在 watch 的第一个参数（监听函数）**，
和 handler 回调内部是否异步、有没有 `await` 无关。

---

## 四、一道面试高频考题标准答案
问：`watchEffect` 与 `watch` 在异步场景下依赖收集的区别？

1. `watchEffect` 是**自动依赖收集**，基于当前副作用上下文；
遇到 `await` 会结束同步执行流，清空全局 `currentEffect`，
**异步后续代码中访问的响应式数据，无法收集依赖**。

2. `watch` 是**手动显性声明依赖**，依赖在 getter 阶段提前收集；
handler 回调内部无论是否包含异步、`await`、定时器，
**都不会影响依赖监听，永远正常触发**。

3. 开发建议：
- 简单自动监听 → watchEffect（注意异步断依赖坑）
- 需要异步逻辑、复杂回调、精准控制依赖 → 优先 watch

---

## 五、补充小细节（加分项）
- watchEffect 里，**微任务/宏任务回调**全都不收集依赖；
- watch 只看「你要监听谁」，回调只是执行逻辑，不受异步影响；
- 如果非要让 watchEffect 收集异步里的变量：
  👉 **在同步阶段提前读取一次变量**，强行收集依赖。

---
