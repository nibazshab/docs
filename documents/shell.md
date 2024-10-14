# SH/PS1/SQL/Git

记录 Shell、PowerShell、SQL、Git 的命令

```sh
# cat 写入文件，'EOL' 表示以下内容不进行转义
cat << EOL > a.txt
hello world
EOL
# wget 走代理下载
wget -e http_proxy=http://127.0.0.1:7890 example.com/index.html
# 定义使用数组
cities=("1" "2" "3")； for city in "${cities[@]}"
# 显示文件的行号，或使用 nl 命令
cat -n a.txt
# 遇到包含 <h1> 字符的行，就拆分成新的文件
i=0; while read h; do if [[ $h == *"<h1>"* ]]; then i=$((i + 1)); fi; echo $h >> $(printf "%0.3d.xhtml" $i); done < a.html
# 生成 uuid，dbus-uuidgen 命令生成没有分隔符的 uuid
uuidgen
# 在终端指定位置显示信息
tput sc; tput cup 23 45; echo Input from tput/echo at 23/45; tput rc
# 查看系统参数
uname -a
# 查询自己的 uid/gid
id
# 创建无法登录的用户 atri
useradd -s /usr/bin/nologin atri
# 删除用户 atri
userdel atri
# 生成 6M 大小的文件
dd if=/dev/urandom of=test bs=1M count=6
# 把 a 中记录的文件名改成 b 中的记录
a=1; for i in $(cat a.txt); do j=$(sed -n "$a p" b.txt); mv "$i" "$j"; a=$(($a+1)); done
# 交换文件奇偶数行
sed -n '1~2p' c.txt > a.txt; sed -n '2~2p' c.txt > b.txt; a=1; for i in $(cat a.txt); do j=$(sed -n "$a p" b.txt); echo "$j" >> d.txt; echo "$i" >> d.txt; a=$(($a+1)); done
# 取 i 值为 1 到 10
for i in {1..10}
# 判断环境变量 C 的值是否为 1，是则执行 ls 命令
[[ "$C" = "1" ]] && { ls; }
# 判断上一个命令是否运行成功，成功输出 1，不成功输出 0
if [ $? -eq 0 ]; then echo 1; else echo 0; fi
# 判断文件 file 是否存在，存在输出 1，不存在输出 0，-d 判断文件夹，-z 和 -n 判断环境变量
if [ -e file ]; then echo 1; else echo 0; fi
# 如果 A > 1 且 B = 0 则 X = X / A
if [[ $A -gt 1 && $B -eq 0 ]]; then X=$(expr $X / $A); fi
# 读取 find 的结果
find | while read i; do echo $i; done
# 无限重复指令
while true; do 命令; done
# 调用 gzip 压缩文件，-c 打包，-f 指定文件，-z/-j/-J 调用 gzip/bzip2/xz，-I zstd 调用 zstd，--exclude abc 排除文件 abc
tar -czf file.tar.gz path/
# 解压文件，-x 解压，-v 显示详细过程，--strip-components=1 删除一个层级，-C 指定解压目录
tar -xvf file.tar
# 输出当前时间，年月日时分秒
date +"%Y-%m-%d %H:%M:%S"
# 显示目录文件，-f 完整路径，-p 权限，-D 日期，-i 不显示树状图，-L 2 只显示 2 层目录
tree -fipDL 2
# 设置代理访问，-x 等同 --proxy
curl -x socks5://127.0.0.1:1024 example.com
# 发送 POST 请求，并设置参数 key 为 123456，-F NAME=@FILE 上传文件
curl -X POST -d key=123456 example.com
# 上传文件到 WebDAV 服务器，目录需要加 /
curl -u USERNAME:PASSWORD -T FILE WEBDAV_URL
# 下载 WebDAV 服务器文件
curl -u USERNAME:PASSWORD -O WEBDAV_URL
# 输出 one1 one2 ... three2 three3
echo {one,two,three}{1,2,3}
# 指定输出 2 位小数
printf "%0.2d.txt" $i
# 输出 i 变量的文件名称，不输出的结尾部分的 .md
basename $i .md
# 加法运算
expr $i + 1
# 清理内存缓存
sync && echo 3 | tee /proc/sys/vm/drop_caches
# 设置代理，等效于 http_proxy=ip:port https_proxy=ip:port
export all_proxy=ip:port
# 查看 file 文件的依赖情况
ldd file
# 列出文件，-t 时间顺序，-tr 时间倒序，-v 自然顺序
ls
# 删除重复行
uniq
# 随机打乱文件的行，-i 1-10 随机抽取数字
shuf a.txt
# 删除重复行，会打乱顺序
sort -u a.txt
# 删除所有的换行符，操作行时，需要添加:a;N;和;ta
sed ":a;N;s/\n//g;ta" a.txt
# 把以 a 开头的行中，所有的 b 替换为 c
sed '/^a/s/b/c/' a.txt
# 把包含 key 的行替换成 key=123
sed /key/s/.*/key=123/ a.txt
# 删除包含 ABC 的行，-i 修改文件
sed -i /ABC/d a.txt
# 删除 3-7 行
sed 3,7d a.txt
# 在第 3 行前插入 abc
sed 3iabc a.txt
# 替换文件内容中的 a 为 b，也可以使用 @ 和 : 替换 / 作为分隔符，正则表达式 -E 参数使用 \1 而非 $1
sed s/a/b/g a.txt
# 输出文件奇数行，1~2p 从第 1 行开始，每 2 行输出一次，1,4p 从第 1 行到第 4 行
sed -n 1~2p a.txt
# 匹配大于等于一个字符的行，-P 非贪婪匹配，-o 只输出匹配的部分
grep -E '.{1,}' a.md
# 删除 a.txt 中所有的 aa 字符
tr -d 'aa' < a.txt
# 在 /etc/ 目录搜索内容 abc，-r 递归查找子目录，-n 显示行号
grep -rn 'abc' /etc/
# 获取内容 abc 在文件中的行号
grep -n 内容 文件 | grep -o ^[0-9]*
# 去除 a 变量中 ) 右边所有内容
b=${a%)*}
# 去除 a 变量中 ( 左边所有内容
b=${a#*(}
# 把分隔符设为换行
IFS=$'\n'
# 后台运行
nohup 命令 > log 2>&1 &
# 创建 screen 后台运行会话，-ls 查看会话列表
screen -dmS 会话名 命令
# 进入 screen 后台会话，按 Ctrl + A + D 退出会话
screen -r 会话名
# 查看进程
htop
# 使用 ssh 通道上传文件，-r 包括文件夹
scp -r /a user@host:/a
# 使用指定的密钥 id_key 登入远程服务器，-p 指定端口号
ssh -i ~/.ssh/id_key user@host
# 生成 ed25519 加密的 ssh 密钥
ssh-keygen -t ed25519
# 用私钥生成公钥
ssh-keygen -y -f key > key.pub
# 将公钥上传到服务器
ssh-copy-id -i SSHKEY USER@IP
# 加密文件，-d 解密，-aes-256-cbc 使用 CBC 模式 的 AES-256 算法 ，-pbkdf2 使用 PBKDF2 加密算法，-salt 盐加密
openssl enc -aes-256-cbc -pbkdf2 -salt -in text.txt -out encrypt.txt
# 以 nobody 用户的身份运行命令
su nobody -s /bin/bash -c '命令'
# 导出分区表文件
sfdisk -d /dev/sdb > sdb.bkp
# 导入分区表文件
sfdisk /dev/sdb < sdb.bkp
```

```sh
# fish 添加 PATH
fish_add_path /root/bin
pacman # arch 系列包管理器，-S 安装，-Si 查看信息，-Ql 查看本地文件，-Ss 根据关键词搜索包，-F 根据文件名查询包，-Rs 卸载，-Qdt 查找孤立依赖包，-U 安装本地文件，-Syu 更新所有包，--noconfirm 跳过确认
# 转换 webp 为 png
dwebp a.webp -o a.png
# 转换 jpg 为 avif
avifenc cover.jpg cover.avif
# 压缩 jpg 图片大小
jpegoptim --strip-all --all-progressive -o -f --max=50% a.jpg
# 压缩 png 图片大小， 压缩等级设为 3，可选 1-7
optipng -o3 a.png
# flac 转 wav
flac -d a.flac
# wav 转 flac，指定压缩级别为 5
flac -s --compression-level-5 a.wav
# 重新编码 flac 文件
flac a.flac -V -s --best --no-error-on-compression-fail -o b.flac
# 文件编码 gbk 转换 utf-8
iconv -f gbk -t utf-8 gbk.txt > utf-8.txt
# 查看系统信息，其他 neofetch
fastfetch
# 假装进行非常专业的活动
genact
# 连接 MySQL 数据库
mysql -h SQLHOST -u USER -pPASSWORD SQLNAME
# 导出 MySQL 数据库为 sql 语句
mysqldump -h SQLHOST -u USER -pPASSWORD SQLNAME --no-tablespaces > $(date).sql
# 使用 rclone 挂载云盘为本地目录，并设置缓存路径
rclone mount name:/a /b --cache-dir /c --vfs-cache-mode writes
```

```ps1
# 查看文件 SHA256，MD5
certutil -hashfile file SHA256
```

```sql
-- 导入 sql 文件
SOURCE /sql/file.sql
-- 删除表
DROP TABLE tablename;
-- 查看表的结构
SHOW columns FROM tablename;
-- 查看有哪些表
SHOW tables;
-- 查看表的所有表单数据
SELECT * FROM tablename;
-- 清空表
DELETE FROM tablename;
-- 删除表中序号大于 9 的内容
DELETE FROM tablename WHERE id > 9;
-- 向名为 pb 的表中插入 data 的数据
INSERT INTO pb (data) VALUES ('hahaha');
-- 创建表名为 user，id 整数型，自增长，作为主键，user 字符串型，最大长度 30，不能为空
-- TEXT 类型最大 64k，MEDIUMTEXT 类型最大 16m
CREATE TABLE IF NOT EXISTS user (
  id INT(6) AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(30) NOT NULL
);
```

```sh
# 清空历史提交记录
git checkout --orphan latest_branch
git add -A
git commit -m 'renew'
git branch -d main
git branch -m main
git push -f origin main
# 设置远程地址
git remote set-url origin URL
# 添加标签
git tag v1.0.0
# 推送标签
git push origin v1.0.0
# 查找历史提交中，文件名有 NAME 的文件
git log --all --full-history -- **/*NAME*
# 删除 pr 分支
git branch -d pr
# 查看所有分支
git branch -a
# 切换到 main 分支，分支不存在则创建
git checkout -b main
# 清除已不存在于远程服务器上的远程分支
git remote prune origin
# 查看修改
git status
# 撤销上一次的 commit
git reset HEAD~1
# 为 git 仓库中的文件添加可执行权限
git update-index --chmod=+x a.sh
# 搜索提交记录的版本号
git log --grep=内容
# 回退到指定版本
git reset --hard COMMIT_ID
# 查找历史中的文本内容
git log -S "查找的文本内容" -p
# 拉取远程项目
git pull
# 强制推送
git push -f
# 获取 git 仓库中所有文件的最新修改时间
git ls-tree -r --name-only HEAD | while read f; do
  echo $(git log -1 --format=%ad -- $f) $f
done
# 获取 git 仓库中所有文件的最初创建时间
git ls-tree -r --name-only HEAD | while read f; do
  echo $(git log --format=%ad -- $f | tail -1) $f
done
# 将文件的修改时间设置为 git 仓库中的最新修改时间
git ls-files -z | while read f; do
  touch -d $(git log -1 --format=@%ct $f) $f
done
```
