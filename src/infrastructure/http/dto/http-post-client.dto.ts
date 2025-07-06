export class HttpPostClientDto {
  constructor(
    public readonly url: string,
    public readonly body?: any,
    public readonly headers?: any,
  ) {}
}
