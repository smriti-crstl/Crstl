import { get } from "lodash";

import { formatDate } from "../../edi-purchase-order/helpers";
import {
  firstTransactionSet,
  termBasisCodeToTextMap,
  termTypeCodeToTextMap,
} from "../constants";
import { ItemTable, ScrollableTableContainer } from "../styles";

interface PublicProps {
  data: any;
}

const getTermsData = (data: any) => {
  const termTypeCode = get(
    data,
    `${firstTransactionSet}.heading.terms_of_sale_G23[0].terms_type_code_01`,
    ""
  );
  const termType = termTypeCodeToTextMap[termTypeCode];

  const termBasisCode = get(
    data,
    `${firstTransactionSet}.heading.terms_of_sale_G23[0].terms_basis_date_code_02`,
    ""
  );
  const termBasis = termBasisCodeToTextMap[termBasisCode];

  const termDiscount = get(
    data,
    `${firstTransactionSet}.heading.terms_of_sale_G23[0].terms_discount_percent_05`,
    ""
  );

  const termDiscountDateStr = get(
    data,
    `${firstTransactionSet}.heading.terms_of_sale_G23[0].terms_discount_due_date_06`,
    ""
  );
  const termDiscountDate = formatDate(termDiscountDateStr);

  const termDiscountDays = get(
    data,
    `${firstTransactionSet}.heading.terms_of_sale_G23[0].terms_discount_days_due_07`,
    ""
  );

  const netDueDateStr = get(
    data,
    `${firstTransactionSet}.heading.terms_of_sale_G23[0].terms_net_due_date_08`,
    ""
  );
  const netDueDate = formatDate(netDueDateStr);

  const termNetDays = get(
    data,
    `${firstTransactionSet}.heading.terms_of_sale_G23[0].terms_net_days_09`,
    ""
  );

  return {
    termType,
    termBasis,
    termDiscount,
    termDiscountDate,
    termDiscountDays,
    netDueDate,
    termNetDays,
  };
};

// * Note: making this generic for now, but might need to update this to be more specific
export const GroceryInvoiceFreightInfo: React.FC<PublicProps> = ({ data }) => {
  const terms = getTermsData(data);

  return (
    <>
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
              <td>{terms.termDiscountDate}</td>
              <td>{terms.termDiscountDays}</td>
              <td>{terms.netDueDate}</td>
              <td>{terms.termNetDays}</td>
              <td></td>
            </tr>
          </tbody>
        </ItemTable>
      </ScrollableTableContainer>
    </>
  );
};

