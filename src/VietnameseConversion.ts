import { Charsets, CharsetName, CharsetNameString, VietnameseConversionInterface } from './types';
import CHARSETS from './charsets';

export class VietnameseConversion implements VietnameseConversionInterface {
  private _charsets: Charsets = CHARSETS;
  private _text: string;
  private _charset: string;
  private _regexCache: Map<string, RegExp> = new Map();

  constructor(text: string, charset: CharsetNameString | string) {
    if (text === null || text === undefined) {
      this._text = '';
    } else {
      this._text = text;
    }

    if (!this.isValidCharset(charset)) {
      throw Error('Charset is not valid');
    }

    this._charset = charset.toUpperCase();
  }

  private isValidCharset(charset: string): boolean {
    if (!charset) return false;

    const charsetNames = Object.keys(this._charsets);
    return charsetNames.indexOf(charset.toUpperCase()) > -1;
  }

  private getCharsArray(charset: string): string[] {
    return this._charsets[charset as keyof typeof CharsetName];
  }

  private getRegExp(char: string): RegExp {
    if (this._regexCache.has(char)) {
      return this._regexCache.get(char)!;
    }

    const escapedChar = this.escapeRegExp(char);
    const re = new RegExp(escapedChar, 'g');
    this._regexCache.set(char, re);

    return re;
  }

  private getPlaceholderRegExp(index: number): RegExp {
    const placeholder = `::${index}::`;

    if (this._regexCache.has(placeholder)) {
      return this._regexCache.get(placeholder)!;
    }

    const re = new RegExp(placeholder, 'g');
    this._regexCache.set(placeholder, re);

    return re;
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getCharset(): CharsetNameString | string {
    return this._charset.toLowerCase() as CharsetNameString;
  }

  getText(): string {
    return this._text;
  }

  private createDiacriticCombination(
    basePattern: string,
    tonePattern: string,
    viqrToUnicodeMap: Record<string, string>,
  ): string | null {
    if (!basePattern || !tonePattern) {
      return null;
    }

    if (!viqrToUnicodeMap[basePattern] || !viqrToUnicodeMap[tonePattern]) {
      return null;
    }

    const baseChar = viqrToUnicodeMap[basePattern];
    const toneChar = viqrToUnicodeMap[tonePattern];

    try {
      const baseNormalized = baseChar.normalize('NFD');
      const toneNormalized = toneChar.normalize('NFD').slice(-1);

      return (baseNormalized + toneNormalized).normalize('NFC');
    } catch (e) {
      return null;
    }
  }

  public viqrToUnicodeSpecial(viqrText: string): string {
    if (!viqrText) return '';

    const viqrChars = this.getCharsArray('VIQR');
    const unicodeChars = this.getCharsArray('UNICODE');

    const viqrToUnicodeMap: Record<string, string> = {};
    for (let i = 0; i < viqrChars.length; i++) {
      viqrToUnicodeMap[viqrChars[i]] = unicodeChars[i];
    }

    viqrToUnicodeMap['du+.'] = 'dụ';
    viqrToUnicodeMap["vi'"] = 'ví';
    viqrToUnicodeMap['mo^.t'] = 'một';

    const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
    const toneMarks = ["'", '`', '?', '~', '.'];
    const diacritics = ['^', '+', '('];

    for (const vowel of vowels) {
      for (const diacritic of diacritics) {
        for (const tone of toneMarks) {
          const pattern = `${vowel}${diacritic}${tone}`;
          const basePattern = `${vowel}${diacritic}`;
          const tonePattern = `${vowel}${tone}`;

          const combinedChar = this.createDiacriticCombination(
            basePattern,
            tonePattern,
            viqrToUnicodeMap,
          );
          if (combinedChar) {
            viqrToUnicodeMap[pattern] = combinedChar;
          }
        }
      }
    }

    const patterns = Object.keys(viqrToUnicodeMap).sort((a, b) => b.length - a.length);

    let result = viqrText;

    for (const pattern of patterns) {
      const regex = new RegExp(this.escapeRegExp(pattern), 'g');
      result = result.replace(regex, viqrToUnicodeMap[pattern]);
    }

    return result;
  }

  toCharset(charset: CharsetNameString | string): string {
    if (!this.isValidCharset(charset)) {
      throw Error('Charset is not valid');
    }

    const upperCharset = charset.toUpperCase();

    if (this._charset === upperCharset) {
      return this._text;
    }

    if (!this._text) {
      return '';
    }

    if (this._charset === 'VIQR' && upperCharset === 'UNICODE') {
      return this.viqrToUnicodeSpecial(this._text);
    }

    const fromCharsArray = this.getCharsArray(this._charset);
    const toCharsArray = this.getCharsArray(upperCharset);
    const countChars = fromCharsArray.length;

    let text = this._text;

    for (let i = 0; i < countChars; i++) {
      const char = fromCharsArray[i];
      text = text.replace(this.getRegExp(char), `::${i}::`);
    }

    for (let i = 0; i < countChars; i++) {
      const char = toCharsArray[i];
      text = text.replace(this.getPlaceholderRegExp(i), char);
    }

    return text;
  }
}

export default VietnameseConversion;
