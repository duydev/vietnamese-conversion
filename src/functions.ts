import VietnameseConversion from './VietnameseConversion';

export function toUnicode(text: string, currentCharset: string) {
  const conversion = new VietnameseConversion(text, currentCharset);

  return conversion.toCharset('unicode');
}

export function toVNI(text: string, currentCharset: string) {
  const conversion = new VietnameseConversion(text, currentCharset);

  return conversion.toCharset('vni');
}

export function toTCVN3(text: string, currentCharset: string) {
  const conversion = new VietnameseConversion(text, currentCharset);

  return conversion.toCharset('tcvn3');
}

export function toVIQR(text: string, currentCharset: string) {
  const conversion = new VietnameseConversion(text, currentCharset);

  return conversion.toCharset('viqr');
}
