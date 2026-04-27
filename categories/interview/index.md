---
layout: page
title: 中大厂面试题
description: 中大厂前端面试高频考点，资深/架构岗面试复盘与经验分享
---

# 🎯 中大厂面试题

<p class="page-desc">资深/架构岗面试高频考点与系统设计面试技巧。</p>

## 面试考察体系

```
┌────────────────────────────────────────────────────────────────┐
│                   前端面试能力模型                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                    ┌─────────────────┐                        │
│                    │    基础知识      │  30%                   │
│                    │  JS/CSS/网络/浏览器 │                    │
│                    └────────┬────────┘                        │
│                             │                                  │
│                    ┌────────▼────────┐                        │
│                    │    框架能力      │  25%                   │
│                    │ Vue/React/工程化  │                      │
│                    └────────┬────────┘                        │
│                             │                                  │
│                    ┌────────▼────────┐                        │
│                    │   系统设计       │  25%                   │
│                    │ 架构/性能/质量体系 │                       │
│                    └────────┬────────┘                        │
│                             │                                  │
│                    ┌────────▼────────┐                        │
│                    │   综合能力       │  20%                   │
│                    │ 协作/学习/沟通    │                       │
│                    └─────────────────┘                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 高频考点清单

### JavaScript 深度

| 考点 | 频率 | 难度 |
|-----|-----|-----|
| 事件循环与异步编程 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 闭包与作用域 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 原型与继承 | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 深拷贝与数据类型 | ⭐⭐⭐⭐ | ⭐⭐ |
| 事件委托与代理 | ⭐⭐⭐ | ⭐⭐ |
| 防抖节流原理 | ⭐⭐⭐⭐ | ⭐⭐ |

### 框架原理

| 考点 | 频率 | 难度 |
|-----|-----|-----|
| Vue 响应式原理 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| React Hooks 机制 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 虚拟 DOM 与 Diff | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 组件通信方案 | ⭐⭐⭐ | ⭐⭐ |
| 状态管理原理 | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Vue/React 更新差异 | ⭐⭐⭐ | ⭐⭐⭐ |

### 工程化

| 考点 | 频率 | 难度 |
|-----|-----|-----|
| Webpack/Vite 原理 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 前端性能优化 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 模块化与 tree-shaking | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| CI/CD 与质量门禁 | ⭐⭐⭐ | ⭐⭐⭐ |
| 浏览器缓存机制 | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 安全防护 (XSS/CSRF) | ⭐⭐⭐⭐ | ⭐⭐⭐ |

## 经典面试题解析

### Q1: 事件循环机制

```javascript
// 面试题：输出顺序是什么？
console.log('1')

setTimeout(() => {
  console.log('2')
  Promise.resolve().then(() => {
    console.log('3')
  })
}, 0)

new Promise((resolve) => {
  console.log('4')
  resolve()
}).then(() => {
  console.log('5')
})

setTimeout(() => {
  console.log('6')
}, 0)

console.log('7')

// 答案：1 4 7 5 2 3 6
// 解析：同步 → 微任务 → 宏任务
```

### Q2: 实现防抖函数

```typescript
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer)

    if (immediate && !timer) {
      fn.apply(this, args)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}
```

### Q3: 实现浅比较工具

```typescript
function shallowEqual<T extends Record<string, any>>(
  objA: T,
  objB: T
): boolean {
  if (objA === objB) return true

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  return keysA.every(key => objA[key] === objB[key])
}
```

## 面试技巧

### 面试文章

- [http缓存策略](/articles/interview/cache)
- [手写组件库：实现原生支持按需引入 JS + CSS（最标准方案）](/articles/interview/component-pack)
- [跨域 iframe](/articles/interview/iframe)
- [手写一个完成版promise](/articles/interview/promise)
- [css中常见的长度单位 px/em/rem](/articles/interview/rem-em)

## 面试技巧

::: tip 资深/架构岗面试要点
1. **深度比广度更重要**：对核心技术要有深度理解
2. **结合实践**：用具体项目经验支撑观点
3. **系统思维**：展示全局架构视角
4. **最佳化思维**：不仅能做，还要知道什么是更好的方案
:::

::: warning 常见失分点
1. 只会用框架，不懂原理
2. 项目经历描述空洞，缺乏细节
3. 系统设计只关注技术选型，忽略非功能性需求
4. 沟通表达逻辑混乱
:::

## 薪资谈判指南

| 因素 | 影响权重 | 说明 |
|-----|--------|-----|
| 技术能力 | 40% | 面试表现决定 base |
| 业务经验 | 25% | 行业匹配度 |
| 绩效背调 | 20% | 前公司评价 |
| 谈判技巧 | 15% | Offer 对比策略 |

<style scoped>
.page-desc {
  color: var(--vp-c-text-2);
  font-size: 1.125rem;
  text-align: center;
  margin: 1rem 0 3rem;
}

section {
  margin: 2rem 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  overflow: hidden;
}

th, td {
  padding: 0.875rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

th {
  background: var(--vp-c-bg-alt);
  font-weight: 700;
  color: var(--vp-c-text-1);
}

pre {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  overflow-x: auto;
  border: 1px solid rgba(0, 0, 0, 0.06);
}
</style>
