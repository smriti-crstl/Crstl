import { useTimestamp } from "presentation/hooks/common/use-timestamp";
import { ReactElement } from "react";

import { IHistoryData } from "./HistoryButtonWrapper";

type Props = {
  historyData: IHistoryData[];
};
export const OrderDetailsStatusUpdatedBy = ({
  historyData,
}: Props): ReactElement => {
  const { getZonedTime } = useTimestamp();
  const lastElementOfHistoryData = [...historyData].splice(-1, 1).pop() || {};
  const { createdAt, fullName } = lastElementOfHistoryData;
  const zonedTime = createdAt
    ? getZonedTime({ ISODateString: createdAt, withAltLabel: true })
    : "";
  return (
    <div>
      {fullName || "-"} at {zonedTime || "-"}
    </div>
  );
};
