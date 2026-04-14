---
title: useLayoutEffect 和 useEffect 的不同
date: 2024-01-01
---

**1.执行时机不同**

- useLayoutEffect先于useEffect执行
- useLayoutEffect先于浏览绘制同步执行
- useEffect后于浏览器绘制异步执行

**2.从性能角度看**

- useLayoutEffect是同步执行,如果有繁重的计算逻辑在其中会阻塞浏览器将dom的变更渲染到屏幕上,影响体验
- useEffect是异步执行,不存在上述问题,是大部分场景下需要的使用的api

**3.从使用场景上看**

- useLayoutEffect适合处理复杂的用户动画
- 使用useEffect可能会产生屏幕闪烁的问题

**参考文档**

- [React useLayoutEffect vs. useEffect with examples](https://blog.logrocket.com/useeffect-vs-uselayouteffect-examples/)
- [React中useLayoutEffect和useEffect的区别](https://www.cnblogs.com/flamestudio/p/13927413.html)
- [useEffect和useLayoutEffect的区别](https://www.jianshu.com/p/412c874c5add)
