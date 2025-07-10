import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BankAccount } from './bank-account.entity';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  transferId: string;

  @Column()
  object: string;

  @Column()
  dateCreated: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  effectiveDate: string;

  @Column({ nullable: true })
  endToEndIdentifier: string;

  @Column()
  type: string;

  @Column()
  value: number;

  @Column()
  netValue: number;

  @Column()
  transferFee: number;

  @Column()
  scheduleDate: string;

  @Column()
  authorized: boolean;

  @Column({ nullable: true })
  failReason: string;

  @Column({ nullable: true })
  transactionReceiptUrl: string;

  @Column({ nullable: true })
  operationType: string;

  @Column({ nullable: true })
  description: string;

  @OneToOne(() => BankAccount, { cascade: true, eager: true })
  @JoinColumn()
  bankAccount: BankAccount;

  @Column()
  externalReference: string
}
