# GitHub 使用文档

本文包含部分 Vercel 和 Netlify 的内容

### 删除 Contributors 记录

在确保没有该用户的 commit 记录后，随便修改掉默认分支的名称，然后再改回来

### 利用 Action 发布 releases

```yml
on:
  push:
    tags:
      - 'v*.*.*'

permissions:
  contents: write

- name: GH Release
  uses: softprops/action-gh-release@v2
  env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    files: dist/*
```

### 基础使用教程

注册账号，安装配置 git，创建仓库，生成 Token 等步骤略过，不做描述

本文仅讨论使用 GitHub 用户 Token 上传，而非 SSH

以下假设 GitHub 的用户名是 atri，仓库名为 test

#### 1. 在本地拉取储存库

```sh
git clone https://github.com/atri/test.git
```

#### 2. 配置 git 用户信息

进入上述拉取的储存库目录，随后配置用户名，邮箱信息

命令后加上 `--global` 意味全局配置，不加则仅配置当前储存库的 git 用户信息

```sh
git config user.name "atri"
git config user.email "atri<atri@gmail.com>"
```

#### 3. 更新仓库到 GitHub

自行对储存库的内容进行修改，确认

```sh
git add .
git commit -m "对此次修改的注释，可随便填写"
```

上传到 GitHub，如果出现错误提示，按提示进行对应输入即可，以后的再上传仅需输入 `git push`

```sh
git push origin main
```

接着输入 GitHub 的用户名，以及 GitHub 用户 Token 即可

### 利用 Action 发布 ghpage

```yml
permissions:
  pages: write
  id-token: write

environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}

- name: Upload GitHub Pages artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: '.'

- name: Deploy GitHub Pages site
  id: deployment
  uses: actions/deploy-pages@v4
```

### 下载源代码存档

仓库分支存档的下载链接：github.com/USER/REPO/archive/refs/heads/BRANCH.tar.gz

Release 最新版本的下载链接：github.com/USER/REPO/releases/latest/download/ASSETS.tar.gz

### Action Repository 机密

```console
${{ secrets.SECRET_NAME }}
```

### Vercel

#### 命令行更新发布项目

需要配置环境变量 VERCEL_ORG_ID 和 VERCEL_PROJECT_ID，每一条命令设置 `--token=` 的值

```sh
vercel pull --yes --environment=production
vercel build --prod
vercel deploy --prebuilt --prod
```

#### 命令行删除历史部署记录

```sh
vercel remove project-name --safe
```

### Netlify

#### 命令行更新发布项目

需要配置环境变量 NETLIFY_AUTH_TOKEN 和 NETLIFY_SITE_ID

```sh
netlify link
netlify build
netlify deploy --dir=dist/ --prod
```
