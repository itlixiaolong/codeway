# Linux 基本命令操作

## 1. grep 命令

### 基本搜索

```bash
grep "react" index.js          # 在 index.js 中查找 react 字符串
grep -i "React" index.js        # 忽略大小写
grep -c "react" index.js        # 统计匹配的行数
grep -v "react" index.js        # 排除包含 react 的行
```

### 递归搜索

```bash
grep vue . -r -n                 # 在当前目录下递归搜索
```

### 上下文搜索

```bash
grep -A 4 'pattern' file        # 显示匹配行及其后4行
grep -B 4 'pattern' file         # 显示匹配行及其前4行
grep -C 4 'pattern' file        # 显示匹配行及其前后各4行
```

## 2. cat 命令

```bash
cat index.js                     # 读取并显示文件内容
cat index.js > test.js          # 复制文件内容
```

## 3. echo 命令

```bash
echo "test text"                 # 输出文本到终端
```

## 4. touch 命令

```bash
touch text.js                   # 创建空文件
```

**cat vs touch**：
- cat 用于创建包含内容的文件
- touch 创建一个空文件

## 5. tail 命令

```bash
tail text.js                    # 显示文件最后10行
tail -f text.js                # 实时追踪文件变化（用于日志）
```

## 6. find 命令

```bash
find . -name text.js            # 按文件名查找
find . -name "*.js"             # 查找所有 JS 文件
```

## 7. mv 命令

```bash
mv index.js ../utils            # 移动文件
```

## 8. ln 命令（软链接）

```bash
ln -s /etc/hosts ~/hosts        # 创建软链接
```

## 9. ls 命令

```bash
ls -a ~                         # 显示所有文件（包括隐藏文件）
ls -l ~                         # 显示详细信息
ls -d ~                         # 仅显示目录本身
ls -al ~                        # 组合使用
ls -lh ~                        # 文件大小以易读格式显示
ls -lt ~                        # 按时间排序
ls -ltr ~                       # 逆序按时间排序
```

## 10. pwd 命令

```bash
pwd                             # 显示当前目录
pwd -P                          # 显示实际路径（不是链接）
```

## 11. 统计文件个数

```bash
# 不包括子目录
ls -l | grep "^-" | wc -l
find ./ -maxdepth 1 -type f | wc -l

# 包括子目录
find ./ -type f | wc -l
```
