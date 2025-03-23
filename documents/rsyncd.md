# 远程数据同步 Rsync

Rsync 是一个数据同步工具，支持全量 / 增量备份，支持本地复制，或者远程与其他主机同步

https://rsync.samba.org

## 服务端

假定 远程服务器 IP 地址 192.168.1.2，用户 atri

编辑 /etc/rsyncd.conf 文件，写入如下内容

```ini
#uid = nobody
#gid = nobody
#use chroot = no
#max connections = 4
#syslog facility = local5
#pid file = /run/rsyncd.pid
#port = 873

# 此模块的名称
[backup]
# 数据存放的路径
path = /home/backup
#  描述信息
comment = Backup - Rsync Server
# 是否保持只读
read only = no
# 允许的用户，虚拟的，不需要存在于系统中
auth users = atri
# 密码文件
secrets file = /home/.rsyncd.secret
```

随后创建 /home/.rsyncd.secret 文件，写入用户和对应的密码，示例如下

```
atri:password
```

输入 `chmod 600 /home/.rsyncd.secret` 将密码文件的权限设为 600

输入如下命令开启 rsync 守护进程，可使用 --config= 指定配置文件，默认加载 /etc/rsyncd.conf

```sh
rsync --daemon
```

如果使用 systemd 等后台服务工具，则需要加上 --no-detach 参数使得保持前台运行，如使用包管理器安装，应直接输入 `systemctl enable --now rsyncd` 即可

## 客户端

创建 .rsync_pw 文件，写入密码，并将权限设为 600

```
password
```

输入 `rsync rsync://192.168.1.2` 查看服务器中的模块，应得到如下信息

```
backup           Backup - Rsync Server
```

左侧的 backup 即为在服务端配置中的模块名称

输入如下命令，传输数据。如果宽度较小，可以对其进行限速，例如添加参数 --bwlimit=50 即为限速到 50kb/s

```sh
rsync -avzhPu /data rsync://atri@192.168.1.2/backup --password-file=.rsync_pw
```

参数解释：

1. `-a` 保留元数据
2. `-v` 显示详细信息
3. `-z` 使用压缩
4. `-h` 显示传输状态
5. `-P` 允许中断传输
6. `-u` 不同步修改日期比远程早的文件

## 常见问题

- failed: Permission denied (13)

在服务端将 path 对应的路径权限设为 755
