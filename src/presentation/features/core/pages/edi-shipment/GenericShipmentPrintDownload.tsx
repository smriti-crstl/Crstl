// import { Button } from "antd";
import {
  EDI_QUERY_KEYS,
  useDownloadShippingLabels,
  useListDocumentQuery,
} from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import html2pdf from "html2pdf.js";
import { chunk, get, last } from "lodash";
import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import styled from "styled-components";

import { getTpfName } from "../edi/edi.utils";
import shippingLabelData from "./data/shipping-label.json";
import { shipmentLabelViewMap } from "./edi-shipment-label-templates";
import { ShipmentPrintPageMcLane } from "./edi-shipment-label-templates/McLane/ShipmentPrintPageMcLane";
import { ShipNoticeSortByOption } from "./sub-components/ShipNoticeConfig";

interface ShipmentDownloadPreviewProps {
  setLoader: Dispatch<SetStateAction<boolean>>;
  sortBy: ShipNoticeSortByOption;
  tradingPartnerName: string;
  tradingPartnerFlavor?: string;
  asnListDocumentData: any;
}

export const StyledContainer = styled.div`
  border: none;
  justify-content: center;
  display: flex;
`;

function getPageSections(html: HTMLHtmlElement) {
  const allStyles = Array.from(html.querySelectorAll("style").values());
  const allPages = Array.from(html.querySelectorAll(".page").values());
  const pageChunks = chunk(allPages, 50);

  const pageSections = pageChunks.map((pageChunkData) => {
    const pageSection = document.createElement("div");
    pageSection.append(...allStyles);
    pageSection.append(...pageChunkData);
    return pageSection;
  });

  return pageSections;
}

function GenericShipmentPrintDownload({
  setLoader,
  sortBy,
  tradingPartnerName,
  tradingPartnerFlavor,
  asnListDocumentData,
}: ShipmentDownloadPreviewProps) {
  const componentRef = React.useRef(null);
  const { orderId } = useParams<Record<string, string>>();
  const queryClient = useQueryClient();

  const sourceDocumentId = get(
    asnListDocumentData,
    "data.metadata.source_document_id"
  );
  const sourceDocumentType = get(
    asnListDocumentData,
    "data.metadata.source_document_type"
  );

  const { data: poListDocumentData } = useListDocumentQuery(
    sourceDocumentType,
    sourceDocumentId,
    undefined,
    undefined,
    {
      enabled: !!sourceDocumentId && !!sourceDocumentType,
    }
  );

  const { data, isFetchingNextPage, fetchNextPage } = useDownloadShippingLabels(
    orderId,
    sortBy,
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    setLoader(isFetchingNextPage);
  }, [isFetchingNextPage, setLoader]);

  async function getShippingLabels() {
    queryClient.resetQueries(EDI_QUERY_KEYS.DOWNLOAD_SHIPPING_LABELS);
    let hasNextPage = true;
    let pageCount = 0;
    do {
      const nextPageResponse = await fetchNextPage();

      if (nextPageResponse.isError) {
        setNotification({
          type: "error",
          description:
            "Error printing labels. Please try again in a few minutes, and contact support@crstl.so in case of any questions.",
        });
        return Promise.reject();
      }

      const errors = get(last(nextPageResponse.data?.pages), "data.errors", []);
      if (errors.length > 0) {
        return Promise.reject();
      }

      hasNextPage = nextPageResponse?.hasNextPage ?? false;
      pageCount++;
    } while (hasNextPage);

    if (pageCount > 1) {
      setNotification({
        type: "info",
        description:
          "Downloading Shipping Labels. Please do not close this window or refresh the page.",
        moduleName: "This may take a while...",
        duration: 0,
      });
    }

    return data;
  }

  async function onPrint(printIframe: HTMLIFrameElement) {
    try {
      const document = printIframe.contentDocument;
      if (document) {
        const poNumber = get(poListDocumentData, "data.metadata.po_id");

        const html = document.getElementsByTagName("html")[0];

        const pageSections = getPageSections(html);

        const pdfRequests = pageSections.map((section, index) => {
          const labelFileName = `${poNumber ?? "Shipping"}-labels-${
            index + 1
          }_${pageSections.length}.pdf`;
          const exporter = new html2pdf(section, {
            filename: labelFileName,
            pagebreak: { mode: "avoid-all" },
            html2canvas: { scale: 2.2 },
            jsPDF: { unit: "mm", format: [100, 151] },
          });

          return exporter;
        });

        for (const request of pdfRequests) {
          await request.getPdf(true);
        }

        return Promise.resolve();
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  const tpfKey = getTpfName({
    name: tradingPartnerName,
    flavor: tradingPartnerFlavor,
  });
  const ShippingLabelComponent =
    shipmentLabelViewMap[tpfKey] ??
    shipmentLabelViewMap[tradingPartnerName] ??
    ShipmentPrintPageMcLane;

  const labelData = useMemo(() => {
    const allData = data ? data?.pages?.flatMap(({ data }) => data.labels) : [];
    return { data: { labels: allData } };
  }, [data]);

  return (
    <>
      <ReactToPrint
        onBeforeGetContent={getShippingLabels}
        trigger={() => <StyledContainer>{`4" x 6"`}</StyledContainer>}
        content={() => componentRef.current}
        copyStyles={false}
        print={onPrint}
      ></ReactToPrint>

      <div style={{ display: "none" }}>
        <ShippingLabelComponent data={labelData} ref={componentRef} />
      </div>
    </>
  );
}

export { GenericShipmentPrintDownload };

