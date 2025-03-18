# SaaS 常见平台文档

## GitHub

#### 删除 Contributors 记录

在确保没有该用户的 commit 记录后，随便修改掉默认分支的名称，然后再改回来

#### 利用 Action 发布 releases

```yml
on:
  push:
    tags:
      - 'v*.*.*'

permissions:
  contents: write

- uses: softprops/action-gh-release@v2
  env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    files: dist/*
```

#### 利用 Action 发布 ghpage

```yml
permissions:
  pages: write
  id-token: write

environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}

- uses: actions/upload-pages-artifact@v3
  with:
    path: '.'

- id: deployment
  uses: actions/deploy-pages@v4
```

#### 下载存档

仓库分支存档的下载链接：github.com/USER/REPO/archive/refs/heads/BRANCH.tar.gz

Release 最新版本的下载链接：github.com/USER/REPO/releases/latest/download/ASSETS.tar.gz

#### Pull requests 教程

假设被 Pr 的仓库是 atri/momo，自己用户名为 sjw

点击 atri/momo 仓库右上角的 Fork，该仓库会被复制为 sjw/momo，在 sjw/momo 里修修改改提交，然后点击 Contribute，再点击 Open a Pull 即可提交 Pr 申请

在 atri/momo 的 Pull requests 列表中会出现刚刚 sjw 发起的申请，点击 Merge pull request 即可完成合并

## Vercel

#### 命令行更新发布项目

需要配置环境变量 VERCEL_ORG_ID，VERCEL_PROJECT_ID，VERCEL_TOKEN

```sh
vercel pull --yes --environment=production
vercel build --prod
vercel deploy --prebuilt --prod
```

#### 命令行删除历史部署记录

```sh
vercel remove project-name --safe
```

## Netlify

#### 命令行更新发布项目

需要配置环境变量 NETLIFY_AUTH_TOKEN 和 NETLIFY_SITE_ID

```sh
netlify link
netlify build
netlify deploy --dir=dist/ --prod
```
