# 手写call-apply-bind函数
# 手写 `call / apply / bind` 超清晰完整版
核心原理统一记住：
**把函数挂载到目标 `this` 对象上 → 执行函数 → 删除临时挂载的方法 → 返回结果**

---

## 一、手写 call
特点：**立即执行，参数列表传递**
```js
// 挂载在函数原型上
Function.prototype.myCall = function (context, ...args) {
  // 1. 处理 this 为 null/undefined 默认指向 window/全局
  context = context || window;

  // 2. 唯一key，防止覆盖原有属性
  const fnKey = Symbol('fn');
  
  // 3. 把当前函数挂载到 context 上，绑定this
  context[fnKey] = this;

  // 4. 执行函数，this 自动指向 context
  const res = context[fnKey](...args);

  // 5. 删除临时方法，不污染原对象
  delete context[fnKey];

  // 6. 返回执行结果
  return res;
};
```

### 使用测试
```js
function foo(a, b) {
  console.log(this.name, a, b);
}
const obj = { name: "张三" };

foo.myCall(obj, 10, 20); 
// 张三 10 20
```

---

## 二、手写 apply
和 call 几乎一样，区别：**参数是数组**
```js
Function.prototype.myApply = function (context, argsArr = []) {
  context = context || window;
  const fnKey = Symbol('fn');

  context[fnKey] = this;
  const res = context[fnKey](...argsArr);
  
  delete context[fnKey];
  return res;
};
```

### 区别总结
- `call(this, 参数1, 参数2)`
- `apply(this, [参数1, 参数2])`

---

## 三、手写 bind（难点：返回函数 + 柯里化 + 保留new）
bind 特点：
1. **不立即执行，返回新函数**
2. 可以**柯里化分次传参**
3. 被 `new` 实例化时，**this 失效**，保留原函数实例特性

```js
Function.prototype.myBind = function (context, ...args1) {
  // 保存原函数
  const originFn = this;

  // 返回新函数
  return function (...args2) {
    // 🔥 判断是否是 new 调用：this 是当前实例
    const isNew = this instanceof originFn;

    // new 调用 → 无视绑定的context，this 指向实例
    const realThis = isNew ? this : context;

    // 合并两次参数：bind 传参 + 调用时传参
    return originFn.apply(realThis, [...args1, ...args2]);
  };
};
```

### 测试柯里化 + new 场景
```js
function person(age, sex) {
  this.name = "李四";
  this.age = age;
  console.log(this);
}

const obj = { name: "外部对象" };
const newPerson = person.myBind(obj, 18);

newPerson("男");   
// 正常调用：this => obj

new newPerson("女"); 
// new 调用：this 回归实例，不再绑定 obj
```

---

# 四、面试高频背诵要点
1. **call / apply**
- 立刻执行函数
- 修改 this 指向
- 唯一区别：传参形式不同

2. **bind**
- 返回一个新函数，**延迟执行**
- 支持参数**柯里化**
- 当返回函数被 `new` 调用时，**this 绑定失效**

3. 核心实现套路（三者通用）
- 给目标对象临时添加方法
- 利用对象调用方法，天然绑定 this
- 执行后删除临时属性，防止污染

---

# 五、极简精简版（面试简写版）
```js
// call 精简
Function.prototype.myCall = function(ctx,...args){
  ctx = ctx||window
  const s = Symbol()
  ctx[s] = this
  const r = ctx[s](...args)
  delete ctx[s]
  return r
}

// apply 精简
Function.prototype.myApply = function(ctx,arr=[]){
  ctx = ctx||window
  const s = Symbol()
  ctx[s] = this
  const r = ctx[s](...arr)
  delete ctx[s]
  return r
}
```