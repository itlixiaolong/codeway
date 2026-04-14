---
layout: home

hero:
  name: "李小龙的前端技术博客"
  text: "11 年前端实战 | 架构 · 工程化 · 性能优化 · 面试复盘"
  tagline: "专注企业级前端开发实践，分享可落地的架构方案、性能优化、工程化最佳实践与中大厂面试经验。"
  image:
    src: /avatar.svg
    alt: 李小龙
  actions:
    - theme: brand
      text: 探索文章
      link: /articles/
    - theme: alt
      text: 关于我
      link: /about/

features:
  - icon: 📚
    title: 最新文章
    details: 按时间倒序排列，涵盖前端各个领域的深度技术文章
    link: /articles/
    linkText: 查看全部

  - icon: 🛠️
    title: 技术栈
    details: Vue / React / TS / Vite / Node / 跨端 / 性能优化
    link: /categories/
    linkText: 了解更多

  - icon: 🚀
    title: 开源项目
    details: 组件库、CLI工具、效能插件等可复用解决方案
    link: /projects/
    linkText: 查看项目

  - icon: 👨‍💻
    title: 关于我
    details: 11年前端经验，专注企业级架构与性能优化
    link: /about/
    linkText: 了解更多
---

<div class="home-container">

## 技术栈

<div class="tech-stack">
  <div class="tech-item">
    <div class="tech-icon">💚</div>
    <span class="tech-name">Vue</span>
  </div>
  <div class="tech-item">
    <div class="tech-icon">⚛️</div>
    <span class="tech-name">React</span>
  </div>
  <div class="tech-item">
    <div class="tech-icon">🔷</div>
    <span class="tech-name">TypeScript</span>
  </div>
  <div class="tech-item">
    <div class="tech-icon">⚡</div>
    <span class="tech-name">Vite</span>
  </div>
  <div class="tech-item">
    <div class="tech-icon">🟢</div>
    <span class="tech-name">Node.js</span>
  </div>
  <div class="tech-item">
    <div class="tech-icon">📱</div>
    <span class="tech-name">跨端开发</span>
  </div>
  <div class="tech-item">
    <div class="tech-icon">⚡</div>
    <span class="tech-name">性能优化</span>
  </div>
  <div class="tech-item">
    <div class="tech-icon">🏗️</div>
    <span class="tech-name">工程化</span>
  </div>
</div>

## 开源项目

<div class="projects-grid">
  <div class="project-card">
    <div class="project-header">
      <div class="project-icon">🎨</div>
      <div class="project-info">
        <div class="name">Vue Component Library</div>
        <div class="type">企业级组件库 · 50+ 组件</div>
      </div>
    </div>
    <div class="project-desc">
      基于 Vue 3 的企业级组件库，支持 TypeScript，提供 50+ 高质量组件，复用率达 80%+，配套完整文档和设计规范。
    </div>
    <div class="project-stats">
      <span>⭐ 2.3k</span>
      <span>📦 周下载 5k+</span>
      <span>🐛 持续维护</span>
    </div>
  </div>

  <div class="project-card">
    <div class="project-header">
      <div class="project-icon">🛠️</div>
      <div class="project-info">
        <div class="name">Frontend CLI</div>
        <div class="type">工程化脚手架工具</div>
      </div>
    </div>
    <div class="project-desc">
      提升 3 倍开发效率的前端工程化 CLI，集成了 Vite、ESLint、Prettier、单元测试等最佳实践，开箱即用。
    </div>
    <div class="project-stats">
      <span>⭐ 1.8k</span>
      <span>📦 周下载 3k+</span>
      <span>🔧 可扩展</span>
    </div>
  </div>

  <div class="project-card">
    <div class="project-header">
      <div class="project-icon">⚡</div>
      <div class="project-info">
        <div class="name">Performance Plugin</div>
        <div class="type">性能监控与优化插件</div>
      </div>
    </div>
    <div class="project-desc">
      Webpack/Vite 双引擎性能优化插件，提供代码分割、资源压缩、缓存策略等自动化优化能力。
    </div>
    <div class="project-stats">
      <span>⭐ 1.2k</span>
      <span>📦 周下载 2k+</span>
      <span>⚡ 自动化</span>
    </div>
  </div>
</div>

## 关于我

<div class="about-section">
  <div class="avatar">
    <img src="/avatar.svg" alt="李小龙" />
  </div>
  <h3 class="name">李小龙</h3>
  <p class="title">资深前端工程师 | 前端架构师</p>
  <p class="bio">
    11 年前端开发经验，专注于企业级前端架构设计与性能优化。擅长大中型项目重构、组件库建设、Vite/Webpack 工程化改造。热爱技术分享，乐于用沉淀赋能成长。
  </p>
  <div class="links">
    <a href="https://github.com/itlixiaolong" target="_blank">
      <span>GitHub</span>
    </a>
    <a href="https://itlixiaolong.github.io/codeway" target="_blank">
      <span>博客</span>
    </a>
    <a href="mailto:18231851990@163.com">
      <span>邮箱</span>
    </a>
  </div>
</div>

</div>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;
}

.home-container h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 3rem 0 1.5rem;
  text-align: center;
}

.home-container h2:first-child {
  margin-top: 0;
}

/* 技术栈样式 */
.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  max-width: 900px;
  margin: 0 auto 2rem;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  transition: all 0.25s ease;
}

.tech-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(22, 93, 255, 0.15);
  border-color: #165DFF;
}

.tech-icon {
  font-size: 2rem;
}

.tech-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* 项目卡片样式 */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.25s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.project-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #165DFF 0%, #7C3AED 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.project-info .name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.project-info .type {
  font-size: 0.75rem;
  color: #86909C;
}

.project-desc {
  color: #4E5969;
  font-size: 0.875rem;
  line-height: 1.625;
  margin-bottom: 1rem;
}

.project-stats {
  display: flex;
  gap: 1.5rem;
  font-size: 0.75rem;
  color: #86909C;
}

/* 关于我样式 */
.about-section {
  background: var(--vp-c-bg-soft);
  border-radius: 24px;
  padding: 3rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.about-section .avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  overflow: hidden;
  border: 4px solid #165DFF;
  box-shadow: 0 0 30px rgba(22, 93, 255, 0.3);
}

.about-section .avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-section .name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem;
}

.about-section .title {
  font-size: 1rem;
  color: #165DFF;
  font-weight: 600;
  margin: 0 0 1rem;
}

.about-section .bio {
  color: #4E5969;
  line-height: 1.625;
  max-width: 600px;
  margin: 0 auto 1.5rem;
}

.about-section .links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.about-section .links a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(22, 93, 255, 0.1);
  color: #165DFF;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.25s ease;
  text-decoration: none;
}

.about-section .links a:hover {
  background: #165DFF;
  color: white;
}

/* 响应式 */
@media (max-width: 768px) {
  .home-container {
    padding: 1rem;
  }

  .home-container h2 {
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
  }

  .tech-stack {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
  }

  .tech-item {
    padding: 1rem 0.5rem;
  }

  .tech-icon {
    font-size: 1.5rem;
  }

  .tech-name {
    font-size: 0.75rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .about-section {
    padding: 2rem 1.5rem;
  }

  .about-section .avatar {
    width: 100px;
    height: 100px;
  }
}
</style>
