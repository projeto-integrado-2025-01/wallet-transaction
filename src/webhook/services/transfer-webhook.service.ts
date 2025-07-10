import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransferWebhook } from '../entities/transfer-webhook.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransferWebhookService {
  constructor(
    @InjectRepository(TransferWebhook)
    private webhookRepo: Repository<TransferWebhook>,
  ) {}

  async create(webhook: Partial<TransferWebhook>): Promise<TransferWebhook> {
    return this.webhookRepo.save(this.webhookRepo.create(webhook));
  }
}
