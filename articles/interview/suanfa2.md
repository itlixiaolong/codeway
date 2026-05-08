#  方法一 JS 版本号数组 降序排列（标准解法）
比如这种版本数组：
`['1.2.3', '2.0.0', '1.10.1', '1.3.0', '3.0.0']`

关键点：
**不能直接字符串比对**，因为 `1.10.1 < 1.3.0` 字符串会错，要**按每一段数字逐位比较**。

## 一、通用排序函数（降序）
```js
// 版本号降序排列
function sortVersionDesc(arr) {
  return arr.sort((v1, v2) => {
    // 分割成数字数组
    const arr1 = v1.split('.').map(Number);
    const arr2 = v2.split('.').map(Number);

    // 逐位比较
    const len = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < len; i++) {
      // 缺的位补 0
      const n1 = arr1[i] ?? 0;
      const n2 = arr2[i] ?? 0;
      if (n1 !== n2) {
        // 降序：大的放前面
        return n2 - n1;
      }
    }
    return 0;
  });
}
```

## 二、测试用例
```js
const versions = ['1.2.3', '2.0.0', '1.10.1', '1.3.0', '3.0.0', '2.1.5'];

const res = sortVersionDesc(versions);
console.log(res);
// 输出：
// ['3.0.0', '2.1.5', '2.0.0', '1.10.1', '1.3.0', '1.2.3']
```

## 三、如果要升序
只把 `return n2 - n1` 改成：
```js
return n1 - n2;
```

## 四、原理一句话
1. 按 `.` 拆分每一段，转数字；
2. 从左到右逐位比对；
3. 位数不够补 0；
4. 降序用 `n2 - n1`，升序用 `n1 - n2`。

直接复制这个函数就能项目用，支持任意多位版本号 `x.y.z.w`。

#  方法二 超简单易懂版：版本号降序排序
核心思路：**按点拆成数字数组，用 `localeCompare` 自带版本号比对**，一行搞定，不用写循环。

## 最简版（直接能用）
```js
function sortVersionDesc(arr) {
  return arr.sort((a, b) => 
    b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' })
  );
}
```

## 测试
```js
const versions = ['1.2.3', '2.0.0', '1.10.1', '1.3.0', '3.0.0'];
console.log(sortVersionDesc(versions));
// ['3.0.0', '2.0.0', '1.10.1', '1.3.0', '1.2.3']
```

## 原理超通俗解释
1. `localeCompare` 开启 `numeric: true`
   会**按数字大小逐段比较**，不是按字符串字典序
   自动识别：`1.10` > `1.3`，不会判错
2. **降序**：`b.localeCompare(a)`
3. **升序**：`a.localeCompare(b)`

## 升序写法
```js
function sortVersionAsc(arr) {
  return arr.sort((a, b) => 
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  );
}
```

## 优点
- 代码极少、超好记
- 不用手动分割、不用循环、不用补0
- 支持任意层级版本号：`1.0.5.2`、`10.0.0` 都没问题
- 浏览器/Node 全兼容

一句话记住：
**版本号排序，直接用 localeCompare 加 numeric 配置，降序 b 比 a，升序 a 比 b。**

# `localeCompare` 超通俗解读（看完就会用）
我用**最简单、最直白、最不绕弯**的方式给你讲清楚，这个方法到底干嘛、怎么用、为什么能排版本号。

---

## 1. 它是干嘛的？
**字符串比较专用方法**  
用来判断：**两个字符串谁大谁小，谁排在前面**。

```js
字符串A.localeCompare(字符串B)
```

返回 **3 种结果**：
- **负数**：A 排在 B **前面**
- **正数**：A 排在 B **后面**
- **0**：一样大

---

## 2. 最基础用法（不加参数）
```js
"a".localeCompare("b") // -1 → a 在前
"b".localeCompare("a") // 1 → b 在后
"a".localeCompare("a") // 0
```

---

## 3. 为什么普通字符串比较不能排版本号？
因为字符串是**逐字符比**：
```js
"10" < "2"   // true ❌ 因为 '1' 的编码比 '2' 小
```

所以直接排会变成：
```
1.10, 1.3, 2.0  ❌ 错的
```

---

## 4. 开启「数字模式」才是关键
加一个配置：`{ numeric: true }`

```js
a.localeCompare(b, undefined, { numeric: true })
```

**开启后：它会把字符串里的数字当成真正的数字比！**
- "10" > "2" ✅
- "1.10" > "1.3" ✅
- "2.0" > "1.9.9" ✅

这就是**版本号排序的神器**。

---

## 5. 完整版本号排序专用写法（背这个）
### 降序（从新版本 → 老版本）
```js
b.localeCompare(a, undefined, { numeric: true })
```

### 升序（老版本 → 新版本）
```js
a.localeCompare(b, undefined, { numeric: true })
```

---

## 6. 3个参数超清晰解释
```js
str.localeCompare(compareString, locales, options)
```

1. **compareString**
   要比较的字符串（必填）

2. **locales**
   语言，一般写 `undefined` 自动用系统语言

3. **options**（最重要）
   - `numeric: true` → **按数字大小比较**（版本号必开）
   - `sensitivity: 'base'` → 不区分大小写

---

## 7. 一句话记住
**localeCompare + numeric: true ＝ 能正确比较版本号大小**
**降序写 b 比 a，升序写 a 比 b**

---

## 你只要背这一句就能写版本排序：
```js
// 降序（最常用）
arr.sort((a,b) => b.localeCompare(a, 0, {numeric:true}))
```

---
需要我给你出 **2 个小例子** 让你马上巩固吗？