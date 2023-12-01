import { useListDocumentQuery } from "domain/interactors/edi";
import { CORE_EDI_PO_CHANGE_ACK_EDIT_PAGE } from "globals/configs";
import html2pdf from "html2pdf.js";
import { get } from "lodash";
import {
  CORE_EDI_DOCUMENT_NAMES,
  CoreEDIDocumentNumber,
} from "presentation/texts-reservoir";
import { useRef } from "react";
import { generatePath, useHistory, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import { DownloadOutlined, EditOutlined } from "@ant-design/icons";
import { Spinner } from "components/atoms/loading";

import { StyledSecondaryButton } from "../edi-edit/EdiEditPage.styles";
import { ButtonsContainer } from "../edi-view/EdiViewPage.styles";
import { ProductList } from "./components/product-list";
import { firstTransactionSet } from "./constants";
import {
  AddressContainer,
  Container,
  HeaderContainer,
  PageWrapper,
} from "./EdiPOChangeAckViewPage.styles";
import { HeaderSummary } from "./HeaderSummary";
import { getPoNumber, OrderBasicInfo } from "./OrderBasicInfo";
import { ShippingAddress } from "./ShippingAddress";
import { POChangeAckAddress } from "./types";

const docNumber = CoreEDIDocumentNumber.PurchaseOrderChangeAck;
const title = CORE_EDI_DOCUMENT_NAMES[docNumber];

export const POChangeAckReadView = () => {
  const { id, orderId } = useParams<{
    orderId: string;
    id: string;
  }>();
  const downloadComponentRef = useRef(null);

  const history = useHistory();

  const switchToEditMode = () => {
    const path = generatePath(CORE_EDI_PO_CHANGE_ACK_EDIT_PAGE, {
      id,
      orderId,
    });
    history.replace(path);
  };

  const { data: listDocumentData, isLoading } = useListDocumentQuery(
    docNumber,
    id
  );

  const nameN1Loop = get(
    listDocumentData,
    `${firstTransactionSet}.heading.name_N1_loop`,
    []
  );

  const partnerName = get(
    listDocumentData,
    "data.metadata.trading_partner_name"
  )?.toLowerCase();

  const partnerFlavorName = get(
    listDocumentData,
    "data.metadata.trading_partner_flavor"
  )?.toLowerCase();

  const onPrintA4 = async (printIframe: HTMLIFrameElement) => {
    try {
      const document = printIframe.contentDocument;
      if (document) {
        const poNumber = getPoNumber(listDocumentData);
        const filename = `po_change_ack_${poNumber}.pdf`;

        const html = document.getElementsByTagName("html")[0];

        const exporter = new html2pdf(html, {
          margin: 10,
          filename,
          jsPDF: {
            unit: "mm",
            format: [210, 297],
            orientation: "landscape",
          }, // A4 format => [210mm X 297mm]
        });
        await exporter.getPdf(true);
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  const handleDownloadPOChangeAck = useReactToPrint({
    content: () => downloadComponentRef.current,
    print: onPrintA4,
  });

  return (
    <PageWrapper>
      <Container>
        <ButtonsContainer>
          <StyledSecondaryButton onClick={handleDownloadPOChangeAck}>
            <DownloadOutlined />
            Download Document
          </StyledSecondaryButton>
          <StyledSecondaryButton onClick={switchToEditMode}>
            <EditOutlined />
            Edit {title}
          </StyledSecondaryButton>
        </ButtonsContainer>
        <Spinner spinning={isLoading}>
          <div ref={downloadComponentRef}>
            <h2 style={{ marginTop: 18 }}>{title}</h2>
            <HeaderContainer>
              <OrderBasicInfo data={listDocumentData} />
              <HeaderSummary data={listDocumentData} />
            </HeaderContainer>
            <AddressContainer>
              {nameN1Loop?.map((data: POChangeAckAddress, idx: number) => (
                <ShippingAddress data={data} key={idx} />
              ))}
            </AddressContainer>
            <ProductList
              data={listDocumentData}
              partnerName={partnerName}
              partnerFlavorName={partnerFlavorName}
            />
          </div>
        </Spinner>
      </Container>
    </PageWrapper>
  );
};

