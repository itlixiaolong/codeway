import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '李小龙 · 前端技术博客',
  description: '11年前端实战 | 架构 · 工程化 · 性能优化 · 面试复盘',
  lang: 'zh-CN',
  base: '/codeway/',  // GitHub Pages 部署路径
  appearance: true,
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'author', content: '李小龙' }],
    ['meta', { name: 'keywords', content: '前端架构,工程化,性能优化,Vue,React,TypeScript,Vite' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '李小龙 · 前端技术博客' }],
    ['meta', { property: 'og:description', content: '11年前端实战 | 架构 · 工程化 · 性能优化' }],
  ],

  themeConfig: {
    logo: '/avatar.svg',
    siteTitle: 'Bruce Lee',

    nav: [
      { text: '首页', link: '/' },
      { text: '所有文章', link: '/articles/' },
      { text: 'JS/TS', link: '/categories/frontend-basics/' },
      { text: 'Vue/React', link: '/categories/frameworks/' },
      { text: 'CSS', link: '/categories/css/' },
      { text: 'Node', link: '/categories/node/' },
      { text: 'Linux', link: '/categories/linux/' },
      { text: '架构', link: '/categories/architecture/' },
      { text: '关于我', link: '/about/' },
    ],

    sidebar: {
      '/categories/frontend-basics/': [
        {
          text: 'JavaScript',
          collapsed: true,
          items: [
            { text: 'JavaScript 骚操作', link: '/articles/js/es6/js-tricks' },
            { text: 'JS高级用法', link: '/articles/js/es6/JS高级用法：像大神一样玩转JavaScript' },
            { text: 'async面试题', link: '/articles/js/es6/async面试题' },
            { text: '浏览器垃圾回收机制', link: '/articles/js/es6/浏览器垃圾回收机制' },
            { text: '获取形如a.b.c的函数', link: '/articles/js/es6/写一个可以获取形如\'a.b.c\'的函数' },
            { text: '控制反转和依赖注入', link: '/articles/js/es6/控制反转和依赖注入的理解(通俗易懂)' },
          ]
        },
        {
          text: 'TypeScript',
          collapsed: true,
          items: [
            { text: 'TS 高级技巧', link: '/articles/js/ts/ts-advanced-tips' },
            { text: 'TS 使用概要', link: '/articles/js/ts/ts-usage' },
            { text: 'TS 使用技巧', link: '/articles/js/ts/ts-tips' },
            { text: 'TS 在 Vue 中的使用', link: '/articles/js/ts/ts-in-vue' },
            { text: '类型区别', link: '/articles/js/ts/ts-type-differences' },
            { text: 'TS 资源库', link: '/articles/js/ts/ts-resources' },
          ]
        }
      ],
      '/categories/frameworks/': [
        {
          text: 'Vue',
          collapsed: true,
          items: [
            { text: 'Vue 高级技巧', link: '/articles/vue/vue-advanced-tips' },
            { text: 'Vue 专家秘密', link: '/articles/vue/vue-secrets' },
            { text: 'Vue 单元测试', link: '/articles/vue/vue-unit-test' },
            { text: 'Vue3 UI 框架', link: '/articles/vue/vue3-ui-frameworks' },
            { text: 'Vue 源码学习', link: '/articles/vue/vue-source-learning' },
            { text: 'Vue3 技术详解', link: '/articles/vue/vue3中的一些技术详解' },
            { text: 'Vue2 和 Vue3 区别', link: '/articles/vue/vue2和vue3的技术实现的区别' },
            { text: 'Vue3 技术优势', link: '/articles/vue/vue3的技术优势' },
            { text: 'Vue3 reactive 简易实现', link: '/articles/vue/vue3中reactive的简易实现' },
            { text: 'Vue3 ref 和 reactive 区别', link: '/articles/vue/vue3中ref和reactive的区别' },
            { text: 'Vue 和 React 区别', link: '/articles/vue/vue和react在技术实现和使用上的区别' },
            { text: 'Vue2 与 Vue3 Diff 算法', link: '/articles/vue/Vue2与Vue3Diff算法区别' },
            { text: 'Vue3 ElementUI 二次封装', link: '/articles/vue/vue3中怎么对elementUI进行二次封装' },
            { text: '极简版 Vue3', link: '/articles/vue/极简版vue3' },
          ]
        },
        {
          text: 'React',
          collapsed: true,
          items: [
            { text: 'JSX 非工程化使用', link: '/articles/vue/react/react-jsx-without-build' },
            { text: 'Redux connect 实现', link: '/articles/vue/react/react-redux-connect' },
            { text: 'React 面试题汇总', link: '/articles/vue/react/react-interview-full' },
            { text: 'React 面试题（二）', link: '/articles/vue/react/react-interview-2' },
            { text: 'React 面试题链接', link: '/articles/vue/react/react-interview-links' },
            { text: 'React 开发知识汇总', link: '/articles/vue/react/react-knowledge-summary' },
            { text: 'React 开发相关', link: '/articles/vue/react/react-development' },
            { text: 'React 路由小知识', link: '/articles/vue/react/react-router-tips' },
            { text: 'React 组件封装技巧', link: '/articles/vue/react/react-component-encapsulation' },
            { text: 'React Router 6 快速上手', link: '/articles/vue/react/react-router6-guide' },
            { text: 'useLayoutEffect vs useEffect', link: '/articles/vue/react/react-uselayouteffect' },
            { text: 'Redux 的概念', link: '/articles/vue/react/redux的概念' },
            { text: 'Redux 的工作流程', link: '/articles/vue/react/redux的工作流程' },
            { text: 'Redux createStore', link: '/articles/vue/react/redux-createStore' },
            { text: 'Redux 中间件原理', link: '/articles/vue/react/redux的中间键原理' },
            { text: 'Redux combineReducers', link: '/articles/vue/react/redux-combineReducers%20的实现' },
          ]
        }
      ],
      '/categories/css/': [
        {
          text: 'CSS',
          collapsed: true,
          items: [
            { text: 'CSS 3D 环绕效果', link: '/articles/css/css-3d-effect' },
            { text: 'BEM 规范详解', link: '/articles/css/css-bem' },
            { text: 'BEM 官方规范', link: '/articles/css/css-bem-official' },
            { text: '5个很常用的CSS3网页小实例', link: '/articles/css/5个很常用的CSS3网页小实例' },
            { text: 'CSS使用技巧', link: '/articles/css/CSS使用技巧' },
            { text: 'CSS实现一个粒子动效的按钮', link: '/articles/css/CSS实现一个粒子动效的按钮' },
            { text: 'CSS实现表单验证', link: '/articles/css/CSS实现表单验证' },
            { text: 'CSS层级小技巧', link: '/articles/css/CSS层级小技巧！如何在滚动时自动添加头部阴影？' },
            { text: '一行CSS暗黑模式', link: '/articles/css/一行CSS的代码为网页添加暗黑模式的支持' },
            { text: '不再需要 JS 做的 5 件事', link: '/articles/css/不再需要%20JS%20做的%205%20件事' },
            { text: '关于 z-index 误区', link: '/articles/css/关于%20z-index，你可能一直存在误区' },
            { text: 'CSS 大师 GitHub 仓库', link: '/articles/css/助你成为%20CSS%20大师的18个%20GitHub%20仓库' },
            { text: '响应式布局新方案', link: '/articles/css/响应式布局新方案' },
            { text: '好玩的CSS开源项目', link: '/articles/css/好玩的CSS开源项目' },
            { text: '微信H5页面兼容方案', link: '/articles/css/微信H5页面兼容方案' },
            { text: '40 个 CSS 布局技巧', link: '/articles/css/收藏！40%20个%20CSS%20布局技巧' },
            { text: '移动端1px解决方案', link: '/articles/css/移动端1px的解决方案' },
            { text: 'CSS超出显示省略号', link: '/articles/css/css超出....md' },
            { text: 'CSS居中元素的方法', link: '/articles/css/css中居中元素的方法.md' },
          ]
        }
      ],
      '/categories/node/': [
        {
          text: 'Node',
          items: [
            { text: 'minimist 使用', link: '/articles/node/npm-minimist' },
            { text: 'hash/chunkhash/contenthash', link: '/articles/node/hash、chunkhash、cententhash的区别' },
          ]
        }
      ],
      '/categories/linux/': [
        {
          text: 'Linux',
          items: [
            { text: 'Linux 基本命令', link: '/articles/linux/linux-basics' },
            { text: '打包压缩', link: '/articles/linux/linux-compress' },
            { text: '文件查看', link: '/articles/linux/linux-file-view' },
            { text: '文件查找', link: '/articles/linux/linux-find' },
            { text: '权限操作', link: '/articles/linux/linux-permission' },
            { text: 'grep 命令', link: '/articles/linux/linux-grep' },
            { text: 'Vim 操作', link: '/articles/linux/linux-vim' },
            { text: 'Nginx 使用', link: '/articles/linux/linux-nginx' },
          ]
        }
      ],
      '/categories/utils/': [
        {
          text: '工具技巧',
          items: [
            { text: 'Git 常见报错', link: '/articles/utils/git-troubleshooting' },
            { text: 'Git 工作流', link: '/articles/utils/git-workflow' },
            { text: 'Git 删除分支', link: '/articles/utils/git-delete-branch' },
            { text: 'VSCode Git', link: '/articles/utils/vscode-git' },
            { text: 'Zsh Git 快捷键', link: '/articles/utils/zsh-git-shortcuts' },
            { text: 'GitHub 搜索', link: '/articles/utils/github-search-tips' },
            { text: 'Google 搜索', link: '/articles/utils/google-search-tips' },
          ]
        }
      ],
      '/categories/architecture/': [
        {
          text: '高级 / 架构',
          items: [
            { text: '组件库设计与封装', link: '/articles/senior/2024/component-library' },
            { text: '企业级前端架构设计', link: '/articles/senior/2024/enterprise-architecture' },
            { text: '中大厂面试高频考点', link: '/articles/senior/2024/interview-high-frequency' },
            { text: '前端监控体系', link: '/articles/senior/2024/monitoring-system' },
            { text: '大型项目性能优化', link: '/articles/senior/2024/performance-optimization' },
            { text: '11年前端技术成长', link: '/articles/senior/2024/summary-11-years' },
            { text: 'VitePress 博客搭建', link: '/articles/senior/2024/vitepress-blog' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/itlixiaolong' },
      { icon: 'mail', link: 'mailto:18231851990@163.com' }
    ],

    footer: {
      message: '用架构提升效率，用优化改善体验，用沉淀赋能成长',
      copyright: `Copyright © 2024-${new Date().getFullYear()} 李小龙 · 资深前端工程师`
    },

    editLink: {
      pattern: 'https://github.com/itlixiaolong/codeway/edit/master/:path',
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateOptions: { year: 'numeric', month: 'long', day: 'numeric' }
      }
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  },

  ignoreDeadLinks: true
})
