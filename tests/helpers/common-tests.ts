import { expect } from 'chai';
import { TestPhrases, NonVietnameseText } from './test-data';
import { VietnameseConversion } from '../../src';

export function testConversionFromCharset(sourceCharset: 'unicode' | 'vni' | 'tcvn3' | 'viqr') {
  const charsets = ['unicode', 'vni', 'tcvn3', 'viqr'];
  const sourceText =
    sourceCharset === 'unicode'
      ? TestPhrases.greeting.unicode
      : sourceCharset === 'vni'
        ? TestPhrases.greeting.vni
        : sourceCharset === 'tcvn3'
          ? TestPhrases.greeting.tcvn3
          : TestPhrases.greeting.viqr;

  charsets.forEach((targetCharset) => {
    if (targetCharset === sourceCharset) {
      it(`should keep the same text when target charset is the same as source (${sourceCharset})`, () => {
        const conversion = new VietnameseConversion(sourceText, sourceCharset);
        expect(conversion.toCharset(targetCharset)).to.equal(sourceText);
      });
    } else {
      const expectedText =
        targetCharset === 'unicode'
          ? TestPhrases.greeting.unicode
          : targetCharset === 'vni'
            ? TestPhrases.greeting.vni
            : targetCharset === 'tcvn3'
              ? TestPhrases.greeting.tcvn3
              : TestPhrases.greeting.viqr;

      it(`should convert from ${sourceCharset} to ${targetCharset}`, () => {
        const conversion = new VietnameseConversion(sourceText, sourceCharset);
        expect(conversion.toCharset(targetCharset)).to.equal(expectedText);
      });
    }
  });
}

export function testEmptyString(
  conversionFunc: (text: string, charset: string) => string,
  sourceCharset: string,
) {
  it(`should handle empty string (${sourceCharset} → via ${conversionFunc.name})`, () => {
    expect(conversionFunc('', sourceCharset)).to.equal('');
  });
}

export function testNonVietnameseText(
  conversionFunc: (text: string, charset: string) => string,
  sourceCharset: string,
) {
  it(`should preserve non-Vietnamese text (${sourceCharset} → via ${conversionFunc.name})`, () => {
    expect(conversionFunc(NonVietnameseText, sourceCharset)).to.equal(NonVietnameseText);
  });
}
