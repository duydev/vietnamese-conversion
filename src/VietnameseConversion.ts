import { Charsets } from './types';
import VietnameseConversionInterface from './VietnameseConversionInterface';
import CHARSETS from './charsets';

export class VietnameseConversion implements VietnameseConversionInterface {
  private _charsets: Charsets = CHARSETS;
  private _text: string;
  private _chartset: string;

  constructor(text: string, charset: string) {
    if (!this.isValidCharset(charset)) {
      throw Error('Charset is not valid');
    }

    this._text = text;
    this._chartset = charset.toUpperCase();
  }

  private isValidCharset(charset: string) {
    const charsetNames = Object.keys(this._charsets);

    return charsetNames.indexOf(charset.toUpperCase()) > -1;
  }

  private getCharsArray(charset: string): string[] {
    return this._charsets[charset];
  }

  toCharset(charset: string): string {
    if (!this.isValidCharset(charset)) {
      throw Error('Charset is not valid');
    }

    if (this._chartset === charset.toUpperCase()) {
      return this._text;
    }

    const fromCharsArray = this.getCharsArray(this._chartset);
    const toCharsArray = this.getCharsArray(charset.toUpperCase());
    const countChars = fromCharsArray.length;

    let text = this._text;

    for (let i = 0; i < countChars; i++) {
      const char = fromCharsArray[i];
      const re = new RegExp(char, 'g');

      text = text.replace(re, `::${i}::`);
    }

    for (let i = 0; i < countChars; i++) {
      const char = toCharsArray[i];
      const re = new RegExp(`::${i}::`, 'g');

      text = text.replace(re, char);
    }

    return text;
  }
}

export default VietnameseConversion;
