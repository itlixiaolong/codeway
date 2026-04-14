---
title: 非工程化使用 React 的 JSX 语法糖
date: 2024-01-01
---

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <!-- 不要在生产环境使用这个  -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">

      function MyApp() {
      	return <h1>Hello, world!</h1>;
      }

      const container = document.getElementById('root');
      const root = ReactDOM.createRoot(container);
      root.render(<MyApp />);

    </script>
    <!--
    注意: 
    
    这个页面给尝试react提供了一个非常好的方式,但是并不适合生产环境

		它在浏览器中用Babel缓慢地编译JSX，并使用大型开发版本的React。

    在生产中使用JSX,请阅读底下的例子:
    https://reactjs.org/docs/add-react-to-a-website.html#add-jsx-to-a-project

		在较大的项目中，您可以使用包含JSX的集成工具链:
    https://reactjs.org/docs/create-a-new-react-app.html

		您也可以在没有JSX的情况下使用React，在这种情况下，您可以删除Babel:
    https://reactjs.org/docs/react-without-jsx.html
    -->
  </body>
</html>

```

[](https://reactjs.org/docs/react-without-jsx.html)
