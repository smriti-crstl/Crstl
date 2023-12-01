import { Button, Pagination } from "antd";
import { PostPOChangeStateReq } from "domain/entity/edi/models";
import {
  EDI_QUERY_KEYS,
  useGetAssociatedPOChangeDocsQuery,
  useListDocumentQuery,
  usePostPOChangeState,
} from "domain/interactors/edi";
import { useUserTeamQuery } from "domain/interactors/shared";
import { COLORS } from "globals/themes/default/colors";
import { useFlags } from "launchdarkly-react-client-sdk";
import { find, get, head } from "lodash";
import { useTpfForLD, useUserDetails } from "presentation/hooks/common";
import { useTimestamp } from "presentation/hooks/common/use-timestamp";
import React, { forwardRef, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { generatePath, useHistory, useParams } from "react-router-dom";

import { Spinner } from "components/atoms/loading";

import { getTpfNameFromListDoc } from "../edi/edi.utils";
import { CVSProductList } from "./CVSProductList";
import { BCH_355_OPTIONS } from "./data/BCH_355_options";
import { BCH_92_OPTIONS } from "./data/BCH_92_options";
import { GenericFreight } from "./freight";
import { GenericProductList } from "./GenericProductList";
import { formatDate, getDisplayNameForCode } from "./helpers";
import { POChangeAckButton } from "./POChangeAckButton";
import POChangeConfirmationModal from "./POChangeConfirmationModal";
import {
  GridContainer,
  HeaderContainer,
  HeaderSummaryTable,
  OrderViewContainer,
  PageWrapper,
  POChangeDocAcceptedStateContainer,
  POChangeDocInvalidStateContainer,
  POChangeDocMetadataContainer,
  POChangeDocNewStateButtonsContainer,
  POChangeDocNewStateContainer,
  POChangeDocNewStateTextPrompt,
  POChangeDocRejectedStateContainer,
  POChangeDocsListContainer,
  POChangeDocsPaginationContainer,
  POChangeDocStateLabel,
  POEmojiContainer,
  ShipToContainer,
} from "./PurchaseOrderChangePage.styles";
import { TargetProductList } from "./TargetProductList";
import { Document } from "./types/TargetJson860";
import { UNFIProductList } from "./UNFIProductList";

const codeToTextMapping: Record<string, string> = {
  original_00: "Original [00]",
  stand_alone_order_SA: "Stand Alone [SA]",
  defined_by_buyer_and_seller_DF: "Defined by Buyer and Seller [DF]",
  origin_shipping_point_OR: "Origin[Shipping Point] [OR]",
  upc_consumer_package_code_1_5_5_1_UP: "UPC",
  upc_consumer_package_code_1_5_5_UI: "UPC",
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

  const vendorRef = find(referenceList, {
    reference_identification_qualifier_01: "internal_vendor_number_IA",
  }) as Record<string, string>;

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

  const doNotDeliverBeforeDate = getShippingDate(
    dateTimeReferenceList,
    "do_not_deliver_before_064"
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

  return {
    shipNotBeforeDate,
    shipNoLaterDate,
    doNotDeliverAfterDate,
    doNotDeliverBeforeDate,
    deliveryRequestedDate,
    requestedShipDate,
    promisedForDeliveryDate,
  };
}

function getShippingInformation(data: unknown) {
  const nameN1Loop = get(data, `${firstTransactionSet}.heading.name_N1_loop`);

  const partyIdentificationN1Loop = get(
    data,
    `${firstTransactionSet}.heading.party_identification_N1_loop`
  );

  const identificationLoop = nameN1Loop || partyIdentificationN1Loop || [];

  const shipToReference = find(identificationLoop, {
    name_N1: { entity_identifier_code_01: "ship_to_ST" },
  });

  const billTopReference = find(identificationLoop, {
    name_N1: { entity_identifier_code_01: "bill_to_party_BT" },
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
  };
}

function ShippingAddress({ title, data }: { title: string; data: unknown }) {
  const partyIdentificationNq = get(data, "party_identification_N1");
  const nameN1 = get(data, "name_N1") ?? partyIdentificationNq;

  const partyLocationN3 = get(
    data,
    "party_location_N3[0].address_information_01"
  );
  const addressInformationN3 =
    get(data, "address_information_N3[0].address_information_01") ??
    partyLocationN3;

  const locationId = get(nameN1, "identification_code_04");
  const storeNameValue = get(nameN1, "name_02");

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

function ProductList({
  data,
  partnerName,
  partnerFlavorName,
}: {
  data: Document | null;
  partnerName: string;
  partnerFlavorName?: string;
}) {
  if (partnerName === "target") {
    if (partnerFlavorName === "distribution center (dc)") {
      return <TargetProductList data={data} />;
    } else {
      return <TargetProductList data={data} />;
    }
  } else if (partnerName === "cvs") {
    if (partnerFlavorName === "distribution center/warehouse") {
      return <CVSProductList data={data} />;
    } else {
      return <CVSProductList data={data} />;
    }
  } else if (partnerName === "unfi") {
    if (partnerFlavorName === "wholesale") {
      return <UNFIProductList data={data} />;
    } else {
      return <UNFIProductList data={data} />;
    }
  }

  return <GenericProductList data={data} />;
}

// TODO: Replace FreightList with GenericFreight
function FreightList({
  data,
  partnerName,
  partnerFlavorName,
}: {
  data: unknown;
  partnerName: string;
  partnerFlavorName?: string;
}) {
  return <GenericFreight data={data} />;
}

function PurchaseOrderChangePage(_: any, downloadRef: any) {
  const queryClient = useQueryClient();
  const flags = useFlags();
  const [partnerName, setPartnerName] = React.useState("target");
  const [partnerFlavorName, setPartnerFlavorName] = useState<string>();
  const [title, setTitle] = React.useState("Purchase Order Change");
  const [data, setData] = React.useState<Document | null>(null);
  const { id, orderId, version } = useParams<{
    id: string;
    orderId: string;
    version: string;
  }>();

  const [
    currentSelectedPOChangeDoc,
    setSelectedPOChangeDoc,
  ] = React.useState<any>();
  const [poChangeUpdatedBy, setSelectedPOChangeDocUpdatedBy] = React.useState(
    "NA"
  );

  const [poChangeCTADisabled, setpoChangeCTADisabled] = React.useState(false);

  const [
    showPOChangeConfirmationModal,
    setShowPOChangeConfirmationModal,
  ] = React.useState(false);

  const [confirmationModalVars, setConfirmationModalVars] = React.useState<{
    newState: PostPOChangeStateReq["newValue"];
    title: string;
    subtitle: string;
  }>({
    newState: "Accepted",
    title: "",
    subtitle: "",
  });

  const result = useListDocumentQuery("860", id);
  const history = useHistory();
  const { getZonedTime } = useTimestamp();

  const associatedPOChangeDocs = useGetAssociatedPOChangeDocsQuery(orderId);
  const poChangeDocs =
    associatedPOChangeDocs?.data?.code === "success" &&
    associatedPOChangeDocs?.data?.data !== undefined
      ? associatedPOChangeDocs?.data?.data
      : [];

  const [{ data: userData }] = useUserDetails();

  const { isLoading: isTeamLoading, data: teamsData } = useUserTeamQuery(
    userData?.organizationId || "",
    {
      enabled: !!userData?.organizationId,
    }
  );
  const currentSelectedPOChangeDocIndexBasedOnParam = getSelectedPOChangeDocIndex(
    poChangeDocs,
    id
  );

  let currentSelectedPOChangeDocTemp =
    poChangeDocs && poChangeDocs?.length > 0
      ? poChangeDocs[currentSelectedPOChangeDocIndexBasedOnParam]
      : undefined;

  let updaterUser: any = undefined;

  getNameOfPOChangeUpdater();

  const { data: listDocumentData, isFetching } = id
    ? result
    : { isFetching: false, data: undefined };

  function getValue(path: string, defaultValue: unknown = "") {
    return get(data, path, defaultValue);
  }

  // ! Note: call this hook when TPF info is supposed to be passed to LD
  // ! Note: works only when current component is rendered - cleaned up on unmount
  useTpfForLD(result?.data);
  const isPOChangeAckSupported = flags?.edi865Supported;

  const firstTransactionSet = head(
    data?.output?.interchanges?.[0]?.groups?.[0]?.transaction_sets
  );

  const heading = firstTransactionSet?.heading;

  const BCH = heading?.beginning_segment_for_purchase_order_change_BCH;

  const REF = heading?.reference_identification_REF?.[0];

  const purchaseOrderTypeCode = getValue(
    `${firstTransactionSet}.heading.beginning_segment_for_purchase_order_BEG.purchase_order_type_code_02`
  );
  const purchaseOrderValue = codeToTextMapping[purchaseOrderTypeCode] ?? "";

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
    doNotDeliverBeforeDate,
    requestedShipDate,
    promisedForDeliveryDate,
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

  useEffect(() => {
    if (currentSelectedPOChangeDocTemp) {
      setSelectedPOChangeDoc(currentSelectedPOChangeDocTemp);
      updaterUser
        ? setSelectedPOChangeDocUpdatedBy(updaterUser.fullName)
        : setSelectedPOChangeDocUpdatedBy("NA");
    }
    if (currentSelectedPOChangeDocTemp?.id) {
      checkIfPOChangeCTAsToBeDisabled();
    }
  }, [currentSelectedPOChangeDocTemp]);

  function setPOChangeDocsPage(paginationInput: any) {
    currentSelectedPOChangeDocTemp = poChangeDocs[paginationInput - 1];
    setSelectedPOChangeDoc(currentSelectedPOChangeDocTemp);
    getNameOfPOChangeUpdater();
    updaterUser
      ? setSelectedPOChangeDocUpdatedBy(updaterUser.fullName)
      : setSelectedPOChangeDocUpdatedBy("NA");

    checkIfPOChangeCTAsToBeDisabled();

    navigateToSelectedPOChangeDoc(currentSelectedPOChangeDocTemp.id, orderId);
  }

  function getNameOfPOChangeUpdater(): void {
    updaterUser = undefined;
    const userIdOfUpdater =
      currentSelectedPOChangeDocTemp?.state[0]?.updated_by;
    if (userIdOfUpdater) {
      updaterUser = teamsData?.find((item: any) => item.id === userIdOfUpdater);
    }
  }

  function navigateToSelectedPOChangeDoc(
    poChangeDocId: string,
    poId: string
  ): void {
    if (poChangeDocId) {
      const _path = generatePath(
        "/edi/purchase-order-change/view/:id/:orderId",
        {
          id: poChangeDocId,
          orderId: poId,
        }
      );
      history.push(`${_path}?refreshWorkflow=true`);
    }
  }

  function handlePOChangeNewStateButtonOnClick(
    newState: PostPOChangeStateReq["newValue"]
  ) {
    let confirmationModalTitle = "";
    if (newState === "Accepted") {
      confirmationModalTitle =
        "Are you sure you want to accept this purchase order change?";
    } else if (newState === "Rejected") {
      confirmationModalTitle =
        "Are you sure you want to reject this purchase order change?";
    }

    const confirmationModalSubtitle = "Note: This change cannot be undone.";

    setConfirmationModalVars({
      title: confirmationModalTitle,
      subtitle: confirmationModalSubtitle,
      newState: newState,
    });

    setShowPOChangeConfirmationModal(true);
  }

  function checkIfPOChangeCTAsToBeDisabled(
    manualOverrideDisableCTAs?: boolean
  ): void {
    if (manualOverrideDisableCTAs) {
      setpoChangeCTADisabled(true);
      return;
    } else {
      if (
        currentSelectedPOChangeDocTemp &&
        currentSelectedPOChangeDocTemp?.state[0]?.value === "New"
      ) {
        const allPOChangesInNewState = poChangeDocs?.filter(
          (item: any) => item.state[0]?.value === "New"
        );
        if (allPOChangesInNewState && allPOChangesInNewState?.length > 1) {
          const index = getSelectedPOChangeDocIndex(
            allPOChangesInNewState,
            currentSelectedPOChangeDocTemp.id
          );
          if (index !== undefined && index > 0) {
            setpoChangeCTADisabled(true);
            return;
          }
        }

        setpoChangeCTADisabled(false);
      }
    }
  }

  function getSelectedPOChangeDocIndex(
    poChangeDocs: any[],
    poChangeDocId: string
  ): number {
    let index = 0;
    const poChangeDoc = poChangeDocs?.find(
      (item: any) => item.id === poChangeDocId
    );
    if (poChangeDoc) {
      index = poChangeDocs?.indexOf(poChangeDoc);
    }
    return index;
  }

  function POChangeCTAConfirmationHandler() {
    setShowPOChangeConfirmationModal(false);
    checkIfPOChangeCTAsToBeDisabled(true);

    updatePOChangeState();
  }

  const {
    mutate,
    isLoading: isPOChangeStateUpdateLoading,
  } = usePostPOChangeState();

  function updatePOChangeState(): void {
    if (currentSelectedPOChangeDocTemp?.id !== undefined) {
      mutate(
        {
          poChangeId: currentSelectedPOChangeDocTemp?.id,
          newValue: confirmationModalVars.newState,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["850", id, undefined, version]);

            queryClient.invalidateQueries([
              "850",
              currentSelectedPOChangeDocTemp?.id,
              undefined,
              version,
            ]);

            queryClient.invalidateQueries([
              EDI_QUERY_KEYS.GET_PO_VERSIONS,
              orderId,
            ]);

            if (currentSelectedPOChangeDocTemp?.id) {
              navigateToSelectedPOChangeDoc(
                currentSelectedPOChangeDocTemp?.id,
                orderId
              );
            }
          },
        }
      );
    }
  }

  function POChangePanel() {
    const hasSourceDoc = result?.data?.data?.metadata?.source_850_doc_id
      ? true
      : false;

    if (result.isLoading) {
      return <Spinner spinning />;
    }

    if (!result.isLoading && !hasSourceDoc) {
      return (
        <POChangeDocsListContainer>
          <POChangeDocMetadataContainer>
            <POChangeDocInvalidStateContainer>
              <POEmojiContainer>
                <span role="img" aria-label="wave">
                  👋
                </span>
              </POEmojiContainer>
              <div>
                <p>
                  The original PO is not in Crstl. As a result, you cannot
                  Accept or Reject the PO changes; you can view the changes
                  below.
                </p>
                <p>
                  This usually happens if the original PO was received by your
                  previous EDI solution. For additional questions , please reach
                  out using the support chat on the right corner below. Thank
                  you.
                </p>
              </div>
            </POChangeDocInvalidStateContainer>
          </POChangeDocMetadataContainer>
        </POChangeDocsListContainer>
      );
    }
    return (
      <POChangeDocsListContainer>
        {poChangeDocs && poChangeDocs?.length > 0 ? (
          <div>
            <POChangeDocMetadataContainer>
              {currentSelectedPOChangeDoc?.state[0]?.value === "New" ? (
                <POChangeDocNewStateContainer>
                  <POChangeDocNewStateTextPrompt>
                    Do you accept or reject this Purchase Order change?
                  </POChangeDocNewStateTextPrompt>
                  <POChangeDocNewStateButtonsContainer className="po-change-cta-container">
                    <Button
                      onClick={() =>
                        handlePOChangeNewStateButtonOnClick("Accepted")
                      }
                      disabled={poChangeCTADisabled ? true : false}
                      style={{
                        backgroundColor: poChangeCTADisabled
                          ? COLORS.ULTRAMARINE_BLUE_FADED
                          : COLORS.ULTRAMARINE_BLUE,
                        color: poChangeCTADisabled
                          ? COLORS.WHITE
                          : COLORS.WHITE,
                        height: 42,
                        width: 126,
                        cursor: poChangeCTADisabled ? "not-allowed" : "pointer",
                      }}
                    >
                      Accept
                    </Button>

                    <Button
                      onClick={() =>
                        handlePOChangeNewStateButtonOnClick("Rejected")
                      }
                      disabled={poChangeCTADisabled ? true : false}
                      style={{
                        backgroundColor: poChangeCTADisabled
                          ? COLORS.WHITE
                          : COLORS.WHITE,
                        color: poChangeCTADisabled ? COLORS.GRAY : COLORS.BLACK,
                        height: 42,
                        width: 126,
                        cursor: poChangeCTADisabled ? "not-allowed" : "pointer",
                      }}
                    >
                      Reject
                    </Button>
                  </POChangeDocNewStateButtonsContainer>
                </POChangeDocNewStateContainer>
              ) : currentSelectedPOChangeDoc?.state[0]?.value === "Accepted" ? (
                <POChangeDocAcceptedStateContainer
                  isPOChangeAckSupported={isPOChangeAckSupported}
                >
                  <POChangeDocStateLabel
                    isPOChangeAckSupported={isPOChangeAckSupported}
                  >
                    This Purchase Order Change has been accepted by{" "}
                    {poChangeUpdatedBy} at{" "}
                    {currentSelectedPOChangeDoc?.state[0].updated_at
                      ? getZonedTime({
                          ISODateString:
                            currentSelectedPOChangeDoc?.state[0].updated_at,
                          withAltLabel: true,
                        })
                      : "-"}
                  </POChangeDocStateLabel>
                  <POChangeAckButton
                    isPOChangeAckSupported={isPOChangeAckSupported}
                    poChangeDoc={currentSelectedPOChangeDoc}
                    isFetching={associatedPOChangeDocs?.isFetching}
                  />
                </POChangeDocAcceptedStateContainer>
              ) : (
                <POChangeDocRejectedStateContainer
                  isPOChangeAckSupported={isPOChangeAckSupported}
                >
                  <POChangeDocStateLabel
                    isPOChangeAckSupported={isPOChangeAckSupported}
                  >
                    This Purchase Order Change has been rejected by{" "}
                    {poChangeUpdatedBy} at{" "}
                    {currentSelectedPOChangeDoc?.state[0].updated_at
                      ? getZonedTime({
                          ISODateString:
                            currentSelectedPOChangeDoc?.state[0].updated_at,
                          withAltLabel: true,
                        })
                      : "-"}
                  </POChangeDocStateLabel>
                  <POChangeAckButton
                    isPOChangeAckSupported={isPOChangeAckSupported}
                    poChangeDoc={currentSelectedPOChangeDoc}
                    isFetching={associatedPOChangeDocs?.isFetching}
                  />
                </POChangeDocRejectedStateContainer>
              )}
            </POChangeDocMetadataContainer>
            <POChangeDocsPaginationContainer>
              <Pagination
                className="po-change-pagination"
                simple
                defaultCurrent={currentSelectedPOChangeDocIndexBasedOnParam + 1}
                total={poChangeDocs?.length}
                pageSize={1}
                onChange={(e) => setPOChangeDocsPage(e)}
              />
            </POChangeDocsPaginationContainer>
          </div>
        ) : null}
      </POChangeDocsListContainer>
    );
  }

  return (
    <>
      <PageWrapper>
        <POChangeConfirmationModal
          showPOChangeConfirmationModal={showPOChangeConfirmationModal}
          closeModal={() => setShowPOChangeConfirmationModal(false)}
          title={confirmationModalVars.title}
          subTitle={confirmationModalVars.subtitle}
          newState={confirmationModalVars.newState}
          handleFinish={() => POChangeCTAConfirmationHandler()}
        />
        <POChangePanel />
        <div ref={downloadRef}>
          <GridContainer>
            <OrderViewContainer>
              <h2>{title}</h2>
              <HeaderContainer>
                <div>
                  <p>
                    Trading Partner:{" "}
                    <strong>{getTpfNameFromListDoc(listDocumentData)}</strong>
                  </p>
                  <p>
                    Order #: <strong>{BCH?.purchase_order_number_03}</strong>
                  </p>
                  <p>Release #: </p>
                  <p>
                    PO Type:{" "}
                    <strong>
                      {getDisplayNameForCode(
                        BCH?.purchase_order_type_code_02,
                        BCH_92_OPTIONS
                      )}
                      {" - "}
                      {getDisplayNameForCode(
                        BCH?.transaction_set_purpose_code_01,
                        BCH_355_OPTIONS
                      )}
                    </strong>
                  </p>
                  <p>Contract #: </p>
                  <p>Purchasing Contact: </p>
                  <p>Currency: </p>
                </div>
                <div
                  style={{
                    borderRadius: 4,
                    border: "1px solid #f0f0f0",
                    padding: "0px 12px",
                  }}
                >
                  <HeaderSummaryTable summary="These are the key and value pairs">
                    <tr>
                      <td>
                        PO Change Date:
                        <br />
                        {formatDate(BCH?.date_11)}
                      </td>
                      <td>
                        Requested Delivery Date:
                        <br />
                        {deliveryRequestedDate}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Requested Ship Date:
                        <br />
                        {requestedShipDate}
                      </td>
                      <td>
                        Cancel Date:
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Delivery Window:
                        <br />
                        {doNotDeliverBeforeDate} - {doNotDeliverAfterDate}
                      </td>
                      <td>
                        Shipping Window:
                        <br />
                        {shipNotBeforeDate} - {shipNoLaterDate}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Promised for Delivery
                        <br />
                        {promisedForDeliveryDate}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>
                        Vendor:
                        <br />
                        {REF?.reference_identification_02}
                      </td>
                      <td>
                        Department #:
                        <br />
                      </td>
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
                    title="Bill To/Ordered By:"
                    data={shippingInfo.buyingPartyReference}
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
              <ProductList
                data={data}
                partnerName={partnerName}
                partnerFlavorName={partnerFlavorName}
              />
            </OrderViewContainer>
            {/* <FormContainer>
            <FormSelect
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              onBlur={(e) => setPartnerName(e.target.value)}
            >
              <option value="target">Target</option>
              <option value="cvs">CVS</option>
              <option value="unfi">UNFI</option>
              <option value="walmart">Walmart</option>
              <option value="oas">OAS</option>
            </FormSelect>
            <FormInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormTextArea
              value={JSON.stringify(data, null, 2)}
              onChange={onFormDataChange}
            />
          </FormContainer> */}
          </GridContainer>
        </div>
      </PageWrapper>
    </>
  );
}

export default forwardRef(PurchaseOrderChangePage);

