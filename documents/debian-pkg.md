# 如何制作 Debian 系的 deb 软件包

以下将制作一个 atri.deb 为例

假设当前目录为 rootfs，首先创建一个名为 atri 的文件夹，作为软件包目录

## 制作

1. 配置文件

在 atri 目录内创建 DEBIAN 文件夹，在 DEBIAN 文件夹内创建 control 文件，写入如下基本信息

```yml
Package: atri                    # 软件包名
Version: 1.0                     # 版本
Architecture: all                # 架构，i386，amd64，all
Description: demo                # 软件描述
Maintainer: atri<atri@gmail.com> # 维护者
```

2. 程序文件

将程序文件按照规范的文件系统方式放于 atri 目录内

创建层级目录 usr/local/bin，在 bin 内创建 atri 文件，写入如下内容，并给予执行权限

```sh
#!/usr/bin/env bash

echo 'hello, this is atri.'
```

3. 结构总览

最终整个目录结构应如下所示

```
rootfs - atri - DEBIAN - control
              - usr - local - bin - atri
```

4. 打包

回到 rootfs 目录，输入以下指令打包

```sh
dpkg-deb -b atri atri.deb
```

## 安装测试

输入 `dpkg -i atri.deb` 安装，然后输入 `atri` 运行后，应有如下响应

```
hello, this is atri.
```
