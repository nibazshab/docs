# Docker 容器引擎

Docker 是一种将软件程序与应用程序运行所需的所有其他软件，例如操作系统、第三方软件库等捆绑在一起的技术。这样捆绑的软件称为容器，好处是它们可以在不同类型的计算机上运行，例如笔记本电脑和 Web 服务器，而不会存在因缺少软件库或不同操作系统而导致应用程序崩溃的风险不工作

Compose 是用于定义和运行多个容器 Docker 应用程序的工具。通过 Compose，你可以使用 YAML 文件来配置应用程序需要的所有服务，通过使用对应的命令 docker-compose，就可以创建并启动所有服务

## 默认网桥

`172.17.0.1` 用于宿主机与容器的网络相互通信

## containerd 默认路径

默认位于 `/opt/containerd`，修改的方法如下

1. 输入 `containerd config default > /etc/containerd/config.toml` 生成默认配置文件
2. 找到 ___[plugins."io.containerd.internal.v1.opt"]___
3. 修改该项的 path 值
4. 输入 `systemctl restart containerd.service` 重启服务

## 换源

由于不可抗力，国内 Docker 镜像源全部停止服务

::: details 使用方法
创建 `/etc/docker/daemon.json` 文件，并写入如下内容

```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com"
  ]
}
```

输入 `systemctl daemon-reload` 重新加载配置文件，输入 `systemctl restart docker` 重启 docker 服务
:::

## 自制容器镜像

新建镜像目录，创建 rootfs 文件夹，将容器需要的文件按目录层级放入，并于同一级目录创建并编写构建镜像的配置描述文件 Dockerfile

```dockerfile
# 基于 alpine 镜像构建内容
FROM alpine AS build
# 定义构建时的环境变量
ARG name=value
# 定义工作目录
WORKDIR /rootfs
# 将 rootfs 目录复制到镜像中
COPY rootfs .
# 赋予 init 文件执行权限
RUN chmod +x init
# 基于 alpine 镜像发布
FROM alpine
# 将 build 镜像中的 /rootfs 目录复制过来
COPY --from=build /rootfs /
# 挂载的目录，运行时使用，构建时不应存放任何内容
VOLUME ["/c", "/d"]
# 容器启动时执行的命令
ENTRYPOINT ["/init"]
```

init 是容器启动时所执行的脚本文件，示例

```sh
#!/bin/sh
exec /app
```

也可以直接在 ENTRYPOINT 中填写命令，如果有参数附带使用 `"",` 分隔。例如命令 `/bin/ls -al /` 为 `ENTRYPOINT ["/bin/ls", "-al", "/"]`

输入 `docker build -t ID:TAG .` 构建镜像，若要使用代理，则添加参数例如 `--build-arg http_proxy=172.17.0.1:7890`

::: tip 额外内容
scratch 是大小为 0kb 的空白镜像  
busybox:glibc 带有基本 shell 和 glibc 的最小镜像

容器初始化进程工具推荐 dumb-init，s6-overlay
:::

alpine 系统镜像换源

```sh
sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
```

或在安装时直接指定源地址

```sh
apk add wget --repository http://mirrors.aliyun.com/alpine/v3.18/main/
```

## 容器配置文件

compose.yml

```yml
services:
  NAME:
    image: IMAGENAME
    restart: unless-stopped # 若容器非手动停止，则自动重启
    environment:
      - KEY=key # 设置容器内环境变量 KEY 的值为 key
    ports:
      - 8080:80 # 把主机的 8080 端口映射为容器的 80 端口
      # 0.0.0.0:8080:80 监听 ipv4
      # :::8080:80 监听 ipv6
      # 8080:80/udp 监听 udp
    volumes:
      - ./data:/data # 把 ./data 映射为容器的 /data 目录
    mem_limit: 1g # 限制内存大小 1g
    depends_on:
      - DEPNAME # 当 DEPNAME 容器启动成功后再启动
  DEPNAME:
```

## 命令

`docker \`

- `system df` 查看储存情况
- `compose -f data.yml up` 指定配置文件启动
- `stats` 查看容器占用
- `run --rm -it ID sh` 启动一个临时容器环境
- `cp ID:/file ./file` 从容器中复制文件到宿主机
- `exec -it ID COMMAND` 执行容器内部的命令
- `ps -a` 查看所有的容器及状态
- `compose logs -f` 查看容器日志
- `compose up -d / stop / down / pull` 启动容器 / 停止容器 / 移除容器 / 更新镜像
- `system prune -a` 清理所有不在使用的镜像和容器
- `save ID -o ID.tar` 导出镜像
- `login/logout` 登录 / 登出 dockerhub 账号
- `push ID` 推送镜像到 dockerhub

## overlay2 出现错误

关闭所有容器，删除 `/var/lib/docker/overlay2` 目录，输入 `docker system prune -a` 清理环境，并关闭 docker 服务再重新启动
