const { VietnameseConversion } = require('../dist');

console.log('=== Sử dụng lớp VietnameseConversion ===\n');

// Tạo đối tượng với văn bản tiếng Việt Unicode
const vietnameseText = 'Xin chào thế giới!';
console.log(`Văn bản gốc (Unicode): ${vietnameseText}`);

// Tạo đối tượng chuyển đổi với Unicode làm bảng mã nguồn
const conversion = new VietnameseConversion(vietnameseText, 'unicode');

// Chuyển đổi sang các bảng mã khác
const vniText = conversion.toCharset('vni');
const tcvn3Text = conversion.toCharset('tcvn3');
const viqrText = conversion.toCharset('viqr');

console.log(`\nKết quả chuyển đổi:`);
console.log(`- VNI: ${vniText}`);
console.log(`- TCVN3: ${tcvn3Text}`);
console.log(`- VIQR: ${viqrText}`);

// Chuyển đổi từ VNI trở lại Unicode
console.log('\n=== Chuyển đổi từ VNI trở lại Unicode ===');
const vniConversion = new VietnameseConversion(vniText, 'vni');
console.log(`VNI: ${vniText}`);
console.log(`Trở lại Unicode: ${vniConversion.toCharset('unicode')}`);

// Kiểm tra so sánh
console.log('\n=== Kiểm tra kết quả chuyển đổi ===');
console.log(`Giống bản gốc: ${vniConversion.toCharset('unicode') === vietnameseText}`);

// Thông tin về đối tượng
console.log('\n=== Thông tin về đối tượng chuyển đổi ===');
console.log(`Văn bản: ${conversion.getText()}`);
console.log(`Bảng mã hiện tại: ${conversion.getCharset()}`);

// Ví dụ về một chuỗi chuyển đổi
console.log('\n=== Chuỗi chuyển đổi ===');
const original = 'Tiếng Việt có 29 chữ cái';
console.log(`Original (Unicode): ${original}`);

// Chuỗi chuyển đổi: Unicode -> VNI -> TCVN3 -> VIQR -> Unicode
let result = original;
result = new VietnameseConversion(result, 'unicode').toCharset('vni');
console.log(`Bước 1 (VNI): ${result}`);

result = new VietnameseConversion(result, 'vni').toCharset('tcvn3');
console.log(`Bước 2 (TCVN3): ${result}`);

result = new VietnameseConversion(result, 'tcvn3').toCharset('viqr');
console.log(`Bước 3 (VIQR): ${result}`);

result = new VietnameseConversion(result, 'viqr').toCharset('unicode');
console.log(`Bước 4 (trở lại Unicode): ${result}`);

console.log(`Kết quả đúng: ${result === original}`); 