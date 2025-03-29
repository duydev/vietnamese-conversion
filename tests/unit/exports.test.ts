import { expect } from 'chai';
import {
  VietnameseConversion,
  CharsetName,
  toUnicode,
  toVNI,
  toTCVN3,
  toVIQR,
  createConverter,
  detectCharset,
} from '../../src';

describe('Index exports', () => {
  it('should export all necessary functions and types', () => {
    expect(typeof toUnicode).to.equal('function');
    expect(typeof toVNI).to.equal('function');
    expect(typeof toTCVN3).to.equal('function');
    expect(typeof toVIQR).to.equal('function');
    expect(typeof createConverter).to.equal('function');
    expect(typeof detectCharset).to.equal('function');

    expect(typeof VietnameseConversion).to.equal('function');

    expect(typeof CharsetName).to.equal('object');
    expect(CharsetName.UNICODE).to.equal('UNICODE');
    expect(CharsetName.VNI).to.equal('VNI');
    expect(CharsetName.TCVN3).to.equal('TCVN3');
    expect(CharsetName.VIQR).to.equal('VIQR');
  });

  it('should ensure each exported function can be called', () => {
    const text = 'Tiếng Việt';

    const unicode = toUnicode(text, 'unicode');
    expect(unicode).to.equal(text);

    const vni = toVNI(text, 'unicode');
    expect(vni).to.not.equal(text);

    const tcvn3 = toTCVN3(text, 'unicode');
    expect(tcvn3).to.not.equal(text);

    const viqr = toVIQR(text, 'unicode');
    expect(viqr).to.not.equal(text);

    const toUnicodeConverter = createConverter('unicode');
    expect(typeof toUnicodeConverter).to.equal('function');
    expect(toUnicodeConverter(vni, 'vni')).to.equal(text);

    const charset = detectCharset(text);
    expect(charset).to.equal('unicode');
  });

  it('should properly handle exports', () => {
    const conversion = new VietnameseConversion('Test', 'unicode');
    expect(conversion.getText()).to.equal('Test');
    expect(conversion.getCharset()).to.equal('unicode');
  });
});
