import { Injectable } from '@nestjs/common';
import { TransferWebhookDto } from './dto/transfer-webhook.dto';
import { BankService } from './services/bank.service';
import { BankAccountService } from './services/bank-account.service';
import { TransferService } from './services/transfer.service';
import { TransferWebhookService } from './services/transfer-webhook.service';
import { TransferDto } from './dto/transfer.dto';
import { SingleTransactionService } from './services/single-transaction.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly bankService: BankService,
    private readonly bankAccountService: BankAccountService,
    private readonly transferService: TransferService,
    private readonly transferWebhookService: TransferWebhookService,
    private readonly eventTransactionService: TransferService,
  ) {}

  async saveWebhook(webhookDto: TransferWebhookDto) {
    const transferDto = webhookDto.transfer;
    const bankDto = transferDto.bankAccount.bank;
    const bankAccountDto = transferDto.bankAccount;

    // 1. Salvar banco
    const bank = await this.bankService.create({
      ispb: bankDto.ispb,
      code: bankDto.code,
      name: bankDto.name,
    });

    // 2. Salvar conta bancária com vínculo ao banco
    const bankAccount = await this.bankAccountService.create({
      accountName: bankAccountDto.accountName,
      ownerName: bankAccountDto.ownerName,
      cpfCnpj: bankAccountDto.cpfCnpj,
      agency: bankAccountDto.agency,
      agencyDigit: bankAccountDto.agencyDigit,
      account: bankAccountDto.account,
      accountDigit: bankAccountDto.accountDigit,
      pixAddressKey: bankAccountDto.pixAddressKey ?? undefined,
      bank,
    });

    // 3. Salvar transferência com vínculo à conta bancária
    const transfer = await this.transferService.create({
      transferId: transferDto.id,
      object: transferDto.object,
      dateCreated: transferDto.dateCreated,
      status: transferDto.status,
      effectiveDate: transferDto.effectiveDate ?? undefined,
      endToEndIdentifier: transferDto.endToEndIdentifier ?? undefined,
      type: transferDto.type,
      value: transferDto.value,
      netValue: transferDto.netValue,
      transferFee: transferDto.transferFee,
      scheduleDate: transferDto.scheduleDate,
      authorized: transferDto.authorized,
      failReason: transferDto.failReason ?? undefined,
      transactionReceiptUrl: transferDto.transactionReceiptUrl ?? undefined,
      operationType: transferDto.operationType,
      description: transferDto.description ?? undefined,
      externalReference: transferDto.externalReference ?? undefined,
      bankAccount,
    });

    // 4. Salvar webhook com vínculo à transferência
    await this.transferWebhookService.create({
      webhookId: webhookDto.id,
      event: webhookDto.event,
      dateCreated: webhookDto.dateCreated,
      transfer,
    });
  }

  async approveWebhook(transferDto: TransferDto) {
    if (!transferDto.externalReference) {
      throw new Error('External reference is required to approve the webhook');
    }

    const eventTransfer = this.eventTransactionService.findByEndToEndId(transferDto.externalReference);

    if (!eventTransfer) {
      throw new Error('Transfer not found for the provided external reference');
    }

    return true
  }
}
