import { useListDocumentQuery } from "domain/interactors/edi";
import { find, get } from "lodash";
import React, { forwardRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Spinner } from "@crstl/components/atoms/loading";

import { TradingPartnerNames } from "../edi/Edi.config";
import {
  getAdminContactInfo,
  getFallbackTextForCode,
  getTpfNameFromListDoc,
} from "../edi/edi.utils";
import {
  CoreMarkFreight,
  CVSFreight,
  GenericFreight,
  KeHEFreight,
  MeijerFreight,
  OASFreight,
  TargetFreight,
  UNFIFreight,
  WalmartFreight,
} from "./freight";
import { formatDate } from "./helpers";
import {
  CoreMarkProductList,
  CVSProductList,
  GenericProductList,
  KeHEProductList,
  MeijerProductList,
  OASProductList,
  TargetProductList,
  UNFIProductList,
  WalmartProductList,
} from "./productList";
import { CVSDSDProductList } from "./productList/CVSDSDProductList";
import {
  GridContainer,
  HeaderContainer,
  HeaderSummaryTable,
  OrderViewContainer,
  ShipToContainer,
} from "./PurchaseOrderPage.styles";
import {
  GenericAllowanceList,
  KeHEAllowanceList,
  WalmartAllowanceList,
} from "./specialAllowance";
import { BillToReference } from "./types/PurchaseOrderAcknowledgement";
import { Document } from "./types/TargetJson850";

const codeToTextMapping: Record<string, string> = {
  original_00: "Original",
  stand_alone_order_SA: "Stand Alone",
  defined_by_buyer_and_seller_DF: "Defined by Buyer and Seller",
  origin_shipping_point_OR: "Origin[Shipping Point] [OR]",
  upc_consumer_package_code_1_5_5_1_UP: "UPC",
  upc_consumer_package_code_1_5_5_UI: "UPC",
  information_contact_IC: "Information Contact",
};

const contractCodeToTextMapping: Record<string, string> = {
  D: "Standard",
  Q: "Quick Reaction",
  S: "Speed",
};

const purchasingContactToTextMapping: Record<string, string> = {
  buyer_name_or_department_BD: "Buyer/Dept Name:",
  delivery_contact_DC: "Delivery Contact:",
};

const firstTransactionSet =
  "output.interchanges[0].groups[0].transaction_sets[0]";

function getParsedData(data: string): unknown {
  try {
    return JSON.parse(data);
  } catch (ex) {
    return "";
  }
}

interface VendorInfo {
  vendor?: string;
  department?: string;
}

function getVendorInformation(data: unknown): VendorInfo {
  const defaultResult: VendorInfo = {
    vendor: "",
    department: "",
  };

  const referenceIdentificationRef = get(
    data,
    `${firstTransactionSet}.heading.reference_identification_REF`
  );

  const referenceInformationRef = get(
    data,
    `${firstTransactionSet}.heading.reference_information_REF`
  );

  const referenceList =
    referenceIdentificationRef || referenceInformationRef || [];

  if (referenceList.length === 0) {
    return defaultResult;
  }

  const vendorRef =
    (find(referenceList, {
      reference_identification_qualifier_01: "internal_vendor_number_IA",
    }) as Record<string, string>) ||
    (find(referenceList, {
      reference_identification_qualifier_01: "vendor_id_number_VR",
    }) as Record<string, string>);

  const departmentRef = find(referenceList, {
    reference_identification_qualifier_01: "department_number_DP",
  }) as Record<string, string>;

  const result = {
    vendor: vendorRef?.reference_identification_02,
    department: departmentRef?.reference_identification_02,
  };

  return result;
}

function getShippingDate(
  dateTimeReferenceList: Array<Record<string, string>>,
  dateTimeQualifierName: string
): string {
  const reference = find(dateTimeReferenceList, {
    date_time_qualifier_01: dateTimeQualifierName,
  }) as Record<string, string>;

  if (reference?.date_02) {
    const formattedDateValue = formatDate(reference.date_02);
    return formattedDateValue;
  }

  return "";
}

function getShippingDateInformation(data: unknown) {
  const dateTimeReferenceList = get(
    data,
    `${firstTransactionSet}.heading.date_time_reference_DTM`,
    []
  );

  const shipNotBeforeDate = getShippingDate(
    dateTimeReferenceList,
    "ship_not_before_037"
  );

  const shipNoLaterDate = getShippingDate(
    dateTimeReferenceList,
    "ship_no_later_038"
  );

  const doNotDeliverAfterDate = getShippingDate(
    dateTimeReferenceList,
    "do_not_deliver_after_063"
  );

  const deliveryRequestedDate = getShippingDate(
    dateTimeReferenceList,
    "delivery_requested_002"
  );

  const requestedShipDate = getShippingDate(
    dateTimeReferenceList,
    "requested_ship_010"
  );

  const promisedForDeliveryDate = getShippingDate(
    dateTimeReferenceList,
    "promised_for_delivery_069"
  );

  const cancelDate = getShippingDate(dateTimeReferenceList, "cancel_after_001");

  const requestedPickupDate = getShippingDate(
    dateTimeReferenceList,
    "requested_pickup_118"
  );

  return {
    shipNotBeforeDate,
    shipNoLaterDate,
    doNotDeliverAfterDate,
    deliveryRequestedDate,
    requestedShipDate,
    cancelDate,
    promisedForDeliveryDate,
    requestedPickupDate,
  };
}

function getShippingInformation(data: unknown) {
  const nameN1Loop = get(data, `${firstTransactionSet}.heading.name_N1_loop`);

  const partyIdentificationN1Loop = get(
    data,
    `${firstTransactionSet}.heading.party_identification_N1_loop`
  );

  const identificationLoop = nameN1Loop || partyIdentificationN1Loop || [];

  let shipToReference = find(identificationLoop, {
    name_N1: { entity_identifier_code_01: "ship_to_ST" },
  });
  if (!shipToReference) {
    shipToReference = find(identificationLoop, {
      party_identification_N1: { entity_identifier_code_01: "ship_to_ST" },
    });
  }
  let billTopReference = find(identificationLoop, {
    name_N1: { entity_identifier_code_01: "bill_to_party_BT" },
  });

  if (!billTopReference) {
    billTopReference = find(identificationLoop, {
      party_identification_N1: {
        entity_identifier_code_01: "bill_to_party_BT",
      },
    });
  }

  const purchasersDepartmentReference = find(identificationLoop, {
    party_identification_N1: {
      entity_identifier_code_01: "purchasers_department_buyer_PD",
    },
  });

  const buyingPartyReference = find(identificationLoop, (item) => {
    const nameNode = item?.name_N1 ?? item?.party_identification_N1;
    const identifierCode = nameNode?.entity_identifier_code_01;
    const result = identifierCode === "buying_party_purchaser_BY";
    return result;
  });

  const supplierReference = find(identificationLoop, (item) => {
    const nameNode = item?.name_N1 ?? item?.party_identification_N1;
    const identifierCode = nameNode?.entity_identifier_code_01;
    const result = identifierCode === "supplier_manufacturer_SU";
    return result;
  });

  return {
    shipToReference,
    billTopReference,
    buyingPartyReference,
    supplierReference,
    purchasersDepartmentReference,
  };
}

function ShippingAddress({
  title,
  data,
}: {
  title: string;
  data: BillToReference;
}) {
  const partyIdentificationNq = get(data, "party_identification_N1");
  const nameN1 = get(data, "name_N1") ?? partyIdentificationNq;
  const party_identification_N1 =
    get(data, "party_identification_N1") ?? partyIdentificationNq;

  const partyLocationN3 = get(
    data,
    "party_location_N3[0].address_information_01"
  );
  const addressInformationN3 =
    get(data, "address_information_N3[0].address_information_01") ??
    partyLocationN3;

  const locationId = get(nameN1, "identification_code_04");
  let storeNameValue = get(nameN1, "name_02");

  if (!storeNameValue) {
    storeNameValue = get(party_identification_N1, "name_02");
  }

  const geographicLocationInfo = get(
    data,
    "geographic_location_N4[0]"
  ) as Record<string, string>;

  // N1 - PER segment info
  const adminContactInfo = get(
    data,
    "administrative_communications_contact_PER[0]"
  );
  const contactFunctionCode = get(adminContactInfo, "contact_function_code_01");
  const contactFunction =
    codeToTextMapping[contactFunctionCode] ??
    getFallbackTextForCode(contactFunctionCode);
  const contactName = get(adminContactInfo, "name_02");
  const { email, telephone } = getAdminContactInfo(adminContactInfo);

  const storeName = storeNameValue ? (
    <>
      <br />
      {storeNameValue}
    </>
  ) : null;

  const addressLine1 = addressInformationN3 ? (
    <>
      <br />
      {addressInformationN3}
    </>
  ) : (
    ""
  );

  const geographicLocation = geographicLocationInfo ? (
    <>
      <br />
      {geographicLocationInfo.city_name_01},{" "}
      {geographicLocationInfo.state_or_province_code_02}{" "}
      {geographicLocationInfo.postal_code_03}{" "}
      {geographicLocationInfo.country_code_04}
    </>
  ) : null;

  return (
    <div>
      <p>
        <strong>{title}</strong>
      </p>
      <p>
        Location ID: {locationId}
        {storeName}
        {addressLine1}
        {geographicLocation}
      </p>
      {contactFunction || contactName ? (
        <p>
          {contactFunction}: <strong>{contactName}</strong>
          {email && (
            <>
              <br />
              Email: <strong>{email}</strong>
            </>
          )}
          {telephone && (
            <>
              <br />
              Phone: <strong>{telephone}</strong>
            </>
          )}
        </p>
      ) : null}
    </div>
  );
}

function SpecialAllowanceList({
  data,
  partnerName,
  partnerFlavorName,
}: {
  data?: Document;
  partnerName: TradingPartnerNames;
  partnerFlavorName?: string;
}) {
  if (partnerName === "kehe") {
    return <KeHEAllowanceList data={data} />;
  } else if (partnerName === "walmart") {
    if (partnerFlavorName === "distribution center (dc)") {
      return <WalmartAllowanceList data={data} />;
    } else {
      return <WalmartAllowanceList data={data} />;
    }
  }

  return <GenericAllowanceList data={data} />;
}

function ProductList({
  data,
  partnerName,
  partnerFlavorName,
}: {
  data?: Document;
  partnerName: TradingPartnerNames;
  partnerFlavorName?: string;
}) {
  if (partnerName === "target") {
    if (partnerFlavorName === "distribution center (dc)") {
      return <TargetProductList data={data} />;
    } else {
      return <TargetProductList data={data} />;
    }
  } else if (partnerName === "mclane") {
    return <GenericProductList data={data} />;
  } else if (partnerName === "cvs") {
    if (partnerFlavorName === "distribution center/warehouse") {
      return <CVSProductList data={data} />;
    } else if (partnerFlavorName === "direct store delivery (dsd) / sbt") {
      return <CVSDSDProductList data={data} />;
    } else {
      return <CVSProductList data={data} />;
    }
  } else if (partnerName === "unfi") {
    if (partnerFlavorName === "wholesale") {
      return <UNFIProductList data={data} />;
    } else {
      return <UNFIProductList data={data} />;
    }
  } else if (partnerName === "kehe") {
    return <KeHEProductList data={data} />;
  } else if (partnerName === "walmart") {
    if (partnerFlavorName === "distribution center (dc)") {
      return <WalmartProductList data={data} />;
    } else {
      return <WalmartProductList data={data} />;
    }
  } else if (partnerName === "oas") {
    return <OASProductList data={data} />;
  } else if (partnerName === "core-mark") {
    return <CoreMarkProductList data={data} />;
  } else if (partnerName === "meijer") {
    return <MeijerProductList data={data} />;
  }

  return <GenericProductList data={data} />;
}

function FreightList({
  data,
  partnerName,
  partnerFlavorName,
}: {
  data: unknown;
  partnerName: TradingPartnerNames;
  partnerFlavorName?: string;
}) {
  if (partnerName === "target") {
    if (partnerFlavorName === "distribution center (dc)") {
      return <TargetFreight data={data} />;
    } else {
      return <TargetFreight data={data} />;
    }
  } else if (partnerName === "mclane") {
    return <GenericFreight data={data} />;
  } else if (partnerName === "cvs") {
    if (partnerFlavorName === "distribution center/warehouse") {
      return <CVSFreight data={data} />;
    } else {
      return <CVSFreight data={data} />;
    }
  } else if (partnerName === "unfi") {
    if (partnerFlavorName === "wholesale") {
      return <UNFIFreight data={data} />;
    } else {
      return <UNFIFreight data={data} />;
    }
  } else if (partnerName === "kehe") {
    return <KeHEFreight data={data} />;
  } else if (partnerName === "walmart") {
    if (partnerFlavorName === "distribution center (dc)") {
      return <WalmartFreight data={data} />;
    } else {
      return <WalmartFreight data={data} />;
    }
  } else if (partnerName === "oas") {
    return <OASFreight data={data} />;
  } else if (partnerName === "core-mark") {
    return <CoreMarkFreight data={data} />;
  } else if (partnerName === "meijer") {
    return <MeijerFreight data={data} />;
  }

  return <GenericFreight data={data} />;
}

function PurchaseOrderPage(_: any, downloadRef: any) {
  const [data, setData] = React.useState<Document>();
  const { id, version } = useParams<{ id: string; version: string }>();

  const { data: listDocumentData, isLoading, isError } = useListDocumentQuery(
    "850",
    id,
    undefined,
    version
  );

  const [partnerName, setPartnerName] = React.useState<TradingPartnerNames>(
    "target"
  );
  const [partnerFlavorName, setPartnerFlavorName] = useState<string>();

  function getValue(path: string, defaultValue: unknown = "") {
    return get(data, path, defaultValue);
  }

  const transactionCode = getValue(
    `${firstTransactionSet}.heading.beginning_segment_for_purchase_order_BEG.transaction_set_purpose_code_01`
  );
  const transactionValue = codeToTextMapping[transactionCode] ?? "";

  const purchaseOrderTypeCode = getValue(
    `${firstTransactionSet}.heading.beginning_segment_for_purchase_order_BEG.purchase_order_type_code_02`
  );
  const purchaseOrderValue = codeToTextMapping[purchaseOrderTypeCode] ?? "";

  const contractNumberCode = getValue(
    `${firstTransactionSet}.heading.beginning_segment_for_purchase_order_BEG.contract_number_06`
  );

  const contractNumber =
    contractCodeToTextMapping[contractNumberCode] ?? contractNumberCode;

  const purchasingContactCode = getValue(
    `${firstTransactionSet}.heading.administrative_communications_contact_PER[0].contact_function_code_01`
  );
  const purchasingContactValue =
    purchasingContactToTextMapping[purchasingContactCode] ??
    getFallbackTextForCode(purchasingContactCode);

  const purchasingContactName = getValue(
    `${firstTransactionSet}.heading.administrative_communications_contact_PER[0].name_02`
  );
  const purchasingContactNumber = getValue(
    `${firstTransactionSet}.heading.administrative_communications_contact_PER[0].communication_number_04`
  );

  const purchaseOrderDate = getValue(
    `${firstTransactionSet}.heading.beginning_segment_for_purchase_order_BEG.date_05`
  );
  const purchaseOrderDateFormatted = formatDate(purchaseOrderDate);

  function onFormDataChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const parsedData = getParsedData(e.target.value) as Document;
    setData(parsedData);
  }

  const vendorInfo = getVendorInformation(data);

  const {
    shipNotBeforeDate,
    shipNoLaterDate,
    deliveryRequestedDate,
    doNotDeliverAfterDate,
    requestedShipDate,
    cancelDate,
    promisedForDeliveryDate,
    requestedPickupDate,
  } = getShippingDateInformation(data);

  const shippingInfo = getShippingInformation(data);

  useEffect(() => {
    if (listDocumentData) {
      setData(listDocumentData.data?.file?.json_edi);
      if (listDocumentData.data?.metadata?.trading_partner_name?.length > 0) {
        setPartnerName(
          listDocumentData.data?.metadata?.trading_partner_name?.toLowerCase()
        );
      }
      if (listDocumentData.data?.metadata?.trading_partner_name?.length > 0) {
        setPartnerFlavorName(
          listDocumentData.data?.metadata?.trading_partner_flavor?.toLowerCase()
        );
      }
    }
  }, [listDocumentData]);

  if (isError) {
    return null;
  }

  if (isLoading) {
    return (
      <GridContainer>
        <OrderViewContainer>
          <Spinner />
        </OrderViewContainer>
      </GridContainer>
    );
  }

  return (
    <div ref={downloadRef}>
      <GridContainer>
        <OrderViewContainer>
          <h2>Order</h2>
          <HeaderContainer>
            <div>
              <p>
                Trading Partner:{" "}
                <strong>{getTpfNameFromListDoc(listDocumentData)}</strong>
              </p>
              <p>
                Purchase order:{" "}
                <strong>
                  {getValue(
                    `${firstTransactionSet}.heading.beginning_segment_for_purchase_order_BEG.purchase_order_number_03`
                  )}
                </strong>
              </p>
              <p>Depositor order:</p>
              <p>Customer order:</p>
              <p>Release:</p>
              <p>
                Purchase order type: <strong>{purchaseOrderValue}</strong>
              </p>
              <p>
                Contract number: <strong>{contractNumber}</strong>
              </p>
              <p>
                Purchasing contact:{" "}
                <strong>
                  {purchasingContactValue ? `${purchasingContactValue} ` : ""}
                </strong>
                <strong>
                  {purchasingContactValue
                    ? purchasingContactName || purchasingContactNumber
                    : ""}
                </strong>
              </p>
              <p>
                Transaction code: <strong>{transactionValue}</strong>
              </p>
              <p>Buyers currency:</p>
              <p>Sellers currency:</p>
            </div>
            <div
              style={{
                borderRadius: 4,
                border: "1px solid #f0f0f0",
                padding: "0px 12px",
              }}
            >
              <HeaderSummaryTable summary="This are the key and value pairs">
                <tr>
                  <th scope="row">Purchase order date:</th>
                  <td>
                    <strong>{purchaseOrderDateFormatted}</strong>
                  </td>
                </tr>
                {shipNotBeforeDate ? (
                  <tr>
                    <th scope="row">Earliest ship [037]:</th>
                    <td>
                      <strong>{shipNotBeforeDate}</strong>
                    </td>
                  </tr>
                ) : null}
                {shipNoLaterDate ? (
                  <tr>
                    <th scope="row">Latest ship [038]:</th>
                    <td>
                      <strong>{shipNoLaterDate}</strong>
                    </td>
                  </tr>
                ) : null}
                {deliveryRequestedDate ? (
                  <tr>
                    <th scope="row">Requested delivery:</th>
                    <td>
                      <strong>{deliveryRequestedDate}</strong>
                    </td>
                  </tr>
                ) : null}
                {promisedForDeliveryDate ? (
                  <tr>
                    <th scope="row">Promised for Delivery:</th>
                    <td>
                      <strong>{promisedForDeliveryDate}</strong>
                    </td>
                  </tr>
                ) : null}
                {doNotDeliverAfterDate ? (
                  <tr>
                    <th scope="row">Latest delivery [063]:</th>
                    <td>
                      <strong>{doNotDeliverAfterDate}</strong>
                    </td>
                  </tr>
                ) : null}
                {requestedShipDate ? (
                  <tr>
                    <th scope="row">010 - Requested ship:</th>
                    <td>
                      <strong>{requestedShipDate}</strong>
                    </td>
                  </tr>
                ) : null}
                {cancelDate ? (
                  <tr>
                    <th scope="row">Cancel after [001]:</th>
                    <td>
                      <strong>{cancelDate}</strong>
                    </td>
                  </tr>
                ) : null}
                {requestedPickupDate ? (
                  <tr>
                    <th scope="row">Requested Pickup Date [118]:</th>
                    <td>
                      <strong>{requestedPickupDate}</strong>
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <th scope="row">
                    Vendor:
                    <strong>
                      {vendorInfo.vendor ? ` ${vendorInfo.vendor}` : ""}
                    </strong>
                  </th>
                  <td>
                    Department:
                    <strong>
                      {vendorInfo?.department
                        ? ` ${vendorInfo.department}`
                        : ""}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Account #:</th>
                  <td></td>
                </tr>
              </HeaderSummaryTable>
            </div>
          </HeaderContainer>
          <ShipToContainer>
            {shippingInfo.billTopReference ? (
              <ShippingAddress
                title="BT - Bill to:"
                data={shippingInfo.billTopReference}
              />
            ) : null}
            {shippingInfo.shipToReference ? (
              <ShippingAddress
                title="ST - Ship to:"
                data={shippingInfo.shipToReference}
              />
            ) : null}
            {shippingInfo.buyingPartyReference ? (
              <ShippingAddress
                title="Buying Party:"
                data={shippingInfo.buyingPartyReference}
              />
            ) : null}
            {shippingInfo.purchasersDepartmentReference ? (
              <ShippingAddress
                title="Purchaser's Department:"
                data={shippingInfo.purchasersDepartmentReference}
              />
            ) : null}
            {shippingInfo.supplierReference ? (
              <div>
                <p>
                  <strong>SU:</strong>
                </p>
                <p>
                  {
                    shippingInfo.supplierReference?.party_identification_N1
                      ?.name_02
                  }
                </p>
              </div>
            ) : null}
          </ShipToContainer>
          <FreightList
            data={data}
            partnerName={partnerName}
            partnerFlavorName={partnerFlavorName}
          />
          <SpecialAllowanceList
            data={data}
            partnerName={partnerName}
            partnerFlavorName={partnerFlavorName}
          />
          <ProductList
            data={data}
            partnerName={partnerName}
            partnerFlavorName={partnerFlavorName}
          />
        </OrderViewContainer>
      </GridContainer>
    </div>
  );
}

export default forwardRef(PurchaseOrderPage);
