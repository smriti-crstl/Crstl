import { ErrorBoundary } from "presentation/features/common/components/ErrorBoundary";
import React, { useEffect, useState, useRef, useContext } from "react";
import { getTransactionTableColumns } from "./table";
import { useTransactionsQuery } from "domain/interactors/transactions";
import { Table, Form, Input, DatePicker } from "antd";
import {
  DropdownContainer,
  HeaderContainer,
  SelectedItem,
  StyledDropdown,
  StyledHeader,
} from "../../../analytics/components/reports/Finance/Finance.styles";
import { DataSources } from "presentation/features/common/components/DataSources";
import { Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { SelectedDateRange } from "../../../analytics/components/common";
import { FixedSizeCard } from "components/atoms/card";
import { TRANSACTIONS } from "./Transactions.config";
import moment from "moment";

const StyledHeaderContainer = styled(HeaderContainer)`
  margin-bottom: 4px;
`;

function disabledDate(current?: moment.Moment) {
  return current ? current > moment().endOf("day") : true;
}

const Transactions = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data: transactionsData, isFetching } = useTransactionsQuery();
  const [transactions, setTransactions] = useState(transactionsData?.data);
  const [accountSubTypes, setAccountSubTypes] = useState<string[]>([]);
  const [selectedSubType, setSelectedSubType] = useState<string>(
    TRANSACTIONS.FILTER.ALL
  );
  const handlePaginationChange = (pageNumber: number): void => {
    setPageNumber(pageNumber);
  };

  useEffect(() => {
    const transactions = transactionsData?.data;
    const subTypes: string[] = [];
    transactions?.forEach((tx) => subTypes.push(tx.category));
    const uniqueSubTypes: string[] = Array.from(new Set(subTypes));
    uniqueSubTypes.unshift(TRANSACTIONS.FILTER.ALL);
    setTransactions(transactionsData?.data);
    setAccountSubTypes(uniqueSubTypes);
  }, [transactionsData?.data]);

  const getTableData = () => {
    if (selectedSubType === TRANSACTIONS.FILTER.ALL) {
      return transactions;
    }
    transactionsData?.data.forEach((row, index) => {
      row.id = index.toString();
    });
    return transactionsData?.data.filter(
      (row) => row.category === selectedSubType
    );
  };

  /**
   * Editable stuff
   */

  const EditableContext = React.createContext(Form.useForm()[0]);

  type EditableRowProps = {
    index: number;
  };

  const EditableRow = ({ index, ...props }: EditableRowProps) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  type EditableCellProps = {
    title: string;
    editable: boolean;
    children: any;
    dataIndex: any;
    record: any;
    handleSave: any;
    inputType: string;
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    inputType,
    ...restProps
  }: EditableCellProps) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    function DateInput({ value, onChange, id }: any) {
      return (
        <DatePicker
          ref={inputRef}
          value={moment(value)}
          onChange={(e) => {
            onChange(e);
            save();
          }}
          id={id}
          onBlur={save}
          disabledDate={disabledDate}
          allowClear={false}
        />
      );
    }

    const getInput = () => {
      if (inputType === "date") {
        return <DateInput />;
      }
      return <Input ref={inputRef} onPressEnter={save} onBlur={save} />;
    };

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        if (values.dateOfTransaction) {
          values.dateOfTransaction = values.dateOfTransaction.format(
            "YYYY-MM-DD"
          );
        }
        handleSave({ ...record, ...values });
        console.log("Saving: ", values);
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
          initialValue={moment()}
        >
          {getInput()}
        </Form.Item>
      ) : (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
          onKeyPress={() => console.log("Key")}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleSave = (_row: any) => {
    const updatedTransactions = transactions?.map((row) => {
      if (row.id === _row.id) {
        return _row;
      }
      return row;
    });

    setTransactions(updatedTransactions);
  };

  return (
    <FixedSizeCard
      cardSize="large"
      title={
        <StyledHeaderContainer>
          <div>
            <StyledHeader>{TRANSACTIONS.TITLE}</StyledHeader>
            <SelectedDateRange />
          </div>
          <DropdownContainer>
            <StyledDropdown
              placement={"bottomRight"}
              overlay={() => (
                <Menu>
                  {accountSubTypes.map((t: string, index: number) => (
                    <Menu.Item
                      key={index}
                      onClick={() => setSelectedSubType(t)}
                    >
                      {t}
                    </Menu.Item>
                  ))}
                </Menu>
              )}
              trigger={["click"]}
            >
              <SelectedItem>
                {selectedSubType} <DownOutlined style={{ marginLeft: "8px" }} />
              </SelectedItem>
            </StyledDropdown>
            {transactionsData?.metadata ? (
              <DataSources metadata={transactionsData.metadata} />
            ) : null}
          </DropdownContainer>
        </StyledHeaderContainer>
      }
      style={{ flex: "1" }}
    >
      <div className="animate">
        {isFetching && (
          <div hidden data-testid="loading" aria-label="loading"></div>
        )}
        <div>
          <></>
          <ErrorBoundary isError={false}>
            <Table
              loading={isFetching} //use isFetching
              columns={getTransactionTableColumns(handleSave)}
              dataSource={getTableData()}
              components={components}
              rowClassName={() => "editable-row"}
              pagination={{
                showSizeChanger: false,
                showLessItems: true,
                current: Number(pageNumber || 1),
                onChange: handlePaginationChange,
              }}
            />
          </ErrorBoundary>
        </div>
      </div>
    </FixedSizeCard>
  );
};

export default Transactions;
