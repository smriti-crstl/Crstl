import { server } from "mocks/server";
import { customDataHandler } from "mocks/integrationStatusHandlers";
import { render, screen, waitForElementToBeRemoved } from "test-utils";
import { IntegrationStatus } from "./IntegrationStatus";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function renderComponent() {
  render(<IntegrationStatus />);

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

describe("IntegrationStatus", () => {
  it("should show a loading spinner when fetching data", async () => {
    const { getLoadingSpinner } = renderComponent();

    expect(getLoadingSpinner()).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getLoadingSpinner());
  });

  it(`should show N/A when last updated data is empty`, async () => {
    const handler = customDataHandler([
      {
        source: "Test Source",
        currentStatus: "OK",
        integrationType: "Finance",
      },
    ]);

    server.use(handler);

    const { findAllRows } = renderComponent();

    const [, dataRow] = await findAllRows();

    const [, , lastUpdatedCell] = Array.from(dataRow.children);

    expect(lastUpdatedCell).toHaveTextContent("N/A");
  });

  it("should show correct status text when integration is healthy", async () => {
    const handler = customDataHandler([
      {
        source: "Test Source",
        currentStatus: "OK",
        integrationType: "Finance",
      },
    ]);

    server.use(handler);

    const { findAllRows } = renderComponent();

    const [, dataRow] = await findAllRows();

    const [, statusCell] = Array.from(dataRow.children);

    expect(statusCell).toHaveTextContent("Good");
  });

  it("should show correct status text when integration is unhealthy", async () => {
    const handler = customDataHandler([
      {
        source: "Test Source",
        currentStatus: "NotOK",
        integrationType: "Finance",
      },
    ]);

    server.use(handler);

    const { findAllRows } = renderComponent();

    const [, dataRow] = await findAllRows();

    const [, statusCell] = Array.from(dataRow.children);

    expect(statusCell).toHaveTextContent("Needs reauthorization");
  });
});
