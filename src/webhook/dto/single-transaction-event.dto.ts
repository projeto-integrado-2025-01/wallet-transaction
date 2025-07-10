import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSingleTransactionDto } from './create-single-transaction.dto';

export class SingleTransactionEventDto {
  @IsString()
  pattern: string;

  @ValidateNested()
  @Type(() => CreateSingleTransactionDto)
  data: CreateSingleTransactionDto;
}