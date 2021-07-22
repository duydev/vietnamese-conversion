import { UNICODE, VNI } from './charsets';

export function unicodeToVNI(text: string): string {
  const countChars = UNICODE.length;

  let tmpText = text;

  for (let i = 0; i < countChars; i++) {
    const char = UNICODE[i];
    const re = new RegExp(char, 'g');

    tmpText = tmpText.replace(re, `::${i}::`);
  }

  for (let i = 0; i < countChars; i++) {
    const char = VNI[i];
    const re = new RegExp(`::${i}::`, 'g');

    tmpText = tmpText.replace(re, char);
  }

  return tmpText;
}
