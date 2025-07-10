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

  @Column({ nullable: true })
  accountName: string;

  @Column({ nullable: true })
  ownerName: string;

  @Column({ nullable: true })
  cpfCnpj: string;

  @Column({ nullable: true })
  agency: string;

  @Column({ nullable: true })
  agencyDigit: string;

  @Column({ nullable: true })
  account: string;

  @Column({ nullable: true })
  accountDigit: string;

  @Column({ nullable: true })
  pixAddressKey: string;

  @OneToOne(() => Bank, { cascade: true, eager: true })
  @JoinColumn()
  bank: Bank;
}
