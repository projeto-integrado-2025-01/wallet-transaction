import { BankAccountDto } from './bank-account.dto';

export class CreatePixTransferResponseDto {
  constructor(
    public readonly id: string,
    public readonly value: number,
    public readonly netValue: number,
    public readonly description: string,
    public readonly type: string,
    public readonly operationType: string,
    public readonly status: string,
    public readonly bankAccount: BankAccountDto,
    public readonly walletId: string | null,
    public readonly recurring: string | null,
    public readonly transactionReceiptUrl: string | null,
    public readonly endToEndIdentifier: string | null,
    public readonly externalReference: string | null,
    public readonly dateCreated: string,
    public readonly canBeCancelled: boolean,
    public readonly authorized: boolean,
    public readonly transferFee: number,
    public readonly scheduleDate: string | null,
    public readonly failReason: string | null,
    public readonly effectiveDate: string | null,
    public readonly confirmedDate: string | null,
    public readonly object: string,
  ) {}
}
