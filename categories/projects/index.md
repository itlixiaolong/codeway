---
layout: page
title: 项目复盘
description: 企业级项目实战复盘，技术决策与经验总结
---

# 📋 项目复盘

<p class="page-desc">真实项目中的技术决策与经验总结，避坑指南与最佳实践。</p>

## 项目经验地图

```
┌────────────────────────────────────────────────────────────────┐
│                     项目类型经验分布                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│   📊 企业级后台系统 ───────────────────────── 40%              │
│       └─ 中台化改造、微前端、权限体系                           │
│                                                                │
│   🚀 高并发toC应用 ─────────────────────────── 25%              │
│       └─ 性能优化、SSR、CDN、缓存策略                          │
│                                                                │
│   📱 跨端应用 ──────────────────────────────── 20%              │
│       └─ RN/Flutter/小程序、H5适配                             │
│                                                                │
│   🛠️ 工具类产品 ─────────────────────────────── 15%             │
│       └─ CLI工具、组件库、效能平台                              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 典型项目案例

### 案例 1: 电商中台系统重构

| 维度 | 重构前 | 重构后 | 提升 |
|-----|-------|-------|-----|
| 首屏加载 | 4.2s | 1.8s | **57%** ↓ |
| 代码维护 | 多仓库分散 | Monorepo 统一 | **效率 ↑** |
| 构建速度 | 8min | 2min | **75%** ↓ |
| 组件复用 | 30% | 75% | **2.5x** ↑ |

**关键技术决策：**

```typescript
// 1. 技术栈统一
stack: {
  framework: 'Vue 3',
  state: 'Pinia',
  ui: '自研组件库',
  build: 'Vite 4',
  deploy: 'Docker + K8s'
}

// 2. 微前端架构
qiankun: {
  mainApps: ['运营后台', '商家中心'],
  subApps: ['商品模块', '订单模块', '用户模块']
}

// 3. 性能优化策略
optimization: {
  vite: {
    build: {
      target: 'es2015',
      cssCodeSplit: true,
      rollupOptions: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia']
        }
      }
    }
  }
}
```

### 案例 2: 直播平台高并发优化

```yaml
# 流量特征分析
traffic_pattern:
  peak_qps: 50,000+
  concurrent_users: 100,000+
  data_volume: 10GB/min

# 优化方案
optimization:
  # 静态资源
  static:
    - CDN 全链路加速
    - HTTP/2 + gzip/brotli
    - 资源预加载与懒加载

  # 接口层面
  api:
    - Redis 多级缓存
    - 接口聚合与数据压缩
    - 增量更新与轮询优化

  # 渲染层面
  render:
    - SSR 流式渲染
    - 虚拟列表优化
    - 骨架屏与预渲染
```

### 案例 3: 组件库建设

```bash
# 组件库工程结构
component-library/
├── packages/
│   ├── components/     # 组件源码
│   │   ├── Button/
│   │   ├── Table/
│   │   ├── Form/
│   │   └── ... (50+)
│   │
│   ├── hooks/          # 组合式函数
│   ├── utils/          # 工具函数
│   ├── styles/         # 样式变量
│   └── docs/           # 文档站点
│
├── scripts/            # 构建脚本
│   ├── build.ts        # 组件构建
│   ├── gen.ts          # 模板生成
│   └── type-gen.ts     # 类型生成
│
├── vitest.config.ts    # 测试配置
├── vite.config.ts      # 构建配置
└── package.json
```

## 技术决策记录 (ADR)

::: tip ADR 模板
记录重要技术决策，包含：背景、决策、后果、经验教训
:::

### ADR-001: 选择 Vite 而非 Webpack

**背景：** 构建速度成为开发效率瓶颈，老项目冷启动需要 8+ 分钟

**决策：** 全面迁移到 Vite 5.x

**结果：**
- ✅ 冷启动速度：8min → 3s
- ✅ HMR 速度：5s → 100ms
- ⚠️ 需要处理部分 Node 原生模块兼容

**经验：** 大型项目迁移建议渐进式，先在新项目试点

## 经验教训总结

| 阶段 | 常见问题 | 解决方案 |
|-----|---------|---------|
| 需求阶段 | 需求模糊、技术边界不清 | 技术方案评审前置 |
| 设计阶段 | 过度设计、忽略可维护性 | 设计评审 + 代码审查 |
| 开发阶段 | 规范执行不到位 | CI/CD 质量门禁 |
| 测试阶段 | 测试覆盖率低 | 单元测试 80%+ |
| 上线阶段 | 回滚预案缺失 | 灰度发布 + 快速回滚 |

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

th[colspan="4"] {
  background: var(--vp-c-bg-alt);
}

pre, code {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  border: 1px solid rgba(0, 0, 0, 0.06);
  font-size: 0.875rem;
}
</style>
