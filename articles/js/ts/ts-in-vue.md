# TypeScript 在 Vue 中的使用

## 1. 使用 typeof 生成类型定义

```ts
const defaultOption = {
  timeout: 500
}
type Opt = typeof defaultOption
```

## 2. 使用 keyof 获取属性名

```ts
const person = {
  age: 3,
  text: 'hello world'
}

type keys = keyof person  // "age" | "text"

// 获取对象属性值的类型安全函数
function get<T extends object, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}
```

## 3. 查找类型

```ts
interface Person {
    addr: {
        city: string,
        street: string,
        num: number,
    }
}

// 使用查找类型
const addr: Person["addr"] = {
    city: 'string',
    street: 'string',
    num: 2
}
```

## 4. 查找类型 + 泛型 + keyof

```ts
interface API {
    '/user': { name: string },
    '/menu': { foods: string[] }
}

const get = <URL extends keyof API>(url: URL): Promise<API[URL]> => {
    return fetch(url).then(res => res.json());
}

get('/menu').then(user => user.foods);
```

## 5. 类型断言

```ts
// 在 Vue 组件中获取子组件引用
const helloRef = this.$refs.helloRef as any;
console.log("helloRef.msg: ", helloRef.msg);
```

## 6. 显式泛型

```ts
function $<T extends HTMLElement>(id: string): T {
    return document.getElementById(id) as T;
}

const input = $<HTMLInputElement>('input');
console.log('input.value: ', input.value);
```

## 7. DeepReadonly

```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
}

const b = a as DeepReadonly<typeof a>
b.foo.bar = 33 // Error: Cannot assign to 'bar' because it is read-only
```

## 8. 使用注释获得编辑器提示

```ts
/** This is a cool guy. */
interface Person {
  /** This is name. */
  name: string,
}
```

## 9. 接口继承

```ts
interface Dog {
  eat(): void;
}

interface Persons extends Dog {
  work(): void;
}
```

## 10. Interface & Type

能用 interface 实现就用 interface，不能就用 type。
