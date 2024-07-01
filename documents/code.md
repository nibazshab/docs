# 代码开发经验记录

## css

```css
small { color: #777777; } /* 旁注文字 */

/* 页脚样式 */
footer {
    position: absolute;
    bottom: 0px;
    width: 100%;
    text-align: center;
}

/* 禁止选中文字 */
.unselectable { user-select: none; }

/* 大背景框 */
div {
    position: absolute;
    top: 15px; bottom: 15px; left: 15px; right: 15px;
}

{
    min-height: 100vh; /*最小高度为整个屏幕*/
    display: inline-block; /* 不换行显示 */
    border: 3px solid #aa8; /* 边框 */
    border-radius: 10px; /* 圆角 */
    box-shadow: 0px 0px 25px #c77; /* 阴影 */
    padding: 30px; /* 内边距 */
    margin: 50px auto; /* 外边距 */
    cursor: pointer; /* 改变鼠标样式 */
}

```

## html

```html
<!-- 全角空格 -->
&emsp;

<!-- 折叠内容 -->
<details>
<summary>more</summary>
<p>text</p>
</details>

<!-- 更改字符编码 -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<!-- 纯文本格式显示 -->
<meta http-equiv="Content-Type" content="text/plain; charset=utf-8">

<!-- 适配手机页面 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 自动跳转其他网站 -->
<meta http-equiv="refresh" content="0; URL='https://example.com'">
```

## go

响应 webhook 并保存文件到本地

```go
func main() {
    http.HandleFunc("/0gxFztNrJBeBsCcwuTBdQbxchPDcVEyL", HandleWebhook)
    http.ListenAndServe(":10000", nil)
}

func HandleWebhook(w http.ResponseWriter, r *http.Request) {
    if r.Method == "POST" {
        resp, _ := http.Get("https://example.com/index.html")
        defer resp.Body.Close()
        file, _ := os.OpenFile("/srv/http/index.html", os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0666)
        defer file.Close()
        io.Copy(file, resp.Body)
        fmt.Fprint(w, "OK")
    }
}
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

## 其他

c 冒泡排序

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

## 配置部分

php 启动内置 web 服务 `php -S 0.0.0.0:8000`

rustup 换源安装

```sh
RUSTUP_DIST_SERVER=https://mirrors.tuna.tsinghua.edu.cn/rustup rustup install stable
```

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

npm 换源阿里

```sh
npm config set registry https://registry.npmmirror.com
```

pip 换源清华

```sh
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

go 换源阿里

```sh
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct
```

go 代码格式化

```sh
go install mvdan.cc/gofumpt@latest # 安装格式化工具
gofumpt -l -w . # 使用命令
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
