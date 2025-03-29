const { toUnicode } = require('../dist');
const fs = require('fs');
const path = require('path');

console.log('=== Ví dụ về chuyển đổi hàng loạt ===\n');

const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
  console.log(`Đã tạo thư mục: ${outputDir}`);
}

const sampleTexts = [
  {
    name: 'vni_sample.txt',
    content: `Toâi yeâu tieáng nöôùc toâi töø khi môùi ra ñôøi,
Ngöôøi ôi, ngöôøi ôi, Tieáng Vieät coøn, nöôùc ta coøn!`,
    charset: 'vni'
  },
  {
    name: 'tcvn3_sample.txt',
    content: `T«i yªu tiÕng n­íc t«i tõ khi míi ra ®êi,
Ng­êi ¬i, ng­êi ¬i, TiÕng ViÖt cßn, n­íc ta cßn!`,
    charset: 'tcvn3'
  },
  {
    name: 'viqr_sample.txt',
    content: "To^i ye^u tie^'ng nu+o+'c to^i tu+` khi mo+'i ra ddo+`i,\nNgu+o+`i o+i, ngu+o+`i o+i, Tie^'ng Vie^.t co`n, nu+o+'c ta co`n!",
    charset: 'viqr'
  }
];

sampleTexts.forEach(sample => {
  const filePath = path.join(__dirname, sample.name);
  fs.writeFileSync(filePath, sample.content);
  console.log(`Đã tạo file mẫu ${sample.name}`);
});

function convertFile(filePath, charset) {
  console.log(`\nChuyển đổi file ${path.basename(filePath)} (${charset})...`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`Nội dung gốc (${charset.toUpperCase()}):\n${content}`);
    
    const unicodeContent = toUnicode(content, charset);
    console.log(`\nNội dung sau khi chuyển đổi (UNICODE):\n${unicodeContent}`);
    
    const outputPath = path.join(outputDir, `${path.basename(filePath, '.txt')}_unicode.txt`);
    fs.writeFileSync(outputPath, unicodeContent);
    console.log(`Đã lưu kết quả vào file: ${outputPath}`);
    
    return { success: true, outputPath };
  } catch (error) {
    console.error(`Lỗi khi chuyển đổi file: ${error.message}`);
    return { success: false, error: error.message };
  }
}

console.log('\n=== Bắt đầu chuyển đổi ===');
const results = sampleTexts.map(sample => {
  const filePath = path.join(__dirname, sample.name);
  return convertFile(filePath, sample.charset);
});

console.log('\n=== Kết quả chuyển đổi hàng loạt ===');
console.log(`Tổng số file: ${sampleTexts.length}`);
console.log(`Chuyển đổi thành công: ${results.filter(r => r.success).length}`);
console.log(`Chuyển đổi thất bại: ${results.filter(r => !r.success).length}`);

console.log('\n=== Lưu ý ===');
console.log('Trong một ứng dụng thực tế, bạn có thể:');
console.log('1. Quét qua thư mục để tìm tất cả các tệp cần chuyển đổi');
console.log('2. Tự động phát hiện bảng mã hoặc cho phép người dùng chọn');
console.log('3. Tạo báo cáo chi tiết về quá trình chuyển đổi');
console.log('4. Thêm các tùy chọn bổ sung như chuyển đổi đệ quy trong thư mục');
console.log('\nXem thư mục ./output để kiểm tra kết quả.'); 