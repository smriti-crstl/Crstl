import { find, get } from "lodash";
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
  ucc_12_UP: "UPC",
  upc_consumer_package_code_1_5_5_1_UP: "UPC",
  upc_consumer_package_code_1_5_5_UI: "UPC",
  case_CA: "Case [CA]",
  each_EA: "Each [EA]",
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
      `baseline_item_data_PO1.product_service_id_09`,
      ""
    ) as string;
    const vendorPart = get(
      item,
      `baseline_item_data_PO1.product_service_id_07`,
      ""
    ) as string;
    const serviceNameId = get(
      item,
      `baseline_item_data_PO1.product_service_id_qualifier_08`,
      ""
    ) as string;
    const serviceName = codeToTextMapping[serviceNameId] ?? "";
    const serviceId = get(
      item,
      `baseline_item_data_PO1.product_service_id_09`,
      ""
    ) as string;
    const service = (
      <>
        <strong>{serviceName}:</strong>
        {serviceId}
      </>
    );

    const upc = get(item, `baseline_item_data_PO1.product_service_id_13`);
    const gtin = get(item, `baseline_item_data_PO1.product_service_id_15`);

    const productDescription = get(
      item,
      `product_item_description_PID_loop[0].product_item_description_PID.description_05`
    ) as string;

    const purchasePrice = get(
      item,
      `baseline_item_data_PO1.unit_price_04`
    ) as string;

    const retailPrice = get(
      item,
      `pricing_information_CTP_loop[0].pricing_information_CTP.unit_price_03`
    ) as string;

    const totalPrice = get(
      item,
      `monetary_amount_information_AMT_loop[0].monetary_amount_information_AMT.monetary_amount_02`
    ) as string;

    const orderQuantity = get(
      data,
      `${firstTransactionSet}.summary.transaction_totals_CTT_loop[0].transaction_totals_CTT.number_of_line_items_01`
    ) as string;

    const orderValue = get(
      data,
      `${firstTransactionSet}.summary.transaction_totals_CTT_loop[0].transaction_totals_CTT.hash_total_02`
    ) as string;

    const quantityPerPack = get(
      item,
      `item_physical_details_PO4[0].pack_01`
    ) as string;

    const measurementUnitCode = get(
      item,
      `baseline_item_data_PO1.unit_or_basis_for_measurement_code_03`,
      ""
    ) as string;
    const measurementUnitName = codeToTextMapping[measurementUnitCode];

    const quantityOrdered = get(
      item,
      `baseline_item_data_PO1.quantity_ordered_02`,
      ""
    );

    return {
      lineNumber,
      buyerPart,
      vendorPart,
      service,
      productDescription,
      purchasePrice,
      retailPrice,
      orderQuantity,
      orderValue,
      upc,
      gtin,
      totalPrice,
      quantityPerPack,
      measurementUnitName,
      quantityOrdered,
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

  const transactionTotals = get(
    data,
    `${firstTransactionSet}.summary.transaction_totals_CTT_loop`
  ) as Array<Record<string, unknown>>;

  const monetaryAmountReference = find(transactionTotals, {
    monetary_amount_AMT: {
      amount_qualifier_code_01: "total_transaction_amount_TT",
    },
  });

  const totalPrice = get(
    monetaryAmountReference,
    `monetary_amount_AMT.monetary_amount_02`
  ) as string;

  const totalLine = productList.length;

  return {
    totalLine,
    totalWeight: "",
    totalVolume: "",
    totalPrice,
    netSalesAmount: "",
    totalTermsDiscountAmount: "",
    totalQty: totalLine,
  };
}

function OASProductList(props: Props) {
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
            <td>Unit cost</td>
            <td>Quantity</td>
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
                  <td>
                    {product.upc && (
                      <>
                        <strong>UPC: </strong> {product.upc}
                        <br />
                        <strong>UPC case code: </strong> {product.upc}
                      </>
                    )}
                    {product.gtin && (
                      <>
                        <br />
                        <strong>GTIN: </strong> {product.gtin}
                      </>
                    )}
                  </td>
                  <td>
                    <strong>**Product or item descriptions**</strong>
                    <br />
                    <strong>Product description: </strong>{" "}
                    {product.productDescription}
                  </td>
                  <td>
                    <p>
                      <strong>Purchase price:</strong> {product.purchasePrice}
                    </p>
                  </td>
                  <td>
                    <p>
                      <strong>Order Qty:</strong> {product.quantityOrdered}{" "}
                      {product.measurementUnitName}
                    </p>
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
          <td>{summary.totalPrice}</td>
          <td>{summary.netSalesAmount}</td>
          <td>{summary.totalTermsDiscountAmount}</td>
          <td>{summary.totalQty}</td>
        </tbody>
      </ItemTable>
    </>
  );
}

export { OASProductList };

