import { RegexPatterns } from 'src/core/util/regex-patterns';

export function getNextZipCode(zipCode: string): string {
  return zipCode.replace(
    RegexPatterns.LAST_NON_ZERO,
    replaceFirstCharacterWithZero,
  );
}

function replaceFirstCharacterWithZero(value: string): string {
  return '0' + value.slice(1);
}
