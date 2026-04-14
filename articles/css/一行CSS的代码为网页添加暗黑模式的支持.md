<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/jpeg/12531001/1666680691586-454e4344-d913-4355-abe9-c8635d18828c.jpeg)

<font style="color:black;">翻译自：https://dev.to/akhilarjun/one-line-dark-mode-using-css-24li</font>

<font style="color:black;">本文将介绍一种简单易懂的方法实现网站暗黑模式</font>

<font style="color:black;">话不多说，我们开始吧！</font><font style="color:black;">👾</font>

<font style="color:black;">以下面新闻应用程序为例</font><font style="color:black;">👇</font><font style="color:black;">：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666680691618-ccded910-e6eb-4e90-8d25-d5f0ba92d383.png)

<font style="color:black;">现在仅需增加以下一行魔法 CSS：</font>

```css
html[theme='dark-mode'] {
    filter: invert(1) hue-rotate(180deg);
}
```



<font style="color:black;">添加完成后页面展示效果：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666680691619-25e91fb6-e7b2-463f-8a29-7dd0e0b2a2f7.png)

### <font style="color:rgb(0, 0, 0);">哇偶！</font><font style="color:rgb(0, 0, 0);">瞬间转换成暗黑模式有没有</font><font style="color:rgb(0, 0, 0);">✌️</font>
### <font style="color:black;">解析</font>
<font style="color:rgb(30, 107, 184);">filter</font><font style="color:black;"> </font><font style="color:black;">CSS 属性将模糊或颜色偏移等图形效果应用于元素。滤镜通常用于调整图像，背景和边框的渲染。（参考：MDN Web文档）</font>

<font style="color:black;">对于暗黑模式，将使用两个</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">filter</font><font style="color:black;"> </font><font style="color:black;">：</font><font style="color:rgb(30, 107, 184);">invert</font><font style="color:black;"> </font><font style="color:black;">和</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">hue-rotate</font>

**<font style="color:black;">invert</font>**<font style="color:black;">：反转配色。黑色变为白色，白色变为黑色，所有颜色都是如此</font>

**<font style="color:black;">hue-rotate</font>**<font style="color:black;">：帮助我们处理所有其他非黑色和白色的颜色。将色相旋转180度，我们确保应用程序的颜色主题不会改变，而只是减弱其颜色。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666680691586-86cd7092-872e-479e-a03b-a5626e13c5e4.png)

<font style="color:black;">这个方法的唯一缺点是，它还会反转应用程序中的所有图像。</font>

<font style="color:black;">因此，我们将对所有图像添加相同的规则，以逆转效果。</font>

```css
html[theme='dark-mode'] img{
    filter: invert(1) hue-rotate(180deg);
}
```

<font style="color:black;">我们还将向HTML元素添加一个</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">transition</font><font style="color:black;"> </font><font style="color:black;">，以确保过渡不会过于花哨!</font>

```css
html {
    transition: color 300ms, background-color 300ms;
}
```



<font style="color:black;">实现结果</font><font style="color:black;">👇</font><font style="color:black;">：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1666680691666-60ef77ce-25af-4821-9503-5968fe746d3c.gif)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/jpeg/12531001/1666680693327-003bc5b3-f807-428f-be7f-03bcad7327f7.jpeg)

[》》面试官都在用的题库，快来看看《](https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247486663&idx=1&sn=eb474e39ff37c468be11d55e825a5a7f&chksm=90320f25a745863373bcf050903bbf1c636d0a93b7d6a78145324125e2fc575d800a69b5a86a&mpshare=1&scene=24&srcid=0917XsjwYPQpfpIbLJUE9OFI&sharer_sharetime=1600337511530&sharer_shareid=411da946978bf54a1db1fe56f2eb412e&key=989c3191d8137cb22c73241b58a35d38aac0594e1e0492c23383d252dbc93af63b70b69b8ca2c9838cefcc7f3fd3bae5fb6853080d1cb0a76dd635f43e0577b80e3d5aa30caf296ea042b6359e4b59a739e24e04b19f8d5051e83647c9708d3bb5976242fa33686dee1b5e4256c500ac88e8a5c01f8e87cab05105fe338f2689&ascene=14&uin=MjkwMDAyMjAwMQ%3D%3D&devicetype=iMac+MacBookPro16%2C1+OSX+OSX+12.4+build(21F79)&version=13030010&nettype=WIFI&lang=zh_CN&fontScale=100&exportkey=n_ChQIAhIQ6sOGS7iMeS%2Ff8AAU4NyPjBKAAgIE97dBBAEAAAAAACIJMxcuHywAAAAOpnltbLcz9gKNyK89dVj0fmdVQOp5i2IokY93seTrSOCq2l9ZyNeXYoLYyHI5sMcmk7ojIVpNqvPJJoZuSrbxvkph9sCf7qanSmtZWuDUQQRM5487zAxXeIyJITz2GWE3fHtpZMWuUMsLkfOdgvIfDxpdP32w7GXD3Ohe8Ajl%2Byimf1A6OzWkB13fUJjEK7%2FsBDQBuIhF4mMlW5isKHo%2FdMyXJid%2Fjb6rOfEkOWmzlasTrYg2v9W95V3T59EokmsPprQ13ngbGVr2aR%2BMyM3xzsKgPTFN3IPTzdvgYfbQQ%2FW45KA3ca6wSLY%3D&acctmode=0&pass_ticket=8DSweKsI2%2BAvbKmpAAF3sZfxPBxbNqi93PS3yT0RnKr7ZOLd%2BwY0QMayk1RP9PKj&wx_header=0&fontgear=2.000000)<font style="color:rgb(58, 58, 58);">《</font>  


