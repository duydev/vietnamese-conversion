const { expect } = require('chai');
const VietnameseConversion = require('../dist');
const { toUnicode, toVNI, toTCVN3, toVIQR } = require('../dist');

describe(`dist - Vietnamese conversion`, () => {
  it(`should throw invalid charset when init`, () => {
    expect(() => {
      const conversion = new VietnameseConversion('Xin chào các bạn', 'abc');

      expect(conversion.toCharset('vni')).is.equal('Xin chaøo caùc baïn');
    }).be.throw('Charset is not valid');
  });

  it(`should throw invalid charset when transform`, () => {
    expect(() => {
      const conversion = new VietnameseConversion(
        'Xin chào các bạn',
        'unicode'
      );

      expect(conversion.toCharset('abc')).is.equal('Xin chaøo caùc baïn');
    }).be.throw('Charset is not valid');
  });

  it(`should return original text`, () => {
    const conversion = new VietnameseConversion('Xin chào các bạn', 'unicode');

    expect(conversion.toCharset('unicode')).is.equal('Xin chào các bạn');
  });

  it(`class - should return true Unicode`, () => {
    const conversion = new VietnameseConversion('Xin chaøo caùc baïn', 'vni');

    expect(conversion.toCharset('unicode')).is.equal('Xin chào các bạn');
  });

  it(`class - should return true VNI`, () => {
    const conversion = new VietnameseConversion('Xin chào các bạn', 'unicode');

    expect(conversion.toCharset('vni')).is.equal('Xin chaøo caùc baïn');
  });

  it(`class - should return true TCVN3`, () => {
    const conversion = new VietnameseConversion('Xin chào các bạn', 'unicode');

    expect(conversion.toCharset('tcvn3')).is.equal('Xin chµo c¸c b¹n');
  });

  it(`class - should return true VIQR`, () => {
    const conversion = new VietnameseConversion('Xin chào các bạn', 'unicode');

    expect(conversion.toCharset('viqr')).is.equal("Xin cha`o ca'c ba.n");
  });

  it(`func - should return true Unicode`, () => {
    expect(toUnicode('Toâi ñi hoïc', 'vni')).is.eq('Tôi đi học');
  });

  it(`func - should return true VNI`, () => {
    expect(toVNI('Tôi đi học', 'unicode')).is.eq('Toâi ñi hoïc');
  });

  it(`func - should return true TCVN3`, () => {
    expect(toTCVN3('Tôi đi học', 'unicode')).is.eq('T«i ®i häc');
  });

  it(`func - should return true VIQR`, () => {
    expect(toVIQR('Tôi đi học', 'unicode')).is.eq('To^i ddi ho.c');
  });
});
