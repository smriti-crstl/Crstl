import { get } from "lodash";

import { getFallbackTextForCode } from "../../edi/edi.utils";
import {
  FreightTable,
  ItemTable,
  ScrollableTableContainer,
} from "../PurchaseOrderPage.styles";

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
  basic_01: "Basic [01]",
  delivery_date_2: "Delivery Date [2]",
  collect_CC: "Collect [CC]",
  basic_discount_offered_08: "Basic Discount Offered [08]",
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

  const routing = get(
    data,
    `${firstTransactionSet}.heading.carrier_details_routing_sequence_transit_time_TD5[0].routing_05`
  );

  const serviceLevelCodeValue = get(
    data,
    `${firstTransactionSet}.heading.carrier_details_routing_sequence_transit_time_TD5[0].service_level_code_12`
  );

  const serviceLevelCode =
    codeToTextMapping[serviceLevelCodeValue] ??
    getFallbackTextForCode(serviceLevelCodeValue);

  return {
    fobPayCode,
    shippingCode,
    fobDescription,
    preferredCarrier,
    routing,
    serviceLevelCode,
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

function MeijerFreight(props: Props) {
  const freightData = getFreightData(props.data);
  const terms = getFreightTerms(props.data);

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
                <strong>FOB Pay code: </strong>
                {freightData.fobPayCode}
              </p>
              <p>
                <strong>FOB Location: </strong>
                {freightData.shippingCode}
              </p>
              <p>
                <strong>FOB Description: </strong>
                {freightData.fobDescription}
              </p>
            </td>
            <td colSpan={2}>
              <p>Preferred Carrier:</p>
              {freightData.preferredCarrier && (
                <p>
                  <strong>Carrier alpha code: </strong>
                  {freightData.preferredCarrier}
                </p>
              )}
              {freightData.routing && (
                <p>
                  <strong>Routing: </strong>
                  {freightData.routing}
                </p>
              )}
              {freightData.serviceLevelCode && (
                <p>
                  <strong>Service level code: </strong>
                  {freightData.serviceLevelCode}
                </p>
              )}
            </td>
          </tr>
        </FreightTable>
      </ScrollableTableContainer>
      <ScrollableTableContainer>
        <ItemTable>
          <thead>
            <tr>
              <td>Term type:</td>
              <td>Term Basis:</td>
              <td>Term Disc %:</td>
              <td>Disc. Due date:</td>
              <td>Disc. days:</td>
              <td>Net due date:</td>
              <td>Net days:</td>
              <td>Description:</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{terms.termType}</td>
              <td>{terms.termBasis}</td>
              <td>{terms.termDiscount}</td>
              <td></td>
              <td>{terms.termDiscountDays}</td>
              <td></td>
              <td>{terms.termNetDays}</td>
              <td></td>
            </tr>
          </tbody>
        </ItemTable>
      </ScrollableTableContainer>
    </>
  );
}

export { MeijerFreight };

