const { VietnameseConversion, createConverter } = require('../dist');

console.log('=== Ví dụ nâng cao về việc sử dụng thư viện ===\n');

function detectCharset(text) {
  if (!text) return null;

  if (/[áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/.test(text.toLowerCase())) {
    return 'unicode';
  }
  
  if (/[\^+\(\)\\]/.test(text)) {
    return 'viqr';
  }
  
  if (/[a-z][0-9]/.test(text.toLowerCase())) {
    return 'vni';
  }
  
  if (/[\x20-\x7E]/.test(text)) {
    return 'tcvn3';
  }
  
  return null;
}

console.log('=== 1. Tạo trình chuyển đổi tùy chỉnh ===');

const anyToUnicode = createConverter('unicode');

const samples = {
  vni: 'Hoâm nay laø ngaøy ñeïp trôøi',
  tcvn3: 'S¸ng nay trêi n¾ng ®Ñp',
  viqr: 'Hoa no+? ra^.t nhie^`u'
};

console.log('Chuyển đổi tự động từ mọi bảng mã sang Unicode:');
for (const [charset, text] of Object.entries(samples)) {
  const detectedCharset = detectCharset(text) || charset;
  
  const result = anyToUnicode(text, detectedCharset);
  console.log(`- ${charset.toUpperCase()}: "${text}" -> "${result}"`);
}

console.log('\n=== 2. Xử lý văn bản phức tạp ===');

const complexText = `Tôi có nhiều "dấu" ngoặc kép, dấu [ngoặc] vuông và {ngoặc nhọn}.
* Đây là một danh sách các mục.
* Số 1, 2, 3... cũng được giữ nguyên.
* Các ký tự đặc biệt như: a@b.com, 100%, 25$, 30°C.`;

console.log('Văn bản phức tạp:');
console.log(complexText);

const step1 = new VietnameseConversion(complexText, 'unicode').toCharset('vni');
console.log('\nSau khi chuyển đổi sang VNI:');
console.log(step1);

const step2 = new VietnameseConversion(step1, 'vni').toCharset('unicode');
console.log('\nSau khi chuyển đổi trở lại Unicode:');
console.log(step2);

console.log(`\nKết quả trùng khớp: ${complexText === step2}`);

console.log('\n=== 3. Ứng dụng thực tế ===');

function processDocument(document) {
  console.log(`Đang xử lý tài liệu: ${document.name}`);
  
  const charset = detectCharset(document.content) || 'unicode';
  console.log(`- Bảng mã được phát hiện: ${charset}`);
  
  let normalizedContent = document.content;
  if (charset !== 'unicode') {
    normalizedContent = new VietnameseConversion(document.content, charset).toCharset('unicode');
    console.log('- Đã chuyển đổi sang Unicode');
  } else {
    console.log('- Đã ở dạng Unicode, không cần chuyển đổi');
  }
  
  const wordCount = normalizedContent.split(/\s+/).length;
  console.log(`- Số từ: ${wordCount}`);
  
  return {
    ...document,
    charset,
    normalizedContent,
    wordCount
  };
}

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