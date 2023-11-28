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
  basic_01: "Basic [01]",
  receipt_of_goods_15: "Receipt of Goods [15]",
  delivery_date_2: "Delivery Date [2]",
};

const firstTransactionSet =
  "output.interchanges[0].groups[0].transaction_sets[0]";

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

function CVSFreight(props: Props) {
  const terms = getFreightTerms(props.data);
  return (
    <FreightTable>
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
          <strong>Term Disc Amount:</strong>
          <br />
        </td>
        <td>
          <strong>Disc. Due date:</strong>
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

export { CVSFreight };

