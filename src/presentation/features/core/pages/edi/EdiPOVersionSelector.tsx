import { Select } from "antd";
import { useGetPOVersions } from "domain/interactors/edi";
import {
  CORE_EDI_GROCERY_PURCHASE_ORDER,
  CORE_EDI_PURCHASE_ORDER,
} from "globals/configs";
import moment from "moment";
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import { getSourceDocumentTypeFromPathName } from "./edi.utils";
import { VersionHistoryContainer } from "./EdiPurchaseOrderSection.styles";

function EdiPOVersionSelector() {
  const { id, orderId, version } = useParams<{
    id: string;
    orderId: string;
    version: string;
  }>();
  const history = useHistory();
  const { pathname } = useLocation();

  const sourceDocumentType = getSourceDocumentTypeFromPathName(pathname);

  const { isLoading, isError, data } = useGetPOVersions(
    orderId,
    sourceDocumentType
  );

  if (isLoading || isError) {
    return null;
  }

  const versionList = [...(data?.data ?? [])]?.reverse();

  const [latestVersion] = versionList ?? [];

  function onVersionChange(version: string) {
    const path = generatePath(
      sourceDocumentType === "875"
        ? CORE_EDI_GROCERY_PURCHASE_ORDER
        : CORE_EDI_PURCHASE_ORDER,
      {
        id,
        orderId,
        version,
      }
    );
    history.push(path);
  }

  const totalVersions = versionList?.length ?? 0;

  return (
    <VersionHistoryContainer>
      <Select
        defaultValue={version ?? latestVersion?.version?.toString()}
        style={{ width: 220 }}
        onChange={onVersionChange}
        disabled={totalVersions < 2}
        value={version ?? latestVersion?.version?.toString()}
      >
        {versionList?.map((versionItem, index) => {
          const version = versionItem.version?.toString();
          const isFirst = index === 0;
          const isLast = versionList.length === index + 1;

          if (isFirst) {
            return (
              <Select.Option key={version} value={version}>
                Latest version
              </Select.Option>
            );
          }

          if (isLast) {
            return (
              <Select.Option key={version} value={version}>
                Original Purchase Order
              </Select.Option>
            );
          }

          return (
            <Select.Option key={index} value={version}>
              {moment(versionItem.createdAt).format("MMMM DD, YYYY")}
            </Select.Option>
          );
        })}
      </Select>
    </VersionHistoryContainer>
  );
}

export { EdiPOVersionSelector };

