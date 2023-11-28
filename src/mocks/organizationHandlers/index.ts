import { serviceDefinitions } from "domain/network";
import { rest } from "msw";
import { ENDPOINTS } from "domain/entity/orders/repositories";
import { OrdersSummaryRes } from "domain/entity/orders/models";
import data from "./data.json";

const url = `${serviceDefinitions.CORE}${ENDPOINTS.GET_ORDERS}`;

const handler = rest.get(url, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(data));
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function customDataHandler(data: OrdersSummaryRes[]) {
  return rest.get(url, (_, res, ctx) => {
    return res.once(ctx.status(200), ctx.json(data));
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
