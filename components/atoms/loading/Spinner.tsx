import { Spin, SpinProps } from "antd";
import { AriaAttributes, ReactElement, ReactNode } from "react";

export type SpinnerProps = SpinProps &
  AriaAttributes & {
    children?: ReactNode;
  };

export const Spinner = ({
  children,
  spinning = true,
  ...props
}: SpinnerProps): ReactElement => {
  return (
    <Spin
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "10rem",
      }}
      spinning={spinning}
      {...props}
    >
      {children}
    </Spin>
  );
};
