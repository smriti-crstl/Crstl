import { get } from "lodash";
import { currencyUSDFormatter } from "presentation/utils";

import { ItemTableContainer } from "../../edi-purchase-order/PurchaseOrderPage.styles";
import { getLineItemsFromObject } from "../../edi/edi.utils";
import { ISS_355_02_OPTIONS } from "../data/ISS_355_02_options";
import { ItemTable } from "../InvoiceReadView.styles";
import { getCodeLabelFromOptions } from "./InvoiceReadViewFreight";

const firstTransactionSet = "interchanges[0].groups[0].transaction_sets[0]";

function getProductsData(data: unknown) {
  const productList = get(
    data,
    `${firstTransactionSet}.detail.baseline_item_data_invoice_IT1_loop`,
    []
  ) as Array<Record<string, unknown>>;

  const productData = productList.map((item) => {
    const lineNumber = get(
      item,
      `baseline_item_data_invoice_IT1.assigned_identification_01`,
      ""
    ) as string;
    const vendorPart = get(
      item,
      `baseline_item_data_invoice_IT1.product_service_id_09`,
      ""
    ) as string;
    const { sku: buyerPart, upc: service } = getLineItemsFromObject(
      item.baseline_item_data_invoice_IT1
    );

    const productDescription = "";

    const purchasePrice = get(
      item,
      `baseline_item_data_invoice_IT1.unit_price_04`
    ) as number;

    const uomCode = get(
      item,
      `baseline_item_data_invoice_IT1.unit_or_basis_for_measurement_code_03`
    ) as string;

    const uom = getCodeLabelFromOptions(ISS_355_02_OPTIONS, uomCode);

    const retailPrice = get(
      item,
      `pricing_information_CTP_loop[0].pricing_information_CTP.unit_price_03`
    ) as string;

    const orderQuantity = get(
      item,
      `baseline_item_data_invoice_IT1.quantity_invoiced_02`
    ) as number;

    const orderValue = get(
      data,
      `${firstTransactionSet}.summary.transaction_totals_CTT_loop[0].transaction_totals_CTT.hash_total_02`
    ) as string;

    return {
      lineNumber,
      buyerPart,
      vendorPart,
      service,
      productDescription,
      purchasePrice,
      retailPrice,
      orderQuantity,
      uom,
      orderValue,
    };
  });

  return productData;
}

function getProductSummary(data: unknown) {
  const totalPrice = get(
    data,
    `${firstTransactionSet}.summary.total_monetary_value_summary_TDS.amount_01`,
    ""
  ) as string;

  const shipmentLoop = get(
    data,
    `${firstTransactionSet}.summary.invoice_shipment_summary_ISS_loop[0]`,
    []
  ) as Record<string, string>;

  const totalQty = get(
    shipmentLoop,
    `invoice_shipment_summary_ISS.number_of_units_shipped_01`,
    ""
  ) as string;

  const uomCode = get(
    shipmentLoop,
    `invoice_shipment_summary_ISS.unit_or_basis_for_measurement_code_02`,
    ""
  ) as string;

  const uom = getCodeLabelFromOptions(ISS_355_02_OPTIONS, uomCode);

  return {
    totalPrice,
    totalQty,
    uom,
  };
}

function InvoiceReadViewProductList({
  data,
  additionalData,
}: {
  data: unknown;
  additionalData: any;
}) {
  const products = getProductsData(data);
  const summary = getProductSummary(data);

  products.forEach((product) => {
    const meta = additionalData?.productDetails.find(
      (e: any) => product?.service === e?.productId
    );
    product.productDescription = meta?.productDescription || "";
  });

  return (
    <>
      <ItemTableContainer>
        <ItemTable>
          <thead>
            <tr>
              <td>Line #</td>
              <td>SKU</td>
              <td>Vendor PN</td>
              <td>UPC/GTIN/EAN</td>
              <td>Description</td>
              <td>Unit cost</td>
              <td>Qty Invoiced</td>
              <td>UOM</td>
              <td>Gross Price</td>
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
                    <td>{product.service}</td>
                    <td>{product.productDescription}</td>
                    <td>
                      {product.purchasePrice
                        ? currencyUSDFormatter(product.purchasePrice)
                        : null}
                    </td>
                    <td>{product.orderQuantity}</td>
                    <td>{product.uom}</td>
                    <td>
                      {product.orderQuantity * product.purchasePrice > 0
                        ? currencyUSDFormatter(
                            product.orderQuantity * product.purchasePrice
                          )
                        : null}
                    </td>
                  </tr>
                ))
              : null}
            <tr>
              <td colSpan={8}>Merchandise Total:</td>
              <td>
                {summary.totalPrice
                  ? currencyUSDFormatter(parseFloat(summary.totalPrice))
                  : null}
              </td>
            </tr>
          </tbody>
        </ItemTable>
        <ItemTable>
          <thead>
            <tr>
              <td>
                Total Qty: {summary.totalQty}
                {parseInt(summary.totalQty) > 1
                  ? `${summary.uom}s`
                  : summary.uom}
              </td>
            </tr>
          </thead>
        </ItemTable>
      </ItemTableContainer>
    </>
  );
}

export { InvoiceReadViewProductList };
