import { serviceDefinitions } from "domain/network";
import { rest } from "msw";
import { ENDPOINTS } from "domain/entity/analytics/repositories";
import { AccountsPayableAgingSeries } from "domain/entity/analytics/model";
import data from "./data.json";

const url = `${serviceDefinitions.CORE}${ENDPOINTS.GET_AP_AGING_REPORT}`;

const handler = rest.get(url, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(data));
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function customDataHandler(data: AccountsPayableAgingSeries[]) {
  return rest.get(url, (_, res, ctx) => {
    return res.once(ctx.status(200), ctx.json({ data }));
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
