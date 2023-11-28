import { ReactElement } from "react";

type Props = {
  name?: string;
};
export const HistoryName = ({ name }: Props): ReactElement => {
  return <div>{name || "-"} updated status from </div>;
};
