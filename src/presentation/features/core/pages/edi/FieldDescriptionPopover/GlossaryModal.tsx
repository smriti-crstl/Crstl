import { useEffect } from "react";
import {
  Container,
  Header,
  Row,
  RowKey,
  StyledModal,
  TableContainer,
  Title,
  Subtitle,
} from "./GlossaryModal.styles";
import { EDI_GLOSSARY } from "./ShortCodeGlossary.config";

interface GlossaryModalProps {
  showGlossaryModal: boolean;
  onCancel: () => void;
  segmentCode: string;
  glossaryKey: string;
  highlightElement: boolean;
  shortCode: string;
}

const GlossaryModal = ({
  showGlossaryModal,
  onCancel,
  segmentCode,
  glossaryKey,
  highlightElement,
  shortCode,
}: GlossaryModalProps) => {
  const glossary = EDI_GLOSSARY[glossaryKey][segmentCode];
  const { SEGMENT, ELEMENTS } = glossary;

  const glossaryItems = Object.values(ELEMENTS);

  const getElementName = (code: string) => {
    const split = code.split("_");
    return split?.[0] + (split?.[1] || "");
  };

  const isElementHighlighted = (code: string) =>
    highlightElement && code === shortCode;

  useEffect(() => {
    if (showGlossaryModal) {
      setTimeout(() => {
        const highlightedDiv = document.getElementById("highlighted");
        highlightedDiv?.scrollIntoView({
          block: "nearest",
          // behavior: "smooth",
        });
      }, 500);
    }
  }, [showGlossaryModal]);

  return (
    <StyledModal
      open={showGlossaryModal}
      destroyOnClose={true}
      footer={null}
      onCancel={onCancel}
    >
      <Container>
        <Header>
          <Title>{SEGMENT.name}</Title>
          <Subtitle>{SEGMENT.description}</Subtitle>
        </Header>
        <TableContainer>
          <table style={{ width: "100%" }}>
            <tbody>
              {glossaryItems.map((item: any, index: number) => {
                const highlight = isElementHighlighted(item.code);
                return (
                  <Row
                    id={highlight ? "highlighted" : ""}
                    highlight={highlight}
                    key={index}
                  >
                    <RowKey>{getElementName(item?.code)}</RowKey>
                    <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
                      {item?.description}
                    </td>
                  </Row>
                );
              })}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </StyledModal>
  );
};

export default GlossaryModal;

