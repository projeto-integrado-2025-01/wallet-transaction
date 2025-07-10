import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { BankAccount } from './bank-account.entity';
import { TransferWebhook } from './transfer-webhook.entity';

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

  @Column('decimal')
  value: number;

  @Column('decimal')
  netValue: number;

  @Column('decimal')
  transferFee: number;

  @Column({ nullable: true })
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

  @ManyToOne(() => BankAccount, { cascade: true, eager: true })
  @JoinColumn()
  bankAccount: BankAccount;

  @Column()
  externalReference: string

  @OneToMany(() => TransferWebhook, webhook => webhook.transfer)
  webhooks: TransferWebhook[];
}
