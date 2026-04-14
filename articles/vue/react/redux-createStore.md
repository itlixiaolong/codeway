```
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({type：'@@redux/INIT'}); // 先调用一次，派发一下{ type: '@@redux/INIT' } ，获取state

  return { getState, dispatch, subscribe };

};
```