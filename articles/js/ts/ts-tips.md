# TypeScript 使用技巧

## 1. 使用参数默认值代替 || 表达式

```ts
// 错误
function createBlogPost(text: string, author: string, date?: Date) {
  return {
    text: text,
    author: author,
    date: date || new Date()
  }
}

// 正确
function createBlogPost(text: string, author: string, date: Date = new Date()) {
  return {
    text: text,
    author: author,
    date: date
  }
}
```

## 2. 使用 unknown 类型代替 any

```ts
// 错误
async function loadProducts(): Promise<Product[]> {
  const response = await fetch('https://api.mysite.com/products')
  const products: any = await response.json()
  return products
}

// 正确
async function loadProducts(): Promise<Product[]> {
  const response = await fetch('https://api.mysite.com/products')
  const products: unknown = await response.json()
  return products as Product[]
}
```

## 3. 使用类型守卫代替强制类型推断

```ts
function isProduct(obj: unknown): obj is Product {
  return obj != null && typeof (obj as Product).id === 'string'
}

async function loadProducts(): Promise<Product[]> {
  const response = await fetch('https://api.mysite.com/products')
  const products: unknown = await response.json()
  if (!isProduct(products)) {
    throw new TypeError('Received malformed products API response')
  } 
  return products
}
```

## 4. 编写测试用例时创建 mock 数据

```ts
// 错误
test('createEmailText returns text', () => {
  const user: User = { firstName: 'John' } as any
  expect(createEmailText(user)).toContain(user.firstName)
})

// 正确 
class MockUser implements User {
  id = 'id'
  firstName = 'John'
  lastName = 'Doe'
  email = 'john@doe.com'
}

test('createEmailText returns text', () => {
  const user = new MockUser()
  expect(createEmailText(user)).toContain(user.firstName)
})
```

## 5. 使用组合接口代替可选属性

```ts
// 错误
interface Product {
  id: string;
  type: 'digital' | 'physical';
  weightInKg?: number;
  sizeInMb?: number;
}

// 正确
interface Product {
  id: string;
  type: 'digital' | 'physical';
}
interface DigitalProduct extends Product {
  type: 'digital';
  sizeInMb: number;
}
interface PhysicalProduct extends Product {
  type: 'physical';
  weightInKg: number;
}
```

## 6. 使用有明确含义的单词代替单字母泛型

```ts
// 错误
function head<T>(arr: T[]): T | undefined {
  return arr[0]
}

// 正确
function head<T>(arr: Element[]): Element | undefined {
  return arr[0]
}
```

## 7. 明确判断条件

```ts
// 错误
function createNewMessagesResponse(countOfNewMessages?: number) {
  if (countOfNewMessages) {  // 0 也会被判定为 false
    return `You have ${countOfNewMessages} new messages`
  }
  return 'Error'
}

// 正确
function createNewMessagesResponse(countOfNewMessages?: number) {
  if (countOfNewMessages !== undefined) {
    return `You have ${countOfNewMessages} new messages`
  }
  return 'Error'
}
```
