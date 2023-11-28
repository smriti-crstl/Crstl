import { Tabs } from "antd";
import { format } from "date-fns";
import {
  useGetAssociatedPOChangeDocsQuery,
  useListDocumentQuery,
} from "domain/interactors/edi";
import {
  CORE_EDI_GROCERY_PURCHASE_ORDER,
  CORE_EDI_GROCERY_PURCHASE_ORDER_CHANGE,
} from "globals/configs";
import html2pdf from "html2pdf.js";
import { useFlags } from "launchdarkly-react-client-sdk";
import { get } from "lodash";
import { CoreEDIDocumentNumber } from "presentation/texts-reservoir";
import { Suspense, useRef, useState } from "react";
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
import { GroceryPurchaseOrderChangePage } from "../edi-grocery-purchase-order-change/GroceryPurchaseOrderChangePage";
import EdiGroceryPOViewPage from "../edi-view/EdiGroceryPOView";
import EdiGroceryPurchaseOrderChangeView from "../edi-view/EdiGroceryPurchaseOrderChangeView";
import { EdiViewPageRef } from "../edi-view/EdiViewPage";
import { getNewPoChanges } from "../edi/edi.utils";
import { EdiPOVersionSelector } from "../edi/EdiPOVersionSelector";
import { AlertBadge } from "../edi/EdiPurchaseOrderSection.styles";
import { GroceryPurchaseOrderPage } from "./components/GroceryPurchaseOrderPage";
import {
  ButtonsContainer,
  Container,
  PageWrapper,
  TabsAndVersionContainer,
  TabsContainer,
} from "./styles";

const { TabPane } = Tabs;

export const EdiGroceryPurchaseOrderSection = () => {
  const flags = useFlags();
  const [changedTabManually, setChangedTabManually] = useState(false);
  const { id, orderId } = useParams<{ id: string; orderId: string }>();
  const history = useHistory();
  const { pathname } = useLocation();
  const viewerRef = useRef<EdiViewPageRef>(null);
  const downloadComponentRef = useRef(null);

  const { data: poChangeData } = useListDocumentQuery("876", id);
  const {
    data: associatedPoChangeDoc,
    isLoading,
  } = useGetAssociatedPOChangeDocsQuery(orderId, "875");

  const { hasNewPos, poChangeId, newPosCount, hasPos } = getNewPoChanges(
    associatedPoChangeDoc
  );

  const isPOChangePage = pathname.includes("grocery-purchase-order-change");
  const activeKey = isPOChangePage
    ? "grocery_purchase_order_change"
    : "grocery_purchase_order";

  function onTabClick(tabKey: string) {
    setChangedTabManually(true);
    if (tabKey === "grocery_purchase_order_change" && hasPos) {
      const path = generatePath(CORE_EDI_GROCERY_PURCHASE_ORDER_CHANGE, {
        id: poChangeId,
        orderId,
      });
      history.replace(path);
    }
    if (tabKey === "grocery_purchase_order") {
      const path = generatePath(CORE_EDI_GROCERY_PURCHASE_ORDER, {
        id: orderId,
        orderId,
      });
      history.replace(path);
    }
  }

  if (
    activeKey !== "grocery_purchase_order_change" &&
    hasNewPos &&
    !changedTabManually
  ) {
    const path = generatePath(CORE_EDI_GROCERY_PURCHASE_ORDER_CHANGE, {
      id: poChangeId,
      orderId,
    });
    history.replace(path);
  }

  const hasSourceDoc = !!get(poChangeData, "data.metadata.source_875_doc_id");

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
          jsPDF: {
            unit: "mm",
            format: [210, 297],
            orientation: "landscape",
          }, // A4 format => [210mm X 297mm]
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
                defaultActiveKey="grocery_purchase_order"
                activeKey={activeKey}
                onTabClick={onTabClick}
              >
                <TabPane
                  tab="Grocery PO"
                  key="grocery_purchase_order"
                  disabled={!hasSourceDoc}
                ></TabPane>
                <TabPane
                  tab="Grocery PO Change"
                  key="grocery_purchase_order_change"
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
                  path={CORE_EDI_GROCERY_PURCHASE_ORDER_CHANGE}
                  render={() => <EdiGroceryPurchaseOrderChangeView />}
                />
                <Route
                  exact
                  path={CORE_EDI_GROCERY_PURCHASE_ORDER}
                  render={() => (
                    <EdiGroceryPOViewPage
                      documentTypeId={
                        CoreEDIDocumentNumber.GroceryPurchaseOrder
                      }
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
                  path={CORE_EDI_GROCERY_PURCHASE_ORDER}
                  render={() => (
                    <GroceryPurchaseOrderPage ref={downloadComponentRef} />
                  )}
                />
                <Route
                  exact
                  path={CORE_EDI_GROCERY_PURCHASE_ORDER_CHANGE}
                  render={() => (
                    <GroceryPurchaseOrderChangePage
                      ref={downloadComponentRef}
                    />
                  )}
                />
              </Switch>
            </div>
          )}
        </Container>
      </PageWrapper>
    </Suspense>
  );
};

