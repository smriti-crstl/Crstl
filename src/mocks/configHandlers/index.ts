import { rest } from "msw";
import { serviceDefinitions } from "domain/network";
import { ENDPOINTS } from "domain/entity/orders/repositories";
import data from "./data.json";

const url = `${serviceDefinitions.CORE}${ENDPOINTS.GET_ORG_CONFIG}`;

const handler = rest.get(url, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(data));
});

export { handler as default };
