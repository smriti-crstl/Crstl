import {
  PAGE_NOT_FOUND,
  SHOPIFY_APP,
  SHOPIFY_CUSTOM_APP,
  SHOPIFY_ONBOARDING,
} from "globals/configs";
import { PrivateRoute, PublicRoute } from "presentation/router";
import { ReactElement, Suspense } from "react";
import { Redirect, Switch } from "react-router";

import { ShopifyApp } from "../app";
import { ShopifyOnboarding } from "../onboarding";

const ShopifyRouter = (): ReactElement => (
  <Suspense fallback={null}>
    <Switch>
      {/* {Needs to be written before SHOPIFY_APP} */}
      <PrivateRoute exact path={SHOPIFY_CUSTOM_APP} component={ShopifyApp} />
      <PublicRoute exact path={SHOPIFY_APP} component={ShopifyApp} />
      <PublicRoute
        exact
        path={SHOPIFY_ONBOARDING}
        component={ShopifyOnboarding}
      />
      <Redirect path="*" to={PAGE_NOT_FOUND} />
    </Switch>
  </Suspense>
);

export default ShopifyRouter;
