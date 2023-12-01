import { Button, Input, Table, Form, Popconfirm, Select } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, {
  ReactElement,
  createContext,
  useState,
  useRef,
  useContext,
  useEffect,
  SetStateAction,
} from "react";
import { Spinner } from "components/atoms/loading";
import { Column } from "../types";
import { currencyUSDFormatter } from "presentation/utils";

type DyTableProps = {
  columns: Column[];
  emptyRow: any;
  counter: number;
  tableObject: IState;
  stateSetter: (tableObject: IState, index: string) => void;
  uuid: string;
};

type EditableRowProps = {
  index: number;
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

export interface IState {
  dataSource: any[];
  count: number;
  key: string;
  name: string;
}
export interface IDynaTable {
  tables: IState[];
}

export const DyTable = ({
  columns,
  emptyRow,
  tableObject = {
    dataSource: [{ key: "1", name: "test", qty: 2, price: 200, amount: 400 }],
    count: 1,
  },
  stateSetter,
  ...props
}: DyTableProps): ReactElement => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<IState>(tableObject);

  useEffect(() => {
    if (state && tableObject && loading) {
      setState(tableObject);
      setLoading(false);
    }
  }, [loading, state, tableObject]);

  const EditableContext = createContext(Form.useForm()[0]);

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

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }: EditableCellProps) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    // useEffect(() => {
    //   const ref = inputRef?.current;
    //   if (editing) {
    //     ref?.focus();
    //   }
    // }, [editing]);

    function getFormControl() {
      if (dataIndex === "name") {
        return (
          <Select
            options={[
              { value: 1, label: "Option 1" },
              { value: 2, label: "Option 2" },
            ]}
            onChange={(value) => {
              save(dataIndex, value);
            }}
          />
        );
      }

      return (
        <Input
          style={{
            marginBottom: "12px",
          }}
          ref={inputRef}
          // onPressEnter={save}
          onBlur={(e) => save(dataIndex, e.target.value)}
        />
      );
    }

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async (dataIndex: string, value: any) => {
      try {
        toggleEdit();
        record[dataIndex] = value;
        // const values = await form.validateFields();
        handleSave({ ...record });
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
        >
          {getFormControl()}
          {/* <Input
            style={{
              marginBottom: "12px",
            }}
            ref={inputRef}
            // onPressEnter={save}
            onBlur={(e) => save(dataIndex, e.target.value)}
          /> */}
        </Form.Item>
      ) : (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          onKeyPress={(e) => console.log(e)}
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
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

  const handleDelete = (key: any) => {
    const dataSource = JSON.parse(JSON.stringify(state?.dataSource));
    const newDataSource = dataSource.filter((item: any) => item.key !== key);
    const updatedState = {
      dataSource: JSON.parse(JSON.stringify(newDataSource)),
      count: newDataSource.length,
      key: state?.key,
      name: state?.name,
    };
    setState(updatedState);
    // stateSetter(updatedState, state?.key);
  };

  const getColumns = () => {
    const _columns = JSON.parse(JSON.stringify(columns));

    if (_columns[_columns.length - 1].dataIndex !== "operation") {
      _columns.push({
        title: "Action",
        dataIndex: "operation",
        // eslint-disable-next-line react/display-name
        render: (_: any, record: any) =>
          state.count >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a href="_blank">Delete</a>
            </Popconfirm>
          ) : null,
      });
    }
    return _columns?.map((col: Column) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: handleSave,
        }),
      };
    });
  };

  const handleAdd = () => {
    const { count, dataSource } = state;
    const _dataSource = JSON.parse(JSON.stringify(dataSource));
    const updatedState = JSON.parse(JSON.stringify(state));

    const newData = {
      ...emptyRow,
      key: count + 1,
      name: tableObject.name,
    };
    _dataSource.push(newData);
    updatedState.dataSource = [...dataSource, newData];
    updatedState.count = count + 1;
    setState(updatedState);
    // stateSetter(updatedState, state?.key);
  };

  const handleSave = (row: any) => {
    console.log("row: ", row);
    const newData = JSON.parse(JSON.stringify(state.dataSource));
    const _index = newData.findIndex((item: any) => row.key === item.key);
    newData[_index] = JSON.parse(JSON.stringify(row));
    const updatedState = JSON.parse(
      JSON.stringify({
        dataSource: newData,
        count: newData.length,
        key: state.key,
        name: state.name,
      })
    );
    setState(updatedState);
    console.log("save called: ", updatedState);
    // stateSetter(updatedState, state?.key);
  };

  const getTotal = () => {
    let sum = 0;
    state.dataSource?.forEach((item) => (sum += item.amount));
    return currencyUSDFormatter(sum);
  };

  if (loading) {
    return <Spinner size="large" />;
  } else
    return (
      <div
        style={{ display: "flex", flexDirection: "column", padding: "12px" }}
      >
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
            width: "20%",
          }}
        >
          Add a row
        </Button>
        <h2 style={{ alignSelf: "flex-end" }}>Balance Due: {getTotal()}</h2>
        <Table
          components={components}
          columns={getColumns()}
          bordered
          rowClassName={() => "editable-row"}
          dataSource={state.dataSource}
        />
      </div>
    );
};
