import { ReactElement } from "react";
import { ColoredButton } from "components/atoms/buttons";
import { ConnectedIndicator } from "components/atoms/indicators";
import { SHOPIFY_CONFIG } from "./shopify.config";

type Props = {
  onAddButtonClick: () => void;
  isConnected: boolean;
  needsAuth?: boolean;
  businessName?: string;
};

function ShopifyAuth({
  onAddButtonClick,
  isConnected,
  needsAuth,
}: Props): ReactElement {
  if (!isConnected) {
    return (
      <ColoredButton onClick={onAddButtonClick}>
        {SHOPIFY_CONFIG.ADD}
      </ColoredButton>
    );
  }

  if (needsAuth) {
    return (
      <ColoredButton onClick={onAddButtonClick}>
        {SHOPIFY_CONFIG.NEEDS_REAUTHORIZATION}
      </ColoredButton>
    );
  }

  return <ConnectedIndicator />;
}

export { ShopifyAuth };
