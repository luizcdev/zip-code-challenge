import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService<T> {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async get(key: string): Promise<T> {
    return this.cacheManager.get(key);
  }

  public async set(key: string, value: T): Promise<T> {
    return this.cacheManager.set(key, value);
  }
}
