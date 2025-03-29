export const TestPhrases = {
  greeting: {
    unicode: 'Xin chào các bạn',
    vni: 'Xin chaøo caùc baïn',
    tcvn3: 'Xin chµo c¸c b¹n',
    viqr: "Xin cha`o ca'c ba.n",
  },

  sentence: {
    unicode: 'Tôi đi học',
    vni: 'Toâi ñi hoïc',
    tcvn3: 'T«i ®i häc',
    viqr: 'To^i ddi ho.c',
  },

  complex: {
    unicode: 'Tiếng Việt có các dấu: à, á, ả, ã, ạ, ă, â, ê, ô, ơ, ư, đ',
  },
};

export const VIQREdgeCases = {
  complexDiacritics: {
    viqr: "To^i ye^u tie^'ng nu+o+'c to^i tu+` khi mo+'i ra ddo+`i",
    unicode: 'Tôi yêu tiếng nước tôi từ khi mới ra đời',
  },

  specialDu: {
    viqr: "DDa^y la` mo^.t vi' du+. ve^` VIQR",
    unicode: 'Đây là một ví dụ về VIQR',
  },

  multipleDiacritics: {
    viqr: "Ngu+o+`i o+i, ngu+o+`i o+i, Tie^'ng Vie^.t co`n, nu+o+'c ta co`n!",
    unicode: 'Người ơi, người ơi, Tiếng Việt còn, nước ta còn!',
  },

  academic: {
    viqr: "To^i dda~ ho.c tie^'ng Vie^.t",
    unicode: 'Tôi đã học tiếng Việt',
  },
};

export const NonVietnameseText = 'Hello world 123!@#';

export const InvalidCharset = 'abc';
