<font style="color:rgb(87, 107, 149);">iCSS前端趣闻 </font> _2022-06-29 21:47_ _发表于广东_

[前端侦探.致力于有趣的前端探索~](https://mp.weixin.qq.com/s?__biz=Mzg2MDU4MzU3Nw==&mid=2247492021&idx=1&sn=120c4baa4e94439bd89e7c6ffaa192f8&chksm=ce268243f9510b552a7c5edf0dd00ecd214642722b9f3cdb611f6828d0397be98a9181b5b0be&mpshare=1&scene=24&srcid=0630esppaW17x1zFDBgSuZhI&sharer_sharetime=1656550218494&sharer_shareid=a1e939cec3a02a5f66a190317d852363&key=49370012c14a131ba1742c251a8b0597f6cab824f1d7281b99f43b87216cc6566ea39e4b58d974cbe3bd34428964770f34adb7e058402ea0c65c68d796f7c2ed890a76951e971766278aa1e18bdfe76cc012701e874fda1a874b0882747bd11213dcdadcb89bee9b23b91e6b29bb28e7f7508791c28debaf5be21974a1f2af43&ascene=14&uin=MjkwMDAyMjAwMQ%3D%3D&devicetype=iMac+MacBookPro15%2C1+OSX+OSX+12.4+build(21F79)&version=13040110&nettype=WIFI&lang=zh_CN&fontScale=100&exportkey=n_ChQIAhIQ5b%2FnV%2FcQ7y58Xm4oQjX7PBL6AQIE97dBBAEAAAAAAJbcMSWj1%2FkAAAAOpnltbLcz9gKNyK89dVj0xKCK%2FDQzZ1ZNZu2ge8MdfYI%2Fv20vJN43GanLheswrd7WpCzpbzcHZ0Wb1u2FmenG2o6RnvfbTTfs5SCA1%2Flg2M6UrrsJ22Z1ia30FgQMer%2Bq2%2Bv7%2FWkKeRDri%2FuCf%2B5f163F%2F0W6gCCFrMa%2BfSZmQ%2Bgfwd1ngYPzmw5%2BVOUaXlhcQktzEb0DL6S07EtLLCdARv3B4HiEG58LcK0c4WngvsQd25fsvLCGf4oDVK79MEE%2BUQ99ILO0hryl0lFbVGcsSJqKHb8oQNMaRtbhTlPsUA7Ejzw%3D&acctmode=0&pass_ticket=FCII5EHrcbQIL48bLl1yov5%2Fb7rkwAM6%2FLptDDIznXob427s8SpMzXnG9R52zGtnQwazT2OYQIJiv1PnT1V0CA%3D%3D&wx_header=0&fontgear=2.000000#)

<font style="color:rgba(0, 0, 0, 0.3);">以下文章来源于前端侦探</font><font style="color:rgba(0, 0, 0, 0.3);"> </font><font style="color:rgba(0, 0, 0, 0.3);">，作者XboxYan</font>

<font style="color:black;">在网页中，经常会用阴影来突出层级关系，特别是顶部导航，但有时候设计觉得没必要一开始就显示阴影，只有滚动后才出现。比如下面这个例子，注意观察头部阴影</font>

<font style="color:black;">可以看到，只有滚动以后才出现阴影。一般情况下，使用 JS 监听滚动事件动态添加类名就可以实现，不过经过我的一番尝试，发现这种效果仅仅使用 CSS 也能轻易实现，下面是实现效果</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1671007821206-ef3c424b-9ce7-462d-b0bb-5207a1ebadc0.gif)

<font style="color:rgb(136, 136, 136);">实现效果</font>

<font style="color:black;">你也可以提前访问</font><font style="color:black;"> </font>**<font style="color:rgb(119, 48, 152);">CSS auto header shadow(juejin.cn)</font>****<font style="color:rgb(119, 48, 152);">[1]</font>**<font style="color:black;">查看实际效果。那 如何实现的呢，花两分钟时间看看吧~</font>

## <font style="color:rgb(119, 48, 152);">一、头部固定定位</font>
<font style="color:black;">假设有这样一个布局</font>

```html
<header>LOGO</header>
<main>很多内容文本</main>
```

<font style="color:black;">简单修饰一下</font>

<font style="color:black;">头部固定定位有很多种方式，比较常见的是使用</font><font style="color:black;"> </font><font style="color:rgb(150, 84, 181);">fixed</font><font style="color:black;">定位</font>

<font style="color:black;">但是，</font><font style="color:rgb(150, 84, 181);">fixed</font><font style="color:black;">定位是不占空间的，会导致遮挡内容区域，所以一般还需要预留头部一部分空间出来，比如这样</font>

<font style="color:black;">在这里，我更推荐使用</font><font style="color:rgb(150, 84, 181);">sticky</font><font style="color:black;">定位，</font>**<font style="color:rgb(119, 48, 152);">在吸顶的同时，还能保留原有的占位</font>**

<font style="color:black;">效果如下，只是没有阴影</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1671007821241-52f24ad6-ab94-45fe-b366-a39d4ad142fc.gif)

<font style="color:rgb(136, 136, 136);">头部固定定位</font>

## <font style="color:rgb(119, 48, 152);">二、CSS 实现原理</font>
<font style="color:black;">实现这个效果，需要一点点“CSS 障眼法”。假设有一层阴影，在默认情况下用一个元素遮挡起来，以下都称之为“遮挡物”。这里需要考虑好各个部分的层级关系，稍微有些复杂，如下所示（侧面层级关系图）</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/jpeg/12531001/1671007821179-3cf5a92e-2405-4f68-b5e7-618a4f388b61.jpeg)

<font style="color:rgb(136, 136, 136);">层级关系</font>

<font style="color:black;background-color:rgb(251, 249, 253);">层级关系为：头部 > 遮挡物 > 阴影 > 内容</font>

<font style="color:black;">在滚动过程中，阴影就自动就可见了，遮挡物正好又会被头部遮住，注意，</font><font style="color:rgb(122, 79, 214);">遮挡物和内容是一起滚动的</font><font style="color:black;">，动态演示如下</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1671007821233-8ede3af1-13fc-4e3f-8738-31aa522af201.gif)

<font style="color:rgb(136, 136, 136);">层级关系滚动原理</font>

<font style="color:black;">原理就是这样，下面看具体实现</font>

[async面试题](https://www.yuque.com/itlixiaolong/yuvtgk/uool3402gg6c3253)

## <font style="color:rgb(119, 48, 152);">三、CSS 具体实现</font>
<font style="color:black;">根据以上原理，这里需要添加一个元素，阴影和遮挡物都可以用伪元素生成</font>

<font style="color:black;">这里阴影的位置是固定的，也不需要占据空间，所以可以直接用</font><font style="color:rgb(150, 84, 181);">fixed</font><font style="color:black;">定位，也可以不设置</font><font style="color:rgb(150, 84, 181);">top</font><font style="color:black;">值，因为默认就位于非定位时的位置（又体现出</font><font style="color:black;"> </font><font style="color:rgb(150, 84, 181);">sticky</font><font style="color:black;"> </font><font style="color:black;">的好处了），也就是头部下面</font>

<font style="color:rgb(150, 84, 181);background-color:rgb(251, 249, 253);">fixed</font><font style="color:black;background-color:rgb(251, 249, 253);"> </font><font style="color:black;background-color:rgb(251, 249, 253);">定位在不设置 top 或者 left 值时，仍然位于原先位置，但是会在这个位置固定下来</font>

<font style="color:black;">遮挡物可以用纯色填充，</font>**<font style="color:rgb(119, 48, 152);">而且需要跟随内容滚动，也不需要占据空间，同时也为了提升层级</font>**<font style="color:black;">，可以设置一个</font><font style="color:rgb(150, 84, 181);">absolute</font><font style="color:black;">定位</font>

<font style="color:rgb(150, 84, 181);background-color:rgb(251, 249, 253);">absolute</font><font style="color:black;background-color:rgb(251, 249, 253);">定位在不设置 top 或者 left 值时，仍然位于原先位置，也会跟随内容滚动</font>

<font style="color:black;">现在再来看看层级关系，</font>**<font style="color:rgb(119, 48, 152);">头部、阴影、遮挡物都设置了定位</font>**<font style="color:black;">，根据 dom 先后顺序，此时</font>

<font style="color:black;background-color:rgb(251, 249, 253);">层级关系为：遮挡物 > 阴影 >  头部 > 内容</font>

<font style="color:black;">头部应该是最高的，所以需要单独改变一下层级</font>

<font style="color:black;background-color:rgb(251, 249, 253);">层级关系为：头部 > 遮挡物 > 阴影  > 内容</font>

<font style="color:black;">这样就实现了文章开头所示效果，效果如下</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1671007821425-c0b1b126-a9df-4659-888e-d0d8278061ef.gif)

<font style="color:rgb(136, 136, 136);">实际效果</font>

## <font style="color:rgb(119, 48, 152);">三、更柔和的阴影</font>
<font style="color:black;">其实上面的效果已经很好了，但是稍微有点生硬。仔细观察，在慢慢滚动过程中，阴影有一种“向上推进”的感觉，如下</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1671007821551-5619ada9-b552-42b4-b048-e04c3c78fab3.gif)

<font style="color:rgb(136, 136, 136);">略微生硬的效果</font>

<font style="color:black;">有没有办法让这个过程更柔和一点呢？比如透明度的变化？</font>

<font style="color:black;">当然也是可以的，实现也比较简单。上面比较生硬的原因是，遮挡物是纯色的，如果换成</font>**<font style="color:rgb(119, 48, 152);">半透明渐变</font>**<font style="color:black;">是不是就好一些呢？</font>

<font style="color:black;">效果如下</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/gif/12531001/1671007821674-ecb820f4-da28-4e81-9ce7-bf692e197fa1.gif)

<font style="color:rgb(136, 136, 136);">比较柔和的效果</font>

<font style="color:rgb(136, 136, 136);"></font>

<font style="color:rgb(136, 136, 136);"></font>

```css
header{
  position: sticky;
  background: #fff;
  top: 0;
  font-size: 20px;
  padding: 10px;
  z-index: 1;
}
.shadow::before{
  content: '';
  box-shadow: 0 0 10px 1px #333;
  position: fixed;
  width: 100%;
}
.shadow::after{
  content: '';
  width: 100%;
  height: 30px;
  background: linear-gradient(to bottom, #fff 50% , transparent);
  position: absolute;
}


<header>LOGO</header>
<div class="shadow"></shadow>
<main>很多内容文本</main>
```

<font style="color:black;">这样阴影出现的效果就不再是“向上推进”的效果，你觉得怎么样呢？</font>

**<font style="color:rgb(122, 79, 214);">重点来了~</font>**<font style="color:black;"> 下面是完整 CSS 代码（20行不到~）</font>

<font style="color:black;">HTML 结构也很简单</font>

<font style="color:black;">你可以访问在线链接</font>**<font style="color:rgb(119, 48, 152);">CSS auto header shadow(codepen.io)</font>****<font style="color:rgb(119, 48, 152);">[2]</font>**<font style="color:black;"> </font><font style="color:black;">或者</font><font style="color:black;"> </font>**<font style="color:rgb(119, 48, 152);">CSS auto header shadow(juejin.cn)</font>****<font style="color:rgb(119, 48, 152);">[3]</font>**

## <font style="color:rgb(119, 48, 152);">四、总结和展望</font>
<font style="color:black;">以上就是全部分享内容了，是不是又掌握一个 CSS 小技巧？用到了3个定位属性，几乎零成本，复制几行代码，马上就可以用起来了，下面总结一下实现要点：</font>

1. **<font style="color:rgb(1, 1, 1);">固定头部的布局推荐用</font>****<font style="color:rgb(1, 1, 1);"> </font>****<font style="color:rgb(150, 84, 181);">sticky</font>****<font style="color:rgb(1, 1, 1);"> </font>****<font style="color:rgb(1, 1, 1);">实现，好处是可以保留头部占位，无需额外预留</font>**
2. **<font style="color:rgb(1, 1, 1);">整体实现思路是CSS 障眼法和 CSS 层级，相互遮挡</font>**
3. **<font style="color:rgb(150, 84, 181);">fixed</font>****<font style="color:rgb(1, 1, 1);"> </font>****<font style="color:rgb(1, 1, 1);">定位在不设置 top 或者 left 值时，仍然位于原先位置，但是会在这个位置固定下来</font>**
4. **<font style="color:rgb(150, 84, 181);">absolute</font>****<font style="color:rgb(1, 1, 1);">定位在不设置 top 或者 left 值时，仍然位于原先位置，也会跟随内容滚动</font>**
5. **<font style="color:rgb(1, 1, 1);">纯色遮挡在滚动时有些生硬，半透明渐变遮挡在滚动时会更加柔和</font>**

<font style="color:black;">在未来，像这类滚动相关的交互都可以通过</font><font style="color:rgb(150, 84, 181);">@scroll-timeline</font><font style="color:black;">来实现，有兴趣的可以提前了解这方面内容，只是现在几乎不可实际生产使用（目前需要手动开启实验特性），可以预料，随着 CSS 新特性的不断发展，像这类“CSS 奇技淫巧”肯定会被官方逐步替代，体验也会更加完善，但是，并不是说这些思考是无用了，实际需求千千万，官方不可能一一照顾到，就算有规划，有草案，可能已经是多年以后了，所以学习 CSS 一定不要停止思考，停止想象，这大概也是 CSS 比较有趣的地方吧~最后，如果觉得还不错，对你有帮助的话，欢迎点赞、收藏、转发</font><font style="color:black;">❤❤❤</font>

### <font style="color:rgb(119, 48, 152);">参考资料</font>
<font style="color:rgb(89, 89, 89);">[1]</font><font style="color:rgb(89, 89, 89);">[2]</font><font style="color:rgb(89, 89, 89);">[3]</font>

**<font style="color:black;">CSS auto header shadow(juejin.cn):</font>**<font style="color:black;"> </font>_<font style="color:black;">https://code.juejin.cn/pen/7110857388135022606</font>_

**<font style="color:black;">CSS auto header shadow(codepen.io):</font>**<font style="color:black;"> </font>_<font style="color:black;">https://codepen.io/xboxyan/pen/yLvdgXw</font>_

**<font style="color:black;">CSS auto header shadow(juejin.cn):</font>**<font style="color:black;"> </font>_<font style="color:black;">https://code.juejin.cn/pen/7110857388135022606</font>_

  


