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
import { useTpfForLD, useUserDetails } from "presentation/hooks/common";
import { useTimestamp } from "presentation/hooks/common/use-timestamp";
import { CoreEDIDocumentNumber } from "presentation/texts-reservoir";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { generatePath, useHistory, useParams } from "react-router-dom";

import { Spinner } from "@crstl/components/atoms/loading";

import { POChangeAckButton } from "../edi-purchase-order-change/POChangeAckButton";
import POChangeConfirmationModal from "../edi-purchase-order-change/POChangeConfirmationModal";
import {
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
} from "../edi-purchase-order-change/PurchaseOrderChangePage.styles";

const EdiPurchaseOrderChangeView = () => {
  const queryClient = useQueryClient();
  const flags = useFlags();

  const { id, orderId, version } = useParams<{
    id: string;
    orderId: string;
    version: string;
  }>();

  const [currentSelectedPOChangeDoc, setSelectedPOChangeDoc] = useState<any>();
  const [poChangeUpdatedBy, setSelectedPOChangeDocUpdatedBy] = useState("NA");

  const [poChangeCTADisabled, setpoChangeCTADisabled] = useState(false);

  const [
    showPOChangeConfirmationModal,
    setShowPOChangeConfirmationModal,
  ] = useState(false);

  const [confirmationModalVars, setConfirmationModalVars] = useState<{
    newState: PostPOChangeStateReq["newValue"];
    title: string;
    subtitle: string;
  }>({
    newState: "Accepted",
    title: "",
    subtitle: "",
  });

  const result = useListDocumentQuery(
    CoreEDIDocumentNumber.PurchaseOrderChange,
    id
  );
  const history = useHistory();
  const { getZonedTime } = useTimestamp();

  const associatedPOChangeDocs = useGetAssociatedPOChangeDocsQuery(orderId);
  const poChangeDocs =
    associatedPOChangeDocs?.data?.code === "success" &&
    associatedPOChangeDocs?.data?.data !== undefined
      ? associatedPOChangeDocs?.data?.data
      : [];

  const [{ data: userData }] = useUserDetails();

  const { data: teamsData } = useUserTeamQuery(userData?.organizationId || "", {
    enabled: !!userData?.organizationId,
  });

  const getSelectedPOChangeDocIndex = (
    poChangeDocs: any[],
    poChangeDocId: string
  ): number => {
    let index = 0;
    const poChangeDoc = poChangeDocs?.find(
      (item: any) => item.id === poChangeDocId
    );
    if (poChangeDoc) {
      index = poChangeDocs?.indexOf(poChangeDoc);
    }
    return index;
  };

  const currentSelectedPOChangeDocIndexBasedOnParam = getSelectedPOChangeDocIndex(
    poChangeDocs,
    id
  );

  let currentSelectedPOChangeDocTemp =
    poChangeDocs && poChangeDocs?.length > 0
      ? poChangeDocs[currentSelectedPOChangeDocIndexBasedOnParam]
      : undefined;

  let updaterUser: any = undefined;

  const getNameOfPOChangeUpdater = (): void => {
    updaterUser = undefined;
    const userIdOfUpdater =
      currentSelectedPOChangeDocTemp?.state[0]?.updated_by;
    if (userIdOfUpdater) {
      updaterUser = teamsData?.find((item: any) => item.id === userIdOfUpdater);
    }
  };

  getNameOfPOChangeUpdater();

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

  const setPOChangeDocsPage = (paginationInput: any) => {
    currentSelectedPOChangeDocTemp = poChangeDocs[paginationInput - 1];
    setSelectedPOChangeDoc(currentSelectedPOChangeDocTemp);
    getNameOfPOChangeUpdater();
    updaterUser
      ? setSelectedPOChangeDocUpdatedBy(updaterUser.fullName)
      : setSelectedPOChangeDocUpdatedBy("NA");

    checkIfPOChangeCTAsToBeDisabled();

    navigateToSelectedPOChangeDoc(currentSelectedPOChangeDocTemp.id, orderId);
  };

  const navigateToSelectedPOChangeDoc = (
    poChangeDocId: string,
    poId: string
  ): void => {
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
  };

  const handlePOChangeNewStateButtonOnClick = (
    newState: PostPOChangeStateReq["newValue"]
  ) => {
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
  };

  const checkIfPOChangeCTAsToBeDisabled = (
    manualOverrideDisableCTAs?: boolean
  ): void => {
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
  };

  const POChangeCTAConfirmationHandler = () => {
    setShowPOChangeConfirmationModal(false);
    checkIfPOChangeCTAsToBeDisabled(true);

    updatePOChangeState();
  };

  const { mutate } = usePostPOChangeState();

  const updatePOChangeState = (): void => {
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
  };

  // ! Note: call this hook when TPF info is supposed to be passed to LD
  // ! Note: works only when current component is rendered - cleaned up on unmount
  useTpfForLD(result?.data);
  const isPOChangeAckSupported = flags?.edi865Supported;

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
      <POChangeConfirmationModal
        showPOChangeConfirmationModal={showPOChangeConfirmationModal}
        closeModal={() => setShowPOChangeConfirmationModal(false)}
        title={confirmationModalVars.title}
        subTitle={confirmationModalVars.subtitle}
        newState={confirmationModalVars.newState}
        handleFinish={() => POChangeCTAConfirmationHandler()}
      />
      <POChangePanel />
    </>
  );
};

export default EdiPurchaseOrderChangeView;

