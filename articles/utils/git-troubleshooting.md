# Git 常见报错及解决办法

## 1. git pull 报错： refusing to merge unrelated histories

```bash
# 解决方法：添加 --allow-unrelated-histories
git pull origin master --allow-unrelated-histories
```

## 2. 合并分支时报错：Merge conflict

```bash
# 查看冲突文件
git status

# 手动解决冲突后
git add <resolved-file>
git commit
```

## 3. 撤销 git add

```bash
# 撤销单个文件
git reset HEAD filename

# 撤销所有
git reset HEAD
```

## 4. 修改提交信息

```bash
# 修改最后一次提交
git commit --amend -m "new message"
```

## 5. 删除远程分支

```bash
git push origin --delete branch_name
```

## 6. .gitignore 不生效

```bash
# 清除缓存
git rm -r --cached .
git add .
git commit -m "update .gitignore"
```

## 7. SSL 证书问题

```bash
git config --global http.sslVerify false
```

## 8. 重置到某个提交

```bash
# 保留修改
git reset --soft HEAD~1

# 不保留修改
git reset --hard HEAD~1
```

## 9. 暂存工作区修改

```bash
# 暂存
git stash

# 恢复
git stash pop

# 列表
git stash list
```

## 10. 查看远程仓库地址

```bash
git remote -v
```
