# Linux 文件查找命令

## find 语法

```bash
find [路径] [选项] [操作]
```

## 按文件名查找

```bash
find /etc -name '*.conf'           # 按文件名
find /etc -iname '*.conf'         # 忽略大小写
```

## 按文件属主/属组查找

```bash
find . -user root                  # 按属主
find . -group root                 # 按属组
```

## 按文件类型查找

```bash
find . -type f                     # 普通文件
find . -type d                     # 目录
find . -type l                     # 链接文件
find . -type c                     # 字符设备文件
find . -type b                     # 块设备文件
```

## 按文件大小查找

```bash
find . -size -10k                  # 小于10KB
find . -size +1M                   # 大于1MB
find . -size 100c                  # 等于100字节
```

## 按权限查找

```bash
find . -perm 644
```

## 按修改时间查找

```bash
find . -mtime -2                   # 2天内修改
find . -mtime +7                   # 7天前修改
find . -mmin -5                    # 5分钟内修改
```

## 按目录深度查找

```bash
find /etc -mindepth 3              # 从第3级子目录开始
find /etc -maxdepth 2              # 最多搜索到第2级
```

## 操作

```bash
# 删除找到的文件
find /etc -name '*.conf' -size +10k -type f -exec rm -rf {} \;

# 复制找到的文件
find /etc -name '*.conf' -size +10k -type f -exec cp {} /root/test \;
```

## 逻辑运算符

```bash
find . -user test -size -300c      # 与
find . -type f \( -user test -o -name '*.conf' \)  # 或
find . -type f -not -user test     # 非
```

## 其他查找命令

```bash
which mysql                         # 查找命令路径
whereis mysql                       # 查找命令、二进制文件、帮助文档
locate keyword                      # 快速文件定位（需 updatedb 更新）
```
