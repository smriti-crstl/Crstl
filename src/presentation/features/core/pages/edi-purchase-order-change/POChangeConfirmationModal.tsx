import {
  ButtonContainer,
  CancelButton,
  POChangeConfirmationModalContainer,
  OKButton,
  StyledModal,
  Subtitle,
  Title,
} from "./POChangeConfirmationModal.styles";
import { amplitude } from "presentation/utils";

type POChangeConfirmationModalProps = {
  showPOChangeConfirmationModal: boolean;
  closeModal: () => void;
  title: string;
  subTitle: string;
  newState: "Accepted" | "Rejected";
  path?: string;
  handleFinish: () => void;
};

const POChangeConfirmationModal = ({
  showPOChangeConfirmationModal,
  closeModal,
  title,
  subTitle,
  newState,
  path,
  handleFinish,
}: POChangeConfirmationModalProps) => {
  const isAcceptedState = newState === "Accepted";

  return (
    <StyledModal
      width={740}
      open={showPOChangeConfirmationModal}
      footer={null}
      closable={true}
      onCancel={closeModal}
      style={{ top: "24vh", left: "10vw" }}
    >
      <POChangeConfirmationModalContainer>
        <Title>{title}</Title>
        <Subtitle>{subTitle}</Subtitle>
        <ButtonContainer className="po-change-cta-container">
          <OKButton
            type="primary"
            onClick={() => {
              const action = isAcceptedState ? "accepted" : "rejected";
              amplitude.logClickEvent(`EDI PO Change ${action}`);
              handleFinish();
            }}
          >
            {isAcceptedState ? "Yes, accept" : "Yes, reject"}
          </OKButton>
          <CancelButton
            onClick={() => {
              amplitude.logClickEvent("EDI PO Change cancel");
              closeModal();
            }}
          >
            No, cancel
          </CancelButton>
        </ButtonContainer>
      </POChangeConfirmationModalContainer>
    </StyledModal>
  );
};

export default POChangeConfirmationModal;
