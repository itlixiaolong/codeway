---
title: 大型项目性能优化：从 3.5s → 1.2s 实战复盘
date: 2024-03-05
tags:
  - 性能优化
  - 项目复盘
  - Lighthouse
categories:
  - 性能优化
author: 李小龙
description: 完整复盘一次大型前端项目的性能优化过程，从指标分析到方案落地，最终实现 LCP 从 3.5s 到 1.2s 的突破
---

# 大型项目性能优化：从 3.5s → 1.2s 实战复盘

> 本文来自真实项目复盘，详细记录了性能优化的完整过程与关键决策。

## 项目背景

```
┌─────────────────────────────────────────────────────────────────┐
│                      项目概况                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   项目类型：企业级电商中台系统                                    │
│   前端团队：8 人                                                 │
│   月活用户：50 万+                                               │
│   技术栈：Vue 3 + Element Plus + Vite                           │
│                                                                  │
│   ┌────────────┐                                                │
│   │ 优化前指标  │                                                │
│   ├────────────┤                                                │
│   │ LCP: 3.5s  │  ──────❌ 需要优化                              │
│   │ FID: 120ms │  ──────❌ 需要优化                              │
│   │ CLS: 0.25  │  ──────❌ 需要优化                              │
│   │ TTI: 5.2s  │  ──────❌ 需要优化                              │
│   └────────────┘                                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 一、现状分析

### 1.1 性能指标测量

```typescript
// 性能指标采集
interface PerformanceMetrics {
  // Navigation Timing
  ttfb: number;          // Time to First Byte
  fcp: number;            // First Contentful Paint
  lcp: number;            // Largest Contentful Paint
  tti: number;           // Time to Interactive
  cls: number;           // Cumulative Layout Shift

  // Web Vitals
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;

  // Bundle 分析
  totalSize: number;
  jsSize: number;
  cssSize: number;
  imageSize: number;
}
```

### 1.2 Bundle 分析

```bash
# 构建产物分析
vite-bundle-analyzer

┌────────────────────────────────────────────────────────────┐
│                     Bundle 体积分析                        │
├────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │ ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛ vue (245KB)         │  │
│   │ ⬛⬛⬛⬛⬛⬛⬛ element-plus (312KB)               │  │
│   │ ⬛⬛⬛⬛ echarts (156KB)                          │  │
│   │ ⬛⬛⬛ lodash (68KB)                             │  │
│   │ ⬛⬛ dayjs (32KB)                                │  │
│   │ ⬛⬛ axios (18KB)                                │  │
│   │ ⬜ 其他 (156KB)                                  │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Total: ~1MB ❌ (目标: < 500KB)                            │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

## 二、问题定位

### 2.1 性能瓶颈分析

| 问题类型 | 具体表现 | 影响程度 | 优先级 |
|---------|---------|---------|-------|
| 资源体积过大 | 第三方库未按需加载 | ⭐⭐⭐⭐⭐ | P0 |
| 图片未优化 | 大图未压缩、无懒加载 | ⭐⭐⭐⭐ | P1 |
| 首屏渲染阻塞 | SSR 缺失、CSS 内联不足 | ⭐⭐⭐⭐ | P1 |
| 代码分割不足 | 所有路由打包成单文件 | ⭐⭐⭐⭐ | P1 |
| 缓存策略缺失 | 静态资源无持久缓存 | ⭐⭐⭐ | P2 |
| 接口请求过多 | 无请求合并与缓存 | ⭐⭐⭐ | P2 |

### 2.2 关键瓶颈代码

```typescript
// ❌ 问题代码 1：全局引入 lodash
import _ from 'lodash';

// ✅ 优化：按需引入
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// ❌ 问题代码 2：路由全部同步加载
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  // 所有路由一次性加载
];

// ✅ 优化：路由懒加载
const routes = [
  { path: '/', component: () => import('./views/Home.vue') },
  { path: '/about', component: () => import('./views/About.vue') },
];
```

## 三、优化方案

### 3.1 整体优化策略

```
┌─────────────────────────────────────────────────────────────────┐
│                      性能优化策略                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   📦 资源优化 ─────────────────────────────────────────────────  │
│   ├─ Tree-shaking 优化                                           │
│   ├─ 按需加载 (Element Plus / lodash)                            │
│   ├─ 图片压缩与格式优化 (WebP/AVIF)                               │
│   └─ 动态导入                                                    │
│                                                                  │
│   🚀 加载优化 ─────────────────────────────────────────────────  │
│   ├─ 路由代码分割                                                │
│   ├─ 预加载关键资源                                              │
│   ├─ 预连接关键域名                                              │
│   └─ 骨架屏与 Loading                                            │
│                                                                  │
│   🔧 渲染优化 ─────────────────────────────────────────────────  │
│   ├─ SSR/SSG                                                    │
│   ├─ 虚拟列表                                                    │
│   ├─ 长任务拆分                                                  │
│   └─ CSS 优化                                                    │
│                                                                  │
│   📡 请求优化 ─────────────────────────────────────────────────  │
│   ├─ 接口合并                                                    │
│   ├─ 数据缓存                                                    │
│   └─ 增量更新                                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Vite 构建优化

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteCompression } from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  build: {
    // 目标浏览器
    target: 'es2015',

    // 代码分割
    rollupOptions: {
      output: {
        // 手动分包策略
        manualChunks: {
          // 核心框架
          'vue-core': ['vue', 'vue-router', 'pinia'],

          // UI 组件库（按需导入）
          'element-plus': ['element-plus'],

          // 图表库（懒加载）
          'charts': ['echarts'],

          // 工具库
          'utils': ['lodash-es', 'dayjs', 'axios']
        },

        // 文件名带 hash
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },

    // 资源内联阈值
    assetsInlineLimit: 4096,  // 4KB 以下的资源内联

    // 禁用 CSS 分割
    cssCodeSplit: false,

    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    }
  },

  // 依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia']
  },

  plugins: [
    vue(),
    // Gzip 压缩
    viteCompression({
      algorithm: 'gzip',
      threshold: 10240  // 10KB 以上资源压缩
    }),
    // Bundle 分析
    visualizer({
      filename: 'bundle-stats.html',
      open: false
    })
  ]
});
```

### 3.3 Element Plus 按需引入

```typescript
// main.ts
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// ❌ 全部引入（增加 300KB+）
// import ElementPlus from 'element-plus';

// ✅ 按需引入（只引入用到的组件）
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElTable,
  ElTableColumn,
  ElDialog,
  ElMessage,
  ElMessageBox
} from 'element-plus';

// 自动导入配置（推荐）
// plugins/element.ts
import type { App } from 'vue';

export const setupElementPlus = (app: App) => {
  const components = [
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElTable,
    ElTableColumn,
    ElDialog,
    ElMessage
  ];

  components.forEach(component => {
    app.use(component);
  });
};
```

### 3.4 图片优化方案

```typescript
// utils/image.ts
interface ImageOptions {
  src: string;
  width?: number;
  height?: number;
  format?: 'webp' | 'avif' | 'jpg';
  quality?: number;
  lazy?: boolean;
}

// 图片 URL 转换（对接 CDN）
const transformImageUrl = (options: ImageOptions): string => {
  const { src, width, format, quality } = options;

  // 如果是外部 URL 或 base64，直接返回
  if (src.startsWith('http') || src.startsWith('data:')) {
    return src;
  }

  // 构建 CDN URL
  const params: string[] = [];

  if (width) params.push(`w_${width}`);
  if (format) params.push(`f_${format}`);
  if (quality) params.push(`q_${quality}`);

  return params.length > 0
    ? `${CDN_BASE}/${src}?${params.join(',')}`
    : `${CDN_BASE}/${src}`;
};

// 响应式图片组件
const ResponsiveImage = ({
  src,
  alt,
  widths = [320, 640, 960, 1280]
}) => {
  const webpSrc = widths.map(w => ({
    src: transformImageUrl({ src, width: w, format: 'webp' }),
    width: w
  }));

  const fallbackSrc = transformImageUrl({ src, width: 960 });

  return (
    <picture>
      {webpSrc.map(({ src, width }) => (
        <source
          key={width}
          srcSet={src}
          media={`(max-width: ${width}px)`}
          type="image/webp"
        />
      ))}
      <img
        src={fallbackSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={widths[widths.length - 1]}
      />
    </picture>
  );
};
```

### 3.5 预加载与预连接

```html
<!-- index.html -->
<head>
  <!-- DNS 预解析 -->
  <link rel="dns-prefetch" href="//cdn.example.com">
  <link rel="dns-prefetch" href="//api.example.com">

  <!-- 预连接关键域名 -->
  <link rel="preconnect" href="https://cdn.example.com" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">

  <!-- 预加载关键资源 -->
  <link rel="preload" href="/assets/main.[hash].js" as="script">
  <link rel="preload" href="/assets/main.[hash].css" as="style">
  <link rel="preload" href="/fonts/Inter.woff2" as="font" crossorigin>

  <!-- 预加载 LCP 图片 -->
  <link rel="preload" href="/images/hero.webp" as="image" fetchpriority="high">

  <!-- 预取未来资源 -->
  <link rel="prefetch" href="/views/dashboard.js" as="script">
  <link rel="prefetch" href="/api/user-info.json" as="fetch">
</head>
```

### 3.6 虚拟列表优化

```typescript
// components/VirtualList.vue
<template>
  <div ref="containerRef" class="virtual-list" @scroll="onScroll">
    <div :style="{ height: totalHeight + 'px', position: 'relative' }">
      <div
        v-for="item in visibleItems"
        :key="item.id"
        :style="getItemStyle(item)"
        class="virtual-list-item"
      >
        <slot :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  items: any[];
  itemHeight: number;
  buffer?: number;
}>();

const containerRef = ref<HTMLElement>();
const scrollTop = ref(0);

const totalHeight = computed(() => props.items.length * props.itemHeight);

const visibleRange = computed(() => {
  const buffer = props.buffer || 5;
  const start = Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - buffer);
  const visible = Math.ceil((containerRef.value?.clientHeight || 0) / props.itemHeight);
  const end = Math.min(props.items.length, start + visible + buffer * 2);

  return { start, end };
});

const visibleItems = computed(() =>
  props.items.slice(visibleRange.value.start, visibleRange.value.end)
);

const getItemStyle = (item: any) => {
  const index = props.items.indexOf(item);
  return {
    position: 'absolute',
    top: `${index * props.itemHeight}px`,
    left: 0,
    right: 0,
    height: `${props.itemHeight}px`
  };
};
</script>
```

## 四、缓存策略

### 4.1 HTTP 缓存配置

```typescript
// 服务器配置示例（Node.js + Nginx）

// Node.js 静态资源缓存
app.use('/assets', express.static('dist/assets', {
  maxAge: '1 year',
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    // HTML 不缓存
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
      return;
    }

    // 静态资源长期缓存
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
}));

// Nginx 配置
/*
location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
*/
```

### 4.2 应用层缓存

```typescript
// utils/cache.ts
interface CacheOptions {
  storage: 'localStorage' | 'sessionStorage' | 'memory';
  prefix: string;
  ttl: number;  // 过期时间（毫秒）
}

class DataCache {
  private cache = new Map<string, { value: any; expire: number }>();

  set(key: string, value: any, ttl: number) {
    this.cache.set(key, {
      value,
      expire: Date.now() + ttl
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expire) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }
}

// API 数据缓存
const apiCache = new DataCache();

const fetchWithCache = async <T>(
  key: string,
  api: () => Promise<T>,
  ttl = 5 * 60 * 1000  // 5分钟
): Promise<T> => {
  const cached = apiCache.get(key);
  if (cached) return cached;

  const data = await api();
  apiCache.set(key, data, ttl);
  return data;
};
```

## 五、效果对比

### 5.1 优化前后指标

```
┌─────────────────────────────────────────────────────────────────┐
│                      优化效果对比                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   指标      │  优化前  │  优化后  │  提升  │  达标  │            │
│   ──────────┼─────────┼─────────┼────────┼────────│            │
│   LCP       │  3.5s   │  1.2s   │  66%↓  │  ✅    │            │
│   FID       │  120ms  │  15ms   │  88%↓  │  ✅    │            │
│   CLS       │  0.25   │  0.05   │  80%↓  │  ✅    │            │
│   TTI       │  5.2s   │  2.1s   │  60%↓  │  ✅    │            │
│   Bundle    │  1.0MB  │  320KB  │  68%↓  │  ✅    │            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Lighthouse 评分

```
┌─────────────────────────────────────────────────────────────────┐
│                      Lighthouse 报告                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   📊 Performance    ████████████████████  98    ✅ Excellent   │
│   📊 Accessibility   ████████████████████  95    ✅ Good       │
│   📊 Best Practices  ████████████████████  100   ✅ Excellent  │
│   📊 SEO              ████████████████████  100   ✅ Excellent  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 六、监控与持续优化

### 6.1 性能监控体系

```typescript
// utils/performance.ts

// 核心 Web Vitals 采集
const reportWebVitals = () => {
  // LCP
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    sendToAnalytics('lcp', lastEntry.renderTime);
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  // FID
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      sendToAnalytics('fid', entry.processingStart - entry.startTime);
    });
  }).observe({ type: 'first-input', buffered: true });

  // CLS
  let clsValue = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    }
    sendToAnalytics('cls', clsValue);
  }).observe({ type: 'layout-shift', buffered: true });
};
```

### 6.2 性能预算

```json
{
  "performance-budget": {
    "timings": [
      { "metric": "interactive", "budget": 3000 },
      { "metric": "first-contentful-paint", "budget": 1000 },
      { "metric": "total-blocking-time", "budget": 200 }
    ],
    "resources": [
      { "resourceType": "script", "budget": 200 },
      { "resourceType": "image", "budget": 100 },
      { "total": 400 }
    ]
  }
}
```

## 七、总结

::: tip 性能优化核心要点
1. **测量先行**：用数据说话，不要猜测
2. **分阶段优化**：P0 → P1 → P2，按优先级推进
3. **关注用户体验**：优化 LCP 就是优化用户体验
4. **持续监控**：建立性能回归预警机制
5. **团队协作**：性能优化需要产品、设计、后端协同
:::

::: warning 常见误区
1. **过早优化**：先跑通功能，再优化性能
2. **过度优化**：追求极致反而增加复杂度
3. **只看 Lighthouse**：实验室数据不等于真实用户感受
4. **忽略移动端**：必须测试真实设备
:::

希望这篇复盘文章对你有帮助。如果觉得不错，欢迎分享给需要的朋友！
