import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Bank } from './bank.entity';

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accountName: string;

  @Column()
  ownerName: string;

  @Column()
  cpfCnpj: string;

  @Column()
  agency: string;

  @Column()
  agencyDigit: string;

  @Column()
  account: string;

  @Column()
  accountDigit: string;

  @Column({ nullable: true })
  pixAddressKey: string;

  @OneToOne(() => Bank, { cascade: true, eager: true })
  @JoinColumn()
  bank: Bank;
}
