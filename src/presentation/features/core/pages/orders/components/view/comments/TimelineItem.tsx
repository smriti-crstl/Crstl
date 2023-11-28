import { Timeline } from "antd";
import { ReactElement, ReactNode } from "react";

import { AvatarWithBackground } from "@crstl/components/atoms/avatar";

type Props = {
  children: ReactNode;
  imageUrl?: string;
};

// TODO: Remove hardcoded image url

export const TimelineItem = ({ children, imageUrl }: Props): ReactElement => {
  return (
    <Timeline.Item
      dot={
        <AvatarWithBackground
          style={{ margin: 0 }}
          src={
            imageUrl ||
            "https://i.postimg.cc/FHzJ8hHv/ODTLcjx-Afvqbx-Hn-VXCYX.jpg"
          }
        />
      }
    >
      {children}
    </Timeline.Item>
  );
};
