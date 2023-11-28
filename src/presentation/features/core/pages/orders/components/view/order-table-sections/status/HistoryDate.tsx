import { useTimestamp } from "presentation/hooks/common/use-timestamp";
import { ReactElement } from "react";

type Props = {
  date?: string;
};
export const HistoryDate = ({ date }: Props): ReactElement => {
  const { getZonedTime } = useTimestamp();
  return (
    <>
      {date && (
        <div> {getZonedTime({ ISODateString: date, withAltLabel: true })} </div>
      )}
    </>
  );
};
