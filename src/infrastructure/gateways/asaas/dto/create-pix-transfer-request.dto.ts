import { PixAddressKeyType } from './pix-address-key-type';

export class CreatePixTransferRequestDto {
    constructor(
      public readonly value: number,
      public readonly pixAddressKey: string,
      public readonly pixAddressKeyType: PixAddressKeyType,
      public readonly description?: string,
      public readonly scheduleDate?: string | null,
    ) {}
  }