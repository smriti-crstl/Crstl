import { firstTransactionSetNoOutput } from "globals/configs";
import { get, toNumber } from "lodash";
import moment from "moment";
import { currencyUSDFormatter } from "presentation/utils";

import {
  getLineItemDatesFromObject,
  getLineItemsFromObject,
} from "../../edi/edi.utils";
import { POC_355_OPTIONS } from "../data/POC_355_options";
import { TD5_133_OPTIONS } from "../data/TD5_133_options";
import { getDisplayNameForCode } from "../helpers";
import {
  ItemTable,
  ScrollableTableContainer,
} from "../PurchaseOrderPage.styles";

interface Props {
  data: unknown;
}

export const CrateAndBarrelProductListAck: React.FC<Props> = ({ data }) => {
  const firstTransactionSet = get(data, firstTransactionSetNoOutput);

  const heading = firstTransactionSet?.heading;
  const detail = firstTransactionSet?.detail;
  const summary = firstTransactionSet?.summary;

  const PO1_Loop = detail?.baseline_item_data_PO1_loop;

  const PO1_Data = PO1_Loop?.map((po1_loop_item: any) => {
    const PO1: any = po1_loop_item?.baseline_item_data_PO1;

    const { upc, sku, buyersItemNo, vendor } = getLineItemsFromObject(PO1);

    PO1.upc = upc;
    PO1.sku = sku;
    PO1.buyersItemNo = buyersItemNo;
    PO1.vendor = vendor;

    const PID =
      po1_loop_item?.product_item_description_PID_loop?.[0]
        ?.product_item_description_PID;

    const PO4 = po1_loop_item?.item_physical_details_PO4?.[0];

    const CTP_Loop = po1_loop_item?.pricing_information_CTP_loop;
    const CTP = CTP_Loop?.[0]?.pricing_information_CTP;

    const uom = getDisplayNameForCode(
      PO1?.unit_or_basis_for_measurement_code_03,
      POC_355_OPTIONS
    );

    const itemQty = toNumber(PO1?.quantity_ordered_02 || PO1?.quantity_02);
    const itemPrice = toNumber(PO1?.unit_price_04);
    const itemTotalUnsafe = itemQty * itemPrice;
    const itemTotal = isNaN(itemTotalUnsafe) ? null : itemTotalUnsafe;

    const SCH_loop = po1_loop_item?.line_item_schedule_SCH_loop;
    const SCH = SCH_loop?.[0]?.line_item_schedule_SCH;

    const { requestedDate, approvalDate } = getLineItemDatesFromObject(SCH);

    return {
      PO1,
      PID,
      PO4,
      CTP,
      uom,
      itemTotal,
      itemTotalFixed: itemTotal?.toFixed(2),
      requestedDate,
      approvalDate,
    };
  });

  const CTT_Loop = summary?.transaction_totals_CTT_loop;
  const CTT = CTT_Loop?.[0]?.transaction_totals_CTT;
  const TD5 = heading?.carrier_details_routing_sequence_transit_time_TD5?.[0];

  const subTotalUnsafe = PO1_Data?.reduce((acc: any, item: any) => {
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
            {PO1_Data?.map((po1_loop_item: any, index: number) => {
              const {
                PO1,
                PID,
                PO4,
                CTP,
                uom,
                itemTotalFixed,
                requestedDate,
                approvalDate,
              } = po1_loop_item;

              return (
                <tr key={index}>
                  <td>{PO1?.assigned_identification_01}</td>
                  <td>
                    <strong>Buyers Catalog Number:</strong> {PO1?.sku}
                    <br />
                    <strong>Buyers Item Number:</strong> {PO1?.buyersItemNo}
                  </td>
                  <td>
                    <strong>Vendor Style Number:</strong>
                    <br />
                    {PO1?.vendor}
                  </td>
                  <td>{PO1?.upc}</td>
                  <td>
                    <strong>Product:</strong> {PID?.description_05}
                    <br />
                    <strong># of Inners:</strong> {PO4?.inner_pack_14}
                  </td>
                  <td></td>
                  <td>
                    Unit Price:
                    {PO1?.unit_price_04
                      ? currencyUSDFormatter(parseFloat(PO1?.unit_price_04))
                      : ""}
                    <br />
                    Resale Price:
                    {CTP?.unit_price_03
                      ? currencyUSDFormatter(parseFloat(CTP?.unit_price_03))
                      : ""}
                    <br />
                    Wholesale Price per {uom}
                  </td>
                  <td>
                    {PO1?.quantity_ordered_02 || PO1?.quantity_02}
                    {requestedDate ? (
                      <>
                        <br />
                        <strong>Requested Date: </strong>
                        {moment(requestedDate).format("MM/DD/YYYY")}
                      </>
                    ) : (
                      ""
                    )}
                    {approvalDate ? (
                      <>
                        <br />
                        <strong>Approved Date: </strong>
                        {moment(approvalDate).format("MM/DD/YYYY")}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>{uom}</td>
                  <td>
                    {itemTotalFixed
                      ? currencyUSDFormatter(parseFloat(itemTotalFixed))
                      : ""}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>{CTT?.number_of_line_items_01}</td>
              <td colSpan={5}># of Line Items</td>
              <td>Merchandise Total</td>
              <td>{CTT?.hash_total_02}</td>
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
      <p>
        {getDisplayNameForCode(TD5?.routing_sequence_code_01, TD5_133_OPTIONS)}
      </p>
      <ScrollableTableContainer>
        <ItemTable>
          <tr>
            <td>Total Qty: {CTT?.hash_total_02}</td>
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
};

