# 代码开发经验记录

## css

```css
{
    overflow: hidden; /*隐藏溢出部分*/
    min-height: 100vh; /*最小高度为整个屏幕*/
    display: inline-block; /* 同一行显示的块级元素 */
    border: 3px solid #aa8; /* 边框 */
    border-radius: 10px; /* 圆角 */
    box-shadow: 0px 0px 25px #c77; /* 阴影 */
    padding: 30px; /* 内边距 */
    margin: 50px auto; /* 外边距 */
    cursor: pointer; /* 改变鼠标样式 */
    user-select: none; /* 禁止选中文字 */
}

/* 消除页面白边 */
body { margin: 0; }

/* 粘性显示的页脚 */
footer {
    position: sticky;
    top: 100vh;
    width: 100%;
}

/* 固定显示的页眉 */
header {
    position: fixed;
    top: 0px;
    width: 100%;
}

/* 大背景框 */
div {
    position: absolute;
    top: 15px; bottom: 15px; left: 15px; right: 15px;
}
```

## html

```html
<!-- 全角空格 -->
&emsp;

<!-- 折叠内容 -->
<details><summary>more</summary>
<p>hello</p>
</details>

<!-- 指定字符编码 -->
<meta charset="utf-8">

<!-- 适配手机 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 自动跳转其他网站 -->
<meta http-equiv="refresh" content="0; URL='https://example.com'">
```

## go

静态文件服务器

```go
http.ListenAndServe(":80", http.FileServer(http.Dir("./")))
```

生成随机字符串

```go
const letter_bytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const (
    letter_idx_bits = 6
    letter_idx_mask = 1<<letter_idx_bits - 1
    letter_idx_max  = 63 / letter_idx_bits
)
var src = rand.NewSource(time.Now().UnixNano())
func RandStringBytesMaskImprSrcUnsafe(n int) string {
    b := make([]byte, n)
    for i, cache, remain := n-1, src.Int63(), letter_idx_max; i >= 0; {
        if remain == 0 {
            cache, remain = src.Int63(), letter_idx_max
        }
        if idx := int(cache & letter_idx_mask); idx < len(letter_bytes) {
            b[i] = letter_bytes[idx]
            i--
        }
        cache >>= letter_idx_bits
        remain--
    }
    return *(*string)(unsafe.Pointer(&b))
}
```

## c

冒泡排序

```c
int n[10] = { 25,35,68,79,21,13,98,7,16,62 };
int i, j, temp;
for (i = 1; i <= 9; i++){
    for (j = 0; j <= 9 - i; j++){
        if (n[j] > n[j + 1]){
            temp = n[j];
            n[j] = n[j + 1];
            n[j + 1] = temp;
        }
    }
}
```

## 其他内容

php 启动内置 web 服务 `php -S 0.0.0.0:8000`

rustup 换源安装 `RUSTUP_DIST_SERVER=https://mirrors.tuna.tsinghua.edu.cn/rustup rustup install stable`

cargo 换源

```sh
mkdir -vp ${CARGO_HOME:-$HOME/.cargo}

cat << EOF | tee -a ${CARGO_HOME:-$HOME/.cargo}/config
[source.crates-io]
replace-with = 'mirror'

[source.mirror]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
EOF
```

npm 换源阿里 `npm config set registry https://registry.npmmirror.com`

pip 换源清华 `pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple`

go 换源阿里 `go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct`

go 代码格式化

```sh
go install mvdan.cc/gofumpt@latest # 安装工具
gofumpt -l -w .
```

go 静态编译

```sh
GOOS=windows GOARCH=amd64 # 交叉编译参数
CGO_ENABLED=0 go build -ldflags="-s -w"
```

c 静态编译，使用 musl

```sh
make LDFLAGS=-static
./configure --enable-static --disable-shared
```

去除静态文件的无用符号信息 `strip file`

[upx](https://upx.github.io) 压缩二进制文件体积 `upx --ultra-brute file`

## HTTP content-type

- application/octet-stream 二进制流数据
- text/plain 纯文本格式
- multipart/form-data 表单上传文件时使用
