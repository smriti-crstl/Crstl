import { ReactElement } from "react";

import { AvatarWithBackground } from "components/atoms/avatar";

type Props = {
  imageUrl?: string;
};

// TODO: Remove hardcoded image url

export const TimelineDot = ({ imageUrl }: Props): ReactElement => {
  return (
    <AvatarWithBackground
      style={{ margin: 0 }}
      src={
        imageUrl || "https://i.postimg.cc/FHzJ8hHv/ODTLcjx-Afvqbx-Hn-VXCYX.jpg"
      }
    />
  );
};
