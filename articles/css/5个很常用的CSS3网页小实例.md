<font style="color:rgb(77, 77, 77);">由于最近比较忙，自己也没有很充裕的时间可以去做比较丰富的案例。我挤出时间来制作这几个很常用的</font>[CSS3](https://so.csdn.net/so/search?q=CSS3&spm=1001.2101.3001.7020)<font style="color:rgb(77, 77, 77);">网页小效果。</font>

<font style="color:rgb(77, 77, 77);">最近写JS的时间比例比较多，不过我还是比较钟情于CSS3。所以我还是坚持分享一些实用的CSS3小例子。这次由于时间有限，就做了几个相对比较简单的例子。我们一起来看一下。</font>

## **<font style="color:rgb(79, 79, 79);">第一种效果：</font>**
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1666679497143-b34e9319-82cf-447c-bd0a-0aa40b91bb56.gif)

<font style="color:rgb(77, 77, 77);">由于录制gif图片会掉帧，所以看起来不流畅，很卡，但其实实际效果还是不错的，有弹性一些。</font>

<font style="color:rgb(77, 77, 77);">html代码：</font>

```html
<span class=shake>弹</span>


<style>
  .shake {
    width: 40px;
    height: 40px;
    display: block;
    background: lightgreen;
    border-radius: 50%;
    margin: 5px;
    color: #fff;
    font-size: 24px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    -webkit-transition: all 0.25s;
  }

  .shake:hover {
    -webkit-animation: shake 0.25s;
    background: lightblue;
  }

  @-webkit-keyframes shake {

    0%,
    10%,
    55%,
    90%,
    94%,
    98%,
    100% {
      -webkit-transform: scale(1, 1);
    }

    30% {
    -webkit-transform: scale(1.14, 0.86);
  }

  75% {
  -webkit-transform: scale(0.92, 1.08);
  }

  92% {
    -webkit-transform: scale(1.04, 0.96);
  }

  96% {
  -webkit-transform: scale(1.02, 0.98);
  }

  99% {
    -webkit-transform: scale(1.01, 0.99);
  }
  }
</style>
```

## **<font style="color:rgb(79, 79, 79);">第二种效果：</font>**
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1666679645063-1e9d95e1-0c44-4ba3-9fda-3276ab0d177e.gif)

<font style="color:rgb(77, 77, 77);">这种效果其实目前线上很多网站都在用了，不管是使用CSS3，还是jQuery，都是可以实现的。那这里我只是简单地使用CSS3来实现。</font>

<font style="color:rgb(77, 77, 77);">html代码：</font>

<<font style="color:rgb(228, 86, 73);">input</font> <font style="color:rgb(152, 104, 1);">class</font>=<font style="color:rgb(80, 161, 79);">search</font> <font style="color:rgb(152, 104, 1);">type</font>=<font style="color:rgb(80, 161, 79);">text</font> <font style="color:rgb(152, 104, 1);">placeholder</font>=<font style="color:rgb(80, 161, 79);">搜索...</font>>

<font style="color:rgb(77, 77, 77);">CSS代码：</font>

```css
.search {
  width: 80px;
  height: 40px;
  border-radius: 40px;
  border: 2px solid lightblue;
  position: absolute;
  right: 200px;
  outline: none;
  text-indent: 12px;
  color: #666;
  font-size: 16px;
  padding: 0;
  -webkit-transition: width 0.5s;
}

.search:focus {
  width: 200px;
}
```

<font style="color:rgb(77, 77, 77);">一般旁边都会有一个按钮，这里我就不做了</font>

## **<font style="color:rgb(79, 79, 79);">第三种效果：</font>**
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1666679760514-9974f470-3b4a-4a5f-b9e2-c8e27f1dc541.gif)

<font style="color:rgb(77, 77, 77);">这种效果也是很常用，比较多还是个人网站偏多。</font>

<font style="color:rgb(77, 77, 77);">html代码：</font>

<font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);"><</font><font style="color:rgb(166, 38, 164);background-color:rgb(250, 250, 250);">div</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);"> </font><font style="color:rgb(166, 38, 164);background-color:rgb(250, 250, 250);">class</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);">=banner>    </font>

<font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);"> <</font><font style="color:rgb(228, 86, 73);background-color:rgb(250, 250, 250);">a</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);"> </font><font style="color:rgb(152, 104, 1);background-color:rgb(250, 250, 250);">href</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);">=</font><font style="color:rgb(80, 161, 79);background-color:rgb(250, 250, 250);">javascript:;</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);">>博</</font><font style="color:rgb(228, 86, 73);background-color:rgb(250, 250, 250);">a</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);">>        </font>

<font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);"><</font><font style="color:rgb(228, 86, 73);background-color:rgb(250, 250, 250);">span</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);">>这是我的个人博客</</font><font style="color:rgb(228, 86, 73);background-color:rgb(250, 250, 250);">span</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);">></font>

<font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);"></</font><font style="color:rgb(228, 86, 73);background-color:rgb(250, 250, 250);">div</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);">></font>

```css
.banner{    
  width:234px;    
  height:34px;    
  border-radius:34px;    
  position:absolute;    
  top:400px;    
  left:200px;
}
.banner a{    
  display:inline-block;    
  width:30px;    
  height:30px;    
  line-height:30px; 
  border-radius:50%;    
  border:2px solid lightblue;   
  position:absolute;    
  left:0px;top:0px;    
  background:lightgreen;    
  color:#fff;    
  text-align:center;    
  text-decoration:none;    
  cursor:pointer; 
  z-index:2;}

.banner a:hover + span{   
  -webkit-transform:rotate(360deg);    
  opacity:1;
}
.banner span{
  display:inline-block;
  width:auto; 
  padding:0 20px;
  height:34px;
  line-height:34px;
  background:lightblue; 
  border-radius:34px;
  text-align: center;
  position:absolute;
  color:#fff;
  text-indent:25px; 
  opacity:0;
  -webkit-transform-origin:8% center;
  -webkit-transition:all 1s;
}
```

****

## 第四种效果：
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1666679862720-39491a38-401d-4d58-ac98-968e22bcddd5.gif)

<font style="color:rgb(77, 77, 77);">这种提示效果就更常用了，很多网站都用。</font>

<font style="color:rgb(77, 77, 77);">html代码：</font>

<font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);"><</font><font style="color:rgb(166, 38, 164);background-color:rgb(250, 250, 250);">div</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);"> </font><font style="color:rgb(166, 38, 164);background-color:rgb(250, 250, 250);">class</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);">=banner1></font>

<font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);"> <</font><font style="color:rgb(228, 86, 73);background-color:rgb(250, 250, 250);">a</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);"> </font><font style="color:rgb(152, 104, 1);background-color:rgb(250, 250, 250);">href</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);">=</font><font style="color:rgb(80, 161, 79);background-color:rgb(250, 250, 250);">javascript:;</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);">>博</</font><font style="color:rgb(228, 86, 73);background-color:rgb(250, 250, 250);">a</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);">> </font>

<font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);"><</font><font style="color:rgb(228, 86, 73);background-color:rgb(250, 250, 250);">span</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);">>这是我的个人博客</</font><font style="color:rgb(228, 86, 73);background-color:rgb(250, 250, 250);">span</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);">></font>

<font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);"></</font><font style="color:rgb(228, 86, 73);background-color:rgb(250, 250, 250);">div</font><font style="color:rgb(56, 58, 66);background-color:rgb(250, 250, 250);">></font>

```css
 .banner1 {
    width: 234px;
    height: 34px;
    border-radius: 40px;
    position: absolute;
    top: 400px;
    left: 600px;
  }

  .banner1 a {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    border: 2px solid lightblue;
    position: absolute;
    left: 0px;
    top: 0px;
    background: lightgreen;
    color: #fff;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    z-index: 2;
  }

  .banner1 a:hover+span {
    -webkit-transform: translateX(40px);
    opacity: 1;
  }

  .banner1 span {
    display: inline-block;
    width: auto;
    padding: 0 20px;
    height: 30px;
    line-height: 30px;
    background: lightblue;
    border-radius: 30px;
    text-align: center;
    color: #fff;
    position: absolute;
    top: 2px;
    opacity: 0;
    -webkit-transition: all 1s;
    -webkit-transform: translateX(80px);
  }
```

## 第五种效果
[codepen](https://codepen.io/itlixiaolong/embed/zYaYBaR)



