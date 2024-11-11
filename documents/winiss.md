# Windows 10 指北

本文内容收集自网络，请自行甄别是否适用

## 常见问题

### 取消默认文件打开方式

1. HKEY_CLASSES_ROOT 删除指定文件类型
2. HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\FileExts 删除指定文件类型
3. 重启资源管理器

### SMB 共享文件夹

1. 属性 - 共享 - 共享 - 添加 Everyone 用户，给予权限
2. 属性 - 共享 - 高级共享 - 勾选 _共享此文件夹_
3. 属性 - 共享 - 高级共享 - 权限 - 选择 Everyone 用户，给予权限

### 输入的最后一个产品密钥不能用于此 Windows 副本

1. 注册表编辑器
2. 打开 HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\SoftwareProtectionPlatform
3. 查看 BackupProductKeyDefault 的值，并复制
4. 设置 - 更新和安全 - 激活，选择 _更改产品密钥_
5. 粘贴刚刚复制的密钥，下一步，激活

### 笔记本插电时保持小功率

1. 电源选项
2. 创建电源计划
3. 勾选 _节能_

### 安装 AppX/MSIX

1. 管理员权限打开 PowerShell
2. 输入 Add-AppxPackage app.AppxBundle

### 系统处于测试签名模式

1. 管理员权限打开 PowerShell
2. 输入 bcdedit /set testsigning off

### 加载驱动程序

1. 设备管理器
2. 更新驱动程序
3. 浏览我的电脑以查找驱动程序
4. 让我从计算机上的可用驱动程序列表中选取
5. 显示所有设备，下一步
6. 从磁盘中选择，找到 inf 文件

### 删除文件管理器类型关联

1. 注册表编辑器
2. 删除 HKEY_CLASSES_ROOT 的键值
3. 删除 HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\FileExts 的键值
4. 重启资源管理器

### 强制删除脚本

1. 创建一个 bat 文件，写入如下内容
2. 将要删除的文件拖到该文件上

```bat
DEL /F /A /Q \\?\%1
RD /S /Q \\?\%1
```

### PATH 环境变量

1. 系统
2. 高级系统设置
3. 环境变量

## 系统优化

### 处理 Microsoft Edge

建议直接卸载了事。卸载工具：[https://github.com/ShadowWhisperer/Remove-MS-Edge](https://github.com/ShadowWhisperer/Remove-MS-Edge)

::: details 禁用自动更新
1. 计算机管理
2. 服务和应用程序
3. 禁用 _Microsoft Edge Update Service (edgeupdate)，Microsoft Edge Update Service (edgeupdatem)，Microsoft Edge Elevation Service (MicrosoftEdgeElevationService)_
4. 创建空文件，替换掉 %PROGRAMFILES(X86)%/Microsoft/EdgeUpdate/MicrosoftEdgeUpdate.exe
:::

### 降低 Win 安全中心的占用

1. win+r 输入 gpedit.msc
2. 打开 _计算机配置 - 管理模板 - Windows 组件 - Microsoft Defender 防病毒 - 扫描_
3. 点击 _指定扫描期间 CPU 使用率的最大百分比_
4. 左侧选择 _已启用_，并将数值设为 5

### 启用 PDF 虚拟打印机

1. 控制面板
2. 程序和功能
3. 启用或关闭 Windows 功能
4. 勾选 _Microsoft Print to PDF_

### 关闭睡眠和锁定按钮

1. 电源选项
2. 选择电源按钮功能
3. 更改当前不可用的设置
4. 取消勾选 _睡眠，锁定_

### 软连接系统截图目录

将 Win+Shift+S 截图链接到 _图片/截图_ 目录

1. 管理员权限打开 CMD
2. 输入 mklink /d %HOMEPATH%\Pictures\截图 %LOCALAPPDATA%\Packages\MicrosoftWindows.Client.CBS_cw5n1h2txyewy\TempState\ScreenClip

### 开启 UTF-8 语言环境

1. 时间和语言
2. 语言
3. 管理语言设置
4. 更改系统区域设置
5. 勾选 _使用 Unicode UTF-8 提供全球语言支持_

如打开 GBK 编码文件时出现乱码的情况，请使用转区工具解决

### 禁用收集体验信息服务

1. 计算机管理
2. 服务和应用程序
3. 禁用 _Connected User Experiences and Telemetry_

### 修改动画效果

1. 系统
2. 高级系统设置
3. 性能
4. 勾选 _平滑屏幕字体边缘，显示缩略图，显示亚透明的选择长方形，在窗口下显示阴影_

### 将硬件时间视为 UTC 时间

1. 管理员权限打开 PowerShell
2. 输入 Reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1

## 快捷键

|键位|功能|
|-|-|
|Win + Q|搜索|
|Win + D|切换桌面|
|Win + L|锁定屏幕|
|Alt + Tab|切换任务|
|Win + Tab|打开任务视图|
|Ctrl + Shift + Esc|打开任务管理器|
|Ctrl + A / C / V / X|全选 / 复制 / 粘贴 / 剪切|
|Ctrl + Z / Y|撤销 / 重做|
|Ctrl + W / Alt + F4|关闭当前活动窗口|
|Win + PrtScn|保存截屏到图片|

## 特殊文件夹

|路径|说明|
|-|-|
|%LOCALAPPDATA%\Programs|用户级程序目录|
|%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup|用户级开机自启目录|
|%PROGRAMDATA%\Microsoft\Windows\Start Menu\Programs\StartUp|系统级开机自启目录|

## 环境变量

|变量名|变量值|
|-|-|
|%APPDATA%|C:\Users\Username\AppData\Roaming|
|%WINDIR%|C:\Windows|
|%COMMONPROGRAMFILES%|C:\Program Files\Common Files|
|%COMMONPROGRAMFILES(x86)%|C:\Program Files (x86)\Common Files|
|%SYSTEMDRIVE%|C:|
|%HOMEPATH%|C:\Users\Username|
|%LOCALAPPDATA%|C:\Users\Username\AppData\Local|
|%PROGRAMDATA%|C:\ProgramData|
|%PROGRAMFILES%|C:\Program Files|
|%PROGRAMFILES(X86)%|C:\Program Files (x86)|
|%ALLUSERSPROFILE%|C:\ProgramData|
|%COMMONPROGRAMW6432%|C:\Program Files\Common Files|
|%COMPUTERNAME%|Hostname|
|%COMSPEC%|C:\WINDOWS\system32\cmd.exe|
|%HOMEDRIVE%|C:|
|%LOGONSERVER%|\\\MicrosoftAccount|
|%OS%|Windows_NT|
|%PROGRAMW6432%|C:\Program Files|
|%PUBLIC%|C:\Users\Public|
|%TEMP%|C:\Users\Username\AppData\Local\Temp|
|%TMP%|C:\Users\Username\AppData\Local\Temp|
|%USERDOMAIN%|Hostname|
|%USERNAME%|Username|
