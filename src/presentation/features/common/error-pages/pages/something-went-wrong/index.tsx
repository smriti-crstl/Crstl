import { TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement } from "react";

export const SomethingWentWrong = (): ReactElement => {
  return <div>{TEXT_CONSTANTS.ROUTER.SOMETHING_WENT_WRONG}</div>;
};
