# Android 玩机指南

::: danger 警告
操作千万条，备份第一条，刷机不规范，机主两行泪

解锁 Bootloader 后，先备份字库和基带
:::

## ADB 调试工具

- 传送门：[https://developer.android.com/studio/releases/platform-tools](https://developer.android.com/studio/releases/platform-tools)
- 驱动传送门：[https://developer.android.com/studio/run/win-usb](https://developer.android.com/studio/run/win-usb)

ADB 是一个命令行工具，用于与运行 Android 操作系统的设备进行通信

### 命令

- adb

```sh
adb devices #检测设备
adb shell pm disable-user PACKAGE_NAME # 冻结应用
adb shell pm enable PACKAGE_NAME # 解冻应用
adb shell pm list packages -s -d # 列出已冻结的应用
adb install APK # 安装应用
adb reboot bootloader/recovery/fastboot # 重启到指定模式
```

- fastboot

```sh
fastboot devices # 检测设备
fastboot flash PARTITION IMG # 刷写分区镜像
fastboot reboot # 重启到系统
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img # 关闭 avb 验证
```

- 特定品牌工具

1. 鸿蒙系统，鸿蒙工具箱
2. VIVO 手机，root 使用 suu

### 常见问题

- Windows 装不上 adb 驱动

解压 usb_driver_windows.zip，找到 android_winusb.inf

打开设备管理器，其他设备，找到带有 `!` 的 Android 驱动，更新驱动程序，从磁盘安装，选中解压后的 android_winusb.inf 文件，下一步，安装即可

- SD 卡提示无法使用此目录

Magisk 模块：no storage restrict

## iOS

- 系统结构

Apple Music 缓存路径 /var/mobile/Media/CloudAssets，/var/mobile/Media/iTunes_Control/Music

图片路径 /var/mobile/Media/DCIM

- 解决爱思助手自动安装移动版

删掉 C 盘 Program Files (x86)\i4Tools7\files\ipa\ 内的文件
