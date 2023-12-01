import { Modal, ModalProps } from "antd";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

import { Spinner } from "components/atoms/loading";

type ComponentWrapperProps = {
  $customTopAndBottomPadding: string | undefined;
};

const ComponentWrapper = styled.div<ComponentWrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme, $customTopAndBottomPadding }) =>
      $customTopAndBottomPadding || theme.spacing.XXL}
    0;
`;

export interface IPaddedModalProps extends ModalProps {
  children: ReactNode;
  isLoading?: boolean;
  cancelCallback?: () => void;
  customTopAndBottomPadding?: string;
}

export const PaddedModal = ({
  isLoading,
  children,
  cancelCallback,
  customTopAndBottomPadding,
  ...rest
}: IPaddedModalProps): ReactElement => {
  return (
    <Modal
      width="65vw"
      footer={null}
      centered
      onCancel={cancelCallback}
      {...rest}
    >
      <ComponentWrapper $customTopAndBottomPadding={customTopAndBottomPadding}>
        {isLoading ? <Spinner size="large" /> : children}
      </ComponentWrapper>
    </Modal>
  );
};
