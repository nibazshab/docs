# Linux 常见指北

本文主要记录 Arch Linux 相关的问题。内容收集自网络和 Arch Wiki，请自行甄别是否适用于其他版本的 Linux 操作系统

### crontab 定时任务

在 /var/spool/cron/crontabs/root 中写入任务，运行 `crond` 命令启动

定时规则如下所示，例如 `0 3,15 * * * sh /a.sh` 表示每天 3 点和 15 点，执行 `sh /a.sh` 命令

```
*    *    *    *    *
-    -    -    -    -
|    |    |    |    |
|    |    |    |    +----- day of week (0 - 7) (Sunday=0 or 7)
|    |    |    +---------- month (1 - 12)
|    |    +--------------- day of month (1 - 31)
|    +-------------------- hour (0 - 23)
+------------------------- minute (0 - 59)
```

### 恢复误删文件，进程还在运行

查看该进程的 pid 号，假设为 721，进入 /proc/721/fd 目录，输入 `ls -l` 查看数字文件对应的硬链接文件名，假设查看有如下信息

```
Aug  1 09:48 10 -> /data/db.sqlite3 (deleted)
Aug  1 09:48 11 -> /data/db.sqlite3 (deleted)
```

选择时间靠后或数字编号更大的文件，此处输入 `cp 11 /bak/db.sqlite3` 即可

### 误清 iptables，容器无法联网

重启 docker 服务即可 `systemctl restart docker.service`

### PUTTY 控制台的 ls 命令没有颜色

由于 PUTTY 的连接可能导致控制台彩色显示失效，可以尝试使用 `ls --color=auto` 来重新定义 LS_COLORS 环境变量等

[更多](https://wiki.archlinux.org/title/Color_output_in_console#ls)

### Possibly missing firmware for module XXXX

当内核更新后，镜像 initramfs 被重新构建时，你可能得到以下警告

```
==> WARNING: Possibly missing firmware for module: xhci_pci
==> WARNING: Possibly missing firmware for module: aic94xx
==> WARNING: Possibly missing firmware for module: bfa
```

如果在生成默认 initramfs 镜像时出现这些或类似的消息，如警告所述，可能需要安装其他固件。大多数常见的固件文件可以通过安装 `linux-firmware` 来获取。对于其他的固件软件包，可以尝试在软件包仓库中搜索固件模块的名字获取。聚合包 `mkinitcpio-firmware` 包括绝大部分的固件，或者手动安装所需的固件包

如果消息仅在生成 fallback initramfs 镜像时出现，可以禁止 fallback 镜像的生成，在 `/etc/mkinitcpio.d` 目录下的 preset 文件中，将 PRESETS= 里的 fallback 移除，重新生成系统引导

[更多](https://wiki.archlinux.org/title/Mkinitcpio#Possibly_missing_firmware_for_module_XXXX)
