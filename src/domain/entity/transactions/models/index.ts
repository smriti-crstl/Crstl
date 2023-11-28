import { ChartMetadata } from "@crstl/api/src/domain/v1/Chart";

export interface UpdateTransactionModel {
  id?: string;
  transactionAmount?: string;
  merchantName?: string;
  categoryId?: string;
  dateOfTransaction?: string;
  accountName?: string;
  accountType?: string;
  accountSubtype?: string;
  currency?: string;
}

export interface TransactionCategoryModel {
  data: TransactionCategory[];
}

export interface TransactionCategory {
  value: string;
  label: string;
  children?: TransactionCategory[];
}

export interface TransactionCategoryResponse {
  code: string;
  data: TransactionCategoryModel;
}

export interface TransactionDetail {
  id: string;
  transactionAmount: string;
  merchantName: string;
  category: string;
  dateOfTransaction: string;
  accountName?: string;
  accountType?: string;
  accountSubtype?: string;
  currency?: string;
  accountId: string;
}

export type TransactionData = {
  data: TransactionDetail[];
  metadata: ChartMetadata;
};

export interface AccountData {
  accountId: string;
  name: string;
  officialName: string;
  institutionName: string;
  accountMask: string;
}
