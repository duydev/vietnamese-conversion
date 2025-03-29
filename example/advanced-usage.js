const { VietnameseConversion, createConverter } = require('../dist');

console.log('=== Ví dụ nâng cao về việc sử dụng thư viện ===\n');

// Hàm phát hiện bảng mã mô phỏng
function detectCharset(text) {
  if (!text) return null;

  // Phát hiện UNICODE
  if (/[áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/.test(text.toLowerCase())) {
    return 'unicode';
  }
  
  // Phát hiện VIQR
  if (/[\^+\(\)\\]/.test(text)) {
    return 'viqr';
  }
  
  // Phát hiện VNI
  if (/[a-z][0-9]/.test(text.toLowerCase())) {
    return 'vni';
  }
  
  // Phát hiện TCVN3 (khó phát hiện chính xác, dùng loại trừ)
  if (/[\x20-\x7E]/.test(text)) {
    return 'tcvn3';
  }
  
  return null;
}

// Ví dụ 1: Tạo trình chuyển đổi tùy chỉnh
console.log('=== 1. Tạo trình chuyển đổi tùy chỉnh ===');

// Tạo một trình chuyển đổi cho mục đích cụ thể - chuyển đổi mọi thứ sang Unicode
const anyToUnicode = createConverter('unicode');

// Tạo dữ liệu mẫu ở nhiều bảng mã khác nhau
const samples = {
  vni: 'Hoâm nay laø ngaøy ñeïp trôøi',
  tcvn3: 'S¸ng nay trêi n¾ng ®Ñp',
  viqr: 'Hoa no+? ra^.t nhie^`u'
};

// Sử dụng trình chuyển đổi tùy chỉnh
console.log('Chuyển đổi tự động từ mọi bảng mã sang Unicode:');
for (const [charset, text] of Object.entries(samples)) {
  // Phát hiện bảng mã trước (trong thực tế có thể đã biết hoặc cho phép người dùng chỉ định)
  const detectedCharset = detectCharset(text) || charset;
  
  // Chuyển đổi sang Unicode
  const result = anyToUnicode(text, detectedCharset);
  console.log(`- ${charset.toUpperCase()}: "${text}" -> "${result}"`);
}

// Ví dụ 2: Xử lý văn bản phức tạp
console.log('\n=== 2. Xử lý văn bản phức tạp ===');

// Văn bản phức tạp với nhiều ký tự đặc biệt
const complexText = `Tôi có nhiều "dấu" ngoặc kép, dấu [ngoặc] vuông và {ngoặc nhọn}.
* Đây là một danh sách các mục.
* Số 1, 2, 3... cũng được giữ nguyên.
* Các ký tự đặc biệt như: a@b.com, 100%, 25$, 30°C.`;

console.log('Văn bản phức tạp:');
console.log(complexText);

// Chuyển đổi sang VNI và sau đó trở lại Unicode
const step1 = new VietnameseConversion(complexText, 'unicode').toCharset('vni');
console.log('\nSau khi chuyển đổi sang VNI:');
console.log(step1);

const step2 = new VietnameseConversion(step1, 'vni').toCharset('unicode');
console.log('\nSau khi chuyển đổi trở lại Unicode:');
console.log(step2);

console.log(`\nKết quả trùng khớp: ${complexText === step2}`);

// Ví dụ 3: Sử dụng thư viện trong các ứng dụng thực tế
console.log('\n=== 3. Ứng dụng thực tế ===');

// Mô phỏng việc phân tích và xử lý tài liệu
function processDocument(document) {
  console.log(`Đang xử lý tài liệu: ${document.name}`);
  
  // Phát hiện bảng mã
  const charset = detectCharset(document.content) || 'unicode';
  console.log(`- Bảng mã được phát hiện: ${charset}`);
  
  // Chuyển đổi sang Unicode nếu cần
  let normalizedContent = document.content;
  if (charset !== 'unicode') {
    normalizedContent = new VietnameseConversion(document.content, charset).toCharset('unicode');
    console.log('- Đã chuyển đổi sang Unicode');
  } else {
    console.log('- Đã ở dạng Unicode, không cần chuyển đổi');
  }
  
  // Phân tích và xử lý văn bản (ví dụ này chỉ đếm từ)
  const wordCount = normalizedContent.split(/\s+/).length;
  console.log(`- Số từ: ${wordCount}`);
  
  return {
    ...document,
    charset,
    normalizedContent,
    wordCount
  };
}

// Mô phỏng danh sách tài liệu
const documents = [
  { name: 'doc1.txt', content: 'Đây là tài liệu Unicode bình thường.' },
  { name: 'doc2.txt', content: 'Ñaây laø taøi lieäu VNI.' },
  { name: 'doc3.txt', content: '§©y lµ tµi liÖu TCVN3.' }
];

console.log('Kết quả xử lý tài liệu:');
const processedDocs = documents.map(processDocument);
console.log('\nTổng kết:');
console.log(`- Tổng số tài liệu: ${processedDocs.length}`);
console.log(`- Số tài liệu Unicode: ${processedDocs.filter(d => d.charset === 'unicode').length}`);
console.log(`- Số tài liệu VNI: ${processedDocs.filter(d => d.charset === 'vni').length}`);
console.log(`- Số tài liệu TCVN3: ${processedDocs.filter(d => d.charset === 'tcvn3').length}`);
console.log(`- Số tài liệu VIQR: ${processedDocs.filter(d => d.charset === 'viqr').length}`); 