import { BadRequestException } from '@nestjs/common';
import { ZipCodePipe } from '../pipe/zipcode.pipe';

describe('Zipcode Pipe', () => {
  const pipe: ZipCodePipe = new ZipCodePipe();

  describe('transform', () => {
    it('should throw BadRequestException when zipcode is null', async () => {
      let result;

      try {
        pipe.transform(null);
      } catch (e) {
        result = e;
      }

      expect(result).toBeInstanceOf(BadRequestException);
      expect(result.message).toEqual("zipcode can't be null");
    });

    it('should return zipcode when zipcode have eight numbers', async () => {
      const zipCode = '99999999';
      const result = pipe.transform(zipCode);

      expect(result).toEqual(zipCode);
    });

    it('should return zipcode without "-" when zipcode have format of 99999-999', async () => {
      const zipCode = '99999-999';
      const result = pipe.transform(zipCode);

      expect(result).toEqual('99999999');
    });

    it('should throw BadRequestException when zipcode have diferent format of 99999999 or 99999-999', async () => {
      const zipCode = '9-9999999';

      let result;
      try {
        pipe.transform(zipCode);
      } catch (e) {
        result = e;
      }

      expect(result).toBeInstanceOf(BadRequestException);
      expect(result.message).toEqual('zipcode incorrect format');
    });
  });
});
