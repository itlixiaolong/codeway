# <font style="color:rgb(34, 34, 34);background-color:rgb(237, 237, 237);">移动端1px问题解决方案</font>
<font style="color:rgba(0, 0, 0, 0.3);background-color:rgb(237, 237, 237);">原创</font><font style="color:rgb(34, 34, 34);background-color:rgb(237, 237, 237);"> </font><font style="background-color:rgb(237, 237, 237);">糖醋草莓皮</font><font style="color:rgb(34, 34, 34);background-color:rgb(237, 237, 237);"> </font><font style="color:rgb(87, 107, 149);background-color:rgb(237, 237, 237);">前端工匠 </font><font style="color:rgb(34, 34, 34);background-color:rgb(237, 237, 237);"> </font>_<font style="background-color:rgb(237, 237, 237);">2020-08-23 12:00</font>_

## <font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">高清屏中1px线问题</font>
<font style="color:black;background-color:rgb(237, 237, 237);">在移动端web开发中，UI设计稿中设置边框为1像素，前端在开发过程中如果出现border:1px，测试会发现在retina屏机型中，1px会比较粗，即是较经典的移动端1px像素问题。</font>

## <font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">为什么高清屏下1px更宽</font>
<font style="color:black;background-color:rgb(237, 237, 237);">高清屏（retina屏）是指</font>**<font style="color:black;background-color:rgb(237, 237, 237);">高dpr的设备</font>**<font style="color:black;background-color:rgb(237, 237, 237);">，其</font>**<font style="color:black;background-color:rgb(237, 237, 237);">物理像素的密度更大</font>**<font style="color:black;background-color:rgb(237, 237, 237);">。又分为有两倍屏，三倍屏。</font>

<font style="color:black;background-color:rgb(237, 237, 237);">dpr:物理像素/css像素</font>

<font style="color:black;background-color:rgb(237, 237, 237);">在</font>**<font style="color:black;background-color:rgb(237, 237, 237);">普通屏</font>**<font style="color:black;background-color:rgb(237, 237, 237);">，</font>**<font style="color:black;background-color:rgb(237, 237, 237);">1个css像素对应1个物理像素</font>**<font style="color:black;background-color:rgb(237, 237, 237);">；</font>**<font style="color:black;background-color:rgb(237, 237, 237);">2倍屏中</font>**<font style="color:black;background-color:rgb(237, 237, 237);">，</font>**<font style="color:black;background-color:rgb(237, 237, 237);">一个css像素对应4个物理像素</font>**<font style="color:black;background-color:rgb(237, 237, 237);">；三倍屏中则是9个。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613278848-06dfbf5a-7005-468b-8d9c-85cbd4ba6abe.png)

<font style="color:black;background-color:rgb(237, 237, 237);">按照这样的置换规则后一张相同的图片在不同的设备上才会显示相同的大小。</font>

<font style="color:black;background-color:rgb(237, 237, 237);">1px的线在高清屏下本应不需要做特殊处理。两倍屏下会自动用</font>**<font style="color:black;background-color:rgb(237, 237, 237);">两排</font>**<font style="color:black;background-color:rgb(237, 237, 237);">物理像素去展示‘1px’的细线，普通屏用</font>**<font style="color:black;background-color:rgb(237, 237, 237);">一排</font>**<font style="color:black;background-color:rgb(237, 237, 237);">物理像素去展示‘1px’的细线，他们应该看起来是相同的。但是，就像数学中的概念：线是没有宽度的，点是没有大小的。像素同样是没有大小的。</font>

**<font style="color:black;background-color:rgb(237, 237, 237);">两倍屏的物理像素密度是普通屏的两倍</font>**<font style="color:black;background-color:rgb(237, 237, 237);">，并不是每一个物理像素是普通屏的1/4大小，而</font>**<font style="color:black;background-color:rgb(237, 237, 237);">是物理像素的间距是普通屏间距的1/2。</font>**

**<font style="color:black;background-color:rgb(237, 237, 237);">用两倍屏下用两排像素去展示</font>**<font style="color:black;background-color:rgb(237, 237, 237);">，自然会比普通屏中用一排像素去展示</font>**<font style="color:black;background-color:rgb(237, 237, 237);">看起来更粗</font>**<font style="color:black;background-color:rgb(237, 237, 237);">。</font>

## **<font style="color:black;background-color:rgb(237, 237, 237);">如何修正高清屏下的1px问题</font>**
<font style="color:black;background-color:rgb(237, 237, 237);">要解决1px问题，本质就是</font>**<font style="color:black;background-color:rgb(237, 237, 237);">让高清屏用一个物理像素去展示一个css像素</font>**<font style="color:black;background-color:rgb(237, 237, 237);">。</font>

<font style="color:black;background-color:rgb(237, 237, 237);">可以按照不同屏幕的dpr作出转换，比如在2倍屏下将1px的细线写成</font><font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">border:0.5px</font><font style="color:black;background-color:rgb(237, 237, 237);">。但这种方法只在ios上支持，安卓上会显示成被当成0px处理。</font>

<font style="color:black;background-color:rgb(237, 237, 237);">更通用的方案中，有</font>**<font style="color:black;background-color:rgb(237, 237, 237);">svg</font>**<font style="color:black;background-color:rgb(237, 237, 237);">和</font>**<font style="color:black;background-color:rgb(237, 237, 237);">伪类元素</font>**<font style="color:black;background-color:rgb(237, 237, 237);">两种。</font>

## <font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">SVG方案</font>
<font style="color:black;background-color:rgb(237, 237, 237);">这种方案本质上</font>**<font style="color:black;background-color:rgb(237, 237, 237);">border并没有变细</font>**<font style="color:black;background-color:rgb(237, 237, 237);">，但是boder被一分为二，</font>**<font style="color:black;background-color:rgb(237, 237, 237);">靠内侧的是透明的</font>**<font style="color:black;background-color:rgb(237, 237, 237);">。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613278868-8f5cf354-5ed1-4269-9bbe-436c0c95b2c0.png)

<font style="color:black;background-color:rgb(237, 237, 237);">关键的样式代码是css中的svg生成函数。</font>

<font style="color:black;background-color:rgb(237, 237, 237);">SVG即矢量图，用xml标签写在html文件中。</font>

<font style="color:black;background-color:rgb(237, 237, 237);">通过</font><font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">postcss-write-svg</font><font style="color:black;background-color:rgb(237, 237, 237);">这个postcss插件</font>**<font style="color:black;background-color:rgb(237, 237, 237);">将css中svg函数生成的图像处理成base64</font>**<font style="color:black;background-color:rgb(237, 237, 237);">。这样就可以在css文件直接调用svg函数。</font>

```jsx
/* src/index.css */
@svg custom-name { 
  width: 4px;  
  height: 4px;  
   @rect {
       fill: transparent;
       width: 100%;
       height: 100%;
       stroke-width: 1;
       stroke: var(--color, black);  
    }
}
.svg-retina-border {
    border: 1px solid;
    border-image: svg(custom-name param(--color green)) 1 repeat;
}
.normal-border {
    border: 1px solid green;
}

```

<font style="color:black;background-color:rgb(237, 237, 237);">处理过后的样子</font><!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613278761-087901fd-05a4-4028-bbeb-e941b2d2b31f.png)

**<font style="color:black;background-color:rgb(237, 237, 237);">剩余完整代码</font>**

```jsx
import './index.css'
const root = document.getElementById('root')
const div2 = document.createElement('div')
div2.innerHTML = 'SVG-retina-border'
div2.className = 'svg-retina-border'
root.append(div2)
root.append(document.createElement('br'))
const div3 = document.createElement('div')
div3.innerHTML = 'normal-border'
div3.className = 'normal-border'
root.append(div3)


<!-- src/index.html -->
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />    	 		 <title>Document</title>
    </head>  
    <body>    	
        <div id="root"></div>  
    </body>
</html>


// webpack.config.js
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
module.exports = {
	mode: 'development',
    entry: {
    	entry1: './src/index.js'  
    },  
    output: {
    	path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'  
    },  
    module: {
    	rules: [{
        	test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }]  
    },  
    plugins: [
    	new HtmlPlugin({
        	template: './src/index.html'    
        }) 
    ],  
    devServer: {
    	contentBase: path.resolve(__dirname, 'dist'),
        host: '0.0.0.0', 
        port: 3005,
        compress: true,
        disableHostCheck: true  
    }
}
```

### <font style="color:black;background-color:rgb(237, 237, 237);">SVG</font>
<font style="color:black;background-color:rgb(237, 237, 237);">分别直接用xml的svg标签和css实现了两个100px，边框宽为1的矩形。</font>

<font style="color:black;background-color:rgb(237, 237, 237);">高清屏下效果如下。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613278734-d24b0833-1d57-44f8-b6a2-dd868e8154d8.png)

<font style="color:rgb(136, 136, 136);background-color:rgb(237, 237, 237);">1598073606858</font>

```html
<-- 视口大小-->  
  <svg xmlns="custom-namespace" width="100" height="100">
      <rect        
      <--矩形大小-->
      width="100"
      height="100"
      fill="transparent"
      <--svg中所有的单位都是px-->
      stroke-width="1"
      stroke="black"      
      />    
  </svg>    
  <div style="width: 100px;height: 100px;border: 1px solid black;box-sizing: border-box;"></div>
```

<font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">stroke-width</font><font style="color:black;background-color:rgb(237, 237, 237);">和</font><font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">border</font><font style="color:black;background-color:rgb(237, 237, 237);">一样，都将矩形的边设为了1px，但是用svg实现的矩形边框看起来却更细。</font>**<font style="color:black;background-color:rgb(237, 237, 237);">关键的地方</font>**<font style="color:black;background-color:rgb(237, 237, 237);">是使用svg标记的</font>**<font style="color:black;background-color:rgb(237, 237, 237);">视口大小</font>**<font style="color:black;background-color:rgb(237, 237, 237);">和使用rect标记的</font>**<font style="color:black;background-color:rgb(237, 237, 237);">矩形大小</font>**<font style="color:black;background-color:rgb(237, 237, 237);">是</font>**<font style="color:black;background-color:rgb(237, 237, 237);">相同的</font>**<font style="color:black;background-color:rgb(237, 237, 237);">。</font>

<font style="color:black;background-color:rgb(237, 237, 237);">svg中没有盒模型的概念，它的</font>**<font style="color:black;background-color:rgb(237, 237, 237);">stroke</font>**<font style="color:black;background-color:rgb(237, 237, 237);">画线并</font>**<font style="color:black;background-color:rgb(237, 237, 237);">不是对应css中的border</font>**<font style="color:black;background-color:rgb(237, 237, 237);">。</font>**<font style="color:black;background-color:rgb(237, 237, 237);">更像是不占空间的outline</font>**<font style="color:black;background-color:rgb(237, 237, 237);">。因为不占空间，它会以rect（矩形）的边界为</font>**<font style="color:black;background-color:rgb(237, 237, 237);">中心画线，一条线一半宽度在矩形内，一半在矩形外</font>**<font style="color:black;background-color:rgb(237, 237, 237);">。</font>

**<font style="color:black;background-color:rgb(237, 237, 237);">而因为视口宽度正好等于矩形的大小，看到的线宽就只有一半了</font>**<font style="color:black;background-color:rgb(237, 237, 237);">。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613278786-7995f269-f6fe-4a70-ac4d-f396c3d169ee.png)<font style="color:black;background-color:rgb(237, 237, 237);">（用</font>**<font style="color:black;background-color:rgb(237, 237, 237);">svg</font>**<font style="color:black;background-color:rgb(237, 237, 237);">画一个100px大小+1px边宽的方形）</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613279301-6810401c-8f30-4e81-b1d4-c4af39b82f84.png)<font style="color:black;background-color:rgb(237, 237, 237);">(用css画一个100px大小+1px边框的方形</font>**<font style="color:black;background-color:rgb(237, 237, 237);">border-box)</font>**

<font style="color:black;background-color:rgb(237, 237, 237);">如果把矩形缩小一点，不占满视口，这时候看到的border是完整的，所以和没处理过的1px一样粗。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613279328-b8a5e3c4-8a9d-4727-a0d5-d9405ead74a5.png)

### <font style="color:black;background-color:rgb(237, 237, 237);">border-image</font>
<font style="color:black;background-color:rgb(237, 237, 237);">border-image是三个属性的缩写</font>

```css
border-image-source: url('https://misc.aotu.io/leeenx/border-image/box.png');
border-image-slice: 33% 20% 3 fill;
border-image-repeat: stretch;
```

+ <font style="color:rgb(1, 1, 1);background-color:rgb(237, 237, 237);">border-image-source：图片链接或base64；</font>
+ <font style="color:rgb(1, 1, 1);background-color:rgb(237, 237, 237);">border-image-slice：图片切割的四个位置。把图片切成9块，除中间一块，其他八块分别被当成边框使用。接受1-4个参数（使用类似于padding/margin的尺寸设置）。可以是百分比（相对于图片自身），也可以是数字（单位是px）。最后的fill决定中间那块图片会不会被当成background使用。</font>
+ <font style="color:rgb(1, 1, 1);background-color:rgb(237, 237, 237);">border-image-repeat：stretch/round（平铺）/repeat（重复）上下左右四个正位的图片怎样被当成border使用。</font>
+ <font style="color:rgb(1, 1, 1);background-color:rgb(237, 237, 237);">round（平铺）会压缩，repeat（重复）会剪裁。</font>

<font style="color:black;background-color:rgb(237, 237, 237);">border-image必须配合border使用。最终</font>**<font style="color:black;background-color:rgb(237, 237, 237);">border宽度是border-width</font>**<font style="color:black;background-color:rgb(237, 237, 237);">。</font>**<font style="color:black;background-color:rgb(237, 237, 237);">border-style也必须指定</font>**<font style="color:black;background-color:rgb(237, 237, 237);">，border-color可以不用。</font>

## **<font style="color:black;background-color:rgb(237, 237, 237);">伪类元素方案</font>**
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613279309-6934c32c-7c15-4f3f-8501-c2bb55d18d57.png)

**<font style="color:black;background-color:rgb(237, 237, 237);">完整代码</font>**

```css
// index.html
<!DOCTYPE html>
<html lang="en">
    <head> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="./index.css" />  
    </head> 
    <body> 
        <div class="retina-border">retina border</div>
        <br />   
        <div class="normal-border">normal border</div> 
    </body>
</html>
// index.css
.retina-border {
	position: relative;
}
.retina-border::before {
	content: '';  
	position: absolute;
    width: 100%;
    height: 100%; 
    transform-origin: left top;
    box-sizing: border-box;
    pointer-events: none; 
    border-width: 1px;
    border-style: solid;
    border-color: #333;
}
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {  .retina-border::before {   
	width: 200%; 
    height: 200%; 
    transform: scale(0.5); 
    }
}
@media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 3dppx) {  .retina-border::before {  
	width: 300%; 
    height: 300%;   
    transform: scale(0.33);
    }
}
.normal-border { 
	border: 1px solid #333;
}
```

### <font style="color:black;background-color:rgb(237, 237, 237);">具体实现</font>
<font style="color:black;background-color:rgb(237, 237, 237);">以两倍屏为例</font>

```css

.retina-border {
	position: relative;
}
.retina-border::before { 
	content: ''; 
    position: absolute;
    top: 0px; 
    right: 0px; 
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    transform-origin: left top;  
    box-sizing: border-box;
    pointer-events: none; 
    border-width: 1px;  
    border-style: solid;
    border-color: #333;
}
```

<font style="color:black;background-color:rgb(237, 237, 237);">通过一个伪类选择器在retinaborder元素中加了一个子元素</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613279399-75f9dd0b-fc27-49c3-88bf-90f9b197d948.png)

<font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">border-width: 1px</font><font style="color:black;background-color:rgb(237, 237, 237);">将边框的宽度设为1px。</font>

<font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">width:200%</font><font style="color:black;background-color:rgb(237, 237, 237);">然后将</font>**<font style="color:black;background-color:rgb(237, 237, 237);">伪类元素的宽高都设置成父元素的2倍</font>**<font style="color:black;background-color:rgb(237, 237, 237);">。(</font>**<font style="color:black;background-color:rgb(237, 237, 237);">但是边框还是1px</font>**<font style="color:black;background-color:rgb(237, 237, 237);">)</font>

<font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">transform:scale(0.5)</font><font style="color:black;background-color:rgb(237, 237, 237);">将</font>**<font style="color:black;background-color:rgb(237, 237, 237);">伪类元素的x，y轴方向都缩放到0.5倍。</font>**

<font style="color:black;background-color:rgb(237, 237, 237);">通过两次尺寸的设置，使这个伪类子元素保持内容的大小还是和父元素一样，但是</font><font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">border:0.5px</font><font style="color:black;background-color:rgb(237, 237, 237);">的效果。</font>

<font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">pointer-events: none</font><font style="color:black;background-color:rgb(237, 237, 237);">当有元素的层级重叠时，鼠标点击是无法穿透的。即绝对定位的伪类元素的层级更高，它底下的元素（即文字：retina border)无法被事件触发。置为none时，</font>**<font style="color:black;background-color:rgb(237, 237, 237);">绝对定位的元素不触发事件，底下的那层才能被选中。</font>**

**<font style="color:black;background-color:rgb(237, 237, 237);">其他css样式作用</font>**

+ <font style="color:black;background-color:rgb(237, 237, 237);">伪类元素默认的</font><font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">display:inline</font><font style="color:black;background-color:rgb(237, 237, 237);">。而</font><font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">position：absolute</font><font style="color:black;background-color:rgb(237, 237, 237);">会使元素</font><font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">display:block</font><font style="color:black;background-color:rgb(237, 237, 237);">。只有块级元素的尺寸(宽/高)设置才是有效的。</font>
+ <font style="color:black;background-color:rgb(237, 237, 237);">其中伪类选择器中</font><font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">content</font><font style="color:black;background-color:rgb(237, 237, 237);">是必填项，不然无法生效</font>
+ <font style="color:black;background-color:rgb(237, 237, 237);">transform-origin的缩放的中心点，默认是元素中心,</font>
+ <font style="color:black;background-color:rgb(237, 237, 237);">transform-origin的缩放的中心点，默认是元素中心,和绝对定位的top，right一样，相对的是padding+content部分整个空间的位置</font>
+ <font style="color:black;background-color:rgb(237, 237, 237);">绝对定位的元素其top和right值是相对于padding+content的，默认值是从content开始，所以要规定都是0，否则当父元素有padding时，border就移位了</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613279527-70847c8b-22ac-425a-a64c-54395c892f1c.png)<font style="color:black;background-color:rgb(237, 237, 237);">（如果删去position：absolute）</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613279734-5be8d29f-154b-4745-935e-7c06791ec10a.png)<font style="color:black;background-color:rgb(237, 237, 237);">（如果删去position：absolute+display:block）</font>

<font style="color:black;background-color:rgb(237, 237, 237);">当使用百分比时，其父元素的高度必须显式指定，（20px/20view）不能是由子元素撑开的，但是宽度是可以的。</font>

## <font style="color:rgb(0, 150, 136);background-color:rgb(237, 237, 237);">两种方案比较</font>
### <font style="color:black;background-color:rgb(237, 237, 237);">兼容性</font>
<font style="color:black;background-color:rgb(237, 237, 237);">svg方案经过postcss处理，最终会影响浏览器兼容性的是</font>**<font style="color:black;background-color:rgb(237, 237, 237);">border-image</font>**<font style="color:black;background-color:rgb(237, 237, 237);">属性</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613279867-8d8c106d-0984-4def-8959-a4ef581deaaa.png)<font style="color:black;background-color:rgb(237, 237, 237);">伪类元素元素：方案最终影响兼容性的是</font>**<font style="color:black;background-color:rgb(237, 237, 237);">transform</font>**<font style="color:black;background-color:rgb(237, 237, 237);">属性</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613279894-b82df619-0164-4c1f-97e1-9edfd10d35a2.png)

<font style="color:rgb(136, 136, 136);background-color:rgb(237, 237, 237);">1598076296220</font>

**<font style="color:black;background-color:rgb(237, 237, 237);">结论：svg方案的兼容性更好</font>**<font style="color:black;background-color:rgb(237, 237, 237);">。</font>

### <font style="color:black;background-color:rgb(237, 237, 237);">灵活性</font>
<font style="color:black;background-color:rgb(237, 237, 237);">由于svg只能画出特定的形状，所以无法实现圆角边框。而伪类元素方案可以。</font>

### <font style="color:black;background-color:rgb(237, 237, 237);">学习成本</font>
<font style="color:black;background-color:rgb(237, 237, 237);">svg方案所用到的border-image属性、svg特性的理解成本较高，并且需要postcss-write-svg处理。伪类元素方案相较简单。</font>

### <font style="color:black;background-color:rgb(237, 237, 237);">总结</font>
<font style="color:black;background-color:rgb(237, 237, 237);">通常情况，伪类元素方案更好，无论是从成本还是灵活性出发。如果是为了更高的兼容性选择svg方案，border-image属性一定要使用缩写。（不然兼容性会更差兼容性测试）</font>

---

<font style="color:black;background-color:rgb(237, 237, 237);">  
</font>





  


