// main/factories/infra/asaas-transfer-client.factory.ts

import { AsaasTransferClient } from 'src/infrastructure/gateways/asaas/asaas-transfer-client';
import { AxiosHttpClient } from 'src/infrastructure/http/axios-http-client';

export const makeAsaasTransferClient = (): AsaasTransferClient => {
  const httpClient = new AxiosHttpClient();

  return new AsaasTransferClient(httpClient, process.env.ASAAS_API_KEY!);
};
