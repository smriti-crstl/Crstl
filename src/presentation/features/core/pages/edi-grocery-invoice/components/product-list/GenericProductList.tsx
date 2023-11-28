import { codeToTextMapping } from "globals/configs";
import { get, toNumber } from "lodash";
import { currencyUSDFormatter } from "presentation/utils";

import { firstTransactionSet } from "../../constants";
import { ItemTable, ScrollableTableContainer } from "../../styles";

interface PublicProps {
  data: any;
}

const getLineItemData = (lineItemData: any) => {
  const itemListCost = get(
    lineItemData,
    "item_detail_invoice_G17.item_list_cost_03",
    "0"
  );

  const quantityInvoiced = toNumber(
    get(lineItemData, "item_detail_invoice_G17.quantity_invoiced_01", "0")
  );

  const uomVal = get(
    lineItemData,
    "item_detail_invoice_G17.unit_or_basis_for_measurement_code_02"
  );
  const uom = codeToTextMapping[uomVal];

  const itemTotal = quantityInvoiced * toNumber(itemListCost);

  const upc = get(lineItemData, "item_detail_invoice_G17.upc_case_code_04");

  const productServiceId = get(
    lineItemData,
    "item_detail_invoice_G17.product_service_id_06"
  );

  return {
    itemListCost,
    quantityInvoiced,
    uom,
    itemTotal,
    upc,
    productServiceId,
  };
};

const getSummary = (data: any) => {
  const quantity = get(
    data,
    `${firstTransactionSet}.summary.total_invoice_quantity_G31.number_of_units_shipped_01`,
    "0"
  );

  const quantityUomCode = get(
    data,
    `${firstTransactionSet}.summary.total_invoice_quantity_G31.unit_or_basis_for_measurement_code_02`,
    ""
  );
  const uom = codeToTextMapping[quantityUomCode];

  const totalInvoiceAmount = get(
    data,
    `${firstTransactionSet}.summary.total_dollars_summary_G33.amount_01`,
    "0"
  );

  return {
    quantity,
    uom,
    totalInvoiceAmount,
  };
};

export const GenericProductList: React.FC<PublicProps> = ({ data }) => {
  const productLoop = get(
    data,
    `${firstTransactionSet}.detail.item_detail_invoice_G17_loop`,
    []
  );

  const lineItems = productLoop.map(getLineItemData);
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
              <td>Unit cost</td>
              <td>Qty Invoiced</td>
              <td>UOM</td>
              <td>Item total</td>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((productData: any, index: number) => {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{productData?.productServiceId}</td>
                    <td>{productData?.upc}</td>
                    <td>
                      {productData?.itemListCost
                        ? currencyUSDFormatter(
                            parseFloat(productData.itemListCost)
                          )
                        : null}
                    </td>
                    <td>{productData?.quantityInvoiced}</td>
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
              <td colSpan={6}>Merchandise Total:</td>
              <td>
                {summary?.totalInvoiceAmount
                  ? currencyUSDFormatter(summary?.totalInvoiceAmount)
                  : null}
              </td>
            </tr>
          </tbody>
        </ItemTable>
      </ScrollableTableContainer>
      <ScrollableTableContainer>
        <ItemTable>
          <thead>
            <td>
              Total Qty: {summary.quantity} {summary.uom}
            </td>
          </thead>
        </ItemTable>
      </ScrollableTableContainer>
    </>
  );
};

