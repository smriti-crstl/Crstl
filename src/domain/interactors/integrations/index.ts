import { RampInitiateIntegrationResponseModel } from "models/v1/RampIntegrationModel";
import { AxiosError } from "axios";
import {
  AMZAuthorizationSearchParams,
  AMZCreateIntegrationModelResponse,
  AMZCreateIntegrationReq,
  AMZInitiateIntegrationResponse,
  GenericQueryStringReq,
  GetBusinessNameRes,
  GetIntegrationSourcesRes,
  GetRailzIntegrationRes,
  InitiateShopifyReq,
  InitiateShopifyRes,
  IntegrateShopifyRes,
  PostIntegrationsReq,
  PostIntegrationsRes,
  PostOAuthIntegrationsClient,
  PostOAuthIntegrationsReq,
  PostPurchaseOrderImportRes,
  PostRedirectionUrlQueryParametersReq,
  QBOCreateIntegrationModelResponse,
  QBOCreateIntegrationReq,
  QBOInitiateIntegrationResponse,
  SlackInitResponse,
  SlackRecipientData,
  SlackChannelItemModel,
  ReAuthIntegrationListModel,
  RampIntegrationSearchParams,
  IntegrationStatusModelRes,
} from "domain/entity/integrations/models";
import {
  createAMZIntegration,
  createQBOIntegration,
  createSlackIntegration,
  getAllIntegrations,
  getBusinessName,
  getIntegrationSources,
  getRailzIntegrations,
  getSlackRecipients,
  initateSlackIntegration,
  initiateAMZIntegration,
  initiateQBOIntegration,
  postInitiateIntegration,
  postIntegrations,
  postOAuthIntegrationsClient,
  postPurchaseOrderImport,
  postRedirectionUrlQueryParameters,
  updateRailzIntegrations,
  updateSlackRecipient,
  getSlackChannelList,
  getIntegrationStatus,
  getReAuthList,
  initiateRampIntegration,
  createRampIntegration,
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
import {
  GenericApiResponse,
  SlackRecipientRequest,
} from "../../../../../api/src/apis/models/Integration";

const INTEGRATION_QUERY_KEYS = {
  GET_ALL_INTEGRATIONS: "GET_ALL_INTEGRATIONS",
  INTEGRATION_SOURCES: "INTEGRATION_SOURCES",
  GET_BUSINESS_NAME: "GET_BUSINESS_NAME",
  GET_RAILZ_INTEGRATIONS: "GET_RAILZ_INTEGRATIONS",
  UPDATE_RAILZ_INTEGRATIONS: "UPDATE_RAILZ_INTEGRATIONS",
  GET_SLACK_INTEGRATIONS: "GET_SLACK_INTEGRATIONS",
  SLACK_RECIPIENTS: "SLACK_RECIPIENTS",
  SLACK_CHANNEL_LIST: "SLACK_CHANNEL_LIST",
  GET_INTEGRATION_STATUS: "GET_INTEGRATION_STATUS",
  GET_RE_AUTH_LIST: "GET_RE_AUTH_LIST",
};

const useIntegrationSourcesQuery = <TData = GetIntegrationSourcesRes[]>(
  options?: UseQueryOptions<GetIntegrationSourcesRes[], AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    INTEGRATION_QUERY_KEYS.INTEGRATION_SOURCES,
    getIntegrationSources,
    options
  );
};

const useGetAllIntegrationsQuery = <TData = GetIntegrationSourcesRes[]>(
  ownerId: string,
  options?: UseQueryOptions<GetIntegrationSourcesRes[], AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS, ownerId],
    getAllIntegrations,
    options
  );
};

const useGetBusinessNameQuery = <
  TData = GetBusinessNameRes
>(): QueryObserverResult<TData, AxiosError> => {
  return useQuery(INTEGRATION_QUERY_KEYS.GET_BUSINESS_NAME, getBusinessName);
};

const useGetRailzIntegrationQuery = <
  TData = GetRailzIntegrationRes
>(): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    INTEGRATION_QUERY_KEYS.GET_RAILZ_INTEGRATIONS,
    getRailzIntegrations
  );
};

const useInitiateSlackIntegration = (): UseMutationResult<
  SlackInitResponse,
  AxiosError,
  null
> => {
  const queryClient = useQueryClient();

  return useMutation<SlackInitResponse, AxiosError, null>(
    initateSlackIntegration,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          INTEGRATION_QUERY_KEYS.GET_SLACK_INTEGRATIONS
        );
      },
    }
  );
};

const useCreateSlackIntegration = (
  _queryString: string
): UseMutationResult<GenericApiResponse, AxiosError, GenericQueryStringReq> => {
  const queryClient = useQueryClient();

  return useMutation<GenericApiResponse, AxiosError, GenericQueryStringReq>(
    createSlackIntegration,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          INTEGRATION_QUERY_KEYS.GET_SLACK_INTEGRATIONS
        );
      },
    }
  );
};

const useGetSlackRecipient = <
  TData = SlackRecipientData[]
>(): QueryObserverResult<TData, AxiosError> => {
  return useQuery(INTEGRATION_QUERY_KEYS.SLACK_RECIPIENTS, getSlackRecipients);
};

const useUpdateSlackRecipient = (
  _recipient: string
): UseMutationResult<GenericApiResponse, AxiosError, SlackRecipientRequest> => {
  const queryClient = useQueryClient();

  return useMutation<GenericApiResponse, AxiosError, SlackRecipientRequest>(
    updateSlackRecipient,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(INTEGRATION_QUERY_KEYS.SLACK_RECIPIENTS);
      },
    }
  );
};

const useGetSlackChannelList = <
  TData = SlackChannelItemModel[]
>(): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    INTEGRATION_QUERY_KEYS.SLACK_CHANNEL_LIST,
    getSlackChannelList
  );
};

const useUpdateRailzIntegrationQuery = (): UseMutationResult<
  GenericApiResponse,
  AxiosError,
  null
> => {
  const queryClient = useQueryClient();

  return useMutation<GenericApiResponse, AxiosError, null>(
    updateRailzIntegrations,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          INTEGRATION_QUERY_KEYS.GET_RAILZ_INTEGRATIONS
        );
      },
    }
  );
};

const usePostOAuthIntegrationsClientQuery = (): UseMutationResult<
  PostOAuthIntegrationsClient,
  AxiosError,
  PostOAuthIntegrationsReq
> => {
  return useMutation<
    PostOAuthIntegrationsClient,
    AxiosError,
    PostOAuthIntegrationsReq
  >(postOAuthIntegrationsClient);
};

const usePostIntegrations = (
  organizationId: string
): UseMutationResult<PostIntegrationsRes, AxiosError, PostIntegrationsReq> => {
  const queryClient = useQueryClient();
  return useMutation<
    PostIntegrationsRes,
    AxiosError,
    PostIntegrationsReq,
    GetIntegrationSourcesRes[]
  >(postIntegrations, {
    onMutate: async (payload: {
      integrationSourceId: string;
      props: unknown;
    }) => {
      await queryClient.cancelQueries([
        INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS,
        organizationId,
      ]);
      const previousValue:
        | GetIntegrationSourcesRes[]
        | undefined = queryClient.getQueryData([
        INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS,
        organizationId,
      ]);
      // Optimistically update to the new value
      if (previousValue) {
        queryClient.setQueryData(
          [INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS, organizationId],
          (old: GetIntegrationSourcesRes[] | undefined) =>
            old
              ? old.map((item) => {
                  if (item.id === payload.integrationSourceId) {
                    return {
                      ...item,
                      id: payload.integrationSourceId,
                      props: payload.props,
                      isConnected: true,
                    };
                  } else {
                    return item;
                  }
                })
              : []
        );
      }

      return previousValue || [];
    },
    //If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _variables, context) => {
      if (context) {
        queryClient.setQueryData<GetIntegrationSourcesRes[]>(
          [INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS, organizationId],
          context
        );
      }
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries(
    //     INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS
    //   );
    // },
  });
};

const usePurchaseOrderImportQuery = (): UseMutationResult<
  Record<string, unknown>,
  AxiosError,
  void
> => {
  return useMutation<PostPurchaseOrderImportRes, AxiosError>(
    postPurchaseOrderImport
  );
};

// new

const useInitiateIntegrationQuery = (
  options?: UseMutationOptions<
    InitiateShopifyRes,
    AxiosError,
    InitiateShopifyReq
  >
): UseMutationResult<InitiateShopifyRes, AxiosError, InitiateShopifyReq> => {
  return useMutation<InitiateShopifyRes, AxiosError, InitiateShopifyReq>(
    postInitiateIntegration,
    options
  );
};

const usePostRedirectionUrlQueryParametersQuery = (
  organizationId: string
): UseMutationResult<
  IntegrateShopifyRes,
  AxiosError,
  PostRedirectionUrlQueryParametersReq
> => {
  const queryClient = useQueryClient();
  return useMutation<
    IntegrateShopifyRes,
    AxiosError,
    PostRedirectionUrlQueryParametersReq,
    GetIntegrationSourcesRes[]
  >(postRedirectionUrlQueryParameters, {
    onMutate: async ({ payload: { integrationSourceId } }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries([
        INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS,
        organizationId,
      ]);

      // Snapshot the previous value
      const previousIntegrationsList = queryClient.getQueryData<
        GetIntegrationSourcesRes[]
      >([INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS, organizationId]);

      // Optimistically update to the new value
      if (previousIntegrationsList) {
        queryClient.setQueryData<GetIntegrationSourcesRes[]>(
          [INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS, organizationId],
          previousIntegrationsList.map((item) => {
            if (item.id === integrationSourceId) {
              return {
                ...item,
                isConnected: true,
                // Add the name and timestamp data here
              };
            } else {
              return item;
            }
          })
        );
      }

      return previousIntegrationsList || [];
    },
    // onSuccess: () => {},
    onError: (_err, _variables, context) => {
      if (context) {
        queryClient.setQueryData<GetIntegrationSourcesRes[]>(
          [INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS, organizationId],
          context
        );
      }
    },
  });
};

// For Ramp
const useInitiateRampIntegrationQuery = (
  options?: UseMutationOptions<RampInitiateIntegrationResponseModel, AxiosError>
) => {
  return useMutation(initiateRampIntegration, options);
};

type RampIntegrationMutationOptions = UseMutationOptions<
  boolean,
  AxiosError,
  RampIntegrationSearchParams
>;

const useCreateRampIntegrationQuery = (organizationId: string) => {
  const queryClient = useQueryClient();

  const options: RampIntegrationMutationOptions = {
    onMutate: async (data) => {
      // // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      // await queryClient.cancelQueries([
      //   INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS,
      //   organizationId,
      // ]);
      // // Snapshot the previous value
      // const previousIntegrationsList = queryClient.getQueryData<
      //   GetIntegrationSourcesRes[]
      // >([INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS, organizationId]);
      // // Optimistically update to the new value
      // if (previousIntegrationsList) {
      //   queryClient.setQueryData<GetIntegrationSourcesRes[]>(
      //     [INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS, organizationId],
      //     previousIntegrationsList.map((item) => {
      //       if (item.id === integrationSourceId) {
      //         return {
      //           ...item,
      //           isConnected: true,
      //           // Add the name and timestamp data here
      //         };
      //       } else {
      //         return item;
      //       }
      //     })
      //   );
      // }
      // return previousIntegrationsList || [];
    },
  };
  return useMutation(createRampIntegration, options);
};

// For Quickbooks Online
const useInitiateQBOIntegrationQuery = (
  options?: UseMutationOptions<QBOInitiateIntegrationResponse, AxiosError, void>
): UseMutationResult<QBOInitiateIntegrationResponse, AxiosError, void> => {
  return useMutation<QBOInitiateIntegrationResponse, AxiosError>(
    initiateQBOIntegration,
    options
  );
};

const useCreateQBOIntegrationQuery = (
  organizationId: string
): UseMutationResult<
  QBOCreateIntegrationModelResponse,
  AxiosError,
  QBOCreateIntegrationReq
> => {
  const queryClient = useQueryClient();
  return useMutation<
    QBOCreateIntegrationModelResponse,
    AxiosError,
    QBOCreateIntegrationReq,
    GetIntegrationSourcesRes[]
  >(createQBOIntegration, {
    onMutate: async ({ integrationSourceId }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries([
        INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS,
        organizationId,
      ]);

      // Snapshot the previous value
      const previousIntegrationsList = queryClient.getQueryData<
        GetIntegrationSourcesRes[]
      >([INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS, organizationId]);

      // Optimistically update to the new value
      if (previousIntegrationsList) {
        queryClient.setQueryData<GetIntegrationSourcesRes[]>(
          [INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS, organizationId],
          previousIntegrationsList.map((item) => {
            if (item.id === integrationSourceId) {
              return {
                ...item,
                isConnected: true,
                // Add the name and timestamp data here
              };
            } else {
              return item;
            }
          })
        );
      }

      return previousIntegrationsList || [];
    },
    onError: (_err, _variables, context) => {
      if (context) {
        queryClient.setQueryData<GetIntegrationSourcesRes[]>(
          [INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS, organizationId],
          context
        );
      }
    },
  });
};

// For Amazon Integration

const useInitiateAmazonIntegrationQuery = (
  options?: UseMutationOptions<
    AMZInitiateIntegrationResponse,
    AxiosError,
    AMZAuthorizationSearchParams
  >
): UseMutationResult<
  AMZInitiateIntegrationResponse,
  AxiosError,
  AMZAuthorizationSearchParams
> => {
  return useMutation<
    AMZInitiateIntegrationResponse,
    AxiosError,
    AMZAuthorizationSearchParams
  >(initiateAMZIntegration, options);
};
const useCreateAMZIntegrationQuery = (): UseMutationResult<
  AMZCreateIntegrationModelResponse,
  AxiosError,
  AMZCreateIntegrationReq
> => {
  const queryClient = useQueryClient();
  return useMutation<
    AMZCreateIntegrationModelResponse,
    AxiosError,
    AMZCreateIntegrationReq,
    GetIntegrationSourcesRes[]
  >(createAMZIntegration, {
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries([
        INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS,
      ]);

      // Snapshot the previous value
      const previousIntegrationsList = queryClient.getQueryData<
        GetIntegrationSourcesRes[]
      >([INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS]);

      // Optimistically update to the new value
      // if (previousIntegrationsList) {
      //   queryClient.setQueryData<GetIntegrationSourcesRes[]>(
      //     [INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS, organizationId],
      //     previousIntegrationsList.map((item) => {
      //       if (item.id === integrationSourceId) {
      //         return {
      //           ...item,
      //           isConnected: true,
      //           // Add the name and timestamp data here
      //         };
      //       } else {
      //         return item;
      //       }
      //     })
      //   );
      // }

      return previousIntegrationsList || [];
    },
    onError: (_err, _variables, context) => {
      if (context) {
        queryClient.setQueryData<GetIntegrationSourcesRes[]>(
          [INTEGRATION_QUERY_KEYS.GET_ALL_INTEGRATIONS],
          context
        );
      }
    },
  });
};

const useGetIntegrationStatus = () => {
  return useQuery<IntegrationStatusModelRes[], AxiosError>(
    INTEGRATION_QUERY_KEYS.GET_INTEGRATION_STATUS,
    getIntegrationStatus
  );
};

const useGetReAuthList = () => {
  const result = useQuery<ReAuthIntegrationListModel, AxiosError>(
    INTEGRATION_QUERY_KEYS.GET_RE_AUTH_LIST,
    getReAuthList
  );

  const authList = result.data?.integrations ?? [];
  const data = authList.map((item) => item.name);

  return {
    ...result,
    data,
  };
};

export {
  useIntegrationSourcesQuery,
  useGetAllIntegrationsQuery,
  usePostOAuthIntegrationsClientQuery,
  usePostIntegrations,
  usePurchaseOrderImportQuery,
  // new
  useInitiateIntegrationQuery,
  usePostRedirectionUrlQueryParametersQuery,
  // QBO
  useInitiateQBOIntegrationQuery,
  useCreateQBOIntegrationQuery,
  // Amazon
  useInitiateAmazonIntegrationQuery,
  useCreateAMZIntegrationQuery,
  INTEGRATION_QUERY_KEYS,
  // Railz
  useGetBusinessNameQuery,
  useGetRailzIntegrationQuery,
  useUpdateRailzIntegrationQuery,
  //Slack
  useInitiateSlackIntegration,
  useCreateSlackIntegration,
  useGetSlackRecipient,
  useUpdateSlackRecipient,
  useGetSlackChannelList,
  useGetIntegrationStatus,
  useGetReAuthList,
  // Ramp
  useInitiateRampIntegrationQuery,
  useCreateRampIntegrationQuery,
};
