# Git 库的操作流程

## 1. 初始化仓库

```bash
git init
```

## 2. 添加远程仓库

```bash
git remote add origin https://github.com/username/repo.git
```

## 3. 克隆仓库

```bash
git clone https://github.com/username/repo.git
```

## 4. 创建分支

```bash
# 创建并切换
git checkout -b feature-name

# 或者
git branch feature-name
git checkout feature-name
```

## 5. 提交代码

```bash
git add .
git commit -m "commit message"
```

## 6. 推送分支

```bash
git push -u origin feature-name
```

## 7. 合并分支

```bash
# 切换到主分支
git checkout master

# 合并
git merge feature-name
```

## 8. 拉取代码

```bash
# 拉取并合并
git pull origin master

# 或者
git fetch origin
git merge origin/master
```

## 9. 删除分支

```bash
# 删除本地
git branch -d feature-name

# 删除远程
git push origin --delete feature-name
```

## 10. 查看状态和日志

```bash
git status
git log
git log --oneline
```
