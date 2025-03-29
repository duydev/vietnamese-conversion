import { expect } from 'chai';
import { VietnameseConversion, toVNI, toUnicode } from '../../src';
import { TestPhrases } from '../helpers/test-data';

describe('Integration tests', () => {
  describe('Multiple conversion steps', () => {
    it('should correctly do roundtrip conversion (Unicode → VNI → Unicode)', () => {
      const vniText = toVNI(TestPhrases.sentence.unicode, 'unicode');

      const roundtripUnicode = toUnicode(vniText, 'vni');

      expect(roundtripUnicode).to.equal(TestPhrases.sentence.unicode);
    });

    it('should handle roundtrip with class method (Unicode → VNI → Unicode)', () => {
      const conversion = new VietnameseConversion(TestPhrases.greeting.unicode, 'unicode');
      const vniText = conversion.toCharset('vni');

      const vniConversion = new VietnameseConversion(vniText, 'vni');
      const roundtripUnicode = vniConversion.toCharset('unicode');

      expect(roundtripUnicode).to.equal(TestPhrases.greeting.unicode);
    });
  });

  describe('Chain conversions', () => {
    it('should correctly chain multiple conversions', () => {
      const originalText = TestPhrases.greeting.unicode;

      const vniText = new VietnameseConversion(originalText, 'unicode').toCharset('vni');
      const tcvn3Text = new VietnameseConversion(vniText, 'vni').toCharset('tcvn3');
      const viqrText = new VietnameseConversion(tcvn3Text, 'tcvn3').toCharset('viqr');
      const backToUnicode = new VietnameseConversion(viqrText, 'viqr').toCharset('unicode');

      expect(backToUnicode).to.equal(originalText);
    });

    it('should handle complex text in a chain of conversions', () => {
      const originalText = TestPhrases.complex.unicode;

      const vniText = toVNI(originalText, 'unicode');
      const backToUnicode = toUnicode(vniText, 'vni');

      expect(backToUnicode).to.equal(originalText);
    });
  });
});
