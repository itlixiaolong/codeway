import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 自定义插槽
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 全局组件注册
  }
} satisfies Theme
