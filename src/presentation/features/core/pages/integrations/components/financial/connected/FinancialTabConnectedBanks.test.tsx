import {
  CORE_INTEGRATIONS,
  CORE_INTEGRATIONS_FINANCIAL,
} from "globals/configs";
import { render, screen, waitForElementToBeRemoved } from "test-utils";
import { server } from "mocks/server";
import { customDataHandler } from "mocks/integrationSourceHandlers";
import { FinancialTabConnectedBanks } from "./FinancialTabConnectedBanks";
import { buildIntegrationSourceModel } from "test-utils/generate";
import {
  IntegrationKeyModel,
  IntegrationTypeModel,
} from "@crstl/api/src/apis/models/Integration";

function renderComponent({
  path = CORE_INTEGRATIONS_FINANCIAL,
  routePath = CORE_INTEGRATIONS,
}: { path?: string; routePath?: string } = {}) {
  render(<FinancialTabConnectedBanks />, {
    path,
    routePath,
    user: { timezone: "" },
  });

  const getLoadingElement = (): HTMLElement => screen.getByTestId("Loading");

  const getRow = (testId: string): HTMLElement => screen.getByTestId(testId);

  const queryRow = (testId: string | RegExp): HTMLElement | null =>
    screen.queryByTestId(testId);

  const queryReauthText = (): HTMLElement | null =>
    screen.queryByTestId("reauth-text");

  const findRow = async (testId: string): Promise<HTMLElement> =>
    screen.findByTestId(testId);

  const findReauthText = async (): Promise<HTMLElement> =>
    screen.findByTestId("reauth-text");

  return {
    getLoadingElement,
    getRow,
    queryRow,
    queryReauthText,
    findRow,
    findReauthText,
  };
}

describe("FinancialTabConnectedBanks", () => {
  it.skip("should render ramp integration item on the financial tab", async () => {
    const INTEGRATION_NAME = "Ramp";

    const handler = customDataHandler([
      buildIntegrationSourceModel({
        name: INTEGRATION_NAME,
        integrationKey: IntegrationKeyModel.Ramp,
      }),
    ]);

    server.use(handler);

    const { findRow } = renderComponent();

    const rampIntegrationRow = await findRow(INTEGRATION_NAME);

    expect(rampIntegrationRow).toBeInTheDocument();
  });

  it("should not render any other financial integration", async () => {
    const INTEGRATION_NAME = "Amazon";

    const handler = customDataHandler([
      buildIntegrationSourceModel({
        name: INTEGRATION_NAME,
        integrationType: IntegrationTypeModel.Finance,
        integrationKey: IntegrationKeyModel.Amazon,
      }),
    ]);

    server.use(handler);

    const { getLoadingElement, queryRow } = renderComponent();

    await waitForElementToBeRemoved(() => getLoadingElement());

    expect(queryRow(INTEGRATION_NAME)).not.toBeInTheDocument();
  });
});
