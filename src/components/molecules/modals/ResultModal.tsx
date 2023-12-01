import { ReactElement, ReactNode } from "react";
import styled, { css } from "styled-components";

import { CheckCircleFilled, WarningFilled } from "@ant-design/icons";
import { IModalProps, Modal } from "components/atoms/modal";

import PartyPopperImage from "../../assets/images/party-popper.png";
import { ColoredButton } from "../../atoms/buttons";
import { Spinner } from "../../atoms/loading";

const PartyPopper = styled.img`
  height: 2rem;
  margin-left: 0.5rem;
  padding-bottom: 0.5rem;
`;

// Styles
const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.XXL} 0;
`;

const TextWrapper = styled.span`
  font-weight: ${({ theme }) => theme.typography.WEIGHTS.MEDIUM};
  font-size: ${({ theme }) => theme.typography.SIZES.SM};
`;

const FadeTextWrapper = styled.span`
  font-size: ${({ theme }) => theme.typography.SIZES.XS};
  font-weight: ${({ theme }) => theme.typography.WEIGHTS.REGULAR};
  color: ${({ theme }) => theme.palette.greyScale[500]};
`;

const ButtonWrapper = styled(ColoredButton)`
  margin-top: ${({ theme }) => theme.spacing.LARGE};
`;

const IconStyles = css`
  font-size: ${({ theme }) => theme.typography.SIZES.XXL};
  margin-bottom: ${({ theme }) => theme.spacing.LARGE};
`;

const SuccessIconWrapper = styled(CheckCircleFilled)`
  ${IconStyles}
  color: ${({ theme }) => theme.palette.base.SUCCESS};
`;

const WarningIconWrapper = styled(WarningFilled)`
  ${IconStyles}
  color: ${({ theme }) => theme.palette.base.WARNING};
`;

// Helper Components
type SuccessProps = {
  handleSuccessButtonClick?: () => void;
  successText?: string;
  successButtonText?: string;
  showPartyPopper?: boolean;
};

const SuccessUI = ({
  handleSuccessButtonClick,
  successButtonText,
  successText,
  showPartyPopper,
}: SuccessProps): ReactElement => (
  <>
    <SuccessIconWrapper />
    <TextWrapper>
      {successText}
      {showPartyPopper && <PartyPopper src={PartyPopperImage} alt="🎉" />}
    </TextWrapper>
    <ButtonWrapper onClick={handleSuccessButtonClick}>
      {successButtonText}
    </ButtonWrapper>
  </>
);

type FailureProps = {
  handleFailureButtonClick?: () => void;
  failureText?: string;
  failureButtonText?: string;
  failureSubText?: string;
};

const FailureUI = ({
  handleFailureButtonClick,
  failureButtonText,
  failureSubText,
  failureText,
}: FailureProps): ReactElement => (
  <>
    <WarningIconWrapper />
    <TextWrapper>{failureText}</TextWrapper>
    <FadeTextWrapper>{failureSubText}</FadeTextWrapper>
    <ButtonWrapper onClick={handleFailureButtonClick}>
      {failureButtonText}
    </ButtonWrapper>
  </>
);

// Main Component
interface IResultModalProps extends IModalProps {
  children?: ReactNode;
  isSuccess?: boolean;
  isFailure?: boolean;
  texts: {
    successButtonText?: string;
    successText?: string;
    failureButtonText?: string;
    failureSubText?: string;
    failureText?: string;
  };
  isLoading?: boolean;
  cancelCallback?: () => void;
  width?: string;
  handleFailureButtonClick?: () => void;
  handleSuccessButtonClick?: () => void;
  showPartyPopper?: boolean;
}

const Content = ({
  children,
  isSuccess,
  isFailure,
  texts: {
    successButtonText,
    successText,
    failureButtonText,
    failureSubText,
    failureText,
  },
  isLoading,
  cancelCallback,
  handleFailureButtonClick,
  handleSuccessButtonClick,
  showPartyPopper,
}: IResultModalProps): ReactElement => {
  const handleModalCancel = (): void => {
    cancelCallback?.();
  };
  if (isLoading) {
    return <Spinner size="large" />;
  }
  return (
    <ComponentWrapper>
      {isSuccess && (
        <SuccessUI
          {...{
            successButtonText,
            successText,
            handleSuccessButtonClick:
              handleSuccessButtonClick || handleModalCancel,
            showPartyPopper,
          }}
        />
      )}
      {isFailure && (
        <FailureUI
          {...{
            failureButtonText,
            failureSubText,
            failureText,
            handleFailureButtonClick:
              handleFailureButtonClick || handleModalCancel,
          }}
        />
      )}
      {children}
    </ComponentWrapper>
  );
};

const ResultModal = (props: IResultModalProps): ReactElement => {
  const { width, cancelCallback, ...rest } = props;

  const handleModalCancel = (): void => {
    cancelCallback?.();
  };

  return (
    <Modal
      width={width || "65vw"}
      footer={null}
      centered
      onCancel={handleModalCancel}
      {...rest}
    >
      <Content {...props} />
    </Modal>
  );
};

export { ResultModal, Content };
