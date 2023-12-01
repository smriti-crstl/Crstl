import { ChartMetadata } from "../../../domain/v1/Chart";

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
  details?: any;
}

export interface TransactionsModel {
  data: TransactionDetail[];
  metadata: ChartMetadata;
}

export interface TransactionByMerchant {
  estimatedTotalSpent: string;
  merchantName: string;
  category: string;
  accountName?: string;
  accountType?: string;
  accountSubtype?: string;
}

export interface TransactionByMerchantModel {
  data: TransactionByMerchant[];
  metadata: ChartMetadata;
}

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

export interface ValidateUpdateTransactionInput {
  key?: string;
  message?: string;
}
