# Git 同步远程已删除分支

## 查看所有分支

```bash
# 查看本地分支
git branch

# 查看远程分支
git branch -r
```

## 查看已合并的分支

```bash
git branch --merged
```

## 删除本地分支

```bash
# 普通删除（已合并）
git branch -d branch_name

# 强制删除
git branch -D branch_name
```

## 清理远程已删除分支

### 方法一：prune

```bash
# 同步远程分支列表
git fetch -p

# 或者
git remote prune origin
```

### 方法二：手动删除

```bash
# 查看远程分支
git branch -r | grep origin | grep -v '>'

# 逐个删除
git push origin --delete old_branch
```

## 自动清理脚本

创建别名：

```bash
git config --global alias.cleanup '!git fetch -p && git remote prune origin'
```

使用：

```bash
git cleanup
```
