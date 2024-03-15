<h1 align="center">Asshuku</h1>

<p align="center">
    <a href="https://gitee.com/koukin2m/asshuku/blob/main/README.md">English</a>&nbsp;&nbsp;
    <a href="https://gitee.com/koukin2m/asshuku/blob/main/README-zh.md">中文版</a>&nbsp;&nbsp;
    <span>日本語</span>
</p>

フロントエンド　イメージ 圧縮

# インストール

好きなパッケージマネージャーを使って、asshukuをインポートする。

```
npm install asshuku
// or
yarn add asshuku
```

# 例

### 必要なところにasshukuをインポートする。

```js
import { asshukuImage } from "asshuku";

... // other codes

const _file = await asshukuImage(file, {
    quality : 50,
    multAsshukuOptions : {
        targetSize: 500 * 1024, // 500KB
        maxRetryNum: 5, // 綜合六回を圧縮する
        qualityChangeFn : (quality) => quality / 3
    }
});
```

# オプション

### 基礎オプション

| Property | Description | Type | Default | Required |
| --- | --- | --- | --- | --- |
| file | 圧縮したいファイル | File |  | true |
| asshukuOptions | オプション | AsshukuOptions | - | false |

### AsshukuOptions

| Property | Description | Type | Default | Required |
| --- | --- | --- | --- | --- |
| quality | 圧縮質 (0 ~ 100) | Number | 80 | true |
| multAsshukuOptions | 複数回圧縮する場合のオプション | MultAsshukuOptions | - | false |

### MultAsshukuOptions

| Property | Description | Type | Default | Required |
| --- | --- | --- | --- | --- |
| targetSize | 希望する圧縮後のファイルサイズ | Number | - | true |
| maxRetryNum | 最大再試行回数（ファイルが大きすぎると、何度圧縮しても目標サイズに到達できませんのため、このパラメーターを設置する） | Number | - | true |
| qualityChangeFn | quality減らす方法、qualityはマイナスには減らない。（マイナスの場合は0をリターン） | Function | (quality) => quality / 2 | false |