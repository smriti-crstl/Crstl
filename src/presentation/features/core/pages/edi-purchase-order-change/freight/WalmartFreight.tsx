import { get } from "lodash";

import { FreightTable } from "../PurchaseOrderChangePage.styles";

interface Props {
  data: unknown;
}

const codeToTextMapping: Record<string, string> = {
  original_00: "Original [00]",
  stand_alone_order_SA: "Stand Alone [SA]",
  defined_by_buyer_and_seller_DF: "Defined by Buyer and Seller [DF]",
  origin_shipping_point_OR: "Origin[Shipping Point] [OR]",
  upc_consumer_package_code_1_5_5_1_UP: "UPC",
  upc_consumer_package_code_1_5_5_UI: "UPC",
  collect_CC: "Collect [CC]",
};

const firstTransactionSet =
  "output.interchanges[0].groups[0].transaction_sets[0]";

function getFreightData(data: unknown) {
  const fobPayCodeValue = get(
    data,
    `${firstTransactionSet}.heading.fob_related_instructions_FOB[0].shipment_method_of_payment_01`
  );
  const fobPayCode = codeToTextMapping[fobPayCodeValue] ?? "";

  const heading = get(data, `${firstTransactionSet}.heading`, {});

  const shippingCodeValue = get(
    data,
    `${firstTransactionSet}.heading.fob_related_instructions_FOB[0].location_qualifier_02`
  );
  const shippingCode = codeToTextMapping[shippingCodeValue] ?? "";

  const fobDescription = get(
    data,
    `${firstTransactionSet}.heading.fob_related_instructions_FOB[0].description_03`
  );

  const preferredCarrier = get(
    data,
    `${firstTransactionSet}.heading.carrier_details_routing_sequence_transit_time_TD5[0].identification_code_03`
  );

  const careerRouting = get(
    data,
    `${firstTransactionSet}.heading.carrier_details_routing_sequence_transit_time_TD5[0].routing_05`,
    ""
  );

  return {
    fobPayCode,
    shippingCode,
    fobDescription,
    preferredCarrier,
    careerRouting,
  };
}

function WalmartFreight(props: Props) {
  const freightData = getFreightData(props.data);
  return (
    <FreightTable>
      <tr>
        <td colSpan={6}>
          <p>
            <strong>Freight terms:</strong>
          </p>
          <p>
            <strong>FOB Pay code: </strong>
            {freightData.fobPayCode}
          </p>
        </td>
        <td colSpan={2}>
          <p>Preferred Carrier:</p>
          <p>
            <strong>Carrier routing: </strong>
            {freightData.careerRouting}
          </p>
        </td>
      </tr>
    </FreightTable>
  );
}

export { WalmartFreight };

