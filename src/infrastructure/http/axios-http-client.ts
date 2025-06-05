import axios from 'axios';

import { HttpPostClient } from './http-post-client';
import { HttpPostClientDto } from './dto/http-post-client.dto';

export class AxiosHttpClient implements HttpPostClient {
    async post<T = any>(args: HttpPostClientDto): Promise<T> {
      const result = await axios.post(args.url, args.body, {
        headers: args.headers,
      });
  
      return result.data;
    }
  }
