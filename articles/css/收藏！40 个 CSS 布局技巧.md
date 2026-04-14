原文链接:  [https://mp.weixin.qq.com/s/9f4UaZWzYSJB_ZdwhS3A3A](https://mp.weixin.qq.com/s/9f4UaZWzYSJB_ZdwhS3A3A)

备用链接: [https://mp.weixin.qq.com/s/kL1c2Khpcr-D1E-2wZe0RA](https://mp.weixin.qq.com/s/kL1c2Khpcr-D1E-2wZe0RA)

大漠<font style="color:rgb(34, 34, 34);"> </font><font style="color:rgb(87, 107, 149);">阿里开发者 </font><font style="color:rgb(34, 34, 34);"> </font>_2020-07-20 07:58_

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/jpeg/12531001/1666682991279-d595cfb8-4c26-4b0c-9e7d-d7de72483530.jpeg)

<font style="color:rgb(136, 136, 136);background-color:rgb(245, 245, 245);">阿里妹导读：</font><font style="color:rgb(136, 136, 136);background-color:rgb(245, 245, 245);">CSS是</font><font style="color:rgb(136, 136, 136);background-color:rgb(245, 245, 245);">Web开发中</font><font style="color:rgb(136, 136, 136);background-color:rgb(245, 245, 245);">不可或缺的一部分，</font><font style="color:rgb(136, 136, 136);background-color:rgb(245, 245, 245);">随着Web技术的</font><font style="color:rgb(136, 136, 136);background-color:rgb(245, 245, 245);">不断</font><font style="color:rgb(136, 136, 136);background-color:rgb(245, 245, 245);">革新，</font><font style="color:rgb(136, 136, 136);background-color:rgb(245, 245, 245);">CSS也</font><font style="color:rgb(136, 136, 136);background-color:rgb(245, 245, 245);">变得</font><font style="color:rgb(136, 136, 136);background-color:rgb(245, 245, 245);">更加强大</font><font style="color:rgb(136, 136, 136);background-color:rgb(245, 245, 245);">。</font><font style="color:rgb(136, 136, 136);background-color:rgb(245, 245, 245);">CSS的众多属性你知道了多少？具体开发中该使用什么属性才最适合恰当？如今的一些CSS属性可以让我们节约更多的时间。比如在Web布局中，现代CSS特性就可以更好的帮助我们快速实现如等高布局，水平垂直居中，经典的圣杯布局、宽高比例、页脚保持在底部等效果。淘系前端技术专家大漠将详细介绍一些不同的CSS属性来实现这些效果，希望对同学们有所帮助。</font>

<font style="color:rgb(34, 34, 34);background-color:rgb(245, 245, 245);">  
</font>

<font style="color:rgb(136, 136, 136);background-color:rgb(245, 245, 245);">文末福利</font><font style="color:rgb(136, 136, 136);background-color:rgb(245, 245, 245);">：下载《前端代码是怎样智能生成的》电子书。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

## <font style="color:rgb(255, 106, 0);"> 一  水平垂直居中</font><font style="color:rgb(62, 62, 62);">  
</font>
<font style="color:rgb(62, 62, 62);">如何实现水平垂直居中可以说是CSS面试题中的经典面试题，在多年前这个面试题给很多同学都带来了困惑，但Flexbox布局模块和CSS Grid布局模块的到来，可以说实现水平垂直居中已是非常的容易。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

### <font style="color:rgb(255, 106, 0);">Flexbox中实现水平垂直居中</font>
<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">在Flexbox布局模块中，不管是单行还是多行，要让它们在容器中水平垂直居中都是件易事，而且方法也有多种。最常见的是在Flex容器上设置对齐方式，在Flex项目上设置</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">margin:auto</font><font style="color:rgb(62, 62, 62);">。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">先来看在Flex容器上设置对齐方式。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

**<font style="color:rgb(62, 62, 62);">Flex容器和Flex项目上设置对齐方式</font>**

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">你可能已经知道在Flex容器上设置</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">justify-content</font><font style="color:rgb(62, 62, 62);">、</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">align-items</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的值为</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">center</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">时，可以让元素在Flex容器中达到水平垂直居中的效果。来看一个示例：</font>

```css
<!-- HTML -->
<div class="flex__container">
    <div class="flex__item"></div>
</div>

/* CSS */
.flex__container {
    display: flex;
    justify-content: center;
    align-items: center;
}
```



<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682991340-14d86e1a-6157-49a4-adf0-b7e2a1227c53.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这种方式特别适应于让Icon图标在容器中水平垂直居中，不同的是在Icon图标容器上显示设置</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">display: inline-flex</font><font style="color:rgb(62, 62, 62);">。比如下面这个示例：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css
<!-- HTML -->
<div class="flex__container">
    <svg> </svg>
</div>

/* CSS */
.flex__container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682991346-b0bfd2d9-ecac-4a2d-adc5-de18a346421a.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在这种模式之下，如果要让多个元素实现水平垂直居中的效果，那还需要加上</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">flex-direction: column</font><font style="color:rgb(62, 62, 62);">，比如：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

<!-- HTML -->
<div class="flex__container">
    <div class="avatar">:)</div>
    <div class="media__heading"></div>
    <div class="media__content"></div>
    <div class="action"></div>
</div>

/* CSS */
.flex__container  {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682991388-9cfbdeda-9312-41ed-a3bf-c0a226179dae.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在Flexbox布局中，还可以像下面这样让Flex项目在Flex容器中达到水平垂直居中的效果：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

<!-- HTML -->
<div class="flex__container">
    <div class="flex__item"></div>
</div>

/* CSS */
.flex__container {
    display: flex; // 或inline-flex
    justify-content: center;
}

.flex__item {
    align-self: center;
}
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682991312-14048da0-000d-45a3-b908-b8ed5e8bdc3e.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">如果在Flex容器中有多个Flex项目时，该方法同样有效：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css
.flex__container {
    display: flex; // 或inline-flex
    justify-content: center;
}

.flex__container > * {
    align-self: center;
}
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">比如下面这个效果：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682992104-2833367b-67f7-4491-89cf-ac1c9810c565.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">除此之外，还可以使用</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">place-content: center</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">让Flex项目实现水平垂直居中：</font>

```css
.flex__container {
    display: flex;
    place-content: center;
}

.flex__item {
    align-self: center;
}
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682992180-4454485f-748b-45b2-84c6-1f5ca654f355.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">或者换：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css
.flex__container {
    display: flex;
    place-content: center;
    place-items: center;
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682992273-8ae1e087-ef21-4144-8698-b4a73ccda1ae.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这两种方式同样适用于Flex容器中有多个Flex项目的情景：</font>

<font style="color:rgb(62, 62, 62);">  
</font>

```css

.flex__container {
    display: flex;
    flex-direction: column;
    place-content: center;
}

.flex__container > * {
    align-self: center;
}

// 或

.flex__container {
    display: flex;
    flex-direction: column;
    place-content: center;
    place-items: center;
}
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682992392-edb0f721-d08e-44bb-829d-b8cfaf729fe9.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">可能很多同学对于</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">place-content</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">和</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">place-items</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">会感到陌生。其实</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">place-content</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);"> </font><font style="color:rgb(62, 62, 62);">是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">align-content</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">和</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">justify-content</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的简写属性；而</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">place-items</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">align-items</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">和</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">justify-items</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的简写属性。即：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css
.flex__container {
    place-content: center;
    place-items: center;
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">等效于：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css
.flex__container {
    align-content: center;
    justify-content: center;

    align-items: center;
    justify-items: center;
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">虽然扩展出来有四个属性，但最终等效于：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

.flex__container {
    display: flex;
    align-items: center;
    justify-content: center;
}

// 多行
.flex__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

```

**<font style="color:rgb(62, 62, 62);">  
</font>**

**<font style="color:rgb(62, 62, 62);">在Flex项目上设置margin: auto</font>**

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">如果在Flex容器中只有一个Flex项目，还可以显式在Flex项目中显式设置</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">margin</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的值为</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">auto</font><font style="color:rgb(62, 62, 62);">，这样也可以让Flex项目在Flex容器中水平垂直居中。例如：</font>

<font style="color:rgb(62, 62, 62);">  
</font>

```css

.flex__container {
    display: flex; // 或 inline-flex
}

.flex__item {
    margin: auto;
}
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font><!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666683689235-b527054b-3749-426e-a671-9975d2683e8a.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">整个过程，你可以通过下面这个示例来体验。尝试着选中不同方向的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">margin</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">值：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1666683871278-83923b55-cf59-4c2d-94bf-535503ccf26c.gif)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(255, 106, 0);">Grid中实现水平垂直居中</font>

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">CSS Grid布局可以说是现代Web布局中的银弹。它也是到目前为止布局系统中唯一一个二维布局系统。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在CSS Grid布局中，只需要仅仅的几行代码也可以快速的帮助我们实现水平垂直居中的效果。比如下面这个示例：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css
<!-- HTML -->
<div class="grid__container">
    <div class="grid__item"></div>
</div>

/* CSS */
.grid {
    display: grid; // 或 inline-grid
    place-items: center
}
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666683912336-03d11b5d-6844-41b4-a140-6f544034f058.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在CSS Grid布局模块中，只要显式设置了</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">display: grid</font><font style="color:rgb(62, 62, 62);">（或</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">inline-grid</font><font style="color:rgb(62, 62, 62);">）就会创建Grid容器和Grid项目，也会自动生成网格线，即行和列（默认为一行一列）。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682992268-d1924936-bf3b-4562-b043-0197228be9cc.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在没有显式地在Grid容器上设置</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-template-columns</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">和</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-template-rows</font><font style="color:rgb(62, 62, 62);">，浏览器会将Grid容器默认设置为Grid内容大小：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682992775-77d20bf0-5f39-489f-ba57-cf9c53f73d74.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这种方法也适用于CSS Grid容器中有多个子元素（Grid项目），比如：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

<!-- HTML -->
<div class="grid__container">
    <div class="avatar">:)</div>
    <div class="media__heading"></div>
    <div class="media__content"></div>
    <div class="action"></div>
</div>

```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这个时候你看到的效果如下:</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682992820-392ef81e-62a3-44fa-af10-91ae0e2ea236.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">而且</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">place-items</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">适用于每个单元格。这意味着它将居中单元格的内容。比如下面这个示例：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

<!-- HTML -->
<div class="grid__container">
    <div class="grid__item">
        <h3>Special title treatment</h3>
        <p>With supporting text below as a natural lead-in to additional content.</p>
        <div class="action">Go somewhere</div>
    </div>
</div>

/* CSS */
.grid__container {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(2, 1fr);
    gap: 2vh;
}


.grid__item {
    display: grid;
    place-items: center;
}

```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682992889-a2c67a0c-56ee-446c-921a-86b8f5bea029.png)

<font style="color:rgb(34, 34, 34);">  
</font>

## <font style="color:rgb(255, 106, 0);">二  等高布局</font>
<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">等高布局也是Web中非常常见的一种布局方式，而且实现等高布局的方案也有很多种。这里我们主要来看Flexbox布局模块和Grid布局模块给我们带来了什么样的变化。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在Flexbox和Grid布局模块中，让我们实现等高布局已经是非常的简单了，比如：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css
<!-- Flexbox -->
<flex__container>
    <flex__item></flex__item>
    <flex__item></flex__item>
    <flex__item></flex__item>
</flex__container>

/* CSS */
.flex__container {
    display: flex; // 或 inline-flex
}

```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">简单地说，在容器上显式设置了</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">display</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的值为</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">flex</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">或</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">inline-flex</font><font style="color:rgb(62, 62, 62);">，该容器的所有子元素的高度都相等，因为容器的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">align-items</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的默认值为</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">stretch</font><font style="color:rgb(62, 62, 62);">。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这个时候你看到的效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682993033-a7f1a2c6-fd64-4eda-ac73-ad47db05c600.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这种方式特别适用于卡片组件中：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682993057-06ee4e12-0fb9-4d16-9fa1-9e3cca86d0bd.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在Grid布局模块中类似：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

<!-- HTML -->
<grid__container>
    <grid__item></grid__item>
    <grid__item></grid__item>
    <grid__item></grid__item>
</grid__container>

/* CSS */
.grid__container {
    display: grid;
    grid-template-columns: 20vw 1fr 20vw; /* 根据需求调整值*/
}
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682993481-52298a24-2e67-45c3-9461-6dbfab7ba3ac.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">同样在一些卡片类布局中运用：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682993538-1e986b05-52ee-44b8-ac27-e6447357dbf8.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">如果需求有所调整，比如在Flex项目 或 Grid项目的子元素高度和容器高度相同。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css
<!-- HTML -->
<flex__container>
    <flex__item>
        <content></content>
    </flex__item>
</flex__container>

/* CSS */
.flex__container {
    display: flex;
}

.content {
    height: 100%
}

// 或
.grid__container {
    display: grid;
    grid-auto-flow: column;
}

.content {
    height: 100%;
}

```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666684318119-2dbc3e00-a9a8-4131-9d30-b739222a2658.png)

<font style="color:rgb(34, 34, 34);">  
</font>

## <font style="color:rgb(255, 106, 0);">三  Sticky Footer</font>
<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">首先用下图来描述什么是Sticky Footer布局效果：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666684318379-9016f140-3521-40f8-9a78-51b50702bc8d.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">Sticky Footer实现方案和等高、垂直居中一样，同样有很多种方案可以实现。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">比如像下面这样的结构：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```html
<!-- HTML -->
<header></header>
<main></main>
<footer></footer>
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">先来看Flexbox布局模块中的实现方案：</font>

```css

body {
  display: flex;
  flex-direction: column;
}

footer {
  margin-top: auto;
}

```

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682994056-1492632f-ee81-4cec-838b-acda456f2181.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">可以尝试着在</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">main</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">区域右下角向下拖动，改变主内容区域的高度，你会发现“当内容不足一屏时，</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);"><footer></font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">会在页面的最底部，当内容超出一屏时，</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);"><footer></font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">会自动往后延后”。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在Flexbox布局中，还可以在</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);"><main></font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">区域上设置下面的样式，达到相等的效果：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

body {
    display: flex;
    flex-direction: column;
}

main {
    flex: 1 0 auto;
}
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682993660-9db5ee38-1237-4343-97cd-828bbb0f5023.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);"><main></font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">中的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">flex: 1 0 auto</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">相当于是：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

main {
    flex-grow: 1; /*容器有剩余空间时，main区域会扩展*/
    flex-shrink: 0; /*容器有不足空间时，main区域不会收缩*/
    flex-basis: auto; /*main区域高度的基准值为main内容自动高度*/
}

```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">如果你想省事的话，可以在</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">main</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">上显式设置</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">flex-grow:1</font><font style="color:rgb(62, 62, 62);">，因为</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">flex-shrink</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">和</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">flex-basis</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的默认值为</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">1</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">和</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">auto</font><font style="color:rgb(62, 62, 62);">。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在CSS Grid布局中我们可以借助</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">1fr</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">让</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);"><main></font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">区域根据Grid容器剩余空间来做计算。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

.grid__container {
    display: grid;
    grid-template-rows: auto 1fr auto;
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682993755-69c18484-5704-4941-8d66-f7fc79bc239d.png)

<font style="color:rgb(34, 34, 34);">  
</font>

## <font style="color:rgb(255, 106, 0);">四  均分列</font>
<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">在Web布局中，很多时候会对列做均分布局，最为常见的就是在移动端的底部Bar，比如下图这样的一个效果：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682993955-3be9a4d9-8fbc-4294-b137-35c77a9aa6cd.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在Flexbox和Grid还没出现之前，如果希望真正的做到均分效果，可以用</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">100%</font><font style="color:rgb(62, 62, 62);">（或</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">100vw</font><font style="color:rgb(62, 62, 62);">）除以具体的列数。比如：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

<!-- HTML -->
<container>
    <column></column>
    <column></column>
    <column></column>
</container>

/* CCSS */
.container {
    inline-size: 50vw;
    min-inline-size: 320px;
    display: flex-row;
}

.column {
    float: left;
    width: calc(100% / 3);
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682994125-81f26974-5d14-46fc-92db-00510c091830.png)

<font style="color:rgb(34, 34, 34);">  
</font>



<font style="color:rgb(62, 62, 62);">通过浏览器调试器中可以发现，现个列的宽度都是相等的：</font>

  


<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1666684534869-655aa1d9-5d45-4fbb-8ff1-01e38d0a0949.gif)

  


<font style="color:rgb(62, 62, 62);">在Flexbox和Grid布局中，实现上面的效果会变得更容易地多。先来看Flexbox中的布局：</font>

```css

<!-- HTML -->
<flex__container>
    <flex__item></flex__item>
    <flex__item></flex__item>
    <flex__item></flex__item>
</flex__container>

/* CSS */
.flex__container {
    inline-size: 50vw;
    display: flex;
}

.flex__item {
    flex: 1;
}
```

<font style="color:rgb(62, 62, 62);"></font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682994176-58f57c5d-6a3f-4164-a96d-d9d6d7384a6a.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在Flexbox布局模块中，当flex取的值是一个单值（无单位的数），比如示例中的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">flex:1</font><font style="color:rgb(62, 62, 62);">，它会当作显式的设置了</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">flex-grow: 1</font><font style="color:rgb(62, 62, 62);">。浏览器计算出来的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">flex</font><font style="color:rgb(62, 62, 62);">：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682994339-bb4da5f1-2f8d-4eea-9282-2436e923e446.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">接下来看Grid中如何实现上例的效果：</font>

<font style="color:rgb(34, 34, 34);"></font>

```css
<!-- HTML -->
<grid__container>
    <grid__item></grid__item>
    <grid__item></grid__item>
    <grid__item></grid__item>
</grid__container>

/* CSS */
.grid__container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /*这里的3表示具体的列数*/
}

```



<font style="color:rgb(62, 62, 62);">最终的效果是相同的：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682994775-5d32c828-70a8-4ea6-9948-964cce5a3bc2.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这样的布局方式也适用于其他的布局中。但不管是Flexbox还是Grid布局中，都存在一定的缺陷，当容器没有足够的空间容纳Flex项目（或Grid项目）时，Flex项目或Grid项目会溢出（或隐藏，如果Flex容器或Grid容器显式设置了</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">overflow:hidden</font><font style="color:rgb(62, 62, 62);">）：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1666682994728-6a0343ff-148a-42f3-8ed6-55d5a86ddbdd.gif)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">修复这种现象最简单的方式是在Flex容器或Grid容器显式设置一个</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">min-width</font><font style="color:rgb(62, 62, 62);">（或</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">min-inline-size</font><font style="color:rgb(62, 62, 62);">）：</font>

<font style="color:rgb(62, 62, 62);">  
</font>

```css

.flex__container {
    min-inline-size: 300px;
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">不过话又说回来，比如我们的Flex项目（或Grid项目）是一个卡片，每张卡片宽度是相等之外，更希望容器没有足够空间时，Flex项目（或Grid项目）会自动断行排列。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">我们继续通过示例向大家展示。先来看Flexbox实现方案：</font><font style="color:rgb(34, 34, 34);">  
</font>

```css
.flex__container {
    display: flex;
    flex-wrap: wrap;
}

.flex__item {
    flex: 0 1 calc((100vw - 18vh) / 4); /* calc(100vw -18vh) / 4 是flex-basis的基准值 */
}
```

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682994766-ae34bff8-fd6e-49d4-ba16-931ca3a1dcf1.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">你可以尝试着调整浏览器的视窗宽度，当浏览器的视窗越来越小时，Flex容器宽度也就会越来越小，当Flex容器小到没有足够的空间容纳四个Flex项目（就此例而言），那么Flex项目就会断行排列：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1666682994861-3a35a157-d59d-4da1-a3a6-18e1c93de8cb.gif)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">基于该例，如果把Flex项目的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">flex</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">值改成：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(51, 51, 51);">.flex__item</font><font style="color:rgb(51, 51, 51);"> {</font><font style="color:rgb(51, 51, 51);">    </font><font style="color:rgb(14, 156, 229);">flex</font><font style="color:rgb(51, 51, 51);">: </font><font style="color:rgb(14, 156, 229);">0</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(14, 156, 229);">0</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(14, 156, 229);">400px</font><font style="color:rgb(51, 51, 51);">;</font><font style="color:rgb(51, 51, 51);">}</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这个时候，当Flex容器没有足够空间时，Flex项目会按</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">flex-basis: 400px</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">计算其宽度，Flex容器没有足够空间时，Flex就会断行：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682995373-5f8eebfc-c3f6-4ee1-bc07-c5b4cedcc11c.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">反过来，如果Flex项目的值</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">flex</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">改成：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(51, 51, 51);">.flex__item</font><font style="color:rgb(51, 51, 51);"> {</font><font style="color:rgb(51, 51, 51);">    </font><font style="color:rgb(14, 156, 229);">flex</font><font style="color:rgb(51, 51, 51);">: </font><font style="color:rgb(14, 156, 229);">1</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(14, 156, 229);">0</font><font style="color:rgb(51, 51, 51);"> </font><font style="color:rgb(14, 156, 229);">400px</font><font style="color:rgb(51, 51, 51);">;</font><font style="color:rgb(51, 51, 51);">}</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">当Flex容器没有足够空间排列Flex项目时，Flex项目会按</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">flex-basis: 400px</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">计算其宽度，Flex会断行，并且同一行出现剩余空间时，Flex项目会扩展，占满整个Flex容器：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682995416-b462ad7c-d6fc-41ce-866d-c4da5f8549ca.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在Grid中实现类似的效果要更复杂一点。可以使用</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">repeat()</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">函数，</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">1fr</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">以及</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">auto-fit</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">等特性：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

.grid__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2vh;
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666684756876-e8315dc3-d37f-4c47-8004-2d7f45f67101.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">如果你对这方面知识感兴趣的话，还可以移步阅读《Container Query Solutions with CSS Grid and Flexbox》一文。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">其实在Grid中与 </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">auto-fit</font><font style="color:rgb(62, 62, 62);"> 对比的值还有一个叫 </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">auto-fill</font><font style="color:rgb(62, 62, 62);">。但两者的差异是非常地大，用下图来描述 </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">auto-fit</font><font style="color:rgb(62, 62, 62);"> 和 </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">auto-fill</font><font style="color:rgb(62, 62, 62);"> 的差异：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682995366-7ed277eb-86d8-4da2-bbf0-4b83af02f6a8.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">另外这种方式也是到目前为止一种不需要借助CSS媒体查询就可以实现响应式布局效果。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

## <font style="color:rgb(255, 106, 0);">五  圣杯布局</font>
<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">圣杯布局（Holy Grail Layout）)是Web中典型的布局模式。看上去像下图这样：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682995607-b24d6e01-da1f-405f-9095-2d9a2a243567.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">对于圣杯布局而言，HTML结构是有一定的要求，那就是内容为先：</font>

```css

<!-- HTML -->
<header></header>
<main>
    <article></article> <!-- 主内容 -->
    <nav></nav>
    <aside></aside>
</main>
<footer></footer>

```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">在这里主要还是和大家一起探讨，如何使用Flexbox和Grid布局模块来实现圣杯布局。先来看Flexbox实现方案：</font>

```css
body {
    width: 100vw;
    display: flex;
    flex-direction: column;
}

main {
    flex: 1;
    min-height: 0;

    display: flex;
    align-items: stretch;
    width: 100%;
}

footer {
    margin-top: auto;
}

nav {
    width: 220px;
    order: -1;
}

article {
    flex: 1;
}

aside {
    width: 220px;
}
```



  
<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(62, 62, 62);"></font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682995847-5fdafb6e-337a-4c5c-b01d-fd9e76fd368a.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">通过在</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">nav</font><font style="color:rgb(62, 62, 62);">、</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">aside</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">和</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">article</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">上显式设置</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">order</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的值，可以很好的控制这三个区域的布局顺序。比如说，希望</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);"><aside></font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">在</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);"><article></font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">之前排列，只需要在上面的示例基础上做一点点调整：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(202, 125, 55);">nav</font><font style="color:rgb(51, 51, 51);"> {</font><font style="color:rgb(51, 51, 51);">    </font><font style="color:rgb(14, 156, 229);">order</font><font style="color:rgb(51, 51, 51);">: </font><font style="color:rgb(14, 156, 229);">0</font><font style="color:rgb(51, 51, 51);">;</font><font style="color:rgb(51, 51, 51);">}</font><font style="color:rgb(51, 51, 51);">  
</font><font style="color:rgb(202, 125, 55);">aside</font><font style="color:rgb(51, 51, 51);"> {</font><font style="color:rgb(51, 51, 51);">    </font><font style="color:rgb(14, 156, 229);">order</font><font style="color:rgb(51, 51, 51);">: -</font><font style="color:rgb(14, 156, 229);">1</font><font style="color:rgb(51, 51, 51);">;</font><font style="color:rgb(51, 51, 51);">}</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682996045-d838f5df-e54c-48bc-b86d-c22596e2b108.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(153, 153, 153);">注意，order的默认值为0，值越大越排在后面！</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在上例的基础上，借助CSS媒体对象的特性，可以很容易实现响应式的圣杯布局效果：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

@media screen and (max-width: 800px) {
    main {
        flex-direction: column;
    }

    nav, aside {
        width: 100%;
    }
}
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682996258-924aeac4-c1ed-4b67-bc36-1b907f5212b0.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">尝试着拖动浏览器来改变视窗大小，你可以看到如下图的效果：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1666682996398-9c6218f0-429e-462f-883c-f05264efcac5.gif)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在Grid布局模块中，实现圣杯布局要比Flexbox布局模块中更容易，而且更灵活。在CSS Grid布局模块中，HTML结构可以更简洁：</font>



```css

<!-- HTML -->
<body>
    <header></header>
    <main></main>
    <nav></nav>
    <aside></aside>
    <footer></footer>
</body>
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在CSS方面有很多种方案可以实现圣杯布局效果。我们先来看第一种：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

body {
    display: grid;
    grid-template: auto 1fr auto / 220px 1fr 220px;
}

header {
    grid-column: 1 / 4;
}

main {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
}

nav {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
}

aside {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
}
footer {
    grid-column: 1 / 4;
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682996285-51b5be24-03fa-4c4f-b644-ebdb8ffbaa8a.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">上面示例采用的是网格线来给每个区域进行定位的：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682996497-87c77391-e2a1-43cb-b47c-a86b36fe45be.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">和Flexbox布局类似，在媒体查询中可以改变每个网格区域的位置：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

@media screen and (max-width: 800px) {
    body {
        grid-template-rows: auto;
        grid-template-columns: auto;
    }

    header,
    main,
    nav,
    aside,
    footer {
        grid-column: 1 / 2;
        min-height: auto;
    }

    main {
        grid-row: 3 / 4;
        margin: 0;
    }

    nav {
        grid-row: 2 / 3;
    }

    aside {
        grid-row: 4 / 5;
    }

    footer {
        grid-row: 5 / 6;
    }
}

```

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682997185-af678dde-7f86-4e2d-bb40-8a6bbbf806c7.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">除了</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-template</font><font style="color:rgb(62, 62, 62);">（即</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-template-columns</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">和</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-template-rows</font><font style="color:rgb(62, 62, 62);">）之外，在Grid布局中还可以使用</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-area</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">和</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-template-areas</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">属性的结合，也能很方便的实现CSS圣杯布局。基于上面的示例上，只需要把你的CSS调整为：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css
body {
    display: grid;
    grid-template-areas:
        "header header header"
        "nav main aside"
        "footer footer footer";
}

header {
    grid-area: header;
}

main {
    grid-area: main;
}

nav {
    grid-area: nav;
}

aside {
    grid-area: aside;
}

footer {
    grid-area: footer;
}

@media screen and (max-width: 800px) {
    body {
        grid-template-areas:
            "header"
            "nav"
            "main"
            "aside"
            "footer";
    }
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682996726-fd1188be-0e18-4308-9db8-2ac8b732a985.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">你可能发现了它们之间的差异性：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682996987-24402a0c-d0aa-45ea-8c81-e7b0b3d31bab.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">后面这个示例中，</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);"><nav></font><font style="color:rgb(62, 62, 62);">、</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);"><main></font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">和</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);"><aside></font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">区域宽度相等。这是因为我们示例中通过</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-template-areas</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">来声明网格，在使用</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-template-areas</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">创建网格时，其实也隐式的创建了网格线，只不过他和</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-template</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">不同的是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-template</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">可以显式的指定网格轨道大小，而</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-template-areas</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">在该示例中相当于网格轨道大小都是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">1fr</font><font style="color:rgb(62, 62, 62);">。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682996983-b44c258e-2eeb-43fb-911b-d624fd235354.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">如果我们希望</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);"><main></font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的区域变得更大，那么可以在</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-template-areas</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">上做个调整：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

body {
    display: grid;
    grid-template-areas:
        "header header header header header"
        "nav main main main aside"
        "footer footer footer footer footer";
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682997164-1f63c0a7-4a58-473d-a8a9-f7bf95fd4544.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这个时候网格区域的划分像下图这样：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666685048898-1bc076f5-5c1c-4f11-b397-98e070f8a9c7.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">虽然在效果有所调整了，但还是均分状态。更好的解决方案是，将</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-template-areas</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">和</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-template</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">结合起来使用：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css
body {
    display: grid;
    grid-template-areas:
        "header header header"
        "nav main aside"
        "footer footer footer";
    grid-template-columns: 220px 1fr 220px;
    grid-template-rows: auto 1fr auto;
}

header {
    grid-area: header;
}

main {
    grid-area: main;
}

nav {
    grid-area: nav;
}

aside {
    grid-area: aside;
}

footer {
    grid-area: footer;
}

@media screen and (max-width: 800px) {
    body {
        grid-template-areas:
            "header"
            "nav"
            "main"
            "aside"
            "footer";
        grid-template-columns: 1fr;
        grid-template-rows: auto auto 1fr auto auto;
    }

    main {
        margin-left: 0;
        margin-right: 0;
    }
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682997198-de353920-07fe-4425-a16b-92051f054f79.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">你可以发现，这个时候，网格线的区域的命名像下图这样：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682997620-422bdcee-b324-4012-af75-5837473277f1.png)

<font style="color:rgb(34, 34, 34);">  
</font>

## <font style="color:rgb(255, 106, 0);">六  12列网格布局</font>
<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">12列网格布局最早是由960.gs提出的网格布局系统：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682997503-8f49f82b-9546-4668-b82d-7e0ece92038b.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">12列网格布局在设计系统和CSS Framework中经常使用，比如业内经典的Bootstrap就采用了12列网格布局系统：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/jpeg/12531001/1666682997614-4b3e07c4-e1af-42b5-a85e-58a843018d5e.jpeg)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在社区中也有很多在线工具，帮助我们快速构建12列网格系统，比如 Free CSS Grid Tools & Resources For Developers 一文中罗列的工具。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682997780-2f607621-9c0b-4be4-a71a-6e7731c6c8a9.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">不过这里主要是想和大家一起看看在Flexbox和Grid布局模块中是如何实现12列的网格布局系统。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">先来看Flexbox布局模块。12列网格布局的HTMl结构一般类似于下面这样：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

<!-- HTML -->
<flex__grid>
    <flex__row>
        <flex__item col4></flex__item col4>
        <flex__item col4></flex__item col4>
        <flex__item col4></flex__item col4>
    </flex__row>
</flex__grid>
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">注意，12列网格中，一般同一行的列数值和刚好等于12。比如上面的HTML结构，行中有三列，每列的宽度刚好四个网格宽度加两个列间距。并且在计算的时候有一套成熟的计算公式：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666685148902-00e2b605-6d31-44b6-a0ed-272bf2e3975b.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">而且还设计上也会有所差异，比如说距离容器两侧有没有间距等：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682997688-ded137d9-51b6-4d19-9065-c1dfc5dc9d93.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这些的差异对于计算公式和样式代码的设计都略有差异。我们用其中一个为例：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css
:root {
    --gutter: 10px;
    --columns: 12;
    --span: 1;
}

.flex__container {
    display: flex;
    flex-direction: column;
    padding-left: var(--gutter);
    padding-right: var(--gutter);
}

.flex__row {
    display: flex;
    margin-left: calc(var(--gutter) * -1);
    margin-right: calc(var(--gutter) * -1);
}

.flex__row + .flex__row {
    margin-top: 2vh;
}

.flex__item {
    flex: 1 1
        calc((100% / var(--columns) - var(--gutter)) * var(--span));
    margin: 0 var(--gutter);
}

.flex__item1 {
    --span: 1;
}

.flex__item2 {
    --span: 2;
}

.flex__item3 {
    --span: 3;
}

.flex__item4 {
    --span: 4;
}

.flex__item5 {
    --span: 5;
}

.flex__item6 {
    --span: 6;
}

.flex__item7 {
    --span: 7;
}

.flex__item8 {
    --span: 8;
}

.flex__item9 {
    --span: 9;
}

.flex__item10 {
    --span: 10;
}

.flex__item11 {
    --span: 11;
}

.flex__item12 {
    --span: 12;
}
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">你会看到的效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682998155-36465c46-32db-4888-86b2-a149831477af.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在该示例中采用了CSS自定义属性相关的特性，让整个计算变得更容易一些。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">对于使用CSS Grid布局模块来实现12列网格布局，相对而言，不管是HTML结构还是CSS代码都会更简易一些。在使用CSS Grid布局模块实现12列网格布局，将会运用到</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">repeat()</font><font style="color:rgb(62, 62, 62);">、</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">minmax()</font><font style="color:rgb(62, 62, 62);">、</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">gap</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">和</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">fr</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">等特性。具体的来看一个示例吧。</font>



```css
<!-- HTML -->
<grid__container>
    <grid__item></grid__item>
</grid__container>
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">我们来看CSS代码：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

+ <font style="color:rgb(62, 62, 62);">使用</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">fr</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">将网格均分为相等的值，即每列宽度都是 1 个</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">fr</font><font style="color:rgb(62, 62, 62);">；配合</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">repeat()</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">函数，即</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">repeat(12, 1fr)</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">创建了12列网格。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

+ <font style="color:rgb(62, 62, 62);">使用 </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">gap</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">可以用来控制网格之间的间距。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

+ <font style="color:rgb(62, 62, 62);">配合</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">minmax()</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">还可以设置网格最小值。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">具体的代码如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css
:root {
    --columns: 12;
    --gap: 10px;
    --span: 1;
}

.grid__container {
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    grid-template-rows: 1fr;
    gap: var(--gap);
    padding-left: calc(var(--gap) / 2);
    padding-right: calc(var(--gap) / 2);
}

.grid__item {
    min-block-size: 10vh;
    grid-column: span var(--span);
}

.col1 {
    --span: 1;
}

.col2 {
    --span: 2;
}

.col3 {
    --span: 3;
}

.col4 {
    --span: 4;
}

.col5 {
    --span: 5;
}

.col6 {
    --span: 6;
}

.col7 {
    --span: 7;
}

.col8 {
    --span: 8;
}

.col9 {
    --span: 9;
}

.col10 {
    --span: 10;
}

.col11 {
    --span: 11;
}

.col12 {
    --span: 12;
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">你将看到的效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682998295-866a816a-60ff-45fa-9110-6cfbac06c14f.png)<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">就该示例而言，</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-template-columns: repeat(12, 1fr)</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">创建网格如下图所示：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682998472-49b950e6-4d44-48c0-8d00-4d7433fc7682.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">除了上述这种粗暴的方式，还可以更灵活一些，将</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">auto-fit</font><font style="color:rgb(62, 62, 62);">、</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">minmax()</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">以及</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-auto-flow: dense</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">等来创建：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

.grid__container {
    padding: 1em;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    gap: 1em;
    grid-auto-flow: dense;
}

```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">对于</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">.grid__item</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">可以通过</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-column</font><font style="color:rgb(62, 62, 62);">、</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-row</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">来控制网格项目的位置：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682998595-e40fa4bb-814f-4542-924b-286383450322.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">加上</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">grid-auto-flow: dense</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">会根据Grid容器空间，Grid项目会自动流到合适的位置：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1666682998722-e5cf13ba-71e4-4196-a57a-152c43c7ebd4.gif)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这种布局对于杂志类的布局非常的适用。有关于这方面更详细的介绍可以阅读@Keir Watson的《Responsive Grid Magazine Layout in Just 20 Lines of CSS》一文。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

## <font style="color:rgb(255, 106, 0);">七  两端对齐</font>
<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">在Web布局中时常碰到两端对齐的需求。在Flexbox布局中，时常在Flex容器中显式设置 </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">justify-content</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的值：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

.flex__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    width: 100%;
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">但在末尾行，如果和前面行的个数不相同（Flex项目）就会出现下图这样的效果：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682998859-82cd4cab-c7e5-44e0-8247-f98491248590.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">像上图这样的效果，并不是我们所需要的，因为我们希望在最后一行的Flex项目不足够排列满一行时，希望Flex项目一个紧挨一个的排列：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682998794-76cae44a-79d3-4462-b9dd-cfbcc98b25f7.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在Flexbox要实现上图这样的效果，只需要在Flex容器中添加一个伪元素：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

.flex__container::after {
    content: "";
    display: flex;
    flex: 0 1 32vw;
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">注意，伪元素的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">flex-basis</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">建议设置的和卡片的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">flex-basis</font><font style="color:rgb(62, 62, 62);">（或宽度）等同。这个时候你将看到像下面这样的示例：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682999198-c0e72d8f-9e82-45f9-a273-83cafe44ae49.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">不过这种方式也不是最佳的方式，当末尾行的个数不只少一个时，就会出现下图这样的效果：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682999322-51be0e99-2250-44f7-abf8-36184b089c54.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">面对这样的场景，我们需要给Flex容器添加额外的空标签元素：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(153, 153, 153);">占位符元素数量 = 每行最大的列数 - 2</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">但是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">gap</font><font style="color:rgb(62, 62, 62);">属性出现之后，要实现这样的效果就不难了：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

body {
    padding: 1vh;
}

.flex__container {
    display: flex;
    flex-wrap: wrap;
    gap: 2vh;

    width: 100%;
}

.flex__item {
    flex: 0 1 calc((100vw - 8vh) / 4);
}
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682999378-b523042b-de07-4bc3-901c-863e97c48a63.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">注意，</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">gap</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">运用在Flexbox中到目前为止，仅得到了Firefox浏览器的支持。上面的示例，使用Firefox浏览器，你看到的效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682999517-8008500b-704f-47ad-b333-29821dcbe366.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">在CSS Grid布局中，就可以直接使用</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">gap</font><font style="color:rgb(62, 62, 62);">：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

body {
    padding: 1vh;
}

.grid__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1vh;
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682999791-65b45c7f-191f-46e1-b4ec-d6afaadc3ab7.png)<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(34, 34, 34);">  
</font>

## <font style="color:rgb(255, 106, 0);">八  选择最佳的值</font>
<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">很多时候，针对不同的场景，设计师会为我们提供不同的设计风格，比如元素大小：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666682999961-de4ae77f-3ef3-4f03-8944-1aae078b0481.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">随着</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">clam()</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">函数的到来，这一切都变得容易地多。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">clam()</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">函数接受三个参数，即</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">clam(MIN, VAL, MAX)</font><font style="color:rgb(62, 62, 62);">，其中</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MIN</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">表示最小值，</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">VAL</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">表示首选值，</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MAX</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">表示最大值。它们之间：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

+ <font style="color:rgb(62, 62, 62);">如果</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">VAL</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">在</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MIN</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">和</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MAX</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">之间，则使用</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">VAL</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">作为函数的返回值。</font>
+ <font style="color:rgb(62, 62, 62);">如果</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">VAL</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">大于</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MAX</font><font style="color:rgb(62, 62, 62);">，则使用</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MAX</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">作为函数的返回值。</font>
+ <font style="color:rgb(62, 62, 62);">如果</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">VAL</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">小于</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MIN</font><font style="color:rgb(62, 62, 62);">，则使用</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MIN</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">作为函数的返回值。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">我们来看一个示例：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

.element {
    /**
    * MIN = 100px
    * VAL = 50vw ➜ 根据视窗的宽度计算
    * MAX = 500px
    **/

    width: clamp(100px, 50vw, 500px);
}
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">比如浏览器视窗现在所处的位置是1200px的宽度，那么</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">.element</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">渲染的结果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666683000173-8dd9a34d-6300-40cf-9075-f8d36bd3138a.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这个时候</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">.element</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">元素的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">width</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">500px</font><font style="color:rgb(62, 62, 62);">。此时，</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">clamp(100px, 50vw, 500px)</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">相当于</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">clamp(100px, 600px, 500px)</font><font style="color:rgb(62, 62, 62);">，对应的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);background-color:rgb(245, 245, 245);">VAL</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">值是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">600px</font><font style="color:rgb(62, 62, 62);">，大于</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MAX</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">值，那么这个时候</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">clamp()</font><font style="color:rgb(62, 62, 62);">函数返回的值是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MAX</font><font style="color:rgb(62, 62, 62);">，即</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">500px</font><font style="color:rgb(62, 62, 62);">，这个时候</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">.element</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);background-color:rgb(245, 245, 245);">width</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">值就是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">500px</font><font style="color:rgb(62, 62, 62);">（即</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MAX</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的值）。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">如果我们把浏览器视窗缩小至</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">760px</font><font style="color:rgb(62, 62, 62);">：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666683000200-9eacea2a-060a-46ad-94e5-674569d250be.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这个时候</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">.element</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">元素的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">width</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">50vw</font><font style="color:rgb(62, 62, 62);">。此时，</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">clamp(100px, 50vw, 500px)</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">相当于</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">clamp(100px, 380px, 500px)</font><font style="color:rgb(62, 62, 62);">，对应的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">VAL</font><font style="color:rgb(62, 62, 62);"> 值是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">380px</font><font style="color:rgb(62, 62, 62);">，该值大于</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MIN</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">值（</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">100px</font><font style="color:rgb(62, 62, 62);">），小于</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MAX</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">值（</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">500px</font><font style="color:rgb(62, 62, 62);">），那么这个时候</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">clamp()</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">函数返回的值是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">VAL</font><font style="color:rgb(62, 62, 62);">，即</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">50vw</font><font style="color:rgb(62, 62, 62);">，这个时候</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">.element</font><font style="color:rgb(62, 62, 62);">的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">width</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">值就是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">50vw</font><font style="color:rgb(62, 62, 62);">（即</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">VAL</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的值）。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">如果继续将浏览器的视窗缩小至</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">170px</font><font style="color:rgb(62, 62, 62);">：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666683000319-b79db944-d416-417b-a499-b224386c3392.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这个时候</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">.element</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">元素的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">width</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">100px</font><font style="color:rgb(62, 62, 62);">。此时，</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">clamp(100px, 50vw, 500px)</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">相当于</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);background-color:rgb(245, 245, 245);">clamp(100px, 85px, 500px)</font><font style="color:rgb(62, 62, 62);">，对应的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">VAL</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">值是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">85px</font><font style="color:rgb(62, 62, 62);">，该值小于</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MIN</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">值（</font><font style="color:rgb(102, 102, 102);">100px</font><font style="color:rgb(62, 62, 62);">），那么这个时候</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">clamp()</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">函数返回的值是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MIN</font><font style="color:rgb(62, 62, 62);">，即</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">100px</font><font style="color:rgb(62, 62, 62);">，这个时候</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">.element</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">width</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">值就是</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">100px</font><font style="color:rgb(62, 62, 62);">（即</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">MIN</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的值）。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">就该示例而言，</font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">clamp(100px, 50vw, 500px)</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">还可以这样来理解：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

+ <font style="color:rgb(62, 62, 62);">元素 .element 的宽度不会小于 100px（有点类似于元素设置了 min-width: 100px）。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

+ <font style="color:rgb(62, 62, 62);">元素</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">.element</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的宽度不会大于</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">500px</font><font style="color:rgb(62, 62, 62);">（有点类似于元素设置了</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">max-width: 500px</font><font style="color:rgb(62, 62, 62);">）。</font>

<font style="color:rgb(62, 62, 62);">  
</font>

+ <font style="color:rgb(62, 62, 62);">首选值</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">VAL</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">为</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">50vw</font><font style="color:rgb(62, 62, 62);">，只有当视窗的宽度大于</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">200px</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">且小于</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">1000px</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">时才会有效，即元素</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">.element</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">的宽度为</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">50vw</font><font style="color:rgb(62, 62, 62);">（有点类似于元素设置了</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">width：50vw</font><font style="color:rgb(62, 62, 62);">）。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

## <font style="color:rgb(255, 106, 0);">九  Logo图标的对齐</font>
<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">我想你在Web开发中可能碰到过类似下图的这样的场景：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666683000345-7cb394fb-8360-4fe4-a11f-db3592ffa4ae.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">正像上图所示，Logo图像的有大有小（宽度和高度都不一样）。面对这样的业务场景，很多时候都希望设计师能提供相同尺寸的图像。但这样势必会影响Logo图像的外观。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">前段时间看到@Ahmad Shadeed专门写了一篇博文《Aligning Logo Images in CSS》，就是介绍如何实现上图这样的布局效果。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">其实实现这样的布局效果，主要运用到的就是CSS的</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">object-fit</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">属性，而这个属性早在多年前就得到了各大主流浏览器的支持。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这里我们用一个简单的示例，来看看具体实现过程。先来看HTML结构：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css
<!-- HTML -->
<ul class="brands">
    <li class="brands__item">
        <a href="#">
            <img src="img/logo.png" alt="">
        </a>
    </li>
    <li> <!-- ... --> </li>
</ul>
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">居中对齐前面已经介绍过了，这里主要是看图像大小方面的处理：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

```css

.brands {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 1rem;
}

.brands__item {
    background: #eee;
}

.brands__item a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.brands__item img {
    width: 130px;
    height: 75px;
    object-fit: contain;
}
```

<font style="color:rgb(62, 62, 62);">  
</font>

<font style="color:rgb(62, 62, 62);">这样就能实现上图的效果。你可能发现了，有些Logo图像带有背景颜色，如果让效果更好一些，可以把CSS混合模式相关的特性运用进来：</font>

<font style="color:rgb(34, 34, 34);"></font>

```css

.brands__item img {
    width: 130px;
    height: 75px;
    object-fit: contain;
    mix-blend-mode: multiply;
}
```

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">这个时候，你看到的效果如下：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666683000681-00bb4b13-042c-4688-ba96-50e84bc4f8b8.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">object-fit</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">除了取值</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(102, 102, 102);background-color:rgb(245, 245, 245);">contain</font><font style="color:rgb(62, 62, 62);"> </font><font style="color:rgb(62, 62, 62);">之外，还有其他几个值：</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666683000978-08e5638b-78da-43d0-b141-c989e153dbc7.png)

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">其实这个方案也适用于产品图片，人物头像等布局。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

**<font style="color:rgb(255, 106, 0);">小结</font>**

**<font style="color:rgb(255, 106, 0);">  
</font>**

<font style="color:rgb(62, 62, 62);">文章中主要介绍了Web中一些布局的实现思路和具体方案。其实文章提到的效果，比如水平垂直居中、等高布局、平均分布列和Sticky Footer等，在CSS中一直有多种解决方案，只不过随着CSS Flexbox布局模块和CSS Grid布局模块的到来，实现这些效果变得更为灵活和简洁。</font>

<font style="color:rgb(34, 34, 34);">  
</font>

<font style="color:rgb(62, 62, 62);">当然，文章中提到的只是一些最为常见的一些效果，其实在Web布局中，特别是Flexbox布局和Grid布局中还存在着很多有意思的东西，只不过因为篇幅的原因没有一一罗列。如果你感兴趣可以再挖掘一些出来，如果你在这方面有更好的经验或方案，欢迎在下面的评论中分享。最后希望这篇文章对你平时的工作有所帮助</font>

