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
  upc_ean_case_code_2_5_5_UA: "UPC",
  each_EA: "Each [EA]",
  case_CA: "Case [CA]",
};

function getProductsData(data: unknown) {
  const productList = get(
    data,
    `${firstTransactionSet}.detail.baseline_item_data_PO1_loop`,
    []
  ) as Array<Record<string, unknown>>;

  const productData = productList.map((item) => {
    const upc = get(
      item,
      `baseline_item_data_PO1.product_service_id_07`,
      ""
    ) as string;

    const productDescription = get(
      item,
      `product_item_description_PID_loop[0].product_item_description_PID.description_05`
    ) as string;

    const purchasePrice = get(
      item,
      `baseline_item_data_PO1.unit_price_04`
    ) as string;

    const orderQuantity = get(
      item,
      `baseline_item_data_PO1.quantity_ordered_02`
    ) as string;

    const orderValue = (
      parseFloat(purchasePrice || "0") * parseFloat(orderQuantity || "0")
    ).toFixed(1);

    const measurementUnitCode = get(
      item,
      `baseline_item_data_PO1.unit_or_basis_for_measurement_code_03`,
      ""
    ) as string;

    const measurementUnitName = codeToTextMapping[measurementUnitCode];

    return {
      upc,
      productDescription,
      purchasePrice,
      orderQuantity,
      orderValue,
      quantityLeftToReceive: "",
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

  return {
    totalLine,
  };
}

function CoreMarkProductList(props: Props) {
  const products = getProductsData(props.data);
  const summary = getProductSummary(props.data);

  let totalQuantity = 0;
  let totalPrice = 0;
  products.forEach((product) => {
    totalQuantity += parseFloat(product.orderQuantity);
    totalPrice += parseFloat(product.orderValue);
  });

  return (
    <>
      <ItemTable>
        <thead>
          <tr>
            <td>Line #</td>
            <td>UPC</td>
            <td>Description</td>
            <td>Unit cost</td>
            <td>Quantity</td>
            <td>Qty left to receive</td>
            <td>UOM</td>
            <td>Item total</td>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr key={product.upc}>
              <td>{index + 1}</td>
              <td>{product.upc}</td>
              <td>
                <strong>Item detail:</strong> {product.productDescription}
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
                {product.orderValue
                  ? currencyUSDFormatter(parseFloat(product.orderValue))
                  : ""}
              </td>
            </tr>
          ))}
          <tr>
            <td>{summary.totalLine}</td>
            <td colSpan={2}># of Line items</td>
            <td>Merchandise Total</td>
            <td>{totalQuantity}</td>
            <td></td>
            <td></td>
            <td>{currencyUSDFormatter(parseFloat(`${totalPrice}`))}</td>
          </tr>
        </tbody>
      </ItemTable>
    </>
  );
}

export { CoreMarkProductList };

