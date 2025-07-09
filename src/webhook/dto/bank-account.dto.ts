import { BankDto } from './bank.dto';

export class BankAccountDto {
  bank: BankDto;
  accountName: string;
  ownerName: string;
  cpfCnpj: string;
  agency: string;
  agencyDigit: string;
  account: string;
  accountDigit: string;
  pixAddressKey: string | null;
}
