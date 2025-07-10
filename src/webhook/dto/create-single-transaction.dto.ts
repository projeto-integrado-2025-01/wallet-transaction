// src/transactions/dto/create-single-transaction.dto.ts
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateSingleTransactionDto {

  @IsString()
  endToEndId: string;

  @IsNumber()
  value: number;

  @IsString()
  pixKey: string;

  @IsString()
  pixKeyType: string;

  @IsOptional()
  scheduleDate?: Date;
}
