console.log('=== Phát hiện bảng mã tự động ===\n');

// Đây là ví dụ về cách một hệ thống phát hiện bảng mã có thể hoạt động
// Lưu ý: Mô phỏng detectCharset vì thư viện gặp vấn đề khi export/import

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

// Danh sách các văn bản trong các bảng mã khác nhau
const samples = [
  { text: 'Tiếng Việt có 29 chữ cái', expectedCharset: 'unicode' },
  { text: 'Tieáng Vieät coù 29 chöõ caùi', expectedCharset: 'vni' },
  { text: 'TiÕng ViÖt cã 29 ch÷ c¸i', expectedCharset: 'tcvn3' },
  { text: 'Tie^\'ng Vie^.t co\' 29 chu+~ ca\'i', expectedCharset: 'viqr' },
  { text: 'This text has no Vietnamese characters', expectedCharset: null },
  { text: 'あいうえお', expectedCharset: null }, // Tiếng Nhật
  { text: '', expectedCharset: null } // Chuỗi rỗng
];

// Thử phát hiện bảng mã cho từng mẫu
samples.forEach((sample, index) => {
  const detectedCharset = detectCharset(sample.text);
  const isCorrect = detectedCharset === sample.expectedCharset;
  
  console.log(`Mẫu ${index + 1}: "${sample.text.substring(0, 30)}${sample.text.length > 30 ? '...' : ''}"`);
  console.log(`  - Bảng mã được phát hiện: ${detectedCharset || 'không xác định'}`);
  console.log(`  - Bảng mã thực tế: ${sample.expectedCharset || 'không xác định'}`);
  console.log(`  - Kết quả: ${isCorrect ? 'ĐÚNG ✓' : 'SAI ✗'}`);
  console.log();
});

console.log('=== Lưu ý về phát hiện bảng mã ===');
console.log('1. Phát hiện bảng mã dựa trên heuristic nên có thể không chính xác 100% trong mọi trường hợp');
console.log('2. Hiệu quả nhất khi văn bản có đủ các dấu tiếng Việt đặc trưng');
console.log('3. Nên chỉ định bảng mã rõ ràng khi biết trước để đảm bảo chính xác'); 