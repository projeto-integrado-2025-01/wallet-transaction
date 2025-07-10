import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
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

  @OneToOne(() => Transfer, { cascade: true, eager: true })
  @JoinColumn()
  transfer: Transfer;
}
