import { useGetEDISearchCSV } from "domain/interactors/edi";
import { setNotification } from "domain/services/notification";
import { get } from "lodash";

import { CloudDownloadOutlined, LoadingOutlined } from "@ant-design/icons";

import { TableConfig } from "../event-log/types";
import { DownloadCSVContainer } from "./styles";

interface DownloadCSVProps {
  downloadCsv: (data: any) => void;
  orderIds: React.Key[];
  downloadDisabled: boolean;
  tableConfig: TableConfig;
}
export const DownloadEdiSearchCSV = ({
  downloadCsv,
  orderIds,
  downloadDisabled,
  tableConfig,
}: DownloadCSVProps) => {
  const { refetch, isFetching } = useGetEDISearchCSV(
    orderIds.join(","),
    tableConfig,
    {
      enabled: false,
    }
  );

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
    const documents = get(data, "data.documents", []);
    downloadCsv(documents);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <DownloadCSVContainer onClick={handleOnClick}>
      {isFetching ? (
        <LoadingOutlined style={{ fontSize: "36px", color: "white" }} />
      ) : (
        <CloudDownloadOutlined style={{ fontSize: "36px", color: "white" }} />
      )}
    </DownloadCSVContainer>
  );
};

