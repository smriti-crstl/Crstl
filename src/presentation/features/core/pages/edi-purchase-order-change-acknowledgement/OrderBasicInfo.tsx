import { get } from "lodash";

import { getTpfNameFromListDoc } from "../edi/edi.utils";
import {
  acknowledgementCodeToTextMapping,
  firstTransactionSet,
} from "./constants";

interface PublicProps {
  data: unknown;
}

export const getPoNumber = (data: unknown) =>
  get(
    data,
    `${firstTransactionSet}.heading.beginning_segment_for_purchase_order_change_acknowledgment_BCA.purchase_order_number_03`
  );

export const OrderBasicInfo: React.FC<PublicProps> = ({ data }) => {
  const tradingPartner = getTpfNameFromListDoc(data);

  const poNumber = getPoNumber(data);

  const ackTypeCode = get(
    data,
    `${firstTransactionSet}.heading.beginning_segment_for_purchase_order_change_acknowledgment_BCA.acknowledgment_type_02`
  );
  const ackType = acknowledgementCodeToTextMapping[ackTypeCode] ?? ackTypeCode;

  const currency = get(
    data,
    `${firstTransactionSet}.heading.currency_CUR.currency_code_02`
  );

  return (
    <div>
      <p>
        Trading Partner: <strong>{tradingPartner}</strong>
      </p>
      <p>
        Purchase order: <strong>{poNumber}</strong>
      </p>
      <p>
        Acknowledgement type: <strong>{ackType}</strong>
      </p>
      <p>
        Currency: <strong>{currency}</strong>
      </p>
    </div>
  );
};

