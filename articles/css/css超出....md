###  1.css超出一行用点表示

```
white-space:nowrap;

overflow:hidden;

text-overflow:ellipsis;

```

### 2.css超出二行用点表示

```
overflow:hidden;

text-overflow:ellipsis;

display:-webkit-box;

-webkit-box-orient:vertical;

-webkit-line-clamp:2;

```