# 网络传输与通信

## HTTP content-type

- application/octet-stream 二进制流数据
- text/plain 纯文本格式
- multipart/form-data 表单上传文件时使用

## 传输

### 网站防盗链

为请求头 Content-Type 添加 `Referer` 字段，值为请求的网站地址

### 解决网页不允许粘贴

1. 开发者模式
2. 右上角的 _设置_，左侧 _偏好设置_，找到调试程序
3. 勾选 _停用 JavaScript_

### SSH connect

默认使用 22 端口进行通信，连接时会读取配置记录文件 `$HOME/.ssh/config`

```
Host github.com
HostName github.com
User git
IdentityFile ~/.ssh/id_ed25519

Host vps1
HostName IP
User root
Port 22
IdentityFile ~/.ssh/vps1-key
```

上述记录声明在使用 ssh 连接 Host 记录的名称时，将其解析为 HostName 记录的值，登入的用户名为 User 记录的值，连接的端口为 Port 记录的值，使用的私钥文件为 IdentityFile 记录的值

## 域名 DNS

### 常见解析类型

- A，将域名指向一个 ipv4 地址

- CNAME，将域名指向另一个域名，与其保持相同的解析

- TXT，将域名附加一段文本信息

- AAAA，将域名指向一个 ipv6 地址

### Cloudflare 开启 CDN 导致 gh-pages 重定向次数过多

选择 SSL/TLS 列，在 Edge Certficates 开启 `Always Use Https` 和 `Opportunistic Encryption`，在 Origin Server 开启 `Authenticated Origin Pulls`，在 SSL/TLS 设置中，将 Encryption Mode 设置为 `Full (strict)`
