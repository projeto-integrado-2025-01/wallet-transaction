import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from '../entities/transfer.entity';
import { Repository } from 'typeorm';
import { SingleTransaction } from '../entities/single-transaction.entity';
import { EventTransaction } from '../entities/transaction-event.entity';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private transferRepo: Repository<Transfer>,

    @InjectRepository(EventTransaction)
    private readonly eventTransactionRepo: Repository<EventTransaction>,
  ) {}

  async create(transferData: Partial<Transfer>): Promise<Transfer> {
    const existingTransfer = await this.transferRepo.findOne({
      where: { transferId: transferData.transferId },
    });

    if (existingTransfer) {
      this.transferRepo.merge(existingTransfer, transferData);
      return this.transferRepo.save(existingTransfer);
    }

    const newTransfer = this.transferRepo.create(transferData);
    return this.transferRepo.save(newTransfer);
  }

  async findByEndToEndId(endToEndId: string): Promise<EventTransaction | null> {
    const transfer = await this.eventTransactionRepo.findOne({
      where: { endToEndId },
    });

    return transfer;
  }
}
