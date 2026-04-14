---
title: React 组件二次封装小技巧
date: 2024-01-01
---

### 自己封装的 `<MyNavLink>` 组件,如果想实现和 `<NavLink>` 组件一样的使用方式

只需要按照下面的方式进行封装即可：

```jsx
import React,{ Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class MyNavLink extends Component {
  render() {
    // 不需要单独处理children,只需要......
    // React会自动在props中添加这个属性
    return (
      <NavLink activeClassName="atguigu" className="list-group-item" {...this.props}/>
    )
  }
}
```

如果想要获取自定义组件标签之间的内容时,可以通过 `this.props.children` 获取
