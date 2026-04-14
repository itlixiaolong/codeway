# TypeScript 使用概要

## 1. 联合类型

对于一个变量希望它既可以是 string 也可以是 number 类型：

```ts
let a: string | number = 7
```

## 2. 接口定义

```ts
interface IPerson {
    readonly id: number;
    name: string;
    age?: number;  // 可选属性
}
```

## 3. 数组的定义

```ts
// 类型 + []
let arr: number[] = [1, 2]
let arr: string[] = ['1', '2']

// 元组 - 固定类型和位置
let arr: [string, number] = ['1', 2]
```

## 4. 函数的定义

```ts
function sum(x: number, y: number): number {
    return x + y
}

const sum: (x: number, y: number) => number = function(x: number, y: number): number {
    return x + y
}
```

## 5. 泛型

### 泛型中数组的使用

```ts
// 写法一
function myFun<T>(params: T[]) {
  return params;
}

// 写法二
function myFun<T>(params: Array<T>) {
  return params;
}
```

### 泛型中类的使用

```ts
class SelectGirl<T> {
  constructor(private girls: T[]) {}
  getGirl(index: number): T {
    return this.girls[index];
  }
}
```

### 泛型约束

```ts
interface Girl {
  name: string;
}
class SelectGirl<T extends Girl> {
  // 泛型里必须有一个 name 属性
}
```

## 6. 接口

### 类类型接口

```ts
interface Animals {
  name: string;
  eat(): void;
}

class Dogs implements Animals {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat() {}
}
```

### 接口继承

```ts
interface Dog {
  eat(): void;
}

interface Persons extends Dog {
  work(): void;
}
```

## 7. 类型断言

```ts
// 使用 as 语法告诉 ts 不需要做类型校验
let fn = (test as any).fun

// 使用 unknown 代替 any
const foo: unknown = 'string';
if (typeof foo === 'string') {
    foo.substr(1) // OK
}
```

## 8. 非空断言操作符

```ts
function fn(a: string | null | undefined) {
    let s: string = ''
    s = a! // OK - 告诉编译器 a 肯定不是 null 或 undefined
}
```
