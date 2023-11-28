import MockDate from "mockdate";
import { buildPlaidIntegrationModel } from "test-utils/generate";
import { customDataHandler } from "mocks/financeIntegrationHandlers";
import { server } from "mocks/server";
import { FinancialTabSections } from "./index";
import {
  CORE_INTEGRATIONS,
  CORE_INTEGRATIONS_FINANCIAL,
} from "globals/configs";
import { render, screen } from "test-utils";

function renderComponent({
  path = "/",
  routePath = CORE_INTEGRATIONS,
}: { path?: string; routePath?: string } = {}) {
  render(<FinancialTabSections />, {
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

describe("IntegrationsTabContent - Financial", () => {
  it("should show plaid integration items", async () => {
    const INSTITUTION_NAME = "Test institution";

    const plaidIntegrationData = buildPlaidIntegrationModel({
      institutionName: INSTITUTION_NAME,
    });
    const handler = customDataHandler([plaidIntegrationData]);
    server.use(handler);

    const { findRow } = renderComponent({
      path: CORE_INTEGRATIONS_FINANCIAL,
    });

    const institutionRow = await findRow(INSTITUTION_NAME);

    expect(institutionRow).toBeInTheDocument();
  });

  it("should show last re-authorized text when it is set", async () => {
    MockDate.set("2021-12-01");

    const INSTITUTION_NAME = "Test institution name";
    const REAUTH_BY = "Test user";

    const plaidIntegrationData = buildPlaidIntegrationModel({
      institutionName: INSTITUTION_NAME,
      lastReAuthedAt: new Date().toISOString(),
      lastReAuthedBy: REAUTH_BY,
    });

    const handler = customDataHandler([plaidIntegrationData]);
    server.use(handler);

    const { findReauthText } = renderComponent({
      path: CORE_INTEGRATIONS_FINANCIAL,
    });

    const reauthText = await findReauthText();

    expect(reauthText).toHaveTextContent(
      /Last re-authorized by Test user on December 1, 2021, 12:00 AM/i
    );

    MockDate.reset();
  });
});
