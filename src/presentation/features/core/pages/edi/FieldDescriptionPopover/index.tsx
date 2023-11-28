import { theme } from "globals/themes";
import React, { useState } from "react";

import { InfoCircleOutlined } from "@ant-design/icons";

import {
  Container,
  Description,
  Link,
  StyledPopover,
  Title,
} from "./FieldDescriptionPopover.styles";
import GlossaryModal from "./GlossaryModal";
import { EDI_GLOSSARY } from "./ShortCodeGlossary.config";
import { compact } from "lodash";

const Content = (
  title: string,
  description: string,
  hideTitle: boolean,
  hideDescription: boolean,
  hideViewGlossary: boolean,
  glossaryKey: string,
  shortCode: string,
  segment: boolean,
  showGlossaryModal: boolean,
  openModal: () => void,
  closeModal: () => void
) => {
  let highlightElement = false;
  let segmentCode = "";
  if (segment) {
    segmentCode = shortCode;
  } else {
    highlightElement = true;
    segmentCode = shortCode.substring(0, shortCode.indexOf("_")) || "";
  }
  return (
    <Container>
      <GlossaryModal
        showGlossaryModal={showGlossaryModal}
        onCancel={closeModal}
        segmentCode={segmentCode}
        glossaryKey={glossaryKey}
        highlightElement={highlightElement}
        shortCode={shortCode}
      />
      {!hideTitle && <Title>{title}</Title>}
      {!hideDescription && <Description>{description}</Description>}
      {!hideViewGlossary && <Link onClick={openModal}>View in Glossary</Link>}
    </Container>
  );
};

function PlainTextContent({ content }: { content: string }) {
  const lines = compact(content.split("\n"));
  return (
    <Container>
      <Description>
        {lines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </Description>
    </Container>
  );
}

const getPopverDataFromGlossaryKey = (
  glossaryKey: string,
  shortCode: string,
  segment: boolean
) => {
  if (segment) {
    return {
      title: EDI_GLOSSARY[glossaryKey][shortCode]?.SEGMENT?.name || "",
      description:
        EDI_GLOSSARY[glossaryKey][shortCode]?.SEGMENT?.description || "",
    };
  } else {
    const segmentCode = shortCode.substring(0, shortCode.indexOf("_")) || "";
    return {
      title:
        EDI_GLOSSARY[glossaryKey][segmentCode]["ELEMENTS"][shortCode]?.name ||
        "",
      description:
        EDI_GLOSSARY[glossaryKey][segmentCode]["ELEMENTS"][shortCode]
          ?.description || "",
    };
  }
};

interface FieldDescriptionPopoverProps {
  glossaryKey: string;
  shortCode: string;
  hideTitle?: boolean;
  hideDescription?: boolean;
  hideViewGlossary?: boolean;
  segment?: boolean;
  content?: string;
}

const FieldDescriptionPopover = ({
  glossaryKey,
  shortCode,
  hideTitle = true,
  hideDescription = false,
  hideViewGlossary = false,
  segment = false,
  content,
}: FieldDescriptionPopoverProps): JSX.Element => {
  const [showGlossaryModal, setShowGlossaryModal] = useState(false);
  const [isSharePopoverVisible, setIsSharePopoverVisible] = useState(false);

  const { title, description } = getPopverDataFromGlossaryKey(
    glossaryKey,
    shortCode,
    segment
  );

  if (!shortCode || !glossaryKey) {
    return <></>;
  }

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

  const popoverContent = content
    ? () => <PlainTextContent content={content} />
    : Content(
        title,
        description,
        hideTitle,
        hideDescription,
        hideViewGlossary,
        glossaryKey,
        shortCode,
        segment,
        showGlossaryModal,
        openModal,
        closeModal
      );

  return (
    <StyledPopover
      content={popoverContent}
      visible={isSharePopoverVisible}
      onVisibleChange={handlePopoverVisibleChange}
    >
      <InfoCircleOutlined
        style={{
          color: `${theme.palette.colors.GRAY}`,
        }}
      />
    </StyledPopover>
  );
};

export default FieldDescriptionPopover;
