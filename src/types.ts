export enum CharsetName {
  UNICODE = 'UNICODE',
  VNI = 'VNI',
  TCVN3 = 'TCVN3',
  VIQR = 'VIQR',
}

export type Charset = string[];

export type Charsets = Record<CharsetName, Charset>;

export type CharsetNameString = 'unicode' | 'vni' | 'tcvn3' | 'viqr';

export interface VietnameseConversionInterface {
  toCharset(charset: CharsetNameString | string): string;
  getCharset(): CharsetNameString | string;
  getText(): string;
}
