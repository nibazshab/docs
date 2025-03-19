# 编程代码系列记录

记录一些好用的工具和代码

```sh
# python 代码格式化
black a.py

# php 启动内置 web 服务
php -S 0.0.0.0:8000

# pnpm/npm 换源 npmmirror
npm config set registry https://registry.npmmirror.com

# pip 换源清华
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

# go get 换源阿里
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct

# go 逃逸堆分析
-gcflags="-m"

# 检测代码
golangci-lint run ./...

# 检查没有处理的错误
# go install github.com/kisielk/errcheck@latest
errcheck -blank ./...

# 代码格式化
# go install mvdan.cc/gofumpt@latest
gofumpt -l -w .

# 检查从未使用的代码
# go install golang.org/x/tools/cmd/deadcode@latest
deadcode .

# c 静态编译，使用 musl libc 或 mingw64 代替 glibc

# 去除静态文件的无用符号信息
strip file

# upx 工具，压缩二进制文件体积，-d 参数还原
upx --ultra-brute file
```

```go
// gorm 表前缀
NamingStrategy: schema.NamingStrategy{
	TablePrefix: tablePrefix,
},

// gorm 记录浏览量
db.Model(&Data{}).Update("count", gorm.Expr("count + ?", 1))
```

```css
{
    text-indent: 2em; /* 行首缩进 */
    writing-mode: vertical-rl; /* 竖向从右到左排列文字 */
    overflow: hidden; /* 隐藏溢出部分 */
    min-height: 100vh; /* 最小高度为整个屏幕 */
    display: inline-block; /* 同一行显示的块级元素 */
    border: 3px solid #aa8; /* 边框 */
    border-radius: 10px; /* 圆角 */
    box-shadow: 0px 0px 25px #c77; /* 阴影 */
    padding: 30px; /* 内边距 */
    margin: 50px auto; /* 外边距 */
    cursor: pointer; /* 改变鼠标样式 */
    user-select: none; /* 禁止选中文字 */
}

/* 定义深色模式情境下的元素样式 */
@media(prefers-color-scheme: dark) {}

/* 将内部元素均匀排列为一行 */
div {
    display: flex;
    justify-content: space-between; /* 首尾顶格 */
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

```html
<!-- 注释 -->
<ruby>真昼<rt>まひる</rt></ruby>

<!-- 阻止浏览器请求 favicon.ico -->
<link rel="icon" href="data:image/ico;base64,aWNv">

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

```js
// 等待页面加载完成
document.addEventListener("DOMContentLoaded", (event) => {}

// 本站居然运行了x天x小时x分x秒
//<span id="runtime"></span>
const start = new Date(2021, 11, 4, 0, 0, 0);
function Runtime() {
    const now = new Date()
    const diff = now - start
    const _ss = Math.floor(diff / 1000)
    const _mm = Math.floor(_ss / 60)
    const _hh = Math.floor(_mm / 60)
    const dd = Math.floor(_hh / 24)
    const hh = _hh % 24
    const mm = _mm % 60
    const ss = _ss % 60
    document.getElementById('runtime').textContent = `${dd}天${hh}小时${mm}分${ss}秒`
}
setInterval(Runtime, 1000);
Runtime();
```

```c
// 冒泡排序
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

// 不使用中间变量交换两个变量的值
a = a + b;
b = a - b;
a = a - b;
```
