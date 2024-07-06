# EPUB 电子书文件拆解

EPUB 是电子出版物的一种开放标准格式

## 文件结构

EPUB 实质上是一个可以解压的 zip 归档文件，使用 xhtml 规范编写内容。结构示例如下，带有 __文件__ 字样的必须与下表名称保持一致，不可自行修改

- mimetype 描述文件
- META-INF
  - container.xml 描述文件
- OEBPS
  - content.opf 元数据文件
  - Styles
    - style.css 排版样式
  - Text
    - nav.xhtml 目录文件
    - cover.xhtml 封面
    - titlepage.xhtml 扉页
    - colophon.xhtml 版权
    - message.xhtml 制作信息
    - prologue.xhtml 简介
    - illustration.xhtml 彩插
    - content.xhtml 目录
    - x01.xhtml 第一话
    - x02.xhtml 第二话
    - epilogue.xhtml 后记
    - about.xhtml 关于
    - gallery.xhtml 画集
    - contect.xhtml 联系方式
    - backcover.xhtml 封底
    - pamphlet1.xhtml 特典小册子一
    - p101.xhtml 特典一第一话
  - Images
    - cover.jpg 封面图
    - backcover.jpg 封底图
    - c01.jpg 彩插图一
    - g01.jpg 画集图一
    - content.jpg 目录图
    - x0100.jpg 第一话标题图
    - x0101.jpg 第一话图一
    - p1cover.jpg 特典一封面图

## 各文件详细内容

### 数据文件

封面示例，通常由电子书制作工具自动生成

::: details cover.xhtml、backcover.xhtml

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title></title>
  <link href="../Styles/style.css" rel="stylesheet" type="text/css"/>
</head>

<body>
  <img src="../Images/cover.jpg"/>
</body>
</html>
```

:::

章节内容模板如下

::: details .xhtml

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title></title>
  <link href="../Styles/style.css" rel="stylesheet" type="text/css"/>
</head>

<body>
  <img src="../Images/x0100.jpg"/>
  <h3>第一话</h3>
  <h2>与天使大人的相遇</h2>
  <p>...</p>
  <img src="../Images/x0101.jpg"/>
  <p>...</p>
</body>
</html>
```

:::

目录文件示例，通常由电子书制作工具自动生成

::: details nav.xhtml

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title></title>
  <link href="../Styles/style.css" rel="stylesheet" type="text/css"/>
</head>

<body>
  <nav epub:type="toc" id="toc" role="doc-toc"><h1>目录</h1>

  <ol>
    <li><a href="cover.xhtml">封面</a></li>
    <li><a href="titlepage.xhtml">扉页</a></li>
    <li><a href="message.xhtml">制作信息</a></li>
    <li><a href="prologue.xhtml">简介</a></li>
    <li><a href="illustration.xhtml">彩插</a></li>
    <li><a href="content.xhtml">目录</a></li>
    <li><a href="x01.xhtml">第一话 与天使大人的相遇</a></li>
    <li><a href="x02.xhtml">第二话 感冒与天使大人的照料</a></li>
    <li><a href="epilogue.xhtml">后记</a></li>
    <li><a href="gallery.xhtml">画廊</a></li>
    <li><a href="backcover.xhtml">封底</a></li>
    <li><a href="pamphlet.xhtml">特典小册子</a></li>
    <li><a href="p01.xhtml">不合时宜的</a></li>
  </ol></nav>
</body>
</html>
```

:::

特典页示例

::: details pamphlet.xhtml

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-CN" xmlns:epub="http://www.idpf.org/2007/ops" xmlns:xml="http://www.w3.org/XML/1998/namespace">
<head>
  <link href="../Styles/style.css" rel="stylesheet" type="text/css"/>
  <title></title>
</head>

<body>
  <div class="center" style="margin: 4em 0 0 0;">
    <p style="font-size: 1.7em;">特典小册子</p>
  </div>
</body>
</html>
```

:::

排版样式示例如下

::: details style.css

```css
nav { display: none; }

h2,h3 { text-align: center; }

img {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.center { text-align: center; }

.right { text-align: right; }

small { color: #777777; }
```

:::

元数据文件示例，metadata 标签内记录电子书描述信息，manifest 标签内记录包含的所有数据文件，spine 标签内记录目录顺序且应与 nav.xhtml 的目录顺序相同，通常由电子书制作工具自动生成

::: details content.opf

```xml
<?xml version="1.0" encoding="utf-8"?>
<package version="3.0" unique-identifier="BookId" xmlns="http://www.idpf.org/2007/opf">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
    <dc:title>书名</dc:title>
    <dc:creator opf:role="aut">作者</dc:creator>
    <meta name="cover" content="cover.jpg" />
  </metadata>
  <manifest>
    <item id="style.css" href="Styles/style.css" media-type="text/css"/>
    <item id="nav.xhtml" href="Text/nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="cover.xhtml" href="Text/cover.xhtml" media-type="application/xhtml+xml" properties="svg"/>
    <item id="x01.xhtml" href="Text/x01.xhtml" media-type="application/xhtml+xml"/>
    <item id="x02.xhtml" href="Text/x02.xhtml" media-type="application/xhtml+xml"/>
    <item id="epilogue.xhtml" href="Text/epilogue.xhtml" media-type="application/xhtml+xml"/>
    <item id="message.xhtml" href="Text/message.xhtml" media-type="application/xhtml+xml"/>
    <item id="illustration.xhtml" href="Text/illustration.xhtml" media-type="application/xhtml+xml"/>
    <item id="titlepage.xhtml" href="Text/titlepage.xhtml" media-type="application/xhtml+xml"/>
    <item id="pcover.jpg" href="Images/pcover.jpg" media-type="image/jpeg"/>
    <item id="x0101.jpg" href="Images/x0101.jpg" media-type="image/jpeg"/>
    <item id="x0201.jpg" href="Images/x0201.jpg" media-type="image/jpeg"/>
    <item id="x0202.jpg" href="Images/x0202.jpg" media-type="image/jpeg"/>
    <item id="c01.jpg" href="Images/c01.jpg" media-type="image/jpeg"/>
    <item id="c03.jpg" href="Images/c03.jpg" media-type="image/jpeg"/>
    <item id="g01.jpg" href="Images/g01.jpg" media-type="image/jpeg"/>
    <item id="g02.jpg" href="Images/g02.jpg" media-type="image/jpeg"/>
    <item id="g03.jpg" href="Images/g03.jpg" media-type="image/jpeg"/>
    <item id="backcover.jpg" href="Images/backcover.jpg" media-type="image/jpeg"/>
    <item id="cover.jpg" href="Images/cover.jpg" media-type="image/jpeg" properties="cover-image"/>
    <item id="prologue.xhtml" href="Text/prologue.xhtml" media-type="application/xhtml+xml"/>
    <item id="c02.jpg" href="Images/c02.jpg" media-type="image/jpeg"/>
    <item id="content.xhtml" href="Text/content.xhtml" media-type="application/xhtml+xml"/>
    <item id="gallery.xhtml" href="Text/gallery.xhtml" media-type="application/xhtml+xml"/>
    <item id="backcover.xhtml" href="Text/backcover.xhtml" media-type="application/xhtml+xml"/>
    <item id="pamphlet.xhtml" href="Text/pamphlet.xhtml" media-type="application/xhtml+xml"/>
    <item id="p01.xhtml" href="Text/p01.xhtml" media-type="application/xhtml+xml"/>
  </manifest>
  <spine>
    <itemref idref="nav.xhtml" linear="no"/>
    <itemref idref="cover.xhtml"/>
    <itemref idref="titlepage.xhtml"/>
    <itemref idref="message.xhtml"/>
    <itemref idref="prologue.xhtml"/>
    <itemref idref="illustration.xhtml"/>
    <itemref idref="content.xhtml"/>
    <itemref idref="x01.xhtml"/>
    <itemref idref="x02.xhtml"/>
    <itemref idref="epilogue.xhtml"/>
    <itemref idref="gallery.xhtml"/>
    <itemref idref="backcover.xhtml"/>
    <itemref idref="pamphlet.xhtml"/>
    <itemref idref="p01.xhtml"/>
  </spine>
</package>
```

:::

### 描述文件

电子书的描述文件，通常不对其进行修改

::: details mimetype

```console
application/epub+zip
```

:::

::: details container.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
    <rootfiles>
        <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
   </rootfiles>
</container>
```

:::

## 工具推荐

名称|功能描述
-|-
Sigil|EPUB 电子书制作工具。注：Regex 参数替换时，使用 `\1` 而非 `$1`
KindleUnpack|解包 Amazon / Kindlegen 专有电子书格式

## 字体与界面

阅读字体：[霞鹜文楷 LXGW WenKai](https://github.com/lxgw/LxgwWenKai)

白天模式：文字 `#321309` 背景 `#F4E9DE`

夜间模式：文字 `#A3A3A3` 背景 `#060606`

---

标准字体：[思源黑体 Source Han Sans](https://github.com/adobe-fonts/source-han-sans) - Language Specific OTFs Simplified Chinese

衬线字体：[思源宋体 Source Han Serif](https://github.com/adobe-fonts/source-han-serif) - Language Specific OTFs Simplified Chinese

等宽字体：[Source Code Pro](https://github.com/adobe-fonts/source-code-pro)
