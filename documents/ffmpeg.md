# FFmpeg 数字媒体处理

[FFmpeg](https://ffmpeg.org) 是一个处理音频和视频的跨平台开源软件

本文仅作简单介绍，不涉及进阶操作

## 安装说明

可以参考官方的说明文档来安装，或者从 [https://github.com/BtbN/FFmpeg-Builds](https://github.com/BtbN/FFmpeg-Builds) 下载每日构建的静态单文件版本

## 查看支持信息

ffmpeg

- -formats 查看支持的封装容器格式
- -codecs 查看支持的编码格式
- -encoders 查看支持的编码器

查看视频的详细信息命令：ffmpeg -i a.mp4

## GPU 加速编解码器

输入 `ffmpeg -codecs | findstr h264` 查看支持的 h264 格式的编解码器，Linux 使用 grep 代替 findstr

```console
DEV.LS h264
H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10
(decoders: h264 h264_qsv libopenh264 h264_cuvid)
(encoders: libx264 libx264rgb libopenh264 h264_amf h264_mf h264_nvenc h264_qsv h264_vaapi)
```

可以看到 decoders 后面的就是解码器的名称，encoders 后面的就是编码器的名称

`h264_qsv` 是 Intel 显卡编解码器，`h264_nvenc` 是 Nvidia 显卡编码器，`h264_cuvid` 是 Nvidia 显卡解码器，`h264_amf` 是 AMD 显卡的编码器

示例，将 hevc 格式的 in.mp4 解码，再编码为 h264 格式的 out.mp4，调用 Intel 显卡硬件加速

```sh
ffmpeg -c:v hevc_qsv -i in.mp4 -c:v h264_qsv out.mp4
```

## 软件编码器

H.264/AVC，推荐使用 libx264

H.265/HEVC，推荐使用 libx265

AV1，推荐使用 libsvtav1，其中 libaom-av1 效果最好但速度很慢，librav1e 速度最快，libsvtav1 兼顾了速度与效率，被作为 AV1 未来开发工作的基础

### 编码示例

```sh
ffmpeg -i a.mp4 -c:v libsvtav1 -crf 18 b.mp4
```

- `-i a.mp4` 选择要被处理的视频
- `-c:v libsvtav1` 选择 libsvtav1 作为编码器
- `-crf 18` 使用 crf 质量级别 18 控制画面质量。18 被认为是视觉无损，默认 23
- `b.mp4` 输出的文件名称

更多参数说明

- `-c:a copy` 不修改音频编码格式，直接复制原有的音频流
- `-c:v copy` 不修改视频编码格式，直接复制原有的视频流

## 其他

切割视频片段，将视频从第 30 秒到第 1 小时的画面作为一个新的视频生成。不使用 -t 参数默认是直到视频最后

```sh
ffmpeg -ss 00:00:30 -t 01:00:00 -i a.mp4 -c:v copy -c:a copy b.mp4
```

合并视频，从文件中读取列表，将所有列表中的视频合并成新的视频，格式如下所示

```console
file '1.mp4'
file '2.mp4'
```

```sh
ffmpeg -f concat -i list.txt -c copy all.mp4
```

## 图像处理

将图片的分辨率修改为原来的一半

```sh
ffmpeg -i 1.jpg -vf "scale=iw/2:ih/2" 2.jpg
```
