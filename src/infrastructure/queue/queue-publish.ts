import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const makeTransactionQueue = () => {
  return ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin@localhost:5672'],
      queue: 'finance.transaction.updated.process',
    },
  });
};