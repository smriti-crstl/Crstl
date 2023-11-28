import { CORE_EDI_PO_ACK_EDIT_PAGE } from "globals/configs";
import { useSearchParams } from "presentation/hooks/common";
import { CoreEDIDocumentNumber } from "presentation/texts-reservoir";
import { useRef } from "react";
import { generatePath, useHistory, useParams } from "react-router-dom";

import { DownloadOutlined, EditOutlined } from "@ant-design/icons";

import { StyledSecondaryButton } from "../edi-edit/EdiEditPage.styles";
import EdiViewPage, { EdiViewPageRef } from "./EdiViewPage";
import { ButtonsContainer, Container, PageWrapper } from "./EdiViewPage.styles";

const EdiPOAckView = () => {
  const viewerRef = useRef<EdiViewPageRef>(null);
  const { id, orderId } = useParams<{
    orderId: string;
    id: string;
  }>();
  const history = useHistory();

  const searchParams = useSearchParams();

  const switchToEditMode = () => {
    const path = generatePath(CORE_EDI_PO_ACK_EDIT_PAGE, {
      id,
      orderId,
    });
    const search = searchParams.toString();
    history.replace(`${path}?${search}`);
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
            Edit Acknowledgement
          </StyledSecondaryButton>
        </ButtonsContainer>
        <EdiViewPage
          documentTypeId={CoreEDIDocumentNumber.Acknowledgement}
          ref={viewerRef}
        />
      </Container>
    </PageWrapper>
  );
};

export default EdiPOAckView;

