# VS Code 代码编辑器

[Visual Studio Code](https://code.visualstudio.com) 是一款由微软开发且跨平台的免费源代码编辑器。该软件支持语法高亮、代码自动补全、代码重构功能，并且内置了命令行工具和 Git 版本控制系统。用户可以更改主题和键盘快捷方式实现个性化设置，也可以通过内置的扩展程序商店安装扩展以拓展软件功能

## 安装

Arch 系的 Linux 系统，从 Aur 安装 `visual-studio-code-bin` 即可，其他请参考各自的安装方法，或前往 [https://code.visualstudio.com/Download](https://code.visualstudio.com/Download) 下载对应的包安装

Windows 系统直接前往 [https://code.visualstudio.com/Download](https://code.visualstudio.com/Download) 下载安装即可

> 服务器端个人部署网页版 VS Code 见 [code-server](https://github.com/coder/code-server)，在此不多做介绍

## 自动备份文件夹

Windows 路径：%APPDATA%\Code\User\History

## 设置项

```json
"editor.fontFamily": "Source Code Pro, 思源黑体"

"files.exclude": {
  "*.code-workspace": true
}
```

## 离线安装插件

在插件页面，选择 _Install from VSIX..._

## 快捷键记录

|快捷键|-|
|-|-|
|CTRL+SHIFT+END/HOME|向下/上选中所有行|
|Alt + Shift + F|格式化代码|
|Ctrl + Shift + U/I|大/小写转换|
|Ctrl + /|注释选定的行|

## 扩展推荐

### 编程语言

- Python
  - [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
  - [Black Formatte](https://marketplace.visualstudio.com/items?itemName=ms-python.python)

- Go
  - [Go](https://marketplace.visualstudio.com/items?itemName=golang.Go)

- Rust
  - [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

- C/C++
  - [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)

### 实用工具

- Chinese (Simplified) 简体中文界面
- Live Server 静态网页服务器
- Office Viewer 实时渲染的 Md 文档
- Cdoe Runner 运行代码

### 主题样式

- 浅色主题
  - GitHub Light Theme
  - Office Theme

- 深色主题
  - One Dark Pro
