import { VietnameseConversion } from './VietnameseConversion';
import { CharsetNameString } from './types';

const conversionCache = new Map<string, string>();

function getCacheKey(text: string, fromCharset: string, toCharset: string): string {
  return `${fromCharset}:${toCharset}:${text}`;
}

function convert(
  text: string,
  fromCharset: CharsetNameString | string,
  toCharset: CharsetNameString | string,
): string {
  if (!text) return '';

  const cacheKey = getCacheKey(text, fromCharset, toCharset);

  if (conversionCache.has(cacheKey)) {
    return conversionCache.get(cacheKey)!;
  }

  const conversion = new VietnameseConversion(text, fromCharset);
  const result = conversion.toCharset(toCharset);

  if (conversionCache.size > 1000) {
    const firstKey = conversionCache.keys().next().value;
    if (firstKey) {
      conversionCache.delete(firstKey);
    }
  }
  conversionCache.set(cacheKey, result);

  return result;
}

export function toUnicode(text: string, currentCharset: CharsetNameString | string): string {
  return convert(text, currentCharset, 'unicode');
}

export function toVNI(text: string, currentCharset: CharsetNameString | string): string {
  return convert(text, currentCharset, 'vni');
}

export function toTCVN3(text: string, currentCharset: CharsetNameString | string): string {
  return convert(text, currentCharset, 'tcvn3');
}

export function toVIQR(text: string, currentCharset: CharsetNameString | string): string {
  return convert(text, currentCharset, 'viqr');
}

export function createConverter(targetCharset: CharsetNameString | string) {
  return (text: string, currentCharset: CharsetNameString | string): string =>
    convert(text, currentCharset, targetCharset);
}

export function detectCharset(text: string): CharsetNameString | null {
  if (!text) return null;

  const hasVNI = /[a-zA-Z][0-9]/.test(text);

  const hasVIQR = /[\^+\(\)\\\'`\?~\.]/.test(text);

  const hasUnicode = /[áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđĐ]/.test(
    text.toLowerCase(),
  );

  const hasTCVN3 = /[µ¸©·¡§ÌÐÝÓ¨®Ü¬­¹¶Ê»¼½Æ]/.test(text) && !hasUnicode && !hasVIQR && !hasVNI;

  if (hasUnicode) return 'unicode';
  if (hasVIQR && !hasVNI) return 'viqr';
  if (hasVNI && !hasVIQR) return 'vni';
  if (hasTCVN3) return 'tcvn3';

  return null;
}
