import { useTimestamp } from "presentation/hooks/common/use-timestamp";
import { ReactElement } from "react";

type Props = {
  ISODateString: string | undefined;
};

export const RenderTimestamp = ({ ISODateString }: Props): ReactElement => {
  const { getZonedTime } = useTimestamp();
  return (
    <>{ISODateString && getZonedTime({ ISODateString, withAltLabel: true })}</>
  );
};
