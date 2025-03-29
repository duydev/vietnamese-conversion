import { expect } from 'chai';
import { VietnameseConversion } from '../../src';
import { TestPhrases, InvalidCharset } from '../helpers/test-data';
import { testConversionFromCharset } from '../helpers/common-tests';

describe('VietnameseConversion class', () => {
  describe('Error handling', () => {
    it('should throw error when initializing with invalid charset', () => {
      expect(() => {
        new VietnameseConversion(TestPhrases.greeting.unicode, InvalidCharset);
      }).to.throw('Charset is not valid');
    });

    it('should throw error when converting to invalid charset', () => {
      expect(() => {
        const conversion = new VietnameseConversion(TestPhrases.greeting.unicode, 'unicode');
        conversion.toCharset(InvalidCharset);
      }).to.throw('Charset is not valid');
    });

    it('should handle case insensitive charset names', () => {
      const conversion1 = new VietnameseConversion(TestPhrases.greeting.unicode, 'UNICODE');
      const conversion2 = new VietnameseConversion(TestPhrases.greeting.unicode, 'unicode');
      expect(conversion1.toCharset('vni')).to.equal(conversion2.toCharset('VNI'));
    });

    it('should handle null or undefined text in constructor', () => {
      const conversion1 = new VietnameseConversion(null as unknown as string, 'unicode');
      const conversion2 = new VietnameseConversion(undefined as unknown as string, 'unicode');
      expect(conversion1.getText()).to.equal('');
      expect(conversion2.getText()).to.equal('');
    });

    it('should handle empty text', () => {
      const conversion = new VietnameseConversion('', 'unicode');
      expect(conversion.toCharset('vni')).to.equal('');
    });

    it('should handle falsy charset values', () => {
      expect(() => {
        new VietnameseConversion('test', '' as unknown as string);
      }).to.throw('Charset is not valid');

      expect(() => {
        new VietnameseConversion('test', null as unknown as string);
      }).to.throw('Charset is not valid');

      expect(() => {
        new VietnameseConversion('test', undefined as unknown as string);
      }).to.throw('Charset is not valid');
    });
  });

  describe('Charset conversions', () => {
    describe('From Unicode', () => {
      testConversionFromCharset('unicode');
    });

    describe('From VNI', () => {
      testConversionFromCharset('vni');
    });

    describe('From TCVN3', () => {
      testConversionFromCharset('tcvn3');
    });

    describe('From VIQR', () => {
      testConversionFromCharset('viqr');
    });

    it('should use regex cache for better performance', () => {
      const conversion = new VietnameseConversion('aáà', 'unicode');
      conversion.toCharset('vni');
      const result = conversion.toCharset('vni');
      expect(result).to.equal('aaùaø');
    });
  });

  describe('Special cases', () => {
    it('should handle complex text with all diacritics (roundtrip)', () => {
      const complexUnicode = TestPhrases.complex.unicode;
      const conversion = new VietnameseConversion(complexUnicode, 'unicode');
      const vniResult = conversion.toCharset('vni');
      const backToUnicode = new VietnameseConversion(vniResult, 'vni').toCharset('unicode');
      expect(backToUnicode).to.equal(complexUnicode);
    });

    it('should invoke viqrToUnicodeSpecial when converting from VIQR to Unicode', () => {
      const viqrText = "du+. mo^.t vi'";
      const expectedUnicode = 'dụ một ví';
      const conversion = new VietnameseConversion(viqrText, 'viqr');
      expect(conversion.toCharset('unicode')).to.equal(expectedUnicode);
    });

    it('should correctly handle same source and target charset', () => {
      const text = 'Test text';
      const conversion = new VietnameseConversion(text, 'unicode');
      expect(conversion.toCharset('unicode')).to.equal(text);
    });

    it('should correctly get charset and text', () => {
      const text = 'Test text';
      const conversion = new VietnameseConversion(text, 'unicode');
      expect(conversion.getCharset()).to.equal('unicode');
      expect(conversion.getText()).to.equal(text);
    });

    it('should escape regex special characters properly', () => {
      const text = 'a.b*c+d?e|f[g]h(i)j{k}l';
      const conversion = new VietnameseConversion(text, 'unicode');
      expect(conversion.toCharset('unicode')).to.equal(text);
    });

    it('should handle complex vowel diacritic combinations in VIQR to Unicode', () => {
      const viqrText = "a^' a^` a^? a^~ a^. e^' e^` e^? e^~ e^. o^' o^` o^? o^~ o^.";
      const conversion = new VietnameseConversion(viqrText, 'viqr');
      const result = conversion.toCharset('unicode');
      expect(result).to.include('ấ');
      expect(result).to.include('ầ');
      expect(result).to.include('ẩ');
      expect(result).to.include('ẫ');
      expect(result).to.include('ậ');

      const emptyConversion = new VietnameseConversion('', 'viqr');
      expect(emptyConversion.toCharset('unicode')).to.equal('');
    });

    it('should handle cases where a multi-diacritic mapping is missing', () => {
      const viqrText = "u+' u+` u+? u+~ u+.";
      const conversion = new VietnameseConversion(viqrText, 'viqr');
      const result = conversion.toCharset('unicode');

      expect(result).to.include('ứ');
      expect(result).to.include('ừ');
      expect(result).to.include('ử');
      expect(result).to.include('ữ');
      expect(result).to.include('ự');
    });

    it('should handle error cases in diacritic combinations', () => {
      class TestableVIQRConversion extends VietnameseConversion {
        public testCreateDiacriticCombination(
          basePattern: string | null,
          tonePattern: string | null,
          map: Record<string, string>,
        ): string | null {
          if (basePattern === 'invalid' || tonePattern === 'invalid') {
            return this['createDiacriticCombination'](
              basePattern as string,
              tonePattern as string,
              {},
            );
          }

          if (basePattern === 'error' && tonePattern === 'error') {
            const badMap = {
              error: {
                toString: () => 'not-a-string',
                normalize: () => {
                  throw new Error('Cannot normalize');
                },
              },
            } as unknown as Record<string, string>;
            return this['createDiacriticCombination']('error', 'error', badMap);
          }

          return this['createDiacriticCombination'](
            basePattern as string,
            tonePattern as string,
            map,
          );
        }
      }

      const testMap = {
        'a^': 'â',
        "a'": 'á',
        'a.': 'ạ',
      };

      const conversion = new TestableVIQRConversion('test', 'viqr');

      expect(conversion.testCreateDiacriticCombination(null, "a'", testMap)).to.be.null;

      expect(conversion.testCreateDiacriticCombination('a^', null, testMap)).to.be.null;

      expect(conversion.testCreateDiacriticCombination('invalid', "a'", testMap)).to.be.null;

      expect(conversion.testCreateDiacriticCombination('a^', 'invalid', testMap)).to.be.null;

      expect(conversion.testCreateDiacriticCombination('error', 'error', testMap)).to.be.null;

      const validResult = conversion.testCreateDiacriticCombination('a^', "a'", testMap);
      expect(validResult).to.equal('ấ');
    });

    it('should handle regex pattern cache reuse', () => {
      class RegexCacheTestConversion extends VietnameseConversion {
        public testRegexCache() {
          const cache = this['_regexCache'];

          expect(cache.size).to.equal(0);

          const regex = this['getRegExp']('test');
          expect(regex).to.be.instanceOf(RegExp);
          expect(cache.size).to.equal(1);

          const cachedRegex = this['getRegExp']('test');
          expect(cachedRegex).to.equal(regex);

          const phRegex = this['getPlaceholderRegExp'](123);
          expect(phRegex).to.be.instanceOf(RegExp);

          const cachedPhRegex = this['getPlaceholderRegExp'](123);
          expect(cachedPhRegex).to.equal(phRegex);

          return true;
        }
      }

      const conversion = new RegexCacheTestConversion('test', 'unicode');
      expect(conversion.testRegexCache()).to.be.true;
    });

    it('should handle all possible VIQR patterns including special cases', () => {
      const viqrConversion = new VietnameseConversion('u+?', 'viqr');
      const unicodeResult = viqrConversion.toCharset('unicode');
      expect(unicodeResult).to.equal('ử');

      const patterns = ['du+.', "vi'", 'mo^.t'];

      const conversion = new VietnameseConversion(patterns.join(' '), 'viqr');
      const result = conversion.toCharset('unicode');

      expect(result).to.include('dụ');
      expect(result).to.include('ví');
      expect(result).to.include('một');
    });

    it('should handle directly calling viqrToUnicodeSpecial with empty or falsy values', () => {
      const conversion = new VietnameseConversion('test', 'viqr');

      expect(conversion.viqrToUnicodeSpecial('')).to.equal('');

      expect(conversion.viqrToUnicodeSpecial(null as unknown as string)).to.equal('');
      expect(conversion.viqrToUnicodeSpecial(undefined as unknown as string)).to.equal('');
    });
  });
});
