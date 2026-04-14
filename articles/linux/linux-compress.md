# Linux 打包压缩与解压缩

## tar 命令参数

| 参数 | 说明 |
|------|------|
| -c | 生成一个新的包 |
| -z | 使用 gzip 压缩（压缩率低，快） |
| -j | 使用 bzip2 压缩（压缩率高，慢） |
| -v | 显示压缩过程 |
| -t | 查看压缩包内容 |
| -x | 解压 |
| -f | 指定文件 |
| -r | 向压缩归档文件末尾追加文件 |
| -u | 更新原压缩包中的文件 |

**常见后缀**：.tar, .tar.gz, .tgz, .tar.bzip2, .tbz2

## 打包

```bash
# 打包
tar -cf /tmp/dist.tar /etc

# 打包并 gzip 压缩
tar -czf /tmp/dist.tar.gz /etc

# 打包并 bzip2 压缩
tar -cjf /tmp/dist.tar.bz2 /etc
```

## 解压

```bash
# 解压到当前目录
tar -xf /tmp/dist.tar

# 解压到指定目录
tar -xf /tmp/dist.tar -C /target/directory

# 解压 tar.gz
tar -xzf /tmp/dist.tar.gz

# 解压 tar.bz2
tar -xjf /tmp/dist.tar.bz2
```

## 其他操作

```bash
# 向 tar 包追加文件
tar -rf FileName.tar *.gif

# 更新 tar 包中的文件
tar -uf FileName.tar logo.gif

# 查看 tar 包内容
tar -tf FileName.tar

# 解压 tar 包
tar -xf FileName.tar
```
