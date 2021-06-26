export class SimpleLogDto {
  public date: string;

  constructor(
    readonly level: string,
    readonly context: string,
    readonly message: string,
    readonly trace?: string,
  ) {
    this.date = new Date().toISOString();
  }
}

export class HttpLogDto {
  readonly level: 'HTTP';
  public date: string;
  public message: string;
  constructor(
    readonly context: string,
    readonly method: string,
    readonly originalUrl: string,
    readonly statusCode: number,
  ) {
    this.date = new Date().toISOString();
    this.message = `${method} ${originalUrl} ${statusCode}`;
  }
}
