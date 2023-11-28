import userEvent from "@testing-library/user-event";
import { customDataHandler } from "mocks/integrationReAuthHandlers";
import { server } from "mocks/server";
import { render, screen } from "test-utils";
import { SiteWideAlert } from "./SiteWideAlert";
import { CORE_INTEGRATIONS_MY_INTEGRATIONS } from "globals/configs";

function renderComponent() {
  const { history } = render(<SiteWideAlert />);

  const getCallToActionButton = () =>
    screen.getByRole("button", { name: /re-authorize/i });

  const findAlert = async () => screen.findByRole("alert");

  const queryAlert = () => screen.queryByRole("alert");

  const waitForComponentToLoad = async () => findAlert();

  return {
    getCallToActionButton,
    findAlert,
    queryAlert,
    waitForComponentToLoad,
    history,
  };
}

describe("SiteWideAlert", () => {
  it.each([
    ["1 bank", [{ name: "Bank A" }], "Bank A requires re-authorization"],
    [
      "2 banks",
      [{ name: "Bank A" }, { name: "Bank B" }],
      "Bank A and Bank B require re-authorization",
    ],
    [
      "3 banks",
      [{ name: "Bank A" }, { name: "Bank B" }, { name: "Bank C" }],
      "Bank A, Bank B, and Bank C require re-authorization",
    ],
  ])(
    `should show correct re-authorization message for: %s`,
    async (testTitle, data, expectedText) => {
      const handler = customDataHandler(data);
      server.use(handler);

      const { findAlert } = renderComponent();

      const alert = await findAlert();

      expect(alert).toHaveTextContent(expectedText);
    }
  );

  it("should redirect to integrations page", async () => {
    const {
      waitForComponentToLoad,
      getCallToActionButton,
      history,
    } = renderComponent();

    jest.spyOn(history, "push");

    await waitForComponentToLoad();

    userEvent.click(getCallToActionButton());

    expect(history.push).toHaveBeenCalledWith(
      CORE_INTEGRATIONS_MY_INTEGRATIONS
    );
  });
});
