export interface TransactionCategoryModel {
  data: TransactionCategory[];
}

export interface TransactionCategory {
  value: string;
  label: string;
  children?: TransactionCategory[];
}
