# css中常见的长度单位 px/em/rem

**区别**

*   1.px是绝对单位，一旦设置不会随页面改变而变化
*   2.em和rem是相对单位

> > *   rem相对于html的font-size大小
> > *   em相对于父元素的font-size大小

*   3.关于em的使用

> > *   子元素字体大小的em是相对于父元素字体大小
> > *   元素的width/height/padding/margin用em的话是相对于该元素的font-size

示例

    <div>
        我是父元素div
        <p>
            我是子元素p
            <span>我是孙元素span</span>
        </p>
    </div>

    <style>
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
    </style>

