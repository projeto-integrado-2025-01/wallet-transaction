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
    const existing = await this.bankAccountRepo.findOne({
      where: {
        cpfCnpj: account.cpfCnpj,
        agency: account.agency,
        agencyDigit: account.agencyDigit,
        account: account.account,
        accountDigit: account.accountDigit,
      },
    });
  
    if (existing) {
      console.log("Caiu aqui")
      return existing;
    }

    console.log("Caiu aquasdasdasi")
  
    const newAccount = this.bankAccountRepo.create(account);
    return this.bankAccountRepo.save(newAccount);  }
}
