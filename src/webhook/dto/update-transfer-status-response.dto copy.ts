// src/transactions/dto/create-single-transaction.dto.ts
import { IsString } from 'class-validator';

export class UpdateTransactionDto {

  @IsString()
  endToEndId: string;

  @IsString()
  status: string;
}