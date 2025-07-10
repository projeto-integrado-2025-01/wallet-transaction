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

  async create(transfer: Partial<Transfer>): Promise<Transfer> {
    return this.transferRepo.save(this.transferRepo.create(transfer));
  }
}
