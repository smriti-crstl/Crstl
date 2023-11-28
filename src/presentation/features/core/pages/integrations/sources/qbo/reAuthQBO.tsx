import { ReactElement } from "react";
import { ColoredButton } from "@crstl/components/atoms/buttons";
import { ConnectedIndicator } from "@crstl/components/atoms/indicators";

type Props = {
  onAddButtonClick: () => void;
  isconnected: boolean;
  needsAuth?: boolean;
};

export const ReAuthQBO = ({
  onAddButtonClick,
  isconnected,
  needsAuth,
}: Props): ReactElement => {
  if (isconnected) {
    if (needsAuth) {
      return (
        <>
          <ColoredButton onClick={onAddButtonClick}>
            Needs re-authorization
          </ColoredButton>
        </>
      );
    } else {
      return <ConnectedIndicator />;
    }
  } else {
    return (
      <>
        <ColoredButton onClick={onAddButtonClick}>Add</ColoredButton>
      </>
    );
  }
};
