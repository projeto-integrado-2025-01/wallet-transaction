import { Controller, Post, Body, Headers, HttpCode } from '@nestjs/common';
import { TransferWebhookDto } from './dto/transfer-webhook.dto';

@Controller('webhook')
export class WebhookController {
  @Post('transfer')
  @HttpCode(204) // evita retorno de 201
  handleTransferWebhook(
    @Body() body: TransferWebhookDto,
  ) {
    // Aqui você pode validar, persistir, logar, etc.
    console.log('Webhook recebido:', body);
    // Por enquanto só loga
  }
}
