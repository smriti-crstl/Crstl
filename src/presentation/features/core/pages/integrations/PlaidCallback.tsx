import { CORE_INTEGRATIONS_FINANCIAL } from "globals/configs";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { getPlaidLinkToken, unsetPlaidLinkToken } from "./utils";
import { PlaidLinkCompletion } from "./components/financial/plaidCallback";

function PlaidCallback() {
  const plaidLinkToken = getPlaidLinkToken();

  useEffect(() => {
    unsetPlaidLinkToken();
  }, []);

  if (plaidLinkToken) {
    return <PlaidLinkCompletion plaidLinkToken={plaidLinkToken} />;
  }
  return <Redirect to={CORE_INTEGRATIONS_FINANCIAL} />;
}

export { PlaidCallback as default };
