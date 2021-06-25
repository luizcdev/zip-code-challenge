import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache.service';
import { CacheModule } from '@nestjs/common';

describe('Cache Service', () => {
  let service: CacheService<string>;
  const prefix = 'prefix_test';

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [CacheService],
    }).compile();

    service = app.get<CacheService<string>>(CacheService);
  });

  describe('set', () => {
    it('should return cached value when set it', async () => {
      const key = 'key_test_set';
      const value = 'value_test_set';

      const result = await service.set(prefix, key, value);

      expect(result).toEqual(value);
    });
  });

  describe('get', () => {
    it('should return undefined when get key not cached', async () => {
      const key = 'key_test_null';

      const result = await service.get(prefix, key);

      expect(result).toBeUndefined();
    });

    it('should return cached value when get key cached', async () => {
      const key = 'key_test_get';
      const value = 'value_test_get';

      await service.set(prefix, key, value);
      const result = await service.get(prefix, key);

      expect(result).toEqual(value);
    });
  });
});
