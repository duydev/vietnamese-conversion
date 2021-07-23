import { expect } from 'chai';
import VietnameseConversion from '../src';

describe(`Vietnamese conversion`, () => {
  it(`should be convert success`, () => {
    const conversion = new VietnameseConversion('Xin chào các bạn', 'unicode');

    expect(conversion.toCharset('vni')).is.equal('Xin chaøo caùc baïn');
  });

  it(`should throw invalid charset when init`, () => {
    expect(() => {
      const conversion = new VietnameseConversion(
        'Xin chào các bạn',
        'abc'
      );

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
});
