import { CORE_EDI_PO_CHANGE_ACK_EDIT_PAGE } from "globals/configs";
import { CoreEDIDocumentNumber } from "presentation/texts-reservoir";
import { useRef } from "react";
import { generatePath, useHistory, useParams } from "react-router-dom";

import { DownloadOutlined, EditOutlined } from "@ant-design/icons";

import { StyledSecondaryButton } from "../edi-edit/EdiEditPage.styles";
import EdiViewPage, { EdiViewPageRef } from "./EdiViewPage";
import { ButtonsContainer, Container, PageWrapper } from "./EdiViewPage.styles";

const EdiPOChangeAckView = () => {
  const viewerRef = useRef<EdiViewPageRef>(null);
  const { id, orderId } = useParams<{
    orderId: string;
    id: string;
  }>();
  const history = useHistory();

  const switchToEditMode = () => {
    const path = generatePath(CORE_EDI_PO_CHANGE_ACK_EDIT_PAGE, {
      id,
      orderId,
    });
    history.replace(path);
  };

  return (
    <PageWrapper>
      <Container>
        <ButtonsContainer>
          <StyledSecondaryButton
            onClick={() => viewerRef.current?.downloadPage?.()}
          >
            <DownloadOutlined />
            Download Document
          </StyledSecondaryButton>
          <StyledSecondaryButton onClick={switchToEditMode}>
            <EditOutlined />
            Edit PO Change Acknowledgement
          </StyledSecondaryButton>
        </ButtonsContainer>
        <EdiViewPage
          documentTypeId={CoreEDIDocumentNumber.PurchaseOrderChangeAck}
          ref={viewerRef}
        />
      </Container>
    </PageWrapper>
  );
};

export default EdiPOChangeAckView;

