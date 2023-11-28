import { get } from "lodash";
import { currencyUSDFormatter } from "presentation/utils";

import { ItemTable } from "../PurchaseOrderPage.styles";

interface Props {
  data: unknown;
}

const firstTransactionSet =
  "output.interchanges[0].groups[0].transaction_sets[0]";

function getProductsHeading(data: unknown) {
  const productList = get(
    data,
    `${firstTransactionSet}.heading.service_promotion_allowance_or_charge_information_SAC_loop`,
    []
  ) as Array<Record<string, unknown>>;

  const productHeading = productList.map((item) => {
    const description = get(
      item,
      `service_promotion_allowance_or_charge_information_SAC.description_15`
    ) as string;

    const itemDiscount = get(
      item,
      `service_promotion_allowance_or_charge_information_SAC.amount_05`
    ) as string;

    const discountValue = parseFloat(itemDiscount || "0").toFixed(2);

    return {
      description,
      discountValue,
    };
  });

  return productHeading;
}

export function KeHEAllowanceList(props: Props) {
  const products = getProductsHeading(props.data);

  let totalDiscount = 0;
  products.forEach((product) => {
    totalDiscount += parseFloat(product.discountValue);
  });

  return (
    <>
      {products.length ? (
        <ItemTable>
          <thead>
            <tr>
              <td>Sr. #</td>
              <td>Description</td>
              <td>Discount</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.description}</td>
                <td>
                  {currencyUSDFormatter(parseFloat(product.discountValue))}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2}>Total</td>
              <td>{currencyUSDFormatter(totalDiscount)}</td>
            </tr>
          </tbody>
        </ItemTable>
      ) : null}
    </>
  );
}

