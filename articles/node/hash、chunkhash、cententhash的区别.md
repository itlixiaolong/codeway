

<!-- 这是一张图片，ocr 内容为：WEBPACK:HASH,CHUNKHASH,CONTENTHASH三者区别 一,HASH(所有文件哈希值相同,只要改变内容跟之前的不一致,所有哈希值都改变,没有 做到缓存意义) HASH是最整个项目的构起相关,构造生成的文件HASH值都是一样的,所以HASH计育是感整个项目的构建相关,同一次构建过程中生成的HASH都 是一样的,只要项目里有文件更改,整个项目构建的HASH值都会更改. 如果出口是HASH,那么一旦针对项目中任何一个文件的修改,都会构建整个项目,重新获取HASH值,缓存的目的将失效8 二,CHUNKHASH(同一个模块,就算将IS和CSS分离,其哈希值也是相同的,修改一处,JS 和CSS哈希值都会变,同HASH,没有做到缓存意义) 七根器不同的入口文件(ENTT)进行依赖文件解析,构建对应的CHUNK,生成对应的HASH值.我们在生产环筑里也一些公共库和程序入口文件区分 开,单拖打包构脑,接着我们采用CHUNKNASH的方式生成DASH值,那么只要我们不改动公共库的代码,就可以保证其HASH值不会要影明. 由于采用CHUNKHASH,所以项目主入口文件MAINJS及其对应的依赖文件MAINCSS由于被打包在同一个模块,所以共用相同的CHASH. 这样就会有个向题,只要对应CSS或则IS改变,与其关联的文件HASH值也会改变,但其内容并没有改变,所以没有达到缓存意义. (只要文件内容不一样,产生的哈希值就不一样) 三,CONTENTHASH( CONTENTHASH表示由文件内容产生的HASH值,内容不同产生的OONTENTENTHASH值也不一样.在项目中. CSS文件来加以引用. 所以CSS文件最好使用CONTENTHASH. -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1669266925997-df607688-59bc-41b8-bc40-045862688545.png)

<font style="color:rgb(64, 64, 64);">原文链接：https://blog.csdn.net/u014628388/article/details/82389328
在webpack中有时需要使用hash来做静态资源实现增量更新方案之一，文件名的hash值可以有三种hash生成方式，每一种都有不同应用场景，那么三者有何区别呢？</font>

**<font style="color:rgb(64, 64, 64);">hash、chunkhash、contenthash</font>**

<font style="color:rgb(64, 64, 64);">hash一般是结合CDN缓存来使用，通过webpack构建之后，生成对应文件名自动带上对应的MD5值。如果文件内容发生改变的话，那么对应文件hash值也会改变，对应的HTML引用的URL地址也会改变，触发CDN服务器从原服务器上拉取对应数据，进而更新本地缓存。但是实际使用时，这三种hash计算还是有一定区别。</font>

**<font style="color:rgb(64, 64, 64);">hash</font>**

<font style="color:rgb(64, 64, 64);">hash是跟整个项目的构建相关，构建生成的文件hash值都是一样的，所以hash计算是跟整个项目的构建相关，同一次构建过程中生成的hash都是一样的，只要项目里有文件更改，整个项目构建的hash值都会更改。
如果出口是hash，那么一旦针对项目中任何一个文件的修改，都会构建整个项目，重新获取hash值，缓存的目的将失效。</font>

**<font style="color:rgb(64, 64, 64);">chunkhash</font>**

<font style="color:rgb(64, 64, 64);">采用hash计算的话，每一次构建后生成的hash值都不一样，即使文件内容压根没有改变。这样子是没办法实现缓存效果，我们需要另一种hash值计算方法，即chunkhash。
chunkhash和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的hash值。我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成hash值，那么只要我们不改动公共库的代码，就可以保证其hash值不会受影响。
由于采用chunkhash，所以项目主入口文件main.js及其对应的依赖文件main.css由于被打包在同一个模块，所以共用相同的chunkhash，但是公共库由于是不同的模块，所以有单独的chunkhash。这样子就保证了在线上构建时只要文件内容没有更改就不会重复构建。</font>

```javascript
entry:{
  main: path.join(__dirname,'./main.js'),
    vendor: ['vue']
},
output:{
  path:path.join(__dirname,'./dist'),
    publicPath:'/dist/',
    filname:'bundle.[chunkhash].js'
}
```



<font style="color:rgb(64, 64, 64);">最后main与vendor的打包结果图：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/webp/12531001/1669266762485-f17d5d75-e3a5-4a0d-97be-2f82148da21e.webp)

**<font style="color:rgb(64, 64, 64);">contenthash</font>**

<font style="color:rgb(64, 64, 64);">contenthash表示由文件内容产生的hash值，内容不同产生的contenthash值也不一样。在项目中，通常做法是把项目中css都抽离出对应的css文件来加以引用。
在这里我用mini-css-extract-plugin替代了extract-text-webpack-plugin。</font>

```javascript
const miniCssExtractPlugin=require("mini-css-extract-plugin");

module.exports={
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          miniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins:[
    newminiExtractPlugin({
      filename:'main.[contenthash:7].css'
    })
    }
}
```



<font style="color:rgb(64, 64, 64);">打包结果如图：</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2022/webp/12531001/1669266762480-c58dfb26-785c-4d90-901d-65bd0ccf788f.webp)

<font style="color:rgb(64, 64, 64);">打包后即使css文件所处的模块里就算其他文件内容改变，只要css文件内容不变，那么就不会重复构建。
附加：
如果对css使用了chunkhash之后，它与依赖它的chunk共用chunkhash，测试后会发现，css与js文件名的chunkhash值是一样的，如果我修改了js文件，js的hash值会变化，css的文件名的hash还是和变化后的js文件的hash值一样，如果我修改了css文件，也会导致重新构建，css的hash值和js的hash值还是一样的，即使js文件没有被修改。这样会导致缓存作用失效，所以css文件最好使用contenthash</font>

