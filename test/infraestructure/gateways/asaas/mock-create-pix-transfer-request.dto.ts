import { CreatePixTransferRequestDto } from "src/infrastructure/gateways/asaas/dto/create-pix-transfer-request.dto";
import { PixAddressKeyType } from "src/infrastructure/gateways/asaas/dto/pix-address-key-type";

export const mockCreatePixTransferRequestDto = (): CreatePixTransferRequestDto => {
  return new CreatePixTransferRequestDto(
    1000.0,
    '09493012301',
    PixAddressKeyType.CPF,
    'Churrasco pago via Pix com chave',
    null
  );
};
