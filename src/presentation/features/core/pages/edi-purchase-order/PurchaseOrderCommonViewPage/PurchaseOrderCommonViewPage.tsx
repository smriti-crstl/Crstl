import { useListDocumentQuery } from "domain/interactors/edi";
import {
  codeToTextMapping,
  CORE_EDI,
  firstTransactionSetNoOutput,
} from "globals/configs";
import { find, get } from "lodash";
import { useSearchParams } from "presentation/hooks/common";
import React, { useEffect, useState } from "react";
import { generatePath, useHistory, useParams } from "react-router-dom";

import { EditOutlined } from "@ant-design/icons";
import { Spinner } from "@crstl/components/atoms/loading";

import { StyledSecondaryButton } from "../../edi-edit/EdiEditPage.styles";
import { getValue } from "../../edi/edi.utils";
import { Container } from "../../edi/EdiPurchaseOrderSection.styles";
import { CarrierDetailTable } from "../carrierDetail";
import { formatDate } from "../helpers";
import {
  BorderContainer,
  GridContainer,
  HeaderContainer,
  HeaderSummaryTable,
  OrderViewContainer,
  PageWrapper,
  ShipToContainer,
  TitleContainer,
} from "../PurchaseOrderPage.styles";
import { BillToReference } from "../types/PurchaseOrderAcknowledgement";
import { Document } from "../types/TargetJson850";
import { DocumentTypeNumberMap, EditTextMap, PageTitleMap } from "./constants";
import ProductList from "./ProductList";
import { DocumentType } from "./types";

const contractCodeToTextMapping: Record<string, string> = {
  D: "Standard",
  Q: "Quick Reaction",
  S: "Speed",
};

const purchasingContactToTextMapping: Record<string, string> = {
  buyer_name_or_department_BD: "Buyer/Dept Name:",
};

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
    `${firstTransactionSetNoOutput}.heading.reference_identification_REF`
  );

  const referenceInformationRef = get(
    data,
    `${firstTransactionSetNoOutput}.heading.reference_information_REF`
  );

  const referenceList =
    referenceIdentificationRef || referenceInformationRef || [];

  if (referenceList.length === 0) {
    return defaultResult;
  }

  const vendorRef: Record<string, string> =
    find(referenceList, {
      reference_identification_qualifier_01: "internal_vendor_number_IA",
    }) ||
    find(referenceList, {
      reference_identification_qualifier_01: "IA",
    }) ||
    find(referenceList, {
      reference_identification_qualifier_01: "vendor_id_number_VR",
    }) ||
    find(referenceList, {
      reference_identification_qualifier_01: "VR",
    });

  const departmentRef =
    find(referenceList, {
      reference_identification_qualifier_01: "department_number_DP",
    }) ||
    (find(referenceList, {
      reference_identification_qualifier_01: "DP",
    }) as Record<string, string>);

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

  return formatDate(reference?.date_02);
}

function getShippingDateInformation(data: unknown) {
  const dateTimeReferenceList = get(
    data,
    `${firstTransactionSetNoOutput}.heading.date_time_reference_DTM`,
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

function getShippingInformation(data: Document | undefined) {
  const nameN1Loop = get(
    data,
    `${firstTransactionSetNoOutput}.heading.name_N1_loop`
  );

  const partyIdentificationN1Loop = get(
    data,
    `${firstTransactionSetNoOutput}.heading.party_identification_N1_loop`
  );

  const identificationLoop = nameN1Loop || partyIdentificationN1Loop || [];

  let shipToReference =
    find(identificationLoop, {
      name_N1: { entity_identifier_code_01: "ship_to_ST" },
    }) ||
    find(identificationLoop, {
      name_N1: { entity_identifier_code_01: "ST" },
    });
  if (!shipToReference) {
    shipToReference = find(identificationLoop, {
      party_identification_N1: { entity_identifier_code_01: "ship_to_ST" },
    });
  }
  let billToReference =
    find(identificationLoop, {
      name_N1: { entity_identifier_code_01: "bill_to_party_BT" },
    }) ||
    find(identificationLoop, {
      name_N1: { entity_identifier_code_01: "BT" },
    });

  if (!billToReference) {
    billToReference = find(identificationLoop, {
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
    billTopReference: billToReference,
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
    </div>
  );
}

interface PublicProps {
  documentType: DocumentType;
}

const PurchaseOrderViewPage: React.FC<PublicProps> = ({ documentType }) => {
  const [data, setData] = useState<Document>();
  const { id, orderId } = useParams<{
    id: string;
    orderId: string;
  }>();
  const history = useHistory();

  const { data: listDocumentData, isLoading, isError } = useListDocumentQuery(
    DocumentTypeNumberMap[documentType],
    id
  );

  const searchParams = useSearchParams();

  const switchToEditMode = () => {
    const path = generatePath(CORE_EDI, {
      id,
      orderId,
      documentType,
      tabName: "edit",
    });
    const search = searchParams.toString();
    history.replace(`${path}?${search}`);
  };

  const [partnerName, setPartnerName] = useState("target");
  const [partnerFlavorName, setPartnerFlavorName] = useState();

  const purchaseOrderAcknowledgement =
    "heading.beginning_segment_for_purchase_order_acknowledgment_BAK";
  const administrativeCommunicationsContact =
    "heading.administrative_communications_contact_PER[0]";

  const transactionCode = getValue(
    `${firstTransactionSetNoOutput}.${purchaseOrderAcknowledgement}.transaction_set_purpose_code_01`,
    data
  );
  const transactionValue = codeToTextMapping[transactionCode] ?? "";
  const purchaseOrderTypeCode = getValue(
    `${firstTransactionSetNoOutput}.${purchaseOrderAcknowledgement}.acknowledgment_type_02`,
    data
  );
  const purchaseOrderValue = codeToTextMapping[purchaseOrderTypeCode] ?? "";

  const contractNumberCode = getValue(
    `${firstTransactionSetNoOutput}.${purchaseOrderAcknowledgement}.contract_number_06`,
    data
  );

  const contractNumber =
    contractCodeToTextMapping[contractNumberCode] ?? contractNumberCode;

  const purchasingContactCode = getValue(
    `${firstTransactionSetNoOutput}.${administrativeCommunicationsContact}.contact_function_code_01`,
    data
  );
  const purchasingContactValue =
    purchasingContactToTextMapping[purchasingContactCode] ??
    purchasingContactCode;

  const purchasingContactName = getValue(
    `${firstTransactionSetNoOutput}.${administrativeCommunicationsContact}.name_02`,
    data
  );

  const purchaseOrderDate = getValue(
    `${firstTransactionSetNoOutput}.${purchaseOrderAcknowledgement}.date_04`,
    data
  );
  const purchaseOrderDateFormatted = formatDate(purchaseOrderDate);

  const purchaseOrderAcknowledgementNumber = getValue(
    `${firstTransactionSetNoOutput}.${purchaseOrderAcknowledgement}.purchase_order_number_03`,
    data
  );

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
      if (listDocumentData.data?.metadata?.trading_partner_flavor?.length > 0) {
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
    <PageWrapper>
      <Container>
        <GridContainer>
          <OrderViewContainer>
            <StyledSecondaryButton onClick={switchToEditMode}>
              <EditOutlined />
              Edit {EditTextMap[documentType]}
            </StyledSecondaryButton>
            <TitleContainer>{PageTitleMap[documentType]}</TitleContainer>
            <HeaderContainer>
              <div>
                <p>
                  Purchase order Acknowledgement #:{" "}
                  <strong>{purchaseOrderAcknowledgementNumber}</strong>
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
                    {purchasingContactValue ? purchasingContactName : ""}
                  </strong>
                </p>
                <p>
                  Transaction code: <strong>{transactionValue}</strong>
                </p>
                <p>Buyers currency:</p>
                <p>Sellers currency:</p>
              </div>
              <BorderContainer>
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
              </BorderContainer>
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
            <CarrierDetailTable
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
      </Container>
    </PageWrapper>
  );
};

export default PurchaseOrderViewPage;
