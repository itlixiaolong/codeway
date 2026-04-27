# 手写组件库：实现**原生支持按需引入 JS + CSS**（最标准方案）
你自己写的组件库，要想让使用者**直接 `import { A } from 'my-lib'` 就能自动按需引入对应 JS 和 CSS**，核心是：**组件库目录结构 + package.json 配置 + 样式分离**。

我给你一套**业界通用、开箱即用**的标准方案，照着做就能完美支持按需引入。

---

## 一、先定最终目标（使用者体验）
你的组件库做好后，别人使用时：
```js
// 只引入 Button 组件 + 自动引入 Button.css
import { Button, Input } from 'my-components'
```
**不用手动引 css，不用配置插件，天然支持按需引入。**

---

## 二、组件库目录结构（必须这样建）
这是**按需引入的核心**，目录决定一切：
```
your-lib/
├── package.json
├── dist/                # 打包输出目录（按需引入的核心）
│   ├── button/
│   │   ├── index.js     # Button 组件 JS
│   │   └── style.css    # Button 单独样式
│   ├── input/
│   │   ├── index.js
│   │   └── style.css
│   └── index.js         # 全量导出文件
└── src/                 # 源码
    ├── button/
    │   ├── index.vue
    │   └── index.less
    ├── input/
    │   ├── index.vue
    │   └── index.less
    └── index.js         # 全量导出
```

---

## 三、核心实现：每个组件单独导出 JS + CSS
### 1. 每个组件必须独立打包
**button/index.js**（组件单独导出）
```js
// 导出组件
import Button from './Button.vue'
export default Button
```

**button/style.css**（组件单独样式）
只包含当前按钮的样式，**不污染其他组件**。

### 2. 库入口全量导出（方便使用者 tree-shaking）
**src/index.js**
```js
export { default as Button } from './button'
export { default as Input } from './input'
```

---

## 四、package.json 关键配置（决定能否按需引入）
```json
{
  "name": "my-components",
  "main": "dist/index.js",
  "module": "dist/index.js",
  
  // 👇 这两行是按需引入的灵魂配置
  "style": "dist/index.css",
  "exports": {
    "./button": {
      "import": "./dist/button/index.js",
      "style": "./dist/button/style.css"
    },
    "./input": {
      "import": "./dist/input/index.js",
      "style": "./dist/input/style.css"
    }
  }
}
```

**作用**：告诉打包工具（Webpack/Vite）
- 引入 `Button` 时 → 去 `dist/button/index.js`
- 自动找到 `dist/button/style.css` 引入样式

---

## 五、自动让使用者 `import { X }` 自动引 CSS（终极方案）
你要让使用者**零配置**，就必须在**组件 JS 里自动引入自己的 CSS**。

这是**手写组件库实现自动按需引入的行业标准做法**：

修改 `dist/button/index.js`：
```js
// 自动引入当前组件的样式
import './style.css'

// 导出组件
import Button from './Button.vue'
export default Button
```

✅ **效果**：
```js
import { Button } from 'my-components'
```
→ 自动引入 `Button` JS + 自动引入 `Button.css`

→ 没用到的组件 **完全不打包**，真正按需！

---

## 六、打包脚本（Vite 一键打包成按需结构）
你可以用 Vite 快速把每个组件打包成独立文件：

**vite.config.js**
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'MyComponents',
      fileName: 'index',
    },
    // 👇 多入口打包，每个组件单独输出
    rollupOptions: {
      input: {
        button: 'src/button/index.js',
        input: 'src/input/index.js',
      },
      output: {
        dir: 'dist',
        entryFileNames: '[name]/index.js',
        assetFileNames: '[name]/style.css',
      },
    },
  },
})
```

执行 `npm run build` → 自动生成：
```
dist/button/index.js
dist/button/style.css
dist/input/index.js
dist/input/style.css
```

---

## 七、最终效果（使用者体验）
### 使用者安装
```bash
npm i my-components
```

### 使用者直接用
```vue
<template>
  <Button>测试</Button>
</template>

<script setup>
// 自动引入 JS + 自动引入 CSS
import { Button } from 'my-components'
</script>
```

**完全无需配置插件、无需手动引样式、无需 babel 配置！**

---

## 八、最简总结（你只需要记住 3 点）
1. **每个组件单独打包**：一个文件夹放 `index.js` + `style.css`
2. **组件 JS 里自动 import 自己的 CSS**
3. **package.json 配置 exports 指向组件路径**

做到这 3 点，你的组件库就**原生支持按需引入 JS + CSS**，和 Element Plus、AntD 一模一样！

---

### 我可以帮你
如果你告诉我：
- 你的组件库是 **Vue2 / Vue3 / React**？
- 使用 **Vite / Webpack** 打包？

我可以直接给你**生成完整可直接使用的模板项目**，包括目录、打包配置、package.json。