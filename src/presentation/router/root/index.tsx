import { useVerifyUserQuery } from "domain/interactors/auth";
import {
  APP_ROOT_URL,
  CORE_BASE,
  CORE_EDI_LIST_PAGE,
  EMAIL_SIGN_UP,
  EULA,
  LOGIN,
  PAGE_NOT_FOUND,
  PRIVACY_POLICY,
  RESET_PASSWORD,
  SHOPIFY_APP,
  SHOPIFY_ONBOARDING,
  SIGN_UP,
  SOMETHING_WENT_WRONG,
  UNAUTHORIZED,
  ORG_SELECTION,
} from "globals/configs";
import { useLDClient } from "launchdarkly-react-client-sdk";
import { ErrorRouter } from "presentation/features/common/error-pages";
import { Eula } from "presentation/features/common/public-pages/eula";
import { PrivacyPolicy } from "presentation/features/common/public-pages/privacy-policy";
import { useUserDetails } from "presentation/hooks/common";
import { lazyRetry } from "presentation/utils";
import { lazy, ReactElement, Suspense, useEffect } from "react";
import { Redirect, Switch } from "react-router-dom";

import { PrivateRoute, SemiPrivateRoute } from "../components";
import { PublicRoute } from "../components/public-route";

const SemiPrivateRouter = lazy(() =>
  lazyRetry(
    () =>
      import(
        /* webpackPrefetch: true */ "presentation/features/common/semi-private-pages"
      ),
    "SemiPrivateRouter"
  )
);

const AuthRouter = lazy(() =>
  lazyRetry(
    () =>
      import(/* webpackPrefetch: true */ "presentation/features/common/auth"),
    "AuthRouter"
  )
);
const CoreContainerLayout = lazy(() =>
  lazyRetry(
    () =>
      import(
        /* webpackPrefetch: true */ "presentation/features/core/containers"
      ),
    "CoreContainerLayout"
  )
);

const ShopifyRouter = lazy(() =>
  lazyRetry(
    () =>
      import(
        /* webpackPrefetch: true */ "presentation/features/common/shopify-pages/router"
      ),
    "ShopifyRouter"
  )
);

// declaring the FrontChat global variable
declare global {
  interface Window {
    FrontChat: any;
  }
}

const RootRouter = (): ReactElement => {
  const client = useLDClient();
  const [{ data: userDetailsData }] = useUserDetails();
  const { mutate } = useVerifyUserQuery();

  useEffect(() => {
    if (userDetailsData) {
      mutate(undefined, {
        onSuccess: (data) => {
          if (!window?.FrontChat) {
            return;
          }
          const userHash = data?.data?.userHash;
          const script = document.createElement("script");
          script.async = true;
          const scriptText = document.createTextNode(`window.FrontChat("init", {
            chatId: "${import.meta.env.VITE_APP_FRONT_CHAT_ID}",
            useDefaultLauncher: true,
            email: "${userDetailsData.email}",
            name: "${userDetailsData.fullName}",
            userHash: "${userHash}",
        }); `);
          script.appendChild(scriptText);
          document.body.append(script);
        },
      });
    }
  }, [mutate, userDetailsData]);

  useEffect(() => {
    if (!userDetailsData) {
      return;
    }
    client?.identify({
      key: userDetailsData?.email,
      email: userDetailsData?.email,
      custom: {
        organizationId: userDetailsData?.organizationId || "",
        organizationName: userDetailsData?.organizationName || "",
        role: userDetailsData?.role || "",
        emailDomain: userDetailsData?.emailDomain || "",
      },
    });
  }, [
    client,
    userDetailsData,
    userDetailsData?.email,
    userDetailsData?.emailDomain,
    userDetailsData?.id,
    userDetailsData?.organizationId,
    userDetailsData?.organizationName,
    userDetailsData?.role,
  ]);

  return (
    <Suspense fallback={null}>
      <Switch>
        <PublicRoute
          exact
          path={APP_ROOT_URL}
          component={() => <Redirect to={CORE_EDI_LIST_PAGE} />} // TODO: Change back to CORE_HOME
        />
        <PublicRoute
          exact
          path={[LOGIN, SIGN_UP, EMAIL_SIGN_UP, RESET_PASSWORD]}
          component={AuthRouter}
        />
        <SemiPrivateRoute
          exact
          path={[ORG_SELECTION]}
          component={SemiPrivateRouter}
        />
        <PublicRoute
          exact
          path={[PAGE_NOT_FOUND, SOMETHING_WENT_WRONG, UNAUTHORIZED]}
          component={ErrorRouter}
        />
        {/* // Public Pages Routed */}
        <PublicRoute exact path={PRIVACY_POLICY} component={PrivacyPolicy} />
        <PublicRoute exact path={EULA} component={Eula} />
        <PublicRoute
          exact
          path={[SHOPIFY_APP, SHOPIFY_ONBOARDING]}
          component={ShopifyRouter}
        />
        <PrivateRoute path={CORE_BASE} component={CoreContainerLayout} />
        <Redirect path="*" to={PAGE_NOT_FOUND} />
      </Switch>
    </Suspense>
  );
};

export default RootRouter;

