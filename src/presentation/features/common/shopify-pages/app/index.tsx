import { useInitiateIntegrationQuery } from "domain/interactors/integrations";
import { CoreShopifyAppTypes } from "globals/configs";
import { setIntegrationIdsToStorage } from "presentation/features/core/pages/integrations/utils";
import { parseSearchParams } from "presentation/utils";
import { ReactElement, useLayoutEffect, useState } from "react";
import { useLocation, useParams } from "react-router";

import { GenericError } from "components/atoms/error";
import { GenericLoading } from "components/atoms/loading";

const SHOPIFY_INTEGRATION_SOURCE_ID = "0bd1effe-f9cf-4f95-993f-70942cc9b84e";

type ShopifyQueryParams = {
  shop: string;
  isCustom?: boolean;
};

export const ShopifyApp = (): ReactElement => {
  const [error, setError] = useState<null | string>(null);
  const { mutate } = useInitiateIntegrationQuery();
  const { search } = useLocation();
  const { type } = useParams<{ type: CoreShopifyAppTypes }>();

  useLayoutEffect(() => {
    const searchParams = parseSearchParams<ShopifyQueryParams>(search);
    if (searchParams?.shop) {
      const shopName = searchParams.shop.split(".")[0];
      mutate(
        {
          integrationSourceId: SHOPIFY_INTEGRATION_SOURCE_ID,
          shop: shopName,
          isCustom: type === "custom" ? "true" : undefined,
        },
        {
          onSuccess: ({ authUrl, integrationLogId }) => {
            // setting ids to local storage
            setIntegrationIdsToStorage({
              integrationLogId,
              integrationSourceId: SHOPIFY_INTEGRATION_SOURCE_ID,
            });
            // opening shopify redirection url
            window.open(authUrl, "_self");
          },
        }
      );
    } else {
      setError("Shop name not present");
    }
  }, [mutate, search, type]);

  return (
    <div style={{ height: "100vh", padding: "4rem" }}>
      {error ? (
        <GenericError text={error} />
      ) : (
        <GenericLoading type="spinner" />
      )}
    </div>
  );
};
