# Zsh 下的 Git 快捷键配置

## 1. 安装 oh-my-zsh

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools.sh)"
```

## 2. 启用 Git 插件

编辑 `~/.zshrc`：

```bash
plugins=(git)
```

## 3. Git 别名

```bash
# ~/.zshrc

# Git
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git pull'
alias gb='git branch'
alias gco='git checkout'
alias gd='git diff'
alias gcb='git copy-branch-name'
alias gf='git fetch'
alias gm='git merge'
alias gr='git rebase'
alias glog='git log --oneline --graph --decorate'
```

## 4. 常用快捷命令

| 命令 | 说明 |
|------|------|
| `gst` | git status |
| `gco` | git checkout |
| `gcmsg` | git commit -m |
| `gcp` | git cherry-pick |
| `grh` | git reset HEAD |
| `grhh` | git reset HEAD --hard |

## 5. 自动补全

oh-my-zsh 自带 Git 命令补全，输入 `gco <tab>` 可以自动补全分支名。

## 6. 分支提示

在提示符中显示当前分支：

```bash
# 已在 git 插件中默认支持
# 格式：[分支名]
```

## 7. 自定义提示符

```bash
# ~/.zshrc
ZSH_THEME="agnoster"
```

## 8. 常用工作流

```bash
# 创建并切换分支
gcb feature/new-feature

# 暂存所有更改
ga .

# 提交
gcmsg "feat: add new feature"

# 推送到远程
gp -u origin feature/new-feature
```
