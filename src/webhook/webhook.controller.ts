import { Controller, Post, Body, Headers, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { TransferWebhookDto } from './dto/transfer-webhook.dto';
import { WebhookService } from './webhook.service';
import { TransferApproveWebhookDto } from './dto/transfer-approve-webhook.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    @Inject("TRANSACTION_UPDATED_SERVICE")
    private readonly transactionQueue: ClientProxy,
  ) {}

  @Post('transfer')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handleTransferWebhook(
    @Body() body: TransferWebhookDto,
  ): Promise<void> {
    const webhookSaved = await this.webhookService.saveWebhook(body);

    await this.transactionQueue.connect();
    
    this.transactionQueue.emit('TRANSACTION_STATUS_UPDATED', {
      endToEndId: webhookSaved.endToEndIdentifier,
      status: webhookSaved.status,
    });
  }

  @Post('approve-transfer')
  @HttpCode(HttpStatus.OK)
  async handleApproveTransferWebhook(
    @Body() body: TransferApproveWebhookDto,
  ): Promise<{ status: 'APPROVED' } | { status: 'REFUSED'; refuseReason: string }> {
    try {
      const approved = await this.webhookService.approveWebhook(body.transfer);
  
      if (approved) {
        return { status: 'APPROVED' };
      } else {
        return {
          status: 'REFUSED',
          refuseReason: 'Transferência não encontrada no nosso banco',
        };
      }
    } catch (error) {
      console.error('Error handling approve transfer webhook:', error);
      return {
        status: 'REFUSED',
        refuseReason: error.message || 'Erro interno no servidor',
      };
    }
  }
}
