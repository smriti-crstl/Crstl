import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import {
  removeAuthToken,
  removeRefreshToken,
  tokenManagement,
} from "domain/interactors/auth/service";
import { API_V1, API_V2 } from "domain/network";
import { clearLocalStorage } from "domain/services/localStorage";
import { LOGIN } from "globals/configs";

// TODO: Transform Request to handle null or undefined headers (You can implement this functionality here)
// TODO: Implement deferred error handling for more robust error management

// Flag to track if a token refresh request is in progress
let isRefreshing = false;

// Queue to hold requests that are waiting for token refresh
let refreshSubscribers: ((access: string) => void)[] = [];

const addReqInterceptor = (axiosInstance: AxiosInstance): number =>
  axiosInstance.interceptors.request.use(
    function (config: AxiosRequestConfig) {
      // Do something before sending the request, e.g., adding an authorization header if an access token is available
      const orgId = tokenManagement.getOrg();
      let authToken;
      if (orgId) {
        authToken = tokenManagement.getAuthTokenForOrg();
      } else {
        authToken = tokenManagement.getAuthToken();
      }

      if (authToken) {
        config.headers["Authorization"] = `Bearer ${authToken}`;
      }
      return config;
    },
    function (error: AxiosError) {
      return Promise.reject(error);
    }
  );

const addResInterceptor = (axiosInstance: AxiosInstance): number =>
  axiosInstance.interceptors.response.use(function (response: AxiosResponse) {
    // Return the response as is
    return response;
  }, handleResponseError);

// Function to handle response errors, especially 401 (Unauthorized) errors
function handleResponseError(error: AxiosError) {
  const originalRequest = error.config;
  if (error.response && error.response.status === 401 && error.config) {
    if (!isRefreshing) {
      // Set the flag to indicate that a token refresh request is in progress
      isRefreshing = true;

      // Retrieve the refresh token from storage
      const refreshToken = tokenManagement.getRefreshToken();
      const orgId = tokenManagement.getOrg();
      const params: any = {
        refresh_token: refreshToken,
      };
      if (orgId) {
        params.organization_id = orgId;
      }

      // Send a request to refresh the access token
      return API_V2.post("auth/refresh", params)
        .then((res) => {
          // Update the access token and refresh token in the application state
          const authToken = res?.data?.access_token;
          const refreshToken = res?.data?.refresh_token;
          if (orgId) {
            tokenManagement.setAuthTokenForOrg({ authToken, orgId });
          } else {
            tokenManagement.setAuthToken(authToken);
          }
          tokenManagement.setRefreshToken(refreshToken);

          // Update the authorization header in the original request
          originalRequest.headers["Authorization"] = `Bearer ${authToken}`;

          // Execute any pending requests that were waiting for the token refresh
          refreshSubscribers.forEach((subscriber) => subscriber(authToken));
          refreshSubscribers = [];

          // Retry the original request with the updated token
          return axios(originalRequest);
        })
        .catch((err: AxiosError) => {
          // Handle the token refresh request error by removing tokens and performing any necessary cleanup
          removeAuthToken();
          removeRefreshToken();
          clearLocalStorage();

          // Redirect to the login page
          window.location.pathname = LOGIN;
        })
        .finally(() => {
          // Reset the flag once the token refresh request is complete
          isRefreshing = false;
        });
    } else {
      // If a token refresh request is already in progress, add the original request to the queue
      return new Promise<AxiosResponse>((resolve, reject) => {
        refreshSubscribers.push((access) => {
          originalRequest.headers.authorization = access;

          // Retry the original request after the token refresh is completed
          axios(originalRequest)
            .then((response) => resolve(response))
            .catch((_err) => reject(_err));
        });
      });
    }
  } else {
    // If the response error is not a 401 error, reject the promise
    return Promise.reject(error);
  }
}

export { addReqInterceptor, addResInterceptor };

