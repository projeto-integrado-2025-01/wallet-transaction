import { HttpPostClientDto } from './dto/http-post-client.dto';

export interface HttpPostClient {
  post<T = any>(params: HttpPostClientDto): Promise<T>;
}
