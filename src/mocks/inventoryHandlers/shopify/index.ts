import { serviceDefinitions } from "domain/network";
import { rest } from "msw";
import { ENDPOINTS } from "domain/entity/analytics/repositories";
import data from "./data.json";

type InventoryDataItem = Record<string, { estValue: string; quantity: string }>;

type ShopifyInventorySkuLocationSeries = InventoryDataItem | { sku: string };

interface ShopifyInventorySkuLocationResponse {
  data: Array<ShopifyInventorySkuLocationSeries>;
  lastUpdatedAt: string;
}

const url = `${serviceDefinitions.CORE}${ENDPOINTS.GET_SHOPIFY_INVENTORY_DATA}`;

const handler = rest.get(url, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(data));
});

function customDataHandler(data: ShopifyInventorySkuLocationSeries[]) {
  const response: ShopifyInventorySkuLocationResponse = {
    data,
    lastUpdatedAt: new Date().toISOString(),
  };
  return rest.get(url, (_, res, ctx) => {
    return res.once(ctx.status(200), ctx.json(response));
  });
}

const noDataHandler = rest.get(url, (_, res, ctx) => {
  return res.once(
    ctx.status(200),
    ctx.json({
      data: [],
    })
  );
});

const errorHandler = rest.get(url, (_, res, ctx) => {
  return res.once(
    ctx.status(500),
    ctx.json({
      data: [],
    })
  );
});

export type { ShopifyInventorySkuLocationResponse };

export { handler as default, noDataHandler, errorHandler, customDataHandler };
