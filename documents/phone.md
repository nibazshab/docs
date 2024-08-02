# Android 玩机指南

::: danger 警告
操作千万条，备份第一条，刷机不规范，机主两行泪

解锁 Bootloader 后，先备份字库和基带
:::

本文包含部分 iOS 内容

## ADB 调试工具

- 传送门：[https://developer.android.com/studio/releases/platform-tools](https://developer.android.com/studio/releases/platform-tools)
- 驱动传送门：[https://developer.android.google.cn/studio/run/win-usb](https://developer.android.google.cn/studio/run/win-usb)

ADB 是一个命令行工具，用于与运行 Android 操作系统的设备进行通信。通过 ADB，开发人员可以在计算机上使用命令来管理和调试 Android 设备，例如安装应用程序、复制文件、发送 shell 命令等。ADB 还提供了许多有用的功能，如日志记录、端口转发、屏幕截图

- `adb devices` 检测设备
- `adb shell pm disable-user PACKAGE_NAME` 冻结应用
- `adb shell pm enable PACKAGE_NAME` 解冻应用
- `adb shell pm list packages -s -d` 列出已冻结的应用
- `adb install APK` 安装应用
- `adb reboot bootloader/recovery/fastboot` 重启到指定模式
- `fastboot devices` 检测设备
- `fastboot flash PARTITION IMG` 刷写分区镜像
- `fastboot reboot` 重启到系统
- `fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img` 关闭 avb 验证

## 常见问题

### SD 卡无法使用此目录

Magisk 模块：no storage restrict

## 品牌工具

鸿蒙系统：鸿蒙工具箱

VIVO 手机：root 使用 suu

---

## iOS

### 系统结构

Apple Music 缓存路径：`/var/mobile/Media/CloudAssets`，`/var/mobile/Media/iTunes_Control/Music`

图片路径：`/var/mobile/Media/DCIM`

### 常见问题

#### 关闭爱思助手自动安装移动版

删掉 C 盘 `Program Files (x86)\i4Tools7\files\ipa\` 内的文件
