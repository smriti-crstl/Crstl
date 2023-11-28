import {
  CORE_INTEGRATIONS,
  CORE_INTEGRATIONS_MY_INTEGRATIONS,
} from "globals/configs";
import { customDataHandler } from "mocks/financeIntegrationHandlers";
import { server } from "mocks/server";
import { render, screen, waitForElementToBeRemoved } from "test-utils";
import { buildPlaidIntegrationModel } from "test-utils/generate";
import { IntegrationsTabContent } from "./index";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function renderComponent({
  path = "/",
  routePath = CORE_INTEGRATIONS,
}: { path?: string; routePath?: string } = {}) {
  render(<IntegrationsTabContent />, {
    path,
    routePath,
    user: { timezone: "" },
  });

  const getLoadingElement = (): HTMLElement =>
    screen.getByTestId("loading integrations");

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

describe("IntegrationTabContent - My Integrations", () => {
  it("should not show finance integration item", async () => {
    const { getLoadingElement, queryRow } = renderComponent({
      path: CORE_INTEGRATIONS_MY_INTEGRATIONS,
    });

    await waitForElementToBeRemoved(() => getLoadingElement());

    expect(queryRow(/finance/i)).not.toBeInTheDocument();
  });

  it("should not show last re-authorized text when it is not set", async () => {
    const plaidIntegrationData = buildPlaidIntegrationModel({
      lastReAuthedAt: "",
      lastReAuthedBy: "",
    });

    const handler = customDataHandler([plaidIntegrationData]);
    server.use(handler);

    const { getLoadingElement, queryReauthText } = renderComponent({
      path: CORE_INTEGRATIONS_MY_INTEGRATIONS,
    });

    await waitForElementToBeRemoved(() => getLoadingElement());

    expect(queryReauthText()).not.toBeInTheDocument();
  });
});
