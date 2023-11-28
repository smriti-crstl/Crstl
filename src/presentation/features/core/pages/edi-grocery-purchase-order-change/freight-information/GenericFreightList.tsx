import { codeToTextMapping } from "globals/configs";
import { get } from "lodash";

import {
  FreightTable,
  ScrollableTableContainer,
} from "../../edi-purchase-order/PurchaseOrderPage.styles";
import { firstTransactionSet } from "../constants";

interface PublicProps {
  data: any;
}

const getFreightData = (data: any) => {
  const methodOfPaymentCode = get(
    data,
    `${firstTransactionSet}.heading.transportation_instructions_G66.shipment_method_of_payment_01`
  );
  const methodOfPayment = codeToTextMapping[methodOfPaymentCode];

  const transportationMethodTypeCode = get(
    data,
    `${firstTransactionSet}.heading.transportation_instructions_G66.transportation_method_type_code_02`
  );
  const transportationMethodType =
    codeToTextMapping[transportationMethodTypeCode];

  return {
    methodOfPayment,
    transportationMethodType,
  };
};

export const GenericFreight: React.FC<PublicProps> = ({ data }) => {
  const freightInfo = getFreightData(data);
  return (
    <>
      <ScrollableTableContainer>
        <FreightTable>
          <tr>
            <td colSpan={6}>
              <p>
                <strong>Freight terms:</strong>
              </p>
              <p>
                <strong>Method of payment: </strong>
                {freightInfo.methodOfPayment}
              </p>
            </td>
            <td colSpan={2}>
              <p>
                <strong>Preferred carrier:</strong>
              </p>
              <p>
                <strong>Transportation method type: </strong>
                {freightInfo.transportationMethodType}
              </p>
            </td>
          </tr>
        </FreightTable>
      </ScrollableTableContainer>
    </>
  );
};

