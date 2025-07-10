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
import { SingleTransactionService } from './services/single-transaction.service';
import { SingleTransaction } from './entities/single-transaction.entity';
import { EventTransaction } from './entities/transaction-event.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransferWebhook, Transfer, BankAccount, Bank, SingleTransaction, EventTransaction]),
    ClientsModule.register([
      {
        name: 'TRANSACTION_UPDATED_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'finance.transaction.process',
          queueOptions: {
            durable: true,
          }
        }
      }
    ]),
  ],
  controllers: [WebhookController],
  providers: [
    WebhookService,
    BankService,
    BankAccountService,
    SingleTransactionService,
    TransferService,
    TransferWebhookService,
  ],
})
export class WebhookModule {}
