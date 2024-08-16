export interface IRequestOptions {
  baseURL: string;
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: object;
  headers?: Record<string, string>;
}

export interface IResponse<T> {
  status: number;
  body: T;
}

export enum STATUS_CODES {
  OK = 200,
  CREATED = 201,
  DELETED = 204
}
