import { HttpPostClient } from "src/infrastructure/http/http-post-client";
import { CreatePixTransferRequestDto } from "./dto/create-pix-transfer-request.dto";

export class AsaasTransferClient {
  private readonly baseUrl = 'https://www.asaas.com/api/v3';

  constructor(
    private readonly httpPostClient: HttpPostClient,
    private readonly apiKey: string
  ) {}

  async createTransfer(params: CreatePixTransferRequestDto): Promise<any> {
    const url = `${this.baseUrl}/transfers`;

    const headers = {
      access_token: this.apiKey,
    };

    const response = await this.httpPostClient.post<any>({
      url,
      body: params,
      headers,
    });

    return response;
  }
}
