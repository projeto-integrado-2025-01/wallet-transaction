import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { makeQueueConsumer } from './main/factories/make-rabbitmq-consumer';
import { makeAsaasTransferClient } from './main/factories/make-asaas-client';
import { mockCreatePixTransferRequestDto } from 'test/infraestructure/gateways/asaas/mock-create-pix-transfer-request.dto';
import { CreatePixTransferRequestDto } from './infrastructure/gateways/asaas/dto/create-pix-transfer-request.dto';
import { randomUUID } from 'crypto';
import { PixAddressKeyType } from './infrastructure/gateways/asaas/dto/pix-address-key-type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3003);

  const queueConsumer = makeQueueConsumer();
  await queueConsumer.consume({
    queue: 'finance.transaction.process',
    onMessage: async (message: any) => {
      console.log('message', message);

      // if(!message.content) return;

      // const content = message.toString();
      // const parsed = JSON.parse(content);

      const { pattern, data } = message;

      if (pattern === 'SINGLE_TRANSACTION_CREATED') {
        const { value, pixKey, pixKeyType } = data;

        console.log('Processando transação PIX:');

        const asaasTransferClient = makeAsaasTransferClient();

        const dto = new CreatePixTransferRequestDto(
          value,
          pixKey,
          PixAddressKeyType.CPF,
          null,
          null,
          randomUUID().toString(),
        );

        console.log('DTO:', dto);

        const transfer = await asaasTransferClient.createTransfer(dto);
      }
    },
  });
}

bootstrap();
