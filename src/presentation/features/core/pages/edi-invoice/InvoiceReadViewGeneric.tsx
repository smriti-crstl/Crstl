import {
  useGetInvoiceAdditionalData,
  useListDocumentQuery,
} from "domain/interactors/edi";
import { CORE_EDI_INVOICE_EDIT_PAGE } from "globals/configs";
import html2pdf from "html2pdf.js";
import React, { useEffect, useRef } from "react";
import { generatePath, useHistory, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import { CloudDownloadOutlined, EditOutlined } from "@ant-design/icons";
import { Spinner } from "@crstl/components/atoms/loading";

import {
  ButtonContainer,
  StyledSecondaryButton,
} from "../edi-edit/EdiEditPage.styles";
import { LoadingContainer } from "../edi-forms/cvs/invoice/InvoiceReadView.styles";
import { PageWrapper } from "../edi-purchase-order/PurchaseOrderPage.styles";
import { Container } from "../edi/EdiPurchaseOrderSection.styles";
import initialData from "./data/target-neuro-1021.json";
import {
  GenericInvoiceReadViewFreight,
  GenericInvoiceReadViewHeader,
  GenericInvoiceReadViewProductList,
  GenericInvoiceReadViewShipment,
  getInvoiceNumber,
} from "./generic-sub-components";
import { GridContainer, InvoiceViewContainer } from "./InvoiceReadView.styles";

function InvoiceReadViewGeneric() {
  const [title] = React.useState("Invoice");
  const [data, setData] = React.useState<unknown>(initialData);
  const { id, orderId } = useParams<{
    orderId: string;
    id: string;
  }>();
  const downloadComponentRef = useRef(null);

  const result = useListDocumentQuery("810", id);
  const additionalData = useGetInvoiceAdditionalData(id);
  const history = useHistory();

  const { data: listDocumentData, isFetching } = id
    ? result
    : { isFetching: false, data: undefined };

  const { data: additionalInvoiceData, isFetching: additionalDataFetching } = id
    ? additionalData
    : { isFetching: false, data: undefined };

  useEffect(() => {
    if (listDocumentData) {
      setData(listDocumentData.data?.file?.json_edi);
    }
  }, [listDocumentData]);

  const switchToEditMode = () => {
    const path = generatePath(CORE_EDI_INVOICE_EDIT_PAGE, {
      id: id,
      orderId: orderId,
    });
    history.replace(path);
  };

  const onPrintA4 = async (printIframe: HTMLIFrameElement) => {
    try {
      const document = printIframe.contentDocument;
      if (document) {
        const filename = `Invoice-${getInvoiceNumber(data)}.pdf`;

        const html = document.getElementsByTagName("html")[0];

        const exporter = new html2pdf(html, {
          margin: 10,
          filename,
          jsPDF: { unit: "mm", format: [210, 297], orientation: "landscape" }, // A4 format => [210mm X 297mm]
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

  if (isFetching) {
    return (
      <PageWrapper>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </PageWrapper>
    );
  }
  return (
    <PageWrapper>
      <Container>
        <InvoiceViewContainer>
          <ButtonContainer>
            <StyledSecondaryButton onClick={switchToEditMode}>
              <EditOutlined />
              Edit Invoice
            </StyledSecondaryButton>
            <StyledSecondaryButton onClick={handleDownloadInvoice}>
              <CloudDownloadOutlined />
              Download Document
            </StyledSecondaryButton>
          </ButtonContainer>
          <div ref={downloadComponentRef}>
            <h2 style={{ marginTop: 18 }}>{title}</h2>
            <GenericInvoiceReadViewHeader data={data} />
            <GenericInvoiceReadViewShipment data={data} />
            <GenericInvoiceReadViewFreight data={data} />
            <GenericInvoiceReadViewProductList
              data={data}
              additionalData={additionalData?.data?.data}
            />
          </div>
        </InvoiceViewContainer>
      </Container>
    </PageWrapper>
  );
}

export default InvoiceReadViewGeneric;

