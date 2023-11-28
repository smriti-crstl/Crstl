import APAgingHandler from "./APAgingHandlers";
import channelHandlers from "./channelHandlers";
import configHandlers from "./configHandlers";
import organizationHandlers from "./organizationHandlers";
import financeIntegrationHandlers from "./financeIntegrationHandlers";
import integrationSourceHandlers from "./integrationSourceHandlers";
import integrationStatusHandlers from "./integrationStatusHandlers";
import integrationReAuthHandlers from "./integrationReAuthHandlers";
import railzBusinessHandlers from "./railzBusinessHandlers";
import railzIntegrationHandlers from "./railzIntegrationHandlers";
import slkRecipientHandlers from "./slkRecipientHandlers";
import shopifyInventoryHandlers from "./inventoryHandlers/shopify";
import amazonInventoryHandlers from "./inventoryHandlers/amazon";

const handlers = [
  APAgingHandler,
  channelHandlers,
  configHandlers,
  organizationHandlers,
  financeIntegrationHandlers,
  integrationSourceHandlers,
  integrationStatusHandlers,
  integrationReAuthHandlers,
  railzBusinessHandlers,
  railzIntegrationHandlers,
  slkRecipientHandlers,
  shopifyInventoryHandlers,
  amazonInventoryHandlers,
];

export { handlers };
