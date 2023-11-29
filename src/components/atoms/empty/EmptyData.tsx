import { AriaAttributes } from "react";
import { Empty } from "antd";

type Props = AriaAttributes;

export const EmptyData: React.FC<Props> = (props: Props) => {
  return (
    <Empty
      style={{ minWidth: "10rem" }}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      {...props}
    />
  );
};

EmptyData.defaultProps = {
  "aria-label": "No Data",
};
