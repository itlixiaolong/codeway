---
layout: page
title: 关于我
description: 李小龙 · 资深前端工程师的个人介绍
---

# 👨‍💻 关于我

<div class="about-container">

## 基本信息

<div class="profile-card">
  <div class="avatar">
    <img src="/avatar.svg" alt="李小龙" />
  </div>
  <div class="info">
    <h1>李小龙</h1>
    <p class="title">资深前端工程师 · 前端架构师</p>
    <p class="experience">11 年前端开发经验</p>
  </div>
</div>

## 技术方向

<div class="skills-grid">
  <div class="skill-category">
    <h3>🏗️ 架构设计</h3>
    <ul>
      <li>企业级前端架构设计</li>
      <li>微前端架构落地</li>
      <li>Monorepo 多项目治理</li>
      <li>前端监控体系建设</li>
    </ul>
  </div>

  <div class="skill-category">
    <h3>🛠️ 工程化</h3>
    <ul>
      <li>Vite/Webpack 构建优化</li>
      <li>组件库设计与开发</li>
      <li>CLI 工具开发</li>
      <li>自动化测试体系</li>
    </ul>
  </div>

  <div class="skill-category">
    <h3>⚡ 性能优化</h3>
    <ul>
      <li>大型项目性能调优</li>
      <li>Core Web Vitals 优化</li>
      <li>高并发页面优化</li>
      <li>首屏加载优化</li>
    </ul>
  </div>

  <div class="skill-category">
    <h3>📱 跨端开发</h3>
    <ul>
      <li>小程序开发</li>
      <li>React Native</li>
      <li>桌面应用 (Electron)</li>
      <li>响应式设计</li>
    </ul>
  </div>
</div>

## 技术栈

<div class="tech-stack">
  <div class="tech-item major">Vue</div>
  <div class="tech-item major">React</div>
  <div class="tech-item major">TypeScript</div>
  <div class="tech-item">Node.js</div>
  <div class="tech-item">Vite</div>
  <div class="tech-item">Webpack</div>
  <div class="tech-item">Webpack</div>
  <div class="tech-item">Python</div>
  <div class="tech-item">Docker</div>
  <div class="tech-item">K8s</div>
</div>

## Slogan

<div class="slogan">
  <p>用架构提升效率，用优化改善体验，用沉淀赋能成长</p>
</div>

## 联系方式

<div class="contact-links">
  <a href="https://github.com/itlixiaolong" target="_blank" class="contact-item">
    <span class="icon">🐙</span>
    <span class="label">GitHub</span>
    <span class="value">@itlixiaolong</span>
  </a>
  <a href="https://my-blogs-bay.vercel.app" target="_blank" class="contact-item">
    <span class="icon">📝</span>
    <span class="label">博客</span>
    <span class="value">my-blogs-bay.vercel.app</span>
  </a>
  <a href="mailto:18231851990@163.com" class="contact-item">
    <span class="icon">📧</span>
    <span class="label">邮箱</span>
    <span class="value">18231851990@163.com</span>
  </a>
</div>

## 个人优势

<div class="advantages">
  <div class="advantage-item">
    <div class="number">11</div>
    <div class="label">年前端经验</div>
  </div>
  <div class="advantage-item">
    <div class="number">50+</div>
    <div class="label">组件库组件</div>
  </div>
  <div class="advantage-item">
    <div class="number">80%</div>
    <div class="label">组件复用率</div>
  </div>
  <div class="advantage-item">
    <div class="number">3x</div>
    <div class="label">开发效率提升</div>
  </div>
</div>

</div>

<style scoped>
.about-container {
  max-width: 900px;
  margin: 0 auto;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #165DFF;
  box-shadow: 0 0 30px rgba(22, 93, 255, 0.3);
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info h1 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem;
  background: linear-gradient(135deg, #165DFF 0%, #7C3AED 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.info .title {
  font-size: 1.125rem;
  color: #165DFF;
  font-weight: 600;
  margin: 0 0 0.25rem;
}

.info .experience {
  font-size: 0.875rem;
  color: #86909C;
  margin: 0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
}

.skill-category {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 1.5rem;
}

.skill-category h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 1rem;
}

.skill-category ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-category li {
  padding: 0.5rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.skill-category li:last-child {
  border-bottom: none;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 2rem 0;
}

.tech-item {
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.tech-item.major {
  background: linear-gradient(135deg, rgba(22, 93, 255, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
  border-color: rgba(22, 93, 255, 0.3);
  color: #165DFF;
  font-weight: 600;
}

.slogan {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(22, 93, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%);
  border-radius: 16px;
  margin: 2rem 0;
}

.slogan p {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
  line-height: 1.6;
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.25s ease;
  flex: 1;
  min-width: 200px;
}

.contact-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(22, 93, 255, 0.15);
  border-color: #165DFF;
}

.contact-item .icon {
  font-size: 1.25rem;
}

.contact-item .label {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
}

.contact-item .value {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-left: auto;
}

.advantages {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 2rem 0;
}

.advantage-item {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
}

.advantage-item .number {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #165DFF 0%, #7C3AED 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.advantage-item .label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .profile-card {
    flex-direction: column;
    text-align: center;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .advantages {
    grid-template-columns: repeat(2, 1fr);
  }

  .contact-links {
    flex-direction: column;
  }

  .contact-item {
    min-width: auto;
  }
}
</style>
