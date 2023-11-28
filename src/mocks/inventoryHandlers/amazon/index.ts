import { serviceDefinitions } from "domain/network";
import { rest } from "msw";
import { ENDPOINTS } from "domain/entity/analytics/repositories";
import data from "./data.json";
import {
  AmzInventorySkuResponse,
  AmzInventorySkuSeries,
} from "domain/entity/analytics/model";

const url = `${serviceDefinitions.CORE}${ENDPOINTS.GET_AMAZON_INVENTORY_DATA}`;

const handler = rest.get(url, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(data));
});

function customDataHandler(data: AmzInventorySkuSeries[]) {
  const response: AmzInventorySkuResponse = {
    data,
    lastUpdatedAt: new Date().toISOString(),
    metadata: {
      dataSources: [],
      description: "",
    },
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

export { handler as default, noDataHandler, errorHandler, customDataHandler };
