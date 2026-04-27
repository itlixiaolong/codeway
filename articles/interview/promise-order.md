# promise 执行逻辑
## 一、Promise 里捕获 `throw` 报错的三种方式

### 1. 最常用：`.catch()`
Promise 内部**主动 throw** / 代码报错，都会被 `.catch` 捕获
```js
new Promise((resolve, reject) => {
  throw new Error("手动抛出错误");
}).catch(err => {
  // 拿到 throw 的内容
  console.log("捕获错误：", err.message); 
});
```

---

### 2. `.then` 第二个回调（不推荐）
`.then(成功回调, 失败回调)`，只能捕获当前 Promise 错误
```js
new Promise((res, rej) => {
  throw "出错了";
}).then(
  val => console.log("成功", val),
  err => console.log("捕获throw：", err)
);
```

---

### 3. `async/await + try/catch`（开发最常用）
**await 后面的 Promise 一旦 throw，必须 try/catch 接住**
```js
async function fn() {
  try {
    await new Promise(() => {
      throw new Error("接口异常");
    });
  } catch (err) {
    // 直接拿到 throw 的值
    console.log("捕获：", err);
  }
}
fn();
```

---

## 二、关键知识点
1. Promise 构造器里：
   - 代码报错 / `throw xxx` **等价于** 执行 `reject(xxx)`
2. 只要是 **reject / throw**：
   - 都会被后续 `.catch()` 统一捕获
3. 链式调用中：
   - 前面任意 `.then` 里 `throw`，也会被后面最近的 `.catch` 捕获
```js
Promise.resolve(100)
.then(res => {
  throw "then内部报错";
})
.catch(err => {
  console.log(err); // then 里的 throw 也能抓到
})
```

---

## 三、区别：throw 和 reject
```js
// 写法1
new Promise((res, rej) => {
  reject("错误");
})

// 写法2（效果完全一样）
new Promise((res, rej) => {
  throw "错误";
})
```
👉 两种都会进入 `.catch`

---

## 四、面试一句话总结
1. Promise 内部 **throw 会转为 reject 状态**；
2. 捕获方式：**.catch()** / **then 第二个参数** / **async+try/catch**；
3. 实际开发优先用：`try/catch + await` 或 `.catch()`。

## 五、面试经典例题：「throw、reject、宏微任务结合」的面试经典例题
# Promise 高频面试题：throw + reject + 宏微任务 经典组合
## 题目1：基础区分 throw / reject
```js
new Promise((resolve, reject) => {
  throw new Error("手动throw");
  // reject("主动reject")
}).catch(e => {
  console.log(e.message)
})
```
结论：
- Promise 执行器内 **throw = 自动变成 reject**
- 都会被 `.catch` 捕获

---

## 题目2：then 回调里 throw（链式穿透）
```js
Promise.resolve(1)
.then(res => {
  console.log(res);
  throw new Error("then内部错误")
})
.then(res => {
  console.log("不会执行");
})
.catch(err => {
  console.log("捕获：", err.message);
})
```
执行顺序：
1. 打印 1
2. 抛出异常
3. 跳过下一个 then
4. 被最近的 catch 捕获

---

## 题目3：then 第二个参数 抓不住 链式 throw（高频坑）
```js
Promise.resolve()
.then(() => {
  throw "错误";
}, err => {
  console.log("我抓不到");
})
.catch(err => {
  console.log("最终捕获：", err);
})
```
重点：
- `then(成功, 失败)` **只能捕获当前这一层 Promise 错误**
- 不能捕获当前成功回调里的 `throw`
- 链式错误统一用 **.catch**

---

## 题目4：async/await + try catch 捕获 throw
```js
async function fn() {
  try {
    await Promise.resolve().then(() => {
      throw "接口失败";
    })
  } catch (e) {
    console.log("接住throw：", e)
  }
}
fn()
```
开发最常用写法：
所有 `await` 链式里的 `throw / reject`，都能被外层 `try/catch` 捕获。

---

## 题目5：宏任务 + 微任务 + throw 综合压轴题（必背）
```js
console.log("同步1");

setTimeout(() => {
  console.log("宏任务");
  throw "定时器错误";
}, 0);

Promise.resolve()
.then(() => {
  console.log("微任务1");
  throw "微任务报错";
})
.catch(e => {
  console.log("微任务catch：", e);
})

console.log("同步2");
```
### 正确输出顺序：
1. 同步1
2. 同步2
3. 微任务1
4. 微任务catch：微任务报错
5. 宏任务 ⚠️ **直接报错崩溃，无捕获**

### 关键考点
1. 同步代码先执行
2. 再清空全部微任务（Promise then/catch）
3. 最后执行宏任务（setTimeout）
4. **宏任务里的 throw 没有 catch 捕获 → 全局报错**

---

## 核心总结（面试背诵）
1. Promise 执行器 / then 回调中：`throw` 等同于 `reject`
2. 捕获三种方式：
   - 链式 `.catch()` ✅ 推荐
   - then 第二个失败回调 ❌ 有局限性
   - `async + try/catch` ✅ 开发首选
3. 微任务异常可被 Promise 链路捕获；
   **无兜底的宏任务 throw 会直接页面/进程报错**

