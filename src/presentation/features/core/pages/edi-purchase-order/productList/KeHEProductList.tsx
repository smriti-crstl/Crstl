import { get } from "lodash";
import { currencyUSDFormatter } from "presentation/utils";

import { ItemTable } from "../PurchaseOrderPage.styles";

interface Props {
  data: unknown;
}

const firstTransactionSet =
  "output.interchanges[0].groups[0].transaction_sets[0]";

const codeToTextMapping: Record<string, string> = {
  original_00: "Original [00]",
  stand_alone_order_SA: "Stand Alone [SA]",
  defined_by_buyer_and_seller_DF: "Defined by Buyer and Seller [DF]",
  origin_shipping_point_OR: "Origin[Shipping Point] [OR]",
  upc_consumer_package_code_1_5_5_1_UP: "UPC",
  upc_consumer_package_code_1_5_5_UI: "UPC",
  case_CA: "Case",
};

function getProductsData(data: unknown) {
  const productList = get(
    data,
    `${firstTransactionSet}.detail.baseline_item_data_PO1_loop`,
    []
  ) as Array<Record<string, unknown>>;

  const productData = productList.map((item) => {
    const lineNumber = get(
      item,
      `baseline_item_data_PO1.assigned_identification_01`,
      ""
    ) as string;
    const buyerPart = get(
      item,
      `baseline_item_data_PO1.product_service_id_07`,
      ""
    ) as string;

    const productDescription = get(
      item,
      `product_item_description_PID_loop[0].product_item_description_PID.description_05`
    ) as string;

    const quantityPerPack = get(
      item,
      `item_physical_details_PO4[0].pack_01`
    ) as string;

    const purchasePrice = get(
      item,
      `baseline_item_data_PO1.unit_price_04`
    ) as string;

    const retailPrice = get(
      item,
      `pricing_information_CTP_loop[0].pricing_information_CTP.unit_price_03`
    ) as string;

    const orderQuantity = get(
      item,
      `baseline_item_data_PO1.quantity_02`
    ) as string;

    const orderValue = (
      parseFloat(purchasePrice || "0") * parseFloat(orderQuantity || "0")
    ).toFixed(2);

    const itemDiscount = get(
      item,
      `service_promotion_allowance_or_charge_information_SAC_loop[0].service_promotion_allowance_or_charge_information_SAC.amount_05`
    ) as string;

    const discountValue = parseFloat(itemDiscount || "0").toFixed(2);

    const measurementUnitCode = get(
      item,
      `baseline_item_data_PO1.unit_or_basis_for_measurement_code_03`,
      ""
    ) as string;
    const measurementUnitName = codeToTextMapping[measurementUnitCode];
    return {
      lineNumber,
      buyerPart,
      productDescription,
      quantityPerPack,
      purchasePrice,
      retailPrice,
      orderQuantity,
      orderValue,
      quantityLeftToReceive: "",
      measurementUnitName,
      discountValue,
    };
  });

  return productData;
}

function getProductSummary(data: unknown) {
  const firstSummaryTransactionSet = get(
    data,
    `${firstTransactionSet}.summary.transaction_totals_CTT_loop[0]`,
    {}
  );

  const totalLine = get(
    firstSummaryTransactionSet,
    "transaction_totals_CTT.number_of_line_items_01",
    ""
  );

  const totalQty = get(
    firstSummaryTransactionSet,
    "transaction_totals_CTT.volume_05",
    ""
  );

  const totalPrice = get(
    firstSummaryTransactionSet,
    "monetary_amount_information_AMT.monetary_amount_02",
    ""
  );

  return {
    totalLine,
    totalQty,
    totalPrice,
  };
}

function KeHEProductList(props: Props) {
  const products = getProductsData(props.data);
  const summary = getProductSummary(props.data);

  let totalQuantity = 0;
  products.forEach((product) => {
    totalQuantity += parseFloat(product.orderQuantity);
  });

  return (
    <ItemTable>
      <thead>
        <tr>
          <td>Line #</td>
          <td>Vendor PN</td>
          <td>Description</td>
          <td>Unit cost</td>
          <td>Quantity</td>
          <td>Qty left to receive</td>
          <td>UOM</td>
          <td>Discount</td>
          <td>Item total</td>
        </tr>
      </thead>
      <tbody>
        {products.length
          ? products.map((product, index) => (
              <tr key={`${product.lineNumber}-${product.buyerPart}`}>
                <td>{index + 1}</td>
                <td>{product.buyerPart}</td>
                <td>
                  <strong>Item detail:</strong> {product.productDescription}
                  <br />
                  <strong>Qty per Pack:</strong> {product.quantityPerPack}
                </td>
                <td>
                  <p>
                    <strong>Unit price: </strong>
                    {product.purchasePrice
                      ? currencyUSDFormatter(parseFloat(product.purchasePrice))
                      : ""}
                  </p>
                </td>
                <td>
                  <p>{product.orderQuantity}</p>
                </td>
                <td>{product.quantityLeftToReceive}</td>
                <td>{product.measurementUnitName}</td>
                <td>
                  {parseFloat(product.discountValue)
                    ? currencyUSDFormatter(parseFloat(product.discountValue))
                    : ""}
                </td>
                <td>
                  {product.orderValue
                    ? currencyUSDFormatter(
                        parseFloat(product.orderValue) -
                          parseFloat(product.discountValue)
                      )
                    : ""}
                </td>
              </tr>
            ))
          : null}
        <tr>
          <td>{summary.totalLine}</td>
          <td colSpan={2}># of Line items</td>
          <td>Merchandise Total</td>
          <td>{totalQuantity}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>{currencyUSDFormatter(parseFloat(summary.totalPrice))}</td>
        </tr>
      </tbody>
    </ItemTable>
  );
}

export { KeHEProductList };

