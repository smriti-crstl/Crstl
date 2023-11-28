import {
  codeToTextMapping,
  firstTransactionSetNoOutput,
} from "globals/configs";
import { get } from "lodash";
import { currencyUSDFormatter } from "presentation/utils";

import { removeUserInput } from "../../edi-edit/helpers";
import {
  ItemTable,
  NoWrapDataCell,
  ScrollableTableContainer,
} from "../PurchaseOrderPage.styles";
import { Document } from "../types/TargetJson850";

interface Props {
  data?: Document;
}

function getProductsData(data?: Document) {
  const productList = get(
    data,
    `${firstTransactionSetNoOutput}.detail.baseline_item_data_PO1_loop`,
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

    const productDescription = get(
      item,
      `product_item_description_PID_loop[0].product_item_description_PID.description_05`
    ) as string;

    const quantityPerPack = get(
      item,
      `item_physical_details_PO4[0].pack_01`
    ) as string;

    const purchasePrice = get(
      item,
      `baseline_item_data_PO1.unit_price_04`
    ) as string;

    const retailPrice = get(
      item,
      `pricing_information_CTP_loop[0].pricing_information_CTP.unit_price_03`
    ) as string;

    const orderQuantity = get(
      item,
      `baseline_item_data_PO1.quantity_02`
    ) as string;

    const measurementUnitCode = get(
      item,
      `baseline_item_data_PO1.unit_or_basis_for_measurement_code_03`,
      ""
    ) as string;
    const measurementUnitName = codeToTextMapping[measurementUnitCode];

    const acknowledgementCode =
      codeToTextMapping[
        get(
          item,
          `line_item_acknowledgment_ACK_loop[0].line_item_acknowledgment_ACK.line_item_status_code_01`
        ) as string
      ];

    const reasonCode = get(
      item,
      `line_item_acknowledgment_ACK_loop[0].line_item_acknowledgment_ACK.request_reference_number_06`,
      ""
    ) as string;

    const quantityAcknowledged = removeUserInput(
      get(
        item,
        `line_item_acknowledgment_ACK_loop[0].line_item_acknowledgment_ACK.quantity_02`
      ) as string
    );

    const orderValue = (
      parseFloat(purchasePrice || "0") * parseFloat(quantityAcknowledged || "0")
    ).toFixed(2);

    const acknowledgementDate = removeUserInput(
      get(
        item,
        `line_item_acknowledgment_ACK_loop[0].line_item_acknowledgment_ACK.date_05`
      ) as string
    );

    const shipDateQualifier =
      codeToTextMapping[
        get(
          item,
          `line_item_acknowledgment_ACK_loop[0].date_time_reference_DTM.date_time_qualifier_01`
        ) as string
      ];
    const shipDate = removeUserInput(
      get(
        item,
        `line_item_acknowledgment_ACK_loop[0].date_time_reference_DTM.date_02`
      ) as string
    );

    return {
      lineNumber,
      buyerPart,
      productDescription,
      quantityPerPack,
      purchasePrice,
      retailPrice,
      orderQuantity,
      orderValue,
      quantityLeftToReceive: "",
      measurementUnitName,
      acknowledgementCode,
      reasonCode,
      quantityAcknowledged,
      acknowledgementDate,
      shipDateQualifier,
      shipDate,
    };
  });

  return productData;
}

function getProductSummary(data?: Document) {
  const firstSummaryTransactionSet = get(
    data,
    `${firstTransactionSetNoOutput}.summary.transaction_totals_CTT_loop[0]`,
    {}
  );

  const totalLine = get(
    firstSummaryTransactionSet,
    "transaction_totals_CTT.number_of_line_items_01",
    ""
  );

  const totalQty = get(
    firstSummaryTransactionSet,
    "transaction_totals_CTT.volume_05",
    ""
  );

  const totalPrice = get(
    firstSummaryTransactionSet,
    "monetary_amount_AMT.monetary_amount_02",
    ""
  );

  return {
    totalLine,
    totalQty,
    totalPrice,
  };
}

function KeHEProductListAck(props: Props) {
  const products = getProductsData(props.data);
  const summary = getProductSummary(props.data);

  let totalQuantity = 0;
  products.forEach((product) => {
    totalQuantity += parseFloat(product.orderQuantity);
  });

  return (
    <>
      <ScrollableTableContainer>
        <ItemTable>
          <thead>
            <tr>
              <td>Line #</td>
              <td>Vendor PN</td>
              <td>Description</td>
              <td>Unit cost</td>
              <td>Date</td>
              <td>Acknowledgement Code</td>
              <td>Reason</td>
              <td>Quantity</td>
              {/* <td>Qty left to receive</td> */}
              <td>Quantity Acknowledged</td>
              <td>UOM</td>
              <td>Item total</td>
            </tr>
          </thead>
          <tbody>
            {products.length
              ? products.map((product, index) => (
                  <tr key={`${product.lineNumber}-${product.buyerPart}`}>
                    <td>{product.lineNumber}</td>
                    <td>{product.buyerPart}</td>
                    <td>
                      <strong>Item detail:</strong> {product.productDescription}
                      <br />
                      <strong>Qty per Pack:</strong> {product.quantityPerPack}
                    </td>
                    <td>
                      <p>
                        <strong>Unit price:</strong>{" "}
                        {product.purchasePrice
                          ? currencyUSDFormatter(
                              parseFloat(product.purchasePrice)
                            )
                          : ""}
                      </p>
                    </td>
                    <NoWrapDataCell>
                      {product.acknowledgementDate}
                      {product.shipDate ? (
                        <>
                          <br />
                          <strong>{product.shipDateQualifier}: </strong>
                          {product.shipDate}
                        </>
                      ) : (
                        ""
                      )}
                    </NoWrapDataCell>
                    <td>{product.acknowledgementCode}</td>
                    <td>{product.reasonCode}</td>
                    <td>
                      <p>{product.orderQuantity}</p>
                    </td>
                    {/* <td>{product.quantityLeftToReceive}</td> */}
                    <td>{product.quantityAcknowledged}</td>
                    <td>{product.measurementUnitName}</td>
                    <td>
                      {product.orderValue
                        ? currencyUSDFormatter(parseFloat(product.orderValue))
                        : ""}
                    </td>
                  </tr>
                ))
              : null}
            <tr>
              <td>{summary.totalLine}</td>
              <td colSpan={5}># of Line items</td>
              <td>Merchandise Total</td>
              <td>{totalQuantity}</td>
              <td>
                {summary.totalPrice
                  ? currencyUSDFormatter(summary.totalPrice)
                  : ""}
              </td>
              <td></td>
            </tr>
          </tbody>
        </ItemTable>
      </ScrollableTableContainer>
    </>
  );
}

export { KeHEProductListAck };

