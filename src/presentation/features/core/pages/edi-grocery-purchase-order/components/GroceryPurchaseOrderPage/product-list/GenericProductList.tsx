import { codeToTextMapping } from "globals/configs";
import { get, toNumber } from "lodash";
import {
  ItemTable,
  ScrollableTableContainer,
} from "presentation/features/core/pages/edi-purchase-order/PurchaseOrderPage.styles";
import { currencyUSDFormatter } from "presentation/utils";

import { firstTransactionSet } from "../../../constants";

interface PublicProps {
  data: any;
}

const getLineItemData = (lineItemData: any) => {
  const itemListCost = get(
    lineItemData,
    "line_item_detail_product_G68.item_list_cost_03",
    "0"
  );

  const quantity = toNumber(
    get(lineItemData, "line_item_detail_product_G68.quantity_ordered_01", "0")
  );

  const uomVal = get(
    lineItemData,
    "line_item_detail_product_G68.unit_or_basis_for_measurement_code_02"
  );
  const uom = codeToTextMapping[uomVal];

  const itemTotal = quantity * toNumber(itemListCost);

  const upc = get(
    lineItemData,
    "line_item_detail_product_G68.upc_case_code_04"
  );

  const productServiceId =
    get(lineItemData, "line_item_detail_product_G68.product_service_id_06") ??
    get(lineItemData, "line_item_detail_product_G68.product_service_id_08");

  return {
    itemListCost,
    quantity,
    uom,
    itemTotal,
    upc,
    productServiceId,
  };
};

const getSummary = (data: any) => {
  const quantity = get(
    data,
    `${firstTransactionSet}.summary.total_purchase_order_G76.quantity_ordered_01`
  );
  const quantityUomCode = get(
    data,
    `${firstTransactionSet}.summary.total_purchase_order_G76.unit_or_basis_for_measurement_code_02`
  );
  const quantityUom = codeToTextMapping[quantityUomCode];

  const weight = get(
    data,
    `${firstTransactionSet}.summary.total_purchase_order_G76.weight_03`
  );
  const weightUomCode = get(
    data,
    `${firstTransactionSet}.summary.total_purchase_order_G76.unit_or_basis_for_measurement_code_04`
  );
  const weightUom = codeToTextMapping[weightUomCode];

  const volume = get(
    data,
    `${firstTransactionSet}.summary.total_purchase_order_G76.volume_05`
  );
  const volumeUomCode = get(
    data,
    `${firstTransactionSet}.summary.total_purchase_order_G76.unit_or_basis_for_measurement_code_06`
  );
  const volumeUom = codeToTextMapping[volumeUomCode];

  const totalAmount = toNumber(
    get(
      data,
      `${firstTransactionSet}.summary.total_purchase_order_G76.amount_08`,
      "0"
    )
  );

  return {
    quantity,
    quantityUom,
    weight,
    weightUom,
    volume,
    volumeUom,
    totalAmount,
  };
};

export const GenericProductList: React.FC<PublicProps> = ({ data }) => {
  const productLoop = get(
    data,
    `${firstTransactionSet}.detail.line_item_detail_product_G68_loop`,
    []
  );

  const lineItems = productLoop.map(getLineItemData);

  const subTotal = lineItems.reduce(
    (acc: number, product: any) => acc + product?.itemTotal ?? 0,
    0
  );

  const summary = getSummary(data);

  return (
    <>
      <ScrollableTableContainer>
        <ItemTable>
          <thead>
            <tr>
              <td>Line #</td>
              <td>SKU</td>
              <td>UPC</td>
              <td>Unit cost/Retail price</td>
              <td>Quantity</td>
              <td>UOM</td>
              <td>Item total</td>
            </tr>
          </thead>
          <tbody>
            {lineItems?.map((productData: any, index: number) => {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <strong>Product/Service ID:</strong>{" "}
                      {productData?.productServiceId}
                    </td>
                    <td>{productData?.upc}</td>
                    <td>
                      Unit Price:{" "}
                      {productData?.itemListCost
                        ? currencyUSDFormatter(
                            parseFloat(productData.itemListCost)
                          )
                        : null}
                    </td>
                    <td>{productData?.quantity}</td>
                    <td>{productData?.uom}</td>
                    <td>
                      {productData?.itemTotal
                        ? currencyUSDFormatter(productData.itemTotal)
                        : null}
                    </td>
                  </tr>
                </>
              );
            })}
            <tr>
              <td>{lineItems.length}</td>
              <td colSpan={3}># of Line Items</td>
              <td>{summary?.quantity}</td>
              <td></td>
              <td>
                {subTotal ? currencyUSDFormatter(parseFloat(subTotal)) : null}
              </td>
            </tr>
          </tbody>
        </ItemTable>
      </ScrollableTableContainer>
      <ScrollableTableContainer>
        <ItemTable>
          <tr>
            <td>
              Total Qty: {summary.quantity} {summary.quantityUom}
            </td>
            <td>
              Weight: {summary.weight} {summary.weightUom}
            </td>
            <td>
              Volume: {summary.volume} {summary.volumeUom}
            </td>
            <td>
              Purchase Order Total: {currencyUSDFormatter(summary.totalAmount)}
            </td>
          </tr>
        </ItemTable>
      </ScrollableTableContainer>
    </>
  );
};

