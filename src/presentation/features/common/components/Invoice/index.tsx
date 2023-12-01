import { ReactElement, useState } from "react";
import { BaseForm } from "components/atoms/form";
import { Button, DatePicker, Form, Input } from "antd";
import { Select } from "antd";
import { DyTable, IState } from "../DynaForm/DynaTable";
import { FIELD_TYPES } from "../DynaForm/config";
import { Column } from "../DynaForm/types";

const { Option } = Select;

const terms = {
  id: "4b93a2cd-2360-4736-a4d9-c1c06a369b0a",
  label: "Terms Type Code",
  name: "336 ITD 01",
  type: "Dropdown",
  placeholder: "Enter Terms Type Code",
  rules: [
    {
      required: true,
      message: "Please enter Terms Type Code",
    },
    {
      min: 2,
      message: "Must have at least 2 characters",
    },
    {
      max: 2,
      message: "Can have at most 2 characters",
    },
    {},
  ],
  options: [
    {
      code: "01",
      description: "Basic",
    },
    {
      code: "02",
      description: "End of Month (EOM)",
    },
  ],
};

const invoice_table = {
  id: 7,
  label: "Items",
  name: "itemList",
  type: FIELD_TYPES.TABLE,
  columns: [
    {
      title: "ID",
      dataIndex: "key",
      width: "15%",
      editable: false,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      width: "20%",
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "15%",
      editable: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "25%",
      editable: false,
      render: (_: any, record: any) => record.qty * record.price,
    },
  ],
  emptyRow: {
    name: "Enter item name",
    qty: 0,
    price: 0,
    amount: 0,
  },
};

export const InvoiceForm = (): ReactElement => {
  const [form] = Form.useForm();
  const [state, setState] = useState<IState>({
    dataSource: [],
    count: 1,
  });
  return (
    <>
      <p>Invoice Form</p>
      <BaseForm
        style={{ padding: "12px" }}
        form={form}
        onFinish={() => console.log("finish")}
      >
        <Form.Item
          label="Purchase Order Number"
          name="customerName"
          rules={[{ required: true, message: "Field required" }]}
          style={{ padding: "2px 48px 2px 20px" }}
        >
          <Input placeholder="Input customer name" />
        </Form.Item>
        <Form.Item
          label="Customer Email"
          name="customerEmail"
          rules={[{ required: true, message: "Field required" }]}
          style={{ padding: "2px 48px 2px 20px" }}
        >
          <Input placeholder="Input customer email" />
        </Form.Item>
        <Form.Item
          label="Billing Address"
          name="billingAddress"
          rules={[{ required: true, message: "Field required" }]}
          style={{ padding: "2px 48px 2px 20px" }}
        >
          <Input placeholder="Input Billing Address" />
        </Form.Item>
        <Form.Item
          label="Terms Type Code"
          name="336 ITD 01"
          rules={[{ required: true, message: "Field required" }]}
          style={{ padding: "2px 48px 2px 20px" }}
        >
          <Select defaultValue="Choose Terms Type Code">
            {terms.options.map((option: any, index: number) => (
              <Option value={option.code} key={index}>
                {option.code} - {option.description}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Invoice Date"
          name="373 DTM 02"
          rules={[
            {
              required: true,
              message: "Please enter Date",
            },
          ]}
          style={{ padding: "2px 48px 2px 20px" }}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Terms Net Due Date"
          name="446 ITD 06"
          rules={[
            {
              required: true,
              message: "Please enter Date",
            },
          ]}
          style={{ padding: "2px 48px 2px 20px" }}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Invoice Number"
          name="76 BIG 02"
          style={{ padding: "2px 48px 2px 20px" }}
        >
          <Input placeholder="Enter Invoice Number" />
        </Form.Item>
        <Form.Item>
          <DyTable
            tableObject={state}
            stateSetter={setState}
            columns={invoice_table.columns as Column[]}
            emptyRow={invoice_table.emptyRow}
          />
        </Form.Item>
        <Button
          type="primary"
          onClick={() => console.log(JSON.stringify(form.getFieldsValue()))}
        >
          Save
        </Button>
      </BaseForm>
    </>
  );
};
