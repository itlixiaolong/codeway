# 李小龙 · 前端技术博客

> 11 年前端实战 | 架构 · 工程化 · 性能优化 · 面试复盘

基于 VitePress 构建的高性能技术博客，采用极简深色设计风格。

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm / yarn / pnpm

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/itlixiaolong/blog.git
cd blog

# 安装依赖
npm install

# 或使用 pnpm（推荐）
pnpm install
```

### 开发预览

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

### 构建生产版本

```bash
# 构建
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
blog/
├── docs/                          # 文档目录
│   ├── .vitepress/
│   │   ├── config.ts             # VitePress 配置
│   │   ├── theme/                # 自定义主题
│   │   │   ├── index.ts
│   │   │   └── custom.css
│   │   └── styles/
│   │       └── variables.scss
│   │
│   ├── index.md                  # 首页
│   ├── about.md                  # 关于页
│   │
│   ├── articles/                 # 文章目录
│   │   ├── index.md             # 文章列表
│   │   └── senior/2024/          # 资深系列文章
│   │       ├── summary-11-years.md
│   │       ├── enterprise-architecture.md
│   │       ├── performance-optimization.md
│   │       ├── component-library.md
│   │       ├── interview-high-frequency.md
│   │       ├── vitepress-blog.md
│   │       └── monitoring-system.md
│   │
│   ├── categories/               # 分类目录
│   │   ├── frontend-basics/
│   │   ├── frameworks/
│   │   ├── architecture/
│   │   ├── performance/
│   │   ├── interview/
│   │   └── projects/
│   │
│   └── projects/                 # 开源项目展示
│
├── public/                       # 静态资源
│   ├── avatar.svg               # 头像
│   └── favicon.svg              # Favicon
│
├── package.json
├── tsconfig.json
└── README.md
```

## ✏️ 写作指南

### 创建新文章

1. 在 `docs/articles/` 下创建对应的分类目录
2. 创建 Markdown 文件，添加头部元数据：

```markdown
---
title: 文章标题
date: 2024-01-01
tags:
  - 标签1
  - 标签2
categories:
  - 分类
author: 李小龙
description: 文章描述
---

# 文章标题

正文内容...
```

### 文章模板

```markdown
---
title: 文章标题
date: 2024-01-01
tags:
  - 技术标签
categories:
  - 分类名称
author: 李小龙
description: 一句话描述文章内容
---

# 文章标题

> 导语/引言

## 第一章节

内容...

### 子章节

代码示例：

\`\`\`typescript
const example = 'Hello World';
console.log(example);
\`\`\`

::: tip 提示
这是一个提示框
:::

::: warning 注意
这是一个警告框
:::
```

## 🎨 自定义配置

### 修改作者信息

编辑 `docs/.vitepress/config.ts` 中的个人信息：

```typescript
export default defineConfig({
  head: [
    ['meta', { name: 'author', content: '李小龙' }],
  ],

  themeConfig: {
    footer: {
      message: '用架构提升效率，用优化改善体验，用沉淀赋能成长',
      copyright: `Copyright © 2024-${new Date().getFullYear()} 李小龙`
    }
  }
})
```

### 修改颜色主题

编辑 `docs/.vitepress/styles/variables.scss`：

```scss
// 主色调
$brand-primary: #165DFF;
$brand-primary-dark: #4080FF;

// 其他颜色
$success: #00B42A;
$warning: #FF7D00;
$danger: #F53F3F;
```

### 添加新页面

在 `docs/` 目录下创建 Markdown 文件，导航会自动识别：

```markdown
---
layout: page
title: 新页面标题
---

# 页面内容
```

## 🚢 部署

### GitLab Pages（推荐）

项目已配置 `.gitlab-ci.yml`，推送到 `main` 分支后自动部署。

1. Fork 本项目
2. 启用 GitLab Pages
3. 推送代码，等待自动部署

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

### 手动部署到服务器

```bash
# 构建
npm run build

# 上传 dist 目录到服务器
scp -r docs/.vitepress/dist user@server:/var/www/blog
```

### Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/blog;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/index.html =404;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔧 常用命令

| 命令 | 说明 |
|-----|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览构建结果 |

## 📝 技术栈

- **框架**: VitePress 1.x
- **主题**: Vue 3 + TypeScript
- **样式**: SCSS
- **代码高亮**: GitHub Dark

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT

---

**Made with ❤️ by 李小龙**
