import { Charset, Charsets, CharsetName } from './types';

const createCharset = (): {
  unicode: Charset;
  vni: Charset;
  tcvn3: Charset;
  viqr: Charset;
} => {
  const charMappings = [
    { unicode: 'À', vni: 'AØ', tcvn3: 'Aµ', viqr: 'A`' },
    { unicode: 'Á', vni: 'AÙ', tcvn3: 'A¸', viqr: "A'" },
    { unicode: 'Â', vni: 'AÂ', tcvn3: '¢', viqr: 'A^' },
    { unicode: 'Ã', vni: 'AÕ', tcvn3: 'A·', viqr: 'A~' },
    { unicode: 'È', vni: 'EØ', tcvn3: 'EÌ', viqr: 'E`' },
    { unicode: 'É', vni: 'EÙ', tcvn3: 'EÐ', viqr: "E'" },
    { unicode: 'Ê', vni: 'EÂ', tcvn3: '£', viqr: 'E^' },
    { unicode: 'Ì', vni: 'Ì', tcvn3: 'I×', viqr: 'I`' },
    { unicode: 'Í', vni: 'Í', tcvn3: 'IÝ', viqr: "I'" },
    { unicode: 'Ò', vni: 'OØ', tcvn3: 'Oß', viqr: 'O`' },
    { unicode: 'Ó', vni: 'OÙ', tcvn3: 'Oã', viqr: "O'" },
    { unicode: 'Ô', vni: 'OÂ', tcvn3: '¤', viqr: 'O^' },
    { unicode: 'Õ', vni: 'OÕ', tcvn3: 'Oâ', viqr: 'O~' },
    { unicode: 'Ù', vni: 'UØ', tcvn3: 'Uï', viqr: 'U`' },
    { unicode: 'Ú', vni: 'UÙ', tcvn3: 'Uó', viqr: "U'" },
    { unicode: 'Ý', vni: 'YÙ', tcvn3: 'Yý', viqr: "Y'" },

    { unicode: 'à', vni: 'aø', tcvn3: 'µ', viqr: 'a`' },
    { unicode: 'á', vni: 'aù', tcvn3: '¸', viqr: "a'" },
    { unicode: 'â', vni: 'aâ', tcvn3: '©', viqr: 'a^' },
    { unicode: 'ã', vni: 'aõ', tcvn3: '·', viqr: 'a~' },
    { unicode: 'è', vni: 'eø', tcvn3: 'Ì', viqr: 'e`' },
    { unicode: 'é', vni: 'eù', tcvn3: 'Ð', viqr: "e'" },
    { unicode: 'ê', vni: 'eâ', tcvn3: 'ª', viqr: 'e^' },
    { unicode: 'ì', vni: 'ì', tcvn3: '×', viqr: 'i`' },
    { unicode: 'í', vni: 'í', tcvn3: 'Ý', viqr: "i'" },
    { unicode: 'ò', vni: 'oø', tcvn3: 'ß', viqr: 'o`' },
    { unicode: 'ó', vni: 'où', tcvn3: 'ã', viqr: "o'" },
    { unicode: 'ô', vni: 'oâ', tcvn3: '«', viqr: 'o^' },
    { unicode: 'õ', vni: 'oõ', tcvn3: 'â', viqr: 'o~' },
    { unicode: 'ù', vni: 'uø', tcvn3: 'ï', viqr: 'u`' },
    { unicode: 'ú', vni: 'uù', tcvn3: 'ó', viqr: "u'" },
    { unicode: 'ý', vni: 'yù', tcvn3: 'ý', viqr: "y'" },

    { unicode: 'Ă', vni: 'AÊ', tcvn3: '¡', viqr: 'A(' },
    { unicode: 'Đ', vni: 'Ñ', tcvn3: '§', viqr: 'DD' },
    { unicode: 'Ĩ', vni: 'Ó', tcvn3: 'IÜ', viqr: 'I~' },
    { unicode: 'Ũ', vni: 'UÕ', tcvn3: 'Uò', viqr: 'U~' },
    { unicode: 'Ơ', vni: 'Ô', tcvn3: '¥', viqr: 'O+' },
    { unicode: 'Ư', vni: 'Ö', tcvn3: '¦', viqr: 'U+' },

    { unicode: 'ă', vni: 'aê', tcvn3: '¨', viqr: 'a(' },
    { unicode: 'đ', vni: 'ñ', tcvn3: '®', viqr: 'dd' },
    { unicode: 'ĩ', vni: 'ó', tcvn3: 'Ü', viqr: 'i~' },
    { unicode: 'ũ', vni: 'uõ', tcvn3: 'ò', viqr: 'u~' },
    { unicode: 'ơ', vni: 'ô', tcvn3: '¬', viqr: 'o+' },
    { unicode: 'ư', vni: 'ö', tcvn3: '­', viqr: 'u+' },

    { unicode: 'Ạ', vni: 'AÏ', tcvn3: 'A¹', viqr: 'A.' },
    { unicode: 'Ả', vni: 'AÛ', tcvn3: 'A¶', viqr: 'A?' },
    { unicode: 'Ấ', vni: 'AÁ', tcvn3: '¢Ê', viqr: "A^'" },
    { unicode: 'Ầ', vni: 'AÀ', tcvn3: '¢Ç', viqr: 'A^`' },
    { unicode: 'Ẩ', vni: 'AÅ', tcvn3: '¢È', viqr: 'A^?' },
    { unicode: 'Ẫ', vni: 'AÃ', tcvn3: '¢É', viqr: 'A^~' },
    { unicode: 'Ậ', vni: 'AÄ', tcvn3: '¢Ë', viqr: 'A^.' },
    { unicode: 'Ắ', vni: 'AÉ', tcvn3: '¡¾', viqr: "A('" },
    { unicode: 'Ằ', vni: 'AÈ', tcvn3: '¡»', viqr: 'A(`' },
    { unicode: 'Ẳ', vni: 'AÚ', tcvn3: '¡¼', viqr: 'A(?' },
    { unicode: 'Ẵ', vni: 'AÜ', tcvn3: '¡½', viqr: 'A(~' },
    { unicode: 'Ặ', vni: 'AË', tcvn3: '¡Æ', viqr: 'A(.' },

    { unicode: 'Ẹ', vni: 'EÏ', tcvn3: 'EÑ', viqr: 'E.' },
    { unicode: 'Ẻ', vni: 'EÛ', tcvn3: 'EÎ', viqr: 'E?' },
    { unicode: 'Ẽ', vni: 'EÕ', tcvn3: 'EÏ', viqr: 'E~' },
    { unicode: 'Ế', vni: 'EÁ', tcvn3: '£Õ', viqr: "E^'" },
    { unicode: 'Ề', vni: 'EÀ', tcvn3: '£Ò', viqr: 'E^`' },
    { unicode: 'Ể', vni: 'EÅ', tcvn3: '£Ó', viqr: 'E^?' },
    { unicode: 'Ễ', vni: 'EÃ', tcvn3: '£Ô', viqr: 'E^~' },
    { unicode: 'Ệ', vni: 'EÄ', tcvn3: '£Ö', viqr: 'E^.' },

    { unicode: 'Ỉ', vni: 'Æ', tcvn3: 'IØ', viqr: 'I?' },
    { unicode: 'Ị', vni: 'Ò', tcvn3: 'IÞ', viqr: 'I.' },
    { unicode: 'Ọ', vni: 'OÏ', tcvn3: 'Oä', viqr: 'O.' },
    { unicode: 'Ỏ', vni: 'OÛ', tcvn3: 'Oá', viqr: 'O?' },
    { unicode: 'Ố', vni: 'OÁ', tcvn3: '¤è', viqr: "O^'" },
    { unicode: 'Ồ', vni: 'OÀ', tcvn3: '¤å', viqr: 'O^`' },
    { unicode: 'Ổ', vni: 'OÅ', tcvn3: '¤æ', viqr: 'O^?' },
    { unicode: 'Ỗ', vni: 'OÃ', tcvn3: '¤ç', viqr: 'O^~' },
    { unicode: 'Ộ', vni: 'OÄ', tcvn3: '¤é', viqr: 'O^.' },
    { unicode: 'Ớ', vni: 'ÔÙ', tcvn3: '¥í', viqr: "O+'" },
    { unicode: 'Ờ', vni: 'ÔØ', tcvn3: '¥ê', viqr: 'O+`' },
    { unicode: 'Ở', vni: 'ÔÛ', tcvn3: '¥ë', viqr: 'O+?' },
    { unicode: 'Ỡ', vni: 'ÔÕ', tcvn3: '¥ì', viqr: 'O+~' },
    { unicode: 'Ợ', vni: 'ÔÏ', tcvn3: '¥î', viqr: 'O+.' },

    { unicode: 'Ụ', vni: 'UÏ', tcvn3: 'Uô', viqr: 'U.' },
    { unicode: 'Ủ', vni: 'UÛ', tcvn3: 'Uñ', viqr: 'U?' },
    { unicode: 'Ứ', vni: 'ÖÙ', tcvn3: '¦ø', viqr: "U+'" },
    { unicode: 'Ừ', vni: 'ÖØ', tcvn3: '¦õ', viqr: 'U+`' },
    { unicode: 'Ử', vni: 'ÖÛ', tcvn3: '¦ö', viqr: 'U+?' },
    { unicode: 'Ữ', vni: 'ÖÕ', tcvn3: '¦÷', viqr: 'U+~' },
    { unicode: 'Ự', vni: 'ÖÏ', tcvn3: '¦ù', viqr: 'U+.' },

    { unicode: 'Ỳ', vni: 'YØ', tcvn3: 'Yú', viqr: 'Y`' },
    { unicode: 'Ỵ', vni: 'Î', tcvn3: 'Yþ', viqr: 'Y.' },
    { unicode: 'Ỷ', vni: 'Ë', tcvn3: 'Yû', viqr: 'Y?' },
    { unicode: 'Ỹ', vni: 'Ì', tcvn3: 'Yü', viqr: 'Y~' },

    { unicode: 'ạ', vni: 'aï', tcvn3: '¹', viqr: 'a.' },
    { unicode: 'ả', vni: 'aû', tcvn3: '¶', viqr: 'a?' },
    { unicode: 'ấ', vni: 'aá', tcvn3: 'Ê', viqr: "a^'" },
    { unicode: 'ầ', vni: 'aà', tcvn3: 'Ç', viqr: 'a^`' },
    { unicode: 'ẩ', vni: 'aå', tcvn3: 'È', viqr: 'a^?' },
    { unicode: 'ẫ', vni: 'aã', tcvn3: 'É', viqr: 'a^~' },
    { unicode: 'ậ', vni: 'aä', tcvn3: 'Ë', viqr: 'a^.' },
    { unicode: 'ắ', vni: 'aé', tcvn3: '¾', viqr: "a('" },
    { unicode: 'ằ', vni: 'aè', tcvn3: '»', viqr: 'a(`' },
    { unicode: 'ẳ', vni: 'aú', tcvn3: '¼', viqr: 'a(?' },
    { unicode: 'ẵ', vni: 'aü', tcvn3: '½', viqr: 'a(~' },
    { unicode: 'ặ', vni: 'aë', tcvn3: 'Æ', viqr: 'a(.' },

    { unicode: 'ẹ', vni: 'eï', tcvn3: 'Ñ', viqr: 'e.' },
    { unicode: 'ẻ', vni: 'eû', tcvn3: 'Î', viqr: 'e?' },
    { unicode: 'ẽ', vni: 'eõ', tcvn3: 'Ï', viqr: 'e~' },
    { unicode: 'ế', vni: 'eá', tcvn3: 'Õ', viqr: "e^'" },
    { unicode: 'ề', vni: 'eà', tcvn3: 'Ò', viqr: 'e^`' },
    { unicode: 'ể', vni: 'eå', tcvn3: 'Ó', viqr: 'e^?' },
    { unicode: 'ễ', vni: 'eã', tcvn3: 'Ô', viqr: 'e^~' },
    { unicode: 'ệ', vni: 'eä', tcvn3: 'Ö', viqr: 'e^.' },

    { unicode: 'ỉ', vni: 'æ', tcvn3: 'Ø', viqr: 'i?' },
    { unicode: 'ị', vni: 'ò', tcvn3: 'Þ', viqr: 'i.' },
    { unicode: 'ọ', vni: 'oï', tcvn3: 'ä', viqr: 'o.' },
    { unicode: 'ỏ', vni: 'oû', tcvn3: 'á', viqr: 'o?' },
    { unicode: 'ố', vni: 'oá', tcvn3: 'è', viqr: "o^'" },
    { unicode: 'ồ', vni: 'oà', tcvn3: 'å', viqr: 'o^`' },
    { unicode: 'ổ', vni: 'oå', tcvn3: 'æ', viqr: 'o^?' },
    { unicode: 'ỗ', vni: 'oã', tcvn3: 'ç', viqr: 'o^~' },
    { unicode: 'ộ', vni: 'oä', tcvn3: 'é', viqr: 'o^.' },
    { unicode: 'ớ', vni: 'ôù', tcvn3: 'í', viqr: "o+'" },
    { unicode: 'ờ', vni: 'ôø', tcvn3: 'ê', viqr: 'o+`' },
    { unicode: 'ở', vni: 'ôû', tcvn3: 'ë', viqr: 'o+?' },
    { unicode: 'ỡ', vni: 'ôõ', tcvn3: 'ì', viqr: 'o+~' },
    { unicode: 'ợ', vni: 'ôï', tcvn3: 'î', viqr: 'o+.' },

    { unicode: 'ụ', vni: 'uï', tcvn3: 'ô', viqr: 'u.' },
    { unicode: 'ủ', vni: 'uû', tcvn3: 'ñ', viqr: 'u?' },
    { unicode: 'ứ', vni: 'öù', tcvn3: 'ø', viqr: "u+'" },
    { unicode: 'ừ', vni: 'öø', tcvn3: 'õ', viqr: 'u+`' },
    { unicode: 'ử', vni: 'öû', tcvn3: 'ö', viqr: 'u+?' },
    { unicode: 'ữ', vni: 'öõ', tcvn3: '÷', viqr: 'u+~' },
    { unicode: 'ự', vni: 'öï', tcvn3: 'ù', viqr: 'u+.' },
    { unicode: 'ỳ', vni: 'yø', tcvn3: 'ú', viqr: 'y`' },
    { unicode: 'ỵ', vni: 'î', tcvn3: 'þ', viqr: 'y.' },
    { unicode: 'ỷ', vni: 'ë', tcvn3: 'û', viqr: 'y?' },
    { unicode: 'ỹ', vni: 'ì', tcvn3: 'ü', viqr: 'y~' },
  ];

  const result = {
    unicode: [] as Charset,
    vni: [] as Charset,
    tcvn3: [] as Charset,
    viqr: [] as Charset,
  };

  charMappings.forEach((mapping) => {
    result.unicode.push(mapping.unicode);
    result.vni.push(mapping.vni);
    result.tcvn3.push(mapping.tcvn3);
    result.viqr.push(mapping.viqr);
  });

  return result;
};

const generatedCharsets = createCharset();

const UNICODE: Charset = generatedCharsets.unicode;
const VNI: Charset = generatedCharsets.vni;
const TCVN3: Charset = generatedCharsets.tcvn3;
const VIQR: Charset = generatedCharsets.viqr;

const CHARSETS: Charsets = {
  [CharsetName.UNICODE]: UNICODE,
  [CharsetName.VNI]: VNI,
  [CharsetName.TCVN3]: TCVN3,
  [CharsetName.VIQR]: VIQR,
};

export default CHARSETS;
