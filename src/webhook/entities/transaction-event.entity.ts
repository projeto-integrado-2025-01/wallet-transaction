import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EventTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  endToEndId: string;

  @Column('decimal')
  value: number;

  @Column()
  pixKey: string;

  @Column()
  pixKeyType: string;

  @Column({ type: 'timestamp', nullable: true })
  scheduleDate?: Date;
}
