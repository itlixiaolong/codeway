#### 一、 概念：
通常来说中间件是在某个应用中 A 和 B 部分中间的那一块， 中间件可以把 A 发送数据到 B 的形式从

A -----> B 

变成:

A ---> middleware 1 ---> middleware 2 ---> middleware 3 --> ... ---> B

#### 二、那么中间件在 Redux 中是如何演变的？
**问题：**
使用 Redux 的一个益处就是它让 state 的变化过程变的可预知和透明。每当一个 action 发起完成后，新的 state 就会被计算并保存下来。State 不能被自身修改，只能由特定的 action 引起变化。

试想一下，当我们的应用中每一个 action 被发起以及每次新的 state 被计算完成时都将它们记录下来，岂不是很好？当程序出现问题时，我们可以通过查阅日志找出是哪个 action 导致了 state 不正确


- 阶段一  ### ==手动记录==

假设，你在创建一个 Todo 时这样调用：
```
store.dispatch(addTodo('Use Redux'))
```
为了记录这个 action 以及产生的新的 state，你可以通过这种方式记录日志：
```
const action = addTodo('Use Redux')

console.log('dispatching', action)
store.dispatch(action)
console.log('next state', store.getState())
```
- 阶段二 ### ==封装 Dispatch方法==

你可以将上面的操作抽取成一个函数：
```
function dispatchAndLog(store, action) {
  console.log('dispatching', action)
  store.dispatch(action)
  console.log('next state', store.getState())
}
```
然后用它替换 store.dispatch():
```
dispatchAndLog(store, addTodo('Use Redux'))
```
你可以选择到此为止，但是每次都要导入一个外部方法总归还是不太方便。

- 阶段三 ### ==直接修改store的Dispatch方法==

如果我们直接替换 store 实例中的 dispatch 函数会怎么样呢？

Redux store 只是一个包含一些方法的普通对象，同时我们使用的是JavaScript，因此我们可以这样实现 dispatch 的 monkeypatch：
```
const next = store.dispatch
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
```
这离我们想要的已经非常接近了！无论我们在哪里发起 action，保证都会被记录。Monkeypatching 令人感觉还是不太舒服，不过利用它我们做到了我们想要的。。

- 阶段四 ### ==隐藏 Monkeypatching==

Monkeypatching 本质上是一种 hack。“将任意的方法替换成你想要的”，此时的 API 会是什么样的呢？现在，让我们来看看这种替换的本质。 在之前，我们用自己的函数替换掉了 store.dispatch。如果我们不这样做，而是在函数中返回新的 dispatch 呢？
```
function logger(store) {
  const next = store.dispatch //保存原来的dispatch方法

   <!--我们之前的做法:-->
   <!-- store.dispatch = function dispatchAndLog(action) {-->

  return function dispatchAndLog(action) {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }
}
```
我们可以在 Redux 内部提供一个可以将实际的 monkeypatching 应用到 store.dispatch 中的辅助方法：
```
function applyMiddlewareByMonkeypatching(store, middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()

  // 在每一个 middleware 中变换 dispatch 方法。
  middlewares.forEach(middleware => (store.dispatch = middleware(store)))
}
```
然后像这样应用多个 middleware：
```
applyMiddlewareByMonkeypatching(store, [logger, crashReporter])
```
尽管我们做了很多，实现方式依旧是 monkeypatching。
因为我们仅仅是将它隐藏在我们的框架内部，并没有改变这个事实。
- 阶段五 ### ==移除 Monkeypatching==
每次我们获取前一个dispatch是通过store.dispatch获取的，这个我们想在applyMiddlewareByMonkeypatching函数应用中间键是将store.dispatch当做参数传给中间键，这样我们就可以将Monkeypatching中的 const next = store.dispatch删除掉

```
// 注意：这是简单粗暴的中间件调用方法
// 并 *不是* Redux API 真实的实现方法
function applyMiddlewareByMonkeypatching(store, middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()
  let dispatch = store.dispatch
  // 在每一个 middleware 中变换 dispatch 方法。
  middlewares.forEach(middleware => (store.dispatch = middleware(store)(dispatch)))
}

// 中间键函数变成了
function logger(store) {
  return function wrapDispatchToAddLogging(next) {
    return function dispatchAndLog(action) {
      console.log('dispatching', action)
      let result = next(action)
      console.log('next state', store.getState())
      return result
    }
  }
}
//通过es6简化
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
//最终生成中间键的统一模板
  var anyMiddleware = function ({ dispatch,getState }) {
        return function(next) {
            return function (action) {
                // 你的中间件业务相关代码
            }
        }
    }

```
#### 三、那么中间件在 Redux 中是如何工作的？
看上去 Redux 并不能自动处理 action creator 中返回的异步函数。

但如果在 action creator 和 reducer 之间增加一个中间件，就可以把这个函数转成适合 Redux 处理的内容：

action ---> dispatch---> middleware 1 ---> middleware 2 ---> reducers

-  每当一个 action（或者其他诸如异步 action creator 中的某个函数）被分发时， 我们的中间件就会被调用

-  并且在需要的时候协助 action creator 分发真正的 action（或者什么都不做，
有时我们需要这么做）

- 在 Redux 中，中间件是纯粹的函数，有明确的使用方法并且严格的遵循以下格式：
```
    var anyMiddleware = function ({ dispatch,getState }) {
        return function(next) {
            return function (action) {
                // 你的中间件业务相关代码
            }
        }
    }
```

 如上所述，中间件由三个嵌套的函数构成（会依次调用）：
 
-  1) 第一层向其余两层提供分发函数和 getState 函数（因为你的中间件或 action creator 可能需要从 state 中读取数据）
- 2) 第二层提供 next 函数，它允许你显式的将处理过的输入传递给下一个中间件或 Redux(这样 Redux 才能调用所有 reducer)。
- 3) 第三层提供从上一个中间件或从 dispatch 传递来的 action，这个 action 可以调用下一个中间件（让 action 继续流动) 或者以想要的方式处理 action。

学习过函数式编程的人可能会意识到给上述代码提供了一个机会来使用柯里化（如果你不理解也没关系，跳过接下去的 10 行，不会影响你对 redux 的理解）。

**使用柯里化，你可以简化上述函数：**
```
     <!--"curry" may come any functional programming library (lodash, ramda, etc.)-->
    var thunkMiddleware = curry(
        ({dispatch, getState}, next, action) => (
             <!--你的中间件业务相关代码-->
        )
    );
```
 我们为异步 action creator 提供的中间件叫 thunk middleware
// 它的代码在：https://github.com/gaearon/redux-thunk.
// 它看上去是这样 (为了可读性使用 ES5 语法书写该函数）:
```
var thunkMiddleware = function ({ dispatch, getState }) {
     <!--console.log('Enter thunkMiddleware');-->
    return function(next) {
         <!--console.log('Function "next" provided:', next);-->
        return function (action) {
            <!--/console.log('Handling action:', action);-->
            return typeof action === 'function' ?
                action(dispatch, getState) :
                next(action)
        }
    }
}
```
