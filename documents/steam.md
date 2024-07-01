# Steam 游戏平台

::: warning 声明

本文大部分内容适用于 Arch 系的 Linux 系统，其他系统请自行甄别是否适用

:::

[Steam](https://store.steampowered.com) 是 Valve 公司推出的著名游戏分发平台，对于 Linux 平台，Steam 官方只提供对 Ubuntu LTS 版本的支持

Value 公司发行的 Steam Deck 掌机使用基于 Arch Linux 所开发的 SteamOS 3 系统

## 安装

使用 Flatpak 安装可避免许多毛病

```sh
flatpak --user remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
flatpak --user install flathub com.valvesoftware.Steam
flatpak run com.valvesoftware.Steam
```

默认情况下通过 Flatpak 安装的 Steam 不会有访问你的家目录的权限，并且由于安全问题，强行忽略此权限限制会导致 Steam 无法运行。不过，你可以自由地在家目录之外添加一个目录。如果你想添加一个外部库，你可以运行如下指令来添加

```sh
flatpak --user override com.valvesoftware.Steam --filesystem=/path/to/directory
```

启动使用 Flakpak 安装的 steam 可能会发出警告有关安装 `steam-devices` 软件包的信息，此包暂不存在，可通过安装 Aur 的 `game-devices-udev` 来解决

### Bottles 集成

如果使用 Flatpak 安装了 Bottles，你可以在 Steam 中使用它来运行 Windows 游戏，[参阅](https://docs.usebottles.com/flatpak/cant-enable-steam-proton-manager)

```sh
flatpak override --user com.usebottles.bottles --filesystem=~/.var/app/com.valvesoftware.Steam/data/Steam
```

## Steam 疑难杂症

### 运行非 steam 平台 exe 游戏

1. 点击 Steam 左下角 ___添加游戏___
2. 点击 ___添加非 Steam 游戏___
3. 选择游戏的 exe 启动程序
4. 点击 ___添加选定的程序___
5. 在 ___属性 - 兼容性___ 中勾选 ___强制使用特定 Steam Play 兼容性工具___

### 开启 Steam Deck 界面

1. 打开 Steam 安装目录，找到 package 文件夹
2. 进入 package 目录，创建一个名为 beta 的文件
3. 在 beta 文件中写入 `steampal_stable_9a24a2bf68596b860cb6710d9ea307a76c29a04d`
4. 在 Steam 的启动指令后面添加 `-gamepadui`

### 亚洲字体乱码

#### 支持的字体

尝试安装 `lib32-fontconfig`、`ttf-liberation` 和 `wqy-zenhei`，然后重新启动 Steam 以查看问题是否已解决

当 Steam 找不到 Arial 字体时，font-config 喜欢回到 Helvetica 位图字体。Steam 无法正确呈现此位图字体以及可能的其他位图字体，因此，删除有问题的字体或禁用位图字体很可能会在不安装 Arial 或 ArialBold 字体的情况下解决问题。用于代替 Arial 的字体可以通过 `fc-match -v Arial` 指令找到

#### fontconfig

如上述方法未解决问题，尝试使用 fontconfig 为 Steam 指定字体

找到系统中的字体目录，一般为 `/usr/share/fonts`，假设存在 `/usr/share/fonts/win` 目录，其中包含的是 Windows 平台的字体

创建 `/usr/share/fonts/steam.conf` 文件，写入如下内容

```xml
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
<dir>/usr/share/fonts/win</dir>
</fontconfig>
```

编辑 Steam.desktop，在所有 Exec= 后添加 `env FONTCONFIG_FILE=/usr/share/fonts/steam.conf`

### 跳正版分流验证

打开 Steam 安装目录，将 Steam 启动程序移动到其他目录，然后直接运行下载的正版分流游戏即可跳过 Steam 验证

## Steam 游戏疑难杂症

### Wallpaper Engine 创意工坊自动下载问题

如果在自己的电脑上登录了别人的 Steam 账号，恰好那个账号也拥有 Wallpaper 软件且订阅了大量创意工坊内容，会导致 Steam 自动将该账号的所订阅的 Wallpaper 创意工坊的内容添加到 `steam\steamapps\workshop\appworkshop_431960.acf` 配置文件的 WorkshopItemDetails 中，导致 WorkshopItemsInstalled 与之不匹配，从而一直下载内容

#### 民间方法

直接修改配置文件，编辑 `steam\steamapps\workshop\appworkshop_431960.acf`，把 WorkshopItemDetails 的内容复制替换到 WorkshopItemsInstalled 中即可

#### 官方方法

1. 关闭 Steam
2. 转到 wallpaper_engine 安装目录
3. 运行 `wallpaper_engine\bin\steamredownloadfixer32.exe`
4. 重新启动 Steam 并验证 Wallpaper Engine 的文件完整性

[更多](https://help.wallpaperengine.io/steam/redownload.html)
