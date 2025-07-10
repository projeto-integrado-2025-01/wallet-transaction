// src/transactions/dto/create-single-transaction.dto.ts
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { UpdateTransactionDto } from './update-transfer-status-response.dto copy';

export class UpdateTransactionEventResponseDto {

  @IsString()
  pattern: string;

  @ValidateNested()
  @Type(() => UpdateTransactionDto)
  data: UpdateTransactionDto;
}