import {
  CORE_ALERTS,
  CORE_ANALYTICS_ALL,
  CORE_ANALYTICS_FINANCE_ACCOUNTING,
  CORE_ANALYTICS_FINANCE_CASH_AND_CARDS,
  CORE_ANALYTICS_FINANCE_EXPENSES,
  CORE_ANALYTICS_OPERATIONS,
  CORE_ANALYTICS_SALES,
  CORE_BASE,
  CORE_CHANNELS,
  CORE_EDI,
  CORE_EDI_EVENT_LOG,
  CORE_EDI_FORM_PLAYGROUND,
  CORE_EDI_LIST,
  CORE_EDI_LIST_WITH_PARAMS,
  CORE_EDI_SEARCH_VIEW_PAGE,
  CORE_EDI_SHIPMENT_LABELS_PLAYGROUND,
  CORE_HOME,
  CORE_INTEGRATIONS,
  CORE_MARKETING_FACEBOOK,
  CORE_MARKETING_GOOGLE,
  CORE_ONBOARDING,
  CORE_ORDERS_NEW,
  CORE_ORDERS_V2,
  CORE_ORDERS_VIEW,
  CORE_PLAID_CALLBACK,
  CORE_SETTINGS,
  CORE_SETUP,
  PAGE_NOT_FOUND,
} from "globals/configs";
import { lazyRetry } from "presentation/utils";
import React, { lazy, ReactElement, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import CoreAlerts from "../pages/alerts";
import EdiListViewPage from "../pages/edi/EdiListViewPage";
import { EDIEventLogPage } from "../pages/edi/event-log";
import { AccessControlRoute } from "./AccessControlRoute";

const CoreIntegrations = lazy(() =>
  lazyRetry(
    () =>
      import(
        /* webpackPrefetch: true */ "../pages/integrations/CoreIntegrations"
      ),
    "CoreIntegrations"
  )
);
const Accounting = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../pages/analytics/Accounting"),
    "Accounting"
  )
);
const CashAndCards = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../pages/analytics/CashAndCards"),
    "CashAndCards"
  )
);
const Sales = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../pages/analytics/Sales"),
    "Sales"
  )
);
const Operations = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../pages/analytics/Operations"),
    "Operations"
  )
);
const CoreHome = lazy(() =>
  lazyRetry(() => import(/* webpackPrefetch: true */ "../pages/home"), "Home")
);
const CoreOnboardingRouter = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../pages/onboarding"),
    "Onboarding"
  )
);
const CoreOrdersView = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../pages/orders/components/view"),
    "OrdersView"
  )
);
const CoreSettingsRouter = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "./sub-routers/SettingsRouter"),
    "SettingsRouter"
  )
);
const CoreSetupPage = lazy(() =>
  lazyRetry(() => import(/* webpackPrefetch: true */ "../pages/setup"), "Setup")
);
const NewCoreOrder = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../pages/newOrders"),
    "NewOrders"
  )
);
const CoreOrder = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../pages/orders"),
    "Orders"
  )
);
const PlaidCallback = lazy(() =>
  lazyRetry(
    () =>
      import(/* webpackPrefetch: true */ "../pages/integrations/PlaidCallback"),
    "PlaidCallback"
  )
);
const MarketingGooglePage = lazy(() =>
  lazyRetry(
    () =>
      import(
        /* webpackPrefetch: true */ "../pages/marketing/MarketingGooglePage"
      ),
    "MarketingGooglePage"
  )
);
const MarketingFacebookPage = lazy(() =>
  lazyRetry(
    () =>
      import(
        /* webpackPrefetch: true */ "../pages/marketing/MarketingFacebookPage"
      ),
    "MarketingFacebookPage"
  )
);
const Expenses = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../pages/analytics/Expenses"),
    "Expenses"
  )
);

const EdiPage = lazy(() =>
  lazyRetry(() => import(/* webpackPrefetch: true */ "../pages/edi"), "EdiPage")
);

const EdiFormPlayground = lazy(() =>
  lazyRetry(
    () =>
      import(/* webpackPrefetch: true */ "../pages/edi-edit/EdiFormPlayground"),
    "EdiFormPlayground"
  )
);

const EDIShipmentLabelPlayground = lazy(() =>
  lazyRetry(
    () =>
      import(
        /* webpackPrefetch: true */ "../pages/edi/shipment-label-playground/EDIShipmentLabelPlayground"
      ),
    "EDIShipmentLabelPlayground"
  )
);

const EdiSearchViewPage = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../pages/edi/edi-search"),
    "EdiSearchViewPage"
  )
);

const CoreRouterMemo = (): ReactElement => {
  const UnderDevelopment = (): ReactElement => (
    <div style={{ margin: "16px" }}></div>
  );
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route
          exact
          path={CORE_BASE}
          component={() => <Redirect to={CORE_HOME} />}
        />
        <Route exact path={CORE_HOME} component={CoreHome} />
        {/* <Route exact path={CORE_ORDERS_NEW} component={CoreOrder} />
        <Route exact path={CORE_ORDERS} component={CoreOrder} />
        <Route exact path={CORE_ORDERS_V2} component={NewCoreOrder} />
        <Route exact path={CORE_ORDERS_VIEW} component={CoreOrdersView} /> */}
        <Route exact path={CORE_CHANNELS} component={UnderDevelopment} />
        {/* <Route exact path={CORE_INTEGRATIONS} component={CoreIntegrations} /> */}
        <Route exact path={CORE_ALERTS} component={CoreAlerts} />
        <Route exact path={CORE_ANALYTICS_SALES} component={Sales} />
        <Route exact path={CORE_ANALYTICS_OPERATIONS} component={Operations} />
        <Route exact path={CORE_PLAID_CALLBACK} component={PlaidCallback} />
        <Route
          path={[CORE_EDI_LIST_WITH_PARAMS, CORE_EDI_LIST]}
          component={EdiListViewPage}
        />
        <Route path={CORE_EDI_SEARCH_VIEW_PAGE} component={EdiSearchViewPage} />
        <Route path={CORE_EDI_EVENT_LOG} component={EDIEventLogPage} />

        <Route
          exact
          path={CORE_EDI_FORM_PLAYGROUND}
          component={EdiFormPlayground}
        />
        <Route path={CORE_EDI} component={EdiPage} />
        <Route path={CORE_SETTINGS} component={CoreSettingsRouter} />
        <Route path={CORE_ONBOARDING} component={CoreOnboardingRouter} />
        <Route path={CORE_SETUP} component={CoreSetupPage} />
        <Redirect
          path={CORE_ANALYTICS_ALL}
          to={CORE_ANALYTICS_FINANCE_CASH_AND_CARDS}
        />
        <AccessControlRoute allowedRoles={[]}>
          <Route exact path={CORE_ORDERS_NEW} component={CoreOrder} />
          <Route exact path={CORE_ORDERS_V2} component={NewCoreOrder} />
          <Route exact path={CORE_ORDERS_VIEW} component={CoreOrdersView} />
          <Route exact path={CORE_INTEGRATIONS} component={CoreIntegrations} />
          <Route
            exact
            path={CORE_ANALYTICS_FINANCE_CASH_AND_CARDS}
            component={CashAndCards}
          />
          <Route
            exact
            path={CORE_ANALYTICS_FINANCE_EXPENSES}
            component={Expenses}
          />
          <Route
            exact
            path={CORE_ANALYTICS_FINANCE_ACCOUNTING}
            component={Accounting}
          />
          <Route
            exact
            path={CORE_MARKETING_GOOGLE}
            component={MarketingGooglePage}
          />
          <Route
            exact
            path={CORE_MARKETING_FACEBOOK}
            component={MarketingFacebookPage}
          />
          <Route
            exact
            path={CORE_EDI_SHIPMENT_LABELS_PLAYGROUND}
            component={EDIShipmentLabelPlayground}
          />
        </AccessControlRoute>
        <Redirect path="*" to={PAGE_NOT_FOUND} />
      </Switch>
    </Suspense>
  );
};

export const CoreRouter = React.memo(CoreRouterMemo);

