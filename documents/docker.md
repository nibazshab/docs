# Docker 容器引擎

Docker 是一种将程序与运行所需的其他软件捆绑在一起的技术

Compose 是用于定义和运行多个容器 Docker 应用程序的工具

#### 默认网桥

地址 172.17.0.1，用于宿主机与容器的网络相互通信

#### 修改 containerd 默认路径

默认位于 /opt/containerd

1. 输入 `containerd config default > /etc/containerd/config.toml` 生成默认配置文件
2. 找到 `[plugins."io.containerd.internal.v1.opt"]`
3. 修改 path 值
4. 重启 containerd.service 服务

#### 换源

由于不可抗力，国内 Docker 镜像源全部停止服务

::: details 使用方法
创建 /etc/docker/daemon.json 文件，并写入如下内容

```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com"
  ]
}
```

输入 `systemctl daemon-reload` 重新加载配置文件，输入 `systemctl restart docker` 重启 docker 服务

- 腾讯云内网源 `https://mirror.ccs.tencentyun.com`
:::

#### 自制容器镜像

新建镜像目录，创建 rootfs 文件夹，将容器需要的文件按目录层级放入，并于同一级目录创建并编写构建镜像的配置描述文件 Dockerfile

```dockerfile
# 基于 alpine 镜像构建内容
FROM alpine AS build
# 定义构建时的环境变量
ARG name=value
# 指定用户
USER 1000
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

此处将 init 文件设为容器启动时执行，示例内容

```sh
#!/bin/sh
exec /app
```

也可以直接在 ENTRYPOINT 中填写命令，如果有参数附带使用 `"",` 分隔。例如 `/bin/ls -al /` 为 `ENTRYPOINT ["/bin/ls", "-al", "/"]`

输入 `docker build -t ID:TAG .` 构建镜像，代理使用参数 --build-arg http_proxy=172.17.0.1:7890

> scratch 大小为 0kb 的空白镜像，busybox:glibc 带有基本 shell 和 glibc 的最小镜像  
> 容器初始化进程工具推荐 dumb-init，s6-overlay

#### alpine 系统镜像换源

```sh
sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
```

或在安装时直接指定源

```sh
apk add wget --repository http://mirrors.aliyun.com/alpine/v3.18/main/
```

#### 导出构建的二进制文件

利用 docker 的隔离性，可以用来编译文件并导出，以下是一个示例。需要安装 docker-buildx

```dockerfile
FROM rust:alpine AS build
WORKDIR /src
COPY <<EOT hello.rs
fn main() {
    println!("Hello World!");
}
EOT
RUN rustc -o /bin/hello hello.rs

FROM scratch
COPY --from=build /bin/hello /
```

输入 `docker build --output=. .` 即可构建 hello 文件，并导出在主机的当前目录

#### 容器配置文件

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
    deploy:
      resources:
        limits:
          cpus: '0.70' # 限制 cpu 使用率 70%
          memory: 1.5g # 限制内存使用 1.5g
    depends_on:
      - DEPNAME # 当 DEPNAME 容器启动成功后再启动
  DEPNAME:
    image: IMAGENAME
    ...
```

#### 命令

```sh
docker system df # 查看储存情况
docker compose -f data.yml up # 指定配置文件启动
docker stats # 查看容器占用
docker run --rm -it ID sh # 启动一个临时容器环境
docker cp ID:/file ./file # 从容器中复制文件到宿主机
docker exec -it ID COMMAND # 执行容器内部的命令
docker ps -a # 查看所有的容器及状态
docker compose logs -f # 查看容器日志
docker compose up -d / stop / down / pull # 启动容器 / 停止容器 / 移除容器 / 更新镜像
docker system prune -a # 清理所有不在使用的镜像和容器
docker save ID -o ID.tar # 导出镜像
docker login/logout # 登录 / 登出 dockerhub 账号
docker push ID # 推送镜像到 dockerhub
```

#### overlay2 出现错误

关闭所有容器，删除 /var/lib/docker/overlay2 目录，输入 `docker system prune -a` 清理环境，并关闭 docker 服务再重新启动
