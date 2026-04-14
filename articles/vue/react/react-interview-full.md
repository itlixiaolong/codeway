---
title: React 常见面试题汇总
date: 2024-01-01
---

# React面试题

#### [传送门](https://juejin.cn/post/7194760495956492344)
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2023/webp/12531001/1675845811625-faea6776-a53b-4500-b909-e7f9af070a1f.webp)

# React

## 如何创建一个react的项目（使用脚手架）
- 安装cr脚手架：npm install -g create-react-app
- 进入文件夹：create-react-app 项目名称
- 进入项目：cd 项目名称
- 运行项目：npm start

## 如何不使用脚手架创建一个项目
之前面试官问过是否有不使用脚手架创建项目的经历。

详细可以查看[这篇文章](https://juejin.cn/post/7071169689216352263)

我理解这个问题说出来大概就可以，比如：

1. yarn init 初始化package.json文件
2. 安装react和react-dom
3. 配置webpack
    - 配置babel支持ES6
    - 配置@babel/preset-react支持react
    - 支持ts：ts-loader @types/react @types/react-dom
    - 支持antd
    - 支持less：less-loader，css-loader，style-loader
    - 配置plugins，常用的有html-webpack-plugin（当使用 webpack 打包时，创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中。）和 clean-webpack-plugin（是一个清除文件的插件。 在每次打包后，磁盘空间会存有打包后的资源，在再次打包的时候，我们需要先把本地已有的打包后的资源清空，来减少它们对磁盘空间的占用。 插件clean-webpack-plugin就可以帮我们做这个事情）
4. 安装router
5. 安装redux

## 对于React 框架的理解（React的特性有哪些）
React是一个用于构建用户界面的 JavaScript 库，只提供了 UI 层面的解决方案。

它有以下特性：

- 组件化：将界面成了各个独立的小块，每一个块就是组件，这些组件之间可以组合、嵌套，构成整体页面，提高代码的复用率和开发效率。
- 数据驱动视图：
    - React通过setState实现数据驱动视图，通过setState来引发一次组件的更新过程从而实现页面的重新渲染。
    - 数据驱动视图是我们只需要关注数据的变化，不用再去操作dom。同时也提升了性能。
- JSX 语法：用于声明组件结构，是一个 JavaScript 的语法扩展。
- 单向数据绑定：从高阶组件到低阶组件的单向数据流，单向响应的数据流会比双向绑定的更安全，速度更快
- 虚拟 DOM：使用虚拟 DOM 来有效地操作 DOM
- 声明式编程：如实现一个标记的地图： 通过命令式创建地图、创建标记、以及在地图上添加的标记的步骤如下：```js // 创建地图 const map = new Map.map(document.getElementById("map"), {   zoom: 4,   center: { lat, lng }, }); // 创建标记 const marker = new Map.marker({   position: { lat, lng },   title: "Hello Marker", }); // 地图上添加标记 marker.setMap(map); 复制代码``` 而用 React 实现上述功能则如下：```jsx <Map zoom={4} center={(lat, lng)}>   <Marker position={(lat, lng)} title={"Hello Marker"} /> </Map> 复制代码``` 声明式编程方式使得 React 组件很容易使用，最终的代码简单易于维护

## jsx语法是必须的吗
以下是经过babel转译之后的jsx：

_注：React.createElement(标签名，属性对象，子元素)_

所以不使用jsx语法也可以使用React：

两者均可正常显示，但是两者的优劣显而易见，使用createElement方法会使代码更加的冗余，而jsx更加简洁。

## 为什么提出jsx
JSX是JS的语法扩展，主要用于声明元素，可以理解为React.createElement()的语法糖，React并不强制使用JSX，即使使用了JSX最后也会被babel编译成createElement。

React认为视图和逻辑内在耦合，比如，在 UI 中需要绑定处理事件、在某些时刻状态发生变化时需要通知到 UI，以及需要在 UI 中展示准备好的数据。

React并没有采用将视图与逻辑进行分离到不同文件这种人为地分离方式，而是通过将二者共同存放在称之为"组件"的松散耦合单元之中，来实现关注点分离。 为了实现其组件化的目的，而不引入更多的概念（比如Vue引入了模板语法，这就是新的概念，学习成本会比较高），使用人们熟悉的js语法的扩展更加适用。

并且相比于createElement，JSX更加的简洁。

_关注点分离是日常生活和生产中广泛使用的解决复杂问题的一种系统思维方法。大体思路是,先将复杂问题做合理的分解,再分别仔细研究问题的不同侧面(关注点)，最后综合各方面的结果，合成整体的解决方案。_

## Babel 插件是如何实现 JSX 到 JS 的编译 ？
需要的依赖：

- @babel/cli
- @babel/core
- @babel/preset-react

babel.rc文件添加配置：

Babel 读取代码并解析，生成 AST，再将 AST 传入插件层进行转换，在转换时就可以将 JSX 的结构转换为 React.createElement 的函数。

React.createElement源码：

createElement并没有十分复杂的操作，整个过程看起来更像是一个格式化的过程：将我们输入的相对简单清晰的结构转化为ReactElement函数需要的格式。

ReactElement函数源码：

ReactElement 其实只做了一件事情，那就是"创建"，说得更精确一点，是"组装"：ReactElement 把传入的参数按照一定的规范，"组装"进了 element 对象里，并把它返回给了 React.createElement，最终 React.createElement 又把它交回到了开发者手中。

ReactElement返回的element 其实就是虚拟DOM中的一个节点：一个JS对象，这个对象包含了对真实节点的描述。

## 对于React虚拟DOM的理解
- js对象，保存在内存中
- 是对真实DOM结构的映射

虚拟 DOM 的工作流程：

**挂载阶段**：React 将结合 JSX 的描述，构建出虚拟 DOM 树，然后通过 ReactDOM.render 实现虚拟 DOM 到真实 DOM 的映射（触发渲染流水线）；

**更新阶段**：页面的变化先作用于虚拟 DOM，虚拟 DOM 将在 JS 层借助算法先对比出具体有哪些真实 DOM 需要被改变，然后再将这些改变作用于真实 DOM。

虚拟 DOM 解决的关键问题有以下三个：

- **减少 DOM 操作**：虚拟 DOM 可以将多次 DOM 操作合并为一次操作
- **研发体验/研发效率的问题**：虚拟 DOM 的出现，为数据驱动视图这一思想提供了高度可用的载体，使得前端开发能够基于函数式 UI 的编程方式实现高效的声明式编程。
- **跨平台的问题**：虚拟 DOM 是对真实渲染内容的一层抽象。同一套虚拟 DOM，可以对接不同平台的渲染逻辑，从而实现"一次编码，多端运行"

既然是虚拟 DOM，那就意味着它和渲染到页面上的真实 DOM 之间还有一定的距离，这个距离通过 ReactDOM.render 方法填充：

## VDOM 和 DOM 的区别
- 真实DOM存在重排和重绘，虚拟DOM不存在；
- 虚拟 DOM 的总损耗是"虚拟 DOM 增删改+真实 DOM  **差异** 增删改+排版与重绘（可能比直接操作真实DOM要少）"，真实 DOM 的总损耗是"真实 DOM 完全增删改+排版与重绘"

传统的原生 api 或 jQuery 去操作 DOM 时，浏览器会从构建 DOM 树开始从头到尾执行一遍流程。

当你在一次操作时，需要更新 10 个 DOM 节点，浏览器没这么智能，收到第一个更新 DOM 请求后，并不知道后续还有 9 次更新操作，因此会马上执行流程，最终执行 10 次流程。

而通过 VNode，同样更新 10 个 DOM 节点，虚拟 DOM 不会立即操作 DOM，而是将这 10 次更新的 diff 内容保存到本地的一个 js 对象中，最终将这个 js 对象一次性 attach 到 DOM 树上，避免大量的无谓计算。

## VDOM 和 DOM 优缺点
真实 DOM 的优势：

- 易用

真实 DOM 的缺点：

- 效率低，解析速度慢，内存占用量过高
- 性能差：频繁操作真实 DOM，易于导致重绘与回流

虚拟 DOM 的优势：

- 简单方便：如果使用手动操作真实 DOM 来完成页面，繁琐又容易出错，在大规模应用下维护起来也很困难
- 性能方面：使用 Virtual DOM，能够有效避免真实 DOM 数频繁更新，减少多次引起重绘与回流，提高性能
- 跨平台：React 借助虚拟 DOM，带来了跨平台的能力，一套代码多端运行

虚拟 DOM 的缺点：

- 在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化，首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，速度比正常稍慢

## react 的生命周期
[react生命周期图解](https://link.juejin.cn/?target=https%3A%2F%2Fprojects.wojtekmaj.pl%2Freact-lifecycle-methods-diagram%2F)

### 挂载
当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()

#### getDerivedStateFromProps
该方法是新增的生命周期方法，是一个静态的方法，因此**不能访问到组件的实例**。

执行时机：组件创建和更新阶段，不论是props变化还是state变化，都会调用。

**在每次render方法前调用**，第一个参数为即将更新的props，第二个参数为上一个状态的state，可以比较props 和 state来加一些限制条件，防止无用的state更新

该方法**需要返回一个新的对象作为新的state或者返回null表示state状态不需要更新**

### 更新
当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

#### getSnapshotBeforeUpdate
该周期函数在render后执行，执行之时DOM元素还没有被更新

该方法返回的一个Snapshot值(不返回报错)，作为componentDidUpdate第三个参数传入

此方法的目的在于获取组件**更新前的一些信息**，比如组件的滚动位置之类的，在组件更新后可以根据这些信息恢复一些UI视觉上的状态

### 卸载
当组件从 DOM 中移除时会调用如下方法：

- componentWillUnmount()

### 错误处理
当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

- static getDerivedStateFromError()：更改状态，从而显示降级组件
- componentDidCatch()：打印错误信息

[各生命周期的具体作用看这里](https://link.juejin.cn/?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Freact-component.html)

## React父子组件的生命周期调用顺序
结果：

## React事件和原生事件执行顺序
react所有事件都挂载在document上，当真实dom触发后冒泡到document后才会对react事件进行处理，所以：

- 原生事件先执行
- react合成事件再执行
- document上挂载的事件最后执行

## react的事件机制
react实现了一套自己的事件机制，包括事件注册、事件合成、事件冒泡、事件派发等。在react中这套事件被称为合成事件。

合成事件是 React模拟原生 DOM事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器

根据 W3C规范来定义合成事件，兼容所有浏览器，拥有与浏览器原生事件相同的接口，例如：

如果想要获得原生DOM事件，可以通过e.nativeEvent属性获取:

从上面可以看到React事件和原生事件也非常的相似，但也有一定的区别：

- 事件名称命名方式不同:react采用小驼峰格式
- 事件处理函数书写不同：react使用{}，而原生事件使用双引号

虽然onclick看似绑定到DOM元素上，但实际并不会把事件代理函数直接绑定到真实的节点上，而是把所有的事件绑定到结构的最外层，使用一个统一的事件去监听。

这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象。

当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，效率也有很大提升。

所以想要阻止不同时间段的冒泡行为，对应使用不同的方法，对应如下：

- 阻止合成事件间的冒泡，用e.stopPropagation()
- 阻止合成事件与最外层 document 上的事件间的冒泡，用e.nativeEvent.stopImmediatePropagation()
- 阻止合成事件与除最外层document上的原生事件上的冒泡，通过判断e.target来避免

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2023/webp/12531001/1675845811647-bcd9b167-5c64-4846-8db0-a6cd9c2335c3.webp)

综上所述：

- React 上注册的事件最终会绑定在document这个 DOM 上，而不是 React 组件对应的 DOM(减少内存开销就是因为所有的事件都绑定在 document 上，其他节点没有绑定事件)
- React 自身实现了一套事件冒泡机制，所以这也就是为什么我们 event.stopPropagation()无效的原因。
- React 通过队列的形式，从触发的组件向父组件回溯，然后调用他们 JSX 中定义的 callback
- React 有一套自己的合成事件 SyntheticEvent

## 函数组件和类组件输出差别（闭包陷阱）
以下函数组件代码，先alert再add，页面显示的值和alert的值分别是什么

alert ：1

页面显示：2

原因：log方法内的value和**点击动作触发时**的value相同，后续value的变化不会对log内部的value产生任何的影响。这种现象被称为 **闭包陷阱**，即函数式组件每次render都产生一个新的log函数，这个log函数会产生一个当前阶段value值的闭包。

除了闭包陷阱之外，函数组件和类组件还存在如下区别：

- 写法不同：函数组件代码更加简洁
- 函数组件不需要处理this但是类组件需要
- 类组件有生命周期和state函数组件不存在（但是函数组件中可以通过hooks达到类似的效果）

### 如何解决闭包陷阱
useRef每次render都会返回同一个引用类型对象，设置和读取都在这个对象上处理的话，就可以得到最新的value值了。

在类组件中情况是否会相同呢？

alert和页面显示的值相同。

## 受控组件和非受控组件
受控组件：简单理解为**双向绑定**，数据和视图的变化是同步的，受控组件一般需要**初始状态（value或者checked）** 和一个**状态更新事件函数**。

非受控组件：不受控制的组件，在其内部存储自身的状态，可以通过ref查询DOM的当前值。**初始状态为defaultValue**

推荐使用受控组件，在受控组件中数据由React组件处理。

操作DOM的情况下一般需要使用非受控组件，数据由DOM本身处理，控制能力较弱，但是代码量更少。

## React如何实现状态自动保存（vue中的keep-alive）
### 为什么需要状态保存
在React中通常使用路由去管理不同的页面，在切换页面时，路由将会卸载掉未匹配的页面组件，所以比如从列表进入详情页面，等到退回列表页面时会回到列表页的顶部。

### 什么情况下需要状态保存
- 列表进入详情
- 已填写但是未提交的表单
- 管理系统中可切换和关闭的标签

总而言之就是在交互过程中离开需要对状态进行保存的场景。

### React为什么不支持
状态保存在vue中可以使用keep-alive进行实现，但是react认为这个功能容易造成内存泄漏，所以暂时不支持。

### 如何实现
1. 手动保存状态：适用于数据较少的情况 在componentWillUnmount的时候将状态通过redux进行保存，然后在componentDidMount周期进行数据恢复。
2. 通过路由实现： 基本思想是，将KeepAlive中的组件也就是children取出来，渲染到一个不会被卸载的组件keeper中，在使用Dom操作将keeper内的真实内容移入对应的keepalive

## useEffect和useLayoutEffect有什么区别
相同点：

- 处理副作用：函数组件内不允许操作副作用。比如：改变DOM、设置订阅、操作定时器等
- 底层都是调用mountEffectlmpl方法，基本上可以替换使用

不同点：

- useEffect在像素变化之后异步调用，改变屏幕内容可能会造成页面的闪烁
- useLayoutEffect在像素变化之前同步调用，可能会造成页面延迟显示，但是不会闪烁：主要用于处理**DOM操作、调整样式、避免页面闪烁等**。因为是同步执行，所以要避免做大量计算，从而避免造成阻塞。
- useLayoutEffect先于useEffect执行

## 对react hook的理解，解决了什么问题
官方给出的动机是解决长时间使用和维护react过程中常遇到的问题，例如：

- 难以重用和共享组件中的与状态相关的逻辑
- 逻辑复杂的组件难以开发与维护，当我们的组件需要处理多个互不相关的 local state 时，每个生命周期函数中可能会包含着各种互不相关的逻辑在里面
- 类组件中的this增加学习成本，类组件在基于现有工具的优化上存在些许问题
- 由于业务变动，函数组件不得不改为类组件等等

在以前，函数组件也被称为无状态的组件，只负责渲染的一些工作

在有了hooks之后，函数组件也可以是有状态的组件，内部也可以维护自身的状态以及做一些逻辑方面的处理。

hooks的出现，使函数组件的功能得到了扩充，拥有了类组件相似的功能，在我们日常使用中，使用hooks能够解决大多数问题，并且还拥有代码复用机制，因此优先考虑hooks。

## React常用的hooks
### useState
定义状态，解决了函数组件没有状态的问题。

接受一个初始值（初始值可以是一个**具体数据类型**，也可以是一个**函数**，该函数只执行一次返回值作为初始值）作为参数，返回一个数组，第一项是变量，第二项是设置变量的函数。

- 对象**不可局部更新**：state是一个对象时，不能局部更新对象属性，useState不会合并，会把整个对象覆盖。要用展开运算符自己进行属性值的覆盖。```js     const [state, setState] = useState({ name: 'jerry', age: 18 })     const changeState = () => {         setState({name:"tom"}) //覆盖整个state     } 复制代码```
- **地址要变更**：对于引用类型，数据地址不变的时候，认为数据没有变化，不会更新视图。```js     const [state, setState] = useState({ name: 'jerry', age: 18 })     const changeState = () => {         const obj = state //obj和state指向同一个地址         obj.name = 'tom'         setState(obj) // 地址没有变更，不会更新     }     复制代码```
- useState 传入一个函数：useState初始化是惰性的，initialState只有在初始渲染中起作用，_后续渲染会被忽略_，如果初始state需要通过复杂的计算获得，可以传入一个函数，在函数中计算并返回初始state，次函数只在初始渲染时被调用。
- useState异步回调问题：如何获取到更新后的state，使用useEffect，当state变化时触发
- 操作合并：传入对象会被合并，传入函数，使用preState参数不会被合并```js 	setState({           ...state,             name: state.name + '!'          })          setState({             ...state,             name: state.name + '!'         })          setState({             ...state,             name: state.name + '!'         })                  setState((pre) => ({ ...state, name: pre.name + '!' }))         setState((pre) => ({ ...state, name: pre.name + '!' }))         setState((pre) => ({ ...state, name: pre.name + '!' })) 复制代码```

#### 对比类组件的state
1. 在正常的**react的事件流里**（如onClick等）：
    - setState和useState是**异步执行**的（不会立即更新state的结果）
    - 多次执行setState和useState，**只会调用一次重新渲染render**
    - 传入对象会被合并，函数则不会被合并。**可以通过setState传入一个函数来更新state，这样不会被合并**
2. 在setTimeout，Promise.then等**异步事件**中：
    - setState和useState是**同步执行**的（立即更新state的结果）
    - 多次执行setState和useState，每一次的执行setState和useState，都会调用一次render

#### setState执行机制（类组件）
通过setState来修改组件内部的 state，并且触发render方法进行视图的更新。

直接修改state不会引起视图的更新，因为react没有像vue一样通过proxy或者definProperty监听数据变化，必须通过setState方法来告知react组件state已经发生了改变。

关于state方法的定义是从React.Component中继承，定义的源码如下：

从上面可以看到setState第一个参数可以是一个对象，或者是一个函数，而第二个参数是一个回调函数，用于可以实时的获取到更新之后的数据。

##### 同步异步
- 在组件生命周期或React合成事件中，setState是异步。要想获取更新后的值，可以通过setState的第二个参数传入一个函数（函数组件通过useEffect）。
- 在setTimeout或者原生dom事件中，setState是同步。

##### 批量更新
- 合成事件或者生命周期中setState传入对象会被合并。要想避免合并可以将第一个参数写成函数。
- 而在setTimeout或者原生dom事件中，由于是同步的操作，所以并不会进行覆盖现象。

### useEffect
给没有生命周期的组件添加结束渲染的信号，在**渲染结束后执行**。

- 如果**不接受第二个参数**，那么在**第一次渲染完成之后**和**每次更新渲染页面**的时候，都会调用useEffect的回调函数。
- 可以对**第二个参数传入一个数组**，这个数组表示的是更新执行所依赖的列表，只有**依赖列表改变时**（数组中的任意一项变化时），才会触发回调函数
- **第二项是一个空数组**：只在第一次渲染完成时执行。相当于didMounted
- 清除副作用：比如绑定了自定义DOM 事件以防止内存泄漏 如何清除：clean-up 函数```js useEffect(()=>{ 	document.addEventListener('click',func);     return ()=>{          //  在每次执行useEffect之前都会执行上一次return中内容         document.removeEventListener('click',func)     } }) 复制代码```
- 异步操作：useEffect返回的是clean-up函数，因此没有办法返回一个promise实现异步
    - 立即执行函数：```js useEffect(() => {     (async function anyNameFunction() {       await loadContent();     })();   }, []); 复制代码```
    - 在useEffect外部或者内部实现async/await函数，然后在内部调用

### useContext
共享状态钩子。不同组件之间共享状态，避免props层层传递

- React.createContext
- Context.Provider

### useReducer
Action钩子，复杂版的useState

redux的原理是用户在页面中发起 action,从而通过reducer方法来改变 state,从而实现页面和状态的通信。而Reducer的形式是 (state, action) => newstate。类似，我们的useReducer()是这样的：

`const [state, dispatch] = useReducer(reducer, initialState)`

### 自己创建hooks
自己创建hooks就是一个将公共代码封装的过程，比如一个hooks输出一个鼠标位置坐标，可以如下实现：

## useEffect的触发时机
或者可以问：

- 数组可不可以什么都不传
- 数组里边内容如何确定

触发机制跟第二个参数有关：

- 第二个参数不传时：每次渲染完成后触发
- 第二个参数是一个空数组时：初始化渲染完成后触发，相当于didMounted
- 第二个参数是非空数组时：数组中数据有一项更新时触发

数组中的内容一般是props或者state，_是普通变量时不会触发执行_。

## useEffect的第一个函数返回一个函数
返回一个clean-up 函数，用来清除副作用。clean-up的执行时机是每个useEffect执行前会执行上一个effect返回的clean-up函数。

## hooks使用规则
- Hooks只在**函数组件**的**顶层调用**，不要在循环、条件判断或者嵌套函数中调用钩子。在类组件中无法使用。
- 对于自定义Hooks，使用use开头命名。

要 Hook 的调用顺序在多次渲染之间保持一致，React 就能**正确地将内部 state 和对应的 Hook 进行关联**。但如果我们将一个 Hook 调用放到一个条件语句中会发生什么呢？

[详解看这里](https://link.juejin.cn/?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fhooks-rules.html%23explanation)

## useMemo、memo、useCallback
他们三个的应用场景都是缓存结果，当依赖值没有改变时避免不必要的计算或者渲染。

- useCallback 是针对**函数**进行"记忆"的，当它依赖项没有发生改变时，那么该函数的引用并不会随着组件的刷新而被重新赋值。当我们觉得一个函数不需要随着组件的更新而更新引用地址的时候，我们就可以使用 useCallback 去修饰它。
- React.memo 是对**组件**进行 "记忆"，当它接收的 props 没有发生改变的时候，那么它将返回上次渲染的结果，不会重新执行函数返回新的渲染结果。
- React.useMemo是针对 **值计算** 的一种"记忆"，当依赖项没有发生改变时，那么无需再去计算，直接使用之前的值，对于组件而言，这带来的一个好处就是，可以减少一些计算，避免一些多余的渲染。当我们遇到一些数据需要在组件内部进行计算的时候，可以考虑一下 React.useMemo

**useMemo与useEffect的区别**

传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行不应该在渲染期间内执行的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。

useEffect在渲染后执行，可以访问渲染后的值。

如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。和useEffect类似，但是如果每次渲染时都计算，那就没必要使用useMemo了。

## ref使用场景
使用场景：直接使用**dom元素的某个方法**，或者直接使用**自定义组件中的某个方法**。在以下场景会用到ref:

- 对Dom元素的焦点控制、内容选择、控制
- 对Dom元素的内容设置及媒体播放
- 对Dom元素的操作和对组件实例的操作
- 集成第三方 DOM 库

ref作用于不同的组件时：

1. 作用于内置的html组件，得到的是真实的dom
2. ref作用于类组件，得到的是类的实例
3. **ref不能作用于函数组件**

使用ref的模式有：

- 字符串：传入字符串，使用时通过 this.refs."传入的字符串"的格式获取对应的元素。不再推荐使用，可能会被移除
- 对象：传入通过 React.createRef() 方式创建出来的对象，使用时获取到创建的对象中存在 current 属性就是对应的元素
- 函数：ref={(el) => {this.txt = el;}}
- 传入hook，hook是通过 useRef() 方式创建，使用时通过生成hook对象的 current 属性就是对应的元素
- ref转发：```jsx import React, { Component } from 'react' function A(props, ref){   console.log(props, ref)   return <h1 ref={ref}>A组件</h1> } // 传递函数组件，得到一个新的组件，不能传递类组件，并且函数组件必须使用第二个 const NewA = React.forwardRef(A) export default class App extends Component {   ARef = React.createRef()      componentDidMount() {     console.log(this.ARef) // {current: h1}   }      render() {     return (       <div>         <NewA ref={this.ARef} words="sdfsd"/>       </div>     )   } } 复制代码``` 可以使用：useImperativeHandle定义方法```js   useImperativeHandle(ref, () => ({     show: (title, content) => {       setVisible(true);       setTitle(title);       setContent(content);     },     hide: () => {       setVisible(false);     }   })); 复制代码```

## state和props有什么区别
一个组件的数据可以来源于组件内部，也可以来源于组件外部(比如父组件)。

组件内部的状态就是state，一般在constructor中定义。通过setState修改，会调用render方法重新渲染组件。 setState 还可以接受第二个参数，它是一个函数，会在 setState 调用完成并且组件开始重新渲染时被调用，可以用来监听渲染是否完成。

组件外部定义的状态是props，组件中的props不可以修改，只能通过传入新的props。

相同点：

- 两者都是 JavaScript 对象
- 两者都是用于保存状态
- props 和 state 都能触发渲染更新

区别：

- props 是外部传递给组件的，而 state 是在组件内被组件自己管理的，一般在 constructor 中初始化
- props 在组件内部是不可修改的，但 state 在组件内部可以进行修改 state 是多变的、可以修改

## super和super(props)的区别
在ES6的class中：

在上面的例子中，可以看到通过 super 关键字实现调用父类，super 代替的是父类的构建函数，使用 super(name) 相当于调用sup.prototype.constructor.call(this,name)

如果在子类中不使用 super关键字，则会引发报错，报错的原因是**子类是没有自己的 this 对象的，它只能继承父类的 this 对象，然后对其进行加工。**

而 super() 就是将父类中的 this 对象继承给子类的，没有 super() 子类就得不到 this 对象。

如果先调用 this，再初始化 super()，同样是禁止的行为。所以在子类 constructor 中，必须先代用 super 才能引用 this。

在 React 中，类组件是基于 ES6 的规范实现的，继承 React.Component，因此如果用到 constructor 就必须写 super() 才初始化 this。

这时候，在调用 super() 的时候，我们一般都需要传入 props 作为参数，如果不传进去，React 内部也会将其定义在组件实例中。 所以无论有没有 constructor，在 render 中 this.props 都是可以使用的，这是 React 自动附带的，是可以不写的。

综上所述：

- 在 React 中，类组件基于 ES6，所以在 constructor 中必须使用 super
- 在调用 super 过程，无论是否传入 props，React 内部都会将 porps 赋值给组件实例 porps 属性中
- 如果只调用了 super()，那么 this.props 在 super() 和构造函数结束之间仍是 undefined

## react引入css的方式有哪些
组件式开发选择合适的css解决方案尤为重要

通常会遵循以下规则：

- 可以编写局部css，不会随意污染其他组件内的原生；
- 可以编写动态的css，可以获取当前组件的一些状态，根据状态的变化生成不同的css样式；
- 支持所有的css特性：伪类、动画、媒体查询等；
- 编写起来简洁方便、最好符合一贯的css风格特点

在这一方面，vue使用css起来更为简洁：

- 通过 style 标签编写样式
- scoped 属性决定编写的样式是否局部有效
- lang 属性设置预处理器
- 内联样式风格的方式来根据最新状态设置和改变css

而在react中，引入CSS就不如Vue方便简洁，其引入css的方式有很多种，各有利弊

常见的CSS引入方式有以下：

- 行内样式：```jsx<div style={{     width:'200px',     height:'80px', 　　　　 }}>测试数据</div> 复制代码```
- 组件中引入 .css 文件
- 组件中引入 .module.css 文件
- CSS in JS

通过上面四种样式的引入，各自的优缺点：

- 在组件内直接使用css该方式编写方便，容易能够根据状态修改样式属性，但是大量的演示编写容易导致代码混乱
- 组件中引入 .css 文件符合我们日常的编写习惯，但是作用域是全局的，样式之间会层叠
- 引入.module.css 文件能够解决局部作用域问题，但是不方便动态修改样式，需要使用内联的方式进行样式的编写
- 通过css in js 这种方法，可以满足大部分场景的应用，可以类似于预处理器一样样式嵌套、定义、修改状态等

## react事件绑定方式有哪些
### 绑定方式
- render方法中使用bind
    - `<div onClick={this.handleClick.bind(this)}>test</div>`。
    - 这种方式在组件每次render渲染的时候，都会重新进行bind的操作，影响性能
- render方法中使用箭头函数
    - `<div onClick={e => this.handleClick(e)}>test</div>`
    - 每一次render的时候都会生成新的方法，影响性能
- constructor中bind：this.handleClick = this.handleClick.bind(this);
- 定义阶段使用箭头函数绑定

### 区别
- 编写方面：方式一、方式二、方式四写法简单，方式三的编写过于冗杂
- 性能方面：方式一和方式二在每次组件render的时候都会生成新的方法实例，性能问题欠缺。若该函数作为属性值传给子组件的时候，都会导致额外的渲染。而方式三、方式四只会生成一个方法实例

综合上述，方式四是最优的事件绑定方式。

## react组件的创建方式以及区别
### 创建方式
- 函数组件：通过一个函数，return 一个jsx语法声明的结构
- React.createClass 方法创建：语法冗余，目前已经不太使用
- 继承 React.Component 创建的类组件：最终会被编译成createClass

### 区别
由于React.createClass创建的方式过于冗杂，并不建议使用。

而像函数式创建和类组件创建的区别主要在于需要创建的组件是否需要为有状态组件：对于一些无状态的组件创建，建议使用函数式创建的方式。

在考虑组件的选择原则上，能用无状态组件则用无状态组件。

不过，由于react hooks的出现，函数式组件创建的组件通过使用hooks方法也能使之成为有状态组件，再加上目前推崇函数式编程，所以这里建议都使用函数式的方式来创建组件。

## react 中组件之间如何通信
组件传递的方式有很多种，根据传送者和接收者可以分为如下：

- 父组件向子组件传递：props
- 子组件向父组件传递：父组件向子组件传一个函数，然后通过这个函数的回调，拿到子组件传过来的值
- 兄弟组件之间的通信：状态提升，在公共的父组件中进行状态定义
- 父组件向后代组件传递：React.createContext创建一个context进行组件传递
- 非关系组件传递：redux

### React.createContext
通过使用React.createContext创建一个context

context创建成功后，其下存在Provider组件用于创建数据源，Consumer组件用于接收数据，使用实例如下：

Provider组件通过value属性用于给后代组件传递数据：

如果想要获取Provider传递的数据，可以通过Consumer组件或者或者使用contextType属性接收，对应分别如下：

contextType:

Consumer组件：

## React中key的作用
[官网中](https://link.juejin.cn/?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Freconciliation.html%23the-diffing-algorithm)对于diff有如下规则：

- 对比不同类型的元素：当元素类型变化时，会销毁重建
- 对比同一类型的元素：当元素类型不变时，比对及更新有改变的属性并且"在处理完当前节点之后，React 继续对子节点进行递归。"
- 对子节点进行递归：React 使用 key 来匹配原有树上的子元素以及最新树上的子元素。若key一致，则进行更新，若key不一致，就销毁重建

## react函数组件和类组件的区别
针对两种React组件，其区别主要分成以下几大方向：

- **编写形式**：类组件的编写形式更加的冗余
- **状态管理**：在hooks之前函数组件没有状态，在hooks提出之后，函数组件也可以维护自身的状态
- **生命周期**：函数组件没有生命周期，这是因为生命周期钩子都来自于继承的React.Component，但是可以通过useEffect实现类似生命周期的效果
- **调用方式**：函数组件通过执行函数调用，类组件通过实例化然后调用实例的render方法
- **获取渲染的值**：函数组件存在闭包陷阱，类组件不存在（Props在 React中是不可变的所以它永远不会改变，但是 this 总是可变的，以便您可以在 render 和生命周期函数中读取新版本）

## react高阶组件以及应用场景
### 什么是高阶组件
js高阶函数（Higher-order function），至少满足下列一个条件的函数

- 接受一个或多个函数作为输入
- 输出一个函数

在React中，高阶组件是参数为组件，返回值为新组件的函数。本质也就是一个函数，并不是一个组件。高阶组件的这种实现方式，本质上是一个装饰者设计模式。

### 怎么写高阶组件
通过对传入的原始组件 WrappedComponent 做一些你想要的操作（比如操作 props，提取 state，给原始组件包裹其他元素等），从而加工出想要的组件 EnhancedComponent。

把**通用的逻辑**放在高阶组件中，对组件实现一致的处理，从而实现代码的复用。所以，高阶组件的主要功能是封装并分离组件的通用逻辑，让通用逻辑在组件间更好地被复用。

### 高阶组件遵循的规则
[官网](https://link.juejin.cn/?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fhigher-order-components.html%23gatsby-focus-wrapper)

- 不要改变原始组件，而应该使用组合
- HOC 应该透传与自身无关的 props
- 包装显示名字以便于调试
- 不要在 render() 方法中使用高阶组件：这将导致子树每次渲染都会进行卸载，和重新挂载的操作！
- Refs 不会被传递：ref 实际上并不是一个 prop（就像 key 一样），它是由 React 专门处理的。如果将 ref 添加到 HOC 的返回组件中，则 ref 引用指向容器组件，而不是被包装组件。

高阶组件可以传递所有的props，但是不能传递ref，传毒ref可以使用React.forwardRef：

### 应用场景
通过上面的了解，高阶组件能够提高代码的复用性和灵活性，在实际应用中，常常用于与核心业务无关但又在多个模块使用的功能，如权限控制、日志记录、数据校验、异常处理、统计上报等。

## react组件间的过度动画如何实现
在日常开发中，页面切换时的转场动画是比较基础的一个场景。

当一个组件在显示与消失过程中存在过渡动画，可以很好的增加用户的体验。

在react中实现过渡动画效果会有很多种选择，如react-transition-group，react-motion，Animated，以及原生的CSS都能完成切换动画。

在react中，**react-transition-group**是一种很好的解决方案，其为元素添加enter，enter-active，exit，exit-active这一系列勾子

可以帮助我们方便的实现组件的入场和离场动画

其主要提供了三个主要的组件：

- CSSTransition：在前端开发中，结合 CSS 来完成过渡动画效果
- SwitchTransition：两个组件显示和隐藏切换时，使用该组件
- TransitionGroup：将多个动画组件包裹在其中，一般用于列表中元素的动画

安装：

```bash
npm install react-transition-group --save npm i --save-dev @types/react-transition-group
```

### CSSTransition
其实现动画的原理在于，当CSSTransition的in属性置为true时，CSSTransition首先会给其子组件加上xxx-enter、xxx-enter-active的class执行动画

当动画执行结束后，会移除两个class，并且添加-enter-done的class

所以可以利用这一点，通过css的transition属性，让元素在两个状态之间平滑过渡，从而得到相应的动画效果

当in属性置为false时，CSSTransition会给子组件加上xxx-exit和xxx-exit-active的class，然后开始执行动画，当动画结束后，移除两个class，然后添加-exit-done的class

如下例子：

对应css样式如下：

### SwitchTransition
SwitchTransition可以完成两个组件之间切换的炫酷动画

比如有一个按钮需要在on和off之间切换，我们希望看到on先从左侧退出，off再从右侧进入

SwitchTransition中主要有一个属性mode，对应两个值：

- in-out：表示新组件先进入，旧组件再移除；
- out-in：表示旧组件先移除，新组件再进入

**SwitchTransition组件里面要有CSSTransition，不能直接包裹你想要切换的组件**

里面的CSSTransition组件不再像以前那样接受in属性来判断元素是何种状态，取而代之的是key属性

下面给出一个按钮入场和出场的示例，如下：

css文件对应如下：

### TransitionGroup
当有一组动画的时候，就可将这些CSSTransition放入到一个TransitionGroup中来完成动画

同样CSSTransition里面没有in属性，用到了key属性

TransitionGroup在感知children发生变化的时候，先保存移除的节点，当动画结束后才真正移除

其处理方式如下：

- 插入的节点，先渲染dom，然后再做动画
- 删除的节点，先做动画，然后再删除dom

如下：

对应css如下：

## ReactRouter 组件的理解，常用的react router组件
react-router等前端路由的原理大致相同，可以实现无刷新的条件下切换显示不同的页面。

路由的本质就是页面的URL发生改变时，页面的显示结果可以根据URL的变化而变化，但是页面不会刷新。

因此，可以通过前端路由可以实现单页(SPA)应用

react-router主要分成了几个不同的包：

- react-router: 实现了路由的核心功能
- react-router-dom： 基于 react-router，加入了在浏览器运行环境下的一些功能
- react-router-native：基于 react-router，加入了 react-native 运行环境下的一些功能
- react-router-config: 用于配置静态路由的工具库

### 常用组件
react-router-dom的常用的一些组件：

- BrowserRouter、HashRouter：使用两者作为最顶层组件包裹其他组件，分别匹配history模式和hash模式
- Route：Route用于路径的匹配，然后进行组件的渲染，对应的属性如下：
    - path 属性：用于设置匹配到的路径
    - component 属性：设置匹配到路径后，渲染的组件
    - render 属性：设置匹配到路径后，渲染的内容
    - exact 属性：开启精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件
- Link、NavLink：通常路径的跳转是使用Link组件，最终会被渲染成a元素，其中属性to代替a标题的href属性 NavLink是在Link基础之上增加了一些样式属性，例如组件被选中时，发生样式变化，则可以设置NavLink的一下属性：
    - activeStyle：活跃时（匹配时）的样式
    - activeClassName：活跃时添加的class
- switch：swich组件的作用适用于当匹配到第一个组件的时候，后面的组件就不应该继续匹配
- redirect：路由的重定向

### hooks
除了一些路由相关的组件之外，react-router还提供一些hooks，如下：

- useHistory：组件内部直接访问history，无须通过props获取
- useParams：获取路由参数
- useLocation：返回当前 URL的 location对象

### 传参
路由传递参数主要分成了三种形式：

#### 动态路由的方式（params）：
路由配置：

路由跳转：

获取参数：

优点：

- 刷新页面，参数不丢失

缺点：

- 只能传字符串，传值过多url会变得很长
- 参数必须在路由上配置

#### search传递参数
路由不需要特别配置

路由跳转：

获取参数：所获取的是查询字符串，所以，还需要进一步的解析，自己自行解析，也可以使用第三方模块：qs，或者nodejs里的query-string

优点：

- 刷新页面，参数不丢失

缺点：

- 只能传字符串，传值过多url会变得很长，获取参数需要自定义hooks

#### state传参
路由不需要单独配置

路由跳转：

获取参数：

优点：

- 可以传对象

缺点：

- 刷新页面，参数丢失

**通过state传递参数，刷新页面后参数丢失，官方建议使用BrowserRouter，BrowserRouter页面刷新参数也不会丢失。**

#### query
路由不需要特别配置

路由跳转：

获取参数：

优势：

- 传参优雅，传递参数可传对象；

缺点：

- 刷新地址栏，参数丢失

## React Router有几种模式，实现原理是什么
react Router 有四个库：

- react router：核心库，封装了Router，Route，Switch等核心组件,实现了从路由的改变到组件的更新的核心功能,
- react router dom： dom环境下的router。在react-router的核心基础上，添加了用于跳转的Link组件，和histoy模式下的BrowserRouter和hash模式下的HashRouter组件等。所谓BrowserRouter和HashRouter，也只不过用了history库中createBrowserHistory和createHashHistory方法
- react router native：RN环境下的router
- react router config

在单页应用中，一个web项目只有一个html页面，一旦页面加载完成之后，就不用因为用户的操作而进行页面的重新加载或者跳转，其特性如下：

- 改变 url 且不让浏览器像服务器发送请求
- 在不刷新页面的前提下动态改变浏览器地址栏中的URL地址

react router dom其中主要分成了两种模式：

- hash 模式：在url后面加上#，如[http://127.0.0.1:5500/home/#/page1](https://link.juejin.cn/?target=http%3A%2F%2F127.0.0.1%3A5500%2Fhome%2F%23%2Fpage1)
- history 模式：允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录

React Router对应的hash模式和history模式对应的组件为：

- HashRouter
- BrowserRouter

这两个组件的使用都十分的简单，作为最顶层组件包裹其他组件

### 原理
[参考](https://juejin.cn/post/6886290490640039943)

单页面应用路由实现原理是，切换url，监听url变化，从而渲染不同的页面组件。

主要的方式有history模式和hash模式。

#### history模式
##### ①改变路由
history.pushState

1  state：一个与指定网址相关的状态对象， popstate 事件触发时，该对象会传入回调函数。如果不需要可填 null。

2  title：新页面的标题，但是所有浏览器目前都忽略这个值，可填 null。

3  path：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个地址。

history.replaceState

参数和pushState一样，这个方法会修改当前的  history 对象记录， history.length 的长度不会改变。

##### ②监听路由
popstate事件

同一个文档的  history 对象出现变化时，就会触发 popstate 事件  history.pushState 可以使浏览器地址改变，但是无需刷新页面。**注意**⚠️**的是：用  history.pushState() 或者 history.replaceState() **不会触发 popstate 事件**。 popstate 事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮或者调用 history.back()、history.forward()、history.go()方法。

#### hash模式
##### ①改变路由
window.location.hash

通过window.location.hash 属性获取和设置 hash 值。

在 hash模式下 ，history.push 底层是调用了window.location.href来改变路由。history.replace底层是调用 window.location.replace改变路由。

##### ②监听路由
onhashchange

#### 流程图
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2023/webp/12531001/1675845811620-0d6db680-016c-4029-a3bc-a088ac23658d.webp)

**当地址栏改变url，组件的更新渲染都经历了什么？**😊😊😊** 拿history模式做参考。当url改变，首先触发histoy，调用事件监听popstate事件， 触发回调函数handlePopState，触发history下面的setstate方法，产生新的location对象，然后通知Router组件更新location并通过context上下文传递，switch通过传递的更新流，匹配出符合的Route组件渲染，最后有Route组件取出context内容，传递给渲染页面，渲染更新。

**当我们调用history.push方法，切换路由，组件的更新渲染又都经历了什么呢？**

我们还是拿history模式作为参考，当我们调用history.push方法，首先调用history的push方法，通过history.pushState来改变当前url，接下来触发history下面的setState方法，接下来的步骤就和上面一模一样了，这里就不一一说了。

### BrowserRouter 与 HashRouter 对比
- HashRouter 最简单，每次路由变化不需要服务端接入，根据浏览器的hash来区分 path 就可以；BrowserRouter需要服务端解析 URL 返回页面，因此使用BrowserRouter需要在后端配置地址映射。
- BrowserRouter 触发路由变化的本质是使用 HTML5 history API（ pushState、replaceState 和 popstate 事件）
- HashRouter 不支持 location.key 和 location.state，动态路由需要通过?传递参数。
- Hash history 只需要服务端配置一个地址就可以上线，但线上的 web 应用很少使用这种方式。

## 对immutable的理解,如何应用在react项目中
[参考](https://link.juejin.cn/?target=https%3A%2F%2Fvue3js.cn%2Finterview%2FReact%2Fimmutable.html%23%25E4%25B8%2580%25E3%2580%2581%25E6%2598%25AF%25E4%25BB%2580%25E4%25B9%2588)

使用Immutable对象最主要的库是immutable.js

immutable.js 是一个完全独立的库，无论基于什么框架都可以用它

其出现场景在于弥补 Javascript 没有不可变数据结构的问题，通过 structural sharing来解决的性能问题

### 在React中应用
使用 Immutable可以给 React 应用带来性能的优化，主要体现在减少渲染的次数

在做react性能优化的时候，为了避免重复渲染，我们会在shouldComponentUpdate()中做对比，当返回true执行render方法

Immutable通过is方法则可以完成对比，而无需像一样通过深度比较的方式比较

在使用redux过程中也可以结合Immutable，不使用Immutable前修改一个数据需要做一个深拷贝

使用 Immutable 后：

## react render原理，在什么时候触发
render存在两种形式：

- 类组件中的render方法
- 函数组件的函数本身

触发时机：

- 类组件setState
- 函数组件通过use State hook修改状态

一旦执行了setState就会执行render方法(无论值是否发生变化)，useState 会判断当前值有无发生改变确定是否执行render方法，一旦父组件发生渲染，子组件也会渲染

## 如何提高组件的渲染效率
在之前文章中，我们了解到render的触发时机，简单来讲就是类组件通过调用setState方法， 就会导致render，父组件一旦发生render渲染，子组件一定也会执行render渲染

父组件渲染导致子组件渲染，子组件并没有发生任何改变，这时候就可以从避免无谓的渲染，具体实现的方式有如下：

- shouldComponentUpdate：
    - 通过shouldComponentUpdate生命周期函数来比对 state和 props，确定是否要重新渲染
    - 默认情况下返回true表示重新渲染，如果不希望组件重新渲染，返回 false 即可
- PureComponent：
    - 跟shouldComponentUpdate原理基本一致，通过对 props 和 state的浅比较结果来实现 shouldComponentUpdate
- React.memo
    - React.memo用来缓存组件的渲染，避免不必要的更新，其实也是一个高阶组件，与 PureComponent 十分类似。但不同的是， React.memo 只能用于函数组件
    - 如果需要深层次比较，这时候可以给memo第二个参数传递比较函数

## react diff
跟Vue一致，React通过引入Virtual DOM的概念，极大地避免无效的Dom操作，使我们的页面的构建效率提到了极大的提升

而diff算法就是更高效地通过对比新旧Virtual DOM来找出真正的Dom变化之处

传统diff算法通过循环递归对节点进行依次对比，效率低下，算法复杂度达到 O(n^3)，react将算法进行一个优化，复杂度降为O(n)

react中diff算法主要遵循三个层级的策略：

- tree层级
    - DOM节点跨层级的操作不做优化，只会对相同层级的节点进行比较
    - 只有删除、创建操作，没有移动操作
- conponent 层级
    - 如果是同一个类的组件，则会继续往下diff运算，如果不是一个类的组件，那么直接删除这个组件下的所有子节点，创建新的
- element 层级
    - 对于比较同一层级的节点们，每个节点在对应的层级用唯一的key作为标识
    - 提供了 3 种节点操作，分别为 INSERT_MARKUP(插入)、MOVE_EXISTING (移动)和 REMOVE_NODE (删除)
    - 通过key可以准确地发现新旧集合中的节点都是相同的节点，因此无需进行节点删除和创建，只需要将旧集合中节点的位置进行移动，更新为新集合中节点的位置
    - 由于dom节点的移动操作开销是比较昂贵的，在只修改文本的情况下，没有key的情况下要比有key的性能更好

## 对Fiber架构的理解，解决了什么问题
### Fiber 的结构
在 React15 以前 React 的组件更新创建虚拟 DOM 和 Diff 的过程是**不可中断**，如果需要更新组件树层级非常深的话，在 Diff 的过程会非常占用浏览器的线程，而我们都知道**浏览器执行JavaScript 的线程和渲染真实 DOM 的线程是互斥的**，也就是同一时间内，浏览器要么在执行 JavaScript 的代码运算，要么在渲染页面，**如果 JavaScript 的代码运行时间过长则会造成页面卡顿**。

基于以上原因 React 团队在 React16 之后就改写了整个架构，**将原来数组结构的虚拟DOM，改成叫 Fiber 的一种数据结构**，基于这种 Fiber 的数据结构可以实现由原来不可中断的更新过程变成**异步的可中断的更新**。

Fiber 的数据结构主要长成以下的样子，主要通过 Fiber 的一些属性去保存组件相关的信息。

Fiber 主要靠以下属性连成一棵树结构的数据的，也就是 Fiber 链表。

那么以上的 Fiber 链表的数据结构有什么特点，就是任何一个位置的 Fiber 节点，都可以非常容易知道它的父 Fiber, 第一个子元素的 Fiber,和它的兄弟节点 Fiber。却不容易知道它前一个 Fiber 节点是谁，这就是 React 中单向链表 Fiber 节点的特点。也正是因为这些即便在协调的过程被中断了，再恢复协调的时候，依然知道当前的父节点和孩子节点等信息。

在React 16 版本中，主要做了以下的操作：

- 为每个增加了优先级，优先级高的任务可以中断低优先级的任务。然后再重新，注意是重新执行优先级低的任务
- 增加了异步任务，调用requestIdleCallback api，浏览器空闲的时候执行
- dom diff树变成了链表，一个dom对应两个fiber（一个链表），对应两个队列，这都是为找到被中断的任务，重新执行

从架构角度来看，Fiber 是对 React核心算法（即调和过程）的重写

从编码角度来看，Fiber是 React内部所定义的一种数据结构，它是 Fiber树结构的节点单位，也就是 React 16 新架构下的虚拟DOM

一个 fiber就是一个 JavaScript对象，包含了元素的信息、该元素的更新操作队列、类型.

### 如何解决
Fiber把渲染更新过程拆分成多个子任务，每次只做一小部分，做完看是否还有剩余时间，如果有继续下一个任务；如果没有，挂起当前任务，将时间控制权交给浏览器（浏览器可以进行渲染），等浏览器不忙的时候再继续执行

即**可以中断与恢复**，恢复后也可以复用之前的中间状态，并给不同的任务赋予不同的优先级，其中每个任务更新单元为 React Element 对应的 Fiber节点

实现的上述方式的是requestIdleCallback方法： window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应

Fiber 架构可以分为三层：

- Scheduler 调度器 —— 调度任务的优先级，高优任务优先进入 Reconciler。requestIdleCallback在调度器中用到。
- Reconciler 协调器 —— 负责找出变化的组件
- Renderer 渲染器 —— 负责将变化的组件渲染到页面上

相比 React15，React16 多了**Scheduler（调度器）**，调度器的作用是调度更新的优先级。

在新缸架构模式下，工作流如下：

- 每个更新任务都会被赋予一个优先级。
- 当更新任务抵达调度器时，高优先级的更新任务（记为 A）会更快地被调度进 Reconciler 层；
- 此时若有新的更新任务（记为 B）抵达调度器，调度器会检查它的优先级，若发现 B 的优先级高于当前任务 A，那么当前处于 Reconciler 层的 A 任务就会被中断，调度器会将 B 任务推入 Reconciler 层。
- 当 B 任务完成渲染后，新一轮的调度开始，之前被中断的 A 任务将会被重新推入 Reconciler 层，继续它的渲染之旅，即"可恢复"。

**Fiber 架构的核心即是"可中断"、"可恢复"、"优先级"**

#### React 16 是如何解决中断更新时 DOM 渲染不完全的问题呢？
在 React 16 中，Reconciler与Renderer不再是交替工作。当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟 DOM 打上的标记。

- Placement表示插入操作
- PlacementAndUpdate表示替换操作
- Update表示更新操作
- Deletion表示删除操作

整个Scheduler与Reconciler的工作都在内存中进行，所以即使反复中断，用户也不会看见更新不完全的 DOM。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer。

#### fiber对生命周期的影响
新老两种架构对 React 生命周期的影响主要在 render 这个阶段，这个影响是通过增加 Scheduler 层和改写 Reconciler 层来实现的。

在 render 阶段，一个庞大的更新任务被分解为了一个个的工作单元，这些工作单元有着不同的优先级，React 可以根据优先级的高低去实现工作单元的打断和恢复。

从 Firber 机制 render 阶段的角度看 react 即将废除的三个生命周期的共同特点是都处于 render 阶段：

参考链接：

[jacky-summer.github.io/2021/02/07/…](https://link.juejin.cn/?target=https%3A%2F%2Fjacky-summer.github.io%2F2021%2F02%2F07%2F%25E6%25B5%2585%25E8%25B0%2588%25E5%25AF%25B9-React-Fiber-%25E7%259A%2584%25E7%2590%2586%25E8%25A7%25A3%2F)

## JSX转换成真实DOM的过程
其渲染流程如下所示：

1. 将函数组件或者类组件中的jsx结构，通过babel转换成React.createElement的形式，React.createElement对接收到的参数进行"格式化"，传递给ReactElement函数；
2. ReactElement函数将接收到的参数进行整合，最终构造成一个虚拟DOM对象并返回；
3. ReactDOM.render将生成好的虚拟DOM渲染到指定容器上，其中采用了批处理、事务等机制并且对特定浏览器进行了性能优化，最终转换为真实DOM

## react 性能优化的手段
- 避免不必要的render：通过shouldComponentUpdate、PureComponent、React.memo
- 使用 Immutable：在做react性能优化的时候，为了避免重复渲染，我们会在shouldComponentUpdate()中做对比，当返回true执行render方法。Immutable通过is方法则可以完成对比，而无需像一样通过深度比较的方式比较
- 避免使用内联函数：每次调用render函数时都会创建一个新的函数实例
- 事件绑定方式：避免在render函数中声明函数，通过在constructor绑定this，或者在声明函数的时候使用箭头函数
- 使用 React Fragments 避免额外标记：用户创建新组件时，每个组件应具有单个父标签。这个额外标签除了充当父标签之外，并没有其他作用，这时候则可以使用fragement
- 懒加载组件：从工程方面考虑，webpack存在代码拆分能力，可以为应用创建多个包，并在运行时动态加载，减少初始包的大小。而在react中使用到了Suspense和 lazy组件实现代码拆分功能，基本使用如下：```jsx     const johanComponent = React.lazy(() => import(/* webpackChunkName: "johanComponent" */ './myAwesome.component'));       export const johanAsyncComponent = props => (       <React.Suspense fallback={<Spinner />}>         <johanComponent {...props} />       </React.Suspense>     ); 复制代码```
- 服务端渲染：采用服务端渲染端方式，可以使用户更快的看到渲染完成的页面

## 在React项目中如何捕获错误
错误在我们日常编写代码是非常常见的

举个例子，在react项目中去编写组件内JavaScript代码错误会导致 React 的内部状态被破坏，导致整个应用崩溃，这是不应该出现的现象

作为一个框架，react也有自身对于错误的处理的解决方案。

为了解决出现的错误导致整个应用崩溃的问题，react16引用了错误边界新的概念

错误边界是一种 React 组件，这种组件可以捕获发生在其子组件树任何位置的 JavaScript 错误，并打印这些错误，同时展示降级 UI，而并不会渲染那些发生崩溃的子组件树

错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误

形成错误边界组件的两个条件：

- 使用了 static getDerivedStateFromError()
- 使用了 componentDidCatch()

抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息，如下：

然后就可以把自身组件的作为错误边界的子组件，如下：

下面这些情况无法捕获到异常：

- 事件处理
- 异步代码
- 服务端渲染
- 自身抛出来的错误

对于错误边界无法捕获的异常，如事件处理过程中发生问题并不会捕获到，是因为其不会在渲染期间触发，并不会导致渲染时候问题

这种情况可以使用js的try...catch...语法，如下：

除此之外还可以通过监听onerror事件:

## react和vue渲染原理上的区别
可以看[这篇文章](https://juejin.cn/post/7144648542472044558)

# Redux
redux就是一个将状态进行集中管理的容器，遵循三大基本原则：

- 单一数据源
- state 是只读的
- 使用纯函数来执行修改

注意redux并不是只有在react中使用，还可以和其他的界面库使用，比如vue

以下的情景可以使用redux:

- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2023/webp/12531001/1675845811602-5aca5808-38b0-4df2-82ea-fe893c51acbb.webp)

首先，用户发出 Action。

`store.dispatch(action); 复制代码`

然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。

`let nextState = todoApp(previousState, action); 复制代码`

State 一旦有变化，Store 就会调用监听函数。

`// 设置监听函数 store.subscribe(listener); 复制代码`

listener可以通过store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。

`function listerner() {   let newState = store.getState();   component.setState(newState);    } 复制代码`

## 中间件
参考：[www.ruanyifeng.com/blog/2016/0…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2016%2F09%2Fredux_tutorial_part_two_async_operations.html)

中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。

### 异步操作
redux-thunk中间件。

默认情况下的dispatch(action)，action需要是一个JavaScript的对象

redux-thunk中间件会判断你当前传进来的数据类型，如果是一个函数，将会给函数传入参数值（dispatch，getState）

- dispatch函数用于我们之后再次派发action
- getState函数考虑到我们之后的一些操作需要依赖原来的状态，用于让我们可以获取之前的一些状态

所以dispatch可以写成下述函数的形式：

## 在react中使用
### 基本概念
state：普通对象，用来存储状态

action：普通对象，用来描述变化

reducer：接收 state 和 action，并返回新的 state 的函数，将state和action连接起来

### 基本使用
安装：

```bash
npm install redux

npm install react-redux
```

1. 创建store```js import { createStore } from "redux" const default State={     counter:0 } //纯函数 let reducers =(state = defaultState ,action)=>{     switch (action.type){         case "increment":             console.log("increment")             return {                 counter:state.counter+1             }         case "decrement":             return {                 counter:state.counter-1             }         default :         return state      } } const store = createStore(reducers) export default store 复制代码```
2. 全局注入store```jsx import React from 'react'; import ReactDOM from 'react-dom/client'; import './index.css'; import App from './App'; import reportWebVitals from './reportWebVitals'; import { Provider } from 'react-redux'; import store from './store' const root = ReactDOM.createRoot(document.getElementById('root')); root.render(   <React.StrictMode>     <Provider store={store}>       <App />     </Provider>   </React.StrictMode> ); // If you want to start measuring performance in your app, pass a function // to log results (for example: reportWebVitals(console.log)) // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals reportWebVitals(); 复制代码```
3. react-redux将redux和react联系起来```jsx import React from "react"; import { connect } from "react-redux" class ClassCom extends React.Component {     constructor(props) {         super(props);     }     incre = () => {         this.props.increment()     }     render() {         return (             <div>                 <h1>类组件</h1>                 <h1>store测试</h1>                 <div>store的值{this.props.num}</div>                 <button onClick={this.incre}>increment</button>             </div>         )     } } // export default ClassCom //该函数作为connect的第一个参数，能拿到state //映射state到组建的props上 function mapStateToProps(state) {     return {         num: state.counter     } } //该函数作为connect的第二个参数，能拿到dispatch //映射dispatch方法到组建的props上 function mapDispatchToProps(dispatch) {     return {         increment() {             dispatch({                 type: "increment"             })         },         decrement() {             dispatch({                 type: "decrement"             })         }     } } //connet函数执行返回一个高阶组件 //调用这个高阶组件，传入当前组件作为参数,返回一个增强的组件 //这个增强的组件props里有store的state和dispach方法 export default connect(mapStateToProps, mapDispatchToProps)(ClassCom) 复制代码```

这个时候组件的props中会有

- 传入的props
- mapStateToProps注入的state
- mapDispatchToProps 注入的dispatch

接下来就可以通过props去使用状态和更新状态

## Redux和Vuex的异同点，以及用到的相同的思想
### 相同点
- state共享数据
- 流程一致：定义全局state，触发修改方法，修改state
- 全局注入store

### 不同点：
- redux使用的是不可变数据，而Vuex是可变的。
- redux每次都是用新的state替换旧的state，vuex是直接修改。
- redux在检测数据变化时是通过diff算法比较差异的；vuex是通过getter/setter来比较的
- vuex定义了state，getter，mutation，action；redux定义了state，reducer，action
- vuex中state统一存放，方便理解；react中state依赖reducer初始值
- vuex的mapGetters可以快捷得到state，redux中是mapStateToProps
- vuex同步使用mutation，异步使用action；redux同步异步都使用reducer

### 相同思想
- 单一数据源
- 变化可预测
- MVVM思想
