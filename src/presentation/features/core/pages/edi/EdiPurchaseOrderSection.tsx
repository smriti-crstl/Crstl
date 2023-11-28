import { Tabs } from "antd";
import { format } from "date-fns";
import {
  useGetAssociatedPOChangeDocsQuery,
  useListDocumentQuery,
} from "domain/interactors/edi";
import {
  CORE_EDI_PURCHASE_ORDER,
  CORE_EDI_PURCHASE_ORDER_CHANGE,
} from "globals/configs";
import html2pdf from "html2pdf.js";
import { useFlags } from "launchdarkly-react-client-sdk";
import { CoreEDIDocumentNumber } from "presentation/texts-reservoir";
import { lazyRetry } from "presentation/utils";
import React, { lazy, Suspense, useRef } from "react";
import {
  generatePath,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import {
  CloudDownloadOutlined,
  DownloadOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

import { StyledSecondaryButton } from "../edi-edit/EdiEditPage.styles";
import EdiPOViewPage from "../edi-view/EdiPOView";
import EdiViewPage, { EdiViewPageRef } from "../edi-view/EdiViewPage";
import { ButtonsContainer } from "../edi-view/EdiViewPage.styles";
import { getNewPoChanges } from "./edi.utils";
import { EdiPOVersionSelector } from "./EdiPOVersionSelector";
import {
  AlertBadge,
  Container,
  PageWrapper,
  TabsAndVersionContainer,
  TabsContainer,
} from "./EdiPurchaseOrderSection.styles";

const { TabPane } = Tabs;

const EdiPurchaseOrder = lazy(() =>
  lazyRetry(
    () =>
      import(
        /* webpackPrefetch: true */ "../edi-purchase-order/PurchaseOrderPage"
      ),
    "EdiPurchaseOrder"
  )
);

const EdiPurchaseOrderChange = lazy(() =>
  lazyRetry(
    () =>
      import(
        /* webpackPrefetch: true */ "../edi-purchase-order-change/PurchaseOrderChangePage"
      ),
    "EdiPurchaseOrderChange"
  )
);

const EdiPurchaseOrderChangeView = lazy(() =>
  lazyRetry(
    () =>
      import(
        /* webpackPrefetch: true */ "../edi-view/EdiPurchaseOrderChangeView"
      ),
    "EdiPurchaseOrderChangeView"
  )
);

function EdiPurchaseOrderSection() {
  const flags = useFlags();
  const [changedTabManually, setChangedTabManually] = React.useState(false);
  const { id, orderId } = useParams<{ id: string; orderId: string }>();
  const history = useHistory();
  const { pathname } = useLocation();
  const viewerRef = useRef<EdiViewPageRef>(null);
  const downloadComponentRef = useRef(null);

  const result = useListDocumentQuery("860", id);
  const { data, isLoading } = useGetAssociatedPOChangeDocsQuery(orderId);

  const { hasNewPos, poChangeId, newPosCount, hasPos } = getNewPoChanges(data);

  const isPOChangePage = pathname.includes("purchase-order-change");

  const activeKey = isPOChangePage ? "purchase_order_change" : "purchase_order";

  function onTabClick(tabKey: string) {
    setChangedTabManually(true);
    if (tabKey === "purchase_order_change" && hasPos) {
      const path = generatePath(CORE_EDI_PURCHASE_ORDER_CHANGE, {
        id: poChangeId,
        orderId,
      });
      history.replace(path);
    }
    if (tabKey === "purchase_order") {
      const path = generatePath(CORE_EDI_PURCHASE_ORDER, {
        id: orderId,
        orderId,
      });
      history.replace(path);
    }
  }

  if (
    activeKey !== "purchase_order_change" &&
    hasNewPos &&
    !changedTabManually
  ) {
    const path = generatePath(CORE_EDI_PURCHASE_ORDER_CHANGE, {
      id: poChangeId,
      orderId,
    });
    history.replace(path);
  }

  const hasSourceDoc = result?.data?.data?.metadata?.source_850_doc_id
    ? true
    : false;

  const onPrintA4 = async (printIframe: HTMLIFrameElement) => {
    try {
      const document = printIframe.contentDocument;
      if (document) {
        const timestamp = format(new Date(), "LLLL dd yyyy");
        const filename = `${activeKey}_${timestamp}.pdf`;

        const html = document.getElementsByTagName("html")[0];

        const exporter = new html2pdf(html, {
          margin: 10,
          filename,
          jsPDF: { unit: "mm", format: [210, 297], orientation: "landscape" }, // A4 format => [210mm X 297mm]
        });
        await exporter.getPdf(true);
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  const handleDownloadPO = useReactToPrint({
    content: () => downloadComponentRef.current,
    print: onPrintA4,
  });

  return (
    <Suspense fallback={null}>
      <PageWrapper>
        <Container>
          <TabsAndVersionContainer>
            <TabsContainer>
              <Tabs
                defaultActiveKey="purchase_order"
                activeKey={activeKey}
                onTabClick={onTabClick}
              >
                <TabPane
                  tab="Purchase Order"
                  key="purchase_order"
                  disabled={!hasSourceDoc}
                ></TabPane>
                <TabPane
                  tab="Purchase Order Change"
                  key="purchase_order_change"
                  disabled={isLoading || !hasPos}
                ></TabPane>
              </Tabs>
              {hasNewPos ? (
                <AlertBadge>
                  <ExclamationCircleFilled style={{ fontSize: "18px" }} />
                  {newPosCount === 1
                    ? `1 PO Change needs review`
                    : `${newPosCount} PO Changes need review`}
                </AlertBadge>
              ) : null}
            </TabsContainer>
            <ButtonsContainer>
              {flags?.vargo ? (
                <StyledSecondaryButton
                  onClick={() => viewerRef.current?.downloadPage?.()}
                >
                  <DownloadOutlined />
                  Download Document
                </StyledSecondaryButton>
              ) : (
                <StyledSecondaryButton onClick={handleDownloadPO}>
                  <CloudDownloadOutlined />
                  Download Document
                </StyledSecondaryButton>
              )}
              {isPOChangePage ? null : <EdiPOVersionSelector />}
            </ButtonsContainer>
          </TabsAndVersionContainer>
          {flags?.vargo ? (
            <div>
              <Switch>
                <Route
                  exact
                  path={CORE_EDI_PURCHASE_ORDER_CHANGE}
                  component={EdiPurchaseOrderChangeView}
                />
              </Switch>
              <Switch>
                <Route
                  exact
                  path={CORE_EDI_PURCHASE_ORDER_CHANGE}
                  render={() => (
                    <EdiViewPage
                      documentTypeId={CoreEDIDocumentNumber.PurchaseOrderChange}
                      ref={viewerRef}
                    />
                  )}
                />
                <Route
                  exact
                  path={CORE_EDI_PURCHASE_ORDER}
                  render={() => (
                    <EdiPOViewPage
                      documentTypeId={CoreEDIDocumentNumber.PurchaseOrder}
                      ref={viewerRef}
                    />
                  )}
                />
              </Switch>
            </div>
          ) : (
            <div>
              <Switch>
                <Route
                  exact
                  path={CORE_EDI_PURCHASE_ORDER}
                  render={() => <EdiPurchaseOrder ref={downloadComponentRef} />}
                />
                <Route
                  exact
                  path={CORE_EDI_PURCHASE_ORDER_CHANGE}
                  render={() => (
                    <EdiPurchaseOrderChange ref={downloadComponentRef} />
                  )}
                />
              </Switch>
            </div>
          )}
        </Container>
      </PageWrapper>
    </Suspense>
  );
}

export { EdiPurchaseOrderSection as default };

