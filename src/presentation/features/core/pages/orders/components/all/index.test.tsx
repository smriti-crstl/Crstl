import userEvent from "@testing-library/user-event";
import {
  ChargebackStatusModel,
  InvoiceStatusModel,
  PaymentStatusModel,
} from "models/EnumTypes";
import { PurchaseOrderStatusModel } from "models/PurchaseOrder";
import MockDate from "mockdate";
import { customDataHandler } from "mocks/organizationHandlers";
import { server } from "mocks/server";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "test-utils";
import { buildPurchaseOrderSummary } from "test-utils/generate";
import { OrdersAll } from "./index";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function renderComponent({
  path = "/",
  routePath = "/",
}: { path?: string; routePath?: string } = {}) {
  const { history } = render(<OrdersAll />, {
    path,
    routePath,
    user: { timezone: "" },
  });

  const getLoadingElement = (): HTMLElement => screen.getByTestId("loading");

  const getRowById = (id: string): HTMLTableRowElement =>
    screen.getByTestId(id);

  const getOrderStatusFilterOption = (
    option: PurchaseOrderStatusModel
  ): HTMLElement => {
    const menuItem = screen.getByTestId(`status ${option}`);
    return within(menuItem).getByLabelText(option);
  };

  const getChargebackStatusFilterOption = (
    option: ChargebackStatusModel
  ): HTMLElement => {
    const menuItem = screen.getByTestId(`chargebackStatus ${option}`);
    return within(menuItem).getByLabelText(option);
  };

  const getInvoiceStatusFilterOption = (
    option: InvoiceStatusModel
  ): HTMLElement => {
    const menuItem = screen.getByTestId(`invoiceStatus ${option}`);
    return within(menuItem).getByLabelText(option);
  };

  const queryRowById = (id: string): HTMLTableRowElement | null =>
    screen.queryByTestId(id);

  const findOrderStatusFilterButton = async (): Promise<HTMLElement> =>
    screen.findByRole("button", { name: /order status/i });

  const findOrderStatusFilterOption = async (
    option: PurchaseOrderStatusModel
  ): Promise<HTMLElement> => screen.findByTestId(`status ${option}`);

  const findChargebackStatusFilterButton = async (): Promise<HTMLElement> =>
    screen.findByRole("button", { name: /chargeback status/i });

  const findChargebackStatusFilterOption = async (
    option: PurchaseOrderStatusModel
  ): Promise<HTMLElement> => screen.findByTestId(`chargebackStatus ${option}`);

  const findInvoiceStatusFilterButton = async (): Promise<HTMLElement> =>
    screen.findByRole("button", { name: /invoice status/i });

  const findOrderId = async (): Promise<HTMLElement> =>
    screen.findByTestId("orderId");

  const findOrderDateCell = async (): Promise<HTMLElement> =>
    screen.findByTestId("orderDate");

  const findOrderTotalCell = async (): Promise<HTMLElement> =>
    screen.findByTestId("orderTotal");

  const findCustomerCell = async (): Promise<HTMLElement> =>
    screen.findByTestId("customer");

  const findSourceCell = async (): Promise<HTMLElement> =>
    screen.findByTestId("source");

  const findOrderStatusCell = async (): Promise<HTMLElement> =>
    screen.findByTestId("order");

  const findDeliveryStatusCell = async (): Promise<HTMLElement> =>
    screen.findByTestId("delivery");

  const findInvoiceStatusCell = async (): Promise<HTMLElement> =>
    screen.findByTestId("invoice");

  const findPaymentStatusCell = async (): Promise<HTMLElement> =>
    screen.findByTestId("payment");

  const findChargebackStatusCell = async (): Promise<HTMLElement> =>
    screen.findByTestId("chargeback");

  const findRowById = async (id: string): Promise<HTMLTableRowElement> =>
    screen.findByTestId(id);

  const findAllRows = async (): Promise<HTMLElement[]> =>
    screen.findAllByRole("row");

  const findNextPageButton = async (): Promise<HTMLElement> =>
    screen.findByTestId("pagination-button-next");

  return {
    history,
    getLoadingElement,
    getRowById,
    getOrderStatusFilterOption,
    getChargebackStatusFilterOption,
    getInvoiceStatusFilterOption,
    queryRowById,
    findOrderStatusFilterButton,
    findOrderStatusFilterOption,
    findChargebackStatusFilterButton,
    findChargebackStatusFilterOption,
    findInvoiceStatusFilterButton,
    findOrderId,
    findOrderDateCell,
    findOrderTotalCell,
    findCustomerCell,
    findSourceCell,
    findOrderStatusCell,
    findDeliveryStatusCell,
    findInvoiceStatusCell,
    findPaymentStatusCell,
    findChargebackStatusCell,
    findRowById,
    findAllRows,
    findNextPageButton,
  };
}

describe("Orders", () => {
  it("should show correct order id", async () => {
    const ORDER_ID = "test";

    const orderSummary = buildPurchaseOrderSummary({
      orderName: ORDER_ID,
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findOrderId } = renderComponent();

    const orderIdCell = await findOrderId();

    expect(orderIdCell).toHaveTextContent(ORDER_ID);
  });

  it(`should show "-" when order id cannot be found`, async () => {
    const orderSummary = buildPurchaseOrderSummary({
      orderName: "",
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findOrderId } = renderComponent();

    const orderIdCell = await findOrderId();

    expect(orderIdCell).toHaveTextContent("-");
  });

  it("should show correct order date", async () => {
    MockDate.set("2021-12-01");

    const orderSummary = buildPurchaseOrderSummary({
      receivedAt: new Date().toISOString(),
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findOrderDateCell } = renderComponent();

    const orderDateCell = await findOrderDateCell();

    expect(orderDateCell).toHaveTextContent("December 1, 2021, 12:00 AM");

    MockDate.reset();
  });

  it(`should show "-" when order date cannot be found`, async () => {
    const orderSummary = buildPurchaseOrderSummary({
      receivedAt: "",
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findOrderDateCell } = renderComponent();

    const orderDateCell = await findOrderDateCell();

    expect(orderDateCell).toHaveTextContent("-");
  });

  it("should show correct order total", async () => {
    const orderSummary = buildPurchaseOrderSummary({
      totalAmount: "9999.99",
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findOrderTotalCell } = renderComponent();

    const orderTotalCell = await findOrderTotalCell();

    expect(orderTotalCell).toHaveTextContent("$9,999.99");

    MockDate.reset();
  });

  it(`should show "-" when order total cannot be found`, async () => {
    const orderSummary = buildPurchaseOrderSummary({
      totalAmount: "",
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findOrderTotalCell } = renderComponent();

    const orderTotalCell = await findOrderTotalCell();

    expect(orderTotalCell).toHaveTextContent("-");
  });

  it("should show correct customer name", async () => {
    const CUSTOMER_NAME = "test";
    const orderSummary = buildPurchaseOrderSummary({
      channelName: CUSTOMER_NAME,
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findCustomerCell } = renderComponent();

    const customerCell = await findCustomerCell();

    expect(customerCell).toHaveTextContent(CUSTOMER_NAME);
  });

  it("should show correct source name", async () => {
    const SOURCE = "test";
    const orderSummary = buildPurchaseOrderSummary({
      source: SOURCE,
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findSourceCell } = renderComponent();

    const sourceCell = await findSourceCell();

    expect(sourceCell).toHaveTextContent(SOURCE);
  });

  it("should show correct order status", async () => {
    const ORDER_STATUS = PurchaseOrderStatusModel.ASN;

    const orderSummary = buildPurchaseOrderSummary({
      status: ORDER_STATUS,
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findOrderStatusCell } = renderComponent();

    const orderStatusCell = await findOrderStatusCell();

    expect(orderStatusCell).toHaveTextContent(ORDER_STATUS);
  });

  it("should show correct delivery status", async () => {
    const DELIVERY_STATUS = "Pre-Transit";

    const orderSummary = buildPurchaseOrderSummary({
      deliveryStatus: DELIVERY_STATUS,
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findDeliveryStatusCell } = renderComponent();

    const deliveryStatusCell = await findDeliveryStatusCell();

    expect(deliveryStatusCell).toHaveTextContent(DELIVERY_STATUS);
  });

  it("should show correct invoice status", async () => {
    const INVOICE_STATUS = InvoiceStatusModel.Sent;

    const orderSummary = buildPurchaseOrderSummary({
      invoiceStatus: INVOICE_STATUS,
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findInvoiceStatusCell } = renderComponent();

    const invoiceStatusCell = await findInvoiceStatusCell();

    expect(invoiceStatusCell).toHaveTextContent(INVOICE_STATUS);
  });

  it("should show correct payment status", async () => {
    const PAYMENT_STATUS = PaymentStatusModel.Paid;

    const orderSummary = buildPurchaseOrderSummary({
      paymentStatus: PAYMENT_STATUS,
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findPaymentStatusCell } = renderComponent();

    const paymentStatusCell = await findPaymentStatusCell();

    expect(paymentStatusCell).toHaveTextContent(PAYMENT_STATUS);
  });

  it("should show correct chargeback status", async () => {
    const CHARGEBACK_STATUS = ChargebackStatusModel.Won;

    const orderSummary = buildPurchaseOrderSummary({
      chargebackStatus: CHARGEBACK_STATUS,
    });

    const handler = customDataHandler([orderSummary]);

    server.use(handler);

    const { findChargebackStatusCell } = renderComponent();

    const chargebackStatusCell = await findChargebackStatusCell();

    expect(chargebackStatusCell).toHaveTextContent(CHARGEBACK_STATUS);
  });

  xit("should update url when the pagination button is clicked", async () => {
    const { history, findNextPageButton } = renderComponent();

    jest.spyOn(history, "replace");

    const historyReplaceMock = history.replace as jest.MockedFunction<
      typeof history.replace
    >;

    const nextButton = await findNextPageButton();

    userEvent.click(nextButton);

    expect(historyReplaceMock).toHaveBeenCalledTimes(1);

    const location = historyReplaceMock.mock.calls[0][0];
    expect(location).toMatchObject({
      pathname: "/orders/shopify/list/all/2",
    });
  });

  it("should redirect to order details page when a table record is clicked", async () => {
    const ORDER_ID = "order-id";
    const record = buildPurchaseOrderSummary({
      id: ORDER_ID,
    });

    const handler = customDataHandler([record]);

    server.use(handler);

    const { history, findOrderId } = renderComponent({
      path: "/orders/view/all/1",
      routePath: "/orders/view/:type/:id",
    });

    jest.spyOn(history, "push");

    const historyPushMock = history.push as jest.MockedFunction<
      typeof history.push
    >;

    const orderIdCell = await findOrderId();

    userEvent.click(orderIdCell);

    expect(historyPushMock).toHaveBeenCalledWith(
      `/orders/view/all/${ORDER_ID}`
    );
  });

  it(`should show open orders when filtering by "Open" order status`, async () => {
    const OPEN_ORDER_ID = "1";
    const CLOSED_ORDER_ID = "2";

    const openOrder = buildPurchaseOrderSummary({
      id: OPEN_ORDER_ID,
      status: PurchaseOrderStatusModel.Open,
    });

    const closedOrder = buildPurchaseOrderSummary({
      id: CLOSED_ORDER_ID,
      status: PurchaseOrderStatusModel.Cancelled,
    });

    const handler = customDataHandler([openOrder, closedOrder]);

    server.use(handler);

    const {
      getRowById,
      queryRowById,
      getLoadingElement,
      getOrderStatusFilterOption,
      findOrderStatusFilterButton,
    } = renderComponent();

    await waitForElementToBeRemoved(() => getLoadingElement());

    const orderStatusFilterButton = await findOrderStatusFilterButton();

    userEvent.click(orderStatusFilterButton);

    const openButton = getOrderStatusFilterOption(
      PurchaseOrderStatusModel.Open
    );

    fireEvent.click(openButton);

    expect(getRowById(OPEN_ORDER_ID)).toBeInTheDocument();
    expect(queryRowById(CLOSED_ORDER_ID)).not.toBeInTheDocument();
  });

  it(`should show open chargeback orders when filtering by "Open" chargeback status`, async () => {
    const OPEN_CHARGEBACK_ORDER_ID = "1";
    const CLOSED_CHARGEBACK_ORDER_ID = "2";

    const openOrder = buildPurchaseOrderSummary({
      id: OPEN_CHARGEBACK_ORDER_ID,
      chargebackStatus: ChargebackStatusModel.Open,
    });

    const closedOrder = buildPurchaseOrderSummary({
      id: CLOSED_CHARGEBACK_ORDER_ID,
      chargebackStatus: ChargebackStatusModel.Lost,
    });

    const handler = customDataHandler([openOrder, closedOrder]);

    server.use(handler);

    const {
      getRowById,
      queryRowById,
      getLoadingElement,
      getChargebackStatusFilterOption,
      findChargebackStatusFilterButton,
    } = renderComponent();

    await waitForElementToBeRemoved(() => getLoadingElement());

    const chargebackStatusFilterButton = await findChargebackStatusFilterButton();

    userEvent.click(chargebackStatusFilterButton);

    const openButton = getChargebackStatusFilterOption(
      ChargebackStatusModel.Open
    );

    fireEvent.click(openButton);

    expect(getRowById(OPEN_CHARGEBACK_ORDER_ID)).toBeInTheDocument();
    expect(queryRowById(CLOSED_CHARGEBACK_ORDER_ID)).not.toBeInTheDocument();
  });

  it(`should show orders with open invoice when filtering by "Open" invoice status`, async () => {
    const OPEN_INVOICE_ORDER_ID = "1";
    const CLOSED_INVOICE_ORDER_ID = "2";

    const openOrder = buildPurchaseOrderSummary({
      id: OPEN_INVOICE_ORDER_ID,
      invoiceStatus: InvoiceStatusModel.Open,
    });

    const closedOrder = buildPurchaseOrderSummary({
      id: CLOSED_INVOICE_ORDER_ID,
      invoiceStatus: InvoiceStatusModel.Sent,
    });

    const handler = customDataHandler([openOrder, closedOrder]);

    server.use(handler);

    const {
      getRowById,
      queryRowById,
      getLoadingElement,
      getInvoiceStatusFilterOption,
      findInvoiceStatusFilterButton,
    } = renderComponent();

    await waitForElementToBeRemoved(() => getLoadingElement());

    const invoiceStatusFilterButton = await findInvoiceStatusFilterButton();

    userEvent.click(invoiceStatusFilterButton);

    const openButton = getInvoiceStatusFilterOption(InvoiceStatusModel.Open);

    fireEvent.click(openButton);

    expect(getRowById(OPEN_INVOICE_ORDER_ID)).toBeInTheDocument();
    expect(queryRowById(CLOSED_INVOICE_ORDER_ID)).not.toBeInTheDocument();
  });

  it(`should show orders with sent invoice when filtering by "Sent" invoice status`, async () => {
    const OPEN_INVOICE_ORDER_ID = "1";
    const CLOSED_INVOICE_ORDER_ID = "2";

    const openOrder = buildPurchaseOrderSummary({
      id: OPEN_INVOICE_ORDER_ID,
      invoiceStatus: InvoiceStatusModel.Open,
    });

    const closedOrder = buildPurchaseOrderSummary({
      id: CLOSED_INVOICE_ORDER_ID,
      invoiceStatus: InvoiceStatusModel.Sent,
    });

    const handler = customDataHandler([openOrder, closedOrder]);

    server.use(handler);

    const {
      getRowById,
      queryRowById,
      getLoadingElement,
      getInvoiceStatusFilterOption,
      findInvoiceStatusFilterButton,
    } = renderComponent();

    await waitForElementToBeRemoved(() => getLoadingElement());

    const invoiceStatusFilterButton = await findInvoiceStatusFilterButton();

    userEvent.click(invoiceStatusFilterButton);

    const openButton = getInvoiceStatusFilterOption(InvoiceStatusModel.Sent);

    fireEvent.click(openButton);

    expect(queryRowById(OPEN_INVOICE_ORDER_ID)).not.toBeInTheDocument();
    expect(getRowById(CLOSED_INVOICE_ORDER_ID)).toBeInTheDocument();
  });

  it(`should not show orders when filtering criteria yields no result`, async () => {
    const OPEN_INVOICE_ORDER_ID = "1";
    const CLOSED_INVOICE_ORDER_ID = "2";

    const openOrder = buildPurchaseOrderSummary({
      id: OPEN_INVOICE_ORDER_ID,
      invoiceStatus: InvoiceStatusModel.Open,
    });

    const closedOrder = buildPurchaseOrderSummary({
      id: CLOSED_INVOICE_ORDER_ID,
      invoiceStatus: InvoiceStatusModel.Sent,
    });

    const handler = customDataHandler([openOrder, closedOrder]);

    server.use(handler);

    const {
      queryRowById,
      getLoadingElement,
      getInvoiceStatusFilterOption,
      findInvoiceStatusFilterButton,
    } = renderComponent();

    await waitForElementToBeRemoved(() => getLoadingElement());

    const invoiceStatusFilterButton = await findInvoiceStatusFilterButton();

    userEvent.click(invoiceStatusFilterButton);

    const openButton = getInvoiceStatusFilterOption(InvoiceStatusModel.Delayed);

    fireEvent.click(openButton);

    expect(queryRowById(OPEN_INVOICE_ORDER_ID)).not.toBeInTheDocument();
    expect(queryRowById(CLOSED_INVOICE_ORDER_ID)).not.toBeInTheDocument();
  });
});
