import { AxiosError } from "axios";
import {
  GetOrgDataRes,
  PutOrgDataReq,
  PutOrgDataRes,
} from "domain/entity/edi-setup/models";
import { getOrgData, putOrgData } from "domain/entity/edi-setup/repositories";
import { setMessage } from "domain/services/notification";
import {
  QueryObserverResult,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";

const EDI_SETUP_QUERY_KEYS = {
  GET_ORG_DATA: "GET_ORG_DATA",
};

interface IOrgDataParams {
  tradingPartner?: string;
  documentType?: string;
  contactPeople?: boolean;
  intakeForm?: boolean;
}

const getOrgDataQueryKey = (params?: IOrgDataParams) => {
  const { tradingPartner, documentType, contactPeople, intakeForm } =
    params ?? {};
  return [
    EDI_SETUP_QUERY_KEYS.GET_ORG_DATA,
    tradingPartner,
    documentType,
    contactPeople,
    intakeForm,
  ];
};

export const useGetOrgDataQuery = <TData = GetOrgDataRes>(
  params?: IOrgDataParams,
  options?: UseQueryOptions<GetOrgDataRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  const queryKey = getOrgDataQueryKey(params);

  return useQuery(queryKey, getOrgData, options);
};

export const usePutOrgDataMutation = (
  params?: IOrgDataParams,
  options?: UseMutationOptions<PutOrgDataRes, AxiosError, PutOrgDataReq>
): UseMutationResult<PutOrgDataRes, AxiosError, PutOrgDataReq> => {
  const queryClient = useQueryClient();
  const queryKey = getOrgDataQueryKey(params);

  const mutation = useMutation<PutOrgDataRes, AxiosError, PutOrgDataReq>(
    putOrgData,
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey, { exact: true }),
      ...options,
    }
  );
  return mutation;
};

export const usePutOrgDataOptimisticMutation = (
  params?: IOrgDataParams
): UseMutationResult<
  PutOrgDataRes,
  AxiosError,
  PutOrgDataReq,
  PutOrgDataReq | undefined
> => {
  const queryKey = getOrgDataQueryKey(params);
  const queryClient = useQueryClient();

  return useMutation<
    PutOrgDataRes,
    AxiosError,
    PutOrgDataReq,
    PutOrgDataReq | undefined
  >(putOrgData, {
    // When mutate is called:
    onMutate: async (payload) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      // ! Note: temp disabling cancel query
      // await queryClient.cancelQueries(queryKey);

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<PutOrgDataReq>(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, { data: payload }); // !! Note the { data: payload }

      // Return a context object with the snapshotted value
      return previousData;
    },
    onSuccess: () => {
      setMessage({
        type: "success",
        content: "Changes Saved",
        duration: 0.5,
      });
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, payload, previousData) => {
      queryClient.setQueryData(queryKey, previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      // ! Note: temp disabling refetch
      // queryClient.invalidateQueries(queryKey);
    },
  });
};

