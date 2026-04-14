# JavaScript 骚操作技巧

## 1. 最简单的单行评级组件

```js
"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate); 
```

定义一个变量 rate 是 1 到 5 的值，然后执行上面代码。

## 2. JS 错误处理的方式的正确姿势

```js
try {
    // something
} catch (e) {
    window.location.href =
        "http://stackoverflow.com/search?q=[js]+" + e.message;
} 
```

## 3. 从一行代码里面学点 JavaScript

```js
[].forEach.call($$("*"),function(a){
    a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)
})
```

## 4. 史上最快清除缓存方法

```js
<a href="javascript:alert(清除成功);">清除缓存</a>
```

## 5. 在元素后插入一串 HTML

```js
const insertHTMLAfter = (html, el) => el.insertAdjacentHTML('afterend', html)
```

## 6. 打乱数组

```js
const shuffle = arr => arr.sort(() => 0.5 - Math.random())
```

## 7. 在网页上获取选定的文本

```js
const getSelectedText = () => window.getSelection().toString()
```

## 8. 获取一个随机布尔值

```js
const getRandomBoolean = () => Math.random() >= 0.5
```

## 9. 计算数组的平均值

```js 
const average = (arr) => arr.reduce((a, b) => a + b) / arr.length
```
