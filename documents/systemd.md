# Systemd 服务

systemd 是一个 Linux 系统基础组件的集合，提供了一个系统和服务管理器，运行为 PID 1 并负责启动其它程序

系统级单元路径：

- `/usr/lib/systemd/system/` 软件包单元
- `/etc/systemd/system/` 系统管理员单元

用户级单元路径：

- `/usr/lib/systemd/user/` 软件包单元
- `~/.local/share/systemd/user/` 家目录中的软件包单元
- `/etc/systemd/user/` 系统管理员指定的用户单元
- `~/.config/systemd/user/` 用户单元

### 单元文件

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

### 定时任务

创建同名的 service 和 timer 文件，可以启动定时任务，随后输入 `systemctl enable --now foo.timer` 启动即可

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

### 修改现有文件

修改已有的服务可以通过 `systemctl edit foo.service` 命令，在其中写入的任何内容都会被附加到已有的服务文件中，如果要替换一个可以多次设值的选项，应当先清空它

```ini
[Service]
ExecStart=
ExecStart=/bin/foo --help
```

如果要完全的替换服务文件，应在输入编辑命令时加入 `--full` 参数，完成后使用 `systemctl restart foo.service` 重新加载
