import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Transfer } from './transfer.entity';

@Entity()
export class TransferWebhook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  webhookId: string;

  @Column()
  event: string;

  @Column()
  dateCreated: string;

  @ManyToOne(() => Transfer, transfer => transfer.webhooks, { eager: true })
  @JoinColumn()
  transfer: Transfer;
}
