import { EDI_QUERY_KEYS, useGetShippingLabels } from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import { get, last } from "lodash";
import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import styled from "styled-components";

import { getTpfName } from "../../edi/edi.utils";
import { ShipNoticeSortByOption } from "../sub-components/ShipNoticeConfig";
import { palletLabelViewMap } from "./";

interface ShipmentPalletLabelPrintPreviewProps {
  setLoader: Dispatch<SetStateAction<boolean>>;
  sortBy: ShipNoticeSortByOption;
  tradingPartnerName?: string;
  tradingPartnerFlavor?: string;
}

export const StyledContainer = styled.div`
  border: none;
  justify-content: center;
  display: flex;
`;

function ShipmentPalletLabelPrintPreview({
  setLoader,
  sortBy,
  tradingPartnerName = "",
  tradingPartnerFlavor = "",
}: ShipmentPalletLabelPrintPreviewProps) {
  const componentRef = React.useRef(null);
  const { orderId } = useParams<Record<string, string>>();
  const queryClient = useQueryClient();
  const { data, isFetchingNextPage, fetchNextPage } = useGetShippingLabels(
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
    queryClient.resetQueries(EDI_QUERY_KEYS.GET_SHIPPING_LABELS);
    let hasNextPage = true;
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
    } while (hasNextPage);

    return data;
  }

  const tpfKey = getTpfName({
    name: tradingPartnerName,
    flavor: tradingPartnerFlavor,
  });
  const PalletLabelComponent = palletLabelViewMap[tpfKey];

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
      ></ReactToPrint>
      <div style={{ display: "none" }}>
        <PalletLabelComponent data={labelData} ref={componentRef} />
      </div>
    </>
  );
}
export { ShipmentPalletLabelPrintPreview };

