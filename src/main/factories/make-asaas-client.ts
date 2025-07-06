// main/factories/infra/asaas-transfer-client.factory.ts

import { AsaasTransferClient } from 'src/infrastructure/gateways/asaas/asaas-transfer-client';
import { AxiosHttpClient } from 'src/infrastructure/http/axios-http-client';

export const makeAsaasTransferClient = (): AsaasTransferClient => {
  const httpClient = new AxiosHttpClient();
  const apiKey =
    process.env.ASAAS_API_KEY ||
    '$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjdhMzMwMWIxLWQxNzQtNDY0Ny05NWQzLTAxN2JhZWFhMWIxYzo6JGFhY2hfNjQxYmYyYzItMjA1NC00NzEyLTlmYmYtN2QwYWM4YjM1Nzdm';

  return new AsaasTransferClient(httpClient, apiKey);
};
