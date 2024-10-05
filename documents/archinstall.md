# Arch Linux 安装指南

::: warning 声明
可能导致数据丢失，请在安装前为重要的数据做好备份

需要请参考 [ArchWiki#安装指南](https://wiki.archlinux.org/title/Installation_guide)
:::

- 实机安装部分 [跳转](#准备阶段)
- 云服务器安装部分 [跳转](#云服务器安装)

## 准备阶段

下载镜像、制作启动盘、确认 efi 启动方式等步骤略过，不做描述

## 1. 关闭 reflcetor 服务

安装镜像中默认启动的 reflector 服务会自动更新 pacman 软件源，或许它是个很好用的工具，但因为一些特殊的网络原因，它并不能带来更好的体验

```sh
systemctl stop reflector.service
```

## 2. 连接网络

### 2.1. 有线与无线网络

正常情况下，系统会自动连接有线网络，无线网络使用 iwctl 来进行连接，输入如下指令进入 iwd 模式，并查看无线网卡的名称

```sh
iwctl
device list
```

假设查看的无线网卡名称为 `wlan0`，输入如下指令扫描无线网络

```sh
station wlan0 scan
station wlan0 get-networks
```

中文名称的网络无法正常显示和连接，请连接英文名称的网络

```sh
station wlan0 connect 网络名称
```

接着输入该网络密码，密码回显为 `*`，输入 `exit` 退出 iwd 模式

### 2.2. 测试网络连接

输入 `ping -c 4 baidu.com`，测试是否成功连上网络

## 3. 校准时间

准确的时间是至关重要的，它决定了很多东西能否正常运行，输入如下指令查看

```sh
timedatectl status
```

## 4. 设置镜像软件源

输入 `vim /etc/pacman.d/mirrorlist` 编辑 pacman 镜像配置文件，将镜像软件源添加到最前面，推荐以下几个源，选一个即可

```ini
Server = https://mirrors.bfsu.edu.cn/archlinux/$repo/os/$arch
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
```

输入 `pacman -Syy` 同步

## 5. 硬盘分区与格式化

### 5.1. 分区

输入 `lsblk` 查看硬盘信息，`NAME` 即为硬盘的名称

```console
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
nvme0n1     259:0    0 953.9G  0 disk
```

输入 `cfdisk /dev/nvme0n1` 进入硬盘分区页面，首先分出 300M 的 efi 分区，设为 `EFI System` 类型，剩下的空间全部分给系统分区，设为 `Linux filesystem` 类型，选择 `[Write]` 保存，退出

再次输入 `lsblk` 查看硬盘信息，得到以下信息

```console
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
nvme0n1     259:0    0 953.9G  0 disk
├─nvme0n1p1 259:1    0   300M  0 part
└─nvme0n1p2 259:2    0 697.6G  0 part
```

### 5.2. 格式化

输入如下指令，格式化 efi 分区为 fat32 格式，格式化系统分区为 btrfs 格式

```sh
mkfs.vfat -F32 /dev/nvme0n1p1
mkfs.btrfs /dev/nvm0n1p2
```

## 6. 子卷与挂载

输入 `mount -t btrfs -o compress=zstd /dev/nvme0n1p2 /mnt` 将 btrfs 分区挂载到 `/mnt` 目录，输入如下指令创建 3 个 btrfs 子卷

```sh
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
btrfs subvolume create /mnt/@swap
```

输入 `umount /mnt` 取消 btrfs 分区的挂载，并将 btrfs @ 子卷挂载为根目录

```sh
mount -t btrfs -o subvol=/@,compress=zstd /dev/nvme0n1p2 /mnt
```

输入 `mkdir -p /mnt/home /mnt/swap /mnt/boot` 创建 home swap boot 目录，将 btrfs @home 子卷挂载为家目录，btrfs @swap 子卷挂载为 swap 目录，将 efi 分区挂载为 boot 目录

```sh
mount -t btrfs -o subvol=/@home,compress=zstd /dev/nvme0n1p2 /mnt/home
mount -t btrfs -o subvol=/@swap /dev/nvme0n1p2 /mnt/swap
mount /dev/nvme0n1p1 /mnt/boot
```

## 7. 安装基本系统

输入 `pacstrap /mnt base base-devel linux linux-firmware` 安装基础环境、基础开发包、内核、固件包，输入 `pacstrap /mnt networkmanager vim` 安装网络管理工具、文本编辑器

此处如果报错，请尝试输入 `pacman -Syy archlinux-keyring` 修复

## 8. 配置系统

输入 `genfstab -U /mnt >> /mnt/etc/fstab` 生成 fstab 文件，输入 `echo os > /mnt/etc/hostname` 设置主机名，此处设为 `os`

输入 `arch-chroot /mnt` 进入 chroot 环境

输入 `systemctl enable NetworkManager.service` 启用网络服务

### 8.1. 交换空间支持

输入如下指令，创建交换文件并启用交换空间，大小设为 2G

```sh
chattr +C /swap
truncate -s 0 /swap/swapfile
fallocate -l 2G /swap/swapfile
chmod 0600 /swap/swapfile
mkswap /swap/swapfile
swapon /swap/swapfile
```

### 8.2. 修改 fstab 文件

输入 `vim /etc/fstab`，在末尾加上 `/swap/swapfile none swap defaults 0 0`，并将所有的 `subvolid=` 项删除，最终应大致如下所示

```ini
# /dev/nvme0n1p1
UUID=0591-3783                               /boot    vfat    rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii,shortname=mixed,utf8,errors=remount-ro 0 2

# /dev/nvme0n1p2
UUID=979aa7ec-8842-4e22-8bfc-4c8aed3de56d    /        btrfs    rw,relatime,compress=zstd:3,ssd,space_cache=v2,subvol=/@ 0 0

# /dev/nvme0n1p2
UUID=979aa7ec-8842-4e22-8bfc-4c8aed3de56d    /home    btrfs    rw,relatime,compress=zstd:3,ssd,space_cache=v2,subvol=/@home 0 0

# /dev/nvme0n1p2
UUID=979aa7ec-8842-4e22-8bfc-4c8aed3de56d    /swap    btrfs    rw,relatime,ssd,space_cache=v2,subvol=/@swap 0 0

/swap/swapfile                               none     swap     defaults 0 0
```

### 8.3. 设置上海时区

输入 `ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime` 将时区设置为上海时区，输入 `hwclock --systohc` 校准硬件时间

### 8.4. 设置语言环境

输入如下指令，生成中文和英文语言环境

```sh
sed -i 's/#zh_CN.UTF-8/zh_CN.UTF-8/g' /etc/locale.gen
sed -i 's/#en_US.UTF-8/en_US.UTF-8/g' /etc/locale.gen
locale-gen
```

输入 `echo LANG=en_US.UTF-8 > /etc/locale.conf` 将系统语言设置为英语，暂时不要设为中文，会导致 tty 乱码，后续图形化配置完成后可改为中文

## 9. 设置 root 用户密码

输入 `passwd` 为 root 超级用户设置密码，输入密码时无回显

## 10. 安装微码文件

使用 Intel CPU 的用户输入 `pacman -S intel-ucode`，使用 AMD CPU 的用户输入 `pacman -S amd-ucode`

## 11. 添加开机引导

输入 `bootctl --path=/boot install` 将 systemd-boot 引导安装到 `/boot` 目录

创建 `/boot/loader/loader.conf` 文件并写入如下内容

```ini
timeout 5
console-mode max
editor no
```

输入 `blkid -s PARTUUID -o value /dev/nvme0n1p2` 查看系统分区的 PARTUUID，假设此处获取的 PARTUUID 为 `b4e38594-773b-a845-98f6-3a72a08db6d9`，创建 `/boot/loader/entries/arch.conf` 文件并写入如下内容

```ini
title      Arch Linux
linux      /vmlinuz-linux
initrd     /intel-ucode.img
initrd     /initramfs-linux.img
options    root=PARTUUID=b4e38594-773b-a845-98f6-3a72a08db6d9 rw rootflags=subvol=/@
```

创建 `/etc/pacman.d/hooks/95-systemd-boot.hook` 文件并写入如下内容

```ini
[Trigger]
Type = Package
Operation = Upgrade
Target = systemd

[Action]
Description = Gracefully upgrading systemd-boot...
When = PostTransaction
Exec = /usr/bin/systemctl restart systemd-boot-update.service
```

## 12. 重启

输入以下指令，退回安装环境，取消所有分区的挂载，重启

```sh
exit
umount -R /mnt
reboot
```

> 注：基础安装部分结束

## 进入系统

使用 root 用户登录，密码是前文中自己设置的密码

## 13. 连接网络

正常情况下，系统会自动连接有线网络，无线网络使用 NetworkManager 连接，输入 `nmtui` 进入网络管理页面进行连接

## 14. 添加普通用户

输入 `useradd -m -G wheel -s /bin/bash atri` 创建普通用户，此处创建为 `atri`，输入 `passwd atri`，为 atri 用户设置密码

输入如下指令为普通用户启用 sudo

```sh
sed -i 's/# %wheel ALL=(ALL:ALL) ALL/%wheel ALL=(ALL:ALL) ALL/g' /etc/sudoers
```

## 15. 可选步骤

### 15.1. 启用 multilib 软件源

multilib 软件源是为了兼容 32 位程序而存在的，如跳过此步骤，请忽略后文中 32 位程序的内容

输入 `vim /etc/pacman.conf` 编辑 pacman 配置文件，找到 `[multilib]`，将该节的 `#` 删除

### 15.2. 添加 archlinuxcn 软件源

输入 `vim /etc/pacman.conf` 编辑 pacman 配置文件，将 archlinuxcn 软件源配置信息添加到末尾，推荐以下几个源，选一个即可

```ini
[archlinuxcn]
Server = https://mirrors.bfsu.edu.cn/archlinuxcn/$arch
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

输入 `pacman -Syy archlinuxcn-keyring` 同步并安装 archlinuxcn 密钥环

### 15.3. 安装 AUR 助手 paru 或 yay

如果已添加 archlinuxcn 软件源，输入 `pacman -S paru` 直接安装

如果未添加 archlinuxcn 软件源，如下输入指令编译安装

```sh
pacman -S git
cd /tmp
git clone https://aur.archlinux.org/paru.git
chown nobody paru && cd paru
su nobody -s /bin/bash -c 'makepkg -sf'
pacman -U paru-*.pkg.tar.zst
```

> 安装 yay 直接把上面的 `paru` 替换掉即可

## 16. 显卡驱动

### 16.1. Intel 核显

输入 `pacman -S vulkan-intel mesa` 安装 Intel 核显驱动，输入 `pacman -S lib32-vulkan-intel lib32-mesa` 安装 32 位 Intel 核显驱动

### 16.2. NVIDIA 独显

输入 `pacman -S nvidia nvidia-settings nvidia-prime` 安装 NVIDIA 独显驱动，输入 `pacman -S lib32-nvidia-utils` 安装 32 位 NVIDIA 独显驱动

## 17. 汉文字体

输入以下指令，安装简体中文、日文、韩文、台版繁体中文四种字形的思源黑体和思源宋体

```sh
pacman -S adobe-source-han-sans-cn-fonts adobe-source-han-serif-cn-fonts
pacman -S adobe-source-han-sans-jp-fonts adobe-source-han-serif-jp-fonts
pacman -S adobe-source-han-sans-kr-fonts adobe-source-han-serif-kr-fonts
pacman -S adobe-source-han-sans-tw-fonts adobe-source-han-serif-tw-fonts
```

## 18. 图形桌面环境

输入 `pacman -S gnome` 安装 GNOME 桌面环境，输入 `systemctl enable --now gdm.service` 启动 GNOME 桌面环境，并设为开机自启

在以后的图形化使用中，请以普通用户的身份登录系统

> 注：进阶安装部分结束

## 云服务器安装

::: important 说明
云服务器提供商需要支持 VNC 连接，且服务器正在使用任意 Linux 操作系统

本文将删除服务器中的所有数据

需要请参考 [ArchWiki#从现有 Linux 发行版安装 Arch Linux](https://wiki.archlinux.org/title/Install_Arch_Linux_from_existing_Linux)  
需要请使用 [vps2arch 脚本](https://github.com/drizzt/vps2arch)
:::

服务器商 VNC 界面

::: tabs
@tab 腾讯云
远程连接 - VNC 连接

@tab 阿里云
远程连接 - 救援模式，需要先点击运行一次上方的 _复制命令_ 才能接受到键盘操作
:::

### 1. 下载系统镜像

下载系统镜像，改名为 archlinux.iso 并放在根目录，有条件可以从内网下载

```sh
# 腾讯云内网
wget mirrors.tencentyun.com/archlinux/iso/latest/archlinux-x86_64.iso -O /archlinux.iso

# 阿里云内网
wget mirrors.cloud.aliyuncs.com/archlinux/iso/latest/archlinux-x86_64.iso -O /archlinux.iso
```

### 2. 添加开机引导项

编辑 /boot/grub/grub.cfg，在末尾处添加以下内容，`/dev/vda1` 为 archlinux.iso 文件所在的分区

```sh
menuentry 'Arch Linux LiveCD' {
    set isofile=/archlinux.iso
    set imgdevpath=/dev/vda1
    loopback lo0 $isofile
    linux (lo0)/arch/boot/x86_64/vmlinuz-linux img_dev=$imgdevpath img_loop=$isofile
    initrd (lo0)/arch/boot/x86_64/initramfs-linux.img
}
```

如果在开机时没有出现 Grub 引导界面，请检测 grub.cfg 文件中是否有自动选择启动项的配置

### 3. 启动镜像环境

打开 VNC 界面，输入 reboot 重启系统，在开机的引导界面选择最后一项 `Arch Linux LiveCD`，如果时间不够选择，在 grub.cfg 中修改 GRUB_TIMEOUT 的值，单位是秒

输入命令 passwd 设置临时密码，以使用 ssh root@ip 进行远程连接，随后不再使用 VNC

### 4. 清理系统数据

直接格式化硬盘即可 `mkfs.ext4 /dev/vda1`，随后挂载硬盘 `mount /dev/vda1 /mnt`

如无法格式化，可以尝试重设硬盘挂载权限 `mount -o rw,remount /dev/vda1`，再挂载硬盘 `mount /dev/vda1 /mnt`，手动删除数据 `rm -rf /mnt/*`

注：本文确保硬盘分区表使用 dos/mbr 格式而不是 gpt 格式，可输入 fdisk -l 命令查看。使用 `dd if=/dev/zero of=/dev/vda bs=512K count=1` 命令可直接擦除硬盘分区表信息

### 5. 正式安装

先换源，有条件使用内网源

```sh
# 腾讯云内网
echo 'Server = http://mirrors.tencentyun.com/archlinux/$repo/os/$arch' > /etc/pacman.d/mirrorlist

# 阿里云内网
echo 'Server = http://mirrors.cloud.aliyuncs.com/archlinux/$repo/os/$arch' > /etc/pacman.d/mirrorlist
```

安装基本包，生成磁盘信息标识

```sh
pacstrap /mnt base linux-lts openssh nano grub
genfstab -U /mnt >> /mnt/etc/fstab
```

nameserver 信息，有条件使用内网地址

```sh
# 腾讯云内网
echo nameserver 183.60.82.98 > /mnt/etc/resolv.conf

# 阿里云内网
echo nameserver 100.100.2.136 > /mnt/etc/resolv.conf
```

进入 chroot 环境

```sh
arch-chroot /mnt
```

时区，语言环境，网络连接信息，`Name` 值为网卡名称，使用 ip addr 命令查看，此处示例为 ens5

```sh
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

echo zh_CN.UTF-8 UTF-8 > /etc/locale.gen
locale-gen

echo vps > /etc/hostname

cat << EOL > /etc/systemd/network/20-wired.network
[Match]
Name=ens5
[Network]
DHCP=ipv4
EOL
```

ssh，此处配置为必须使用密钥登陆，如使用密码可将 PasswordAuthentication 改为 yes

```sh
cat << EOL > /etc/ssh/sshd_config.d/10-vps.conf
PermitRootLogin yes
PasswordAuthentication no
ClientAliveInterval 3600
PrintLastLog no
AddressFamily inet
UsePAM no
EOL

# 密钥登陆的公钥信息，此处为示例，具体不做描述
cat << EOL > /root/.ssh/authorized_keys
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPNwSU4IuTcE1fEkfooybSCM6gpChn7okmtBgblK1Bkx
EOL
```

设置 root 密码，使用 `passwd` 命令

自启系统服务，开机引导，如果硬盘分区表非 dos/mbr 而是 gpt 则会报错，不做描述

```
systemctl enable sshd.service systemd-networkd.service
grub-install --target=i386-pc /dev/vda
grub-mkconfig -o /boot/grub/grub.cfg
```

结束，重启

```sh
exit
reboot
```


额外内容

```sh
# nano 文本编辑器
cat << EOL > /root/.nanorc
include "/usr/share/nano/*.nanorc"
set linenumbers
set tabstospaces
set constantshow
set tabsize 4
EOL

# fish 为默认 SHELL
pacman -S --noconfirm fish
chsh -s /usr/bin/fish
mkdir -p /root/.config/fish/conf.d
cat << EOL > /root/.config/fish/conf.d/10-root.fish
set fish_greeting
set LANG zh_CN.UTF-8
abbr -a lsof lsof -Pi
EOL

# docker，腾讯内网源
pacman -S --noconfirm docker docker-compose
mkdir -p /etc/docker
cat << EOL > /etc/docker/daemon.json
{
    "registry-mirrors": [ "https://mirror.ccs.tencentyun.com" ]
}
EOL
systemctl enable --now docker

# 小工具
pacman -S tree unzip wget less lsof fastfetch

# 交互分区
fallocate -l 2G /boot/swapfile
chmod 600 /boot/swapfile
mkswap /boot/swapfile
swapon /boot/swapfile
echo '/boot/swapfile none swap defaults 0 0' >> /etc/fstab
```
