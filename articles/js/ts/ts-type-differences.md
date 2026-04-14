# any、void、never、unknown 的区别

## 含义区别

| 类型 | 含义 | 使用场景 |
|------|------|----------|
| any | 任何类型 | 为在编程阶段还不清楚类型的变量指定一个类型 |
| void | 没有类型 | 当一个函数没有返回值时，返回类型为 void |
| never | 永不存在的值的类型 | throw error 的函数返回值类型为 never |
| unknown | 未知的类型 | 不知道未来的类型，不会丢失类型校验 |

## 使用实例

### any

```ts
let notSure: any = 4
notSure = 'maybe a string instead'
notSure = false // 也可以是个 boolean

let list: any[] = [1, true, 'free']
list[1] = 100
```

### unknown

any 会忽略语法检查，unknown 不会忽略语法检查：

```ts
const bar: any = 10;
bar.substr(1); // OK - any 会忽略所有类型检查

const foo: unknown = 'string';
foo.substr(1); // Error: 语法检查不通过
// 需要使用类型守卫
if (typeof foo === 'string') { 
    foo.substr(1) // OK
}
```

### void

```ts
function warnUser(): void {
  console.log('This is my warning message')
}
```

### never

```ts
// 返回 never 的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为 never
function fail() {
  return error("Something failed")
}

// 返回 never 的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}
```
