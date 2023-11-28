import { codeToTextMapping } from "globals/configs";
import { get } from "lodash";
import { currencyUSDFormatter } from "presentation/utils";

import { formatDate } from "../../../edi-purchase-order/helpers";
import {
  ItemTable,
  ScrollableTableContainer,
} from "../../../edi-purchase-order/PurchaseOrderPage.styles";
import {
  getLineItemDatesFromObject,
  getLineItemsFromObject,
} from "../../../edi/edi.utils";
import {
  firstTransactionSet,
  responseCodeToTextMapping,
} from "../../constants";

interface PublicProps {
  data: unknown;
}

const getLineItemData = (lineItemData: any) => {
  const lineNumber = get(
    lineItemData,
    "line_item_change_POC.assigned_identification_01"
  );

  const { upc, sku, buyersItemNo, vendor } = getLineItemsFromObject(
    lineItemData?.line_item_change_POC
  );

  const {
    requestedDate,
    approvalDate,
    shippedDate,
    currentScheduledShipDate,
  } = getLineItemDatesFromObject(
    lineItemData?.line_item_schedule_SCH_loop?.[0]?.line_item_schedule_SCH
  );

  const description = get(
    lineItemData,
    "product_item_description_PID_loop[0].product_item_description_PID.description_05"
  );

  const unitCost = get(lineItemData, "line_item_change_POC.unit_price_06");

  const changeOrResponseCode = get(
    lineItemData,
    "line_item_change_POC.change_or_response_type_code_02"
  );
  const changeOrResponseCodeText =
    responseCodeToTextMapping[changeOrResponseCode] ?? changeOrResponseCode;

  const qtyOrdered = get(
    lineItemData,
    "line_item_change_POC.quantity_ordered_03"
  );

  const qtyAcknowledged = get(
    lineItemData,
    "line_item_change_POC.quantity_left_to_receive_04"
  );

  const itemCost = (
    parseFloat(unitCost || "0") * parseFloat(qtyAcknowledged || "0")
  ).toFixed(2);

  const uomCode = get(
    lineItemData,
    "line_item_change_POC.composite_unit_of_measure_05.unit_or_basis_for_measurement_code_01"
  );
  const uom = codeToTextMapping[uomCode] ?? uomCode;

  return {
    lineNumber,
    upc,
    sku,
    buyersItemNo,
    vendor,
    description,
    unitCost,
    changeOrResponseCodeText,
    qtyOrdered,
    qtyAcknowledged,
    requestedDate,
    approvalDate,
    shippedDate,
    currentScheduledShipDate,
    uom,
    itemCost,
  };
};

export const GenericProductList: React.FC<PublicProps> = ({ data }) => {
  const productLoop = get(
    data,
    `${firstTransactionSet}.detail.line_item_change_POC_loop`,
    []
  );

  const lineItems = productLoop.map(getLineItemData);

  const { totalQuantity, totalAmount } = lineItems.reduce(
    (acc: { totalQuantity: number; totalAmount: number }, item: any) => {
      return {
        totalQuantity: acc.totalQuantity + parseFloat(item.qtyAcknowledged),
        totalAmount: acc.totalAmount + parseFloat(item.itemCost),
      };
    },
    { totalQuantity: 0, totalAmount: 0 }
  );

  return (
    <>
      <ScrollableTableContainer>
        <ItemTable>
          <thead>
            <tr>
              <td>Line #</td>
              <td>SKU</td>
              <td>Vendor PN</td>
              <td>UPC/GTIN</td>
              <td>Description</td>
              <td>Unit cost</td>
              <td>Date</td>
              <td>Change/Response Code</td>
              <td>Quantity</td>
              <td>Quantity Acknowledged</td>
              <td>UOM</td>
              <td>Item total</td>
            </tr>
          </thead>
          <tbody>
            {lineItems?.map((productData: any) => {
              return (
                <>
                  <tr>
                    <td>{productData.lineNumber}</td>
                    <td>{productData.sku}</td>
                    <td>{productData.vendor}</td>
                    <td>{productData.upc}</td>
                    <td>{productData.description}</td>
                    <td>
                      <p>
                        <strong>Unit price:</strong>{" "}
                        {productData.unitCost
                          ? currencyUSDFormatter(
                              parseFloat(productData.unitCost)
                            )
                          : ""}
                      </p>
                    </td>
                    <td>
                      {productData.requestedDate ? (
                        <>
                          <strong>Requested Date: </strong>
                          {formatDate(productData.requestedDate)}
                          <br />
                        </>
                      ) : (
                        ""
                      )}
                      {productData.approvalDate ? (
                        <>
                          <strong>Approved Date: </strong>
                          {formatDate(productData.approvalDate)}
                          <br />
                        </>
                      ) : (
                        ""
                      )}
                      {productData.shippedDate ? (
                        <>
                          <strong>Shipped Date: </strong>
                          {formatDate(productData.shippedDate)}
                          <br />
                        </>
                      ) : (
                        ""
                      )}
                      {productData.currentScheduledShipDate ? (
                        <>
                          <strong>Current Scheduled Ship Date: </strong>
                          <br />
                          {formatDate(productData.currentScheduledShipDate)}
                          <br />
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>{productData.changeOrResponseCodeText}</td>
                    <td>{productData.qtyOrdered}</td>
                    <td>{productData.qtyAcknowledged}</td>
                    <td>{productData.uom}</td>
                    <td>
                      {productData.itemCost
                        ? currencyUSDFormatter(parseFloat(productData.itemCost))
                        : ""}
                    </td>
                  </tr>
                </>
              );
            })}
            <tr>
              <td>{lineItems?.length}</td>
              <td colSpan={6}># of Line items</td>
              <td>Merchandise Total</td>
              <td>{totalQuantity}</td>
              <td></td>
              <td>{totalAmount ? currencyUSDFormatter(totalAmount) : ""}</td>
            </tr>
          </tbody>
        </ItemTable>
      </ScrollableTableContainer>
    </>
  );
};
