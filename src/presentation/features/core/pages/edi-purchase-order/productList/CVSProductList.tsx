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
  purchasers_item_code_PI: "UPC",
  case_CA: "Case [CA]",
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
      `baseline_item_data_PO1.product_service_id_11`,
      ""
    ) as string;
    const vendorPart = get(
      item,
      `baseline_item_data_PO1.product_service_id_09`,
      ""
    ) as string;
    const serviceNameId = get(
      item,
      `baseline_item_data_PO1.product_service_id_qualifier_10`,
      ""
    ) as string;
    const serviceName = codeToTextMapping[serviceNameId] ?? "";
    const serviceId = get(
      item,
      `baseline_item_data_PO1.product_service_id_07`,
      ""
    ) as string;
    const service = (
      <>
        <strong>{serviceName}:</strong>
        {serviceId}
      </>
    );

    const productDescription = get(
      item,
      `item_physical_details_PO4[0].pack_01`
    ) as string;

    const purchasePrice = get(
      item,
      `baseline_item_data_PO1.unit_price_04`
    ) as string;

    const retailPrice = get(item, `period_amount_PAM[0].quantity_02`) as string;

    const orderQty = get(
      item,
      `baseline_item_data_PO1.quantity_ordered_02`
    ) as string;

    const measurementUnitCode = get(
      item,
      `baseline_item_data_PO1.unit_or_basis_for_measurement_code_03`,
      ""
    ) as string;
    const measurementUnitName = codeToTextMapping[measurementUnitCode];

    const itemTotal = parseFloat(purchasePrice) * parseFloat(orderQty);

    return {
      lineNumber,
      buyerPart,
      vendorPart,
      service,
      productDescription,
      purchasePrice,
      retailPrice,
      orderQty,
      measurementUnitName,
      itemTotal,
    };
  });

  return productData;
}

function getProductSummary(data: unknown) {
  const productList = get(
    data,
    `${firstTransactionSet}.detail.baseline_item_data_PO1_loop`,
    []
  ) as Array<Record<string, unknown>>;

  const retailPriceList = productList.map((item: any) => {
    const qtyStr = get(item, "baseline_item_data_PO1.quantity_ordered_02", "0");
    const qty = parseFloat(qtyStr);

    const itemCostStr = get(item, "baseline_item_data_PO1.unit_price_04", "0");
    const itemCost = parseFloat(itemCostStr);

    const itemTotal = qty * itemCost;

    return itemTotal.toString();
  }) as Array<string>;

  const totalPrice = retailPriceList.reduce((acc, current) => {
    const parsedNumber = Number(current);
    if (!isNaN(parsedNumber)) {
      return acc + parsedNumber;
    }
    return acc;
  }, 0);

  const qtyList = productList.map((item) =>
    get(item, `baseline_item_data_PO1.quantity_ordered_02`)
  ) as Array<string>;

  const totalQty = qtyList.reduce((acc, current) => {
    const parsedNumber = Number(current);
    if (!isNaN(parsedNumber)) {
      return acc + parsedNumber;
    }
    return acc;
  }, 0);

  const totalLine = productList.length;

  return {
    totalLine,
    totalWeight: "",
    totalVolume: "",
    totalPrice,
    netSalesAmount: "",
    totalTermsDiscountAmount: "",
    totalQty: totalQty,
  };
}

function CVSProductList(props: Props) {
  const products = getProductsData(props.data);
  const summary = getProductSummary(props.data);

  return (
    <>
      <ItemTable>
        <thead>
          <tr>
            <td>Line #</td>
            <td>Buyer part #</td>
            <td>Vendor part #</td>
            <td>UPC/GTIN/EAN</td>
            <td>Description</td>
            <td>Marks & numbers</td>
            <td>Unit cost</td>
            <td>Quantity</td>
            <td>UOM</td>
            <td>Item Total</td>
          </tr>
        </thead>
        <tbody>
          {products.length
            ? products.map((product, index) => (
                <tr
                  key={`${product.lineNumber}-${product.buyerPart}-${product.vendorPart}`}
                >
                  <td>{index + 1}</td>
                  <td>{product.buyerPart}</td>
                  <td>{product.vendorPart}</td>
                  <td>{product.service}</td>
                  <td>
                    {product.productDescription
                      ? `Pack ${product.productDescription}`
                      : ""}
                  </td>
                  <td></td>
                  <td>
                    <p>
                      <strong>Purchase price:</strong>
                      {product.purchasePrice
                        ? currencyUSDFormatter(
                            parseFloat(product.purchasePrice)
                          )
                        : null}
                      [01]
                    </p>
                    {/* <p>
                      <strong>Extended item total:</strong>{" "}
                      {product.retailPrice}
                    </p> */}
                  </td>
                  <td>
                    <p>{product.orderQty} </p>
                  </td>
                  <td>{product.measurementUnitName}</td>
                  <td>
                    {product.itemTotal
                      ? currencyUSDFormatter(product.itemTotal)
                      : null}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </ItemTable>
      <ItemTable>
        <thead>
          <tr>
            <td>Total Line #</td>
            <td>Total Weight</td>
            <td>Total Volume</td>
            <td>Total Amount</td>
            <td>Total net sales amount</td>
            <td>Total terms discount amount</td>
            <td>Total qty</td>
          </tr>
        </thead>
        <tbody>
          <td>{summary.totalLine}</td>
          <td>{summary.totalWeight}</td>
          <td>{summary.totalVolume}</td>
          <td>{currencyUSDFormatter(summary.totalPrice)}</td>
          <td>
            {summary.netSalesAmount
              ? currencyUSDFormatter(parseFloat(summary.netSalesAmount))
              : ""}
          </td>
          <td>
            {summary.totalTermsDiscountAmount
              ? currencyUSDFormatter(
                  parseFloat(summary.totalTermsDiscountAmount)
                )
              : ""}
          </td>
          <td>{summary.totalQty}</td>
        </tbody>
      </ItemTable>
    </>
  );
}

export { CVSProductList };

