import { DocumentListRow } from "domain/entity/edi/models";
import {
  IntegrationSourceModelExtended,
  PlaidIntegrationModelRes,
} from "domain/entity/integrations/models";
import { OrdersSummaryRes } from "domain/entity/orders/models";

import { InvoiceStatusModel } from "@crstl/api/src/apis/models/EnumTypes";
import {
  IntegrationKeyModel,
  IntegrationTypeModel,
} from "@crstl/api/src/apis/models/Integration";
import { PurchaseOrderStatusModel } from "@crstl/api/src/apis/models/PurchaseOrder";

function buildEDIPurchaseOrderSummary(
  overrides: Partial<DocumentListRow>
): DocumentListRow {
  return {
    orderTotal: "$88.00",
    orderState: "Open",
    invoiceState: "Draft",
    deliveryState: "null",
    paymentState: "null",
    chargebackState: "null",
    id: "62ab32f310b4c03881f5f352",
    _id: "62ab32f310b4c03881f5f352",
    tradingPartner: "Target",
    orderId: "10002302176-0589",
    orderDate: "2021-08-01T00:00:00.000Z",
    stateColors: {
      orderStateColor: {
        backgroundColor: "rgba(242, 201, 76, 0.15)",
        textColor: "rgba(198, 164, 62, 1)",
      },
      asnStateColor: {
        backgroundColor: "rgba(242, 201, 76, 0.15)",
        textColor: "rgba(198, 164, 62, 1)",
      },
      invoiceStateColor: {
        backgroundColor: "rgba(242, 201, 76, 0.15)",
        textColor: "rgba(198, 164, 62, 1)",
      },
      deliveryStateColor: {
        backgroundColor: "rgba(244, 244, 244, 1)",
        textColor: "rgba(244, 244, 244, 1)",
      },
      paymentStateColor: {
        backgroundColor: "rgba(244, 244, 244, 1)",
        textColor: "rgba(244, 244, 244, 1)",
      },
      chargebackStateColor: {
        backgroundColor: "rgba(244, 244, 244, 1)",
        textColor: "rgba(244, 244, 244, 1)",
      },
    },
    ...overrides,
  };
}

function buildPurchaseOrderSummary(
  overrides: Partial<OrdersSummaryRes> = {}
): OrdersSummaryRes {
  return {
    id: "0ad5d9aa-227a-4edb-bc9a-839070071e04",
    receivedAt: new Date().toISOString(),
    status: PurchaseOrderStatusModel.ASN,
    channelName: "CVS",
    invoiceStatus: InvoiceStatusModel.Sent,
    deliveryStatus: "Delivered",
    source: "SPS",
    orderName: "7334233",
    totalAmount: "634",
    ...overrides,
  };
}

function buildPlaidIntegrationModel(
  overrides: Partial<PlaidIntegrationModelRes> = {}
): PlaidIntegrationModelRes {
  return {
    integrationId: "e995e65e-e762-4dcb-ac68-0152e44a620a",
    createdAt: new Date().toISOString(),
    isEnabled: true,
    institutionId: "test_institution_id",
    institutionName: "Test institution name",
    needsReAuthorization: false,
    createdBy: "Test",
    lastReAuthedAt: "",
    lastReAuthedBy: "",
    ...overrides,
  };
}

function buildIntegrationSourceModel(
  overrides: Partial<IntegrationSourceModelExtended> = {}
): IntegrationSourceModelExtended {
  return {
    id: "7b35e746-e46a-4716-b050-ab6a1cb82f12",
    name: "Ramp",
    integrationKey: IntegrationKeyModel.Ramp,
    imageUrl: "https://i.ibb.co/5KDmQBW/logo-small.png",
    integrationType: IntegrationTypeModel.Finance,
    createdBy: "Mrinal Sen",
    createdAt: new Date().toISOString(),
    isConnected: true,
    description: "Connect your Ramp.com account",
    isEnabled: true,
    isActive: true,
    lastReAuthedAt: new Date().toISOString(),
    lastReAuthedBy: "lastReAuthedBy",
    ownerId: "1",
    props: null,
    needsReAuthorization: false,
    assistedIntegration: false,
    ...overrides,
  };
}

export {
  buildPurchaseOrderSummary,
  buildPlaidIntegrationModel,
  buildIntegrationSourceModel,
  buildEDIPurchaseOrderSummary,
};
