import { TransactionDetail } from "@crstl/api/src/apis/models/v1/TransactionByMerchant";
import { AxiosError } from "axios";
import {
  AccountData,
  TransactionCategoryResponse,
  TransactionData,
} from "domain/entity/transactions/models";
import {
  getAllAccounts,
  getTransactionCategories,
  getTransactions,
  putTransactionDetails,
} from "domain/entity/transactions/repositories";
import {
  QueryObserverResult,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";

const TRANSACTION_QUERY_KEYS = {
  GET_ALL_TRANSACTIONS: "GET_ALL_TRANSACTIONS",
  GET_TRANSACTION_CATEGORIES: "GET_TRANSACTION_CATEGORIES",
  GET_ALL_ACCOUNTS: "GET_ALL_ACCOUNTS",
};

const useTransactionsQuery = <TData = TransactionData>(
  startDate?: string,
  endDate?: string,
  options?: UseQueryOptions<TransactionData, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> => {
  return useQuery(
    [TRANSACTION_QUERY_KEYS.GET_ALL_TRANSACTIONS, startDate, endDate],
    getTransactions,
    options
  );
};

const useUpdateTransactionData = (
  options?: UseMutationOptions<TransactionData, AxiosError, TransactionDetail>
) => {
  return useMutation(putTransactionDetails, options);
};

const useTransactionCategories = (
  options?: UseQueryOptions<TransactionCategoryResponse, AxiosError>
) => {
  return useQuery(
    [TRANSACTION_QUERY_KEYS.GET_TRANSACTION_CATEGORIES],
    getTransactionCategories,
    options
  );
};

const useGetAllAccountsQuery = (
  options?: UseQueryOptions<AccountData[], AxiosError>
) => {
  return useQuery(
    [TRANSACTION_QUERY_KEYS.GET_ALL_ACCOUNTS],
    getAllAccounts,
    options
  );
};

export {
  useTransactionsQuery,
  useUpdateTransactionData,
  useTransactionCategories,
  useGetAllAccountsQuery,
};
