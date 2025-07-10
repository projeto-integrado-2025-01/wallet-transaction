import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { makeQueueConsumer } from './main/factories/make-rabbitmq-consumer';
import { makeAsaasTransferClient } from './main/factories/make-asaas-client';
import { mockCreatePixTransferRequestDto } from 'test/infraestructure/gateways/asaas/mock-create-pix-transfer-request.dto';
import { CreatePixTransferRequestDto } from './infrastructure/gateways/asaas/dto/create-pix-transfer-request.dto';
import { randomUUID } from 'crypto';
import {
  PixAddressKeyType,
  pixAddressKeyTypeFromString,
} from './infrastructure/gateways/asaas/dto/pix-address-key-type';
import { SingleTransactionService } from './webhook/services/single-transaction.service';
import { CreateSingleTransactionDto } from './webhook/dto/create-single-transaction.dto';
import { ClientProxy } from '@nestjs/microservices';
import { makeTransactionQueue } from './infrastructure/queue/queue-publish';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const singleTransactionService = app.get(SingleTransactionService); // injeta service do Nest

  const transactionQueue = makeTransactionQueue();

  const asaasTransferClient = makeAsaasTransferClient();

  const queueConsumer = makeQueueConsumer();
  await queueConsumer.consume({
    queue: 'finance.transaction.process',
    onMessage: async (message: any) => {
      console.log('message', message);

      const { pattern, data } = message;

      if (pattern === 'SINGLE_TRANSACTION_CREATED') {
        const singleTransaction = await singleTransactionService.create(
          pattern,
          data as CreateSingleTransactionDto,
        );

        const dto = new CreatePixTransferRequestDto(
          singleTransaction.eventTransaction.value,
          singleTransaction.eventTransaction.pixKey,
          pixAddressKeyTypeFromString(
            singleTransaction.eventTransaction.pixKeyType,
          ),
          null,
          singleTransaction.eventTransaction.scheduleDate?.toString(),
          singleTransaction.eventTransaction.endToEndId,
        );

        try {
          await asaasTransferClient.createTransfer(dto);
        } catch (error) {
          await transactionQueue.connect();

          await transactionQueue.connect();
          transactionQueue.emit('TRANSACTION_STATUS_UPDATED', {
            endToEndId: singleTransaction.eventTransaction.endToEndId,
            status: 'ERROR',
          });
        }
      }
    },
  });
}

bootstrap();
