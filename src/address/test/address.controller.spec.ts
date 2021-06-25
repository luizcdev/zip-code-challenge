import { Test, TestingModule } from '@nestjs/testing';
import { AddressMock } from './address.mock';
import { CacheService } from '../../../src/core/cache/cache.service';
import { AddressController } from '../address.controller';
import { AddressService } from '../address.service';
import { AddressDto } from '../dto/address.dto';
import { ViaCepClientService } from '../viacep/viacep-client.service';
import { NotFoundException } from '@nestjs/common';

describe('Address Controller', () => {
  let controller: AddressController;

  const viaCepClientMock = {
    getByZipCode: jest.fn(),
  };

  const cacheMock = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [AddressService, ViaCepClientService, CacheService],
    })
      .overrideProvider(ViaCepClientService)
      .useValue(viaCepClientMock)
      .overrideProvider(CacheService)
      .useValue(cacheMock)
      .compile();

    controller = app.get<AddressController>(AddressController);
  });

  beforeEach(async () => {
    viaCepClientMock.getByZipCode.mockReset();
    cacheMock.get.mockReset();
    cacheMock.set.mockReset();
  });

  describe('findByZipCode', () => {
    it('should return valid adress when zipcode cached', async () => {
      const zipcode = '99999999';

      const address: AddressDto = AddressMock.validAddress(zipcode);
      cacheMock.get.mockReturnValue(address);

      const result = await controller.findByZipCode(zipcode);

      expect(result).toEqual(address);
      expect(viaCepClientMock.getByZipCode).toHaveBeenCalledTimes(0);
    });

    it('should return valid adress when zipcode not cached', async () => {
      const zipcode = '99999999';

      const address: AddressDto = AddressMock.validAddress(zipcode);
      viaCepClientMock.getByZipCode.mockReturnValue(address);

      const result = await controller.findByZipCode(zipcode);

      expect(result).toEqual(address);
      expect(cacheMock.get).toHaveBeenCalledTimes(1);
    });

    it('should return valid adress when exits next zipcode sequence', async () => {
      const zipcode = '99999999';
      const nextZipcode = '99999990';

      const address: AddressDto = AddressMock.validAddress(nextZipcode);

      viaCepClientMock.getByZipCode
        .mockReturnValueOnce(null)
        .mockReturnValue(address);

      const result = await controller.findByZipCode(zipcode);

      expect(result).toEqual(address);
      expect(cacheMock.get).toHaveBeenCalledTimes(2);
    });

    it('should throw NotFoundException when not found all possible zipcodes', async () => {
      const zipCode = '99999999';

      viaCepClientMock.getByZipCode.mockReturnValue(null);

      const t = () => {
        throw new TypeError();
      };
      expect(t).toThrow(TypeError);

      let result;
      try {
        await controller.findByZipCode(zipCode);
      } catch (e) {
        result = e;
      }

      expect(result).toBeInstanceOf(NotFoundException);
      expect(result.message).toEqual(`zipCode ${zipCode} not found`);
      expect(cacheMock.get).toHaveBeenCalledTimes(8);
    });
  });
});
