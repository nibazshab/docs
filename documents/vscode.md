# VS Code 代码编辑器

[Visual Studio Code](https://code.visualstudio.com) 是一款由微软开发且跨平台的免费源代码编辑器

## 安装

Arch 系的 Linux 系统，从 Aur 安装 `visual-studio-code-bin` 即可，其他请参考各自的安装方法，或前往 [https://code.visualstudio.com/Download](https://code.visualstudio.com/Download) 下载对应的包安装

Windows 系统直接前往 [https://code.visualstudio.com/Download](https://code.visualstudio.com/Download) 下载安装即可

> 服务器端个人部署网页版 VS Code 见 [code-server](https://github.com/coder/code-server)，在此不多做介绍

## 常用操作记录

- `shift`+`alt`+`鼠标拖动`，出现多个光标
- `ctrl`+`alt`+`↑/↓`，在同一列出现多个光标
- 选中文字，按 `SHIFT`+`ALT`+`I`，每行末尾出现光标
- `CTRL`+`SHIFT`+`END/HOME`，向下/上选中所有行
- `ALT`+`SHIFT`+`F`，格式化代码
- 选中文字，按 `CTRL`+`SHIFT`+`U/I`，大/小写转换
- `CTRL`+`/`，注释选定的行

### 自动备份文件夹

Windows 路径：%APPDATA%\Code\User\History

### 切换终端的默认 shell

Launch Profile - Set Default Profile

## 设置项

```json
"editor.fontFamily": "Source Code Pro, 思源黑体"

"files.exclude": {
  "*.code-workspace": true
}
```

## 离线安装插件

在插件页面，选择 _Install from VSIX..._

## 扩展推荐

- Chinese (Simplified) 简体中文界面
- Live Server 静态网页服务器
- Office Viewer 实时渲染的 Md 文档
- Cdoe Runner 运行代码

---

- 浅色主题
  - GitHub Light Theme
  - Office Theme
- 深色主题
  - One Dark Pro
