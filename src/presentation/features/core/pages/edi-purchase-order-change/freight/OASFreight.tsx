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
  prepaid_by_seller_PP: "Prepaid by Seller [PP]",
  destination_shipping_DE: "Destination [Shipping] [DE]",
  invoice_date_3: "Delivery Date [2]",
};

const firstTransactionSet =
  "output.interchanges[0].groups[0].transaction_sets[0]";

function getFreightData(data: unknown) {
  const fobPayCodeValue = get(
    data,
    `${firstTransactionSet}.heading.fob_related_instructions_FOB[0].shipment_method_of_payment_01`
  );
  const fobPayCode = codeToTextMapping[fobPayCodeValue] ?? "";

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

  return {
    fobPayCode,
    shippingCode,
    fobDescription,
    preferredCarrier,
  };
}

function getFreightTerms(data: unknown) {
  const firstTermsOfSaleSection = get(
    data,
    `${firstTransactionSet}.heading.terms_of_sale_deferred_terms_of_sale_ITD[0]`,
    {}
  );

  const termTypeCode = get(firstTermsOfSaleSection, "terms_type_code_01", "");
  const termType = codeToTextMapping[termTypeCode];

  const termBasisCode = get(
    firstTermsOfSaleSection,
    "terms_basis_date_code_02",
    ""
  );
  const termBasis = codeToTextMapping[termBasisCode];

  const termDiscount = get(
    firstTermsOfSaleSection,
    "terms_discount_percent_03",
    ""
  );

  const termDiscountDays = get(
    firstTermsOfSaleSection,
    "terms_discount_days_due_05",
    ""
  );

  const termNetDays = get(firstTermsOfSaleSection, "terms_net_days_07", "");

  return {
    termType,
    termBasis,
    termDiscount,
    termDiscountDays,
    termNetDays,
  };
}

function OASFreight(props: Props) {
  const freightData = getFreightData(props.data);
  const terms = getFreightTerms(props.data);
  return (
    <FreightTable>
      <tr>
        <td colSpan={7}>
          <p>
            <strong>Freight terms:</strong>
          </p>
          <p>
            <strong>FOB Pay code: </strong>
            {freightData.fobPayCode}
          </p>
          <p>
            <strong>FOB Location: </strong>
            {freightData.shippingCode}
          </p>
          {/* <p>
            <strong>FOB Description: </strong>
            {freightData.fobDescription}
          </p> */}
        </td>
        <td colSpan={2}>
          <p>Preferred Carrier:</p>
          <p>
            <strong>Carrier alpha code: </strong>
            {freightData.preferredCarrier}
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <strong>Term type:</strong>
          <br />
          {terms.termType}
        </td>
        <td>
          <strong>Term Basis:</strong>
          <br />
          {terms.termBasis}
        </td>
        <td>
          <strong>Term Disc %:</strong>
          <br />
          {terms.termDiscount}
        </td>
        <td>
          <strong>Term Disc amount:</strong>
          <br />
        </td>
        <td>
          <strong>Disc. due date:</strong>
          <br />
        </td>
        <td>
          <strong>Disc. days:</strong>
          <br />
          {terms.termDiscountDays}
        </td>
        <td>
          <strong>Net due date:</strong>
          <br />
        </td>
        <td>
          <strong>Net days:</strong>
          <br />
          {terms.termNetDays}
        </td>
        <td>
          <strong>Description:</strong>
          <br />
        </td>
      </tr>
    </FreightTable>
  );
}

export { OASFreight };

