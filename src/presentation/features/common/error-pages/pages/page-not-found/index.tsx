import { TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";

export const PageNotFound = (): ReactElement => {
  return <div>{TEXT_CONSTANTS.ROUTER.PAGE_NOT_FOUND}</div>;
};
