# JS 数组 交集、并集、差集、补集（最简通用写法）
用 **Set** 实现，时间复杂度 O(n)，简洁好记，面试直接用。

先定义两个测试数组：
```js
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];
```

## 1. 交集（都有的元素）
既在 arr1 又在 arr2
```js
function intersection(a, b) {
  const setB = new Set(b);
  return a.filter(item => setB.has(item));
}
console.log(intersection(arr1, arr2)); 
// [4,5]
```

## 2. 并集（合起来去重）
所有元素合在一起，不重复
```js
function union(a, b) {
  return [...new Set([...a, ...b])];
}
console.log(union(arr1, arr2));
// [1,2,3,4,5,6,7,8]
```

## 3. 差集
- A差集B：在A不在B
```js
function difference(a, b) {
  const setB = new Set(b);
  return a.filter(item => !setB.has(item));
}
console.log(difference(arr1, arr2)); // [1,2,3]
console.log(difference(arr2, arr1)); // [6,7,8]
```

## 4. 对称补集（对称差集）
只在其中一个里出现，两边都有的去掉
```js
function symmetricDifference(a, b) {
  const setA = new Set(a);
  const setB = new Set(b);
  return [
    ...a.filter(item => !setB.has(item)),
    ...b.filter(item => !setA.has(item))
  ];
}
console.log(symmetricDifference(arr1, arr2));
// [1,2,3,6,7,8]
```

---

# 如果是**对象数组**（常用升级版）
按某个字段比如 `id` 对比
```js
const list1 = [{id:1},{id:2},{id:3}];
const list2 = [{id:3},{id:4},{id:5}];

// 交集 对象版
function intersectionObj(arr1, arr2, key) {
  const ids = new Set(arr2.map(item => item[key]));
  return arr1.filter(item => ids.has(item[key]));
}

console.log(intersectionObj(list1, list2, 'id'));
// [{id:3}]
```
