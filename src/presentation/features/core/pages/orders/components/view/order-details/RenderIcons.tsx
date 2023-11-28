import { ReactComponent as Dollar } from "globals/assets/svgs/dollar.svg";
import { ReactComponent as Message } from "globals/assets/svgs/message.svg";
import { ReactComponent as Pin } from "globals/assets/svgs/pin.svg";
import { ReactComponent as Truck } from "globals/assets/svgs/truck.svg";
import { ReactElement } from "react";

type Props = {
  type: "0" | "1" | "2" | "upload" | string;
};
export const RenderIcons = ({ type }: Props): ReactElement => {
  switch (type) {
    case "0":
      return <Message />;
    case "1":
      return <Truck />;
    case "2":
      return <Dollar />;
    case "upload":
      return <Pin />;
    default:
      return <div />;
  }
};
