import { get } from "lodash";
import { currencyUSDFormatter } from "presentation/utils";

import { getCodeName } from "../helpers";
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
    const indicator = get(
      item,
      `service_promotion_allowance_or_charge_information_SAC.allowance_or_charge_indicator_01`
    ) as string;

    const description = get(
      item,
      `service_promotion_allowance_or_charge_information_SAC.description_15`
    ) as string;

    const handlingCode = get(
      item,
      `service_promotion_allowance_or_charge_information_SAC.allowance_or_charge_method_of_handling_code_12`
    ) as string;

    const itemDiscount = get(
      item,
      `service_promotion_allowance_or_charge_information_SAC.amount_05`
    ) as string;

    const discountValue = parseFloat(itemDiscount || "0").toFixed(2);

    const indicatorCodeName = getCodeName(indicator);

    const handlingCodeName = getCodeName(handlingCode);

    return {
      indicatorCodeName,
      description,
      handlingCodeName,
      discountValue,
    };
  });

  return productHeading;
}

export function GenericAllowanceList(props: Props) {
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
              <td>Indicator</td>
              <td>Handling code</td>
              <td>Discount</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.description}</td>
                <td>{product.indicatorCodeName}</td>
                <td>{product.handlingCodeName}</td>
                <td>
                  {currencyUSDFormatter(parseFloat(product.discountValue))}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3}>Total</td>
              <td>{currencyUSDFormatter(totalDiscount)}</td>
            </tr>
          </tbody>
        </ItemTable>
      ) : null}
    </>
  );
}

