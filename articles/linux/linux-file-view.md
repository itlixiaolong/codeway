# Linux 文件查看命令

## 1. cat

将文件内容输出到终端，适用于文件内容不多的情况：

```bash
cat 1.txt
```

## 2. head

查看文件前 N 行：

```bash
head 1.txt              # 默认前10行
head -n 20 1.txt        # 前20行
```

## 3. tail

查看文件后 N 行：

```bash
tail 1.txt              # 默认后10行
tail -n 20 1.txt        # 后20行
tail -f 1.txt           # 实时追踪文件变化（查看日志）
```

## 4. wc

统计文件内容信息：

```bash
wc -l 1.txt             # 统计行数
wc -w 1.txt             # 统计单词数
wc -c 1.txt             # 统计字符数
```

## 5. more

分页查看文件内容：

```bash
more 1.txt
# 空格：向下翻页
# Enter：向下滚动一行
# q：退出
```

## 6. less

分页查看文件内容（支持上下翻页）：

```bash
less 1.txt
# 空格/pgdn：向下翻页
# b/pgup：向上翻页
# ↑/↓：上下滚动
# q：退出
# /keyword：搜索
```
