# JS 算法：找出数组中「任意两项之和 = 第三项」的所有三元组
## 题目理解
给一个数组 `[a,b,c,d...]`，找出所有满足：
**nums[i] + nums[j] = nums[k]** 的三元组 `(nums[i], nums[j], nums[k])`
要求：`i、j、k` 下标互不相同。

---

# 方法一：暴力三重循环（最简单易懂，好理解）
思路：
1. 三层循环遍历 i j k
2. 判断下标不重复
3. 满足 `nums[i] + nums[j] === nums[k]` 就收集

```js
function findTwoSumEqualThird(nums) {
  const res = [];
  const len = nums.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      // i j 不能是同一个下标
      if (i === j) continue;
      for (let k = 0; k < len; k++) {
        // 三个下标都不能重复
        if (k === i || k === j) continue;
        if (nums[i] + nums[j] === nums[k]) {
          res.push([nums[i], nums[j], nums[k]]);
        }
      }
    }
  }
  return res;
}
```

### 测试
```js
console.log(findTwoSumEqualThird([1,2,3,4,5]));
// 例如 1+2=3、1+3=4、1+4=5、2+3=5 都会被找出
```

---

# 方法二：优化版 双重循环 + Set 查找（效率更高）
思路：
1. 用 Set 存所有元素，查找 O(1)
2. 两层循环枚举任意两个数之和
3. 看和是否在数组里，且下标不冲突

```js
function findTwoSumEqualThirdOpt(nums) {
  const res = [];
  const set = new Set(nums);
  const len = nums.length;

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const sum = nums[i] + nums[j];
      if (set.has(sum)) {
        // 再校验 sum 对应的下标不是 i/j
        let k = nums.indexOf(sum);
        if (k !== i && k !== j) {
          res.push([nums[i], nums[j], sum]);
        }
      }
    }
  }
  return res;
}
```

---

# 方法三：去重版（不重复三元组）
如果不要重复结果，先排序+去重：
```js
function findUniqueTriple(nums) {
  // 去重 + 排序
  const arr = [...new Set(nums)].sort((a, b) => a - b);
  const res = [];
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const sum = arr[i] + arr[j];
      if (arr.includes(sum)) {
        res.push([arr[i], arr[j], sum]);
      }
    }
  }
  return res;
}
```

---

# 核心口诀
1. 暴力版：三层循环，判下标不重复，判两数和等于第三数
2. 优化版：两层循环枚举两数和，Set 快速查是否存在第三个数
3. 想要简洁好写、面试手写：**直接用三重循环版**，逻辑最清楚不翻车

# 「leetcode 同款变形：三数之和等于0」对比讲解

# 先理清两道题区别 + 三数之和等于0 标准解法（面试必背）
## 一、先分清两道题
### 你刚才的题
题目：**数组中任意两项之和 = 第三项**
满足：`a + b = c`

### LeetCode 15 三数之和
题目：找出所有**三元组**，满足：`a + b + c = 0`
要求：
1. 三元组 `[a,b,c]` 非重复
2. 下标不同
3. 升序、不重复组合

---

## 二、三数之和等于0 最优思路（排序 + 双指针）
步骤：
1. 数组**先升序排序**
2. 固定第一个数 `i`
3. 左指针 `j = i+1`，右指针 `k = 末尾`
4. 计算三数和：
   - 和 = 0 → 收集结果，左右指针同时移动
   - 和 < 0 → 左指针右移（变大）
   - 和 > 0 → 右指针左移（变小）
5. 跳过重复元素，避免重复三元组

---

## 三、完整可运行代码
```js
function threeSum(nums) {
  const res = [];
  // 1. 先升序排序
  nums.sort((a, b) => a - b);
  const len = nums.length;

  for (let i = 0; i < len - 2; i++) {
    // 跳过固定位重复值
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let j = i + 1;
    let k = len - 1;

    while (j < k) {
      const sum = nums[i] + nums[j] + nums[k];

      if (sum === 0) {
        // 收集符合条件三元组
        res.push([nums[i], nums[j], nums[k]]);
        // 跳过左指针重复
        while (j < k && nums[j] === nums[j + 1]) j++;
        // 跳过右指针重复
        while (j < k && nums[k] === nums[k - 1]) k--;
        j++;
        k--;
      } else if (sum < 0) {
        // 和太小，左指针右移
        j++;
      } else {
        // 和太大，右指针左移
        k--;
      }
    }
  }
  return res;
}
```

### 测试
```js
console.log(threeSum([-1,0,1,2,-1,-4]));
// 输出：[ [-1,-1,2], [-1,0,1] ]
```

---

## 四、两道题核心对比（记牢）
| 题型 | 公式 | 解法 |
|------|------|------|
| 两数和等于第三项 | `a + b = c` | 暴力三层循环 / 两层+Set |
| 三数之和为0 | `a + b + c = 0` | **排序 + 双指针** |

---

## 五、面试一句话背诵
1. 两数和等于第三项：枚举任意两个数，看**和是否存在数组中**；
2. 三数之和为0：先排序，**固定一位，双指针左右夹逼**，跳过重复去重。
