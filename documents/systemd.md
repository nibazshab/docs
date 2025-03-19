# Systemd 服务

systemd 是一个 Linux 系统基础组件的集合，提供了一个系统和服务管理器，运行为 PID 1 并负责启动其它程序

系统级单元路径：

- /usr/lib/systemd/system/ 软件包单元
- /etc/systemd/system/ 系统管理员单元

用户级单元路径：

- /usr/lib/systemd/user/ 软件包单元
- ~/.local/share/systemd/user/ 家目录中的软件包单元
- /etc/systemd/user/ 系统管理员指定的用户单元
- ~/.config/systemd/user/ 用户单元

#### 单元文件

```ini
[Unit]
Description=描述
[Service]
ExecStart=启动命令
Restart=on-failure
[Install]
#WantedBy=default.target #用户级单元使用
WantedBy=multi-user.target
```

可以通过 `Environment="a=1"` 定义环境变量

#### 创建一个新服务

如果存在同名文件，会直接覆盖

```sh
systemctl edit --force --full foo.service
```

#### 链接文件

创建一个软链接，指向该文件

```sh
systemctl link ./foo.service
```

#### 查看已有服务

查看已有的服务由哪些文件组成，并显示内容

```sh
systemctl cat foo.service
```

#### 修改现有服务

会在 foo.server 同级目录中创建一个 foo.service.d/override.conf 文件，并记录修改的内容，随后会附加到 foo.server 中

如果要完全的替换现有服务文件，应加入 `--full` 参数，随后正常按照新的文件来写

```sh
systemctl edit foo.service
```

如果要替换一个可以多次设值的选项，应当先清空该项，例如

```ini
[Service]
ExecStart=
ExecStart=/bin/foo --help
```

修改完成后需要重新启动服务

#### 定时任务

创建同名的 service 和 timer 文件，可以启动定时任务，随后启动 foo.timer 即可

/etc/systemd/system/foo.service

```ini
[Unit]
Description=foo
[Service]
#WorkingDirectory=/opt #指定工作目录
ExecStart=/bin/foo
```

/etc/systemd/system/foo.timer

```ini
[Unit]
Description=foo at 2:00 and 19:00
[Timer]
OnCalendar=*-*-* 2,19:00:00 # 每天 2 点和 19 点
[Install]
WantedBy=multi-user.target
```
