import { expect } from 'chai';
import { toUnicode, toVNI, toTCVN3, toVIQR, createConverter, detectCharset } from '../../src';
import { TestPhrases, VIQREdgeCases } from '../helpers/test-data';
import { testEmptyString, testNonVietnameseText } from '../helpers/common-tests';

describe('Utility functions', () => {
  describe('toUnicode()', () => {
    it('should convert from VNI to Unicode', () => {
      expect(toUnicode(TestPhrases.sentence.vni, 'vni')).to.equal(TestPhrases.sentence.unicode);
    });

    it('should convert from TCVN3 to Unicode', () => {
      expect(toUnicode(TestPhrases.sentence.tcvn3, 'tcvn3')).to.equal(TestPhrases.sentence.unicode);
    });

    it('should convert from VIQR to Unicode', () => {
      expect(toUnicode(TestPhrases.sentence.viqr, 'viqr')).to.equal(TestPhrases.sentence.unicode);
    });

    testEmptyString(toUnicode, 'vni');
    testNonVietnameseText(toUnicode, 'vni');
  });

  describe('toVNI()', () => {
    it('should convert from Unicode to VNI', () => {
      expect(toVNI(TestPhrases.sentence.unicode, 'unicode')).to.equal(TestPhrases.sentence.vni);
    });

    it('should convert from TCVN3 to VNI', () => {
      expect(toVNI(TestPhrases.sentence.tcvn3, 'tcvn3')).to.equal(TestPhrases.sentence.vni);
    });

    it('should convert from VIQR to VNI', () => {
      expect(toVNI(TestPhrases.sentence.viqr, 'viqr')).to.equal(TestPhrases.sentence.vni);
    });

    testEmptyString(toVNI, 'unicode');
    testNonVietnameseText(toVNI, 'unicode');
  });

  describe('toTCVN3()', () => {
    it('should convert from Unicode to TCVN3', () => {
      expect(toTCVN3(TestPhrases.sentence.unicode, 'unicode')).to.equal(TestPhrases.sentence.tcvn3);
    });

    it('should convert from VNI to TCVN3', () => {
      expect(toTCVN3(TestPhrases.sentence.vni, 'vni')).to.equal(TestPhrases.sentence.tcvn3);
    });

    it('should convert from VIQR to TCVN3', () => {
      expect(toTCVN3(TestPhrases.sentence.viqr, 'viqr')).to.equal(TestPhrases.sentence.tcvn3);
    });

    testEmptyString(toTCVN3, 'unicode');
    testNonVietnameseText(toTCVN3, 'unicode');
  });

  describe('toVIQR()', () => {
    it('should convert from Unicode to VIQR', () => {
      expect(toVIQR(TestPhrases.sentence.unicode, 'unicode')).to.equal(TestPhrases.sentence.viqr);
    });

    it('should convert from VNI to VIQR', () => {
      expect(toVIQR(TestPhrases.sentence.vni, 'vni')).to.equal(TestPhrases.sentence.viqr);
    });

    it('should convert from TCVN3 to VIQR', () => {
      expect(toVIQR(TestPhrases.sentence.tcvn3, 'tcvn3')).to.equal(TestPhrases.sentence.viqr);
    });

    testEmptyString(toVIQR, 'unicode');
    testNonVietnameseText(toVIQR, 'unicode');
  });

  describe('VIQR Edge Cases', () => {
    it('should correctly handle complex diacritics in VIQR', () => {
      expect(toUnicode(VIQREdgeCases.complexDiacritics.viqr, 'viqr')).to.equal(
        VIQREdgeCases.complexDiacritics.unicode,
      );
    });

    it('should correctly handle special case du+. to dụ', () => {
      expect(toUnicode(VIQREdgeCases.specialDu.viqr, 'viqr')).to.equal(
        VIQREdgeCases.specialDu.unicode,
      );
    });

    it('should correctly handle multiple diacritics with particles', () => {
      expect(toUnicode(VIQREdgeCases.multipleDiacritics.viqr, 'viqr')).to.equal(
        VIQREdgeCases.multipleDiacritics.unicode,
      );
    });

    it('should correctly handle academic Vietnamese with VIQR', () => {
      expect(toUnicode(VIQREdgeCases.academic.viqr, 'viqr')).to.equal(
        VIQREdgeCases.academic.unicode,
      );
    });

    it('should handle the direct VIQR pattern du+.', () => {
      expect(toUnicode('du+.', 'viqr')).to.equal('dụ');
    });

    it("should handle the direct VIQR pattern vi'", () => {
      expect(toUnicode("vi'", 'viqr')).to.equal('ví');
    });

    it('should handle the direct VIQR pattern mo^.t', () => {
      expect(toUnicode('mo^.t', 'viqr')).to.equal('một');
    });
  });

  describe('createConverter()', () => {
    it('should create a converter function for a specific target charset', () => {
      const toVNIConverter = createConverter('vni');
      expect(typeof toVNIConverter).to.equal('function');
      expect(toVNIConverter(TestPhrases.sentence.unicode, 'unicode')).to.equal(
        TestPhrases.sentence.vni,
      );
    });

    it('should handle different source charsets with created converter', () => {
      const toUnicodeConverter = createConverter('unicode');
      expect(toUnicodeConverter(TestPhrases.sentence.vni, 'vni')).to.equal(
        TestPhrases.sentence.unicode,
      );
      expect(toUnicodeConverter(TestPhrases.sentence.tcvn3, 'tcvn3')).to.equal(
        TestPhrases.sentence.unicode,
      );
    });

    it('should handle empty strings with created converter', () => {
      const toVNIConverter = createConverter('vni');
      expect(toVNIConverter('', 'unicode')).to.equal('');
    });
  });

  describe('detectCharset()', () => {
    it('should detect Unicode text correctly', () => {
      expect(detectCharset(TestPhrases.sentence.unicode)).to.equal('unicode');
    });

    it('should detect VNI text correctly', () => {
      const pureVNIText = 'Chu1 vie6t co3 da5u VNI';
      expect(detectCharset(pureVNIText)).to.equal('vni');
    });

    it('should detect VIQR text correctly', () => {
      expect(detectCharset(TestPhrases.sentence.viqr)).to.equal('viqr');
    });

    it('should detect TCVN3 text correctly', () => {
      expect(detectCharset(TestPhrases.sentence.tcvn3)).to.equal('tcvn3');
    });

    it('should return null for empty text', () => {
      expect(detectCharset('')).to.equal(null);
    });

    it('should return null for text with no Vietnamese markers', () => {
      expect(detectCharset('Hello world')).to.equal(null);
    });
  });

  describe('Conversion cache', () => {
    it('should use cache for repeated conversions', () => {
      const result1 = toUnicode(TestPhrases.sentence.vni, 'vni');
      const result2 = toUnicode(TestPhrases.sentence.vni, 'vni');
      expect(result1).to.equal(result2);
    });

    it('should handle cache overflow by removing old entries', () => {
      let i = 0;
      while (i <= 1001) {
        toUnicode(`Test cache overflow ${i}`, 'unicode');
        i++;
      }
      const result = toUnicode('Test final conversion', 'unicode');
      expect(result).to.equal('Test final conversion');
    });
  });
});
