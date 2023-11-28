import { Pagination } from "antd";
import { PostPOChangeStateReq } from "domain/entity/edi/models";
import {
  useGetAssociatedPOChangeDocsQuery,
  useListDocumentQuery,
  usePostPOChangeState,
} from "domain/interactors/edi";
import { useUserTeamQuery } from "domain/interactors/shared";
import {
  CORE_EDI_GROCERY_PURCHASE_ORDER_CHANGE,
  CORE_EDI_PURCHASE_ORDER_CHANGE,
} from "globals/configs";
import { get } from "lodash";
import { useUserDetails } from "presentation/hooks/common";
import { useTimestamp } from "presentation/hooks/common/use-timestamp";
import { useState } from "react";
import { generatePath, useHistory, useParams } from "react-router-dom";

import { Spinner } from "@crstl/components/atoms/loading";

import POChangeConfirmationModal from "../../edi-purchase-order-change/POChangeConfirmationModal";
import { ExternalPONote } from "./ExternalPONote";
import {
  AcceptButton,
  POChangeDocMetadataContainer,
  POChangeDocNewStateButtonsContainer,
  POChangeDocNewStateContainer,
  POChangeDocNewStateTextPrompt,
  POChangeDocsListContainer,
  POChangeDocsPaginationContainer,
  POChangeDocStateLabel,
  POChangeStateContainer,
  RejectButton,
} from "./styles";
import { ModalVars, PageParams } from "./types";

interface PublicProps {
  documentType: string;
  sourceDocumentType: string;
}

export const POChangePanel: React.FC<PublicProps> = ({
  documentType,
  sourceDocumentType,
}) => {
  const [{ data: userData }] = useUserDetails();
  const { id, orderId } = useParams<PageParams>();
  const history = useHistory();
  const { getZonedTime } = useTimestamp();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalVars, setModalVars] = useState<ModalVars>({
    newState: "Accepted",
    title: "",
    subtitle: "",
  });

  const { data: listDocumentData, isLoading } = useListDocumentQuery(
    documentType,
    id
  );
  const hasSourceDoc = !!get(
    listDocumentData,
    `data.metadata.source_${sourceDocumentType}_doc_id`
  );

  const { data: poChangeData, isFetching } = useGetAssociatedPOChangeDocsQuery(
    orderId,
    sourceDocumentType
  );
  const poChangeDocs = get(poChangeData, "data", []);

  const { data: teamsDataMap } = useUserTeamQuery(
    userData?.organizationId || "",
    {
      select: (response) => {
        // creating a <id, fullName> map for ease of access
        const teamMembersMap: Record<string, string> = {};
        response.forEach((user) => {
          teamMembersMap[user.id] = user.fullName;
        });
        return teamMembersMap;
      },
    }
  );

  const currentIdx = poChangeDocs.findIndex((item) => item.id === id);
  const currentSelectedDoc = poChangeDocs[currentIdx];
  const updatedById = get(currentSelectedDoc, "state[0].updated_by");
  const updatedByName = teamsDataMap?.[updatedById || ""] ?? "NA";
  const updatedAt = get(currentSelectedDoc, "state[0].updated_at");
  const currentState = get(currentSelectedDoc, "state[0].value");

  const handlePageChange = (newPage: number) => {
    const newId = poChangeDocs[newPage - 1]?.id;
    if (!newId) {
      return;
    }
    const newPath = generatePath(
      sourceDocumentType === "875"
        ? CORE_EDI_GROCERY_PURCHASE_ORDER_CHANGE
        : CORE_EDI_PURCHASE_ORDER_CHANGE,
      { id: newId, orderId }
    );
    history.push(newPath);
  };

  const handleActionButtonClick = (
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

    setModalVars({
      title: confirmationModalTitle,
      subtitle: confirmationModalSubtitle,
      newState: newState,
    });

    setShowModal(true);
  };

  const { mutate, isLoading: isUpdatingPOChangeState } = usePostPOChangeState();

  const handleModalFinish = () => {
    setShowModal(false);

    mutate({
      poChangeId: currentSelectedDoc.id,
      newValue: modalVars.newState,
      sourceDocumentType,
    });
  };

  if (!isLoading && !hasSourceDoc) {
    return <ExternalPONote />;
  }

  return (
    <Spinner spinning={isFetching || isUpdatingPOChangeState}>
      <POChangeDocsListContainer>
        <POChangeConfirmationModal
          showPOChangeConfirmationModal={showModal}
          closeModal={() => setShowModal(false)}
          title={modalVars.title}
          subTitle={modalVars.subtitle}
          newState={modalVars.newState}
          handleFinish={handleModalFinish}
        />
        {poChangeDocs?.length > 0 ? (
          <div>
            <POChangeDocMetadataContainer>
              {currentState === "New" ? (
                <POChangeDocNewStateContainer>
                  <POChangeDocNewStateTextPrompt>
                    Do you accept or reject this Purchase Order change?
                  </POChangeDocNewStateTextPrompt>
                  <POChangeDocNewStateButtonsContainer className="po-change-cta-container">
                    <AcceptButton
                      disabled={false}
                      onClick={() => handleActionButtonClick("Accepted")}
                    >
                      Accept
                    </AcceptButton>
                    <RejectButton
                      disabled={false}
                      onClick={() => handleActionButtonClick("Rejected")}
                    >
                      Reject
                    </RejectButton>
                  </POChangeDocNewStateButtonsContainer>
                </POChangeDocNewStateContainer>
              ) : (
                <POChangeStateContainer state={currentState}>
                  <POChangeDocStateLabel>
                    {`This Purchase Order Change has been ${currentState.toLowerCase()} by ${updatedByName} at ${
                      updatedAt
                        ? getZonedTime({
                            ISODateString: updatedAt,
                            withAltLabel: true,
                          })
                        : "-"
                    }`}
                  </POChangeDocStateLabel>
                </POChangeStateContainer>
              )}
            </POChangeDocMetadataContainer>
            <POChangeDocsPaginationContainer>
              <Pagination
                className="po-change-pagination"
                simple
                defaultCurrent={currentIdx + 1}
                total={poChangeDocs?.length}
                pageSize={1}
                onChange={handlePageChange}
              />
            </POChangeDocsPaginationContainer>
          </div>
        ) : null}
      </POChangeDocsListContainer>
    </Spinner>
  );
};

