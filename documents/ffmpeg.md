# FFmpeg 数字媒体处理

[FFmpeg](https://ffmpeg.org) 是一个处理音频和视频的跨平台开源软件

## 安装说明

可以参考官方的说明文档来安装，或者从 [https://github.com/BtbN/FFmpeg-Builds](https://github.com/BtbN/FFmpeg-Builds) 下载每日构建的静态单文件版本

## 查看支持信息

ffmpeg -formats 查看支持的封装容器格式

ffmpeg -codecs 查看支持的编码格式

ffmpeg -encoders 查看支持的编码器

查看视频的详细信息命令：ffmpeg -i a.mp4

## 编码

本文不讨论硬件编码，仅讨论软件编码

### H.264/AVC

最常见的视频格式，最为普遍，几乎找不到设备不支持它的。推荐使用 libx264 编码器

### H.265/HEVC

更好的编码格式，在保证质量相同的情况下，对比 H.264 减少一半的文件大小。有版权限制，需要付专利费，仅 Safari 浏览器官方支持直接硬解。推荐使用 libx265 编码器

### AV1

由开放媒体联盟对标 HEVC 所推出的开源免费编码格式。Netflix、YouTube 等知名流媒体平台均使用 AV1 格式。推荐使用 libsvtav1 编码器

::: note 注
libaom-av1 效果最好，但速度很慢，耗时过长  
librav1e 速度最快  
libsvtav1 兼顾了速度与效率，被作为 AV1 未来开发工作的基础
:::

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

## 其他作用

切割视频片段，将视频从第 30 秒到第 1 小时的画面作为一个新的视频生成。不使用 -t 参数默认是直到视频最后

```sh
ffmpeg -ss 00:00:30 -i a.mp4 -t 01:00:00 -c:v copy -c:a copy b.mp4
```

合并视频，从文件中读取列表，将所有列表中的视频合并成新的视频

```sh
ffmpeg -f concat -i list.txt -c copy all.mp4
```

## 图像处理

将图片的分辨率修改为原来的一半

```sh
ffmpeg -i 1.jpg -vf "scale=iw/2:ih/2" 2.jpg
```
