import { usePostPlaidUpdateAccessTokenQuery } from "domain/interactors/integrations/plaid";
import { ReactElement, useLayoutEffect, useState } from "react";

import { ColoredButton } from "@crstl/components/atoms/buttons";

import { PlaidUpdate } from "./PlaidUpdate";
import { ConnectedIndicator } from "@crstl/components/atoms/indicators";

type Props = {
  integrationId: string;
  isConnected: boolean;
};

export const ReAuthPlaid = ({
  integrationId,
  isConnected,
}: Props): ReactElement => {
  const [updateAccessToken, setUpdateAccessToken] = useState<null | string>(
    null
  );

  const [isFlowInProgress, setIsFlowInProgress] = useState(false);

  const { mutate, isLoading } = usePostPlaidUpdateAccessTokenQuery();
  const handleReAuthClick = (): void => {
    mutate(
      { integrationId },
      {
        onSuccess: (data) => {
          const dataClone = data as { data?: { link_token: string } };
          const token = dataClone?.data?.link_token || "";
          setIsFlowInProgress(true);
          setUpdateAccessToken(token);
        },
      }
    );
  };

  useLayoutEffect(() => {
    if (isFlowInProgress === false) {
      setUpdateAccessToken(null);
    }
  }, [isFlowInProgress]);

  if (isFlowInProgress && updateAccessToken) {
    return (
      <PlaidUpdate
        setIsFlowInProgress={setIsFlowInProgress}
        plaidLinkToken={updateAccessToken}
        integrationId={integrationId}
      />
    );
  } else {
    if (!isConnected) {
      return (
        <>
          <ColoredButton loading={isLoading} onClick={handleReAuthClick}>
            Needs re-authorization
          </ColoredButton>
        </>
      );
    }
    return <ConnectedIndicator />;
  }
};
