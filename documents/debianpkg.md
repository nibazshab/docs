# 制作 deb 格式软件包

Debian 系的 Linux 操作系统的软件包是 deb 格式

## 包结构

由配置文件和程序文件两部分构成，存放于待制作的软件包目录中

以下将制作一个 atri.deb 为例，首先创建一个名为 atri 的文件夹，作为软件包目录

## 配置文件

在软件包目录内创建 DEBIAN 文件夹，在该文件夹内创建 control 文件，写入软件包的基本信息

```yml
Package: atri
Version: 1.0
Architecture: all
Description: demo
Maintainer: atri<atri@gmail.com>
```

各字段的含义如下

- `Package` 软件包名
- `Version` 版本
- `Architecture` 架构，填写 `i386` `amd64` 或 `all`
- `Description` 软件描述
- `Maintainer` 维护者，格式：`名称<邮箱>`

control 文件还可以填写更多信息，这里不多作描述

preinst、postinst、prerm、postrm 不是必须要有的配置文件，可以不写

## 程序文件

将程序文件按照规范的文件系统方式放于软件包目录内

创建层级目录 usr/local/bin，在 bin 内创建 atri 文件，写入如下内容，并给与执行权限

```sh
#!/usr/bin/env bash

echo 'hello, this is atri.'
```

如果有其他文件，例如配置或依赖等，则应创建对应的目录例如 usr/local/etc/atri/config.conf、usr/local/lib/libatri.so

## 打包

最终整个软件包目录结构应如下所示

```console
atri - DEBIAN - control
     - usr - local - bin - atri
```

回到软件包的同级目录，输入以下指令打包

```sh
dpkg-deb -b atri atri.deb
```

## 安装测试

此时当前目录应有软件包 atri.deb，输入 `dpkg -i atri.deb` 安装后，运行 atri 应有如下响应

```console
hello, this is atri.
```
