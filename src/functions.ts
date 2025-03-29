import { VietnameseConversion } from './VietnameseConversion';
import { CharsetNameString } from './types';

const conversionCache = new Map<string, string>();

/**
 * Creates a cache key from the text and charset information
 * @param text - The text to convert
 * @param fromCharset - Source character set
 * @param toCharset - Target character set
 * @returns A unique string key for caching
 */
function getCacheKey(text: string, fromCharset: string, toCharset: string): string {
  return `${fromCharset}:${toCharset}:${text}`;
}

/**
 * Converts text from one Vietnamese character set to another
 * @param text - The text to convert
 * @param fromCharset - Source character set
 * @param toCharset - Target character set
 * @returns The converted text
 */
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

/**
 * Converts text from specified character set to Unicode
 * @param text - The text to convert
 * @param currentCharset - Current character set of the text
 * @returns The text converted to Unicode
 */
export function toUnicode(text: string, currentCharset: CharsetNameString | string): string {
  return convert(text, currentCharset, 'unicode');
}

/**
 * Converts text from specified character set to VNI
 * @param text - The text to convert
 * @param currentCharset - Current character set of the text
 * @returns The text converted to VNI format
 */
export function toVNI(text: string, currentCharset: CharsetNameString | string): string {
  return convert(text, currentCharset, 'vni');
}

/**
 * Converts text from specified character set to TCVN3
 * @param text - The text to convert
 * @param currentCharset - Current character set of the text
 * @returns The text converted to TCVN3 format
 */
export function toTCVN3(text: string, currentCharset: CharsetNameString | string): string {
  return convert(text, currentCharset, 'tcvn3');
}

/**
 * Converts text from specified character set to VIQR
 * @param text - The text to convert
 * @param currentCharset - Current character set of the text
 * @returns The text converted to VIQR format
 */
export function toVIQR(text: string, currentCharset: CharsetNameString | string): string {
  return convert(text, currentCharset, 'viqr');
}

/**
 * Creates a custom converter function for a specific target charset
 * @param targetCharset - The target character set to convert to
 * @returns A conversion function that accepts text and source charset
 */
export function createConverter(targetCharset: CharsetNameString | string) {
  return (text: string, currentCharset: CharsetNameString | string): string =>
    convert(text, currentCharset, targetCharset);
}

/**
 * Detects the character set of the provided Vietnamese text
 * @param text - The text to analyze
 * @returns The detected character set or null if not determined
 */
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
