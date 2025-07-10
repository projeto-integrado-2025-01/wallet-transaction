export enum PixAddressKeyType {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  EVP = 'EVP',
}

export function pixAddressKeyTypeFromString(value: string): PixAddressKeyType {
  switch (value.toUpperCase()) {
    case 'CPF':
      return PixAddressKeyType.CPF;
    case 'CNPJ':
      return PixAddressKeyType.CNPJ;
    case 'EMAIL':
      return PixAddressKeyType.EMAIL;
    case 'PHONE':
      return PixAddressKeyType.PHONE;
    case 'EVP':
      return PixAddressKeyType.EVP;
    default:
      throw new Error(`Unknown PixAddressKeyType: ${value}`);
  }
}
