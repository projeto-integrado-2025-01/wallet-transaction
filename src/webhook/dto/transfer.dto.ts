import { BankAccountDto } from './bank-account.dto';

export class TransferDto {
  object: string;
  id: string;
  dateCreated: string;
  status: string;
  effectiveDate: string | null;
  endToEndIdentifier: string | null;
  type: string;
  value: number;
  netValue: number;
  transferFee: number;
  scheduleDate: string;
  authorized: boolean;
  failReason: string | null;
  transactionReceiptUrl: string | null;
  bankAccount: BankAccountDto;
  operationType: string;
  description: string | null;
  externalReference: string | null;
}
