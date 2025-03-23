# VS Code 代码编辑器

Visual Studio Code 是一款由微软开发且跨平台的免费源代码编辑器

https://code.visualstudio.com

## 安装

- Linux

Arch 系从 Aur 安装 `visual-studio-code-bin`，其他发行版在此不做介绍

- WIndows

官网下载安装

- Web

服务器端网页版 VS Code 见 code-server，在此不多做介绍

https://github.com/coder/code-server

## 快捷键

- `shift`+`alt`+`鼠标拖动`，出现多个光标
- `ctrl`+`alt`+`↑/↓`，在同一列出现多个光标
- 选中文字，按 `SHIFT`+`ALT`+`I`，每行末尾出现光标
- `CTRL`+`SHIFT`+`END/HOME`，向下/上选中所有行
- `ALT`+`SHIFT`+`F`，格式化代码
- 选中文字，按 `CTRL`+`SHIFT`+`U/I`，大/小写转换
- `CTRL`+`/`，注释选定的行

## 常见问题

- 自动备份文件夹

Windows 路径：%APPDATA%\Code\User\History

- 切换终端的默认 shell

Launch Profile - Set Default Profile

- 设置项

```json
// 编辑器字体
"editor.fontFamily": "Source Code Pro, 思源黑体"

// 忽略文件
"files.exclude": {
  "*.code-workspace": true
}

// JavaScript 格式化时自动添加分号
"javascript.format.semicolons": "insert"
```

- 离线安装插件

在插件页面，选择 Install from VSIX...

## 扩展推荐

- Chinese (Simplified) 简体中文界面
- Live Server 静态网页服务器
- Office Viewer 实时渲染的 Md 文档
- Cdoe Runner 运行代码

---

浅色主题

- GitHub Light Theme
- Office Theme

深色主题

- One Dark Pro

---

- rust-analyzer，Rust
- PHP Intelephense，PHP
- Go，Go
