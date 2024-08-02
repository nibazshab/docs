# Aria2 下载器

::: tip 提示
作为命令行工具，具有一定的学习成本，使用 Motrix 等二次封装的图形化工具不失为一种选择
:::

[Aria2](https://github.com/aria2/aria2) 是一个自由、开源、轻量级多协议和多源的命令行下载工具。它支持 HTTP/HTTPS、FTP、SFTP、BitTorrent 和 Metalink 协议，可以通过内建的 JSON-RPC 和 XML-RPC 接口来操纵

## 安装与启动

Arch 系的 Linux 系统，直接安装 `aria2` 即可，其他请参考各自的安装方法，或前往 [GitHub Release](https://github.com/aria2/aria2/releases) 下载源码编译安装

在 `$HOME/aria2` 目录下创建 aria2.conf、aria2.session 文件，其中 aria2.conf 的内容参考 [配置文件](#配置文件)

在 `/etc/systemd/user` 目录下创建 aria2.service 文件，写入如下内容

```ini
[Unit]
Description=Aria2 RPC Daemon
After=network.target
[Service]
ExecStart=/usr/bin/aria2c --conf-path=%h/aria2/aria2.conf
ExecStop=/bin/kill $MAINPID
RestartSec=on-abort
[Install]
WantedBy=multi-user.target
```

启动服务，并设为开机自启

```sh
systemctl enable --user --now aria2.service
```

Windows 请前往 [GitHub Release](https://github.com/aria2/aria2/releases) 下载 win-64bit-build 压缩包

在 `%HOMEPATH%` 目录下创建 aria2 文件夹，将压缩包内的 aria2c.exe 文件解压到此处，并创建 aria2.conf、aria2.session 文件，其中 aria2.conf 的内容参考 [配置文件](#配置文件)

在 `%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup` 目录下创建 aira2.vbs 文件，写入如下内容，即可实现开机自启

```vb
CreateObject("WScript.Shell").Run "%HOMEPATH%\aria2\aria2c.exe --conf-path=%HOMEPATH%\aria2\aria2.conf -D",0
```

## 配置文件

::: details aria2.conf
```ini
dir=${HOME}/Downloads
disk-cache=64M
file-allocation=none
no-file-allocation-limit=64M
continue=true
always-resume=false
max-resume-failure-tries=0
remote-time=true

input-file=${HOME}/aria2/aria2.session
save-session=${HOME}/aria2/aria2.session
save-session-interval=1
auto-save-interval=60
force-save=false

max-file-not-found=10
max-tries=0
retry-wait=10
connect-timeout=10
timeout=10
max-concurrent-downloads=10
max-connection-per-server=16
split=5
min-split-size=10M
piece-length=1M
allow-piece-length-change=true
lowest-speed-limit=0
max-overall-download-limit=0
max-download-limit=0
disable-ipv6=true
http-accept-gzip=true
reuse-uri=false
no-netrc=true
allow-overwrite=false
auto-file-renaming=true
content-disposition-default-utf8=true
#min-tls-version=TLSv1.2

listen-port=6881
dht-listen-port=6881
enable-dht=true
enable-dht6=false
#bt-external-ip=
#dht-file-path=${HOME}/aria2/dht.dat
#dht-file-path6=${HOME}/aria2/dht6.dat
#dht-entry-point=dht.transmissionbt.com:6881
#dht-entry-point6=dht.transmissionbt.com:6881
bt-enable-lpd=true
#bt-lpd-interface=
enable-peer-exchange=true
bt-max-peers=128
bt-request-peer-speed-limit=10M
max-overall-upload-limit=2M
max-upload-limit=0
seed-ratio=2.0
#seed-time=0
bt-hash-check-seed=true
bt-seed-unverified=false
bt-tracker-connect-timeout=10
bt-tracker-timeout=10
#bt-tracker-interval=0
bt-prioritize-piece=head=32M,tail=32M
rpc-save-upload-metadata=true
follow-torrent=true
pause-metadata=false
bt-save-metadata=true
bt-load-saved-metadata=true
bt-remove-unselected-file=true
bt-force-encryption=true
#bt-require-crypto=false
#bt-min-crypto-level=plain
bt-detach-seed-only=true
user-agent=
#peer-agent=Deluge 1.3.15
#peer-id-prefix=-DE13F0-

enable-rpc=true
rpc-allow-origin-all=true
rpc-listen-all=true
rpc-listen-port=6800
#rpc-secret=
rpc-max-request-size=10M
#rpc-secure=false
#rpc-certificate=
#rpc-private-key=
#event-poll=select

#async-dns=true
#async-dns-server=
#interface=
#multiple-interface=

#log=
#log-level=warn
console-log-level=notice
quiet=false
summary-interval=0
show-console-readout=false

#on-download-stop=
#on-download-complete=
#on-download-error=
#on-download-pause=
#on-download-start=
#on-bt-download-complete=

bt-tracker=
```
:::

## 管理面板

[AriaNg](https://github.com/mayswind/AriaNg) 是一个现代化的 Web 前端管理工具，它使得 aria2 更易于使用。AriaNg 是纯 html & javascript 编写的，因此不需要任何编译器或运行环境。只需要将 AriaNg 放入的 Web 服务器中，然后在浏览器中打开它。AriaNg 使用响应式布局，支持任何桌面或移动设备

### 获取

提供三种版本，[单文件版](https://github.com/mayswind/AriaNg/releases)、[标准版](https://github.com/mayswind/AriaNg/releases)、[桌面版](https://github.com/mayswind/AriaNg-Native/releases)

### 配置

1. 点击 ___AriaNg 设置___，选择 ___全局___ 右边的 ___RPC___
2. 填入 Aria2 RPC 的主机地址和端口
3. ___密钥___ 为配置文件中 `rpc-secret` 的值，没有则不填

如果无法连接请尝试更换协议

面板也提供了 Api 来设置 RPC 参数 `URL/#!/settings/rpc/set/${protocol}/${rpcHost}/${rpcPort}/${rpcInterface}/${secret}`

- `URL` 为 AriaNg 的网页地址
- `${protocol}` 为连接协议 `http` `https` `ws` 或 `wss`
- `${rpcHost}` 为 Aria2 RPC 的主机地址
- `${rpcPort}` 为 Aria2 RPC 的端口
- `${rpcInterface}` 为 Aria2 RPC 的路径，默认 `jsonrpc`
- `${secret}` 为 base64 URL 安全编码后的 Aria2 RPC 密钥，没有则不填

## RPC 使用

发送下载任务

```sh
curl -d '{"id":"1","method":"aria2.addUri","params":["token:SECRET",["DOWNLOAD_URL"]]}' HOST:PORT/jsonrpc
```

修改 bt-tracker

```sh
curl -d '{"id":"1","method":"aria2.changeGlobalOption","params":["token:SECRET",{"bt-tracker":"TRACKER"}]}' HOST:PORT/jsonrpc
```
