import { find, get } from "lodash";

import { formatDate } from "../../../edi-purchase-order/helpers";
import { firstTransactionSet } from "../../constants";
import { HeaderSummaryTable, HeaderSummaryWrapper } from "../../styles";

interface PublicProps {
  data: any;
}

function getShippingDate(
  refList: Array<Record<string, string>>,
  qualifierName: string
): string {
  const reference = find(refList, {
    date_qualifier_01: qualifierName,
  }) as Record<string, string>;

  if (reference?.date_02) {
    const formattedDateValue = formatDate(reference.date_02);
    return formattedDateValue;
  }

  return "";
}

const getShippingDateInformation = (data: unknown) => {
  const dateTimeReferenceList = get(
    data,
    `${firstTransactionSet}.heading.date_time_G62`,
    []
  );

  const deliveryRequestedDate = getShippingDate(
    dateTimeReferenceList,
    "delivery_requested_on_this_date_02"
  );

  const requestedShipPickupDate = getShippingDate(
    dateTimeReferenceList,
    "requested_ship_date_pick_up_date_10"
  );

  return {
    deliveryRequestedDate,
    requestedShipPickupDate,
  };
};

export const HeaderSummary: React.FC<PublicProps> = ({ data }) => {
  const poDate = get(
    data,
    `${firstTransactionSet}.heading.purchase_order_identification_G50.date_02`
  );

  const {
    deliveryRequestedDate,
    requestedShipPickupDate,
  } = getShippingDateInformation(data);

  return (
    <HeaderSummaryWrapper>
      <HeaderSummaryTable>
        <tr>
          <th scope="row">Purchase order date:</th>
          <td>
            <strong>{formatDate(poDate)}</strong>
          </td>
        </tr>
        {deliveryRequestedDate ? (
          <tr>
            <th scope="row">Requested delivery date:</th>
            <td>
              <strong>{deliveryRequestedDate}</strong>
            </td>
          </tr>
        ) : null}
        {requestedShipPickupDate ? (
          <tr>
            <th scope="row">Requested ship/pick-up date:</th>
            <td>
              <strong>{requestedShipPickupDate}</strong>
            </td>
          </tr>
        ) : null}
      </HeaderSummaryTable>
    </HeaderSummaryWrapper>
  );
};

