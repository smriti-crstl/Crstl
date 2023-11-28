import { ShippingLabelModel } from "domain/entity/edi/models";
import { useGetShippingLabels } from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import styled from "styled-components";
import { ShipNoticeSortByOption } from "../../../edi-shipment/sub-components/ShipNoticeConfig";

// import html2pdf from "html2pdf.js";
import shippingLabelData from "./data/shipping-label.json";
import { ShipmentPrintPage } from "./ShipmentPrintPage";

// console.log(html2pdf);

interface ShipmentPrintPreviewProps {
  setLoader: Dispatch<SetStateAction<boolean>>;
  sortBy: ShipNoticeSortByOption;
}

export const StyledContainer = styled.div`
  border: none;
  justify-content: center;
  display: flex;
`;

function ShipmentPrintPreview({
  setLoader,
  sortBy,
}: ShipmentPrintPreviewProps) {
  const componentRef = React.useRef(null);
  const { orderId } = useParams<Record<string, string>>();
  const { data, isLoading, refetch } = useGetShippingLabels(orderId, sortBy, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    setLoader(isLoading);
  }, [isLoading, setLoader]);

  async function getShippingLabels() {
    const { data, isError } = await refetch();
    if (isError) {
      setNotification({
        type: "error",
        description: "Error printing labels - please verify data",
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

  return (
    <>
      <ReactToPrint
        onBeforeGetContent={getShippingLabels}
        trigger={() => <StyledContainer>{`4" x 6"`}</StyledContainer>}
        content={() => componentRef.current}
        copyStyles={false}
      ></ReactToPrint>
      <div style={{ display: "none" }}>
        <ShipmentPrintPage data={data} ref={componentRef} />
      </div>
    </>
  );
}
export { ShipmentPrintPreview };

