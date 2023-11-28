import { get, toNumber } from "lodash";
import { currencyUSDFormatter } from "presentation/utils";

import { getLineItemsFromObject } from "../../edi/edi.utils";
import { POC_355_OPTIONS } from "../data/POC_355_options";
import { TD5_133_OPTIONS } from "../data/TD5_133_options";
import { getDisplayNameForCode } from "../helpers";
import {
  ItemTable,
  ScrollableTableContainer,
} from "../PurchaseOrderPage.styles";

interface Props {
  data?: unknown;
}

const firstTransactionSet =
  "output.interchanges[0].groups[0].transaction_sets[0]";

function getProductsData(data: unknown) {
  const productList = get(
    data,
    `${firstTransactionSet}.detail.baseline_item_data_PO1_loop`,
    []
  ) as Array<Record<string, unknown>>;

  const productData = productList.map((item) => {
    const unitOfMeasure = get(
      item,
      "baseline_item_data_PO1.unit_or_basis_for_measurement_code_03",
      ""
    ) as string;
    const qty = get(item, "baseline_item_data_PO1.quantity_02", "") as string;
    const price = get(
      item,
      "baseline_item_data_PO1.unit_price_04",
      ""
    ) as string;

    const lineNumber = get(
      item,
      `baseline_item_data_PO1.assigned_identification_01`,
      ""
    ) as string;
    const unitPrice = get(
      item,
      `baseline_item_data_PO1.unit_price_04`,
      ""
    ) as string;
    const quantity = get(
      item,
      `baseline_item_data_PO1.quantity_02`,
      ""
    ) as string;

    const { upc, sku, buyersItemNo, vendor } = getLineItemsFromObject(
      item["baseline_item_data_PO1"]
    );

    const description = get(
      item,
      `product_item_description_PID_loop[0].product_item_description_PID.description_05`,
      ""
    ) as string;

    const innerPack = get(
      item,
      `item_physical_details_PO4[0].pack_01`,
      ""
    ) as string;

    const uom = getDisplayNameForCode(unitOfMeasure, POC_355_OPTIONS);
    const itemQty = toNumber(qty);
    const itemPrice = toNumber(price);
    const itemTotalUnsafe = itemQty * itemPrice;
    const itemTotal = isNaN(itemTotalUnsafe) ? null : itemTotalUnsafe;

    return {
      upc,
      sku,
      buyersItemNo,
      vendor,
      lineNumber,
      unitPrice,
      quantity,
      uom,
      itemTotal,
      description,
      innerPack,
    };
  });

  return productData;
}

function getProductSummary(data: unknown) {
  const numberOfLines = get(
    data,
    `${firstTransactionSet}.summary.transaction_totals_CTT_loop[0].transaction_totals_CTT.number_of_line_items_01`,
    []
  ) as string;

  const hashTotal = get(
    data,
    `${firstTransactionSet}.summary.transaction_totals_CTT_loop[0].transaction_totals_CTT.hash_total_02`,
    []
  ) as string;

  const td5 = get(
    data,
    `${firstTransactionSet}.heading.carrier_details_routing_sequence_transit_time_TD5.[0].routing_sequence_code_01`,
    []
  ) as string;

  return {
    numberOfLines,
    hashTotal,
    td5,
  };
}

function MeijerProductList(props: Props) {
  const products = getProductsData(props.data);
  const summary = getProductSummary(props.data);
  const subTotalUnsafe = products?.reduce((acc, item) => {
    const itemTotal = item?.itemTotal ?? 0;
    return acc + itemTotal;
  }, 0);

  const subTotal = subTotalUnsafe?.toFixed(2);

  return (
    <>
      <ScrollableTableContainer>
        <ItemTable>
          <thead>
            <tr>
              <td>Line</td>
              <td>SKU</td>
              <td>Vendor PN</td>
              <td>UPC/GTIN</td>
              <td>Description Line Item Comments</td>
              <td>Marks and Numbers</td>
              <td>Unit cost/Retail price</td>
              <td>Quantity</td>
              <td>UOM</td>
              <td>Item Total</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.lineNumber}</td>
                  <td>
                    {product.sku ? (
                      <>
                        <strong>Buyers Catalog Number: </strong>
                        {product.sku}
                        <br />
                      </>
                    ) : null}
                    {product.buyersItemNo ? (
                      <>
                        <strong>Buyers Item Number: </strong>
                        {product.buyersItemNo}
                        <br />
                      </>
                    ) : null}
                  </td>
                  <td>
                    {product.vendor ? (
                      <>
                        <strong>Vendor Style Number: </strong>
                        {product.vendor}
                        <br />
                      </>
                    ) : null}
                  </td>
                  <td>{product.upc}</td>
                  <td>
                    {product.description ? (
                      <>
                        <strong>Product: </strong>
                        {product.description}
                        <br />
                      </>
                    ) : null}
                    {product.innerPack ? (
                      <>
                        <strong># of Inners: </strong>
                        {product.innerPack}
                        <br />
                      </>
                    ) : null}
                  </td>
                  <td></td>
                  <td>
                    {product.unitPrice ? (
                      <>
                        <strong>Unit Price: </strong>
                        {currencyUSDFormatter(parseFloat(product.unitPrice))}
                        <br />
                      </>
                    ) : null}
                  </td>
                  <td>{product.quantity}</td>
                  <td>{product.uom}</td>
                  <td>
                    {product.itemTotal
                      ? currencyUSDFormatter(
                          parseFloat(product.itemTotal?.toFixed(2))
                        )
                      : ""}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>{summary.numberOfLines}</td>
              <td colSpan={5}># of Line Items</td>
              <td>Merchandise Total</td>
              <td>{summary.hashTotal}</td>
              <td></td>
              <td>
                {subTotal ? currencyUSDFormatter(parseFloat(subTotal)) : ""}
              </td>
            </tr>
          </tbody>
        </ItemTable>
      </ScrollableTableContainer>
      <p>Allowance, Charges and Tax Information</p>
      <ScrollableTableContainer>
        <ItemTable>
          <thead>
            <tr>
              <td>Type</td>
              <td>Service Type</td>
              <td>Percent</td>
              <td>Rate</td>
              <td>Qty</td>
              <td>UOM</td>
              <td>Description</td>
              <td>Amount</td>
            </tr>
          </thead>
        </ItemTable>
      </ScrollableTableContainer>
      <p>Notes/Comments/Special Instructions</p>
      <p>{getDisplayNameForCode(summary.td5, TD5_133_OPTIONS)}</p>
      <ScrollableTableContainer>
        <ItemTable>
          <tr>
            <td>Total Qty: {summary.hashTotal}</td>
            <td>Weight:</td>
            <td>Volume:</td>
            <td>Purchase Order Total</td>
            <td>
              {subTotal ? currencyUSDFormatter(parseFloat(subTotal)) : ""}
            </td>
          </tr>
        </ItemTable>
      </ScrollableTableContainer>
    </>
  );
}

export { MeijerProductList };

