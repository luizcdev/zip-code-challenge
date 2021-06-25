import { BadRequestException, PipeTransform } from '@nestjs/common';
import { RegexPatterns } from '../../../src/core/util/regex-patterns';

export class ZipCodePipe implements PipeTransform {
  transform(value: any) {
    if (!value) throw new BadRequestException("zipcode can't be null");

    if (!RegexPatterns.ZIPCODE.test(value))
      throw new BadRequestException('zipcode incorrect format');

    return String(value).replace('-', '');
  }
}
