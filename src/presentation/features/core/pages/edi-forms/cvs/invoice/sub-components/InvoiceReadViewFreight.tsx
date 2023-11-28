import { get } from "lodash";

import { ITD_336_01_OPTIONS } from "../data/ITD_336_01_options";
import { FreightTable, ItemTable } from "../InvoiceReadView.styles";

const codeToTextMapping: Record<string, string> = {
  original_00: "Original [00]",
  stand_alone_order_SA: "Stand Alone [SA]",
  defined_by_buyer_and_seller_DF: "Defined by Buyer and Seller [DF]",
  origin_shipping_point_OR: "Origin[Shipping Point] [OR]",
  upc_consumer_package_code_1_5_5_1_UP: "UPC",
  upc_consumer_package_code_1_5_5_UI: "UPC",
  basic_01: "Basic",
  delivery_date_2: "Delivery Date",
};

export function getSafeCodeName(fieldValue?: string) {
  const delimitedCodeName = fieldValue?.split("_");
  const [safeCodeName] = delimitedCodeName?.reverse() ?? [];
  return safeCodeName ?? "";
}

export const getCodeLabelFromOptions = (
  options: any,
  _value: string
): string => {
  const value = getSafeCodeName(_value);
  const selectedOption = options.find((option: any) => option.value === value);
  return selectedOption?.label;
};

const firstTransactionSet = "interchanges[0].groups[0].transaction_sets[0]";

function getFreightTerms(data: unknown) {
  const firstTermsOfSaleSection = get(
    data,
    `${firstTransactionSet}.heading.terms_of_sale_deferred_terms_of_sale_ITD[0]`,
    {}
  );

  const termTypeCode = get(firstTermsOfSaleSection, "terms_type_code_01", "");

  const termType = getCodeLabelFromOptions(ITD_336_01_OPTIONS, termTypeCode);

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

  return {
    termType,
    termBasis,
    termDiscount,
    termDiscountDays,
  };
}

function getFreightData(data: unknown) {
  const carrierCode = get(
    data,
    `${firstTransactionSet}.summary.carrier_detail_CAD.standard_carrier_alpha_code_04`,
    ""
  );

  const carrierReferenceNumber = get(
    data,
    `${firstTransactionSet}.summary.carrier_detail_CAD.reference_identification_08`,
    ""
  );

  return {
    carrierCode,
    carrierReferenceNumber,
  };
}

function InvoiceReadViewFreight({ data }: { data: unknown }) {
  const freightData = getFreightData(data);
  const terms = getFreightTerms(data);
  return (
    <>
      <FreightTable>
        <tr>
          <td colSpan={6}>
            <p>
              <strong>Freight terms:</strong>
            </p>
          </td>
          <td colSpan={2}>
            <p>
              <strong>Freight terms:</strong>
            </p>
            <p>
              {freightData.carrierCode}
              <br />
              Carrier Reference Number: {freightData.carrierReferenceNumber}
            </p>
          </td>
        </tr>
      </FreightTable>
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
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </ItemTable>
    </>
  );
}

export { InvoiceReadViewFreight };
