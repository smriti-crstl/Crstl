// import { Button } from "antd";
import { format } from "date-fns";
import { useDownloadShippingLabels } from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import html2pdf from "html2pdf.js";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import styled from "styled-components";

import { ShipNoticeSortByOption } from "../sub-components/ShipNoticeConfig";
import { ShipmentPackingSlipPrintPage } from "./CVS/ShipmentPrintPageCVS";

// import { DownloadOutlined } from "@ant-design/icons";

interface ShipmentDownloadPreviewProps {
  setLoader: Dispatch<SetStateAction<boolean>>;
  sortBy: ShipNoticeSortByOption;
}

export const StyledContainer = styled.div`
  border: none;
  justify-content: center;
  display: flex;
`;

function ShipmentPackingSlipDownload({
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
    const document = printIframe.contentDocument;
    if (document) {
      const timestamp = format(new Date(), "LLLL dd yyyy");

      const fileName = `Packing slips_${timestamp}.pdf`;
      const html = document.getElementsByTagName("html")[0];
      const exporter = new html2pdf(html, {
        filename: fileName,
        pagebreak: { mode: "avoid-all" },
        html2canvas: { scale: 2 },
        // jsPDF: { unit: "mm", format: [280, 215] },
        // jsPDF: { unit: "mm", format: [260, 280] },
        jsPDF: { format: "letter", orientation: "landscape" },
      });
      await exporter.getPdf(true);
    }
  }

  return (
    <>
      <ReactToPrint
        onBeforeGetContent={getShippingLabels}
        trigger={() => <StyledContainer>{`11" x 8.5"`}</StyledContainer>}
        content={() => componentRef.current}
        copyStyles={false}
        print={onPrint}
      ></ReactToPrint>

      <div style={{ display: "none" }}>
        <ShipmentPackingSlipPrintPage data={data} ref={componentRef} />
      </div>
    </>
  );
}

export { ShipmentPackingSlipDownload };
