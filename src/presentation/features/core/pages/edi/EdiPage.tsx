import {
  CORE_EDI_FORM_PLAYGROUND,
  CORE_EDI_GROCERY_INVOICE_EDIT_PAGE,
  CORE_EDI_GROCERY_INVOICE_VIEW_PAGE,
  CORE_EDI_GROCERY_PURCHASE_ORDER,
  CORE_EDI_GROCERY_PURCHASE_ORDER_CHANGE,
  CORE_EDI_INVOICE_EDIT_PAGE,
  CORE_EDI_INVOICE_VIEW_PAGE,
  CORE_EDI_PO_ACK_EDIT_PAGE,
  CORE_EDI_PO_ACK_VIEW_PAGE,
  CORE_EDI_PO_CHANGE_ACK_EDIT_PAGE,
  CORE_EDI_PO_CHANGE_ACK_VIEW_PAGE,
  CORE_EDI_PURCHASE_ORDER,
  CORE_EDI_PURCHASE_ORDER_CHANGE,
  CORE_EDI_RTS_EDIT_PAGE,
  CORE_EDI_RTS_VIEW_PAGE,
  CORE_EDI_SHIPMENT_EDIT_PAGE,
  CORE_EDI_SHIPMENT_VIEW_PAGE,
  CORE_EDI_TIMELINE_PAGE,
} from "globals/configs";
import { useFlags } from "launchdarkly-react-client-sdk";
import { lazyRetry } from "presentation/utils";
import React, { lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import { HeaderShadowContainerWithoutTabs } from "components/molecules/headers";

import { EdiCommentsSection } from "./EdiCommentsSection";
import { EdiStepsSection } from "./EdiStepsSection";

const EdiEditInvoice = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "./EdiInvoiceEditForm"),
    "EdiEditInvoice"
  )
);

const EdiViewInvoice = lazy(() =>
  lazyRetry(
    () =>
      import(/* webpackPrefetch: true */ "../edi-invoice/EdiInvoiceViewPage"),
    "EdiViewInvoice"
  )
);

const EdiPOViewPage = lazy(() =>
  lazyRetry(
    () =>
      import(
        /* webpackPrefetch: true */ "../edi-purchase-order/PurchaseOrderCommonViewPage/PurchaseOrderCommonViewPage"
      ),
    "EdiPOViewPage"
  )
);

const EdiPOChangeAckViewPage = lazy(() =>
  lazyRetry(
    () =>
      import(
        /* webpackPrefetch: true */ "../edi-purchase-order-change-acknowledgement"
      ),
    "EdiPOChangeAckViewPage"
  )
);

const EdiPOAckViewPage = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../edi-view/EdiPOAckView"),
    "EdiPOAckViewPage"
  )
);

const EdiRTSViewPage = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../edi-view/EdiRTSView"),
    "EdiRTSViewPage"
  )
);

const EdiEditShipment = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "./EdiShipNoticeEditForm"),
    "EdiEditShipment"
  )
);

const EdiViewShipment = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "./EdiShipNoticeViewPage"),
    "EdiViewShipment"
  )
);

const EdiTimeline = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../edi-timeline/TimelinePage"),
    "EdiTimeline"
  )
);

const EdiPurchaseOrderSection = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "./EdiPurchaseOrderSection"),
    "EdiPurchaseOrderSection"
  )
);

const EdiFormPlayground = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../edi-edit/EdiFormPlayground"),
    "EdiFormPlayground"
  )
);

const EdiEditPOAck = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "./EdiPOAckEditForm"),
    "EdiEditPOAck"
  )
);

const EdiEditPOChangeAck = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "./EdiPOChangeAckEditForm"),
    "EdiEditPOChangeAck"
  )
);

const EdiEditRTS = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "./EdiRTSEditForm"),
    "EdiEditRTS"
  )
);

const EdiGroceryPurchaseOrderSection = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../edi-grocery-purchase-order"),
    "EdiGroceryPurchaseOrderSection"
  )
);

const EdiGroceryEditInvoice = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "./EdiGroceryInvoiceEditForm"),
    "EdiGroceryEditInvoice"
  )
);

const EdiGroceryViewInvoice = lazy(() =>
  lazyRetry(
    () => import(/* webpackPrefetch: true */ "../edi-grocery-invoice"),
    "EdiGroceryViewInvoice"
  )
);

function EdiPage() {
  const flags = useFlags();
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <HeaderShadowContainerWithoutTabs />
      <EdiStepsSection />
      <Suspense fallback={null}>
        <Switch>
          <Route
            exact
            path={CORE_EDI_FORM_PLAYGROUND}
            component={EdiFormPlayground}
          />
          <Route
            exact
            path={[CORE_EDI_PURCHASE_ORDER, CORE_EDI_PURCHASE_ORDER_CHANGE]}
            component={EdiPurchaseOrderSection}
          />
          <Route
            exact
            path={CORE_EDI_INVOICE_EDIT_PAGE}
            component={EdiEditInvoice}
          />
          <Route
            exact
            path={CORE_EDI_INVOICE_VIEW_PAGE}
            component={EdiViewInvoice}
          />
          <Route
            exact
            path={CORE_EDI_SHIPMENT_EDIT_PAGE}
            component={EdiEditShipment}
          />
          <Route
            exact
            path={CORE_EDI_SHIPMENT_VIEW_PAGE}
            component={EdiViewShipment}
          />
          <Route
            exact
            path={CORE_EDI_PO_ACK_EDIT_PAGE}
            component={EdiEditPOAck}
          />
          <Route
            exact
            path={CORE_EDI_PO_CHANGE_ACK_EDIT_PAGE}
            component={EdiEditPOChangeAck}
          />
          <Route
            exact
            path={CORE_EDI_PO_ACK_VIEW_PAGE}
            component={() =>
              flags?.vargo ? (
                <EdiPOAckViewPage />
              ) : (
                <EdiPOViewPage documentType="acknowledgement" />
              )
            }
          />
          <Route
            exact
            path={CORE_EDI_PO_CHANGE_ACK_VIEW_PAGE}
            component={EdiPOChangeAckViewPage}
          />
          <Route
            exact
            path={CORE_EDI_RTS_VIEW_PAGE}
            component={() =>
              flags?.vargo ? (
                <EdiRTSViewPage />
              ) : (
                <EdiPOViewPage documentType="rts" />
              )
            }
          />
          <Route exact path={CORE_EDI_RTS_EDIT_PAGE} component={EdiEditRTS} />
          <Route exact path={CORE_EDI_TIMELINE_PAGE} component={EdiTimeline} />
          <Route
            exact
            path={[
              CORE_EDI_GROCERY_PURCHASE_ORDER,
              CORE_EDI_GROCERY_PURCHASE_ORDER_CHANGE,
            ]}
            component={EdiGroceryPurchaseOrderSection}
          />
          <Route
            exact
            path={CORE_EDI_GROCERY_INVOICE_EDIT_PAGE}
            component={EdiGroceryEditInvoice}
          />
          <Route
            exact
            path={CORE_EDI_GROCERY_INVOICE_VIEW_PAGE}
            component={EdiGroceryViewInvoice}
          />
        </Switch>
      </Suspense>
      <EdiCommentsSection />
    </div>
  );
}

export { EdiPage };

