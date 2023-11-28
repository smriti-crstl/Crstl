import { AxiosResponse } from "axios";
import { ICustomResponse } from "../interfaces";

const transformResponse = (response: AxiosResponse): ICustomResponse =>
  response.data;

export { transformResponse };
