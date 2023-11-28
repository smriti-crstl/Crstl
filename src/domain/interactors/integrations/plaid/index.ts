import { AxiosError } from "axios";
import {
  PlaidAccessTokenReq,
  PlaidAccessTokenRes,
  PlaidIntegrationModelRes,
  PlaidLinkTokenRes,
  PlaidReAuthReq,
  PlaidUpdateAccessTokenReq,
} from "domain/entity/integrations/models";
import {
  getPlaidIntegrationsList,
  postPlaidAccessToken,
  postPlaidLinkToken,
  postPlaidReAuth,
  postPlaidUpdateAccessToken,
} from "domain/entity/integrations/repositories";
import {
  QueryObserverResult,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";

export const PLAID_QUERY_KEYS = {
  PLAID_INTEGRATIONS_LIST: "PLAID_INTEGRATIONS_LIST",
};

const usePostPlaidLinkQuery = (
  options?: UseMutationOptions<PlaidLinkTokenRes, AxiosError, void>
): UseMutationResult<PlaidLinkTokenRes, AxiosError, void> => {
  return useMutation<PlaidLinkTokenRes, AxiosError, void>(
    postPlaidLinkToken,
    options
  );
};

const usePostPlaidAccessTokenQuery = (): UseMutationResult<
  PlaidAccessTokenRes,
  AxiosError,
  PlaidAccessTokenReq
> => {
  const queryClient = useQueryClient();

  return useMutation<PlaidAccessTokenRes, AxiosError, PlaidAccessTokenReq>(
    postPlaidAccessToken,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PLAID_QUERY_KEYS.PLAID_INTEGRATIONS_LIST);
      },
    }
  );
};

const usePlaidIntegrationsListQuery = <TData = PlaidIntegrationModelRes[]>(
  options?: UseQueryOptions<PlaidIntegrationModelRes[], AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    PLAID_QUERY_KEYS.PLAID_INTEGRATIONS_LIST,
    getPlaidIntegrationsList,
    options
  );
};

const usePostPlaidUpdateAccessTokenQuery = (): UseMutationResult<
  PlaidAccessTokenRes,
  AxiosError,
  PlaidUpdateAccessTokenReq
> => {
  // const queryClient = useQueryClient();
  return useMutation<
    PlaidAccessTokenRes,
    AxiosError,
    PlaidUpdateAccessTokenReq
  >(postPlaidUpdateAccessToken, {
    onSuccess: () => {
      // queryClient.invalidateQueries(PLAID_QUERY_KEYS.PLAID_INTEGRATIONS_LIST);
    },
  });
};

const usePostPlaidReAuthQuery = (): UseMutationResult<
  any,
  AxiosError,
  PlaidReAuthReq
> => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError, PlaidReAuthReq>(postPlaidReAuth, {
    onSuccess: () => {
      queryClient.invalidateQueries(PLAID_QUERY_KEYS.PLAID_INTEGRATIONS_LIST);
    },
  });
};

export {
  usePostPlaidLinkQuery,
  usePostPlaidAccessTokenQuery,
  usePlaidIntegrationsListQuery,
  usePostPlaidUpdateAccessTokenQuery,
  usePostPlaidReAuthQuery,
};
