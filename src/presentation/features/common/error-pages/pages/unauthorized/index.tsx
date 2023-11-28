import { TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";

export const Unauthorized = (): ReactElement => {
  return <div>{TEXT_CONSTANTS.ROUTER.UNAUTHORIZED}</div>;
};
