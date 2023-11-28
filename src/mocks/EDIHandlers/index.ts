import { DocumentListRow } from "domain/entity/edi/models";
import { ENDPOINTS } from "domain/entity/edi/repositories";
import { serviceDefinitions } from "domain/network";
import { rest } from "msw";

import orders from "./data.json";

const url = `${serviceDefinitions.CORE}${ENDPOINTS.SEARCH_ORDERS}`;

const handler = rest.get(url, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ data: { orders } }));
});
const noDataHandler = rest.get(url, (_, res, ctx) => {
  return res.once(
    ctx.status(200),
    ctx.json({
      data: [],
    })
  );
});

function customDataHandler(orders: DocumentListRow[]) {
  return rest.get(url, (_, res, ctx) => {
    return res.once(ctx.status(200), ctx.json({ data: { orders } }));
  });
}

export { handler as default, noDataHandler, customDataHandler };
