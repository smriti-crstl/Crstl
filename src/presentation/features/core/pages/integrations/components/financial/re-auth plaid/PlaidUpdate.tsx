import { usePostPlaidReAuthQuery } from "domain/interactors/integrations/plaid";
import {
  ReactElement,
  SetStateAction,
  useCallback,
  useLayoutEffect,
} from "react";
import { usePlaidLink } from "react-plaid-link";

import { ColoredButton } from "@crstl/components/atoms/buttons";
import { GenericError } from "@crstl/components/atoms/error";

type Props = {
  plaidLinkToken: string;
  integrationId: string;
  setIsFlowInProgress: React.Dispatch<SetStateAction<boolean>>;
};

export const PlaidUpdate = ({
  plaidLinkToken,
  integrationId,
  setIsFlowInProgress,
}: Props): ReactElement => {
  const { mutate, isError, isLoading } = usePostPlaidReAuthQuery();

  const onSuccess = useCallback(
    (token, metadata) => {
      //   setBankName(metadata?.institution?.name || "");

      // send token to server
      mutate(
        { integrationId, publicToken: token, metadata: metadata },
        {
          onSettled: () => {
            setIsFlowInProgress(false);
          },
        }
      );
    },
    [integrationId, mutate, setIsFlowInProgress]
  );

  // PLAID Config
  const config = {
    token: plaidLinkToken,
    onSuccess,
    // ...
  };

  const { open, ready, error } = usePlaidLink(config);

  useLayoutEffect(() => {
    if (open) {
      open();
    }
  }, [open]);

  if (isError || error) {
    return <GenericError />;
  }

  return (
    <>
      <ColoredButton loading={!ready || isLoading}>
        Needs re-authorization
      </ColoredButton>
    </>
  );
};
