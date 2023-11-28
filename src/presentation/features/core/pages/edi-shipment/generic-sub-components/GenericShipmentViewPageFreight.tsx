import { get } from "lodash";

import { removeUserInput } from "../../edi-edit/helpers";
import { FreightTable } from "../ShipmentPage.styles";

const GenericShipmentViewPageFreight = ({ data }: { data: unknown }) => {
  const firstTransactionSet = "interchanges[0].groups[0].transaction_sets[0]";
  const fob: { [key: string]: string } = get(
    data,
    `${firstTransactionSet}.detail.HL_loop_shipment[0].fob_related_instructions_FOB`
  );
  const freightTermsMap = {
    PP: "Prepaid (by Seller)",
    DE: "Destination (Shipping)",
  };
  return (
    <FreightTable>
      <tr>
        <td>
          FOB Information:
          {`\n`}
          {fob?.shipment_method_of_payment_01 ? (
            <>
              Freight Terms:{" "}
              {freightTermsMap[fob?.shipment_method_of_payment_01 || ""]}
              {`\t\t`}
            </>
          ) : null}
          {fob?.location_qualifier_02 ? (
            <>
              FOB: {freightTermsMap[fob?.location_qualifier_02 || ""]}
              {`\t\t`}
            </>
          ) : null}
          {fob?.location_qualifier_02 ? (
            <>
              Location: {removeUserInput(fob?.description_03)}
              {`\t\t`}
            </>
          ) : null}
        </td>
        <td>Special Handling: </td>
      </tr>
    </FreightTable>
  );
};

export default GenericShipmentViewPageFreight;

