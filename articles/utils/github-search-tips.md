# GitHub 搜索技巧

## 1. 按仓库名称搜索

```bash
repo:username/repository-name
```

## 2. 按语言搜索

```bash
language:javascript
language:typescript
language:vue
language:css
```

## 3. 按星标数搜索

```bash
stars:>1000
stars:100..500
```

## 4. 按更新时间搜索

```bash
pushed:>2024-01-01
```

## 5. 按主题搜索

```bash
topic:vue
topic:react
topic:frontend
```

## 6. 按作者搜索

```bash
author:username
user:username
```

## 7. 组合搜索

```bash
vue stars:>500 pushed:>2024-01-01
```

## 8. 搜索代码内容

```bash
in:file "关键词"
in:path "关键词"
in:readme "关键词"
```

## 9. 按大小搜索

```bash
size:>1000   # 大于 1MB
size:<100    # 小于 100KB
```

## 10. 按 license 搜索

```bash
license:mit
license:apache-2.0
```

## 常用搜索示例

```bash
# 高质量的 Vue 组件库
vue stars:>1000 language:javascript

# 最近的 TypeScript 项目
typescript pushed:>2024-01-01 stars:>100

# 简历模板
resume in:readme stars:>100
```

## 高级搜索

点击 GitHub 搜索框右边的 "Advanced search" 可以使用更强大的搜索界面。
