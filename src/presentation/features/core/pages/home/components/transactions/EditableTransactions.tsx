import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Popconfirm,
  Form,
  Typography,
  DatePicker,
  Menu,
  Cascader,
  AutoComplete,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { TRANSACTIONS } from "./Transactions.config";
import {
  useTransactionCategories,
  useTransactionsQuery,
  useUpdateTransactionData,
} from "domain/interactors/transactions";
import { TransactionDetail } from "@crstl/app/src/domain/entity/transactions/models";
import moment, { isMoment } from "moment";
import { FluidWidthCard } from "@crstl/components/atoms/card";
import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import { GenericLoading } from "@crstl/components/atoms/loading";
import styled, { CSSObject } from "styled-components";
import {
  DropdownContainer,
  HeaderContainer,
  SelectedItem,
  StyledDropdown,
  StyledHeader,
} from "../../../analytics/components/reports/Finance/Finance.styles";
import { SelectedDateRange } from "../../../analytics/components/common";
import { DataSources } from "presentation/features/common/components/DataSources";
import { setNotification } from "domain/services/notification";
import { currencyUSDFormatter, amplitude } from "presentation/utils";
import { CascaderOptionType, CascaderValueType } from "antd/lib/cascader";
import { isArray, last } from "lodash";
import { TransactionCategory } from "domain/entity/transactions/models";
import { Prompt } from "react-router-dom";
import clsx from "clsx";
import { useDateRange } from "presentation/hooks/contexts";

const StyledTable = styled.div`
  .editing-cell {
    padding: 0;
    position: relative;
  }

  .ant-table-thead > tr > th {
    background: transparent;
    font-weight: 600;
    color: #262626;
    border-bottom: 3px solid #d4dce8;
    position: relative;

    @media (min-width: 1800px) {
      font-size: 18px;
      line-height: 24px;
      padding-bottom: 24px;
    }
  }

  .ant-table-thead > tr > th:first-child {
    padding-left: 42px;
  }

  .ant-table-thead > tr > th:first-child:after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 42px;
    height: 3px;
    background: white;
  }

  .ant-table-thead > tr > th:last-child {
    padding-right: 42px;
  }

  .ant-table-thead > tr > th:last-child:after {
    content: "";
    position: absolute;
    bottom: -3px;
    right: 0;
    width: 42px;
    height: 3px;
    background: white;
  }

  .ant-table-tbody > tr > td {
    border-bottom-color: #d4dce8;
    @media (min-width: 1800px) {
      padding-top: 28px;
      padding-bottom: 28px;
      font-size: 16px;
      line-height: 24px;
    }
  }

  .ant-table-tbody > tr > td:first-child {
    padding-left: 42px;
    font-weight: 500;

    & .editing-form-control-container {
      padding-left: 42px;
    }
  }

  .ant-table-tbody > tr > td:first-child:after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 42px;
    height: 1px;
    background: white;
  }

  .ant-table-tbody > tr > td:last-child {
    padding-right: 42px;

    & .editing-form-control-container {
      padding-right: 42px;
    }
  }

  .ant-table-tbody > tr > td:last-child:after {
    content: "";
    position: absolute;
    bottom: -1px;
    right: 0;
    width: 42px;
    height: 1px;
    background: white;
  }

  .ant-table-tbody > tr.editing-row > td:first-child:after,
  .ant-table-tbody > tr.editing-row > td:last-child:after {
    background-color: #091137;
    bottom: 0;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background-color: #f6f9fd;
  }

  .ant-table-tbody > tr.editing-row > td,
  .ant-table-tbody > tr.editing-row:hover > td {
    background-color: #091137;
    color: white;
  }

  .ant-table-tbody > tr.editing-row .edit-row-action-button {
    color: white;
  }
`;

const EditingCellContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  padding-left: 16px;
  padding-right: 16px;
  top: 50%;
  transform: translateY(-50%);

  .ant-picker,
  .ant-cascader-picker,
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    width: 100%;
    background: #384067;
    border: 1px dashed #8c8c8c;
    border-radius: 4px;
  }

  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border: 1px dashed #8c8c8c;
  }

  .ant-cascader-input {
    border: none;
  }

  .ant-cascader-picker-label {
    inset: 0;
    padding-top: 14px;
    height: auto;
    display: flex;
    align-items: center;
    transition: 0.3s opacity ease;
    @media (min-width: 1800px) {
      padding-top: 10px;
    }
  }

  .ant-cascader-picker-with-value .ant-cascader-picker-label {
    opacity: 0;
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
  .ant-select-single:not(.ant-select-customize-input)
    .ant-select-selector
    .ant-select-selection-search-input {
    height: 38px;
    @media (min-width: 1800px) {
      height: 57px;
    }
  }

  .ant-picker-input > input,
  .ant-picker-suffix,
  .ant-cascader-input,
  .ant-select-selection-search-input {
    color: white;
  }

  .ant-picker-input > input,
  .ant-cascader-input,
  .ant-select-selection-search-input {
    line-height: 28px;
    @media (min-width: 1800px) {
      line-height: 47px;
    }
  }
`;

const StyledHeaderContainer = styled(HeaderContainer)`
  margin-bottom: 12px;
`;

const EditButtonsContainer = styled.div`
  width: 100px;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CategoriesDisplayContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  color: white;
`;

const CategoryItemVariants: Record<string, CSSObject> = {
  primary: {
    background: "#b9e6f9",
    color: "#064e69",
  },
  secondary: {
    background: "#CAD5FF",
    color: "#2635B8",
  },
  tertiary: {
    background: "#F8E9FE",
    color: "#A24EA4",
  },
};

const CategoryItem = styled.div<{ variant?: string }>(
  {
    background: "#b9e6f9",
    color: "#064e69",
    margin: "0 4px 4px 4px",
    whiteSpace: "nowrap",
    borderRadius: "48px",
    padding: "4px 16px",
    fontSize: "12px",
    lineHeight: "22px",
  },
  ({ variant = "primary" }) => CategoryItemVariants[variant]
);

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "date" | "text" | "cascadingDropdown" | "autocomplete";
  record: TransactionDetail;
  index: number;
  children: React.ReactNode;
}

const NoWrapText = styled.div`
  white-space: nowrap;
`;

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  id: string;
}

function AutocompleteInput({
  value,
  onChange,
  id,
}: Partial<AutocompleteInputProps>) {
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const onSearch = (searchText: string) => {
    setOptions(
      !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    );
  };

  return (
    <AutoComplete
      id={id}
      value={value}
      options={options}
      onSelect={onChange}
      onSearch={onSearch}
      onChange={onChange}
      allowClear={false}
    />
  );
}

function disabledDate(current?: moment.Moment) {
  return current ? current > moment().endOf("day") : true;
}

interface DateInputProps {
  value: string;
  onChange: (value: moment.Moment | null, dateString: string) => void;
  id: string;
}

function DateInput({ value, onChange, id }: Partial<DateInputProps>) {
  return (
    <DatePicker
      value={moment(value)}
      onChange={onChange}
      id={id}
      disabledDate={disabledDate}
      allowClear={false}
    />
  );
}

function filter(inputValue: string, path: CascaderOptionType[]) {
  return path.some((option) => {
    const label = option.label ? option.label.toString() : "";
    return label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CascadingDropdown({ value: valueProp, onChange, id }: any) {
  const {
    data: transactionCategoriesResponse,
    isLoading,
    isError,
  } = useTransactionCategories();

  const options = transactionCategoriesResponse?.data.data || [];

  const value = isArray(valueProp) ? valueProp : [valueProp];

  return (
    <Cascader
      id={id}
      options={options}
      value={value}
      onChange={(
        value: CascaderValueType,
        selectedOptions?: CascaderOptionType[]
      ) => {
        onChange(value);
      }}
      placeholder="Please select"
      allowClear={false}
      disabled={isLoading || isError}
      expandTrigger="hover"
      showSearch={{ filter }}
      displayRender={(
        labelsToRender: string[],
        selectedOptions?: CascaderOptionType[]
      ) => {
        const [firstLabel] = labelsToRender;
        const labelsWithSeparator = labelsToRender.join(" / ");
        const labels =
          labelsToRender.length === 1 ? firstLabel : labelsWithSeparator;
        const badges = createCategoryBadges(labels);
        return (
          <CategoriesDisplayContainer>{badges}</CategoriesDisplayContainer>
        );
      }}
      changeOnSelect
    />
  );
}

function findItems(
  data: TransactionCategory[] | undefined,
  value: string | string[]
): string {
  if (!isArray(value)) {
    return value;
  }

  if (!data) {
    return "";
  }

  const transactionCategoryItems = value.reduce((acc, current) => {
    const categoryItem = acc.length ? last(acc)?.children : data;
    const category = categoryItem?.find((item) => item.value === current);
    if (category) {
      acc.push(category);
    }
    return acc;
  }, [] as TransactionCategory[]);

  const result = transactionCategoryItems.map((item) => item.label).join(" / ");

  return result;
}

function getCategoryItemVariant(index: number) {
  const remainder = index % 3;
  if (remainder === 0) {
    return "tertiary";
  } else if (remainder === 2) {
    return "secondary";
  }
  return "primary";
}

function createCategoryBadges(categories?: string) {
  if (!categories) {
    return "";
  }

  if (categories.toLowerCase() === "na") {
    return <div>{categories}</div>;
  }

  const itemNameList = categories.split(" / ");

  const itemComponents = itemNameList.map((item, index) => {
    const variant = getCategoryItemVariant(index + 1);
    return (
      <CategoryItem key={item} variant={variant}>
        {item}
      </CategoryItem>
    );
  });

  return itemComponents;
}

function CategoryDisplay({ value }: { value: string | string[] }) {
  const { data: transactionCategoriesResponse } = useTransactionCategories();

  const items = findItems(transactionCategoriesResponse?.data.data, value);

  const itemComponents = createCategoryBadges(items);

  return <CategoriesContainer>{itemComponents}</CategoriesContainer>;
}

function getInput(type: EditableCellProps["inputType"]) {
  if (type === "date") {
    return <DateInput />;
  }
  if (type === "text") {
    return <Input />;
  }
  if (type === "cascadingDropdown") {
    return <CascadingDropdown />;
  }
  if (type === "autocomplete") {
    return <AutocompleteInput />;
  }
  return null;
}

function getInputType(dataIndex: string): EditableCellProps["inputType"] {
  if (dataIndex === "dateOfTransaction") {
    return "date";
  }
  if (dataIndex === "category") {
    return "cascadingDropdown";
  }
  if (dataIndex === "merchantName") {
    return "autocomplete";
  }
  return "text";
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  className,
  ...restProps
}) => {
  const inputNode = getInput(inputType);

  const editingClassName = editing ? "editing-cell" : "";

  return (
    <td className={clsx(className, editingClassName)} {...restProps}>
      {editing ? (
        <EditingCellContainer className="editing-form-control-container">
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        </EditingCellContainer>
      ) : (
        children
      )}
    </td>
  );
};

interface EditableTransactionProps {
  activeAccountId: string | null;
  transactionsData: any;
  isLoading: boolean;
  isError: boolean;
}

function filterTransactions(
  transactions: TransactionDetail[] | undefined,
  activeAccountId?: string | null
) {
  if (activeAccountId === null) {
    return transactions;
  }

  return transactions?.filter(
    (transaction) => transaction.accountId === activeAccountId
  );
}

function EditableTransactions({
  activeAccountId,
  transactionsData,
  isLoading,
  isError,
}: EditableTransactionProps) {
  const { mutate } = useUpdateTransactionData({
    onSuccess: () => {
      setNotification({
        type: "success",
        description: "Changes saved",
      });
    },
    onError: () => {
      setNotification({
        type: "error",
        description: "An error occurred",
      });
    },
  });
  const [transactions, setTransactions] = useState(transactionsData?.data);
  const [accountSubTypes, setAccountSubTypes] = useState<string[]>([]);
  const [selectedSubType, setSelectedSubType] = useState<string>(
    TRANSACTIONS.FILTER.ALL
  );

  const filteredTransactions = filterTransactions(
    transactionsData?.data,
    activeAccountId
  );

  useEffect(() => {
    setTransactions(transactionsData?.data);
  }, [transactionsData?.data]);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | undefined | null>(null);

  const isEditing = (record: TransactionDetail) => record.id === editingKey;

  const edit = (record: Partial<TransactionDetail>) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const save = async (id: string) => {
    try {
      const row = (await form.validateFields()) as Partial<TransactionDetail>;

      if (isMoment(row.dateOfTransaction)) {
        row.dateOfTransaction = (row.dateOfTransaction as moment.Moment).format(
          "YYYY-MM-DD"
        );
      }

      // if (isArray(row.category)) {
      //   row.category = row.category.join(" / ");
      // }

      const currentTransaction = transactions?.find(
        (item: any) => item.id === id
      );

      if (currentTransaction) {
        const updatedTransaction = {
          ...currentTransaction,
          ...row,
        };

        const updatedTransactions = transactions?.map((item: any) => {
          if (item.id === id) {
            return updatedTransaction;
          }
          return item;
        });

        mutate(updatedTransaction);
        setTransactions(updatedTransactions);
      }

      amplitude.logEvent("Transaction updated manually");
      setEditingKey(null);
    } catch (errInfo) {
      setEditingKey(null);
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "dateOfTransaction",
      editable: true,
      render(value: string) {
        return <NoWrapText>{moment(value).format("MMMM D, YYYY")}</NoWrapText>;
      },
    },
    {
      title: "Merchant",
      dataIndex: "merchantName",
      editable: true,
    },
    ...(activeAccountId === null
      ? [
          {
            title: "Account Name",
            dataIndex: "accountName",
            editable: false,
          },
        ]
      : []),
    {
      title: "Category",
      dataIndex: "category",
      editable: true,
      render(value: string | string[]) {
        return <CategoryDisplay value={value} />;
      },
    },
    {
      title: "Amount",
      dataIndex: "transactionAmount",
      editable: false,
      render: (value: number) => currencyUSDFormatter(value),
    },
    // {
    //   title: "",
    //   dataIndex: "operation",
    //   render(_: unknown, record: TransactionDetail) {
    //     const editable = isEditing(record);
    //     return editable ? (
    //       <EditButtonsContainer>
    //         <Typography.Link
    //           onClick={() => save(record.id)}
    //           style={{ marginRight: 8 }}
    //           className="edit-row-action-button"
    //         >
    //           Save
    //         </Typography.Link>
    //         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
    //           <Typography.Link className="edit-row-action-button">
    //             Cancel
    //           </Typography.Link>
    //         </Popconfirm>
    //       </EditButtonsContainer>
    //     ) : (
    //       <EditButtonsContainer>
    //         <Typography.Link
    //           disabled={editingKey !== null}
    //           onClick={() => edit(record)}
    //           className="edit-row-action-button"
    //         >
    //           Edit
    //         </Typography.Link>
    //       </EditButtonsContainer>
    //     );
    //   },
    // },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TransactionDetail): Partial<EditableCellProps> => ({
        record,
        inputType: getInputType(col.dataIndex),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Prompt
        when={editingKey !== null}
        message={(location) =>
          `It looks like you have been editing something. If you leave before saving, your changes will be lost.`
        }
      />
      <ErrorBoundary isError={isError}>
        {!isLoading && transactionsData ? (
          <StyledTable>
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                onRow={(record: TransactionDetail) => ({
                  className: clsx({ "editing-row": isEditing(record) }),
                })}
                dataSource={filteredTransactions}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                  onChange: cancel,
                }}
              />
            </Form>
          </StyledTable>
        ) : (
          <GenericLoading
            type="spinner"
            spinnerProps={{ "aria-label": "Loading" }}
          />
        )}
      </ErrorBoundary>
    </>
  );
}

export { EditableTransactions };
