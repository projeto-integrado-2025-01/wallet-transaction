import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { TransferWebhook } from './entities/transfer-webhook.entity';
import { Transfer } from './entities/transfer.entity';
import { BankAccount } from './entities/bank-account.entity';
import { Bank } from './entities/bank.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankService } from './services/bank.service';
import { BankAccountService } from './services/bank-account.service';
import { TransferService } from './services/transfer.service';
import { TransferWebhookService } from './services/transfer-webhook.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransferWebhook, Transfer, BankAccount, Bank]),
  ],
  controllers: [WebhookController],
  providers: [
    WebhookService,
    BankService,
    BankAccountService,
    TransferService,
    TransferWebhookService,
  ],
})
export class WebhookModule {}
