// import { Button } from "antd";
import { format } from "date-fns";
import { useDownloadShippingLabels } from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import html2pdf from "html2pdf.js";
import { chunk, take } from "lodash";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import styled from "styled-components";
// import { DownloadOutlined } from "@ant-design/icons";
import { ShipmentPrintPage } from "./ShipmentPrintPage";
import { ShipNoticeSortByOption } from "./sub-components/ShipNoticeConfig";

interface ShipmentDownloadPreviewProps {
  setLoader: Dispatch<SetStateAction<boolean>>;
  sortBy: ShipNoticeSortByOption;
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

function ShipmentPrintDownload({
  setLoader,
  sortBy,
}: ShipmentDownloadPreviewProps) {
  const componentRef = React.useRef(null);
  const { orderId } = useParams<Record<string, string>>();

  const { data, isLoading, refetch } = useDownloadShippingLabels(
    orderId,
    sortBy,
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    setLoader(isLoading);
  }, [isLoading, setLoader]);

  async function getShippingLabels() {
    const { data, isError } = await refetch();
    if (isError) {
      setNotification({
        type: "error",
        description: "Error downloading label",
      });
      return Promise.reject();
    }
    const errors = data?.data?.errors ?? [];
    const hasErrors = errors.length > 0;
    if (hasErrors) {
      return Promise.reject();
    }
    return data;
  }

  async function onPrint(printIframe: HTMLIFrameElement) {
    try {
      const document = printIframe.contentDocument;
      if (document) {
        const timestamp = format(new Date(), "LLLL dd yyyy");

        const html = document.getElementsByTagName("html")[0];

        const pageSections = getPageSections(html);

        const pdfRequests = pageSections.map((section, index) => {
          const pageNumber = index > 0 ? `_page_${index + 1}` : "";
          const labelFileName = `Shipping labels_${timestamp}${pageNumber}.pdf`;
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
        <ShipmentPrintPage data={data} ref={componentRef} />
      </div>
    </>
  );
}

export { ShipmentPrintDownload };

