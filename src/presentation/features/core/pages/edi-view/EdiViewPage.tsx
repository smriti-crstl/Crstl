import { format } from "date-fns";
import {
  useGetAdditionalASNDataQuery,
  useGetInvoiceAdditionalData,
  useGetListDocumentSchema,
  useListDocumentQuery,
} from "domain/interactors/edi";
import html2pdf from "html2pdf.js";
import {
  CORE_EDI_DOCUMENT_NAMES,
  CoreEDIDocumentNumber,
} from "presentation/texts-reservoir";
import { forwardRef, Ref, useImperativeHandle, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import { Spinner } from "@crstl/components/atoms/loading";

import { businessViewConfig, BusinessViewRenderer } from "./components";
import { ViewModeContainer } from "./EdiViewPage.styles";

declare global {
  interface Window {
    JSONSchemaForm: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      default: any;
    };
  }
}

interface PageParams {
  orderId: string;
  id: string;
  customer?: string;
}

interface EdiViewPageProps {
  documentTypeId: CoreEDIDocumentNumber;
}

export interface EdiViewPageRef {
  downloadPage?: () => void;
}

const EdiViewPage = (
  { documentTypeId }: EdiViewPageProps,
  parentRef: Ref<EdiViewPageRef>
) => {
  const params = useParams<PageParams>();
  const downloadComponentRef = useRef<HTMLDivElement>(null);

  const { id: documentId } = params;

  const {
    data: listDocData,
    isFetching: isFetchingListDoc,
  } = useListDocumentQuery(documentTypeId, documentId);

  const {
    data: schemaData,
    isFetching: isFetchingSchemaData,
  } = useGetListDocumentSchema(documentTypeId, documentId);

  const {
    data: asnData,
    isFetching: asnDataFetching,
  } = useGetAdditionalASNDataQuery(documentId, {
    enabled: documentTypeId === CoreEDIDocumentNumber.ShipNotice,
  });

  const {
    data: invoiceData,
    isFetching: invoiceDataFetching,
  } = useGetInvoiceAdditionalData(documentId, {
    enabled: documentTypeId === CoreEDIDocumentNumber.Invoice,
  });

  const onPrintA4 = async (printIframe: HTMLIFrameElement) => {
    try {
      const document = printIframe.contentDocument;
      if (document) {
        const timestamp = format(new Date(), "LLLL dd yyyy");
        const filename = `${title}_${timestamp}.pdf`;

        const html = document.getElementsByTagName("html")[0];

        const exporter = new html2pdf(html, {
          margin: 10,
          filename,
          jsPDF: { unit: "mm", format: [210, 297] }, // A4 format => [210mm X 297mm]
        });
        await exporter.getPdf(true);
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  const handleDownloadButton = useReactToPrint({
    content: () => downloadComponentRef.current,
    print: onPrintA4,
  });

  // * Note: this exposes a ref to the parent component and can trigger the download view mode from outside of the component
  useImperativeHandle(parentRef, () => ({
    downloadPage: handleDownloadButton,
  }));

  const { enhancedSchema } = schemaData ?? {};

  if (
    isFetchingListDoc ||
    isFetchingSchemaData ||
    asnDataFetching ||
    invoiceDataFetching
  ) {
    return (
      <ViewModeContainer>
        <Spinner />
      </ViewModeContainer>
    );
  }

  if (!enhancedSchema) {
    return null;
  }

  const title =
    CORE_EDI_DOCUMENT_NAMES[documentTypeId as CoreEDIDocumentNumber];

  return (
    <ViewModeContainer ref={downloadComponentRef}>
      <BusinessViewRenderer
        documentTypeId={documentTypeId}
        config={businessViewConfig[documentTypeId]}
        listDocData={listDocData}
        listDocSchema={schemaData}
        asnData={asnData}
        invoiceData={invoiceData}
      />
    </ViewModeContainer>
  );
};

const EdiViewPageWithRef = forwardRef(EdiViewPage);

export { EdiViewPageWithRef as default };

