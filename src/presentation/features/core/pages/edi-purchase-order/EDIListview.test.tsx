import MockDate from "mockdate";
import { customDataHandler, noDataHandler } from "mocks/EDIHandlers";
import { server } from "mocks/server";
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
  within,
} from "test-utils";
import { buildEDIPurchaseOrderSummary } from "test-utils/generate";

import { PurchaseOrderStatusModel } from "models/PurchaseOrder";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import EdiListViewPage from "../edi/EdiListViewPage";

function renderComponent({
  path = "/",
  routePath = "/",
}: { path?: string; routePath?: string } = {}) {
  const { history } = render(<EdiListViewPage />, {
    path,
    routePath,
    user: { timezone: "" },
  });

  const findOrderId = async (): Promise<HTMLElement> =>
    screen.findByTestId("orderId");

  const getLoadingSpinner = (): HTMLElement | null =>
    screen.queryByLabelText(/loading/i);

  const findNoDataComponent = async (): Promise<HTMLElement> =>
    screen.findByText(/no data/i);

  const findOrderDateCell = async (): Promise<HTMLElement> =>
    screen.findByTestId("messageTimestamp");

  const findOrderTotalCell = async (): Promise<HTMLElement> =>
    screen.findByTestId("orderTotal");

  const findTradingPartnerCell = async (): Promise<HTMLElement> =>
    screen.findByTestId("tradingPartner");

  const findOrderStatusCell = async (): Promise<HTMLElement> =>
    screen.findByTestId("order");

  const findShipNoticeStatusCell = async (): Promise<HTMLElement> =>
    screen.findByTestId("deliveryState");

  const findInvoiceStatusCell = async (): Promise<HTMLElement> =>
    screen.findByTestId("invoiceState");

  const getRowById = (id: string): HTMLTableRowElement =>
    screen.getByTestId(id);

  const queryRowById = (id: string): HTMLTableRowElement | null =>
    screen.queryByTestId(id);

  const getOrderStatusFilterOption = async (
    option: string
  ): Promise<HTMLElement> => {
    const menuItem = await screen.findByRole("menuitem", {
      name: /open/i,
    });
    return within(menuItem).getByLabelText(option);
  };

  const findOrderStatusFilterButton = async (): Promise<HTMLElement> =>
    screen.findByLabelText(/orderFilterIcon/i);

  return {
    history,
    findOrderId,
    getLoadingSpinner,
    findNoDataComponent,
    findOrderDateCell,
    findOrderTotalCell,
    findTradingPartnerCell,
    findOrderStatusCell,
    findShipNoticeStatusCell,
    findInvoiceStatusCell,
    getRowById,
    queryRowById,
    getOrderStatusFilterOption,
    findOrderStatusFilterButton,
  };
}

describe("EDI List view", () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest: ({ headers, method, url }) => {
        if (headers.get("User-Agent") !== "supertest") {
          throw new Error(`Unhandled ${method} request to ${url}`);
        }
      },
    })
  );

  it("should show correct PO id", async () => {
    const ORDER_ID = "test";
    const orderSummary = buildEDIPurchaseOrderSummary({
      orderId: ORDER_ID,
    });

    const handler = customDataHandler([orderSummary]);
    server.use(handler);

    const { findOrderId } = renderComponent();

    const orderIdCell = await findOrderId();
    expect(orderIdCell).toHaveTextContent("test");
  });
  it.skip("get loading spinner when data is loaded", async () => {
    const { getLoadingSpinner } = renderComponent();

    expect(getLoadingSpinner()).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getLoadingSpinner());
  });
  it(`should show "no data" message for empty API response`, async () => {
    server.use(noDataHandler);
    const { findNoDataComponent } = renderComponent();

    const noDataComponent = await findNoDataComponent();

    expect(noDataComponent).toBeInTheDocument();
  });
  it.skip("should show correct order date", async () => {
    MockDate.set("2023-12-01");

    const orderSummary = buildEDIPurchaseOrderSummary({
      orderDate: new Date().toISOString(),
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findOrderDateCell } = renderComponent();

    const orderDateCell = await findOrderDateCell();

    expect(orderDateCell).toHaveTextContent("December 1, 2023, 12:00 AM");

    MockDate.reset();
  });
  it(`should show "-" when order date cannot be found`, async () => {
    const orderSummary = buildEDIPurchaseOrderSummary({
      orderDate: "",
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findOrderDateCell } = renderComponent();

    const orderDateCell = await findOrderDateCell();

    expect(orderDateCell).toHaveTextContent("-");
  });
  it("should show correct order total", async () => {
    const orderSummary = buildEDIPurchaseOrderSummary({
      orderTotal: " $9,999.99",
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findOrderTotalCell } = renderComponent();

    const orderTotalCell = await findOrderTotalCell();

    expect(orderTotalCell).toHaveTextContent("$9,999.99");

    MockDate.reset();
  });
  it(`should show "-" when order total cannot be found`, async () => {
    const orderSummary = buildEDIPurchaseOrderSummary({
      orderTotal: "",
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findOrderTotalCell } = renderComponent();

    const orderTotalCell = await findOrderTotalCell();

    expect(orderTotalCell).toHaveTextContent("-");
  });
  it("should show correct trading partner name", async () => {
    const CUSTOMER_NAME = "AMAZON";
    const orderSummary = buildEDIPurchaseOrderSummary({
      tradingPartner: CUSTOMER_NAME,
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findTradingPartnerCell } = renderComponent();

    const customerCell = await findTradingPartnerCell();

    expect(customerCell).toHaveTextContent(CUSTOMER_NAME);
  });
  it("should show correct order status", async () => {
    const ORDER_STATUS = "Open";

    const orderSummary = buildEDIPurchaseOrderSummary({
      orderState: ORDER_STATUS,
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findOrderStatusCell } = renderComponent();

    const orderStatusCell = await findOrderStatusCell();

    expect(orderStatusCell).toHaveTextContent(ORDER_STATUS);
  });
  it.skip("should show correct ship notice status", async () => {
    const SHIP_NOTICE_STATUS = "Sent";

    const orderSummary = buildEDIPurchaseOrderSummary({
      deliveryState: SHIP_NOTICE_STATUS,
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findShipNoticeStatusCell } = renderComponent();

    const orderStatusCell = await findShipNoticeStatusCell();

    expect(orderStatusCell).toHaveTextContent(SHIP_NOTICE_STATUS);
  });
  it("should show correct invoice status", async () => {
    const INVOICE_STATUS = "Sent";

    const orderSummary = buildEDIPurchaseOrderSummary({
      invoiceState: INVOICE_STATUS,
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findInvoiceStatusCell } = renderComponent();

    const orderStatusCell = await findInvoiceStatusCell();

    expect(orderStatusCell).toHaveTextContent(INVOICE_STATUS);
  });

  it("should redirect to order details page when a table record is clicked", async () => {
    const ORDER_ID = "id";
    const ID = "id";
    const record = buildEDIPurchaseOrderSummary({
      orderId: ORDER_ID,
      id: ID,
    });

    const handler = customDataHandler([record]);

    server.use(handler);

    const { history, findOrderId } = renderComponent({
      path: "/edi/purchase-order/view/1/1",
      routePath: "/edi/purchase-order/view/:id/:orderId",
    });

    jest.spyOn(history, "push");

    const historyPushMock = history.push as jest.MockedFunction<
      typeof history.push
    >;

    const orderIdCell = await findOrderId();

    userEvent.click(orderIdCell);

    expect(historyPushMock).toHaveBeenCalledWith(
      `/edi/purchase-order/view/${ID}/${ORDER_ID}`
    );
  });

  it("show open orders when filtering by 'Open' order status", async () => {
    const OPEN_ORDER_ID = "1";
    const COMPLETED_ORDER_ID = "2";

    const openOrder = buildEDIPurchaseOrderSummary({
      orderId: OPEN_ORDER_ID,
      orderState: "Open",
    });

    const completedOrder = buildEDIPurchaseOrderSummary({
      orderId: COMPLETED_ORDER_ID,
      orderState: "Completed",
    });
    const handler = customDataHandler([openOrder, completedOrder]);
    server.use(handler);

    const {
      getRowById,
      queryRowById,
      getOrderStatusFilterOption,
      getLoadingSpinner,
      findOrderStatusFilterButton,
    } = renderComponent();
    // await waitForElementToBeRemoved(() => getLoadingSpinner());

    const orderStatusFilterButton = await findOrderStatusFilterButton();
    userEvent.click(orderStatusFilterButton);
    const doc = document.querySelector(".ant-table-filter-dropdown");

    const menuItem = await screen.findByRole("menuitem", {
      name: /open/i,
    });
    /**
     *   fireEvent.click(screen.getByText(/click me/i))
     */
    const checkbox: HTMLInputElement = within(menuItem).getByRole("checkbox");
    console.log(checkbox.checked);
    fireEvent.click(checkbox);
    console.log(checkbox.checked);
    screen.debug(menuItem);
    screen.logTestingPlaygroundURL();

    // Promise.resolve(openButton).then((value) => fireEvent.click(value));

    // expect(getRowById(OPEN_ORDER_ID)).toBeInTheDocument();
    // expect(queryRowById(COMPLETED_ORDER_ID)).not.toBeInTheDocument();
  });
});
