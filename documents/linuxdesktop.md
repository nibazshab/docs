# Linux 桌面日常

内容收集自网络，请自行甄别是否适用

### 快捷键切换 TTY 环境

`Ctrl`+`Alt`+`Fn`

### GNOME 主题修改，顶栏半透明

GNOME Shell 主题被存储为二进制文件 `/usr/share/gnome-shell/gnome-shell-theme.gresource`，运行 extractgst.sh 拆包脚本，在 `$HOME` 目录得到主题配置文件

::: details extractgst.sh
```sh
#!/bin/sh
gst=/usr/share/gnome-shell/gnome-shell-theme.gresource
workdir=$HOME
for r in `gresource list $gst`; do
  r=${r#\/org\/gnome\/shell/}
  if [ ! -d $workdir/${r%/*} ]; then
    mkdir -p $workdir/${r%/*}
  fi
done
for r in `gresource list $gst`; do
  gresource extract $gst $r >$workdir/${r#\/org\/gnome\/shell/}
done
```
:::

将主题配置文件 gnome-shell.css 中的 #panel 模块里的 background-color 的值修改为 `rgba(0,0,0,0.6)`

输入 `glib-compile-resources gnome-shell-theme.gresource.xml` 指令按照 gnome-shell-theme.gresource.xml 打包配置文件，将主题重新打包成二进制文件，替换原来的主题，重启 GNOME Shell

::: details gnome-shell-theme.gresource.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<gresources>
  <gresource prefix="/org/gnome/shell/theme">
    <file>calendar-today.svg</file>
    <file>calendar-today-light.svg</file>
    <file>checkbox.svg</file>
    <file>checkbox-focused.svg</file>
    <file>checkbox-off-focused-light.svg</file>
    <file>checkbox-off-focused.svg</file>
    <file>checkbox-off-light.svg</file>
    <file>checkbox-off.svg</file>
    <file>gnome-shell.css</file>
    <file>gnome-shell-high-contrast.css</file>
    <file>gnome-shell-start.svg</file>
    <file>pad-osd.css</file>
    <file>process-working.svg</file>
    <file>toggle-off.svg</file>
    <file>toggle-off-hc.svg</file>
    <file>toggle-off-light.svg</file>
    <file>toggle-on.svg</file>
    <file>toggle-on-hc.svg</file>
    <file>toggle-on-light.svg</file>
    <file>workspace-placeholder.svg</file>
  </gresource>
</gresources>
```
:::

[更多](https://wiki.archlinux.org/title/GDM#Configuration)

### 开启内核级显示模式设置

KMS 通常是在 initramfs stage 之后开始初始化，但是也可以在 initramfs 的阶段启用

将视频驱动模块加入 `/etc/mkinitcpio.conf` 的 MODULES= 里，使用 `mkinitcpio -P` 指令重新生成内核

- AMD GPU 加入 `amdgpu`，老的 ATI 驱动加入 `radeon`
- Intel GPU 加入 `i915`
- NVIDIA 驱动的 `nvidia nvidia_modeset nvidia_uvm nvidia_drm`，详见 [NVIDIA#DRM kernel mode setting](https://wiki.archlinux.org/title/NVIDIA#DRM_kernel_mode_setting)

为了避免更新 NVIDIA 驱动之后忘了更新 initramfs，建议使用 Pacman Hooks 自动生成新内核，将以下内容添加到 `/etc/pacman.d/hooks/nvidia.hook`

```ini
[Trigger]
Operation=Install
Operation=Upgrade
Operation=Remove
Type=Package

Target=nvidia
Target=linux

[Action]
Description=Updating NVIDIA module in initcpio
Depends=mkinitcpio
When=PostTransaction
NeedsTargets
Exec=/bin/sh -c 'while read -r trg; do case $trg in linux*) exit 0; esac; done; /usr/bin/mkinitcpio -P'
```

[更多](https://wiki.archlinux.org/title/Kernel_mode_setting#Early_KMS_start)

### GDM 以 x11 运行在 NVIDIA GPU

创建一个符号链接来强制使用 wayland 运行桌面环境 `ln -s /dev/null /etc/udev/rules.d/61-gdm.rules`

[更多](https://wiki.archlinux.org/title/GDM#Wayland_and_the_proprietary_NVIDIA_driver)

### 桌面环境挂起后无法唤醒

为触摸板加载了 intel_lpss_pci 模块的 Intel CPU 的电脑，在休眠后可能会出现黑屏无法唤醒的情况

将 `intel_lpss_pci` 添加到 `/etc/mkinitcpio.conf` 的 MODULES= 里，使用 `mkinitcpio -P` 指令重新生成内核
