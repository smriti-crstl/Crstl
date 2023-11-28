import { usePostPlaidLinkQuery } from "domain/interactors/integrations/plaid";
import { CORE_INTEGRATIONS_TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { ReactElement, useEffect, useState } from "react";

import { ColoredButton } from "@crstl/components/atoms/buttons";
import { GenericError } from "@crstl/components/atoms/error";

import { Plaid } from "./Plaid";

export const FinancialTabPlaidIntegration = (): ReactElement => {
  const { isLoading, isError, mutate } = usePostPlaidLinkQuery();
  const [plaidLinkToken, setPlaidLinkToken] = useState<string>("");

  useEffect(() => {
    mutate(undefined, {
      onSuccess: (data) => {
        setPlaidLinkToken(data.data.link_token);
      },
    });
  }, [mutate]);

  if (isError) {
    return <GenericError />;
  }

  if (plaidLinkToken) {
    return <Plaid key="plaid" plaidLinkToken={plaidLinkToken} />;
  }
  return (
    <ColoredButton loading={isLoading} key="plaid-clone">
      {CORE_INTEGRATIONS_TEXT_CONSTANTS.FINANCIAL_TAB.PLAID_BUTTON_TEXT}
    </ColoredButton>
  );
};
