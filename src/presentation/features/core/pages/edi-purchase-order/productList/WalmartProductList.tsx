import { get } from "lodash";
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
  case_CA: "Case",
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
      `baseline_item_data_PO1.product_service_id_07`,
      ""
    ) as string;
    const vendorPart = get(
      item,
      `baseline_item_data_PO1.product_service_id_11`,
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

    const gtin = get(item, `baseline_item_data_PO1.product_service_id_23`);

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
      gtin,
      totalPrice,
      quantityPerPack,
      measurementUnitName,
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

  const totalPrice = get(
    firstSummaryTransactionSet,
    "monetary_amount_information_AMT.monetary_amount_02",
    ""
  );

  return {
    totalLine,
    totalPrice,
  };
}

function WalmartProductList(props: Props) {
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
            <td>UOM</td>
          </tr>
        </thead>
        <tbody>
          {products.length
            ? products.map((product) => (
                <tr
                  key={`${product.lineNumber}-${product.buyerPart}-${product.vendorPart}`}
                >
                  <td>{product.lineNumber}</td>
                  <td>{product.buyerPart}</td>
                  <td>{product.vendorPart}</td>
                  <td>
                    {product.service}
                    {product.gtin && (
                      <>
                        <br />
                        <p>
                          <strong>GTIN: </strong> {product.gtin}
                        </p>
                      </>
                    )}
                  </td>
                  <td>
                    <strong>Product Size: </strong> NA
                    <br />
                    <strong>Product Color: </strong> NA
                  </td>
                  <td>
                    <p>
                      <strong>Purchase price:</strong> {product.purchasePrice}{" "}
                      LE
                    </p>
                    <p>
                      <strong>Extended total:</strong> {product.totalPrice}
                    </p>
                  </td>
                  <td>
                    <p>{product.quantityPerPack}</p>
                  </td>
                  <td>{product.measurementUnitName}</td>
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
            <td>Total qty</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{summary.totalLine}</td>
            <td></td>
            <td></td>
            <td>{summary.totalPrice}</td>
            <td></td>
          </tr>
        </tbody>
      </ItemTable>
    </>
  );
}

export { WalmartProductList };

