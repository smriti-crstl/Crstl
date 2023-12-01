import { AxiosResponse } from "axios";
import { API_V1 } from "domain/network";
import { isArray, last } from "lodash";
import { QueryFunctionContext } from "react-query";

import { TransactionDetail } from "models/v1/TransactionByMerchant";

import {
  AccountData,
  TransactionCategoryResponse,
  TransactionData,
  UpdateTransactionModel,
} from "../models";

const TRANSACTION_ENDPOINTS = {
  GET_ALL_TRANSACTIONS: "/finance/transactions",
  UPDATE_TRANSACTION: "/finance/transaction",
  GET_TRANSACTION_CATEGORIES: "/finance/transaction/category",
  GET_ALL_ACCOUNTS: "/finance/accounts",
};

const getTransactions = async ({
  queryKey: [_id, startDate, endDate],
}: QueryFunctionContext<string[]>): Promise<TransactionData> => {
  return await API_V1.get(TRANSACTION_ENDPOINTS.GET_ALL_TRANSACTIONS, {
    params: { startDate, endDate },
  }).then((res: AxiosResponse<TransactionData>) => {
    return res.data;
  });
};

const putTransactionDetails = async (data: TransactionDetail) => {
  const { category, ...rest } = data;

  const payload: UpdateTransactionModel = {
    ...rest,
  };

  if (isArray(category)) {
    const categoryId = last(category);
    payload.categoryId = categoryId;
  }

  return API_V1.put(TRANSACTION_ENDPOINTS.UPDATE_TRANSACTION, payload).then(
    (res) => res.data
  );
};

const getTransactionCategories = async () => {
  return API_V1.get<TransactionCategoryResponse>(
    TRANSACTION_ENDPOINTS.GET_TRANSACTION_CATEGORIES
  ).then((res) => res.data);
};

const getAllAccounts = async () => {
  return API_V1.get<AccountData[]>(TRANSACTION_ENDPOINTS.GET_ALL_ACCOUNTS).then(
    (res) => res.data
  );
};

export {
  TRANSACTION_ENDPOINTS,
  getTransactions,
  putTransactionDetails,
  getTransactionCategories,
  getAllAccounts,
};

