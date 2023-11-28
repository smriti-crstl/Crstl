import { Table } from "antd";
import { CORE_EDI_INVOICE_FORM } from "globals/configs";
import { prefillData } from "presentation/features/common/components/DynaForm/prefillData";
import { sampleResponse } from "presentation/features/common/components/DynaForm/sampleResponse";
import { generatePath, Link } from "react-router-dom";
import {
  Container,
  FieldContainer,
  FormContainer,
  SubFormContainer,
} from "./InvoiceReadViewWithNonJediMapping.styles";
import {
  DetailIT1,
  InvoiceData,
  InvoiceFieldChild,
  InvoiceReadViewResponse,
  Type,
} from "./InvoiceReadViewTypes";

const editInvoicePath = generatePath(CORE_EDI_INVOICE_FORM, { mode: "edit" });

const formData = prefillData as InvoiceData;

const apiResponse = sampleResponse as InvoiceReadViewResponse;

function SubForm(props: {
  data: DetailIT1[];
  invoiceFields?: InvoiceFieldChild[];
}) {
  return (
    <SubFormContainer className="subform-grid-container">
      {props.data.map((dataItem) => {
        return props.invoiceFields?.map((invoiceField, index) => {
          const key = `${invoiceField.id}-${invoiceField.name}`;
          const value = dataItem[invoiceField.name];

          if (invoiceField.type === Type.Datepicker) {
            const dateValue = value as moment.Moment;
            return (
              <FieldContainer key={key}>
                <p className="label">
                  {invoiceField.label} [{invoiceField.name}]
                </p>
                <p className="value">{dateValue.toString()}</p>
              </FieldContainer>
            );
          }
          if (invoiceField.type === Type.Input) {
            const inputValue = value as string;
            return (
              <FieldContainer key={key}>
                <p className="label">
                  {invoiceField.label} [{invoiceField.name}]
                </p>
                <p className="value">{inputValue}</p>
              </FieldContainer>
            );
          }
          if (invoiceField.type === Type.Dropdown) {
            const inputValue = value as string;
            const defaultOption = { code: "", description: "" };
            const option =
              invoiceField.options?.find(({ code }) => code === inputValue) ??
              defaultOption;

            return (
              <FieldContainer key={key}>
                <p className="label">
                  {invoiceField.label} [{invoiceField.name}]
                </p>
                <p className="value">{option.description}</p>
              </FieldContainer>
            );
          }
          if (invoiceField.type === Type.Textarea) {
            const inputValue = value as string;

            return (
              <FieldContainer key={key}>
                <p className="label">
                  {invoiceField.label} [{invoiceField.name}]
                </p>
                <p className="value">{inputValue}</p>
              </FieldContainer>
            );
          }

          if (invoiceField.type === Type.Subform) {
            const data = value as DetailIT1[];
            return (
              <SubForm
                key={key}
                data={data}
                invoiceFields={invoiceField.children}
              />
            );
          }

          return <div key={key}>{invoiceField.type}</div>;
        });
      })}
    </SubFormContainer>
  );
}

function InvoiceReadView() {
  const { data: apiResponseData } = apiResponse;
  return (
    <Container>
      <p>
        <Link to={editInvoicePath}>Edit</Link>
      </p>
      <h2>Invoice</h2>
      <FormContainer>
        {apiResponseData.map((invoiceField) => {
          const key = `${invoiceField.id}-${invoiceField.name}`;
          const value = formData[invoiceField.name];
          if (invoiceField.type === Type.Datepicker) {
            const dateValue = value as moment.Moment;
            return (
              <FieldContainer key={key}>
                <p className="label">
                  {invoiceField.label} [{invoiceField.name}]
                </p>
                <p className="value">{dateValue.toString()}</p>
              </FieldContainer>
            );
          }
          if (invoiceField.type === Type.Input) {
            const inputValue = value as string;
            return (
              <FieldContainer key={key}>
                <p className="label">
                  {invoiceField.label} [{invoiceField.name}]
                </p>
                <p className="value">{inputValue}</p>
              </FieldContainer>
            );
          }
          if (invoiceField.type === Type.Dropdown) {
            const inputValue = value as string;
            const defaultOption = { code: "", description: "" };
            const option =
              invoiceField.options?.find(({ code }) => code === inputValue) ??
              defaultOption;

            return (
              <FieldContainer key={key}>
                <p className="label">
                  {invoiceField.label} [{invoiceField.name}]
                </p>
                <p className="value">{option.description}</p>
              </FieldContainer>
            );
          }
          if (invoiceField.type === Type.Textarea) {
            const inputValue = value as string;

            return (
              <FieldContainer key={key}>
                <p className="label">
                  {invoiceField.label} [{invoiceField.name}]
                </p>
                <p className="value">{inputValue}</p>
              </FieldContainer>
            );
          }
          if (invoiceField.type === Type.Table) {
            const tableDataSource = value as Array<Record<string, string>>;
            return (
              <FieldContainer key={key} className="span-4">
                <p className="label">
                  {invoiceField.label} [{invoiceField.name}]
                </p>
                <Table
                  dataSource={tableDataSource}
                  columns={invoiceField.columns}
                  pagination={false}
                  size="middle"
                />
              </FieldContainer>
            );
          }
          if (invoiceField.type.toLowerCase() === Type.Subform) {
            const data = value as DetailIT1[];
            return (
              <FieldContainer key={key} className="span-4">
                <p className="label">
                  {invoiceField.label} [{invoiceField.name}]
                </p>
                <SubForm data={data} invoiceFields={invoiceField.children} />
              </FieldContainer>
            );
          }
          return <div key={key}>{invoiceField.type}</div>;
        })}
      </FormContainer>
    </Container>
  );
}

export { InvoiceReadView };
