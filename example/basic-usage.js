const { toUnicode, toVNI, toTCVN3, toVIQR } = require('../dist');

console.log('=== Ví dụ cơ bản về chuyển đổi bảng mã tiếng Việt ===\n');

// Các văn bản mẫu trong các bảng mã khác nhau
const unicodeText = 'Tiếng Việt rất hay';
const vniText = 'Tieáng Vieät raát hay';
const tcvn3Text = 'TiÕng ViÖt rÊt hay';
const viqrText = "Tie^'ng Vie^.t ra^'t hay";

console.log('=== Chuyển đổi sang Unicode ===');
console.log(`VNI -> Unicode: ${toUnicode(vniText, 'vni')}`);
console.log(`TCVN3 -> Unicode: ${toUnicode(tcvn3Text, 'tcvn3')}`);
console.log(`VIQR -> Unicode: ${toUnicode(viqrText, 'viqr')}`);
console.log();

console.log('=== Chuyển đổi sang VNI ===');
console.log(`Unicode -> VNI: ${toVNI(unicodeText, 'unicode')}`);
console.log(`TCVN3 -> VNI: ${toVNI(tcvn3Text, 'tcvn3')}`);
console.log(`VIQR -> VNI: ${toVNI(viqrText, 'viqr')}`);
console.log();

console.log('=== Chuyển đổi sang TCVN3 ===');
console.log(`Unicode -> TCVN3: ${toTCVN3(unicodeText, 'unicode')}`);
console.log(`VNI -> TCVN3: ${toTCVN3(vniText, 'vni')}`);
console.log(`VIQR -> TCVN3: ${toTCVN3(viqrText, 'viqr')}`);
console.log();

console.log('=== Chuyển đổi sang VIQR ===');
console.log(`Unicode -> VIQR: ${toVIQR(unicodeText, 'unicode')}`);
console.log(`VNI -> VIQR: ${toVIQR(vniText, 'vni')}`);
console.log(`TCVN3 -> VIQR: ${toVIQR(tcvn3Text, 'tcvn3')}`); 