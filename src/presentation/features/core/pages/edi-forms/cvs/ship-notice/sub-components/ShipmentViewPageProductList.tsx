import { ASNProductDetail } from "domain/entity/edi/models";
import { get } from "lodash";

import { ItemTable } from "../../../../edi-purchase-order/PurchaseOrderPage.styles";

const firstTransactionSet = "interchanges[0].groups[0].transaction_sets[0]";

type KVPair = {
  [key: string]: string;
};

const uomMap: KVPair = {
  each_EA: "Each",
  case_CA: "Case",
  pound_LB: "Pound",
};

const getProductsData = (data: unknown): any[] => {
  const packList = get(
    data,
    `${firstTransactionSet}.detail.hierarchical_level_HL_P_loop`,
    []
  ) as Array<Record<string, unknown>>;

  const itemList = get(
    data,
    `${firstTransactionSet}.detail.hierarchical_level_HL_I_loop`,
    []
  ) as Array<Record<string, unknown>>;

  const containerIds: string[] = [];
  packList.forEach((pack) => {
    const containerId = get(
      pack,
      `marks_and_numbers_MAN[0].marks_and_numbers_02`
    ) as string;

    containerIds.push(containerId);
  });

  const productData = itemList.map((item, index) => {
    const lineNumber = get(
      item,
      `item_identification_LIN.assigned_identification_01`,
      ""
    ) as string;
    const sku = get(
      item,
      `item_identification_LIN.product_service_id_05`,
      ""
    ) as string;
    const vendorPn = get(
      item,
      `item_identification_LIN.product_service_id_03`,
      ""
    ) as string;
    const quantityShipped = get(
      item,
      `item_detail_shipment_SN1.number_of_units_shipped_02`
    ) as string;
    const physicalDetails = get(
      item,
      `item_physical_details_PO4.pack_01`
    ) as string;

    const eom =
      uomMap[
        get(
          item,
          `item_detail_shipment_SN1.unit_or_basis_for_measurement_code_03`
        ) as string
      ];

    const containerId = containerIds[index];

    return {
      lineNumber,
      sku,
      vendorPn,
      quantityShipped,
      physicalDetails,
      eom,
      containerId,
    };
  });

  return productData;
};

const ShipmentViewPageProductList = ({
  data,
  productDetails,
}: {
  data: unknown;
  productDetails: ASNProductDetail[];
}) => {
  const products = getProductsData(data);

  const orderObject = get(
    data,
    `${firstTransactionSet}.detail.hierarchical_level_HL_order`,
    {}
  );

  const orderNumber = get(
    orderObject,
    `purchase_order_reference_PRF.purchase_order_number_01`
  );

  const locationStoreNumber = get(
    orderObject,
    `name_N1_loop[0].name_N1.identification_code_04`
  );
  return (
    <>
      <ItemTable>
        <thead>
          <tr>
            <td>Line#</td>
            <td>Order#</td>
            <td>Location/Store#</td>
            <td>Container ID</td>
            <td>SKU</td>
            <td>
              Vendor PN
              <br />
              UPC
              <br />
              GTIN
            </td>
            <td>Description</td>
            <td>QTY Shipped</td>
            <td>QTY per Pack</td>
            <td>UOM</td>
          </tr>
        </thead>
        <tbody style={{ whiteSpace: "pre-line" }}>
          {products.length
            ? products.map((product) => (
                <tr key={`${product.lineNumber}`}>
                  <td>{product.lineNumber}</td>
                  <td>{orderNumber}</td>
                  <td>{locationStoreNumber}</td>
                  <td>{product.containerId}</td>
                  <td>{product.sku}</td>
                  <td>{product.vendorPn}</td>
                  <td>
                    <strong>Product: </strong>
                    {`${
                      productDetails.find(
                        (detail) => detail.sku === product.sku
                      )?.productDescription || ""
                    }\n`}
                    <strong>Pack Qty: </strong>
                    {`${product.quantityShipped}`}
                  </td>
                  <td>{product.quantityShipped}</td>
                  <td>{product.physicalDetails}</td>
                  <td>{product.eom}</td>
                </tr>
              ))
            : null}
        </tbody>
      </ItemTable>
    </>
  );
};

export default ShipmentViewPageProductList;
