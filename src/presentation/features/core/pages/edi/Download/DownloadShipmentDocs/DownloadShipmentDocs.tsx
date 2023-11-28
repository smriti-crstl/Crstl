import { Tooltip } from "antd";

import { LoadingOutlined, PaperClipOutlined } from "@ant-design/icons";

import { DownloadShipmentDocsContainer } from "../styles";
import {
  MAX_ALLOWED_ASN_IDS,
  useDownloadShipmentDocs,
} from "./hooks/useDownloadShipmentDocs";
import { useFlags } from "launchdarkly-react-client-sdk";

export const DownloadShipmentDocs: React.FC = () => {
  const {
    downloadShipmentDocsState,
    handleBulkDownload,
    isDownloadingShipmentDocs,
  } = useDownloadShipmentDocs();
  const flags = useFlags();

  if (
    !downloadShipmentDocsState?.asnIds?.length ||
    !flags.downloadShipmentDocs
  ) {
    return null;
  }

  return (
    <Tooltip
      title={`Download shipment documents for selected POs. Up to ${MAX_ALLOWED_ASN_IDS} POs at a time.`}
    >
      <DownloadShipmentDocsContainer onClick={() => handleBulkDownload()}>
        {isDownloadingShipmentDocs ? (
          <LoadingOutlined style={{ fontSize: "36px", color: "white" }} />
        ) : (
          <PaperClipOutlined style={{ fontSize: "36px", color: "white" }} />
        )}
      </DownloadShipmentDocsContainer>
    </Tooltip>
  );
};

