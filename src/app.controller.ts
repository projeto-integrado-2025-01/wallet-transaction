import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AsaasTransferClient } from './infrastructure/gateways/asaas/asaas-transfer-client';
import { makeAsaasTransferClient } from './main/factories/make-asaas-client';
import { mockCreatePixTransferRequestDto } from 'test/infraestructure/gateways/asaas/mock-create-pix-transfer-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const asaasTransferClient = makeAsaasTransferClient();

    const transfer = await asaasTransferClient.createTransfer(
      mockCreatePixTransferRequestDto(),
    );

    return this.appService.getHello();
  }
}
