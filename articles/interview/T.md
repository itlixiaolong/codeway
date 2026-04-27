# 泛型中如何定义 T 的约束条件（全网最通俗 + 实战版）

我直接用**最常用的语言：TypeScript** 给你讲清楚，**一看就懂、一用就会**。

## 一句话核心
泛型约束 = **给 T 加限制**，让 T **必须满足某个条件**（必须有某个属性、必须是某个类型、必须继承某个类）。

语法：
```ts
<T extends 约束类型>
```
`extends` 在这里不是“继承”，是 **“符合约束”** 的意思。

---

# 一、最常用 4 种约束（90% 场景都用这些）

## 1. 约束 T 必须有某个属性（最常用）
```ts
// 约束：T 必须包含 id 属性
function printId<T extends { id: number }>(obj: T) {
  console.log(obj.id);
}
```

✅ 可以传：
```ts
printId({ id: 10, name: "test" })
```

❌ 不能传：
```ts
printId({ name: "test" }) // 报错：没有 id
```

---

## 2. 约束 T 必须是某种基础类型
```ts
// T 只能是 string / number
function log<T extends string | number>(val: T) {
  console.log(val);
}
```

---

## 3. 约束 T 必须是类的实例 / 继承某个类
```ts
class Animal {}
class Dog extends Animal {}

// T 必须是 Animal 或其子类
function create<T extends Animal>(c: new () => T): T {
  return new c();
}
```

---

## 4. 约束 T 必须是对象的某个 key
```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```
`K extends keyof T` = **K 必须是 T 对象身上真实存在的 key**

---

# 二、最经典实战例子（必背）
### 给泛型函数加约束，确保参数有 length
```ts
// 约束：T 必须有 length 属性
function getLength<T extends { length: number }>(arg: T) {
  return arg.length;
}
```

✅ 可用：string、数组、有 length 的对象
❌ 不可用：number、boolean、null

---

# 三、多个约束怎么写？
用 `&` 交叉类型
```ts
// T 必须同时有 id 和 name
<T extends { id: number } & { name: string }>
```

---

# 四、极简总结（3 秒记住）
- 约束泛型 T：**`<T extends 约束>`**
- 约束可以是：**对象结构、基础类型、类、key**
- 目的：**让泛型更安全、有提示、不报错**

---

# TS 泛型全套合集（约束+高级用法+面试必背）
## 一、基础：泛型约束核心语法
### 1. 基础约束语法
```ts
// 语法：T extends 约束类型
function fn<T extends 约束>(params: T) {}
```
`extends` 在泛型中含义：**类型满足、符合条件**

### 2. 常见基础约束
```ts
// 1. 基础类型约束
type StrNum<T extends string | number> = T

// 2. 对象结构约束（必须包含指定字段）
interface IUser { id: number }
function getUser<T extends IUser>(user: T) {}

// 3. 必须拥有 length 属性（高频）
function getLen<T extends { length: number }>(val: T) {
  return val.length
}

// 4. 多约束叠加 &
function test<T extends {id:number} & {name:string}>(obj:T){}
```

---

## 二、keyof 键名约束（面试必考）
限制第二个参数，只能是对象的合法 key
```ts
function getVal<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

const obj = { name: "张三", age: 18 }
getVal(obj, "name") // ✅
getVal(obj, "sex")  // ❌ 报错
```

---

## 三、类 + 构造函数约束
约束**传入类的构造器**，用于实例化
```ts
class Animal { name: string }

// new () => T 代表：必须是可 new 的构造函数
function createInstance<T extends Animal>(ctor: new () => T): T {
  return new ctor()
}
```

---

## 四、默认泛型参数
给泛型设置默认类型，不传参时自动使用
```ts
// T 默认是 string
function req<T = string>(url: string): Promise<T> {
  return Promise.resolve({} as T)
}

req()       // T = string
req<number>()// 手动指定 T
```

---

## 五、泛型接口 / 泛型类型
### 1. 泛型接口
```ts
interface IRes<T> {
  code: number
  data: T
  msg: string
}

// 复用
type UserRes = IRes<{id:number; name:string}>
type ListRes = IRes<number[]>
```

### 2. 泛型工具类型底层原理
```ts
// 自己手写 Partial 全部可选
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}
```

---

## 六、TS 内置常用泛型工具类型（工作高频）
1. **Partial\<T>**：所有属性变为可选
2. **Required\<T>**：所有属性变为必选
3. **Readonly\<T>**：所有属性只读
4. **Pick\<T,K>**：挑选 T 中 K 字段
5. **Omit\<T,K>**：剔除 T 中 K 字段
6. **Exclude\<T,U>**：排除交集，差集
7. **Extract\<T,U>**：提取交集
8. **Record\<K,T>**：快速定义键值对象

示例：
```ts
type User = { id:number; name:string; age:number }

type UserPick = Pick<User, "id" | "name"> 
type UserOmit = Omit<User, "age">
type UserPartial = Partial<User>
```

---

## 七、高级泛型：条件类型
### 1. 条件判断语法
```ts
type IsString<T> = T extends string ? true : false

type A = IsString<string> // true
type B = IsString<number> // false
```

### 2. 结合 infer 类型推断（难点+面试高频）
`infer`：**自动推导提取类型**
```ts
// 提取 Promise 内部类型
type UnPromise<T> = T extends Promise<infer R> ? R : T

type P = UnPromise<Promise<number>> // number
```

---

## 八、泛型约束面试真题+答案
### 题1：限制函数参数必须有 length
```ts
function fn<T extends {length:number}>(val:T):number{
  return val.length
}
```

### 题2：实现获取对象指定 key 的值
```ts
function get<T,K extends keyof T>(o:T,k:K):T[K]{
  return o[k]
}
```

### 题3：手写简易 Record
```ts
type MyRecord<K extends string|number|symbol,T> = {
  [P in K]: T
}
```

---

## 九、一句话速记总结
1. 泛型约束：`T extends 类型`
2. 键约束：`K extends keyof T`
3. 多约束：交叉类型 `&`
4. 默认泛型：`T = 默认类型`
5. 高级必背：`infer` 推断 + 条件类型 + 内置工具泛型

## 10道泛型笔试题（带答案）
# TypeScript 泛型 10道高频笔试题（含答案+解析）
覆盖：**泛型约束、keyof、infer、工具类型、条件类型、交叉约束**，前端面试必刷。

## 题目1
实现函数，接收**拥有 length 属性**的参数，返回 length
```ts
// 请补全代码
function getLength<T>(arg: T): number {
  return arg.length
}
```
✅ 答案
```ts
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length
}
```

---

## 题目2
实现通用取值函数，key 只能是对象合法键
```ts
function getValue<T, K>(obj: T, key: K): T[K] {
  return obj[key]
}
```
✅ 答案
```ts
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
```

---

## 题目3
限制泛型 T 只能为 `string | number`
```ts
function print<T>(val: T): void {}
```
✅ 答案
```ts
function print<T extends string | number>(val: T): void {}
```

---

## 题目4
多约束：T 必须同时包含 id、name
```ts
interface IdType { id: number }
interface NameType { name: string }
// 补全约束
function formatUser<T>(user: T) {}
```
✅ 答案
```ts
function formatUser<T extends IdType & NameType>(user: T) {}
```

---

## 题目5
给泛型设置默认类型，不传参时 T 为 `boolean`
```ts
function createData<T>(data: T) {}
```
✅ 答案
```ts
function createData<T = boolean>(data: T) {}
```

---

## 题目6
手写实现 `Partial` 工具类型（所有属性可选）
✅ 答案
```ts
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}
```

---

## 题目7
手写实现 `Pick` 工具类型，挑选指定 key
✅ 答案
```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

---

## 题目8
条件类型：判断类型是否为数组，是则返回 true，否则 false
```ts
type IsArray<T> = ???
```
✅ 答案
```ts
type IsArray<T> = T extends any[] ? true : false

// 测试
type A = IsArray<number[]> // true
type B = IsArray<string>   // false
```

---

## 题目9
infer 面试必考：提取 Promise 包裹的类型
```ts
type UnWrapPromise<T> = ???
// 测试：UnWrapPromise<Promise<string>> → string
```
✅ 答案
```ts
type UnWrapPromise<T> = T extends Promise<infer R> ? R : T
```

---

## 题目10
手写简易 `Record`，限制 key 为字符串/数字
✅ 答案
```ts
type MyRecord<K extends string | number, V> = {
  [P in K]: V
}

// 使用示例
type Obj = MyRecord<'a' | 'b', number>
```

---

# 核心考点速记
1. 泛型约束固定写法：`T extends 类型`
2. 对象键约束：`K extends keyof T`
3. 多约束合并：`&` 交叉类型
4. 映射类型：`[P in keyof T]`
5. 条件类型：`A extends B ? 是 : 否`
6. 类型提取：`infer` 只能用在条件类型里
