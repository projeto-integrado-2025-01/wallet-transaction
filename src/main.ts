import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { makeQueueConsumer } from './main/factories/make-rabbitmq-consumer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const queueConsumer = makeQueueConsumer();
  await queueConsumer.consume({
    queue: 'finance.transaction.process',
    onMessage: async (message) => {
      console.log('Mensagem recebida:', message);
    }
  });
}

bootstrap();
