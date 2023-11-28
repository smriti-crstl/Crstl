import axios, { AxiosInstance } from "axios";
import { serviceDefinitions } from "domain/network/constants/serviceDefinitions";
import Qs from "qs";

import { addReqInterceptor, addResInterceptor } from "../interceptors";
import { getAPIObjectFromInstance } from "./helpers";

const primaryAxiosInstance: AxiosInstance = axios.create({
  baseURL: serviceDefinitions.CORE,
  validateStatus: (status) => status >= 200 && status < 300,
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: "brackets" });
  },
  timeout: 500000,
  timeoutErrorMessage:
    "Request Terminated from network/API due to timeout limit exceeded",
  // TODO: Setup with credentials in backend
  //   withCredentials: true,
  //   xsrfCookieName: "XSRF-TOKEN",
  //   xsrfHeaderName: "X-XSRF-TOKEN",
});

const secondaryAxiosInstance: AxiosInstance = axios.create({
  baseURL: serviceDefinitions.CORE_V2,
  validateStatus: (status) => status >= 200 && status < 300,
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: "brackets" });
  },
  timeout: 500000,
  timeoutErrorMessage:
    "Request Terminated from network/API due to timeout limit exceeded",
});

const secondaryAxiosInstanceWithoutInterceptor: AxiosInstance = axios.create({
  baseURL: serviceDefinitions.CORE_V2,
  validateStatus: (status) => status >= 200 && status < 300,
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: "brackets" });
  },
  timeout: 500000,
  timeoutErrorMessage:
    "Request Terminated from network/API due to timeout limit exceeded",
});

addReqInterceptor(primaryAxiosInstance);
addResInterceptor(primaryAxiosInstance);

// TODO: Add code to handle 401 and 403 errors for secondaryAxiosInstance separately in addResInterceptor code
// * NOTE: currently, V1 and V2 auth and refresh tokens are same, so we're using the same interceptor for both
addReqInterceptor(secondaryAxiosInstance);
addResInterceptor(secondaryAxiosInstance);

export const API_V1 = getAPIObjectFromInstance(primaryAxiosInstance);

export const API_V2 = getAPIObjectFromInstance(secondaryAxiosInstance);

export const API_V2_WITHOUT_INTERCEPTORS = getAPIObjectFromInstance(
  secondaryAxiosInstanceWithoutInterceptor
);

