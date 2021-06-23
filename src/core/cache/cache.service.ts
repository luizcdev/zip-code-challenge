import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService<T> {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async get(prefix: string, key: string): Promise<T> {
    return this.cacheManager.get(this.getKey(prefix, key));
  }

  public async set(prefix: string, key: string, value: T): Promise<T> {
    return this.cacheManager.set(this.getKey(prefix, key), value);
  }

  private getKey(prefix: string, key: string): string {
    return prefix + '#' + key;
  }
}
