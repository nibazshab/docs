# Git 基本使用指南

基本使用

```sh
# 撤销某次提交，但不删除记录
git revert

# 查看本地操作历史
git reflog

# 查看更改，--staged 查看已暂存的更改，加 commit_id 可与指定版本比较
git diff

# 设置远程地址
git remote set-url origin URL

# 添加标签，推送标签
git tag v1.0.0
git push origin v1.0.0

# 切换到 main 分支，分支不存在则创建
git checkout -b main

# 删除 pr 分支
git branch -d pr

# 查看所有分支
git branch -a

# 清除已不存在于远程服务器上的远程分支
git remote prune origin

# 查看信息
git status

# 撤销上一次的 commit
git reset HEAD~1

# 回退到指定 commit_id
git reset --hard COMMIT_ID

# 查找历史提交中，文件名有 NAME 的文件
git log --all --full-history -- **/*NAME*

# 搜索提交记录的 commit_id
git log --grep=内容

# 查找历史中的文本内容
git log -S "查找的文本内容" -p
```

#### 修改文件时间

将文件的修改时间设置为最新修改时间

```sh
git ls-files -z | while read f
do
  touch -d $(git log -1 --format=@%ct $f) $f
done
```

获取所有文件的最初创建时间

```sh
git ls-tree -r --name-only HEAD | while read f
do
  echo $(git log --format=%ad -- $f | tail -1) $f
done
```

获取所有文件的最新修改时间

```sh
git ls-tree -r --name-only HEAD | while read f
do
  echo $(git log -1 --format=%ad -- $f) $f
done
```

#### 清空历史提交记录

从现有提交创建一个新分支，删除原有分支

```sh
git checkout --orphan latest_branch
git add -A
git commit -m "Initial commit"
git branch -d main
git branch -m main
git push -f origin main
```

#### 转换 CRLF 和 LF

```sh
git config --global core.autocrlf true
```

解决 Windows 平台与 Linux / Mac OS 的换行符问题

#### 指定 commit 时间

```sh
GIT_COMMITTER_DATE="Jan 1 07:02:01 2024 +0000" git commit --date="Jan 1 07:02:01 2024 +0000" -m "Initial commit"
```

如果要修改 GitHub 上的时间，需要加上环境变量

#### 配置用户信息

```sh
git config user.name "atri"
git config user.email "atri<atri@gmail.com>"
```

加上 --global 参数为全局配置

#### SSH 连接 GitHub

打开 GitHub，Settings，SSH and GPG keys，SSH keys，New SSH key，选择 Authentication Keys 项，填入公钥内容

```sh
ssh -T git@github.com
> Hi USERNAME! You've successfully authenticated, but GitHub does not
> provide shell access.
```

#### SSH 签名提交

使用 SSH 密钥签名，signingkey 后面为公钥路径

```sh
git config --global gpg.format ssh
git config --global user.signingkey /path/.ssh/key.pub
```

配置 commit 和 tag 自动签名

```sh
git config --global commit.gpgsign true

# tag 签名后，无法再使用轻标签，必须写注释
git config --global tag.gpgsign true
```

在 GitHub 设置中添加 SSH key，选择 Signing key 项，填入公钥内容

#### 自建 Git 仓库

开源的 Git 服务器工具也有许多，例如 GitLab、Gitea、Gogs，但自己配置起来较为困难，如果只是想保存代码，可以直接使用 git 搭配 ssh 实现

假定服务器 IP 地址 192.168.1.2，服务器用户 root，代码仓库名称 atri，代码仓库的分支名称 main

1. 连接服务器

生成密钥，输入如下命令，然后按三次回车

```sh
ssh-keygen -t ed25519
```

Linux 默认生成的位置是 `~/.ssh`，Windows 是在 `%HOMEPATH%\.ssh`

该目录下会生成私钥文件 id_ed25519 和公钥文件 id_ed25519.pub，将公钥的内容写入到服务器 ~/.ssh/ 目录下的 authorized_keys 文件中

2. 创建远程仓库

在服务器创建没有工作空间的裸库，如果希望有具体项目文件，则去掉 --bare 参数

```sh
ssh root@192.168.1.2 git init --bare atri.git
```

3. 提交代码到服务器

添加远程仓库的地址，并起别名为 vps

```sh
git remote add vps root@192.168.1.2:atri.git
```

将本地的 main 分支推送过去

```sh
git push vps main
```
