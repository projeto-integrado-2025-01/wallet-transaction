import { TransferDto } from './transfer.dto';

export class TransferWebhookDto {
  id: string;
  event: string;
  dateCreated: string;
  transfer: TransferDto;
}
