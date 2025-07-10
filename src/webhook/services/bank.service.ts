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
    const existing = await this.bankRepo.findOne({
      where: {
        ispb: bank.ispb,
        code: bank.code,
      },
    });

    if (existing) {
      return existing;
    }

    const newBank = this.bankRepo.create(bank);
    return this.bankRepo.save(newBank);
  }
}
