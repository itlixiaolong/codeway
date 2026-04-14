---
title: VitePress 从 0 到 1 搭建个人博客
date: 2024-02-15
tags:
  - 工具使用
  - VitePress
  - 博客
categories:
  - 工具使用
author: 李小龙
description: 完整记录使用 VitePress 搭建个人技术博客的完整过程，从项目初始化到部署上线的详细教程
---

# VitePress 从 0 到 1 搭建个人博客

> VitePress 是 Vue 官方推荐的静态网站生成器，基于 Vite 构建，速度极快。本文记录了我搭建这个博客的完整过程。

## 一、项目初始化

### 1.1 创建项目

```bash
# 创建项目目录
mkdir my-blog && cd my-blog

# 初始化 package.json
npm init -y

# 安装 VitePress
npm install vitepress vue

# 或者使用 yarn
yarn add vitepress vue --dev

# 或者使用 pnpm
pnpm add vitepress vue -D
```

### 1.2 目录结构

```bash
my-blog/
├── docs/                     # 文档目录（VitePress 约定）
│   ├── .vitepress/
│   │   ├── config.ts         # 配置文件
│   │   ├── theme/            # 主题目录
│   │   │   ├── index.ts      # 主题入口
│   │   │   └── custom.css    # 自定义样式
│   │   └── dist/             # 构建输出
│   ├── index.md              # 首页
│   ├── about.md              # 关于页
│   └── articles/
│       └── example.md        # 示例文章
│
├── package.json
├── tsconfig.json
└── README.md
```

### 1.3 配置 package.json

```json
{
  "name": "my-blog",
  "version": "1.0.0",
  "scripts": {
    "dev": "vitepress dev",
    "build": "vitepress build",
    "preview": "vitepress preview"
  },
  "devDependencies": {
    "vitepress": "^1.3.4",
    "vue": "^3.4.31"
  }
}
```

## 二、基础配置

### 2.1 VitePress 配置

```typescript
// docs/.vitepress/config.ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 基础配置
  title: '我的技术博客',
  description: '分享前端技术、架构设计与性能优化',
  lang: 'zh-CN',

  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/articles/' },
      { text: '关于', link: '/about/' }
    ],

    // 侧边栏
    sidebar: [
      {
        text: '前端基础',
        items: [
          { text: 'JavaScript', link: '/basics/js/' },
          { text: 'CSS', link: '/basics/css/' }
        ]
      }
    ],

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/username' }
    ],

    // 页脚
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2024'
    }
  },

  // Markdown 配置
  markdown: {
    theme: 'github-dark',
    lineNumbers: true
  }
})
```

### 2.2 首页配置

```yaml
# docs/index.md
---
layout: home

hero:
  name: "我的技术博客"
  text: "前端开发 · 架构设计 · 性能优化"
  tagline: 分享技术，沉淀成长
  image:
    src: /logo.png
    alt: Logo
  actions:
    - theme: brand
      text: 开始阅读
      link: /articles/
    - theme: alt
      text: 关于我
      link: /about/

features:
  - icon: 📚
    title: 技术文章
    details: 深入讲解前端技术原理与最佳实践
  - icon: 🏗️
    title: 架构设计
    details: 分享企业级项目架构经验
  - icon: ⚡
    title: 性能优化
    details: 实战性能优化案例分析
---
```

## 三、深度定制

### 3.1 自定义主题

```typescript
// docs/.vitepress/theme/index.ts
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,

  // 布局插槽
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 自定义插槽
    })
  },

  // 增强应用
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    // app.component('MyComponent', MyComponent)

    // 添加插件
    // app.use(MyPlugin)
  }
} satisfies Theme
```

### 3.2 自定义样式

```scss
// docs/.vitepress/theme/custom.css

// 品牌色
:root {
  --vp-c-brand-1: #165DFF;
  --vp-c-brand-2: #4080FF;
  --vp-c-brand-3: #165DFF;
}

// 深色模式
.dark {
  --vp-c-brand-1: #4080FF;
  --vp-c-brand-2: #5393FF;
}

// 首页 Hero
.VPHero {
  .name {
    font-size: 3.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #165DFF, #7C3AED);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

// 代码块样式
.vp-code-group {
  border-radius: 12px;
  overflow: hidden;
}

// 表格样式
table {
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px;
    border: 1px solid var(--vp-c-divider);
  }

  th {
    background: var(--vp-c-bg-soft);
    font-weight: 600;
  }
}
```

### 3.3 添加评论功能

```typescript
// docs/.vitepress/theme/components/Comment.vue
<template>
  <div id="comment-container"></div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps<{
  repo: string
  repoId: string
  category: string
  categoryId: string
}>()

onMounted(() => {
  // 动态加载 Giscus
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', props.repo)
  script.setAttribute('data-repo-id', props.repoId)
  script.setAttribute('data-category', props.category)
  script.setAttribute('data-category-id', props.categoryId)
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  script.crossOrigin = 'anonymous'
  script.async = true

  document.getElementById('comment-container')?.appendChild(script)
})
</script>
```

## 四、内容编写

### 4.1 Markdown 增强

```markdown
# 标题

## 代码块

```typescript
const hello = 'world'
console.log(hello)
```

## 自定义容器

::: tip 提示
这是一个提示信息
:::

::: warning 注意
这是一个警告信息
:::

::: danger 危险
这是一个危险信息
:::

::: details 代码详情
这是一个可折叠的代码详情
:::

## 表格

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据 | 数据 | 数据 |

## 任务列表

- [x] 已完成
- [ ] 进行中
- [ ] 待完成
```

### 4.2 文章元数据

```yaml
---
title: 文章标题
date: 2024-01-01
tags:
  - 标签1
  - 标签2
categories:
  - 分类1
  - 分类2
author: 作者名
description: 文章描述
---
```

### 4.3 组件使用

```vue
<!-- 嵌入 Vue 组件 -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

# 点击计数

当前计数: {{ count }}

<button @click="count++">增加</button>
```

## 五、部署上线

### 5.1 GitHub Pages 部署

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

### 5.2 Vercel 部署

```bash
# vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/docs/.vitepress/dist/$1" }
  ]
}
```

### 5.3 Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/blog;

    location / {
        try_files $uri $uri.html $uri/index.html =404;
    }

    # SPA fallback
    location /articles {
        try_files $uri $uri.html =404;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 六、性能优化

### 6.1 Lighthouse 优化

```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  // SEO 优化
  head: [
    ['meta', { name: 'theme-color', content: '#165DFF' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:image', content: '/og-image.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }]
  ],

  // 构建优化
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue']
          }
        }
      }
    }
  }
})
```

### 6.2 图片优化

```markdown
<!-- 使用 CDN 和现代格式 -->
![描述](https://cdn.example.com/image.webp)

<!-- 响应式图片 -->
<img
  src="/image-800.jpg"
  srcset="/image-400.jpg 400w, /image-800.jpg 800w, /image-1200.jpg 1200w"
  sizes="(max-width: 400px) 400w, (max-width: 800px) 800w"
  loading="lazy"
  alt="描述"
/>
```

## 七、常用技巧

### 7.1 多语言支持

```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
    }
  }
})
```

### 7.2 搜索功能

```typescript
export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        locales: {
          'zh-CN': {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              }
            }
          }
        }
      }
    }
  }
})
```

### 7.3 代码高亮

```typescript
export default defineConfig({
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  }
})
```

## 八、成果展示

```
┌─────────────────────────────────────────────────────────────────┐
│                      博客技术指标                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ⚡ 构建速度 ──────────────────────── < 1s                      │
│   📊 Lighthouse ────────────────────── 98 分                    │
│   📦 Bundle ────────────────────────── < 100KB                  │
│   🌐 首次加载 ──────────────────────── < 2s                      │
│   📱 响应式 ────────────────────────── ✅ 完美支持               │
│   🌙 深色模式 ──────────────────────── ✅ 支持                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 总结

::: tip 关键要点
1. **VitePress 约定优于配置**：遵循其目录结构约定
2. **Markdown + Vue**：内容使用 Markdown，业务组件使用 Vue
3. **主题继承**：基于 DefaultTheme 进行定制
4. **CI/CD 自动化**：配置自动化部署流程
5. **持续优化**：关注 Lighthouse 评分
:::

VitePress 是一个非常优秀的静态博客框架，基于 Vite 的极速开发体验，加上 Vue 3 的组件化能力，让博客开发变得简单高效。

希望这篇教程对你有帮助，快去搭建你的专属博客吧！
