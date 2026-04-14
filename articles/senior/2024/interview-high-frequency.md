---
title: 中大厂前端面试高频考点（资深/架构岗）
date: 2024-02-20
tags:
  - 面试
  - 职业发展
  - 进阶
categories:
  - 面试复盘
author: 李小龙
description: 中大厂资深/架构级前端面试高频考点汇总，包含 JavaScript 深度、框架原理、工程化、性能优化等核心知识点
---

# 中大厂前端面试高频考点（资深/架构岗）

> 作为面试过 100+ 候选人的面试官，总结了中大厂资深/架构岗面试的高频考点与答题技巧。

## 一、面试考察体系

```
┌─────────────────────────────────────────────────────────────────┐
│                   资深/架构岗能力模型                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                      专业能力 (60%)                     │  │
│   │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │  │
│   │  │ 框架原理 │  │ 工程化  │  │ 性能优化 │  │ 架构设计 │   │  │
│   │  │  35%   │  │  25%   │  │  20%   │  │  20%   │   │  │
│   │  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                      综合能力 (40%)                     │  │
│   │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │  │
│   │  │ 业务理解 │  │ 团队协作 │  │ 学习能力 │  │ 沟通表达 │   │  │
│   │  │  30%   │  │  25%   │  │  25%   │  │  20%   │   │  │
│   │  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 二、JavaScript 深度考察

### 2.1 事件循环与异步

::: warning 高频考点
事件循环是必考题，重点考察宏任务/微任务的理解和实际输出顺序
:::

```javascript
// 经典面试题 1
async function async1() {
  console.log('async1 start');  // 2
  await async2();
  console.log('async1 end');     // 6
}

async function async2() {
  console.log('async2');         // 3
}

console.log('script start');     // 1

setTimeout(() => {
  console.log('setTimeout');     // 8
}, 0);

async1();

new Promise(resolve => {
  console.log('promise1');        // 4
  resolve();
}).then(() => {
  console.log('promise2');        // 7
});

console.log('script end');       // 5

// 答案：1 2 3 4 5 6 7 8
```

### 2.2 闭包与内存泄漏

```javascript
// 闭包经典应用：函数柯里化
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

// 防抖函数
function debounce(fn, delay, immediate = false) {
  let timer = null;

  return function (...args) {
    const context = this;

    if (timer) clearTimeout(timer);

    if (immediate && !timer) {
      fn.apply(context, args);
    }

    timer = setTimeout(() => {
      if (!immediate) {
        fn.apply(context, args);
      }
      timer = null;
    }, delay);
  };
}

// 内存泄漏场景
class LeakDemo {
  constructor() {
    // ❌ 闭包泄漏
    this.leakyCallback = () => {
      // 引用了大型对象
      console.log(this.bigData);
    };

    // ❌ 定时器未清理
    this.timer = setInterval(() => {
      // 定时任务
    }, 1000);

    // ❌ 事件监听未移除
    window.addEventListener('resize', this.handleResize);
  }

  destroy() {
    // ✅ 清理定时器
    clearInterval(this.timer);

    // ✅ 移除事件监听
    window.removeEventListener('resize', this.handleResize);

    // ✅ 清理引用
    this.leakyCallback = null;
  }
}
```

### 2.3 原型与继承

```typescript
// 原型链继承
class Parent {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}

// 寄生组合继承（最优方案）
function inherit(subType, superType) {
  const prototype = Object.create(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

// ES6 Class 继承原理
// babel 转换后相当于：
function _extends(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });

  if (superClass) _setPrototypeOf(subClass, superClass);
}
```

## 三、框架原理深度

### 3.1 Vue 3 响应式原理

```typescript
// Proxy 实现响应式
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);

      // 依赖收集
      track(target, key);

      // 深度响应式
      if (typeof result === 'object' && result !== null) {
        return reactive(result);
      }

      return result;
    },

    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);

      // 触发更新
      if (oldValue !== value) {
        trigger(target, key, value, oldValue);
      }

      return result;
    },

    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      const result = Reflect.deleteProperty(target, key);

      if (result && hadKey) {
        trigger(target, key);
      }

      return result;
    }
  });
}

// 依赖管理
class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  notify() {
    this.subscribers.forEach(effect => effect());
  }
}

// 副作用函数
let activeEffect = null;

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}
```

### 3.2 React Hooks 机制

```typescript
// useState 实现原理
function useState<T>(initialState: T) {
  const hook = currentFiber.memoizedState;

  if (hook) {
    // 更新
    return [hook.memoizedState, dispatch]
  }

  // 初始化
  const baseState = typeof initialState === 'function'
    ? initialState()
    : initialState;

  hook = {
    memoizedState: baseState,
    queue: { pending: null },
    next: null
  };

  const dispatch = (action) => {
    const reducer = hook.memoizedReducer;
    const eagerState = reducer(hook.memoizedState, action);

    if (!Object.is(eagerState, hook.memoizedState)) {
      hook.memoizedState = eagerState;
      currentFiber.alternate = createWorkInProgress(currentFiber);
      schedule();
    }
  };

  currentFiber.memoizedState = hook;
  return [baseState, dispatch];
}

// useEffect 实现
function useEffect(create, deps) {
  const hook = currentFiber.memoizedState;

  if (hook) {
    const prevEffect = hook.memoizedState;
    const prevDeps = prevEffect.deps;

    // 检查依赖是否变化
    if (depsAreSame(prevDeps, deps)) {
      return;
    }

    // 执行清理
    if (prevEffect.destroy) {
      prevEffect.destroy();
    }
  }

  // 创建新 effect
  const effect = {
    create,
    deps,
    destroy: create()
  };

  currentFiber.memoizedState = effect;
}
```

## 四、工程化核心

### 4.1 Webpack/Vite 原理

```typescript
// Vite 核心原理

// 1. 开发阶段：基于 ESM 的按需编译
//    - 无需打包，只做转换
//    - 利用浏览器原生 ESM 支持

// 2. HMR 原理
interface ViteHotModule {
  accept(
    deps: string | string[],
    callback: (newMod: any) => void
  ): void;
}

// 3. 依赖预构建
//    - 使用 esbuild 快速处理 node_modules
//    - 转换为 ESM 格式
//    - 合并小模块减少请求

// 4. Rollup 生产打包
//    - Tree Shaking
//    - Code Splitting
//    - Chunk 优化

// Webpack 核心概念
interface WebpackConfig {
  entry: string | Record<string, string>;
  output: {
    path: string;
    filename: string;
    chunkFilename: string;
  };
  module: {
    rules: Rule[];
  };
  plugins: Plugin[];
  optimization: {
    splitChunks: SplitChunksConfig;
    runtimeChunk: boolean | string | Object;
  };
}

// Tree Shaking 原理
// 1. Make - 构建模块依赖图
// 2. Seal - 标记需要保留的模块
// 3. 生成 - 输出打包结果

// 副作用标记
// package.json
{
  "sideEffects": [
    "*.css",
    "es6-utils/index.js",
    false  // 表示没有副作用
  ]
}
```

### 4.2 前端安全

```typescript
// XSS 防御
function escapeHtml(str: string): string {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };

  return str.replace(/[&<>"'/]/g, char => map[char]);
}

// CSP 配置
const cspDirectives = {
  'default-src': "'self'",
  'script-src': "'self' 'nonce-{NONCE}' 'strict-dynamic'",
  'style-src': "'self' 'nonce-{NONCE}'",
  'img-src': "'self' data: https:",
  'connect-src': "'self' https://api.example.com",
  'frame-ancestors': "'none'",
  'form-action': "'self'",
  'base-uri': "'self'"
};

// CSRF 防御
// 1. Token 验证
// 2. SameSite Cookie
// 3. 双重提交 Cookie

// 敏感信息处理
const securityMiddleware = (req, res, next) => {
  // 移除响应中的敏感信息
  const sensitiveFields = ['password', 'token', 'secret', 'apiKey'];

  res.json = (body) => {
    const sanitized = JSON.parse(JSON.stringify(body));
    sensitiveFields.forEach(field => {
      if (field in sanitized) {
        sanitized[field] = '***';
      }
    });
    return res.end(JSON.stringify(sanitized));
  };

  next();
};
```

## 五、性能优化

### 5.1 核心 Web Vitals

```typescript
// 性能指标采集
interface PerformanceMetrics {
  // LCP - Largest Contentful Paint
  lcp: () => Promise<number>;

  // FID - First Input Delay
  fid: () => Promise<number>;

  // CLS - Cumulative Layout Shift
  cls: () => Promise<number>;

  // TTFB - Time to First Byte
  ttfb: () => number;

  // FCP - First Contentful Paint
  fcp: () => number;
}

const metrics: PerformanceMetrics = {
  // LCP
  lcp: () => new Promise(resolve => {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      resolve(lastEntry.renderTime || lastEntry.loadTime);
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  }),

  // FID
  fid: () => new Promise(resolve => {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      resolve(entries[0].processingStart - entries[0].startTime);
    }).observe({ type: 'first-input', buffered: true });
  }),

  // CLS
  cls: () => new Promise(resolve => {
    let cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      }
      resolve(cls);
    }).observe({ type: 'layout-shift', buffered: true });
  }),

  // TTFB
  ttfb: () => {
    const [navigation] = performance.getEntriesByType('navigation');
    return navigation.responseStart - navigation.requestStart;
  },

  // FCP
  fcp: () => {
    const [paint] = performance.getEntriesByType('paint');
    return paint.name === 'first-contentful-paint' ? paint.startTime : 0;
  }
};
```

### 5.2 性能优化策略

```typescript
// 图片优化
interface ImageOptimization {
  // 格式选择
  format: 'webp' | 'avif' | 'jpg';

  // 响应式图片
  srcset: string[];

  // 懒加载
  loading: 'lazy' | 'eager';

  // 预加载
  preload: boolean;
}

// 代码分割
const codeSplittingConfig = {
  // 路由级分割
  routes: {
    '/dashboard': () => import('./views/Dashboard'),
    '/users': () => import('./views/Users'),
    '/settings': () => import('./views/Settings'),
  },

  // 组件级分割
  components: {
    'Chart': () => import('./components/Chart'),
    'RichEditor': () => import('./components/RichEditor'),
    'VideoPlayer': () => import('./components/VideoPlayer'),
  },

  // 库分割
  vendor: {
    'react-vendor': ['react', 'react-dom'],
    'utils-vendor': ['lodash', 'dayjs'],
  }
};

// 缓存策略
const cacheStrategy = {
  // 静态资源
  static: {
    maxAge: '1 year',
    staleWhileRevalidate: '31536000'
  },

  // API 数据
  api: {
    maxAge: '5 min',
    staleWhileRevalidate: '1 hour'
  },

  // HTML
  html: {
    maxAge: '0',
    mustRevalidate: true
  }
};
```

## 六、系统设计

### 6.1 设计一个前端监控SDK

```typescript
interface MonitorSDK {
  // 错误监控
  reportError(error: Error, context?: any): void;

  // 性能监控
  reportPerformance(metrics: PerformanceMetrics): void;

  // 用户行为
  trackEvent(event: string, data?: any): void;

  // 页面访问
  trackPageView(url: string): void;
}

class FrontendMonitor implements MonitorSDK {
  private config: MonitorConfig;
  private queue: any[] = [];
  private isReady: boolean = false;

  constructor(config: MonitorConfig) {
    this.config = config;
    this.init();
  }

  private init() {
    // 设置采样率
    this.config.sampleRate = this.config.sampleRate || 1;

    // 劫持全局错误
    window.onerror = this.handleGlobalError.bind(this);
    window.onunhandledrejection = this.handlePromiseError.bind(this);

    // 劫持 fetch/xhr
    this.hookNetwork();

    // 监听性能
    this.observePerformance();

    // 上报队列
    this.startUpload();
  }

  reportError(error: Error, context?: any) {
    const errorInfo = {
      type: 'javascript_error',
      message: error.message,
      stack: error.stack,
      context,
      timestamp: Date.now(),
      url: location.href,
      userAgent: navigator.userAgent
    };

    this.send(errorInfo);
  }

  trackEvent(event: string, data?: any) {
    this.send({
      type: 'custom_event',
      event,
      data,
      timestamp: Date.now()
    });
  }

  private send(data: any) {
    if (Math.random() > this.config.sampleRate) return;

    if (this.isReady) {
      this.upload(data);
    } else {
      this.queue.push(data);
    }
  }

  private upload(data: any) {
    const payload = JSON.stringify(data);
    navigator.sendBeacon?.(this.config.endpoint, payload);
  }
}
```

## 七、面试技巧

::: tip 资深/架构岗面试要点
1. **深度比广度重要**：对核心技术要有深度理解
2. **结合实践**：用具体项目经验支撑观点
3. **系统思维**：展示全局架构视角
4. **表达逻辑**：结构化表达，结论先行
5. **最佳化思维**：不仅能做，还要知道什么是更好的方案
:::

::: warning 常见失分点
1. 只会用框架，不懂原理
2. 项目经历描述空洞，缺乏细节
3. 系统设计只关注技术选型，忽略非功能性需求
4. 沟通表达逻辑混乱
5. 遇到难题直接放弃，没有思路
:::

## 八、薪资谈判

| 级别 | 月薪范围 | 年包（不含期权） | 影响因素 |
|-----|---------|-----------------|---------|
| P6 | 25-40K | 35-60W | 技术能力、项目经验 |
| P7 | 40-60K | 60-90W | 技术深度、团队影响 |
| P8 | 60-90K | 90-140W | 架构能力、业务影响 |
| P9 | 90K+ | 140W+ | 技术战略、团队管理 |

---

希望这份面试考点汇总对你有帮助！祝面试顺利！
