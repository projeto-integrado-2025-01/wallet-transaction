import { UpdateTransactionEventResponseDto } from "src/webhook/dto/update-transfer-status-event-response.dto";

export const mockUpdateTransactionEventResponseDto = (): UpdateTransactionEventResponseDto => {
  return {
    pattern: 'TRANSACTION_STATUS_UPDATED',
    data: {
      endToEndId: 'abc123-xyz789',
      status: 'APPROVED',
    },
  };
};
