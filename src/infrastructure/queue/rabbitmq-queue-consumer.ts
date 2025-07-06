import * as amqp from 'amqplib';

import { QueueConsumer } from './queue-consumer';
import { QueueConsumeRequest } from './dto/queue-consumer-request.dto';

export class RabbitMqConsumer implements QueueConsumer {
  constructor(private readonly connectionUrl: string) {}

  async consume(params: QueueConsumeRequest): Promise<void> {
    const connection = await amqp.connect(this.connectionUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(params.queue, { durable: true });

    channel.consume(
      params.queue,
      async (msg) => {
        if (msg) {
          const content = JSON.parse(msg.content.toString());
          await params.onMessage(content);
          channel.ack(msg);
        }
      },
      { noAck: false },
    );
  }
}
