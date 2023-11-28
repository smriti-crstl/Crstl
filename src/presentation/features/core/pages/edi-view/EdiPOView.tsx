import { format } from "date-fns";
import {
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
import { EdiViewPageRef } from "./EdiViewPage";
import { ViewModeContainer } from "./EdiViewPage.styles";
import { PageParams } from "./types";

export interface EdiViewPageProps {
  documentTypeId: CoreEDIDocumentNumber;
}

const EdiPOView = (
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

  if (isFetchingListDoc || isFetchingSchemaData) {
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
        config={businessViewConfig[CoreEDIDocumentNumber.PurchaseOrder]}
        listDocData={listDocData}
        listDocSchema={schemaData}
      />
    </ViewModeContainer>
  );
};

const EdiPOViewWithRef = forwardRef(EdiPOView);

export { EdiPOViewWithRef as default };

