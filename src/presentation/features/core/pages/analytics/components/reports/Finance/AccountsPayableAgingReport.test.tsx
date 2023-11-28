import { server } from "mocks/server";
import {
  noDataHandler,
  errorHandler,
  customDataHandler,
} from "mocks/APAgingHandlers";
import { render, screen, waitForElementToBeRemoved } from "test-utils";
import { AccountsPayableAgingReport } from "./AccountsPayableAgingReport";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function renderComponent() {
  render(<AccountsPayableAgingReport />);

  const getLoadingSpinner = (): HTMLElement =>
    screen.getByLabelText(/loading/i);

  const getCell = (name: string): HTMLElement =>
    screen.getByRole("cell", { name });

  const findAllRows = async (): Promise<HTMLElement[]> =>
    screen.findAllByRole("row");

  const findCell = (name: string): Promise<HTMLElement> =>
    screen.findByRole("cell", { name });

  const findNoDataComponent = async (): Promise<HTMLElement> =>
    screen.findByLabelText(/no data/i);

  const findErrorComponent = async (): Promise<HTMLElement> =>
    screen.findByLabelText(/warning/i);

  return {
    getCell,
    getLoadingSpinner,
    findAllRows,
    findCell,
    findNoDataComponent,
    findErrorComponent,
  };
}

describe("AccountsPayableAgingReport", () => {
  it("should show a loading spinner when fetching data", async () => {
    const { getLoadingSpinner } = renderComponent();

    expect(getLoadingSpinner()).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getLoadingSpinner());
  });

  it("should truncate vendor column text when it is more than 20 characters long", async () => {
    const VENDOR = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

    const handler = customDataHandler([
      {
        vendor: VENDOR,
        current: 50,
        due1to30: 100,
        due31To60: 200,
        due61To90: 300,
        dueMoreThan90: 400,
        total: 1050,
      },
    ]);

    server.use(handler);

    const { findAllRows } = renderComponent();

    const [, dataRow] = await findAllRows();

    const [vendorColumn] = Array.from(dataRow.children);

    expect(vendorColumn).toHaveTextContent("Lorem ipsum dolor si...");
  });

  it("should show correct header column and data values", async () => {
    const VENDOR = "test";

    const handler = customDataHandler([
      {
        vendor: VENDOR,
        current: 50,
        due1to30: 100,
        due31To60: 200,
        due61To90: 300,
        dueMoreThan90: 400,
        total: 1050,
      },
    ]);
    server.use(handler);

    const { findAllRows } = renderComponent();

    const [headerRow, dataRow] = await findAllRows();

    const [
      headerColumn1,
      headerColumn2,
      headerColumn3,
      headerColumn4,
      headerColumn5,
      headerColumn6,
      headerColumn7,
    ] = Array.from(headerRow.children);

    const [
      dataRowCell1,
      dataRowCell2,
      dataRowCell3,
      dataRowCell4,
      dataRowCell5,
      dataRowCell6,
      dataRowCell7,
    ] = Array.from(dataRow.children);

    expect(headerColumn1).toHaveTextContent("Vendor");
    expect(dataRowCell1).toHaveTextContent(VENDOR);

    expect(headerColumn2).toHaveTextContent("Current");
    expect(dataRowCell2).toHaveTextContent("$50.00");

    expect(headerColumn3).toHaveTextContent("1-30 days");
    expect(dataRowCell3).toHaveTextContent("$100.00");

    expect(headerColumn4).toHaveTextContent("31-60 days");
    expect(dataRowCell4).toHaveTextContent("$200.00");

    expect(headerColumn5).toHaveTextContent("61-90 days");
    expect(dataRowCell5).toHaveTextContent("$300.00");

    expect(headerColumn6).toHaveTextContent("90+ days");
    expect(dataRowCell6).toHaveTextContent("$400.00");

    expect(headerColumn7).toHaveTextContent("Total");
    expect(dataRowCell7).toHaveTextContent("$1,050.00");
  });

  it(`should show "no data" message for empty API response`, async () => {
    server.use(noDataHandler);

    const { findNoDataComponent } = renderComponent();

    const noDataComponent = await findNoDataComponent();

    expect(noDataComponent).toBeInTheDocument();
  });

  it(`should show "no data" message for API error`, async () => {
    server.use(errorHandler);

    const { findErrorComponent } = renderComponent();

    const errorComponent = await findErrorComponent();

    expect(errorComponent).toBeInTheDocument();
  });
});
