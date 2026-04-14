```
const combineReducers = reducers => {
  return (state = {}, action) => {

    //返回一个函数，闭包保存reducers
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        依次执行每个reducer，获得最终的nextState
        nextState[key] = reducers[key] (
          state[key],
          action
        );
        return nextState;
      },
      {} //定义初始的state为{}，经过依次循环最终产生最终的state
    );
  };
};

//使用
const todoApp = combineReducers({
  todos,
  visibilityFilter
});
```