import { codeToTextMapping } from "globals/configs";
import { get } from "lodash";

import { getTpfNameFromListDoc } from "../edi/edi.utils";
import { firstTransactionSet } from "./constants";

interface PublicProps {
  data: any;
}

export const OrderBasicInfo: React.FC<PublicProps> = ({ data }) => {
  const tradingPartner = getTpfNameFromListDoc(data);

  const poNumber = get(
    data,
    `${firstTransactionSet}.heading.purchase_order_change_type_G92.purchase_order_number_03`
  );
  const orderStatusCode = get(
    data,
    `${firstTransactionSet}.heading.purchase_order_change_type_G92.change_or_response_type_code_01`
  );
  const orderStatus = codeToTextMapping[orderStatusCode] ?? orderStatusCode;

  return (
    <div>
      <p>
        Trading Partner: <strong>{tradingPartner}</strong>
      </p>
      <p>
        Purchase order: <strong>{poNumber}</strong>
      </p>
      <p>
        Order Status: <strong>{orderStatus}</strong>
      </p>
      <p>Depositor order:</p>
      <p>Customer order:</p>
      <p>Purchase order type:</p>
      <p>Contract number:</p>
      <p>Purchasing contact:</p>
      <p>Transaction code:</p>
      <p>Buyers currency:</p>
      <p>Sellers currency:</p>
    </div>
  );
};

