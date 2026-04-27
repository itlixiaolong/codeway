import{_ as t,o as l,c as n,ae as i}from"./chunks/framework.DhtYoOpx.js";const u=JSON.parse('{"title":"css中常见的长度单位 px/em/rem","description":"","frontmatter":{},"headers":[],"relativePath":"articles/interview/rem-em.md","filePath":"articles/interview/rem-em.md","lastUpdated":null}'),o={name:"articles/interview/rem-em.md"};function r(s,e,m,p,a,c){return l(),n("div",null,[...e[0]||(e[0]=[i(`<h1 id="css中常见的长度单位-px-em-rem" tabindex="-1">css中常见的长度单位 px/em/rem <a class="header-anchor" href="#css中常见的长度单位-px-em-rem" aria-label="Permalink to &quot;css中常见的长度单位 px/em/rem&quot;">​</a></h1><p><strong>区别</strong></p><ul><li>1.px是绝对单位，一旦设置不会随页面改变而变化</li><li>2.em和rem是相对单位</li></ul><blockquote><blockquote><ul><li>rem相对于html的font-size大小</li><li>em相对于父元素的font-size大小</li></ul></blockquote></blockquote><ul><li>3.关于em的使用</li></ul><blockquote><blockquote><ul><li>子元素字体大小的em是相对于父元素字体大小</li><li>元素的width/height/padding/margin用em的话是相对于该元素的font-size</li></ul></blockquote></blockquote><p>示例</p><pre><code>&lt;div&gt;
    我是父元素div
    &lt;p&gt;
        我是子元素p
        &lt;span&gt;我是孙元素span&lt;/span&gt;
    &lt;/p&gt;
&lt;/div&gt;

&lt;style&gt;
    div {
      font-size: 40px;
      width: 10em; /* 400px */
      height: 10em;
      border: solid 1px black;
    }
    p {
      font-size: 0.5em; /* 20px */ 
      width: 10em; /* 200px */
      height: 10em;
      border: solid 1px red;
    }
    span {
      font-size: 0.5em;  /* 10px */     /* 因为chrome设置的最小字体大小为12px，意思就是说低于12px的字体大小会被默认为12px*/
      width: 10em; /* 100px */
      height: 10em;
      border: solid 1px blue;
      display: block;
    }
&lt;/style&gt;
</code></pre>`,8)])])}const x=t(o,[["render",r]]);export{u as __pageData,x as default};
