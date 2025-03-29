# Vietnamese Conversion Examples | Ví dụ sử dụng Vietnamese Conversion

This directory contains examples illustrating how to use the Vietnamese Conversion library to convert between different Vietnamese character encodings.

Thư mục này chứa các ví dụ minh họa cách sử dụng thư viện Vietnamese Conversion để chuyển đổi giữa các bảng mã tiếng Việt.

## List of Examples | Danh sách ví dụ

1. **basic-usage.js**: Basic example of using utility functions to convert between encodings.  
   *Ví dụ cơ bản về cách sử dụng các hàm tiện ích để chuyển đổi giữa các bảng mã.*
   
2. **class-based.js**: Illustrates how to use the `VietnameseConversion` class to convert between encodings.  
   *Minh họa cách sử dụng lớp `VietnameseConversion` để chuyển đổi giữa các bảng mã.*
   
3. **detect-charset.js**: Example of how to detect the encoding of a text.  
   *Ví dụ về cách phát hiện bảng mã của một văn bản.*
   
4. **batch-conversion.js**: Example of batch file conversion.  
   *Ví dụ về chuyển đổi hàng loạt tệp.*
   
5. **advanced-usage.js**: Examples of advanced features like creating custom converters, processing complex text, and document conversion.  
   *Ví dụ về các tính năng nâng cao như tạo bộ chuyển đổi tùy chỉnh, xử lý văn bản phức tạp và chuyển đổi tài liệu.*

## Running the Examples | Chạy các ví dụ

To run the examples, make sure you have installed the dependencies and built the library:

Để chạy ví dụ, cần chắc chắn rằng bạn đã cài đặt các gói phụ thuộc và đã biên dịch thư viện:

```bash
# Install dependencies | Cài đặt các phụ thuộc
npm install

# Build the library | Biên dịch thư viện
npm run build

# Run an example (replace <example-file> with the example filename) | Chạy ví dụ (thay <example-file> bằng tên file ví dụ)
node example/<example-file>.js
```

## Sample Data | Mẫu dữ liệu

The examples use Vietnamese text samples in different encodings to illustrate the library's functionality:

Các ví dụ sử dụng các mẫu văn bản tiếng Việt trong các bảng mã khác nhau để minh họa chức năng thư viện:

- **Unicode**: `"Tôi yêu tiếng nước tôi từ khi mới ra đời"`
- **VNI**: `"Toâi yeâu tieáng nöôùc toâi töø khi môùi ra ñôøi"`
- **TCVN3**: `"T«i yªu tiÕng n­íc t«i tõ khi míi ra ®êi"`
- **VIQR**: `"To^i ye^u tie^'ng nu+o+'c to^i tu+` khi mo+'i ra ddo+`i"` 