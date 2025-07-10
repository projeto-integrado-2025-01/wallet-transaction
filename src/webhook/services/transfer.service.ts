import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from '../entities/transfer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private transferRepo: Repository<Transfer>,
  ) {}

  async create(transferData: Partial<Transfer>): Promise<Transfer> {
    const existingTransfer = await this.transferRepo.findOne({
      where: { id: transferData.id },
    });
  
    if (existingTransfer) {
      this.transferRepo.merge(existingTransfer, transferData);
      return this.transferRepo.save(existingTransfer);
    }
  
    const newTransfer = this.transferRepo.create(transferData);
    return this.transferRepo.save(newTransfer);
  }
}
