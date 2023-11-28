import { AxiosError } from "axios";
import {
  GetContactEmailRes,
  PutContactEmailReq,
  PutContactEmailRes,
} from "domain/entity/alerts-tab/models";
import {
  getContactEmails,
  updateContactEmail,
} from "domain/entity/alerts-tab/repositories";
import {
  QueryObserverResult,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";

const ALERTS_TAB_QUERIES = {
  GET_CONTACT_EMAILS: "GET_CONTACT_EMAILS",
};

export const useGetContactEmailsQuery = <TData = GetContactEmailRes>(
  options?: UseQueryOptions<GetContactEmailRes, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    ALERTS_TAB_QUERIES.GET_CONTACT_EMAILS,
    getContactEmails,
    options
  );
};

export const usePutContactEmailMutation = (
  options?: UseMutationOptions<
    PutContactEmailRes,
    AxiosError,
    PutContactEmailReq
  >
): UseMutationResult<PutContactEmailRes, AxiosError, PutContactEmailReq> => {
  const queryClient = useQueryClient();

  return useMutation<PutContactEmailRes, AxiosError, PutContactEmailReq>(
    updateContactEmail,
    {
      onSettled: () =>
        queryClient.invalidateQueries(ALERTS_TAB_QUERIES.GET_CONTACT_EMAILS),
      ...options,
    }
  );
};

