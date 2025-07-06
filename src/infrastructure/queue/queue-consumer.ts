import { QueueConsumeRequest } from './dto/queue-consumer-request.dto';

export interface QueueConsumer {
  consume(params: QueueConsumeRequest): Promise<void>;
}
