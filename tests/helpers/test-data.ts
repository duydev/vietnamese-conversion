/**
 * Common test phrases in different character sets
 */
export const TestPhrases = {
  // Common greeting
  greeting: {
    unicode: 'Xin chào các bạn',
    vni: 'Xin chaøo caùc baïn',
    tcvn3: 'Xin chµo c¸c b¹n',
    viqr: "Xin cha`o ca'c ba.n",
  },

  // Common sentence
  sentence: {
    unicode: 'Tôi đi học',
    vni: 'Toâi ñi hoïc',
    tcvn3: 'T«i ®i häc',
    viqr: 'To^i ddi ho.c',
  },

  // Complex text with all types of diacritics
  complex: {
    unicode: 'Tiếng Việt có các dấu: à, á, ả, ã, ạ, ă, â, ê, ô, ơ, ư, đ',
  },
};

/**
 * Những trường hợp giới hạn của VIQR đã được sửa
 */
export const VIQREdgeCases = {
  // Chuỗi ví dụ có nhiều dấu kết hợp phức tạp
  complexDiacritics: {
    viqr: "To^i ye^u tie^'ng nu+o+'c to^i tu+` khi mo+'i ra ddo+`i",
    unicode: 'Tôi yêu tiếng nước tôi từ khi mới ra đời',
  },

  // Trường hợp đặc biệt "du+." phải chuyển thành "dụ" (không phải "dự")
  specialDu: {
    viqr: "DDa^y la` mo^.t vi' du+. ve^` VIQR",
    unicode: 'Đây là một ví dụ về VIQR',
  },

  // Trường hợp nhiều dấu kèm dấu ngoặc, hỏi và tiếng đệm
  multipleDiacritics: {
    viqr: "Ngu+o+`i o+i, ngu+o+`i o+i, Tie^'ng Vie^.t co`n, nu+o+'c ta co`n!",
    unicode: 'Người ơi, người ơi, Tiếng Việt còn, nước ta còn!',
  },

  // Trường hợp tiếng Việt học thuật
  academic: {
    viqr: "To^i dda~ ho.c tie^'ng Vie^.t",
    unicode: 'Tôi đã học tiếng Việt',
  },
};

/**
 * Sample non-Vietnamese text for edge cases
 */
export const NonVietnameseText = 'Hello world 123!@#';

/**
 * Invalid charset name for error testing
 */
export const InvalidCharset = 'abc';
