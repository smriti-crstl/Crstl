// import { Button } from "antd";
import { format } from "date-fns";
import { useDownloadShippingLabels } from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import html2pdf from "html2pdf.js";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import styled from "styled-components";
import { ShipNoticeSortByOption } from "../../../edi-shipment/sub-components/ShipNoticeConfig";
// import { DownloadOutlined } from "@ant-design/icons";
import { ShipmentPrintPage } from "./ShipmentPrintPage";

interface ShipmentDownloadPreviewProps {
  setLoader: Dispatch<SetStateAction<boolean>>;
  sortBy: ShipNoticeSortByOption;
}

export const StyledContainer = styled.div`
  border: none;
  justify-content: center;
  display: flex;
`;

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
    const document = printIframe.contentDocument;
    if (document) {
      const timestamp = format(new Date(), "LLLL dd yyyy");

      const fileName = `Shipping labels_${timestamp}.pdf`;
      const html = document.getElementsByTagName("html")[0];
      const exporter = new html2pdf(html, {
        filename: fileName,
        pagebreak: { mode: "avoid-all" },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: [100, 151] },
      });
      await exporter.getPdf(true);
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

