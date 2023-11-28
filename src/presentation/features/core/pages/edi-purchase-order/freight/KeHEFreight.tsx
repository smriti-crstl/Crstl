import { get } from "lodash";
import { FreightTable } from "../PurchaseOrderPage.styles";

interface Props {
  data: unknown;
}

const firstTransactionSet =
  "output.interchanges[0].groups[0].transaction_sets[0]";

function getFreightTerms(data: unknown) {
  const firstTermsOfSaleSection = get(
    data,
    `${firstTransactionSet}.heading.terms_of_sale_deferred_terms_of_sale_ITD[0]`,
    {}
  );

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
    termType: "",
    termBasis: "",
    termDiscount,
    termDiscountDays,
    termNetDays,
  };
}

function KeHEFreight(props: Props) {
  const terms = getFreightTerms(props.data);
  return (
    <FreightTable>
      <tr>
        <td colSpan={6}>
          <p>
            <strong>Freight terms:</strong>
          </p>
          <p>
            <strong>Prepaid (by seller): </strong>
          </p>
        </td>
        <td colSpan={2}>
          <p>Preferred Carrier:</p>
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

export { KeHEFreight };
