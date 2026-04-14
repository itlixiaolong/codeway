# CSS 3D 环绕效果

一个经典的 CSS 3D 旋转木马效果：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>3D播放器</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        ul {
            width: 200px;
            height: 200px;
            position: absolute;
            top: 400px;
            left: 20%;
            margin-left: -100px;
            transform-style: preserve-3d;
            transform: rotateX(0deg) rotateY(0deg);
            animation: play 6s linear 0s infinite normal;
        }
        
        ul li {
            list-style: none;
            width: 200px;
            height: 200px;
            line-height: 200px;
            font-size: 60px;
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
        }
        
        ul li img {
            width: 200px;
            height: 200px;
            border: 5px solid skyblue;
            box-sizing: border-box;
        }
        
        ul:hover {
            animation-play-state: paused;
        }
        
        ul:hover li img {
            opacity: 0.7;
        }
        
        ul li:nth-child(1) {
            transform: rotateY(60deg) translateZ(200px);
        }
        
        ul li:nth-child(2) {
            transform: rotateY(120deg) translateZ(200px);
        }
        
        ul li:nth-child(3) {
            transform: rotateY(180deg) translateZ(200px);
        }
        
        ul li:nth-child(4) {
            transform: rotateY(240deg) translateZ(200px);
        }
        
        ul li:nth-child(5) {
            transform: rotateY(300deg) translateZ(200px);
        }
        
        ul li:nth-child(6) {
            transform: rotateY(360deg) translateZ(200px);
        }
        
        @keyframes play {
            from {
                transform: rotateX(-12deg) rotateY(0deg);
            }
            to {
                transform: rotateX(-12deg) rotateY(360deg);
            }
        }
    </style>
</head>
<body>
    <ul>
        <li><img src="images/y1.jpeg"></li>
        <li><img src="images/y2.jpg"></li>
        <li><img src="images/y3.jpeg"></li>
        <li><img src="images/y4.png"></li>
        <li><img src="images/y5.jpg"></li>
        <li><img src="images/y6.jpg"></li>
    </ul>
</body>
</html>
```

## 核心知识点

1. **transform-style: preserve-3d** - 开启 3D 空间
2. **translateZ** - 将元素沿 Z 轴移动，形成立体感
3. **rotateY** - 沿 Y 轴旋转，每 60 度一个面
4. **@keyframes** - 创建旋转动画
5. **animation-play-state: paused** - 悬停时暂停动画
