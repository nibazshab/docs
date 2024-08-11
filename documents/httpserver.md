# Web HTTP 服务器

本文包含 Caddy 和 Nginx 的内容

## Caddy

[Caddy](https://caddyserver.com) 是一个强大的，开源的，使用 Go 编写的自动配置 HTTPS 的 Web 服务器

### 配置

配置文件为 `/etc/caddy/Caddyfile`，自定义的额外配置文件放在 `/etc/caddy/conf.d/` 目录下，文件名随意，数据目录 `/var/lib/caddy`

### 只接受特定目录的请求

```nginx
example.com {
    route {
        reverse_proxy /test/* 127.0.0.1:8080

        handle /* {
            abort
        }
    }
}
```

### 自定义回应状态码

respond 404 或 error 404

### 代理到域名子目录

```nginx
example.com {
    handle /test/* {
        reverse_proxy localhost:8080
    }
}
```

### 禁用 SSL 仅 HTTP

```nginx
http://example.com {
    ...
}
```

### 重定向跳转

permanent 为永久重定向参数

```nginx
example1.com {
    redir https://example2.com{uri} permanent
}
```

### 同网站启用多个域名

```nginx
example1.com, example2.com {
    ...
}
```

### 反向代理

```nginx
example.com {
    reverse_proxy 127.0.0.1:8080
}
```

### 静态文件服务

file_server 加上 browse 参数开启文件目录功能

```nginx
example.com {
    root /srv/http
    file_server
}
```

## Nginx

[Nginx](https://nginx.org) 是一个高性能的 HTTP 和反向代理服务器，也是一个 IMAP/POP3/SMTP 代理服务器

[Nginx Proxy Manager](https://nginxproxymanager.com) 是一个 Nginx 可视化的反向代理管理系统，以下在用到时会简称为 NPM

### 开启强制 HTTPS

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com;

    ...
}
```

### 部署静态文件

NPM 中添加一个代理，Forward Hostname / IP 填 `127.0.0.1`，Forward Port 填 `80`，在 Advanced 列添加以下内容，`/data/www` 即为映射到容器中的静态文件的目录

```nginx
location / {
    root /data/www;
}
```

### 关闭 ip 访问

添加以下 server 配置

```nginx
server {
    listen 80;
    server_name _;
    return 444;
}
```

### 反向代理

添加以下 server 示例

```nginx
server {
    set $forward_scheme http;
    set $server 127.0.0.1;
    set $port 8080;

    listen 80;
    server_name example.com;

    location / {
        add_header X-Served-By $host;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Scheme $scheme;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass $forward_scheme://$server:$port$request_uri;
    }
}
```

### 实现 HTTPS 正向代理

需要添加 ngx_http_proxy_connect_module 模块，以及 http_stub_status_module 和 http_ssl_module 模块

- 前者安装方式详见 [ngx_http_proxy_connect_module#install](https://github.com/chobits/ngx_http_proxy_connect_module#install)
- 后者在编译时添加参数 `--with-http_stub_status_module --with-http_ssl_module`

添加以下 server 配置

```nginx
server {
    listen 8080;
    server_name 0.0.0.0;

    resolver 8.8.8.8;

    proxy_connect;
    proxy_connect_allow 443 80;
    proxy_connect_connect_timeout 10s;
    proxy_connect_data_timeout 10s;

    location / {
        proxy_pass http://$host;
        proxy_set_header Host $host;
    }
}
```

### localhost 无法访问

将 server_name 改为 `0.0.0.0` 将监听所有可用的网络接口，即可以从本地网络中的其他计算机访问该服务

### 实现站点伪静态

在 server 中添加如下信息

```nginx
location / {
    try_files $uri $uri/ /index.php?$args;
}
```
