export abstract class RegexPatterns {
  static LAST_NON_ZERO = new RegExp('[^0][0]*$');
  static ZIPCODE = new RegExp('^\\d{8}$|(\\d{5}-\\d{3})$');
}
