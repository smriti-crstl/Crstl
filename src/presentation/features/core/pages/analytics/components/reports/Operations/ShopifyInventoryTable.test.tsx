import { server } from "mocks/server";
import { render, screen, waitForElementToBeRemoved } from "test-utils";
import { ShopifyInventoryTable } from "./ShopifyInventoryTable";
import { customDataHandler } from "mocks/inventoryHandlers/shopify";

function renderComponent() {
  render(<ShopifyInventoryTable />);

  const getLoadingSpinner = () => screen.getByLabelText(/loading/i);

  const getCell = (name: string) => screen.getByRole("cell", { name });

  const findAllRows = async () => screen.findAllByRole("row");

  const findCell = (name: string) => screen.findByRole("cell", { name });

  const findNoDataComponent = async () => screen.findByLabelText(/no data/i);

  const findErrorComponent = async () => screen.findByLabelText(/warning/i);

  return {
    getCell,
    getLoadingSpinner,
    findAllRows,
    findCell,
    findNoDataComponent,
    findErrorComponent,
  };
}

describe("ShopifyInventoryTable", () => {
  it("should show a loading spinner when fetching data", async () => {
    const { getLoadingSpinner } = renderComponent();

    expect(getLoadingSpinner()).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getLoadingSpinner());
  });

  it("should format quantity", async () => {
    const QUANTITY = "2000";
    const FORMATTED_QUANTITY = "2,000";

    const handler = customDataHandler([
      {
        sku: "1",
        WarehouseA: {
          estValue: "1000",
          quantity: QUANTITY,
        },
      },
    ]);

    server.use(handler);

    const { findAllRows } = renderComponent();

    const [, dataRow] = await findAllRows();

    expect(dataRow).toHaveTextContent(FORMATTED_QUANTITY);
  });
});
