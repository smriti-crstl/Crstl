import { ReactElement, ReactNode } from "react";

import { CommonStepComponentProps } from "../";
import { InviteUsersPlugIn } from "../../../plugins/invite-users";

interface IStepOneProps extends CommonStepComponentProps {
  children?: ReactNode;
}

export const StepThree = (_props: IStepOneProps): ReactElement => {
  return <InviteUsersPlugIn />;
};
