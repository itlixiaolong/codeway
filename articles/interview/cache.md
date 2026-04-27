### http缓存策略

#### 1.强缓存（http状态码为200）

http中用来判断是否命中强缓存的字段为Expires和Cache-Control，Cache-Control优先级高于Expires。

*   expires的值是一个绝对时间，可以看到上图中的时间点：2019年5月30号08:04:42，这代表：这个资源在这个时间点之前都可以直接从缓存中获取。

*   cache-control常见字段的含义：

> public

> > 表明响应可以被任何对象（包括：发送请求的客户端，CDN等代理服务器，等等）缓存，即使是通常不可缓存的内容（例如，该响应没有max-age指令或Expires消息头）。

> private
>
> > 表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）。私有缓存可以缓存响应内容。

> no-cache
>
> > 可以在本地进行缓存，但每次发请求时，都要向服务器进行验证，如果服务器允许，才能使用本地缓存（即：需要协商缓存）。

> no-store
>
> > 禁止缓存客户端请求或服务器响应的内容，每次都须重新请求服务器拿内容

> max-age
>
> > 设置缓存存储的最大周期，超过这个时间缓存被视为过期 (单位\*\*：秒)，这是一个相对时间（单位：秒）如max-age=7200，这里代表资源的缓存在这个请求之后的2小时内都有效。

#### 2.协商缓存（http状态码为200或者304）

*   Last-Modified / If-Modified-Since
*   Etag / If-None-Match

**注意：Etag的优先级是高于 Last-Modified 的**

##### 关于Last-Modified / If-Modified-Since

> 当浏览器第一次访问一个资源的时候，服务器会在response header中返回一个Last-Modified，代表这个资源最后的修改时间，当浏览器再次访问这个资源的时候，会在request header中带上 If-Modified-Since，值为上次请求时服务器返回的 Last-Modified 的值，然后服务器根据资源上次修改的时间确认资源在这段期间内是否更改过，如果没有，则返回==304==，如果有，则返回==200==并返回最新的资源

##### 关于Etag / If-None-Match

> Etag / If-None-Match 与 Last-Modified / If-Modified-Since的机制类似，不同的是，Etag是通过一个校验码来对比资源是否更改过的，而不是通过资源的修改时间。当一个资源修改时，其校验码也会更改。当浏览器请求资源时，服务器会返回一个Etag字段，然后浏览器下一次请求时，会带上 If-None-Match ，值为上次服务器返回的Etag的值，服务器经过校验码的对比后决定返回==200或304==。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200729153225959.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpeGlhb2xvbmcyNDAwMzU=,size_16,color_FFFFFF,t_70)
