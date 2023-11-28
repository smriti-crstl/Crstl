import { currencyUSDFormatter } from "presentation/utils";
import { TRANSACTIONS } from "./Transactions.config";

export const TRANSACTIONS_TABLE_COLUMNS = [
  {
    title: TRANSACTIONS.COLUMN_TITLE.DATE,
    ellipsis: true,
    editable: true,
    dataIndex: TRANSACTIONS.DATA_INDEX.DATE_OF_TRANSACTION,
    onCell: (record: any) => ({
      record,
      editable: true,
      dataIndex: TRANSACTIONS.DATA_INDEX.DATE_OF_TRANSACTION,
      title: TRANSACTIONS.COLUMN_TITLE.DATE,
      handleSave: () => {
        console.log("save");
      },
    }),
    render: (value: string) => {
      const children = value;
      return {
        children,
        props: {
          "data-testid": TRANSACTIONS.DATA_INDEX.DATE_OF_TRANSACTION,
        },
      };
    },
  },
  {
    title: TRANSACTIONS.COLUMN_TITLE.MERCHANT,
    ellipsis: true,
    editable: true,
    dataIndex: TRANSACTIONS.DATA_INDEX.MERCHANT_NAME,
    onCell: (record: any) => ({
      record,
      editable: true,
      dataIndex: TRANSACTIONS.DATA_INDEX.MERCHANT_NAME,
      title: TRANSACTIONS.COLUMN_TITLE.MERCHANT,
      handleSave: () => {
        console.log("save");
      },
    }),
    render: (value: string) => {
      const children = value;
      return {
        children,
        props: {
          "data-testid": TRANSACTIONS.DATA_INDEX.MERCHANT_NAME,
        },
      };
    },
  },
  {
    title: TRANSACTIONS.COLUMN_TITLE.ACCOUNT_NAME,
    ellipsis: true,
    dataIndex: TRANSACTIONS.DATA_INDEX.ACCOUNT_NAME,
    render: (value: string) => {
      const children = value;
      return {
        children,
        props: {
          "data-testid": TRANSACTIONS.DATA_INDEX.ACCOUNT_NAME,
        },
      };
    },
  },
  {
    title: TRANSACTIONS.COLUMN_TITLE.CATEGORY,
    ellipsis: true,
    dataIndex: TRANSACTIONS.DATA_INDEX.CATEGORY,
    render: (value: string) => {
      const children = value;
      return {
        children,
        props: {
          "data-testid": TRANSACTIONS.DATA_INDEX.CATEGORY,
        },
      };
    },
  },
  {
    title: TRANSACTIONS.COLUMN_TITLE.AMOUNT,
    ellipsis: true,
    dataIndex: TRANSACTIONS.DATA_INDEX.AMOUNT,
    render: (value: number) => currencyUSDFormatter(Number(value)),
  },
];

export const getTransactionTableColumns = (handleSave: any) => {
  return [
    {
      title: TRANSACTIONS.COLUMN_TITLE.DATE,
      ellipsis: true,
      editable: true,
      dataIndex: TRANSACTIONS.DATA_INDEX.DATE_OF_TRANSACTION,
      onCell: (record: any) => ({
        record,
        editable: true,
        dataIndex: TRANSACTIONS.DATA_INDEX.DATE_OF_TRANSACTION,
        inputType: "date",
        title: TRANSACTIONS.COLUMN_TITLE.DATE,
        handleSave,
      }),
      render: (value: string) => {
        const children = value;
        return {
          children,
          props: {
            "data-testid": TRANSACTIONS.DATA_INDEX.DATE_OF_TRANSACTION,
          },
        };
      },
    },
    {
      title: TRANSACTIONS.COLUMN_TITLE.MERCHANT,
      ellipsis: true,
      editable: true,
      dataIndex: TRANSACTIONS.DATA_INDEX.MERCHANT_NAME,
      onCell: (record: any) => ({
        record,
        editable: true,
        dataIndex: TRANSACTIONS.DATA_INDEX.MERCHANT_NAME,
        title: TRANSACTIONS.COLUMN_TITLE.MERCHANT,
        handleSave: handleSave,
      }),
      render: (value: string) => {
        const children = value;
        return {
          children,
          props: {
            "data-testid": TRANSACTIONS.DATA_INDEX.MERCHANT_NAME,
          },
        };
      },
    },
    {
      title: TRANSACTIONS.COLUMN_TITLE.ACCOUNT_NAME,
      ellipsis: true,
      dataIndex: TRANSACTIONS.DATA_INDEX.ACCOUNT_NAME,
      render: (value: string) => {
        const children = value;
        return {
          children,
          props: {
            "data-testid": TRANSACTIONS.DATA_INDEX.ACCOUNT_NAME,
          },
        };
      },
    },
    {
      title: TRANSACTIONS.COLUMN_TITLE.CATEGORY,
      ellipsis: true,
      dataIndex: TRANSACTIONS.DATA_INDEX.CATEGORY,
      render: (value: string) => {
        const children = value;
        return {
          children,
          props: {
            "data-testid": TRANSACTIONS.DATA_INDEX.CATEGORY,
          },
        };
      },
    },
    {
      title: TRANSACTIONS.COLUMN_TITLE.AMOUNT,
      ellipsis: true,
      dataIndex: TRANSACTIONS.DATA_INDEX.AMOUNT,
      render: (value: number) => currencyUSDFormatter(Number(value)),
    },
  ];
};
