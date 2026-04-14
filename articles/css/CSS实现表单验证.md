[鱼头的Web海洋.一个名为Web的海洋世界](https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247496488&idx=1&sn=c197e8062d97f2c029a7d06f4637a40b&source=41&key=989c3191d8137cb2da6f1ccf15f974fbd13eb7adec3572ae1c90d5b4ec603bfa176d38ae78efa466b0a0a557df31700bb36a4455bc9a6bbb3304b88e49d0e2792b7bc94bd81b87312bd010962d98bca5c80a4ff7222e51d7a82430e6c80a9681277d5c5e7f879b49d53d5341af0098e3f1bcb22f2fb8bd9e7d15bcf6c72cf0bf&ascene=14&uin=MjkwMDAyMjAwMQ%3D%3D&devicetype=iMac+MacBookPro16%2C1+OSX+OSX+12.4+build(21F79)&version=13030010&nettype=WIFI&lang=zh_CN&fontScale=100&exportkey=n_ChQIAhIQV3KxJm9TjV3%2BnFumkEEvuhKAAgIE97dBBAEAAAAAANiBBoxiNmQAAAAOpnltbLcz9gKNyK89dVj0AvfPyCaPkMClxybSOsLyIUp83vWd3ACoqylHBYNmzutyw9Y7oEQl57wVs9%2BxOtpvyEn5RssZLIAwjAv0mhH8lm03%2FCrls7vEcjRIMMQOVVCtus3xyLhxhefX8QAUtlNEc%2B7tOYd9Ifx%2FlS12k4OGmj1wi%2FjSFgIrWyJqcc%2Bh%2FY9FCPcR7OIpNyV9r2be9tzQ6y6XIVISgfaOUT6YwE27fStwneisFXcv2PMZcFGSszOIxT94d6sZwlSl44A3543YK201lQJsvPteBCxASl72pRXAXjfZ2Ozzyzc%3D&acctmode=0&pass_ticket=JbUPnCVY7I6UEbXdaaQV9z%2FvoRYcsIs%2F7NwG4YFoeIB2fTOzgXx91H%2Btr65q%2FC88&wx_header=0&fontgear=2.000000#)

<font style="color:rgba(0, 0, 0, 0.3);">以下文章来源于鱼头的Web海洋</font><font style="color:rgba(0, 0, 0, 0.3);"> </font><font style="color:rgba(0, 0, 0, 0.3);">，作者陈大鱼头</font>

<font style="color:rgb(34, 34, 34);">  
</font>

+ <font style="color:rgb(1, 1, 1);">作者：陈大鱼头</font>
+ <font style="color:rgb(1, 1, 1);">github：KRISACHAN</font>

<font style="color:black;">去年的时候写过一篇文章 纯CSS实现表单验证 ，在发表之后不久就有网友跟鱼头说，打算拿我这篇文章作团队内部分享。</font>

<font style="color:black;">当时听到这个消息之后，在屏幕前的鱼头笑咧了嘴，但这位童鞋的下一段内容，就让我马上笑不起出来了。</font>

<font style="color:black;">不过因为初始化状态是这样的：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613628471-89e5ea75-a13b-460d-b1ff-ba41b55606cd.png)

<font style="color:black;">  
</font><font style="color:black;">所以希望我能够改一下，改成这样：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613628461-0c9861c8-581f-4755-a55f-52db4c1fcd4d.png)

<font style="color:black;">  
</font><font style="color:black;">只有在进行输入且输入内容不对的时候才展示错误信息。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/jpeg/12531001/1666613628478-6ec9bb03-ffa8-4d59-a834-b63e2e7f180f.jpeg)

<font style="color:black;">  
</font><font style="color:black;">这位童鞋：“所以这功能能实现吗？”</font>

<font style="color:black;">我：“。。。。。。”</font>

<font style="color:black;">既然有童鞋这么看得起鱼头，还打算拿鱼头的 DEMO 来作内部分享，那总得硬着头皮来实现这个功能。</font>

<font style="color:black;">首先我们来看一下最终成果图：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1666613628473-1b8b0496-e551-460e-888a-ca3a193ffef5.gif)

<font style="color:black;">  
</font><font style="color:black;">DEMO 在线查看地址：https://codepen.io/krischan77/pen/WmVKYr</font>

<font style="color:black;">各位读者童鞋，来跟鱼头一起拆分下功能实现：</font>

## <font style="color:rgb(155, 155, 155);background-color:rgb(30, 30, 30);">HTML</font>
<font style="color:black;">首先我们来看</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">HTML</font><font style="color:black;"> </font><font style="color:black;">的源码</font>

```css
<form class="form" id="form" method="get" action="/api/form">
    账号：
    <input data-title="账号" placeholder="请输入正确的账号" pattern="\w{6,10}" name="account" type="text" required />
    <span class="f-tips">请输入正确的账号</span>
    <br />
    密码：
    <input data-title="密码" placeholder="请输入正确的密码" pattern="\w{6,10}" name="password" type="password" required />
    <span class="f-tips">请输入正确的密码</span>
    <br />
    <input name="button" type="submit" value="提交" />
</form>
```



<font style="color:black;">这里面的</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">HTML</font><font style="color:black;"> </font><font style="color:black;">标签都比较常规，但是我们要注意下</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);"><input /></font><font style="color:black;"> </font><font style="color:black;">所携带的几个属性：</font>

### <font style="color:black;">required</font>
<font style="color:rgb(30, 107, 184);"><input required/></font><font style="color:black;"> </font><font style="color:black;">中的</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">required</font><font style="color:black;"> </font><font style="color:black;">是一个布尔属性，用来告诉浏览器这个</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);"><input></font><font style="color:black;"> </font><font style="color:black;">是否是必填项。</font>

<font style="color:black;">我们来康康DEMO：</font>

<section class="section">  
    <h1>请输入信息</h1>  
    <form action="/userInfo">  
        <input name="text" type="text" required />  
        <input name="submit" type="submit" value="提交信息">  
    </form>  
</section><font style="color:rgb(220, 220, 220);background-color:rgb(30, 30, 30);">  
</font>

<font style="color:black;">效果如下：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1666613628465-03d9536f-c5b6-48a0-ad08-9db81149582e.gif)

<font style="color:black;">  
</font><font style="color:black;">兼容性如下：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613629098-b903b77d-cafa-4c0d-9049-ebb889305e37.png)

<font style="color:black;">  
</font><font style="color:black;">原生样式体验也是不错的。</font>

### <font style="color:black;">pattern</font>
<font style="color:black;">再来</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">pattern</font><font style="color:black;"> </font><font style="color:black;">属性。</font>

<font style="color:rgb(30, 107, 184);"><input pattern=""></font><font style="color:black;"> </font><font style="color:black;">用于校验输入</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">value</font><font style="color:black;"> </font><font style="color:black;">是否有效。</font>

<font style="color:black;">我们康康DEMO：</font><font style="color:rgb(220, 220, 220);background-color:rgb(30, 30, 30);">  
</font>

```html
<section class="section">
  <form>
    <h1>请输入 我爱鱼头</h1>
    <input name="text" type="text" pattern="我爱鱼头"  required />
    <button type="submit">提交信息</button>
  </form>
</section>

```

<font style="color:black;">效果如下：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1666613628958-59c6f779-2aef-4013-973d-d8e037f813b5.gif)

<font style="color:black;">  
</font><font style="color:black;">兼容性如下：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613629106-f6c5bc56-f6f3-460b-afdb-4445d6059538.png)

<font style="color:black;">  
</font><font style="color:black;">不得不感慨，原生组件的能力也是很强的。</font>

## <font style="color:black;">CSS</font>
<font style="color:black;">接下来我们康康CSS的部分，源码如下：</font>

```css
:root {
  --error-color: red;
}
.form > input {
  margin-bottom: 10px;
}
.form > .f-tips {
  color: var(--error-color);
  display: none;
}
input[type="text"]:invalid ~ input[type="submit"],
input[type="password"]:invalid ~ input[type="submit"] {
  display: none;
}
input[required]:focus:invalid + span {
  display: inline;
}
input[required]:empty + span {
  display: none;
}
input[required]:invalid:not(:placeholder-shown) + span {
  display: inline;
}
```

<font style="color:black;">我们重点介绍以下几个</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">CSS</font><font style="color:black;"> </font><font style="color:black;">选择器：</font>

<font style="color:black;"></font>

### <font style="color:black;">:invalid 与 :valid</font>
<font style="color:black;">判断有效性的伪类选择器（</font><font style="color:rgb(30, 107, 184);">:valid</font><font style="color:black;">和</font><font style="color:rgb(30, 107, 184);">:invalid</font><font style="color:black;">）匹配有效或无效，</font><font style="color:rgb(30, 107, 184);"><input></font><font style="color:black;">或</font><font style="color:rgb(30, 107, 184);"><form></font><font style="color:black;">元素。</font>

<font style="color:rgb(30, 107, 184);">:valid</font><font style="color:black;">伪类选择器表示值通过验证的</font><font style="color:rgb(30, 107, 184);"><input></font><font style="color:black;">，这告诉用户他们的输入是有效的。</font>

<font style="color:rgb(30, 107, 184);">:invalid</font><font style="color:black;">伪类选择器表示值不通过通过验证的</font><font style="color:rgb(30, 107, 184);"><input></font><font style="color:black;">，这告诉用户他们的输入是无效的。</font>

<font style="color:black;">例子如下：</font>

```css
<style>
    input:valid {
        outline: 1px solid green;
    }

    input:invalid {
        outline: 1px solid red;
    }
</style>
输入文字：
<input type="text" pattern="[\w]+" required />
<br />
输入电话号码：
<input type="tel" pattern="[0-9]+" required />
```

<font style="color:black;">效果如下：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1666613628974-1f42db16-bda1-42ba-bdbf-7728d027cf37.gif)

<font style="color:black;">  
</font><font style="color:black;">兼容性如下：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613629117-237ef945-6b1a-4d66-8a43-853517118f04.png)

### <font style="color:black;">  
</font><font style="color:black;">:placeholder-shown</font>
<font style="color:rgb(30, 107, 184);">:placeholder-shown</font><font style="color:black;"> </font><font style="color:black;">伪类 在</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);"><input></font><font style="color:black;"> </font><font style="color:black;">或</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);"><textarea></font><font style="color:black;"> </font><font style="color:black;">元素显示 placeholder text 时生效。</font>

<font style="color:black;">例子如下：</font>

<font style="color:rgb(220, 220, 220);background-color:rgb(30, 30, 30);">  
</font>

<font style="color:black;">效果如下：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613629410-1fed6b29-b088-4641-b91b-731c5b578315.png)

<font style="color:black;">  
</font><font style="color:black;">兼容性如下：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1666613629520-34c5f76a-091e-43e4-ab42-aef061bf9f64.png)

## <font style="color:black;">  
</font><font style="color:black;">实现逻辑</font>
<font style="color:black;">有了上面的几个</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);"><input /></font><font style="color:black;"> </font><font style="color:black;">属性以及</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">css</font><font style="color:black;"> </font><font style="color:black;">选择器的伪类说明，那么这个纯CSS实现表单验证的功能就变得简单多了。</font>

<font style="color:black;">我们先来整理下功能要求：</font>

1. <font style="color:rgb(1, 1, 1);">初始化状态：不展示提交按钮以及错误提示</font>
2. <font style="color:rgb(1, 1, 1);">清空输入状态：不展示提交按钮以及错误提示</font>
3. <font style="color:rgb(1, 1, 1);">输入错误状态：输入框输入错误时，展示错误提示</font>
4. <font style="color:rgb(1, 1, 1);">输入正确状态：输入框输入正确时，隐藏错误提示，展示提交按钮</font>

### <font style="color:black;">初始化状态</font>
<font style="color:black;">首先我们知道，</font>**<font style="color:black;">初始化</font>**<font style="color:black;"> </font><font style="color:black;">时，是没有提示信息的，所以提示信息可以直接隐藏，至于提交按钮，我们就利用</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">:invalid</font><font style="color:black;"> </font><font style="color:black;">来隐藏，因为初始化的</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">input.value</font><font style="color:black;"> </font><font style="color:black;">内容是不匹配的。所以我们有：</font>

```jsx
<style>
  .form > .f-tips {
    color: var(--error-color);
    display: none;
  }
  input[type="text"]:invalid ~ input[type="submit"],
  input[type="password"]:invalid ~ input[type="submit"] {
    display: none;
  }
</style>
<input data-title="账号" placeholder="请输入正确的账号" pattern="\w{6,10}" name="account" type="text" required />
<input data-title="密码" placeholder="请输入正确的密码" pattern="\w{6,10}" name="password" type="password" required />
<span class="f-tips">请输入正确的密码</span>
```

<font style="color:rgb(220, 220, 220);background-color:rgb(30, 30, 30);">  
</font>

### <font style="color:black;">清空输入状态</font>
**<font style="color:black;">清空输入状态</font>**<font style="color:black;"> </font><font style="color:black;">也比较简单，可以直接用伪类选择器</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">:empty</font><font style="color:black;"> </font><font style="color:black;">来判断，只要内容为空，则隐藏错误信息，所以我们有：</font>

```css
input[required]:empty + span {
    display: none;
}
```

### <font style="color:black;">输入错误状态</font>
<font style="color:black;">在 </font>**<font style="color:black;">初始化</font>**<font style="color:black;"> 时已经隐藏了错误信息，而 </font>**<font style="color:black;">初始化</font>**<font style="color:black;"> 其实也是依赖于 </font>**<font style="color:black;">输入错误</font>**<font style="color:black;"> 这个状态，不过好在我们有伪类选择器 </font><font style="color:rgb(30, 107, 184);">:focus</font><font style="color:black;"> ，它表示获得焦点的元素（如表单输入），所以我们有：</font>

```css
input[required]:focus:invalid + span {
    display: inline;
}
```

<font style="color:black;">虽然我们不能通过</font><font style="color:black;"> </font>**<font style="color:black;">输入错误</font>**<font style="color:black;"> </font><font style="color:black;">这个状态来处理，但是我们可以监听用户聚焦的行为来实现。</font>

<font style="color:black;">但是这么做有个弊端，就是当我在另外一个输入框输入信息的时候，错误提示也会消失，所以我们还需要判断是否有</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">placeholder</font><font style="color:black;">，输入了</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">value</font><font style="color:black;"> </font><font style="color:black;">，自然没有</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">placeholder</font><font style="color:black;"> </font><font style="color:black;">，所以我们有：</font>

```css
input[required]:invalid:not(:placeholder-shown) + span {
  display: inline;
}
```

<font style="color:rgb(220, 220, 220);background-color:rgb(30, 30, 30);">  
</font>

### <font style="color:black;">输入正确状态</font>
<font style="color:black;">当完成上述三个状态的实现之后，</font><font style="color:black;"> </font>**<font style="color:black;">输入正确</font>**<font style="color:black;"> </font><font style="color:black;">的状态就可以不用编写了，因为不匹配错误的，就是匹配正确。</font>

## <font style="color:black;">总结</font>
<font style="color:black;">一个完整的</font><font style="color:black;"> </font>**<font style="color:black;">纯CSS表单功能</font>**<font style="color:black;"> </font><font style="color:black;">就这么完成了，DEMO地址在这：</font>

<font style="color:black;">https://codepen.io/krischan77/pen/WmVKYr</font>

<font style="color:black;">也可以点击 『阅读原文』 来查看</font>

<font style="color:black;">由于实际项目的复杂度，这个功能不一定直接用起来，但是里面的知识点，思路我们都是可以复用的。</font>

<font style="color:black;">不得不感慨，如今</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">html</font><font style="color:black;"> </font><font style="color:black;">跟</font><font style="color:black;"> </font><font style="color:rgb(30, 107, 184);">css</font><font style="color:black;"> </font><font style="color:black;">的能力变得强大了起来，只要我们愿意散发思维，一定能编写出更多有意思，有价值的效果。</font>

<font style="color:black;">欢迎大家多方尝试！</font>

## <font style="color:black;">参考资料</font>
1. <font style="color:rgb(1, 1, 1);">whatwg 4.10.5 The</font><font style="color:rgb(1, 1, 1);"> </font><font style="color:rgb(1, 1, 1);">input</font><font style="color:rgb(1, 1, 1);"> </font><font style="color:rgb(1, 1, 1);">element</font>
2. <font style="color:rgb(1, 1, 1);">纯CSS实现表单验证</font>
3. <font style="color:rgb(1, 1, 1);">『真香警告』这33个超级好用的CSS选择器，你可能见都没见过。</font>
4. <font style="color:rgb(1, 1, 1);">CSS 选择器</font>

