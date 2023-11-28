import { ASNProductDetail } from "domain/entity/edi/models";
import { cloneDeep, compact, get } from "lodash";
import React from "react";

import { removeUserInput } from "../../edi-edit/helpers";
import {
  ItemTable,
  ItemTableContainer,
} from "../../edi-purchase-order/PurchaseOrderPage.styles";
import { getLineItemsFromObject } from "../../edi/edi.utils";

type KVPair = {
  [key: string]: string | number;
};

const uomMap: KVPair = {
  each_EA: "Each",
  case_CA: "Case",
  pound_LB: "Pound",
  EA: "Each",
  CA: "Case",
  LB: "Pound",
  DZ: "Dozen",
};

interface Product {
  containerIds: string[];
  totalQuantityShipped: number;
  lineNumber: string;
  sku: string;
  vendorPn: string;
  perPack: number;
  physicalDetails: string;
  eom: string;
  innerPack: number;
  formattedExpirationDate: string;
  orderNumber: string;
  locationStoreNumber: string;
}

const product: Product = {
  containerIds: [],
  totalQuantityShipped: 0,
  lineNumber: "",
  sku: "",
  vendorPn: "",
  perPack: 0,
  physicalDetails: "",
  eom: "",
  innerPack: 0,
  formattedExpirationDate: "",
  orderNumber: "",
  locationStoreNumber: "",
};

const getLineItems = (data: any) => {
  if (!data) {
    return {};
  }
  const isSOTI = !!get(
    data,
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0].HL_loop_tare[0]"
  );

  const isSOPI = !!get(
    data,
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0].HL_loop_pack[0]"
  );

  const isSOTP = !!get(
    data,
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0].HL_loop_tare[0].HL_loop_pack[0]"
  );

  const isSOI = !!get(
    data,
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0].HL_loop_item[0]"
  );

  if (isSOTP) {
    return getSOTPLineItems(data);
  } else if (isSOTI) {
    return getSOTILineItems(data);
  } else if (isSOPI) {
    return getSOPILineItems(data);
  } else if (isSOI) {
    return getSOILineItems(data);
  } else {
    return {};
  }
};

const getSOILineItems = (data: any): any => {
  const products: Record<string, any> = {};
  const shipmentKey =
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0]";
  const orderKey =
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0]";
  const itemKey =
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0].HL_loop_item";

  const itemList = get(data, itemKey, []);

  const orderNumber = get(
    data,
    `${orderKey}.purchase_order_reference_PRF.purchase_order_number_01`
  );
  const locationStoreNumber = get(
    data,
    `${shipmentKey}.name_N1_loop[0].name_N1.identification_code_04`
  );

  itemList.forEach((item: any) => {
    const key = get(item, "item_identification_LIN.product_service_id_05");

    if (products[key]) {
      products[key].totalQuantityShipped += parseInt(
        get(item, "item_detail_shipment_SN1.number_of_units_shipped_02", "0")
      );
    } else {
      const newProduct = product;

      newProduct.orderNumber = orderNumber;
      newProduct.locationStoreNumber = locationStoreNumber;

      newProduct.containerIds = [
        get(item, "marks_and_numbers_MAN[0].marks_and_numbers_02"),
      ];

      const { upc, sku } = getLineItemsFromObject(item.item_identification_LIN);
      newProduct.vendorPn = upc;
      newProduct.sku = sku;

      newProduct.perPack = parseInt(
        get(item, "item_detail_shipment_SN1.number_of_units_shipped_02", "0")
      );

      newProduct.totalQuantityShipped = parseInt(
        get(item, "item_detail_shipment_SN1.number_of_units_shipped_02", "0")
      );

      newProduct.eom = uomMap[
        get(
          item,
          "item_detail_shipment_SN1.unit_or_basis_for_measurement_code_03"
        )
      ].toString();

      products[`${key}`] = cloneDeep(newProduct);
    }
  });

  return products;
};

const getSOTILineItems = (data: any): any => {
  const marksAndNumbers = get(
    data,
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0].HL_loop_tare[0].marks_and_numbers_MAN[0]"
  );
  const packList = get(
    data,
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0].HL_loop_tare[0].HL_loop_item",
    []
  );
  const order = get(
    data,
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0]"
  );

  const shipment = get(
    data,
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0]"
  );

  const products: any = {};
  packList.map((pack: any) => {
    const key = get(pack, "item_identification_LIN.product_service_id_03");
    const newItem = pack;
    if (products[key]) {
      products[key].totalQuantityShipped += parseInt(
        get(newItem, "item_physical_details_PO4.pack_01", "0")
      );
      if (
        pack?.marks_and_numbers_information_MAN?.length > 0 &&
        !products[key]?.containerIds?.includes(
          get(pack, "marks_and_numbers_information_MAN[0].marks_and_numbers_02")
        )
      ) {
        products[key]?.containerIds?.push(
          get(pack, "marks_and_numbers_information_MAN[0].marks_and_numbers_02")
        );
      }
      if (
        pack?.marks_and_numbers_MAN?.length > 0 &&
        !products[key]?.containerIds?.includes(
          get(pack, "marks_and_numbers_MAN[0].marks_and_numbers_02")
        )
      ) {
        products[key]?.containerIds?.push(
          get(pack, "marks_and_numbers_MAN[0].marks_and_numbers_02")
        );
      }
    } else {
      const newProduct = product;
      newProduct.lineNumber = get(
        newItem,
        "item_identification_LIN.assigned_identification_01"
      );
      newProduct.orderNumber = get(
        order,
        "purchase_order_reference_PRF.purchase_order_number_01"
      );
      newProduct.locationStoreNumber = get(
        shipment,
        "name_N1_loop[0].name_N1.identification_code_04"
      );
      newProduct.innerPack = parseInt(
        get(newItem, "item_physical_details_PO4.inner_pack_14", "0")
      );
      newProduct.containerIds = [
        get(
          pack,
          "marks_and_numbers_information_MAN[0].marks_and_numbers_02"
        ) || get(marksAndNumbers, "marks_and_numbers_02", "0"),
      ];
      const { upc: vendorPn, sku } = getLineItemsFromObject(
        newItem?.item_identification_LIN
      );
      newProduct.vendorPn = vendorPn;
      newProduct.sku = sku;
      newProduct.perPack = parseInt(
        get(newItem, "item_physical_details_PO4.pack_01") ||
          get(newItem, "item_detail_shipment_SN1.quantity_ordered_05", "0")
      );
      newProduct.totalQuantityShipped = parseInt(
        get(newItem, "item_physical_details_PO4.pack_01") ||
          get(
            newItem,
            "item_detail_shipment_SN1.number_of_units_shipped_02",
            "0"
          )
      );
      newProduct.eom = uomMap[
        get(
          newItem,
          "item_detail_shipment_SN1.unit_or_basis_for_measurement_code_03"
        )
      ] as string;
      products[`${key}`] = cloneDeep(newProduct);
    }
  });
  return products;
};

const getSOPILineItems = (data: any): any => {
  const packList = get(
    data,
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0].HL_loop_pack"
  );
  const order = get(
    data,
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0]"
  );

  const shipment = get(
    data,
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0]"
  );

  const products: any = {};
  packList.map((pack: any) => {
    const key = get(
      pack,
      "HL_loop_item[0].item_identification_LIN.product_service_id_03"
    );
    const newItem = pack?.HL_loop_item[0];
    if (products[key]) {
      products[key].totalQuantityShipped += parseInt(
        get(newItem, "item_detail_shipment_SN1.number_of_units_shipped_02") ||
          get(newItem, "item_physical_details_PO4.pack_01", "0")
      );
      if (
        pack?.marks_and_numbers_information_MAN?.length > 0 &&
        !products[key]?.containerIds?.includes(
          get(pack, "marks_and_numbers_information_MAN[0].marks_and_numbers_02")
        )
      ) {
        products[key]?.containerIds?.push(
          get(pack, "marks_and_numbers_information_MAN[0].marks_and_numbers_02")
        );
      }

      if (
        pack?.marks_and_numbers_MAN?.length > 0 &&
        !products[key]?.containerIds?.includes(
          get(pack, "marks_and_numbers_MAN[0].marks_and_numbers_02")
        )
      ) {
        products[key]?.containerIds?.push(
          get(pack, "marks_and_numbers_MAN[0].marks_and_numbers_02")
        );
      }
    } else {
      const newProduct = product;
      newProduct.lineNumber = get(
        newItem,
        "item_identification_LIN.assigned_identification_01"
      );
      newProduct.orderNumber = get(
        order,
        "purchase_order_reference_PRF.purchase_order_number_01"
      );
      newProduct.locationStoreNumber =
        shipment?.party_identification_N1_loop?.length > 0
          ? get(
              shipment,
              "party_identification_N1_loop[0].party_identification_N1.identification_code_04"
            )
          : get(shipment, "name_N1_loop[0].name_N1.identification_code_04");
      newProduct.innerPack = parseInt(
        get(newItem, "item_physical_details_PO4.inner_pack_14", "0")
      );
      newProduct.containerIds =
        pack?.marks_and_numbers_information_MAN?.length > 0
          ? [
              get(
                pack,
                "marks_and_numbers_information_MAN[0].marks_and_numbers_02"
              ),
            ]
          : [get(pack, "marks_and_numbers_MAN[0].marks_and_numbers_02")];

      const { upc: vendorPn } = getLineItemsFromObject(
        newItem.item_identification_LIN
      );
      newProduct.vendorPn = vendorPn;
      newProduct.sku = get(
        newItem,
        "item_identification_LIN.product_service_id_03"
      );
      newProduct.perPack = parseInt(
        get(newItem, "item_physical_details_PO4.pack_01") ||
          get(
            newItem,
            "item_detail_shipment_SN1.number_of_units_shipped_02",
            "0"
          )
      );
      newProduct.totalQuantityShipped = parseInt(
        get(newItem, "item_detail_shipment_SN1.number_of_units_shipped_02") ||
          get(newItem, "item_physical_details_PO4.pack_01") ||
          "0"
      );
      newProduct.eom = uomMap[
        get(
          newItem,
          "item_detail_shipment_SN1.unit_or_basis_for_measurement_code_03"
        )
      ] as string;
      products[`${key}`] = cloneDeep(newProduct);
    }
  });
  return products;
};

const getSOTPLineItems = (data: any): any => {
  const shipmentKey =
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0]";
  const orderKey =
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0]";
  const tareKey =
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0].HL_loop_tare[0]";
  const packKey =
    "interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0].HL_loop_tare[0].HL_loop_pack";

  const products: Record<string, any> = {};

  const packList = get(data, packKey, []);
  packList.forEach((pack: any) => {
    const key = get(pack, "item_identification_LIN.product_service_id_05");

    if (products[key]) {
      products[key].totalQuantityShipped += parseInt(
        get(pack, "item_detail_shipment_SN1.number_of_units_shipped_02", "0")
      );
    } else {
      const newProduct = product;

      newProduct.orderNumber = get(
        data,
        `${orderKey}.purchase_order_reference_PRF.purchase_order_number_01`
      );

      newProduct.locationStoreNumber = get(
        data,
        `${shipmentKey}.name_N1_loop[0].name_N1.identification_code_04`
      );

      newProduct.containerIds = [
        get(data, `${tareKey}.marks_and_numbers_MAN[0].marks_and_numbers_02`),
      ];

      const { upc: vendorPn } = getLineItemsFromObject(
        pack?.item_identification_LIN
      );
      newProduct.vendorPn = vendorPn;

      newProduct.sku =
        get(pack, "item_identification_LIN.product_service_id_05") ??
        get(pack, "item_identification_LIN.product_service_id_03");

      newProduct.perPack = parseInt(
        get(pack, "item_detail_shipment_SN1.number_of_units_shipped_02", "0")
      );

      newProduct.totalQuantityShipped = parseInt(
        get(pack, "item_detail_shipment_SN1.number_of_units_shipped_02", "0")
      );

      newProduct.eom = uomMap[
        get(
          pack,
          "item_detail_shipment_SN1.unit_or_basis_for_measurement_code_03"
        )
      ].toString();

      products[`${key}`] = cloneDeep(newProduct);
    }
  });

  return products;
};

const GenericShipmentViewPageProductList = ({
  data,
  productDetails,
}: {
  data: unknown;
  productDetails: ASNProductDetail[];
}) => {
  const tare = !!get(
    data,
    `interchanges[0].groups[0].transaction_sets[0].detail.HL_loop_shipment[0].HL_loop_order[0].HL_loop_tare.[0]`
  );

  const lineItems = getLineItems(data);
  const getContainerIds = (containerIds: string[]) => {
    // removing user_input
    containerIds = compact(
      containerIds.map((containerId) => removeUserInput(containerId))
    );

    if (containerIds.length < 3) {
      return (
        <>
          {containerIds.map((containerId) => (
            <React.Fragment key={containerId}>
              {tare && (
                <>
                  Tare
                  <br />
                </>
              )}
              {containerId}
              <br />
            </React.Fragment>
          ))}
        </>
      );
    } else {
      return (
        <React.Fragment>
          {tare && (
            <>
              Tare
              <br />
            </>
          )}
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
              <td>UOM</td>
            </tr>
          </thead>
          <tbody style={{ whiteSpace: "pre-line" }}>
            {Object.values(lineItems).length
              ? Object.values(lineItems).map((product: any) => (
                  <tr key={`${product.lineNumber}`}>
                    <td>{product.lineNumber}</td>
                    <td className="no-wrap">{product.orderNumber}</td>
                    <td>{product.locationStoreNumber}</td>
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
                      {product.perPack ? (
                        <>
                          <strong>Pack Qty: </strong>
                          {`${product.perPack}\n`}
                        </>
                      ) : null}
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

export default GenericShipmentViewPageProductList;
