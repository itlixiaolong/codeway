<font style="color:rgb(87, 107, 149);">前端从进阶到入院 </font><font style="color:rgb(34, 34, 34);"> </font>_2022-07-10 17:57_<font style="color:rgb(34, 34, 34);"> </font>_发表于上海_

[前端精读评论.阿里数据中台前端团队分享前端界的好文精读——帮你筛选靠谱的内容。](https://mp.weixin.qq.com/s?__biz=MzI3NTM5NDgzOA==&mid=2247509463&idx=1&sn=7f2a4804f5dc4aba13c47e7a034adb2d&chksm=eb079daedc7014b87c31af34ae7d09bd41cb7b7c3e299d7a1d22012fe588ce7d626fa0c34911&mpshare=1&scene=24&srcid=0710ijpQnXEQ7wjQjl3nB0OY&sharer_sharetime=1657458342509&sharer_shareid=a1e939cec3a02a5f66a190317d852363&key=895a6c85c74166c9adb9607b56db45f9afc12a0ae5995e621c44b1097fbbadbad0c31a6badea4615175e318d19c82580af0670925ff03999e037d2a7f274dc493d5616086a3b22c63171b2ac47fc95cf09f102eca491a474bb6f9be4961c2c97a8f5b304bb27ee1de9ebf981a5e65148a6e632a5e27798bbcaf026d70429b9de&ascene=14&uin=MjkwMDAyMjAwMQ%3D%3D&devicetype=iMac+MacBookPro16%2C1+OSX+OSX+12.4+build(21F79)&version=13030010&nettype=WIFI&lang=zh_CN&fontScale=100&exportkey=n_ChQIAhIQxXAjBR6uOPWn1H084D%2FOPRKAAgIE97dBBAEAAAAAABZQKyaL7pQAAAAOpnltbLcz9gKNyK89dVj0bxFINNsGOwkcBYruB6BJRP4CKV9pUTfnx5qjNYwujIPEcQcs9cPQ4H5b%2BHkZLdt7sg7nvojNj81gU1HPzcZwVPMMFx4NcPNSekswBZC824Rc8OeaxLgXuv96zxhm13GPSm%2BSU3KB2PN4WT0JL3jYMqVypuIKn5bFtziw3%2F%2F%2FgiW1zumZUfdy6LaFJvBLij%2FmWNiPukD7cHVkrmeurlU1jPdJ%2BqLJEy%2B6IffuJOEr3twB27y35D5jNqZySsXMa6gvUSbP4je03iAnkN470B3a2a9Nn6unpMHmgqc%3D&acctmode=0&pass_ticket=JbUPnCVY7I6UEbXdaaQV9z%2FvoRYcsIs%2F7NwG4YFoeIB2fTOzgXx91H%2Btr65q%2FC88&wx_header=0&fontgear=2.000000#)

<font style="color:rgba(0, 0, 0, 0.3);">以下文章来源于前端精读评论</font><font style="color:rgba(0, 0, 0, 0.3);"> </font><font style="color:rgba(0, 0, 0, 0.3);">，作者黄子毅</font>

<font style="color:black;">关注 JS 太久，会养成任何功能都用 JS 实现的习惯，而忘记了 HTML 与 CSS 也具备一定的功能特征。其实有些功能用 JS 实现吃力不讨好，我们要综合使用技术工具，而不是只依赖 JS。</font>

<font style="color:black;">5 things you don't need Javascript for 这篇文章就从 5 个例子出发，告诉我们哪些功能不一定非要用 JS 做。</font>

## <font style="color:black;">概述</font>
### <font style="color:black;">使用 css 控制 svg 动画</font>
<font style="color:black;">原文绘制了一个放烟花的 例子，本质上是用 css 控制 svg 产生动画效果，核心代码：</font>

```css
.trail {
  stroke-width: 2;
  stroke-dasharray: 1 10 5 10 10 5 30 150;
  animation-name: trail;
  animation-timing-function: ease-out;
}

@keyframes trail {
  from,
  20% {
    stroke-width: 3;
    stroke-dashoffset: 80;
  }
  100%,
  to {
    stroke-width: 0.5;
    stroke-dashoffset: -150;
  }
}
```



<font style="color:black;">可以看到，主要使用</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">stroke-dasharray</font><font style="color:black;"> </font><font style="color:black;">控制线条实虚线的样式，再利用动画效果对</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">stroke-dashoffset</font><font style="color:black;"> </font><font style="color:black;">产生变化，从而实现对线条起始点进行位移，实现线条 “绘图” 的效果，且该 css 样式对 svg 绘制的路径是生效的。</font>

### <font style="color:black;">sidebar</font>
<font style="color:black;">可以完全使用 css 实现 hover 时才出现的侧边栏：</font>

```css
nav {
  position: 'absolute';
  right: 100%;
  transition: 0.2s transform;
}

nav:hover,
nav:focus-within {
  transform: translateX(100%);
}
```

<font style="color:black;">核心在于</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">hover</font><font style="color:black;"> </font><font style="color:black;">时设置</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">transform</font><font style="color:black;"> </font><font style="color:black;">属性可以让元素偏移，且</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">translateX(100%)</font><font style="color:black;"> </font><font style="color:black;">可以位移当前元素宽度的身位。</font>

<font style="color:black;">另一个有意思的是，如果使用 TABS 按键聚焦到 sidebar 内元素也要让 sidebar 出来，可以直接用</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">:focus-within</font><font style="color:black;"> </font><font style="color:black;">实现。如果需要 hover 后延迟展示可以使用</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">transition-delay</font><font style="color:black;"> </font><font style="color:black;">属性。</font>

### <font style="color:black;">sticky position</font>
<font style="color:black;">使用</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">position: sticky</font><font style="color:black;"> </font><font style="color:black;">来黏住一个元素：</font>

```css
.square {
  position: sticky;
  top: 2em;
}
```

<font style="color:black;">这样该元素会始终展示在其父容器内，但一旦其出现在视窗时，当 top 超过</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">2em</font><font style="color:black;"> </font><font style="color:black;">后就会变为</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">fixed</font><font style="color:black;"> </font><font style="color:black;">定位并保持原位。</font>

<font style="color:black;">使用 JS 判断还是挺复杂的，你得设法监听父元素滚动，并且在定位切换时可能产生一些抖动，因为 JS 的执行与 CSS 之间是异步关系。但当我们只用 CSS 描述这个行为时，浏览器就有办法解决转换时的抖动问题。</font>

### <font style="color:black;">手风琴菜单</font>
<font style="color:black;">使用</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);"><details></font><font style="color:black;"> </font><font style="color:black;">标签可以实现类似一个简易的折叠手风琴效果：</font>

```css
<details>
  <summary>title</summary>
  <p>1</p>
  <p>2</p>
</details>
```

<font style="color:black;">在</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);"><details></font><font style="color:black;"> </font><font style="color:black;">标签内的</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);"><summary></font><font style="color:black;"> </font><font style="color:black;">标签内容总是会展示，且点击后会切换</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);"><details></font><font style="color:black;">内其他元素的显隐藏。虽然这做不了特殊动画效果，但如果只为了做一个普通的展开折叠功能，用 HTML 标签就够了。</font>

### <font style="color:black;">暗色主题</font>
<font style="color:black;">虽然直觉上暗色主题好像是一种定制业务逻辑，但其实因为暗色主题太过于普遍，以至于操作系统和浏览器都内置实现了，而 CSS 也实现了对应的方法判断当前系统的主题到底是亮色还是暗色：prefers-color-scheme。</font>

<font style="color:black;">所以如果系统要实现暗色系主题，最好可以和操作系统设置保持一致，这样用户体验也会更好：</font>

```css
@media (prefers-color-scheme: light) {
  /** ... */
}
@media (prefers-color-scheme: dark) {
  /** ... */
}
@media (prefers-color-scheme: no-preference) {
  /** ... */
}

```

<font style="color:black;">如果使用 Checkbox 勾选是否开启暗色主题，也可以仅用 CSS 变量判断，核心代码是：</font>

```css
#checkboxId:checked ~ .container {
  background-color: black;
}

```

<font style="color:rgb(30, 107, 184);">~</font><font style="color:black;"> </font><font style="color:black;">这个符号表示，</font><font style="color:rgb(30, 107, 184);">selector1 ~ selector2</font><font style="color:black;"> </font><font style="color:black;">时，为选择器</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">selector1</font><font style="color:black;"> </font><font style="color:black;">之后满足</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">selector2</font><font style="color:black;"> </font><font style="color:black;">条件的兄弟节点设置样式。</font>

## <font style="color:black;">精读</font>
<font style="color:black;">除了上面例子外，笔者再追加几个例子。</font>

### <font style="color:black;">幻灯片滚动</font>
<font style="color:black;">幻灯片滚动即每次滚动有固定的步长，把子元素完整的展示在可视区域，不可能出现上下或者左右两个子元素各出现一部分的 “割裂” 情况。</font>

<font style="color:black;">该场景除了用浏览器实现幻灯片外，在许多网站首页也被频繁使用，比如将首页切割为 5 个纵向滚动的区块，每个区块展示一个产品特性，此时滚动不再是连续的，而是从一个区块到另一个区块的完整切换。</font>

<font style="color:black;">其实这种效果无需 JS 实现：</font>

```css
html {
  scroll-snap-type: y mandatory;
}
.child {
  scroll-snap-align: start;
}
```

<font style="color:black;">这样便将页面设置为精准捕捉子元素滚动位置，在滚轮触发、鼠标点击滚动条松手或者键盘上下按键时，</font><font style="color:rgb(30, 107, 184);">scroll-snap-type: y mandatory</font><font style="color:black;"> 可以精准捕捉这一垂直滚动行为，并将子元素完全滚动到可视区域。</font>

### <font style="color:black;">颜色选择器</font>
<font style="color:black;">使用 HTML 原生就能实现颜色选择器：</font>

```css
<input type="color" value="#000000">
```

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666614288739-a74c992e-b6af-4621-b584-6490df0cd0ca.png)

<font style="color:black;">该选择器的好处是性能、可维护性都非常非常的好，甚至可以捕捉桌面的颜色，不好的地方是无法对拾色器进行定制。</font>

## <font style="color:black;">总结</font>
<font style="color:black;">关于 CSS 可以实现哪些原本需要 JS 做的事，有很多很好的文章，比如：</font>

+ <font style="color:rgb(1, 1, 1);">youmightnotneedjs。</font>
+ <font style="color:rgb(1, 1, 1);">You-Dont-Need-JavaScript。</font>
+ <font style="color:rgb(1, 1, 1);">以及本文简介里介绍的 5 things you don't need Javascript for。</font>

<font style="color:black;">但并不是读了这些文章，我们就要尽量用 CSS 实现所有能做的事，那样也没有必要。CSS 因为是描述性语言，它可以精确控制样式，但却难以精确控制交互过程，对于标准交互行为比如幻灯片滑动、动画可以使用 CSS，对于非标准交互行为，比如自定义位置弹出 Modal、用 svg 绘制完全自定义路径动画尽量还是用 JS。</font>

<font style="color:black;">另外对于交互过程中的状态，如果需要传递给其他元素响应，还是尽量使用 JS 实现。虽然 CSS 伪类可以帮我们实现大部分这种能力，但如果我们要监听状态变化发一个请求什么的，CSS 就无能为力了，或者我们需要非常 trick 的利用 CSS 实现，这也违背了 CSS 技术选型的初衷。</font>

<font style="color:black;">最后，能否在合适的场景选择 CSS 方案，也是技术选型能力的一种，不要忘了 CSS 适用的领域，不要什么功能都用 JS 实现。</font>

