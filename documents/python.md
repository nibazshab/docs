# Python

整理文件夹

```py
import os
import shutil

# 进入 ev 目录
os.chdir("ev")

# 遍历子目录，移动所有 png 文件到当前目录
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.lower().endswith('.png'):
            src_path = os.path.join(root, file)
            dest_path = os.path.join(os.getcwd(), file)

            # 处理文件名冲突
            if os.path.exists(dest_path):
                base, ext = os.path.splitext(file)
                counter = 1
                while True:
                    new_name = f"{base}_{counter}{ext}"
                    new_dest = os.path.join(os.getcwd(), new_name)
                    if not os.path.exists(new_dest):
                        dest_path = new_dest
                        break
                    counter += 1
            shutil.move(src_path, dest_path)
```

备份数据库并上传 webdav

```py
import datetime
import subprocess
import requests
import gzip
import os

def set_file_name(name):
    global file_name
    file_name = f"{name}.{time}.sql"

def backup_sql(host, user, password, database):
    cmd = f"mysqldump -h {host} -u {user} -p'{password}' {database} --no-tablespaces > {file_path}{file_name}"
    try:
        subprocess.run(cmd, shell=True, check=True)
        print("备份成功")
    except subprocess.CalledProcessError as e:
        print(f"备份失败：{e}")

def compress_file():
    gzip_file_name = f"{file_name}.gz"
    with open(f"{file_path}{file_name}", 'rb') as f_in:
        with gzip.open(f"{file_path}{gzip_file_name}", 'wb') as f_out:
            f_out.writelines(f_in)
    print(f"文件已压缩为 {gzip_file_name}")
    return gzip_file_name

def upload(gzip_file_name):
    webdav_url = f"https://webdav/sql/{gzip_file_name}"
    with open(f"{file_path}{gzip_file_name}", "rb") as f:
        file_data = f.read()
    response = requests.put(
        webdav_url,
        data=file_data,
        headers={"Content-Type": "application/octet-stream"},
        auth=("user", "123456"),
    )
    if response.status_code == 201 or response.status_code == 204:
        print("上传成功")
    else:
        print(f"上传失败，状态码: {response.status_code}")
        print(response.text)

time = datetime.datetime.now().strftime("%Y-%m-%d")
file_path = "/home/"

set_file_name("c1")
backup_sql("mysql.c1", "root", "123456", "c1")
gzip_file_name = compress_file()
upload(gzip_file_name)
```

爬取小说网站的网页 html 内容

```py
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

url = "https://www.ql"

ida = 1
while ida < 5:
    print(f"当前页：{url}")
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        html_content = response.content
        soup = BeautifulSoup(html_content, 'html.parser')

        title = soup.find('h1').text.strip() # 处理标题去掉多余的空格

        # 提取内容中的每个 <p> 标签，保留段落关系
        paragraphs = soup.find('div', {'id': 'content'}).find_all('p')
        content = "\n\n".join([para.text.strip() for para in paragraphs if para.text.strip()])

        # 查找下一页链接
        next_page_tag = soup.find('p', {'id': 'page_next'}).find('a')
        if next_page_tag and next_page_tag.has_attr('href'):
            next_page_url = next_page_tag['href']
            next_page_url = urljoin(url, next_page_url)
        else:
            print("没有找到下一页链接")
            next_page_url = None

        # 保存当前页内容
        file = f"dist/a{ida}.txt"
        with open(file, 'w', encoding='utf-8') as f:
            f.write(f"标题：{title}\n\n{content}")
        print(f"标题：{title}\n已写入：{file}\n下一页：{next_page_url}\n")

        # 如果没有下一页链接，停止爬取
        if not next_page_url:
            break

        # 更新url为下一页
        url = next_page_url
        ida += 1
    else:
        print("请求失败\n")
        break
```

将首行（标题）相同的文件合并为一个文件

```py
import os
i = 0
ida = 1
while (ida < 400):
    file = f"dist/a{ida}.txt"
    with open(file, 'r') as f:
        head2 = f.readline()
        if head1==head2:
            join = f"join/b{i}.txt"
            print(f"{file}：合并 {join}")
            with open(join, 'a+') as outfile:
                outfile.write(f.read())
        else:
            i+=1
            join = f"join/b{i}.txt"
            print(f"{file}：保存至 {join}")
            head1=head2
            with open(join, 'a+') as outfile:
                outfile.write(head2)
                outfile.write(f.read())
        ida += 1
```

响应 curl -X POST -d "key=$SECRET&link=$LINK"，key 作为认证参数，link 作为接受到的文本信息参数

```py
from flask import Flask, request
import os
app = Flask(__name__)
@app.route('/', methods=['POST'])
def handle_post():
    key = request.form.get('key')
    link = request.form.get('link')

    if key == 'SECRET':
        command = f'echo The Link is: {link}'
        os.system(command)
        return f'Link: {link}'
    else:
        return 'Invalid key'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
```

smtp 发送邮件

```py
import smtplib

# 设置邮件发送服务器
smtp_server = ''
smtp_port =

# 创建SMTP会话
smtp = smtplib.SMTP(smtp_server, smtp_port)
smtp.login('', '')

# 设置发件人和收件人邮箱地址
sender_email = ''
receiver_email = ''

# 构造邮件内容
subject = 'Hello from Python'
body = 'This is a test email sent using Python smtplib without SSL.'

message = 'Subject: {}\n\n{}'.format(subject, body)

# 发送邮件
smtp.sendmail(sender_email, receiver_email, message)

# 退出SMTP会话
smtp.quit()
```
