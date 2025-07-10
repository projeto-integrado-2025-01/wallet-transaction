// src/transactions/services/single-transaction.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SingleTransaction } from '../entities/single-transaction.entity';
import { Repository } from 'typeorm';
import { EventTransaction } from '../entities/transaction-event.entity';
import { CreateSingleTransactionDto } from '../dto/create-single-transaction.dto';

@Injectable()
export class SingleTransactionService {
  constructor(
    @InjectRepository(SingleTransaction)
    private readonly singleTransactionRepo: Repository<SingleTransaction>,

    @InjectRepository(EventTransaction)
    private readonly eventTransactionRepo: Repository<EventTransaction>,
  ) {}

  async create(pattern: string, dto: CreateSingleTransactionDto): Promise<SingleTransaction> {
    const event = this.eventTransactionRepo.create(dto);
    const savedEvent = await this.eventTransactionRepo.save(event);

    const singleTransaction = this.singleTransactionRepo.create({
      pattern,
      eventTransaction: savedEvent,
    });

    return this.singleTransactionRepo.save(singleTransaction);
  }
}
