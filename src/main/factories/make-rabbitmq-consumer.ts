import { QueueConsumer } from 'src/infrastructure/queue/queue-consumer';
import { RabbitMqConsumer } from 'src/infrastructure/queue/rabbitmq-queue-consumer';

export const makeQueueConsumer = (): QueueConsumer => {
    const url = process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672';
  
    return new RabbitMqConsumer(url);
  };
