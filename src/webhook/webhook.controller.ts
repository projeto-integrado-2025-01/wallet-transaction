import { Controller, Post, Body, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { TransferWebhookDto } from './dto/transfer-webhook.dto';
import { WebhookService } from './webhook.service';

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
}
