import { AxiosResponse } from "axios";

export interface ICustomError {
  statusCode: string | undefined;
  message: Record<string, unknown>;
  errorCode?: string;
}
export interface ICustomResponse extends AxiosResponse {
  [prop: string]: unknown;
}
