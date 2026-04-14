# Linux 文件属性和权限操作

## 文件属性

```bash
drwxr-xr-x  10 admin  staff   320B Jan 26 23:43 teach
```

| 部分 | 说明 |
|------|------|
| drwxr-xr-x | 文件类型和权限 |
| 10 | 硬链接数 |
| admin | 所属用户 |
| staff | 所属组 |
| 320B | 文件大小 |
| Jan 26 23:43 | 创建日期 |
| teach | 文件名 |

## 文件类型

| 字符 | 类型 |
|------|------|
| - | 普通文件 |
| d | 目录 |
| l | 符号链接 |
| c | 字符设备文件 |
| b | 块设备文件 |
| p | 管道文件 |
| s | 套接字 |

## 权限

Linux 只有 rwx 三种权限：
- **r (Read)**: 读取文件/浏览目录
- **w (Write)**: 修改文件/移动目录内文件
- **x (eXecute)**: 执行文件/进入目录

## 权限表示

```
d | rwx | rwx | rwx
  | User| Group| Others
```

## 修改权限

### 方式一：使用 rwx

```bash
chmod [ugo][=+-][rwx] filename
# u: 当前用户
# g: 用户组
# o: 其他用户
# a: 所有用户

chmod u+x file          # 添加执行权限
chmod g-w file          # 移除写权限
chmod a=r file          # 设置只读
```

### 方式二：使用八进制数字

| 权限 | 数字 |
|------|------|
| rwx | 7 |
| rw- | 6 |
| r-x | 5 |
| r-- | 4 |
| -wx | 3 |
| -w- | 2 |
| --x | 1 |
| --- | 0 |

```bash
chmod 777 filename      # rwxrwxrwx
chmod 755 filename      # rwxr-xr-x
chmod 644 filename      # rw-r--r--
```

## 修改所有者/所属组

```bash
chown user file                 # 修改所有者
chown :group file               # 修改所属组
chown user:group file           # 同时修改
chgrp group file                # 修改所属组（仅组）
```
