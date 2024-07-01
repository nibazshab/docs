# 自建 Git 代码仓库

现成的代码托管服务有很多，例如 GitHub、GitLab、Bitbucket 等，但因为一些特殊的网络原因，它们有时会出现连接不上的情况。于是乎，考虑自己搭建 Git 服务器

## 选择

开源的 Git 服务器工具也有许多，例如 GitLab、Gitea、Gogs，但自己配置起来较为困难

如果只是想保存代码，可以直接使用 git 搭配 ssh 实现

## 连接服务器

生成密钥，输入如下命令，然后按三次回车

```sh
ssh-keygen -t ed25519
```

Linux 默认生成的位置是 `~/.ssh`，Windows 是在 `%HOMEPATH%\.ssh`

该目录下会生成私钥文件 id_ed25519 和公钥文件 id_ed25519.pub，将公钥的内容写入到服务器 ~/.ssh/ 目录下的 authorized_keys 文件中

## 假定情景

服务器 IP 地址 192.168.1.2，服务器用户 root

代码仓库名称 atri，代码仓库的分支名称 main

## 创建远程仓库

在服务器创建没有工作空间的裸库，如果希望有具体项目文件，则去掉 --bare 参数

```sh
ssh root@192.168.1.2 git init --bare atri.git
```

## 提交代码到服务器

添加远程仓库的地址，并起别名为 vps

```sh
git remote add vps root@192.168.1.2:atri.git
```

将本地的 main 分支推送过去

```sh
git push vps main
```
