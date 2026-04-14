// 新建文章的脚本
const fs = require('fs');
const path = require('path');

const template = `---
title: {{title}}
date: ${new Date().toISOString().split('T')[0]}
tags:
  - 技术
categories:
  - 前端
author: 李小龙
description: {{description}}
---

# {{title}}

> 文章导语...

## 前言

## 正文

### 子标题

\`\`\`typescript
// 代码示例
\`\`\`

## 总结

`;

function createArticle(title, category = 'articles') {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const fileName = `${year}-${month}-${day}-${title}.md`;
  const dir = path.join(__dirname, '..', 'docs', category, year.toString());

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, fileName);
  const content = template.replace(/\{\{title\}\}/g, title);

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Created: ${filePath}`);
}

const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('Usage: node new-article.js <article-title>');
  process.exit(1);
}

createArticle(args[0], args[1] || 'articles');
