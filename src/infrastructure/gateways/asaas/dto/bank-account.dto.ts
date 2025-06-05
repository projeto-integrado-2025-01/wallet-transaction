import { BankDto } from "./bank.dto";

export class BankAccountDto {
    constructor(
      public readonly bank: BankDto,
      public readonly accountName: string | null,
      public readonly ownerName: string,
      public readonly cpfCnpj: string,
      public readonly type: string,
      public readonly agency: string,
      public readonly agencyDigit: string | null,
      public readonly account: string,
      public readonly accountDigit: string,
      public readonly pixAddressKey: string
    ) {}
  }