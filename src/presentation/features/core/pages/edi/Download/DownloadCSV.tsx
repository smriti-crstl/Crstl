import { useGetEDIOrdersCSV } from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";

import { CloudDownloadOutlined, LoadingOutlined } from "@ant-design/icons";

import { DownloadCSVContainer } from "./styles";
import { Tooltip } from "antd";

interface DownloadCSVProps {
  downloadCsv: (data: any) => void;
  orderIds: React.Key[];
  downloadDisabled: boolean;
}
const DownloadCSV = ({
  downloadCsv,
  orderIds,
  downloadDisabled,
}: DownloadCSVProps) => {
  const { refetch, isFetching } = useGetEDIOrdersCSV(orderIds.join(","), {
    enabled: false,
  });

  const handleOnClick = async () => {
    if (isFetching || downloadDisabled) {
      return;
    }

    const { data, isError } = await refetch();
    if (isError) {
      setNotification({
        type: "error",
        description: "Something went wrong",
      });
      return;
    }
    downloadCsv(data);
  };

  return (
    <Tooltip title="Export POs to CSV">
      <DownloadCSVContainer onClick={handleOnClick}>
        {isFetching ? (
          <LoadingOutlined style={{ fontSize: "36px", color: "white" }} />
        ) : (
          <CloudDownloadOutlined style={{ fontSize: "36px", color: "white" }} />
        )}
      </DownloadCSVContainer>
    </Tooltip>
  );
};

export default DownloadCSV;

