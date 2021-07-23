import { Charsets } from './types';

export default interface VietnameseConversionInterface {
  isValidCharset(charset: string): boolean;
  getCharsArray(charset: string): string[];
  toCharset(charset: string): string;
}
