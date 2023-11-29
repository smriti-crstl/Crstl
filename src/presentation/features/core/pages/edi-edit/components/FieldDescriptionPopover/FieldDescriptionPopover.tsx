import { Popover } from "antd";
import { compact } from "lodash";
import { useState } from "react";

import {
  Container,
  Description,
  Link,
  ModalContainer,
  ModalSubtitle,
  ModalTitle,
  StyledLabel,
  StyledModal,
  Title,
} from "./FieldDescriptionPopover.styles";

interface FieldDescriptionPopoverProps {
  title: string;
  description?: string;
}

const FieldDescriptionPopover = ({
  title,
  description,
}: FieldDescriptionPopoverProps): JSX.Element => {
  const [showGlossaryModal, setShowGlossaryModal] = useState(false);
  const [isSharePopoverVisible, setIsSharePopoverVisible] = useState(false);

  const openModal = () => {
    setShowGlossaryModal(true);
    setIsSharePopoverVisible(false);
  };

  const closeModal = () => {
    setShowGlossaryModal(false);
    setIsSharePopoverVisible(false);
  };

  const handlePopoverVisibleChange = () => {
    setIsSharePopoverVisible(!isSharePopoverVisible);
  };

  const lines = compact(description?.split("\n"));

  const content = (
    <Container>
      <Title>{title}</Title>
      {lines?.length ? (
        <Description>
          {lines.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </Description>
      ) : null}
      <Link onClick={openModal}>Details</Link>
    </Container>
  );

  return (
    <>
      <Popover
        content={content}
        visible={isSharePopoverVisible}
        onVisibleChange={handlePopoverVisibleChange}
        // trigger="click"
      >
        <StyledLabel>{title}</StyledLabel>
      </Popover>
      <StyledModal
        open={showGlossaryModal}
        onCancel={closeModal}
        onOk={closeModal}
        footer={null}
      >
        <ModalContainer>
          <ModalTitle>{title}</ModalTitle>
          <ModalSubtitle>
            {lines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </ModalSubtitle>
        </ModalContainer>
      </StyledModal>
    </>
  );
};

export { FieldDescriptionPopover };

