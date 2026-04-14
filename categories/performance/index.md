---
layout: page
title: 性能优化
description: 前端性能优化实战，从理论到落地的完整方案
---

# ⚡ 性能优化

<p class="page-desc">从页面加载到运行时，全方位性能优化实战经验。</p>

## 性能优化全景图

```
┌────────────────────────────────────────────────────────────────┐
│                      前端性能优化全景                            │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐   │
│  │   网络层面    │───▶│   渲染层面    │───▶│   运行时     │   │
│  └──────────────┘    └──────────────┘    └──────────────┘   │
│         │                   │                   │            │
│         ▼                   ▼                   ▼            │
│  • HTTP/2 + TLS1.3    • SSR/SSG          • 防抖节流         │
│  • DNS 预解析         • 关键CSS          • 虚拟列表         │
│  • 资源压缩            • 代码分割         • 缓存策略         │
│  • CDN 加速           • 懒加载            • 框架优化         │
│  • 缓存策略            • 骨架屏           • 重排重绘        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 核心指标 (Core Web Vitals)

| 指标 | 达标标准 | 优化策略 |
|-----|---------|---------|
| **LCP** (最大内容绘制) | < 2.5s | 预加载关键资源、优化服务器响应 |
| **FID** (首次输入延迟) | < 100ms | 代码分割、减少主线程阻塞 |
| **CLS** (累积布局偏移) | < 0.1 | 图片尺寸固定、避免动态内容 |
| **TTFB** (首字节时间) | < 600ms | CDN、缓存、服务器优化 |

## 优化实战案例

### 图片优化

```javascript
// 响应式图片策略
const optimizedImage = {
  // 1. 格式选择
  formats: ['avif', 'webp', 'jpg'],

  // 2. 尺寸适配
  sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',

  // 3. 懒加载
  loading: 'lazy',
  decoding: 'async',

  // 4. 预加载关键图片
  preload: [{ href: '/hero.avif', type: 'image/avif' }]
}
```

### 代码分割策略

```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 第三方库分离
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['element-plus', 'ant-design-vue'],

          // 按路由分离
          ...Object.fromEntries(
            routes
              .map(route => route.component)
              .filter(component => component)
              .map((component, index) => [
                `route${index}`,
                [component]
              ])
          )
        }
      }
    }
  }
})
```

### 首屏优化方案

| 优化点 | 具体措施 | 效果 |
|-------|---------|-----|
| SSR/SSG | Nuxt3 / VitePress | LCP ↓ 40% |
| 预加载 | `<link rel="preload">` | TTFB ↓ 30% |
| 关键CSS | 内联首屏样式 | FCP ↓ 25% |
| 代码分割 | 路由懒加载 | TTI ↓ 35% |
| 资源压缩 | gzip + brotli | 传输体积 ↓ 70% |

## 性能监控体系

```typescript
// 性能指标采集
const performanceMetrics = {
  // Navigation Timing
  ttfb: () => performance.timing.responseStart - performance.timing.requestStart,

  // Largest Contentful Paint
  lcp: () => {
    return new Promise(resolve => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        resolve(lastEntry.renderTime || lastEntry.loadTime)
      }).observe({ type: 'largest-contentful-paint', buffered: true })
    })
  },

  // Cumulative Layout Shift
  cls: () => {
    let clsValue = 0
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      }
    }).observe({ type: 'layout-shift', buffered: true })
    return clsValue
  }
}
```

::: tip 性能优化优先级
1. **测量先行**：使用 Lighthouse、Performance API 定位瓶颈
2. **聚焦关键**：优先优化 LCP、CLS 等核心指标
3. **渐进增强**：基础体验优先，再逐步优化
4. **持续监控**：建立性能回归预警机制
:::

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
