import { head } from "lodash";

import { getLineItemsFromObject } from "../edi/edi.utils";
import { POC_355_OPTIONS } from "./data/POC_355_options";
import { POC_670_OPTIONS } from "./data/POC_670_options";
import { getDisplayNameForCode } from "./helpers";
import {
  ItemTable,
  ScrollableTableContainer,
} from "./PurchaseOrderChangePage.styles";
import { Document } from "./types/UNFIJson860";

interface Props {
  data: Document | null;
}

export const UNFIProductList = (props: Props) => {
  const firstTransactionSet = head(
    props.data?.output?.interchanges?.[0]?.groups?.[0]?.transaction_sets
  );

  const detail = firstTransactionSet?.detail;

  const POC_loop = detail?.line_item_change_POC_loop;

  return (
    <>
      <ScrollableTableContainer>
        <ItemTable>
          <thead>
            <tr>
              <td>Line</td>
              <td>Change type</td>
              <td>SKU</td>
              <td>Vendor PN</td>
              <td>UPC/GTIN</td>
              <td>Description Line Item Comments</td>
              <td>Marks And Numbers</td>
              <td>Unit cost/Retail price</td>
              <td>Old Qty</td>
              <td>New Qty</td>
              <td>UOM</td>
            </tr>
          </thead>
          <tbody>
            {POC_loop?.map((poc_loop_item, index) => {
              const POC = poc_loop_item?.line_item_change_POC;
              const { sku, upc, vendor } = getLineItemsFromObject(POC);
              const uomCode =
                POC?.composite_unit_of_measure_05
                  ?.unit_or_basis_for_measurement_code_01;
              return (
                <tr key={index}>
                  <td></td>
                  <td>
                    {getDisplayNameForCode(
                      POC?.change_or_response_type_code_02,
                      POC_670_OPTIONS
                    )}
                  </td>
                  <td>{sku}</td>
                  <td>{vendor}</td>
                  <td>{upc}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{POC?.quantity_ordered_03}</td>
                  <td>{POC?.quantity_left_to_receive_04}</td>
                  <td>{getDisplayNameForCode(uomCode, POC_355_OPTIONS)}</td>
                </tr>
              );
            })}
          </tbody>
        </ItemTable>
      </ScrollableTableContainer>
      <ScrollableTableContainer>
        <ItemTable>
          <thead>
            <tr>
              <td>Type</td>
              <td>Service Type</td>
              <td>Percent</td>
              <td>Rate</td>
              <td>QTY</td>
              <td>UOM</td>
              <td>Description</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tbody>
        </ItemTable>
      </ScrollableTableContainer>
    </>
  );
};

