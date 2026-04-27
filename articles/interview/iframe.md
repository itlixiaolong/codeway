# 跨域iframe

## 一、跨域 iframe 【绝对拿不到】宿主完整对象

1. **跨域限制（浏览器同源策略）**
- 父页面（宿主）和 `iframe` 不同域：
  - 子 iframe **无法访问** `window.parent` 上的任意全局变量、DOM、方法、对象；
  - 父页面也**无法访问** 跨域 iframe 内部的 `window`、DOM、JS 对象；
  - 直接取值会直接报错：
  ```
  Uncaught SecurityError: Blocked a frame with origin "xxx" from accessing a frame with origin "yyy". 
  Protocols, domains, and ports must match.
  ```

2. 同域 iframe：
可以随意互访 `parent` / `iframe.contentWindow`、DOM、变量、函数，无限制。

---

## 二、跨域下，唯一合法通信方式
不能直接拿对象、不能读属性、不能调父页面方法，只能靠**安全的跨域通信 API**：
## 1. `window.postMessage` 【推荐、标准】
双向安全传数据、通知，**不能传引用对象**，只能传**序列化普通数据**（对象、数组、字符串、数字等）。

### 示例：父页面 → 跨域 iframe
```js
// 宿主父页面
const iframe = document.getElementById('iframe')
iframe.contentWindow.postMessage(
  { type: 'getData', value: 123 }, 
  'https://子页面域名.com' // 目标域，限制安全
)
```

### 跨域 iframe 子页面接收
```js
window.addEventListener('message', (e) => {
  // 必须校验来源域名，防止恶意攻击
  if (e.origin !== 'https://父页面域名.com') return
  console.log(e.data) // 拿到父页面发来的普通数据
})
```

> 限制：**无法传递函数、DOM元素、复杂引用对象**，只能结构化克隆数据。

---

## 2. 服务端配合：CORS / 代理
如果需要拿后端数据：
- 子页面接口配置 CORS
- 或宿主页面本地代理转发接口
和 iframe 跨域隔离无关。

---

## 三、常见误区 & 禁止操作
1. ❌ 跨域下：
```js
// 全部报错禁止
window.parent.xxx
document.getElementById('父页面DOM')
parent.fn()
```

2. ❌ 不能修改跨域 iframe 的 `location` 以外大部分操作
3. ✅ 允许的极小操作：
- 修改 `iframe.src`
- `location` 跳转
- `postMessage` 通信

---

## 四、特殊例外（几乎用不到）
1. 配置 **`document.domain` 降级域名**
仅限「主域名相同、子域名不同」场景，比如：
`a.xxx.com` 和 `b.xxx.com`
可以手动设置 `document.domain = 'xxx.com'` 实现同域互访。
**完全不同域名无法使用。**

2. 浏览器关闭安全策略（本地调试用，生产无效）
--disable-web-security 临时关闭跨域，仅本地测试，线上没用。

---

## 五、总结极简版
1. **完全跨域**：iframe 拿不到宿主任何 JS 对象、DOM、方法，直接报错；
2. **子域名跨域**：可通过 `document.domain` 临时打通；
3. **通用跨域方案**：只用 `postMessage` 做双向数据通信；
4. 同源 = 完全互通，跨域 = 彻底隔离。
