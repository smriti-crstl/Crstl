import { ASNProductDetail } from "domain/entity/edi/models";
import { compact, get, groupBy, reduce, sum } from "lodash";
import { getSafeNumber } from "presentation/utils";
import React from "react";

import { formatDate } from "../../edi-invoice/sub-components";
import {
  ItemTable,
  ItemTableContainer,
} from "../../edi-purchase-order/PurchaseOrderPage.styles";
import { getLineItemsFromObject } from "../../edi/edi.utils";

const firstTransactionSet = "interchanges[0].groups[0].transaction_sets[0]";

type KVPair = {
  [key: string]: string;
};

const uomMap: KVPair = {
  each_EA: "Each",
  case_CA: "Case",
  pound_LB: "Pound",
  EA: "Each",
  CA: "Case",
  LB: "Pound",
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

    const { sku, upc: vendorPn } = getLineItemsFromObject(
      item.item_identification_LIN
    );
    const quantityShipped = get(
      item,
      `item_detail_shipment_SN1.number_of_units_shipped_02`
    ) as string;
    const physicalDetails = get(
      item,
      `item_physical_details_PO4.pack_01`
    ) as string;

    const innerPack = get(
      item,
      `item_physical_details_PO4.inner_pack_14`
    ) as string;

    const eom =
      uomMap[
        get(
          item,
          `item_detail_shipment_SN1.unit_or_basis_for_measurement_code_03`
        ) as string
      ];

    const containerId = containerIds[index];

    let formattedExpirationDate = "";
    const dtm = get(item, `date_time_reference_DTM`);
    if (Array.isArray(dtm)) {
      const expirationDateItem = dtm?.find((item) => {
        return (
          item.date_time_qualifier_01 === "expiration_036" ||
          item.date_time_qualifier_01 === "_036"
        );
      });

      const expirationDate = get(expirationDateItem, `date_02`) as string;

      formattedExpirationDate = formatDate(expirationDate);
    }

    return {
      lineNumber,
      sku,
      vendorPn,
      quantityShipped,
      physicalDetails,
      eom,
      containerId,
      innerPack,
      formattedExpirationDate,
    };
  });

  const groupedProductData = groupBy(productData, (item) => item.vendorPn);

  const mergedProducts = Object.values(groupedProductData).map(
    (productItems) => {
      const containerIds = productItems?.map((item) => item.containerId);
      const quantitiesShipped = productItems?.map((item) =>
        getSafeNumber(item.quantityShipped)
      );
      const totalQuantityShipped = sum(compact(quantitiesShipped));

      const mergedProduct = productItems.reduce(
        (acc, current) => {
          return { ...acc, ...current };
        },
        { containerIds, totalQuantityShipped }
      );

      return mergedProduct;
    }
  );

  // return productData;
  return mergedProducts;
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

  const getContainerIds = (containerIds: string[]) => {
    if (containerIds.length < 3) {
      return (
        <>
          {containerIds.map((containerId) => (
            <React.Fragment key={containerId}>
              {containerId}
              <br />
            </React.Fragment>
          ))}
        </>
      );
    } else {
      return (
        <React.Fragment>
          {containerIds[0]}
          <br />-
          <br />
          {containerIds[containerIds.length - 1]}
        </React.Fragment>
      );
    }
  };

  return (
    <>
      <ItemTableContainer>
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
                <br /> UPC
                <br />
                GTIN
              </td>
              <td>Description</td>
              <td>Quantity Shipped</td>
              <td>Quantity per Pack</td>
              <td>UOM</td>
            </tr>
          </thead>
          <tbody style={{ whiteSpace: "pre-line" }}>
            {products.length
              ? products.map((product) => (
                  <tr key={`${product.lineNumber}`}>
                    <td>{product.lineNumber}</td>
                    <td className="no-wrap">{orderNumber}</td>
                    <td>{locationStoreNumber}</td>
                    <td>{getContainerIds(product?.containerIds)}</td>
                    <td>{product.sku}</td>
                    <td>{product.vendorPn}</td>
                    <td>
                      <strong>Product: </strong>
                      {`${
                        productDetails.find(
                          (detail) => detail.sku === product.sku
                        )?.productDescription
                          ? productDetails.find(
                              (detail) => detail.sku === product.sku
                            )?.productDescription
                          : "NA"
                      }\n`}
                      <strong>Pack Qty: </strong>
                      {`${product.physicalDetails}\n`}
                      {product.innerPack ? (
                        <>
                          <br />
                          <strong>Inner Pack:</strong> {product.innerPack}
                        </>
                      ) : null}
                      {product.innerPack ? (
                        <>
                          <br />
                          <strong>Expiration date:</strong>{" "}
                          {product.formattedExpirationDate}
                        </>
                      ) : null}
                    </td>
                    <td>{product.totalQuantityShipped}</td>
                    <td>{product.quantityShipped}</td>
                    {/* <td>{product.physicalDetails}</td> */}
                    <td>{product.eom}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </ItemTable>
      </ItemTableContainer>
    </>
  );
};

export default ShipmentViewPageProductList;
