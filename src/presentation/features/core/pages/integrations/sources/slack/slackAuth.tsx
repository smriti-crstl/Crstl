import { ReactElement } from "react";

import { ConnectedIndicator } from "@crstl/components/atoms/indicators";

import { StyledPrimaryButton } from "../../../edi-edit/EdiEditPage.styles";

type Props = {
  onAddButtonClick: () => void;
  isConnected: boolean;
  needsAuth?: boolean;
  businessName?: string;
};

export const SlackAuth = ({
  onAddButtonClick,
  isConnected,
  needsAuth,
}: Props): ReactElement => {
  return isConnected ? (
    needsAuth ? (
      <StyledPrimaryButton onClick={onAddButtonClick}>
        Needs re-authorization
      </StyledPrimaryButton>
    ) : (
      <ConnectedIndicator />
    )
  ) : (
    <StyledPrimaryButton onClick={onAddButtonClick}>
      Connect
    </StyledPrimaryButton>
  );
};

