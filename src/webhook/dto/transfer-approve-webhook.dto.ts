import { TransferDto } from './transfer.dto';

export class TransferApproveWebhookDto {
  type: string;
  transfer: TransferDto;
}
