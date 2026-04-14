# Linux grep 命令

## 基本用法

```bash
grep "pattern" file              # 搜索包含 pattern 的行
```

## 常用选项

| 选项 | 说明 |
|------|------|
| -i | 忽略大小写 |
| -v | 反向选择（不包含 pattern 的行） |
| -n | 显示行号 |
| -c | 统计匹配行数 |
| -r | 递归搜索 |
| -E | 使用扩展正则表达式 |

## 示例

```bash
# 基本搜索
grep "python" 1.txt

# 忽略大小写
grep -i "python" 1.txt

# 显示不匹配的行
grep -v "python" 1.txt

# 显示行号
grep -n "python" 1.txt

# 统计行数
grep -c "python" 1.txt

# 递归搜索
grep -r "python" .

# 扩展正则
grep -E "python|PYTHON" 1.txt
```

## 正则表达式

```bash
grep "^root" /etc/passwd         # 以 root 开头
grep "bash$" /etc/passwd         # 以 bash 结尾
grep "roo." /etc/passwd          # 任意单字符
grep "roo*" /etc/passwd          # o 出现0次或多次
```
