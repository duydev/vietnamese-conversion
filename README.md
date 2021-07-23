# Vietnamese charset conversion / Công cụ chuyển đổi bảng mã tiếng Việt

[![CI](https://github.com/duydev/vietnamese-conversion/actions/workflows/main.yml/badge.svg)](https://github.com/duydev/vietnamese-conversion/actions/workflows/main.yml)

- Support conversion between charsets: Unicode, VNI, TCVN3, VIQR
- Hỗ trợ chuyển đổi qua lại giữa các bảng mã Unicode, VNI, TCVN3, VIQR.

## Installation / Cài đặt

```
$ npm i vietnamese-conversion
$ yarn add vietnamese-conversion
```

## Using / Sử dụng

```
/**
 * Class style
 */
const { VietnameseConversion } = require('vietnamese-conversion');

const conversion = new VietnameseConversion('Xin chào các bạn', 'unicode');
const output = conversion.toCharset('vni');

// Output: Xin chaøo caùc baïn
console.log(output);

/**
 * Functional style
 */
const { toVNI } = require('vietnamese-conversion');

const output = toVNI('Xin chào các bạn', 'unicode');

// Output: Xin chaøo caùc baïn
console.log(output);
```
