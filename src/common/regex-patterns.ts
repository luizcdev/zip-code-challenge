export abstract class RegexPatterns {
  static readonly LAST_NON_ZERO = new RegExp('[^0][0]*$');
  static readonly ZIPCODE = new RegExp('^\\d{8}$');
}
