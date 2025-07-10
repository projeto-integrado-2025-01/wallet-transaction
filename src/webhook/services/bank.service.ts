import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from '../entities/bank.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private bankRepo: Repository<Bank>,
  ) {}

  async create(bank: Partial<Bank>): Promise<Bank> {
    return this.bankRepo.save(this.bankRepo.create(bank));
  }
}
