import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IRequestOptions, IResponse } from '../../data/types/api.types.js';

export class AxiosApiClient {
  private response: AxiosResponse | undefined;

  async send<T>(options: IRequestOptions): Promise<IResponse<T>> {
    try {
      this.response = await axios(options as AxiosRequestConfig);
      return this.transformResponse();
    } catch (err: unknown) {
      if (!isAxiosError(err)) throw err;
      console.log('Error', err.message);
      console.log('Request URL:', options.method, options.url);
      this.response = err.response;
      return this.transformResponse();
    }
  }

  private transformResponse() {
    return {
      status: this.response!.status,
      body: this.response && this.response.data ? this.response.data : null
    };
  }
}

function isAxiosError(err: unknown): err is AxiosError {
  return err instanceof AxiosError;
}
