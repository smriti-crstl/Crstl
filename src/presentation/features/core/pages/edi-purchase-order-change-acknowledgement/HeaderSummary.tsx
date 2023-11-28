import { get } from "lodash";

import { formatDate } from "../edi-purchase-order/helpers";
import { firstTransactionSet } from "./constants";
import {
  HeaderSummaryTable,
  HeaderSummaryWrapper,
} from "./EdiPOChangeAckViewPage.styles";

interface Props {
  data: unknown;
}

export const HeaderSummary: React.FC<Props> = ({ data }) => {
  const poDate = get(
    data,
    `${firstTransactionSet}.heading.beginning_segment_for_purchase_order_change_acknowledgment_BCA.date_06`
  );

  const poAckDate = get(
    data,
    `${firstTransactionSet}.heading.beginning_segment_for_purchase_order_change_acknowledgment_BCA.date_10`
  );

  const vendorNumber = get(
    data,
    `${firstTransactionSet}.heading.reference_identification_REF[0].reference_identification_02`
  );

  return (
    <HeaderSummaryWrapper>
      <HeaderSummaryTable>
        <tr>
          <th scope="row">Purchase order date:</th>
          <td>
            <strong>{formatDate(poDate)}</strong>
          </td>
        </tr>
        <tr>
          <th scope="row">PO Acknowledgement date:</th>
          <td>
            <strong>{formatDate(poAckDate)}</strong>
          </td>
        </tr>
        <tr>
          <th scope="row">Vendor:</th>
          <td>
            <strong>{vendorNumber}</strong>
          </td>
        </tr>
        <tr>
          <th scope="row">Department:</th>
        </tr>
        <tr>
          <th scope="row">Account #:</th>
        </tr>
      </HeaderSummaryTable>
    </HeaderSummaryWrapper>
  );
};

