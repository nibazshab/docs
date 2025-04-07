# Aria2 下载器

Aria2 是一个自由、开源、轻量级多协议和多源的命令行下载工具。它支持 HTTP/HTTPS、FTP、SFTP、BitTorrent 和 Metalink 协议，可以通过内建的 JSON-RPC 和 XML-RPC 接口来操纵

https://github.com/aria2/aria2

## 自启动配置

- Linux

在 ~/.config/systemd/user 目录下创建 aria2.service 文件，写入如下内容

```ini
[Unit]
Description=aria2 daemon
[Service]
ExecStart=/usr/bin/aria2c --conf-path=%h/aria2/aria2.conf
Restart=on-failure
[Install]
WantedBy=default.target
```

输入如下命令

```sh
systemctl enable --user --now aria2
```

- Windows

在 %APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup 目录下创建 aira2.vbs 文件，写入如下内容

```vb
CreateObject("WScript.Shell").Run "%HOMEPATH%\aria2\aria2c.exe --conf-path=%HOMEPATH%\aria2\aria2.conf -D",0
```

## RPC 使用

- 发送下载任务

```sh
curl URL/jsonrpc -d '{
  "id":"1",
  "method":"aria2.addUri",
  "params":["token:密钥",["链接"]]
}' 
```

- 修改 bt-tracker

```sh
curl URL/jsonrpc -d '{
  "id":"1",
  "method":"aria2.changeGlobalOption",
  "params":["token:密钥",{"bt-tracker":"TRACKER1,TRACKER2"}]
}'
```

## 管理面板

https://github.com/mayswind/AriaNg

1. AriaNg 设置，RPC
2. RPC 地址，RPC 密钥（即 aria2.conf 中 rpc-secret 的值）

如果无法连接，尝试更换 RPC 协议

支持通过 URL 设置 RPC 参数

```
URL/#!/settings/rpc/set/协议/地址/端口/jsonrpc/密钥（使用 base64 URL 安全编码）
```

## 配置文件

按照此处的配置，应在家目录存在 aria2 文件夹，内有如下文件

- aria2.session

空文件

- aria2.conf

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
