import { HttpPostClient } from "src/infrastructure/http/http-post-client";
import { CreatePixTransferRequestDto } from "./dto/create-pix-transfer-request.dto";
import { CreatePixTransferResponseDto } from "./dto/create-pix-transfer-response.dto";

export class AsaasTransferClient {
  private readonly baseUrl = 'https://api-sandbox.asaas.com/v3';

  constructor(
    private readonly httpPostClient: HttpPostClient,
    private readonly apiKey: string
  ) {}

  async createTransfer(params: CreatePixTransferRequestDto): Promise<CreatePixTransferResponseDto> {
    const url = `${this.baseUrl}/transfers`;

    const headers = {
      access_token: this.apiKey,
    };

    const response = await this.httpPostClient.post<CreatePixTransferResponseDto>({
      url,
      body: params,
      headers,
    });

    return response;
  }
}
