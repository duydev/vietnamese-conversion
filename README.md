# Vietnamese Charset Conversion / Chuyển đổi bảng mã tiếng Việt

[![CI](https://github.com/duydev/vietnamese-conversion/actions/workflows/main.yml/badge.svg)](https://github.com/duydev/vietnamese-conversion/actions/workflows/main.yml)
[![Coverage Status](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/duydev/vietnamese-conversion)

A lightweight and easy-to-use library for converting between different Vietnamese character encodings.

Thư viện nhẹ và dễ sử dụng để chuyển đổi giữa các bảng mã tiếng Việt.

## Features / Tính năng

- Support conversion between character encodings: **Unicode**, **VNI**, **TCVN3**, **VIQR**
- Simple API with both class-based and functional approaches
- Automatic charset detection
- Custom converter creation
- Fully typed with TypeScript
- 100% test coverage

---

- Hỗ trợ chuyển đổi qua lại giữa các bảng mã: **Unicode**, **VNI**, **TCVN3**, **VIQR**
- API đơn giản với cả hai cách tiếp cận dựa trên lớp và hàm
- Tự động nhận diện bảng mã
- Tạo bộ chuyển đổi tùy chỉnh
- Hỗ trợ đầy đủ TypeScript
- 100% test coverage

## Installation / Cài đặt

```bash
# npm
npm install vietnamese-conversion

# yarn
yarn add vietnamese-conversion

# pnpm
pnpm add vietnamese-conversion
```

## Usage / Cách sử dụng

### Class-based approach / Cách dùng dựa trên lớp

```typescript
import { VietnameseConversion } from 'vietnamese-conversion';

// Create a new instance with text and source charset
// Tạo một thể hiện mới với văn bản và bảng mã nguồn
const conversion = new VietnameseConversion('Xin chào các bạn', 'unicode');

// Convert to another charset
// Chuyển đổi sang bảng mã khác
const vniText = conversion.toCharset('vni');
console.log(vniText); // Output: Xin chaøo caùc baïn

const tcvn3Text = conversion.toCharset('tcvn3');
console.log(tcvn3Text); // Output: Xin chµo c¸c b¹n

const viqrText = conversion.toCharset('viqr');
console.log(viqrText); // Output: Xin cha`o ca'c ba.n
```

### Functional approach / Cách dùng hàm

```typescript
import { toUnicode, toVNI, toTCVN3, toVIQR } from 'vietnamese-conversion';

// Convert from VNI to Unicode
// Chuyển đổi từ VNI sang Unicode
const unicodeText = toUnicode('Toâi ñi hoïc', 'vni');
console.log(unicodeText); // Output: Tôi đi học

// Convert from Unicode to VNI
// Chuyển đổi từ Unicode sang VNI
const vniText = toVNI('Tôi đi học', 'unicode');
console.log(vniText); // Output: Toâi ñi hoïc

// Convert from Unicode to TCVN3
// Chuyển đổi từ Unicode sang TCVN3
const tcvn3Text = toTCVN3('Tôi đi học', 'unicode');
console.log(tcvn3Text); // Output: T«i ®i häc

// Convert from Unicode to VIQR
// Chuyển đổi từ Unicode sang VIQR
const viqrText = toVIQR('Tôi đi học', 'unicode');
console.log(viqrText); // Output: To^i ddi ho.c
```

### Detecting charset / Nhận diện bảng mã

```typescript
import { detectCharset } from 'vietnamese-conversion';

// Automatically detect the charset of a text
// Tự động nhận diện bảng mã của văn bản
const charset = detectCharset('Xin chào các bạn');
console.log(charset); // Output: unicode

const vniCharset = detectCharset('Toâi ñi hoïc');
console.log(vniCharset); // Output: vni

const tcvn3Charset = detectCharset('T«i ®i häc');
console.log(tcvn3Charset); // Output: tcvn3

const viqrCharset = detectCharset('To^i ddi ho.c');
console.log(viqrCharset); // Output: viqr

// Returns null if no Vietnamese charset is detected
// Trả về null nếu không phát hiện bảng mã tiếng Việt
const noCharset = detectCharset('Hello world');
console.log(noCharset); // Output: null
```

### Creating custom converters / Tạo bộ chuyển đổi tùy chỉnh

```typescript
import { createConverter } from 'vietnamese-conversion';

// Create a custom converter function for a specific target charset
// Tạo hàm chuyển đổi tùy chỉnh cho một bảng mã đích cụ thể
const toUnicodeConverter = createConverter('unicode');

// Use the converter with different source charsets
// Sử dụng bộ chuyển đổi với các bảng mã nguồn khác nhau
const fromVni = toUnicodeConverter('Toâi ñi hoïc', 'vni');
console.log(fromVni); // Output: Tôi đi học

const fromTCVN3 = toUnicodeConverter('T«i ®i häc', 'tcvn3');
console.log(fromTCVN3); // Output: Tôi đi học
```

## Error Handling / Xử lý lỗi

The library will throw an error if an invalid charset is provided.

Thư viện sẽ ném ra lỗi nếu bảng mã không hợp lệ được cung cấp.

```typescript
// This will throw: Error: Charset is not valid
// Điều này sẽ ném ra lỗi: Error: Charset is not valid
const conversion = new VietnameseConversion('Xin chào các bạn', 'invalid-charset');
```

## Performance Optimization / Tối ưu hiệu năng

The library includes internal caching to improve performance when converting the same text repeatedly.

Thư viện bao gồm caching nội bộ để cải thiện hiệu năng khi chuyển đổi cùng một văn bản nhiều lần.

## License / Giấy phép

MIT License - Copyright (c) Tran Nhat Duy
