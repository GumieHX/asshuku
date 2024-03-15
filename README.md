<h1 align="center">Asshuku</h1>

Front-end compress the image file.

# Install

You can use any package manager you like to import asshuku.

```
npm install asshuku
// or
yarn add asshuku
```

# Examples

### Import asshuku where you need it

```js
import { asshukuImage } from "asshuku";

... // other codes

const _file = await asshukuImage(file, {
    quality : 50,
    multAsshukuOptions : {
        targetSize: 500 * 1024, // 500KB
        maxRetryNum: 5, // total compress 6 times
        qualityChangeFn : (quality) => quality / 3
    }
});
```

# Options

### Base options

| Property | Description | Type | Default | Required |
| --- | --- | --- | --- | --- |
| file | Image file witch you want to compress | File |  | true |
| asshukuOptions | options | AsshukuOptions | - | false |

### AsshukuOptions

| Property | Description | Type | Default | Required |
| --- | --- | --- | --- | --- |
| quality | compress quality (0 ~ 100) | Number | 80 | true |
| multAsshukuOptions | options | MultAsshukuOptions | - | false |

### MultAsshukuOptions

| Property | Description | Type | Default | Required |
| --- | --- | --- | --- | --- |
| targetSize | Compressed target image size. | Number | - | true |
| maxRetryNum | The maximum number of retries when the image is too large to compress to your target size | Number | - | true |
| qualityChangeFn | How to reduce quality. Quality will not be reduced to negative numbers. (It means the minimum quality is 0) | Function | (quality) => quality / 2 | false |