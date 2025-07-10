import { Controller, Post, Body, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { TransferWebhookDto } from './dto/transfer-webhook.dto';
import { WebhookService } from './webhook.service';
import { TransferDto } from './dto/transfer.dto';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
  ) {}

  @Post('transfer')
  @HttpCode(HttpStatus.NO_CONTENT) // evita retorno de 201
  async handleTransferWebhook(
    @Body() body: TransferWebhookDto,
  ): Promise<void> {
    await this.webhookService.saveWebhook(body);
  }

  @Post('approve-transfer')
  @HttpCode(HttpStatus.OK)
  async handleApproveTransferWebhook(
    @Body() body: TransferDto,
  ): Promise<{ status: 'APPROVED' } | { status: 'REFUSED'; refuseReason: string }> {
    try {
      const approved = await this.webhookService.approveWebhook(body);
  
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
