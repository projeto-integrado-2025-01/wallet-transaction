import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventTransaction } from './transaction-event.entity';

@Entity()
export class SingleTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pattern: string;

  @OneToOne(() => EventTransaction, { cascade: true, eager: true })
  @JoinColumn()
  eventTransaction: EventTransaction;
}
