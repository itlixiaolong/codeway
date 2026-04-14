# TypeScript 高级使用技巧

## 高级类型

### 交叉类型 (T & U)

交叉类型是将多个类型合并为一个类型，它包含了所需的所有类型的特性。

```ts
interface Ant {
    name: string;
    weight: number;
}

interface Fly {
    flyHeight: number;
    speed: number;
}

// 少了任何一个属性都会报错
const flyAnt: Ant & Fly = {
    name: '蚂蚁呀嘿',
    weight: 0.2,
    flyHeight: 20,
    speed: 1,
};
```

### 联合类型 (T | U)

其返回类型为连接的多个类型中的任意一个。

```ts
let stringOrNumber: string | number = 0
stringOrNumber = ''
```

## 关键字

### 类型约束 (extends)

```ts
type BaseType = string | number | boolean

// 这里函数的参数只能是字符串、数字、布尔这几种基础类型
function copy<T extends BaseType>(arg: T): T {
  return arg
}
```

### 类型映射 (in)

将一个接口的所有属性转换成只读类型：

```ts
interface Person {
    name: string
    age: number
    gender: number
}

// 将 T 的所有属性转换为只读类型
type ReadOnlyType<T> = {
    readonly [P in keyof T]: T[P]
}

type ReadOnlyPerson = ReadOnlyType<Person>
```

### 类型谓词 (is)

```ts
function isBird(bird: Bird | Fish): bird is Bird {
    return !!(bird as Bird).fly
}

function start(pet: Bird | Fish) {
    pet.layEggs();

    if (isBird(pet)) {
        pet.fly();
    } else {
        pet.swim();
    }
};
```

### 待推断类型 (infer)

```ts
// 判断 T 是否能赋值给 (param: infer P) => any
type ParamType<T> = T extends (param: infer P) => any ? P : T;

type FunctionType = (value: number) => boolean
type Param = ParamType<FunctionType>;   // type Param = number
```

## 类型保护

### 原始类型保护 (typeof)

```ts
function print(value: number | string) {
    if (typeof value === 'string') {
        console.log(value.split('').join(', '))
    } else {
        console.log(value.toFixed(2))
    }
}
```

### 构造函数类型保护 (instanceof)

```ts
function start(pet: Bird | Fish) {
    pet.layEggs();

    if (pet instanceof Bird) {
        pet.fly();
    } else {
        pet.swim();
    }
}
```

## 索引类型

### 索引类型查询操作符 (keyof)

```ts
interface Person {
    name: string;
    age: number;
}

type PersonProps = keyof Person; // 'name' | 'age'
```

### 索引访问操作符 (T[K])

```ts
interface Person {
    name: string
    age: number
}

type NameType = Person['name']  // string
```

## TS 内置类型函数

```ts
// Partial - 将所有属性变为可选
type Partial<T> = {
    [P in keyof T]?: T[P];
};

// Required - 将所有属性变为必选
type Required<T> = {
    [P in keyof T]-?: T[P];
};

// Pick - 摘取部分属性
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// Omit - 排除部分属性
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// Record - 创建属性类型
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

// Exclude - 排除类型
type Exclude<T, U> = T extends U ? never : T;

// Extract - 提取类型
type Extract<T, U> = T extends U ? T : never;

// NonNullable - 排除 null 和 undefined
type NonNullable<T> = T extends null | undefined ? never : T;

// Parameters - 获取函数参数类型
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

// ReturnType - 获取函数返回值类型
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```
