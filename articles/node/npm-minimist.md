# minimist 命令行参数解析

## minimist 是什么

minimist 是 Node.js 的命令行参数解析工具，用于处理命令行调用 node 指令时，处理 node 之后的一系列参数的模块。

## 基本用法

```js
var parseArgs = require('minimist')
var argv = parseArgs(args, opts={})
```

## opts 参数详解

| 参数 | 说明 |
|------|------|
| opts.string | 字符串或字符串数组，始终视为字符串 |
| opts.boolean | 布尔值数组，始终被处理为布尔值 |
| opts.alias | 别名映射 |
| opts.default | 默认值 |
| opts.stopEarly | 第一个非参数字符串之后的参数放入 `argv._` |
| opts['--'] | 分隔 `--` 前后的参数 |
| opts.unknown | 未知参数的回调函数 |

## 实例

```js
var args = require('minimist')(process.argv.slice(2), {
    string: ['port', 'language'],
    boolean: ['debug'],
    alias: {
        port: 'p',
        language: 'l'
    },
    default: {
        NODE_ENV: 'dev'
    }
})
```

```bash
node index.js --debug=Enble --out=22 --port=3030 --language=cn

# 输出
{ 
  _: [],
  debug: true,
  out: 22,
  port: '3030',
  p: '3030',
  language: 'cn',
  l: 'cn',
  NODE_ENV: 'dev' 
}
```

## 注意事项

1. 带有 `-` 或 `--` 的参数都被解析成单独的 key 值
2. 带有 `-` 的多个字符会被分开解析，如 `-ab` 被解析成 `{a: true, b: true}`
3. 带有 `--` 的多个字符不会被分开解析

## 安装

```bash
npm install minimist --save-dev
```
