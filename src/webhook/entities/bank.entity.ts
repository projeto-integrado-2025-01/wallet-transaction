import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ispb: string;

  @Column()
  code: string;

  @Column()
  name: string;
}
