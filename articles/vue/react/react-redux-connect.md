---
title: React Redux 的 connect 实现
date: 2024-01-01
---

<!-- 这是一张图片，ocr 内容为：对象,还可以使用第二个参数,代表容器组件的 的第一个参数总是 对象. STATE PROPS MAPSTATETOPROPS 容器组件的代码 <FILTERLINK FILTER"SHOW ALL"> A11 </FILTERLINK> (STATE,OWNPROPS) CONST MAPSTATETOPROPS RETURN L ACTIVE: OWNPROPS.FILTER STATE.VISIBILITYFILTER 使用 作为参数后,如果容器组件的参数发生变化,也会引发UI组件重新渲染. OWNPROPS 参数,那样的话,UI组件就不会订阅STORE,就是说STORE的更新不会引起 UI组件 方法可以省略 CONNECT MAPSTATETOPRROPS 的更新. -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1661323656026-d3444cd7-67a3-475e-a21b-ba974dfbc68f.png)

<!-- 这是一张图片，ocr 内容为：:函数的第二个参数,用来建立 UI组件的参数到 STORE.DISPATCH 方法的映射.也就是 MAPDISPATCHTOPROPS CONNECT 说,它定义了哪些用户的操作应该当作ACTION,传给STORE.它可以是一个函数,也可以是一个对象. 如果MAPDISPATCHTOPS 是一个函数,会得到 DISPATCH  H和OWNPROPS (容器组件的PROPS 对象)两个参数. CONST MAPDISPATCHTOPROPS DISPATCH OWNPROPS RETURN ONCLICK:())>( DISPATCH(  TYPE: 'SET VISIBILITY FILTER', FILTER:OWNPROPS.FILTER -->
![](https://cdn.nlark.com/yuque/0/2022/png/12531001/1661323967942-c8a2b9fa-536d-4279-849e-12040885a1fb.png)

```jsx
// connect() is a function that injects Redux-related props into your component.
// You can inject data and callbacks that change that data by dispatching actions.
function connect(mapStateToProps, mapDispatchToProps) {
  // It lets us inject component as the last step so people can use it as a decorator.
  // Generally you don't need to worry about it.
  return function (WrappedComponent) {
    // It returns a component
    return class extends React.Component {
      render() {
        return (
          // that renders your component
          <WrappedComponent
            {/* with its props  */}
            {...this.props}
            {/* and additional props calculated from Redux store */}
            {...mapStateToProps(store.getState(), this.props)}
            {...mapDispatchToProps(store.dispatch, this.props)}
            />
        )
      }
      
      componentDidMount() {
        // it remembers to subscribe to the store so it doesn't miss updates
        this.unsubscribe = store.subscribe(this.handleChange.bind(this))
      }
      
      componentWillUnmount() {
        // and unsubscribe later
        this.unsubscribe()
      }
      
      handleChange() {
        // and whenever the store state changes, it re-renders.
        this.forceUpdate()
      }
    }
  }
}

// This is not the real implementation but a mental model.
// It skips the question of where we get the "store" from (answer: <Provider> puts it in React context)
// and it skips any performance optimizations (real connect() makes sure we don't re-render in vain).

// The purpose of connect() is that you don't have to think about
// subscribing to the store or perf optimizations yourself, and
// instead you can specify how to get props based on Redux store state:

const ConnectedCounter = connect(
  // Given Redux state, return props
  state => ({
    value: state.counter,
  }),
  // Given Redux dispatch, return callback props
  dispatch => ({
    onIncrement() {
      dispatch({ type: 'INCREMENT' })
    }
  })
)(Counter)

```
