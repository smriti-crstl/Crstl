import { server } from "mocks/server";
import { render, screen, waitForElementToBeRemoved } from "test-utils";
import { AmazonInventoryTable } from "./AmazonInventoryTable";
import { customDataHandler } from "mocks/inventoryHandlers/amazon";

function renderComponent() {
  render(<AmazonInventoryTable />);

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
        productName: "Test product",
        quantity: QUANTITY,
      },
    ]);

    server.use(handler);

    const { findAllRows } = renderComponent();

    const [, dataRow] = await findAllRows();

    const [, , availabilityCell] = Array.from(dataRow.children);

    expect(availabilityCell).toHaveTextContent(FORMATTED_QUANTITY);
  });
});
