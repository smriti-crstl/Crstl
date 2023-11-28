import { get } from "lodash";

import { removeUserInput } from "../../edi-edit/helpers";
import { formatDate } from "../../edi-purchase-order/helpers";
import { firstTransactionSet } from "../constants";
import {
  HeaderContainer,
  HeaderSummaryContainer,
  HeaderSummaryTable,
} from "../styles";

interface PublicProps {
  data: any;
}

const getSummaryData = (data: any) => {
  const invoiceDateStr = get(
    data,
    `${firstTransactionSet}.heading.invoice_identification_G01.date_01`,
    ""
  );
  const purchaseOrderDateStr = get(
    data,
    `${firstTransactionSet}.heading.invoice_identification_G01.date_03`,
    ""
  );
  const shipDateStr = get(
    data,
    `${firstTransactionSet}.heading.date_time_G62[0].date_02`,
    ""
  );

  const cleanInvoiceDateStr = removeUserInput(invoiceDateStr);
  const cleanPurchaseOrderDateStr = removeUserInput(purchaseOrderDateStr);
  const cleanShipDateStr = removeUserInput(shipDateStr);

  const invoiceDate = formatDate(cleanInvoiceDateStr);
  const purchaseOrderDate = formatDate(cleanPurchaseOrderDateStr);
  const shipDate = formatDate(cleanShipDateStr);

  return {
    invoiceDate,
    purchaseOrderDate,
    shipDate,
  };
};

export const getGroceryInvoiceNumber = (data: any) => {
  const invoiceNumber = get(
    data,
    `${firstTransactionSet}.heading.invoice_identification_G01.invoice_number_02`,
    ""
  );
  return invoiceNumber;
};

export const GroceryInvoiceHeader: React.FC<PublicProps> = ({ data }) => {
  const invoiceNumber = getGroceryInvoiceNumber(data);

  const orderNumber = get(
    data,
    `${firstTransactionSet}.heading.invoice_identification_G01.purchase_order_number_04`
  );

  const summaryData = getSummaryData(data);

  return (
    <HeaderContainer>
      <div>
        <p>
          Invoice #: <strong>{invoiceNumber}</strong>
        </p>
        <p>Order #: {orderNumber}</p>
        <p>Customer order #:</p>
        <p>Release #:</p>
        <p>Currency:</p>
      </div>
      <HeaderSummaryContainer>
        <HeaderSummaryTable>
          <tr>
            <th scope="row">
              Invoice date:
              <br />
              <strong>{summaryData.invoiceDate}</strong>
            </th>
            <td>
              PO date:
              <br />
              <strong>{summaryData.purchaseOrderDate}</strong>
            </td>
          </tr>
          <tr>
            <th scope="row">
              Ship date:
              <br />
              <strong>{summaryData.shipDate}</strong>
            </th>
            <td></td>
          </tr>
        </HeaderSummaryTable>
      </HeaderSummaryContainer>
    </HeaderContainer>
  );
};

