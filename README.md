# Vietnamese charset conversion / Công cụ chuyển đổi bảng mã tiêng Việt

- Support conversion between charsets: Unicode, VNI, TCVN3, VIQR
- Hỗ trợ chuyển đổi qua lại giữa các bảng mã Unicode, VNI, TCVN3, VIQR.

## Installation / Cài đặt

```
$ npm i vietnamese-conversion
$ yarn add vietnamese-conversion
```

## Using / Sử dụng

```
const VietnameseConversion = require('vietnamese-conversion');

const conversion = new VietnameseConversion('Xin chào các bạn', 'unicode');
const output = conversion.toCharset('vni');

// Output: Xin chaøo caùc baïn
console.log(output);
```
