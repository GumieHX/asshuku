<h1 align="center">Asshuku</h1>

<p align="center">
    <a href="https://gitee.com/koukin2m/asshuku/blob/main/README.md">English</a>&nbsp;&nbsp;
    <span>中文版</span>&nbsp;&nbsp;
    <a href="https://gitee.com/koukin2m/asshuku/blob/main/README-jp.md">日本語</a>
</p>

前端压缩图片

# 安装

你可以使用任何你喜欢的包管理工具安装asshuku

```
npm install asshuku
// or
yarn add asshuku
```

# 使用

### 在任何你需要的地方引入asshuku

```js
import { asshukuImage } from "asshuku";

... // other codes

const _file = await asshukuImage(file, {
    quality : 50,
    multAsshukuOptions : {
        targetSize: 500 * 1024, // 500KB
        maxRetryNum: 5, // 一共会压缩6次
        qualityChangeFn : (quality) => quality / 3
    }
});
```

# 参数

### 基础参数

| Property | Description | Type | Default | Required |
| --- | --- | --- | --- | --- |
| file | 需要压缩的图片文件 | File |  | true |
| asshukuOptions | 配置参数 | AsshukuOptions | - | false |

### AsshukuOptions

| Property | Description | Type | Default | Required |
| --- | --- | --- | --- | --- |
| quality | 压缩质量 (0 ~ 100) | Number | 80 | true |
| multAsshukuOptions | 需要多次压缩配置参数 | MultAsshukuOptions | - | false |

### MultAsshukuOptions

| Property | Description | Type | Default | Required |
| --- | --- | --- | --- | --- |
| targetSize | 期望压缩后的图片大小 | Number | - | true |
| maxRetryNum | 最大重试次数，当你的图片过大无法压缩到期望大小的时候，加入最大重试次数防止无限压缩卡死 | Number | - | true |
| qualityChangeFn | 如何减少你的quality，quality不会减少为负数（当使用你的函数处理过后得到的结果小于0时返回0） | Function | (quality) => quality / 2 | false |

# Javascript Support

只支持ES2015及之后的版本

# 其他

* 🪧 [source code](https://github.com/GumieHX/asshuku.git)
* 💻 [npm](https://www.npmjs.com/package/asshuku)