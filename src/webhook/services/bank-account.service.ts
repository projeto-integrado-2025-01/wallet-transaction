import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from '../entities/bank-account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepo: Repository<BankAccount>,
  ) {}

  async create(account: Partial<BankAccount>): Promise<BankAccount> {
    return this.bankAccountRepo.save(this.bankAccountRepo.create(account));
  }
}
