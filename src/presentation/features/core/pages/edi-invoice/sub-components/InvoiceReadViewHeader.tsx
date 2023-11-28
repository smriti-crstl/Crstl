import { find, get } from "lodash";
import moment from "moment";

import { HeaderContainer, HeaderSummaryTable } from "../InvoiceReadView.styles";

interface VendorInfo {
  vendor?: string;
  department?: string;
}

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
  const dtm = get(
    data,
    `${firstTransactionSet}.heading.date_time_reference_DTM`
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shipDateItem = dtm?.find((item: any) => {
    return (
      item.date_time_qualifier_01 === "shipped_011" ||
      item.date_time_qualifier_01 === "011"
    );
  });

  const shipDate =
    shipDateItem && shipDateItem.date_02 !== "USER_INPUT"
      ? shipDateItem.date_02
      : "";

  const defaultResult: VendorInfo = {
    vendor: "",
    department: "",
  };

  const referenceIdentification = get(
    data,
    `${firstTransactionSet}.heading.reference_identification_REF`
  );

  const referenceInformationRef = get(
    data,
    `${firstTransactionSet}.heading.reference_information_REF`
  );

  const referenceList =
    referenceIdentification || referenceInformationRef || [];

  if (referenceList.length === 0) {
    return defaultResult;
  }

  const vendorRef =
    (find(referenceList, {
      reference_identification_qualifier_01: "IA",
    }) as Record<string, string>) ||
    (find(referenceList, {
      reference_identification_qualifier_01: "internal_vendor_number_IA",
    }) as Record<string, string>) ||
    (find(referenceList, {
      reference_identification_qualifier_01: "VR",
    }) as Record<string, string>) ||
    (find(referenceList, {
      reference_identification_qualifier_01: "vendor_id_number_VR",
    }) as Record<string, string>);

  const departmentRef =
    find(referenceIdentification, {
      reference_identification_qualifier_01: "department_number_DP",
    }) ||
    find(referenceIdentification, {
      reference_identification_qualifier_01: "DP",
    });

  return {
    invoiceDate: formatDate(invoiceDate, "MM/DD/YYYY"),
    shipDate: formatDate(shipDate, "MM/DD/YYYY"),
    vendorNumber: vendorRef?.reference_identification_02,
    departmentNumber: departmentRef?.reference_identification_02,
    formattedshipDate: formatDate(shipDate, "MM/DD/YYYY"),
  };
}

export const getInvoiceNumberOld = (data: unknown) => {
  const invoiceNumber = get(
    data,
    `${firstTransactionSet}.heading.beginning_segment_for_invoice_BIG.invoice_number_02`,
    ""
  );

  return invoiceNumber;
};

function InvoiceReadViewHeader({ data }: { data: unknown }) {
  const invoiceNumber = getInvoiceNumberOld(data);

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
              <strong>{summaryData.formattedshipDate}</strong>
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
