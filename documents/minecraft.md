# 我的世界 Minecraft

::: tip 提示
本文不适用于网易版我的世界
:::

Minecraft 是一个关于破坏和放置方块的游戏

## Java 版服务器搭建

使用 docker 镜像 [itzg/minecraft-server](https://docker-minecraft-server.readthedocs.io) 作服务器运行环境，默认会自动下载最新的 [官方纯净版运行核心](https://www.minecraft.net/download/server) 并启动，支持指定版本号，以及手动下载的第三方 jar 包运行核心

输入 `docker exec -i 容器名 rcon-cli` 即可进入服务器控制台

### 第三方运行核心推荐

- Mohist

## 隐藏服务器端口

通过 DNS 解析中的 SRV 功能，实现不需要端口连接我的世界服务器

添加一个 DNS 解析，主机记录写 `_minecraft._tcp.mc`，记录类型为 `SRV`，记录值为 `5 0 25565 域名`

命令行输入 `nslookup -q=srv _minecraft._tcp.mc.域名` 查看上述 SRV 解析是否成功

进入 mc 游戏后添加服务器，服务器地址填 `mc.域名` 即可

## 启动器推荐

- PCL 2

## 控制台指令记录

- `gamemode MODE` 切换游戏模式
- `time set 0` 设置时间为日出
- `gamerule doDaylightCycle false` 关闭时间流逝
- `fill x y z x y z 方块` 填充区域
- `fill x y z x y z 草方块 replace 泥土` 用草方块替换区域内的泥土

服务器管理指令

- `op NAME` 将玩家提升为管理员
- `deop NAME` 将管理员降级为玩家
- `whitelist add ID` 添加白名单
