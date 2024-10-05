# Steam 游戏平台

::: warning 声明
本文大部分内容适用于 Arch 系的 Linux 系统，其他系统请自行甄别是否适用
:::

[Steam](https://store.steampowered.com) 是 Valve 公司推出的著名游戏分发平台，对于 Linux 平台，Steam 官方只提供对 Ubuntu LTS 版本的支持

Value 公司发行的 Steam Deck 掌机使用基于 Arch Linux 所开发的 SteamOS 3 系统

## Steam 新家庭

封禁连坐机制：只会封禁 _开挂者_ 和 _开挂游戏的拥有者_，不会殃及家庭中的其他成员

免费游戏不会被共享

### 如何使某个游戏不共享到家庭？

在 Steam 的游戏界面上，点击 _管理_，将游戏 _标记为私密_ 即可

::: note 注
点击查看 Steam 中的 [拥有 VAC 封禁的大部分游戏](https://store.steampowered.com/search/?supportedlang=schinese%2Ctchinese%2Cjapanese%2Ckoreana%2Cthai%2Cbulgarian%2Cczech%2Cdanish%2Cgerman%2Cspanish%2Cenglish%2Cindonesian%2Citalian%2Cgreek%2Cfrench%2Clatam&category1=998&category2=8&hidef2p=1&ndl=1)
:::

## Steam 令牌

::: danger 警告
先保存 Steam 令牌恢复代码
:::

### 导出 Steam 二次验证令牌到 Bitwarden

#### 方法一

前置条件：已开启 Steam 手机令牌，安卓手机 Root 并安装 LSPosed 框架

安装 [SteamGuardDump](https://github.com/YifePlayte/SteamGuardDump) 模块，在 LSPosed 模块设置中，将 SteamGuardDump 的作用域选中 Steam App

打开 Steam App，模块将自动复制一段内容到输入法剪贴板，从中找到这样的部分 `"uri": "otpauth://totp/Steam:steamid?secret=ABCDEFG12345678910JQKA&issuer=Steam"`，得到 secret

将 secret 写成这种形式 `steam://ABCDEFG12345678910JQKA`，并填入 Bitwarden 的 TOTP 框

#### 方法二（未验证）

下载 Steam++，在本地令牌中，登录账号绑定令牌

将这个令牌导出为 maFile 文件，用文本编辑器打开，从中找到 url 的 otpauth 部分，得到 secret

#### 方法三（未验证）

下载 [SDA](https://github.com/Jessecar96/SteamDesktopAuthenticator) 并按说明登陆账号使用，不要选择加密

在 SDA 安装目录下可以找到 maFile 文件

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

### 收藏夹排序

在收藏夹的名称前面加空格即可，空的越多越靠前

### 运行非 steam 平台 exe 游戏

1. 点击 Steam 左下角 _添加游戏_
2. 点击 _添加非 Steam 游戏_
3. 选择游戏的 exe 启动程序
4. 点击 _添加选定的程序_
5. 在 _属性 - 兼容性_ 中勾选 _强制使用特定 Steam Play 兼容性工具_

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
