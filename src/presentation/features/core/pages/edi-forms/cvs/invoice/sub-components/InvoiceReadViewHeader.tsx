import { find, get } from "lodash";
import moment from "moment";

import { HeaderContainer, HeaderSummaryTable } from "../InvoiceReadView.styles";

export function formatDate(date: string, format = "YYYY-MM-DD") {
  const parsedDate = moment(date, "YYYYMMDD");
  return parsedDate.format(format);
}

export function formatTime(time: string, format = "hh:mm:ss") {
  const formattedTime = moment(time, "HH:mm").format("hh:mm A");
  return formattedTime;
}

const firstTransactionSet = "interchanges[0].groups[0].transaction_sets[0]";

function getSummaryTableData(data: unknown) {
  const invoiceDate = get(
    data,
    `${firstTransactionSet}.heading.beginning_segment_for_invoice_BIG.date_01`,
    ""
  );

  const shipDate = get(
    data,
    `${firstTransactionSet}.heading.date_time_reference_DTM[0].date_02`,
    ""
  );

  const referenceIdentification = get(
    data,
    `${firstTransactionSet}.heading.reference_identification_REF`
  );

  const vendorRef = find(referenceIdentification, {
    reference_identification_qualifier_01: "internal_vendor_number_IA",
  }) as Record<string, string>;

  const departmentRef = find(referenceIdentification, {
    reference_identification_qualifier_01: "department_number_DP",
  });

  return {
    invoiceDate: formatDate(invoiceDate, "MM/DD/YYYY"),
    shipDate: formatDate(shipDate, "MM/DD/YYYY"),
    vendorNumber: vendorRef?.reference_identification_02,
    departmentNumber: departmentRef?.reference_identification_02,
  };
}

function InvoiceReadViewHeader({ data }: { data: unknown }) {
  const invoiceNumber = get(
    data,
    `${firstTransactionSet}.heading.beginning_segment_for_invoice_BIG.invoice_number_02`,
    ""
  );

  const orderNumber = get(
    data,
    `${firstTransactionSet}.heading.beginning_segment_for_invoice_BIG.purchase_order_number_04`,
    ""
  );

  const summaryData = getSummaryTableData(data);

  return (
    <HeaderContainer>
      <div>
        <p>
          Invoice #: <strong>{invoiceNumber}</strong>
        </p>
        <p>Order Number: {orderNumber}</p>
        <p>Customer order #:</p>
        <p>Release #:</p>
        <p>Currency:</p>
      </div>
      <div
        style={{
          borderRadius: 4,
          border: "1px solid #f0f0f0",
          padding: "0px 12px",
        }}
      >
        <HeaderSummaryTable summary="These are the key and value pairs">
          <tr>
            <th scope="row">
              Invoice date:
              <br /> <strong>{summaryData.invoiceDate}</strong>
            </th>
            <td>PO date:</td>
          </tr>
          <tr>
            <th scope="row">
              Ship date:
              <br />
              <strong>{summaryData.shipDate}</strong>
            </th>
            <td></td>
          </tr>
          <tr>
            <th scope="row">
              Vendor #:
              <br />
              <strong>{summaryData.vendorNumber}</strong>
            </th>
            <td>
              Department #:
              <br />
              <strong>{summaryData.departmentNumber}</strong>
            </td>
          </tr>
        </HeaderSummaryTable>
      </div>
    </HeaderContainer>
  );
}

export { InvoiceReadViewHeader };
