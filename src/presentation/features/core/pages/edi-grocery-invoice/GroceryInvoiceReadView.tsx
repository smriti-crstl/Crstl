import { useListDocumentQuery } from "domain/interactors/edi";
import { CORE_EDI_GROCERY_INVOICE_EDIT_PAGE } from "globals/configs";
import html2pdf from "html2pdf.js";
import { get } from "lodash";
import { useRef } from "react";
import { generatePath, useHistory, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import { CloudDownloadOutlined, EditOutlined } from "@ant-design/icons";
import { Spinner } from "@crstl/components/atoms/loading";

import { StyledSecondaryButton } from "../edi-edit/EdiEditPage.styles";
import {
  getGroceryInvoiceNumber,
  GroceryInvoiceFreightInfo,
  GroceryInvoiceHeader,
  GroceryInvoiceShipmentAddresses,
  ProductList,
} from "./components";
import { ButtonsContainer, Container, PageWrapper } from "./styles";

export const GroceryInvoiceReadView = () => {
  const history = useHistory();
  const { id, orderId } = useParams<{
    orderId: string;
    id: string;
  }>();
  const downloadComponentRef = useRef(null);

  const { data: listDocumentData, isLoading } = useListDocumentQuery("880", id);

  const switchToEditMode = () => {
    const path = generatePath(CORE_EDI_GROCERY_INVOICE_EDIT_PAGE, {
      id: id,
      orderId: orderId,
    });
    history.replace(path);
  };

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
        const invoiceNumber = getGroceryInvoiceNumber(listDocumentData);
        const filename = `grocery_invoice_${invoiceNumber}.pdf`;

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

  const handleDownloadInvoice = useReactToPrint({
    content: () => downloadComponentRef.current,
    print: onPrintA4,
  });

  return (
    <PageWrapper>
      <Container>
        <ButtonsContainer>
          <StyledSecondaryButton onClick={switchToEditMode}>
            <EditOutlined />
            Edit Invoice
          </StyledSecondaryButton>
          <StyledSecondaryButton onClick={handleDownloadInvoice}>
            <CloudDownloadOutlined />
            Download Document
          </StyledSecondaryButton>
        </ButtonsContainer>
        <Spinner spinning={isLoading}>
          <div ref={downloadComponentRef}>
            <h2>Grocery Invoice</h2>
            <GroceryInvoiceHeader data={listDocumentData} />
            <GroceryInvoiceShipmentAddresses data={listDocumentData} />
            <GroceryInvoiceFreightInfo data={listDocumentData} />
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

