# EPUB 电子书文件

EPUB 是电子出版物的一种开放标准格式

- 拆解篇 [跳转](#文件结构)
- 其他内容篇 [跳转](#其他内容)

## 文件结构

EPUB 实质上是一个可以解压的 zip 归档文件，使用 xhtml 规范编写内容。结构示例如下

- **mimetype** 描述文件
- META-INF
  - **container.xml** 描述文件
- OEBPS
  - **content.opf** 元数据文件
  - Styles
    - style.css 排版样式
  - Text
    - cover.xhtml 封面
    - titlepage.xhtml 扉页
    - colophon.xhtml 版权
    - message.xhtml 制作信息
    - prologue.xhtml 简介
    - illustration.xhtml 彩插
    - character.xhtml 人物介绍
    - **nav.xhtml** 目录文件（epub3）
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

## 各文件具体内容

仅作示例参考

### 数据文件

xhtml 标准模板示例，以下 .xhtml 文件省略此部分

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title></title>
  <link href="../Styles/style.css" rel="stylesheet" type="text/css"/>
</head>
<body></body>
</html>
```

封面、封底等纯图片页面，通常由电子书制作工具自动生成具有复杂样式的内容，一般直接写入图片标签即可

```xml
<img src="../Images/cover.jpg"/>
```

章节正文，内容一般由标题、正文、图片、注释组成

```xml
<!-- 标题图 -->
<img src="../Images/x0100.jpg"/>

<!-- 标题 -->
<h3>第一话</h3>
<h2>与天使大人的相遇</h2>

<!-- 正文 -->
<p>...</p>

<!-- 注释 -->
<small>注：</small>

<!-- 正文插图 -->
<img src="../Images/x0101.jpg"/>
```

目录文件 nav.xhtml，应在一个列表中包含每一个文件的链接，通常由电子书制作工具自动生成

```xml
<!-- 隐藏默认目录样式 -->
<style>nav { display: none; }</style>

<nav epub:type="toc" id="toc" role="doc-toc">
<ol>
  <li><a href="cover.xhtml">封面</a></li>
  <li><a href="prologue.xhtml">简介</a></li>
  <li><a href="x01.xhtml">第一话 与天使大人的相遇</a></li>
  <li><a href="epilogue.xhtml">后记</a></li>
</ol>
</nav>
```

特典部分与正文并无不同，以下是一个简单的起始页，表明从这里开始是特典内容

```xml
<div class="center" style="margin: 4em 0 0 0;">
  <p style="font-size: 1.7em;">特典小册子</p>
</div>
```

排版样式文件 style.css 示例如下

```css
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

元数据文件 content.opf，较为复杂，通常由电子书制作工具自动生成。metadata 标签内记录电子书描述信息，manifest 标签内记录包含的所有数据文件，spine 标签内记录目录顺序，且应与 nav.xhtml 中记录的目录顺序相同

```xml
<?xml version="1.0" encoding="utf-8"?>
<package version="3.0" unique-identifier="BookId" xmlns="http://www.idpf.org/2007/opf">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
    <dc:language>zh</dc:language>
    <dc:title>书名</dc:title>
    <dc:creator opf:role="aut">作者</dc:creator>
    <meta name="cover" content="cover.jpg" />
  </metadata>
  <manifest>
    <item id="style.css" href="Styles/style.css" media-type="text/css"/>
    <item id="nav.xhtml" href="Text/nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="cover.xhtml" href="Text/cover.xhtml" media-type="application/xhtml+xml" properties="svg"/>
    <item id="x01.xhtml" href="Text/x01.xhtml" media-type="application/xhtml+xml"/>
    <item id="prologue.xhtml" href="Text/prologue.xhtml" media-type="application/xhtml+xml"/>
    <item id="epilogue.xhtml" href="Text/epilogue.xhtml" media-type="application/xhtml+xml"/>
    <item id="x0100.jpg" href="Images/x0100.jpg" media-type="image/jpeg"/>
    <item id="x0101.jpg" href="Images/x0101.jpg" media-type="image/jpeg"/>
    <item id="cover.jpg" href="Images/cover.jpg" media-type="image/jpeg" properties="cover-image"/>
  </manifest>
  <spine>
    <itemref idref="nav.xhtml" linear="no"/>
    <itemref idref="cover.xhtml"/>
    <itemref idref="prologue.xhtml"/>
    <itemref idref="x01.xhtml"/>
    <itemref idref="epilogue.xhtml"/>
  </spine>
</package>
```

如果是电子漫画形式的文件，应在 metadata 中加上如下标签，original-resolution 值需要根据漫画图片的分辨率而自行修改

```xml
<meta name="book-type" content="comic" />
<meta name="fixed-layout" content="true" />
<meta name="RegionMagnification" content="false" />
<meta name="zero-gutter" content="true" />
<meta name="zero-margin" content="true" />
<meta name="original-resolution" content="1353x1920" />
```

### 描述文件

mimetype

```
application/epub+zip
```

container.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
    <rootfiles>
        <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
   </rootfiles>
</container>
```

## 其他内容

|工具名称|功能描述|
|-|-|
|Sigil|EPUB 电子书制作工具|
|KindleUnpack|解包 Amazon / Kindlegen 专有电子书格式|
|Kindle Comic Converter|漫画电子书制作工具|
|Calibre|经典电子书工具|

### 正则匹配标题

```
^\s*[第卷][0123456789一二三四五六七八九十零〇百千两]*[章回部节集卷].*
```

### 字体提取

为了美化样式，在电子书中会使用各种字体，以下 python 代码可以从完整的字体集中提取仅包含个别文字的字体集，降低文件大小

```py
import os
import re

fonts = """
要提取的文字内容
"""

fonts = ''.join(set(re.sub(r'\s', '', fonts)))
os.system(
    f'pyftsubset title.ttf --text={fonts} --output-file=title.min.ttf'
)
```

## 字体与界面

阅读字体：[霞鹜文楷 LXGW WenKai](https://github.com/lxgw/LxgwWenKai)

白天模式：文字 `#321309` 背景 `#F4E9DE`

夜间模式：文字 `#A3A3A3` 背景 `#060606`

---

标准字体：[思源黑体 Source Han Sans](https://github.com/adobe-fonts/source-han-sans) - Language Specific OTFs Simplified Chinese

衬线字体：[思源宋体 Source Han Serif](https://github.com/adobe-fonts/source-han-serif) - Language Specific OTFs Simplified Chinese

等宽字体：[Source Code Pro](https://github.com/adobe-fonts/source-code-pro)
