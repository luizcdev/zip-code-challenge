import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { RegexPatterns } from 'src/common/regex-patterns';

export class ZipCodePipe implements PipeTransform {
  transform(value: any) {
    if (!value) throw new BadRequestException("zipcode can't be null");

    const zipCode = String(value).replace('-', '');

    if (!RegexPatterns.ZIPCODE.test(zipCode))
      throw new BadRequestException('zipcode incorrect format');

    return zipCode;
  }
}
